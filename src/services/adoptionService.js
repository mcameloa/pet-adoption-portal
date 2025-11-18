const adoptionRepository = require('../repositories/adoptionRepository');

async function createAdoption(payload) {
  const adoptionRequest = {
    id: Date.now(),
    petId: payload.petId,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    city: payload.city,
    housingType: payload.housingType || null,
    hasOtherPets: payload.hasOtherPets || null,
    experience: payload.experience || null,
    motivation: payload.motivation,
    createdAt: new Date().toISOString()
  };

  await adoptionRepository.saveAdoption(adoptionRequest);

  return adoptionRequest;
}

module.exports = {
  createAdoption
};
