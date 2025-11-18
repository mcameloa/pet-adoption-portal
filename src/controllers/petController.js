const petService = require('../services/petService');

async function getPets(req, res, next) {
  try {
    const { species, city, minAge, maxAge } = req.query;
    const filters = {
      species: species || null,
      city: city || null,
      minAge: minAge ? Number(minAge) : null,
      maxAge: maxAge ? Number(maxAge) : null
    };

    const pets = await petService.getPets(filters);
    res.json(pets);
  } catch (error) {
    next(error);
  }
}

async function getPetById(req, res, next) {
  try {
    const { id } = req.params;
    const pet = await petService.getPetById(id);

    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    res.json(pet);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPets,
  getPetById
};
