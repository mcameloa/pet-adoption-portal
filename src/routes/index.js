const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const SearchController = require('../controllers/SearchController');
const PetDetailController = require('../controllers/PetDetailController');
const AdoptionController = require('../controllers/AdoptionController');

/* GET home page. */
router.get('/', HomeController.index);

/* GET search page. */
router.get('/search', SearchController.search);

/* GET pet detail page. */
router.get('/pet/:id', PetDetailController.show);

/* POST adoption form submission. */
router.post('/adoption/submit', AdoptionController.submit);

module.exports = router;
