import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFile = 'todos produtos excel.xlsx';
const outputPath = path.resolve(__dirname, 'src/data/officialProducts.ts');

if (!fs.existsSync(excelFile)) {
    console.error(`File not found: ${excelFile}`);
    process.exit(1);
}

const workbook = XLSX.readFile(excelFile);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(sheet);

// Map: Product Upper -> Niche info
const productMap = {};
// Map: Niche Upper -> Color (random or fixed palette for now, will allow customization later)
const nicheSet = new Set();
const nicheColors = {};

const PALETTE = [
    "#EF4444", "#F97316", "#F59E0B", "#84CC16", "#22C55E",
    "#10B981", "#14B8A6", "#06B6D4", "#0EA5E9", "#3B82F6",
    "#6366F1", "#8B5CF6", "#A855F7", "#D946EF", "#EC4899",
    "#F43F5E", "#E11D48", "#BE123C", "#881337", "#4C1D95"
];
let paletteIndex = 0;

data.forEach(row => {
    // Columns: NICHO, PRODUTO
    const nicheRaw = row['NICHO'] || '';
    const productsRaw = row['PRODUTO'] || '';

    // Clean Niche name (remove emojis?)
    // Actually user might want emojis if they put them there. Let's keep them but trim.
    const niche = nicheRaw.trim();
    if (!niche) return;

    if (!nicheSet.has(niche)) {
        nicheSet.add(niche);
        nicheColors[niche] = PALETTE[paletteIndex % PALETTE.length];
        paletteIndex++;
    }

    // Split products by ';'
    const products = productsRaw.split(';').map(p => p.trim()).filter(p => p);

    products.forEach(prod => {
        productMap[prod.toUpperCase()] = niche;
        // Also map cleaned name just in case (remove spaces)
        productMap[prod.toUpperCase().replace(/\s+/g, '')] = niche;
    });
});

const fileContent = `
/**
 * OFFICIAL PRODUCT - NICHE MAPPING
 * Generated from 'todos produtos excel.xlsx'
 */

export const OFFICIAL_PRODUCT_MAP: Record<string, string> = ${JSON.stringify(productMap, null, 4)};

export const OFFICIAL_NICHE_COLORS: Record<string, string> = ${JSON.stringify(nicheColors, null, 4)};

export const getOfficialNiche = (productName: string): string => {
    if (!productName) return "Desconhecido";
    const key = productName.toUpperCase().trim();
    // Try exact match
    if (OFFICIAL_PRODUCT_MAP[key]) return OFFICIAL_PRODUCT_MAP[key];
    // Try without special chars/emojis if needed, or substring
    // Let's rely on strict map first as requested.
    
    // Fallback: Check if partial match exists? 
    // "Memyts" vs "🧠 Memyts"
    // The Excel had emojis in products too.
    
    // Try finding by inclusion if exact fails
    const found = Object.keys(OFFICIAL_PRODUCT_MAP).find(k => k.includes(key) || key.includes(k));
    if (found) return OFFICIAL_PRODUCT_MAP[found];

    return "Outros";
};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${outputPath} with ${Object.keys(productMap).length} products.`);
