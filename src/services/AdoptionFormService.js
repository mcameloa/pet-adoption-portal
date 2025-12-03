const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * Servicio para manejar el guardado de solicitudes de adopción en CSV
 */
class AdoptionFormService {
  /**
   * Guarda una solicitud de adopción en el archivo CSV
   * @param {Object} data - Datos del formulario de adopción
   * @param {string} data.nombre - Nombre completo del solicitante
   * @param {string} data.email - Email del solicitante
   * @param {string} data.telefono - Teléfono del solicitante
   * @param {string} data.direccion - Dirección del solicitante
   * @param {string} data.motivo - Motivo de la adopción
   * @param {number} data.petId - ID de la mascota
   * @param {string} data.petName - Nombre de la mascota
   * @returns {Promise<boolean>} True si se guardó correctamente
   */
  static async saveAdoptionRequest(data) {
    const csvFilePath = path.join(__dirname, '..', 'data', 'adoptions.csv');
    const csvDir = path.dirname(csvFilePath);

    try {
      // Crear directorio si no existe
      if (!fs.existsSync(csvDir)) {
        fs.mkdirSync(csvDir, { recursive: true });
      }

      // Verificar si el archivo existe para determinar si necesitamos headers
      const fileExists = fs.existsSync(csvFilePath);
      const needsHeader = !fileExists;

      // Configurar el writer de CSV
      const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'fecha', title: 'Fecha' },
          { id: 'nombre', title: 'Nombre Completo' },
          { id: 'email', title: 'Email' },
          { id: 'telefono', title: 'Teléfono' },
          { id: 'direccion', title: 'Dirección' },
          { id: 'motivo', title: 'Motivo de Adopción' },
          { id: 'petId', title: 'ID Mascota' },
          { id: 'petName', title: 'Nombre Mascota' }
        ],
        append: fileExists // Si el archivo existe, agregar al final
      });

      // Preparar los datos con fecha/hora
      const record = {
        fecha: new Date().toISOString(),
        nombre: data.nombre || '',
        email: data.email || '',
        telefono: data.telefono || '',
        direccion: data.direccion || '',
        motivo: data.motivo || '',
        petId: data.petId || '',
        petName: data.petName || ''
      };

      // Escribir en el CSV
      await csvWriter.writeRecords([record]);

      return true;
    } catch (error) {
      console.error('Error al guardar solicitud de adopción en CSV:', error);
      throw error;
    }
  }
}

module.exports = AdoptionFormService;

