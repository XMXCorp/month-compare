
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const OUTUBRO_FILE = 'Lista backend outubro.xlsx';
const NOVEMBRO_FILE = 'lista backend novembro.xlsx';

const STATUS_APPROVED = ['aprovado', 'concluido', 'concluído', 'approved', 'complete', 'completed', 'done', 'APROVADO'];

function normalizeString(str) {
    if (!str) return 'Não Informado';
    return String(str).trim();
}

function cleanName(str) {
    if (!str || str === 'Não Informado') return str;
    // Remove emojis, specific symbols, and trim
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

function processFile(filename) {
    const filePath = path.resolve(filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filename}`);
        return null;
    }

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    let headerRowIndex = rawData.findIndex(row => row && row.includes('Status'));
    if (headerRowIndex === -1) headerRowIndex = 0;

    const headers = rawData[headerRowIndex];
    const dataRows = rawData.slice(headerRowIndex + 1);

    const colMap = {};
    headers.forEach((h, i) => {
        if (!h) return;
        const lower = h.toString().toLowerCase();
        if (lower.includes('task name')) colMap.name = i;
        if (lower.includes('status')) colMap.status = i;
        if (lower.includes('assignee')) colMap.assignee = i;
        if (lower.includes('setor xmx')) colMap.setor = i;
        if (lower.includes('produto black')) colMap.produto = i;
        if (lower.includes('nichos')) colMap.nichos = i;
        if (lower.includes('squads')) colMap.squads = i;
        if (lower.includes('plataforma')) colMap.plataforma = i;
    });

    // Filter and Process
    const tasks = dataRows.filter(row => {
        const status = row[colMap.status];
        return status && STATUS_APPROVED.includes(status.toString().toLowerCase().trim());
    });

    const counts = {
        total: tasks.length,
        tipoTarefa: {},
        responsavel: {},
        prioridade: {},
        modulo: {},
        produtoBlack: {},
        plataforma: {},
        squads: {},
        nichos: {},
        setorXmx: {}
    };

    tasks.forEach(row => {
        // Assignee
        const assigneeRaw = row[colMap.assignee];
        if (assigneeRaw) {
            const assignees = assigneeRaw.toString().split(',');
            assignees.forEach(a => {
                const name = toTitleCase(normalizeString(a));
                counts.responsavel[name] = (counts.responsavel[name] || 0) + 1;
            });
        } else {
            counts.responsavel['Não Atribuído'] = (counts.responsavel['Não Atribuído'] || 0) + 1;
        }

        // Setor
        const setor = toTitleCase(normalizeString(row[colMap.setor]));
        counts.setorXmx[setor] = (counts.setorXmx[setor] || 0) + 1;

        // Produto (Handle '📦 PRODUTO BLACK' and 'PRODUTO BLACK')
        const produto = toTitleCase(normalizeString(row[colMap.produto]));
        counts.produtoBlack[produto] = (counts.produtoBlack[produto] || 0) + 1;

        // Nichos
        const nichos = toTitleCase(normalizeString(row[colMap.nichos]));
        counts.nichos[nichos] = (counts.nichos[nichos] || 0) + 1;

        // Squads
        const squads = toTitleCase(normalizeString(row[colMap.squads]));
        counts.squads[squads] = (counts.squads[squads] || 0) + 1;

        // Plataforma
        const plataforma = toTitleCase(normalizeString(row[colMap.plataforma]));
        counts.plataforma[plataforma] = (counts.plataforma[plataforma] || 0) + 1;

        // Task Name for Module/Type
        const name = row[colMap.name] ? row[colMap.name].toString() : '';
        let type = 'Geral';
        let moduleName = 'Outros';

        const match = name.match(/^\[(.*?)\]/);
        if (match) {
            moduleName = toTitleCase(match[1]);
        }

        if (name.toLowerCase().includes('bug')) type = 'Bug Fix';
        else if (name.toLowerCase().includes('fix')) type = 'Bug Fix';
        else if (name.toLowerCase().includes('feat')) type = 'Feature';
        else if (name.toLowerCase().includes('cri')) type = 'Feature';
        else if (name.toLowerCase().includes('ajust')) type = 'Improvement';
        else if (name.toLowerCase().includes('doc')) type = 'Documentation';
        else type = 'Feature';

        counts.tipoTarefa[type] = (counts.tipoTarefa[type] || 0) + 1;
        counts.modulo[moduleName] = (counts.modulo[moduleName] || 0) + 1;
        counts.prioridade['Normal'] = (counts.prioridade['Normal'] || 0) + 1;
    });


    console.log(`Processed ${filename}:`);
    console.log(`  Total: ${counts.total}`);
    console.log(`  Squads: ${JSON.stringify(counts.squads)}`);
    console.log(`  Nichos: ${JSON.stringify(counts.nichos)}`);
    console.log(`  Plataforma: ${JSON.stringify(counts.plataforma)}`);

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

if (!outData || !novData) {
    console.error("Failed to process one or both files.");
    process.exit(1);
}

const tsContent = `
import { getProductColor as getProductColorOriginal } from "./dashboardData";

export interface ProcessedData {
    name: string;
    value: number;
    percentage: number;
}

export const totalBackendOutubro = ${outData.total};
export const totalBackendNovembro = ${novData.total};

export const tipoTarefaOutubro = ${JSON.stringify(transformToArr(outData.tipoTarefa, outData.total), null, 4)};
export const tipoTarefaNovembro = ${JSON.stringify(transformToArr(novData.tipoTarefa, novData.total), null, 4)};

export const responsavelOutubro = ${JSON.stringify(transformToArr(outData.responsavel, outData.total), null, 4)};
export const responsavelNovembro = ${JSON.stringify(transformToArr(novData.responsavel, novData.total), null, 4)};

export const moduloOutubro = ${JSON.stringify(transformToArr(outData.modulo, outData.total), null, 4)};
export const moduloNovembro = ${JSON.stringify(transformToArr(novData.modulo, novData.total), null, 4)};

export const prioridadeOutubro = ${JSON.stringify(transformToArr(outData.prioridade, outData.total), null, 4)};
export const prioridadeNovembro = ${JSON.stringify(transformToArr(novData.prioridade, novData.total), null, 4)};

export const produtoBlackOutubro = ${JSON.stringify(transformToArr(outData.produtoBlack, outData.total), null, 4)};
export const produtoBlackNovembro = ${JSON.stringify(transformToArr(novData.produtoBlack, novData.total), null, 4)};

export const plataformaOutubro = ${JSON.stringify(transformToArr(outData.plataforma, outData.total), null, 4)};
export const plataformaNovembro = ${JSON.stringify(transformToArr(novData.plataforma, novData.total), null, 4)};

export const squadsOutubro = ${JSON.stringify(transformToArr(outData.squads, outData.total), null, 4)};
export const squadsNovembro = ${JSON.stringify(transformToArr(novData.squads, novData.total), null, 4)};

export const nichosOutubro = ${JSON.stringify(transformToArr(outData.nichos, outData.total), null, 4)};
export const nichosNovembro = ${JSON.stringify(transformToArr(novData.nichos, novData.total), null, 4)};

export const setorXmxOutubro = ${JSON.stringify(transformToArr(outData.setorXmx, outData.total), null, 4)};
export const setorXmxNovembro = ${JSON.stringify(transformToArr(novData.setorXmx, novData.total), null, 4)};

// Helpers
export const getTipoTarefaColor = (name: string) => {
    const map: Record<string, string> = {
        "Bug Fix": "#EF4444",
        "Feature": "#22C55E",
        "Improvement": "#3B82F6",
        "Documentation": "#F59E0B",
        "Refactoring": "#A855F7"
    };
    return map[name] || "#94A3B8";
};

export const getModuloColor = getProductColorOriginal;
export const getProductColor = getProductColorOriginal;

export const kpisBackend = {
    totalOutubro: totalBackendOutubro,
    totalNovembro: totalBackendNovembro,
    totalGeral: totalBackendOutubro + totalBackendNovembro,
    variacaoTotal: totalBackendOutubro === 0 ? 100 : Number((((totalBackendNovembro - totalBackendOutubro) / totalBackendOutubro) * 100).toFixed(1))
};

export const findBestPerformer = (data: { name: string; value: number }[]) => {
    return data.reduce((best, item) => (item.value > best.value ? item : best), data[0] || { name: 'N/A', value: 0 });
};

export const findBiggestGrowth = (
    outData: { name: string; value: number }[],
    novData: { name: string; value: number }[]
) => {
    const combined = outData.map((out) => {
        const nov = novData.find((n) => n.name === out.name);
        const novValue = nov?.value || 0;
        const growth = out.value === 0 ? (novValue > 0 ? 100 : 0) : ((novValue - out.value) / out.value) * 100;
        return { name: out.name, growth, outValue: out.value, novValue };
    });

    novData.forEach((nov) => {
        if (!outData.find((o) => o.name === nov.name)) {
            combined.push({ name: nov.name, growth: 100, outValue: 0, novValue: nov.value });
        }
    });

    return combined.reduce((best, item) => (item.growth > best.growth ? item : best), combined[0] || { name: 'N/A', growth: 0 });
};
`;

fs.writeFileSync(path.resolve('src/data/dashboardBackendData.ts'), tsContent);
console.log("Data generated successfully!");
