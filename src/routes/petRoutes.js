const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);

module.exports = router;
