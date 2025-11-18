const path = require('path');
const fs = require('fs');
require('dotenv').config();

const ROOT_DIR = path.join(__dirname, '..', '..');

const dataDir = path.join(ROOT_DIR, 'data');

// Garantizar que el directorio de datos exista
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

module.exports = {
  port: process.env.PORT || 3000,
  rootDir: ROOT_DIR,
  dataDir,
  petsFile: path.join(dataDir, 'pets.json'),
  adoptionsJsonFile: path.join(dataDir, 'adoptions.json'),
  adoptionsExcelFile: path.join(dataDir, 'adoptions.xlsx')
};
