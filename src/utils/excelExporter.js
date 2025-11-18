const fs = require('fs');
const ExcelJS = require('exceljs');
const { adoptionsExcelFile } = require('../config');

async function appendAdoption(adoption) {
  const workbook = new ExcelJS.Workbook();
  const fileExists = fs.existsSync(adoptionsExcelFile);

  if (fileExists) {
    await workbook.xlsx.readFile(adoptionsExcelFile);
  } else {
    const sheet = workbook.addWorksheet('Solicitudes');
    sheet.columns = [
      { header: 'ID Solicitud', key: 'id', width: 18 },
      { header: 'ID Mascota', key: 'petId', width: 10 },
      { header: 'Nombre completo', key: 'fullName', width: 30 },
      { header: 'Correo', key: 'email', width: 30 },
      { header: 'Teléfono', key: 'phone', width: 18 },
      { header: 'Ciudad', key: 'city', width: 15 },
      { header: 'Tipo vivienda', key: 'housingType', width: 18 },
      { header: 'Otras mascotas', key: 'hasOtherPets', width: 15 },
      { header: 'Experiencia', key: 'experience', width: 40 },
      { header: 'Motivación', key: 'motivation', width: 40 },
      { header: 'Fecha creación', key: 'createdAt', width: 24 }
    ];
  }

  const sheet = workbook.getWorksheet('Solicitudes') || workbook.addWorksheet('Solicitudes');

  sheet.addRow({
    id: adoption.id,
    petId: adoption.petId,
    fullName: adoption.fullName,
    email: adoption.email,
    phone: adoption.phone,
    city: adoption.city,
    housingType: adoption.housingType,
    hasOtherPets: adoption.hasOtherPets,
    experience: adoption.experience,
    motivation: adoption.motivation,
    createdAt: adoption.createdAt
  });

  await workbook.xlsx.writeFile(adoptionsExcelFile);
}

module.exports = {
  appendAdoption
};
