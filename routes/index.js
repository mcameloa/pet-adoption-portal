const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Adopta un amigo' });
});

/* GET search page. */
router.get('/search', function(req, res) {
  const { type, age, size, gender, name } = req.query;
  
  // Por ahora retornamos resultados vacíos
  // En el futuro aquí se conectaría con una base de datos
  let results = [];
  
  // Si hay parámetros de búsqueda, se podría filtrar aquí
  // Por ahora mantenemos resultados vacíos para mostrar el estado inicial
  
  res.render('search', { 
    title: 'Buscar Mascotas',
    results: results,
    filters: { type, age, size, gender, name }
  });
});

module.exports = router;
