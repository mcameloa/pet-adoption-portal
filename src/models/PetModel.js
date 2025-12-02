const fs = require('fs');
const path = require('path');

/**
 * Modelo para manejar el acceso a datos de mascotas
 */
class PetModel {
  /**
   * Obtiene todas las mascotas del archivo JSON
   * @returns {Promise<Array>} Array de mascotas
   */
  static async getAllPets() {
    const petsFilePath = path.join(__dirname, '..', 'data', 'pets.json');

    try {
      if (fs.existsSync(petsFilePath)) {
        const petsData = fs.readFileSync(petsFilePath, 'utf8');
        const petsJson = JSON.parse(petsData);
        return petsJson.pets || [];
      }
      return [];
    } catch (error) {
      console.error('Error al leer el archivo de mascotas:', error);
      return [];
    }
  }
}

module.exports = PetModel;

