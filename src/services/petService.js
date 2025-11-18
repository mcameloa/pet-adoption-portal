const petRepository = require('../repositories/petRepository');

async function getPets(filters) {
  const pets = await petRepository.getAll();

  return pets.filter((p) => {
    if (filters.species && filters.species !== 'todas') {
      if (p.species.toLowerCase() !== filters.species.toLowerCase()) {
        return false;
      }
    }

    if (filters.city && filters.city !== 'todas') {
      if (p.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    if (filters.minAge != null && Number.isFinite(filters.minAge)) {
      if (p.ageYears < filters.minAge) {
        return false;
      }
    }

    if (filters.maxAge != null && Number.isFinite(filters.maxAge)) {
      if (p.ageYears > filters.maxAge) {
        return false;
      }
    }

    return true;
  });
}

async function getPetById(id) {
  const pets = await petRepository.getAll();
  return pets.find((p) => String(p.id) === String(id));
}

module.exports = {
  getPets,
  getPetById
};
