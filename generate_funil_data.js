
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const OUTUBRO_FILE = 'funil outubro.xlsx';
const NOVEMBRO_FILE = 'funil novembro.xlsx';
const PRODUCT_MAP_FILE = 'todos produtos excel.xlsx';

function normalizeString(str) {
    if (!str) return 'Não Informado';
    return String(str).trim();
}

function cleanName(str) {
    if (!str || str === 'Não Informado') return str;
    // Remove emojis and specific symbols
    return str.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function toTitleCase(str) {
    if (!str || str === 'Não Informado') return str;
    const cleaned = cleanName(str);
    if (!cleaned) return 'Não Informado';
    return cleaned.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Load Product -> Niche Map
function loadProductNicheMap() {
    const filePath = path.resolve(PRODUCT_MAP_FILE);
    if (!fs.existsSync(filePath)) {
        console.warn('Product Map file not found!');
        return {};
    }
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const map = {};
    data.forEach(row => {
        const product = normalizeString(row['PRODUTO']).toUpperCase(); // Key by UPPERCASE product
        const niche = toTitleCase(normalizeString(row['NICHO']));
        if (product && niche) {
            map[product] = niche;
        }
    });
    return map;
}

const productNicheMap = loadProductNicheMap();

function getCorrectNiche(productRaw, originalNiche) {
    const productUpper = cleanName(normalizeString(productRaw)).toUpperCase();

    // 1. Try exact match from map
    if (productNicheMap[productUpper]) return productNicheMap[productUpper];

    // 2. Try partial match
    const key = Object.keys(productNicheMap).find(k => productUpper.includes(k) || k.includes(productUpper));
    if (key) return productNicheMap[key];

    // 3. Fallback to original niche from file
    return toTitleCase(normalizeString(originalNiche));
}


function processFile(filename) {
    const filePath = path.resolve(filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filename}`);
        return { total: 0, series: [] }; // Return empty structure
    }

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Find Header
    let headerRowIndex = 0;
    for (let i = 0; i < Math.min(rawData.length, 10); i++) {
        const row = rawData[i];
        if (row && row.some(c => c && c.toString().includes('Task Name'))) {
            headerRowIndex = i;
            break;
        }
    }

    const headers = rawData[headerRowIndex];
    const dataRows = rawData.slice(headerRowIndex + 1);

    const colMap = {};
    headers.forEach((h, i) => {
        if (!h) return;
        const lower = h.toString().toLowerCase();
        if (lower.includes('task name')) colMap.name = i;
        if (lower.includes('assignee')) colMap.assignee = i;
        if (lower.includes('setor xmx')) colMap.setor = i;
        if (lower.includes('produto black')) colMap.produto = i;
        if (lower.includes('nichos')) colMap.nichos = i;
        if (lower.includes('squads')) colMap.squads = i;
        if (lower.includes('plataforma')) colMap.plataforma = i;
        if (lower.includes('status')) colMap.status = i; // If exists, though not strictly required by prompt, assumes all in file are relevant or filtered earlier. Assuming file contains RELEVANT items.
        // User didn't specify filter by status for Funil, but usually we filter by 'Done'. 
        // For now, I'll count ALL rows in the Funil sheets unless they look empty.
    });

    const counts = {
        total: 0,
        responsavel: {},
        produto: {},
        niche: {},
        squad: {},
        plataforma: {},
        setor: {}
    };

    dataRows.forEach(row => {
        if (!row || row.length === 0) return;
        // Basic validity check: must have a name
        if (!row[colMap.name]) return;

        counts.total++;

        // Responsavel
        const assignee = row[colMap.assignee];
        if (assignee) {
            assignee.toString().split(',').forEach(a => {
                const name = toTitleCase(normalizeString(a));
                counts.responsavel[name] = (counts.responsavel[name] || 0) + 1;
            });
        } else {
            counts.responsavel['Não Atribuído'] = (counts.responsavel['Não Atribuído'] || 0) + 1;
        }

        // Produto
        const produtoRaw = row[colMap.produto];
        const produto = toTitleCase(normalizeString(produtoRaw));
        counts.produto[produto] = (counts.produto[produto] || 0) + 1;

        // Niche (Computed)
        const nicheRaw = row[colMap.nichos];
        const niche = getCorrectNiche(produtoRaw, nicheRaw);
        counts.niche[niche] = (counts.niche[niche] || 0) + 1;

        // Squad
        const squad = toTitleCase(normalizeString(row[colMap.squads]));
        counts.squad[squad] = (counts.squad[squad] || 0) + 1;

        // Plataforma
        const plat = toTitleCase(normalizeString(row[colMap.plataforma]));
        counts.plataforma[plat] = (counts.plataforma[plat] || 0) + 1;

        // Setor
        const setor = toTitleCase(normalizeString(row[colMap.setor]));
        counts.setor[setor] = (counts.setor[setor] || 0) + 1;
    });

    return counts;
}

function transformToArr(map, total) {
    if (total === 0) return [];
    return Object.entries(map)
        .map(([name, value]) => ({
            name,
            value,
            percentage: Number(((value / total) * 100).toFixed(2))
        }))
        .sort((a, b) => b.value - a.value);
}

const outData = processFile(OUTUBRO_FILE);
const novData = processFile(NOVEMBRO_FILE);

const tsContent = `
// Generated Data for Backend Funil
// Source: ${OUTUBRO_FILE} and ${NOVEMBRO_FILE}

export interface FunilMetric {
    name: string;
    value: number;
    percentage: number;
}

export const funilTotalOutubro = ${outData.total};
export const funilTotalNovembro = ${novData.total};

export const funilResponsaveisOutubro = ${JSON.stringify(transformToArr(outData.responsavel, outData.total), null, 4)};
export const funilResponsaveisNovembro = ${JSON.stringify(transformToArr(novData.responsavel, novData.total), null, 4)};

export const funilProdutosOutubro = ${JSON.stringify(transformToArr(outData.produto, outData.total), null, 4)};
export const funilProdutosNovembro = ${JSON.stringify(transformToArr(novData.produto, novData.total), null, 4)};

export const funilNichosOutubro = ${JSON.stringify(transformToArr(outData.niche, outData.total), null, 4)};
export const funilNichosNovembro = ${JSON.stringify(transformToArr(novData.niche, novData.total), null, 4)};

export const funilSquadsOutubro = ${JSON.stringify(transformToArr(outData.squad, outData.total), null, 4)};
export const funilSquadsNovembro = ${JSON.stringify(transformToArr(novData.squad, novData.total), null, 4)};

export const funilPlataformasOutubro = ${JSON.stringify(transformToArr(outData.plataforma, outData.total), null, 4)};
export const funilPlataformasNovembro = ${JSON.stringify(transformToArr(novData.plataforma, novData.total), null, 4)};

export const funilSetoresOutubro = ${JSON.stringify(transformToArr(outData.setor, outData.total), null, 4)};
export const funilSetoresNovembro = ${JSON.stringify(transformToArr(novData.setor, novData.total), null, 4)};

export const kpisFunil = {
    totalOutubro: funilTotalOutubro,
    totalNovembro: funilTotalNovembro,
    totalGeral: funilTotalOutubro + funilTotalNovembro,
    variacao: funilTotalOutubro === 0 ? 100 : Number((((funilTotalNovembro - funilTotalOutubro) / funilTotalOutubro) * 100).toFixed(1))
};
`;

fs.writeFileSync(path.resolve('src/data/dashboardFunilData.ts'), tsContent);
console.log("Funil Data generated successfully at src/data/dashboardFunilData.ts");
console.log("Total Outubro:", outData.total);
console.log("Total Novembro:", novData.total);
