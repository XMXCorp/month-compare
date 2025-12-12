import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const files = [
    'Lista backend outubro.xlsx',
    'lista backend novembro.xlsx'
];

files.forEach(filename => {
    console.log(`\n--- Inspecting: ${filename} ---`);
    const filePath = path.resolve(filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filename}`);
        return;
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Print first 5 rows to find the header
    console.log("First 5 rows:");
    json.slice(0, 5).forEach((row, i) => {
        console.log(`Row ${i}:`, row);
    });
});
