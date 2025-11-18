const fs = require('fs');
const { adoptionsJsonFile } = require('../config');
const { appendAdoption } = require('../utils/excelExporter');

async function saveAdoption(adoption) {
  let current = [];

  const exists = fs.existsSync(adoptionsJsonFile);
  if (exists) {
    const raw = fs.readFileSync(adoptionsJsonFile, 'utf8');
    if (raw && raw.trim()) {
      current = JSON.parse(raw);
    }
  }

  current.push(adoption);

  fs.writeFileSync(adoptionsJsonFile, JSON.stringify(current, null, 2), 'utf8');

  await appendAdoption(adoption);
}

module.exports = {
  saveAdoption
};
