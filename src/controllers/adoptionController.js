const adoptionService = require('../services/adoptionService');

async function createAdoption(req, res, next) {
  try {
    const {
      petId,
      fullName,
      email,
      phone,
      city,
      housingType,
      hasOtherPets,
      experience,
      motivation
    } = req.body;

    if (!petId || !fullName || !email || !phone || !city || !motivation) {
      return res.status(400).json({
        message: 'Por favor completa los campos obligatorios.'
      });
    }

    const adoptionRequest = await adoptionService.createAdoption({
      petId,
      fullName,
      email,
      phone,
      city,
      housingType,
      hasOtherPets,
      experience,
      motivation
    });

    res.status(201).json({
      message:
        'Tu solicitud de adopción ha sido registrada. Un refugio se pondrá en contacto contigo.',
      adoptionRequest
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAdoption
};
