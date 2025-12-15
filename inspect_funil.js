import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const files = [
    'funil outubro.xlsx',
    'funil novembro.xlsx',
    'todos produtos excel.xlsx'
];

files.forEach(file => {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
        console.log(`\n--- Inspecting ${file} ---`);
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Find header row (usually first non-empty)
        let headerRowIndex = 0;
        // Simple heuristic: look for row with multiple strings
        for (let i = 0; i < Math.min(data.length, 10); i++) {
            if (data[i] && data[i].length > 2) {
                headerRowIndex = i;
                break;
            }
        }

        console.log('Headers:', data[headerRowIndex]);
        console.log('First Row Data:', data[headerRowIndex + 1]);
    } else {
        console.error(`File not found: ${file}`);
    }
});
