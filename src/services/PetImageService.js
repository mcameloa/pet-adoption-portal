/**
 * Servicio para manejar la obtención de imágenes de mascotas desde APIs externas
 */
class PetImageService {
  /**
   * Obtiene una imagen aleatoria de la API correspondiente según el tipo de mascota
   * @param {string} petType - Tipo de mascota ('gato', 'perro', 'otro')
   * @returns {Promise<string|null>} URL de la imagen o null si falla
   */
  static async getPetImageFromAPI(petType) {
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
  static needsImageFromAPI(imagePath) {
    if (!imagePath || imagePath === '') {
      return true;
    }
    // Si es una ruta local que probablemente no existe, obtener de API
    return imagePath.startsWith('/images/pets/');
  }

  /**
   * Enriquece un array de mascotas con imágenes de API cuando sea necesario
   * @param {Array} pets - Array de mascotas
   * @returns {Promise<Array>} Array de mascotas enriquecido con imágenes
   */
  static async enrichPetsWithImages(pets) {
    const enrichedPets = [...pets];

    for (let pet of enrichedPets) {
      if (this.needsImageFromAPI(pet.image)) {
        const apiImageUrl = await this.getPetImageFromAPI(pet.type);
        if (apiImageUrl) {
          pet.image = apiImageUrl;
        }
      }
    }

    return enrichedPets;
  }
}

module.exports = PetImageService;

