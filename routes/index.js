const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Adopta un amigo' });
});

/**
 * Obtiene una imagen aleatoria de la API correspondiente según el tipo de mascota
 * @param {string} petType - Tipo de mascota ('gato', 'perro', 'otro')
 * @returns {Promise<string|null>} URL de la imagen o null si falla
 */
async function getPetImageFromAPI(petType) {
  try {
    let apiUrl;

    if (petType === 'gato') {
      apiUrl = 'https://api.thecatapi.com/v1/images/search';
    } else if (petType === 'perro') {
      apiUrl = 'https://api.thedogapi.com/v1/images/search';
    } else {
      // Para otros tipos, usar una API genérica o placeholder
      return null;
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.length > 0 && data[0].url) {
      return data[0].url;
    }

    return null;
  } catch (error) {
    console.error(`Error al obtener imagen de la API para ${petType}:`, error.message);
    return null;
  }
}

/**
 * Verifica si una imagen necesita ser reemplazada (es placeholder o no existe)
 * @param {string} imagePath - Ruta de la imagen
 * @returns {boolean}
 */
function needsImageFromAPI(imagePath) {
  if (!imagePath || imagePath === '') {
    return true;
  }
  // Si es una ruta local que probablemente no existe, obtener de API
  return imagePath.startsWith('/images/pets/');

}

/* GET search page. */
router.get('/search', async function(req, res) {
  const { type, age, size, gender, name } = req.query;

  // Leer el archivo JSON de mascotas
  let allPets = [];
  const petsFilePath = path.join(__dirname, '..', 'data', 'pets.json');

  try {
    if (fs.existsSync(petsFilePath)) {
      const petsData = fs.readFileSync(petsFilePath, 'utf8');
      const petsJson = JSON.parse(petsData);
      allPets = petsJson.pets || [];
    }
  } catch (error) {
    console.error('Error al leer el archivo de mascotas:', error);
    allPets = [];
  }

  // Obtener imágenes de las APIs si es necesario
  for (let pet of allPets) {
    if (needsImageFromAPI(pet.image)) {
      const apiImageUrl = await getPetImageFromAPI(pet.type);
      if (apiImageUrl) {
        pet.image = apiImageUrl;
      }
    }
  }

  // Aplicar filtros
  let results = allPets.filter(pet => {
    // Filtrar por tipo
    if (type && pet.type !== type) {
      return false;
    }

    // Filtrar por edad
    if (age && pet.age !== age) {
      return false;
    }

    // Filtrar por tamaño
    if (size && pet.size !== size) {
      return false;
    }

    // Filtrar por género
    if (gender && pet.gender !== gender) {
      return false;
    }

    // Filtrar por nombre (búsqueda parcial, case-insensitive)
    return !(name && !pet.name.toLowerCase().includes(name.toLowerCase()));


  });

  res.render('search', {
    title: 'Buscar Mascotas',
    results: results,
    filters: { type, age, size, gender, name }
  });
});

module.exports = router;
