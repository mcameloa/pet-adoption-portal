const express = require('express');
const path = require('path');
const cors = require('cors');

const { rootDir } = require('./config');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (frontend)
app.use(express.static(path.join(rootDir, 'public')));

// Rutas de API
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

// Middleware 404 para API
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Fallback: SPA simple
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Middleware de manejo de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Ocurrió un error inesperado'
  });
});

module.exports = app;
