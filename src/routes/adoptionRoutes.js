const express = require('express');
const adoptionController = require('../controllers/adoptionController');

const router = express.Router();

router.post('/', adoptionController.createAdoption);

module.exports = router;
