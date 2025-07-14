const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, '../src/assets/svg/navbar'); 
const files = fs.readdirSync(svgDir);

files.forEach(file => {
  if (path.extname(file) === '.svg') {
    const filePath = path.join(svgDir, file);
    let content = fs.readFileSync(filePath, 'utf8').trim();

    // Dodaj <template> na początek i </template> na koniec
    const wrapped = `<template>\n${content}\n</template>`;

    // Zmień rozszerzenie na .vue
    const newFileName = path.basename(file, '.svg') + '.vue';
    const newPath = path.join(svgDir, newFileName);

    fs.writeFileSync(newPath, wrapped, 'utf8');
    fs.unlinkSync(filePath); // opcjonalnie usuwa oryginalny .svg
    console.log(`✅ ${file} → ${newFileName}`);
  }
});
