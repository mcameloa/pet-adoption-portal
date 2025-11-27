const PetModel = require('../models/PetModel');
const PetImageService = require('../services/PetImageService');
const PetFilterService = require('../services/PetFilterService');

/**
 * Controlador para la búsqueda de mascotas
 */
class SearchController {
  /**
   * Maneja la búsqueda de mascotas con filtros
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static async search(req, res) {
    const { type, age, size, gender, name } = req.query;

    try {
      // Obtener todas las mascotas del modelo
      const allPets = await PetModel.getAllPets();

      // Enriquecer con imágenes de API si es necesario
      const petsWithImages = await PetImageService.enrichPetsWithImages(allPets);

      // Aplicar filtros
      const filters = { type, age, size, gender, name };
      const results = PetFilterService.filterPets(petsWithImages, filters);

      // Renderizar la vista con los resultados
      res.render('search', {
        title: 'Buscar Mascotas',
        results: results,
        filters: filters
      });
    } catch (error) {
      console.error('Error en la búsqueda de mascotas:', error);
      res.render('search', {
        title: 'Buscar Mascotas',
        results: [],
        filters: { type, age, size, gender, name }
      });
    }
  }
}

module.exports = SearchController;

