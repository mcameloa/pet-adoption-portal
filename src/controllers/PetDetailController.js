const PetModel = require('../models/PetModel');
const PetImageService = require('../services/PetImageService');

/**
 * Controlador para la vista de detalle de mascota
 */
class PetDetailController {
  /**
   * Muestra los detalles de una mascota
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static async show(req, res) {
    const { id } = req.params;

    try {
      // Obtener la mascota por ID
      const pet = await PetModel.getPetById(id);

      if (!pet) {
        // Si no se encuentra la mascota, renderizar error 404
        return res.status(404).render('error', {
          title: 'Mascota no encontrada',
          message: 'La mascota que buscas no existe o ha sido adoptada.',
          error: { status: 404 }
        });
      }

      // Enriquecer con imagen de API si es necesario
      const petsWithImages = await PetImageService.enrichPetsWithImages([pet]);
      const petWithImage = petsWithImages[0] || pet;

      // Renderizar la vista con los datos de la mascota
      res.render('detail', {
        title: `${pet.name} - Detalles`,
        pet: petWithImage
      });
    } catch (error) {
      console.error('Error al obtener los detalles de la mascota:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Ocurrió un error al cargar los detalles de la mascota.',
        error: { status: 500 }
      });
    }
  }
}

module.exports = PetDetailController;

