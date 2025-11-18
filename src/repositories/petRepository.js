const fs = require('fs');
const { petsFile } = require('../config');

async function getAll() {
  const exists = fs.existsSync(petsFile);
  if (!exists) {
    return [];
  }

  const data = fs.readFileSync(petsFile, 'utf8');
  if (!data.trim()) {
    return [];
  }

  return JSON.parse(data);
}

module.exports = {
  getAll
};
