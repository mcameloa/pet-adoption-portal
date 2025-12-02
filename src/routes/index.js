const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const SearchController = require('../controllers/SearchController');

/* GET home page. */
router.get('/', HomeController.index);

/* GET search page. */
router.get('/search', SearchController.search);

module.exports = router;
