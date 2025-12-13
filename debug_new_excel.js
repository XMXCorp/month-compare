import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFile = 'todos produtos excel.xlsx';

if (!fs.existsSync(excelFile)) {
    console.error(`File not found: ${excelFile}`);
    process.exit(1);
}

const workbook = XLSX.readFile(excelFile);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log("Sheet Headers:", data[0]);
console.log("First 5 rows:", data.slice(1, 6));

// Check for Product;Niche structure
console.log("\nSample Row Analysis:");
if (data[1]) {
    const row = data[1];
    console.log("Row 1 (raw):", row);
}
