const AdoptionFormService = require('../services/AdoptionFormService');

/**
 * Controlador para manejar solicitudes de adopción
 */
class AdoptionController {
  /**
   * Procesa y guarda una solicitud de adopción
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static async submit(req, res) {
    const { nombre, email, telefono, direccion, motivo, petId, petName } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !telefono || !direccion || !motivo || !petId || !petName) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    try {
      // Guardar en CSV
      await AdoptionFormService.saveAdoptionRequest({
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        direccion: direccion.trim(),
        motivo: motivo.trim(),
        petId: parseInt(petId, 10),
        petName: petName.trim()
      });

      // Retornar éxito
      res.json({
        success: true,
        message: 'Solicitud de adopción enviada correctamente. Nos pondremos en contacto contigo pronto.'
      });
    } catch (error) {
      console.error('Error al procesar solicitud de adopción:', error);
      res.status(500).json({
        success: false,
        message: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.'
      });
    }
  }
}

module.exports = AdoptionController;

