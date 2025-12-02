/**
 * Servicio para filtrar mascotas según criterios de búsqueda
 */
class PetFilterService {
  /**
   * Filtra un array de mascotas según los criterios proporcionados
   * @param {Array} pets - Array de mascotas a filtrar
   * @param {Object} filters - Objeto con los filtros (type, age, size, gender, name)
   * @returns {Array} Array de mascotas filtradas
   */
  static filterPets(pets, filters) {
    const { type, age, size, gender, name } = filters || {};

    return pets.filter(pet => {
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
  }
}

module.exports = PetFilterService;

