// Dados mockados para o Dashboard Backend - ClickUp Integration
// Outubro e Novembro 2025 - Tarefas com status "Aprovado"

// OUTUBRO - Tipos de Tarefa - Total: 45
export const tipoTarefaOutubro = [
    { name: "Bug Fix", value: 18, percentage: 40.0 },
    { name: "Feature", value: 12, percentage: 26.67 },
    { name: "Improvement", value: 8, percentage: 17.78 },
    { name: "Refactoring", value: 4, percentage: 8.89 },
    { name: "Documentation", value: 3, percentage: 6.67 },
];

// NOVEMBRO - Tipos de Tarefa - Total: 52
export const tipoTarefaNovembro = [
    { name: "Feature", value: 20, percentage: 38.46 },
    { name: "Bug Fix", value: 15, percentage: 28.85 },
    { name: "Improvement", value: 10, percentage: 19.23 },
    { name: "Refactoring", value: 5, percentage: 9.62 },
    { name: "Documentation", value: 2, percentage: 3.85 },
];

// OUTUBRO - Responsáveis - Total: 45
export const responsavelOutubro = [
    { name: "João Silva", value: 15, percentage: 33.33 },
    { name: "Maria Santos", value: 12, percentage: 26.67 },
    { name: "Pedro Costa", value: 10, percentage: 22.22 },
    { name: "Ana Oliveira", value: 5, percentage: 11.11 },
    { name: "Lucas Ferreira", value: 3, percentage: 6.67 },
];

// NOVEMBRO - Responsáveis - Total: 52
export const responsavelNovembro = [
    { name: "Maria Santos", value: 18, percentage: 34.62 },
    { name: "João Silva", value: 14, percentage: 26.92 },
    { name: "Pedro Costa", value: 11, percentage: 21.15 },
    { name: "Ana Oliveira", value: 6, percentage: 11.54 },
    { name: "Lucas Ferreira", value: 3, percentage: 5.77 },
];

// OUTUBRO - Prioridade - Total: 45
export const prioridadeOutubro = [
    { name: "Alta", value: 15, percentage: 33.33 },
    { name: "Média", value: 20, percentage: 44.44 },
    { name: "Baixa", value: 8, percentage: 17.78 },
    { name: "Urgente", value: 2, percentage: 4.44 },
];

// NOVEMBRO - Prioridade - Total: 52
export const prioridadeNovembro = [
    { name: "Alta", value: 22, percentage: 42.31 },
    { name: "Média", value: 18, percentage: 34.62 },
    { name: "Baixa", value: 7, percentage: 13.46 },
    { name: "Urgente", value: 5, percentage: 9.62 },
];

// OUTUBRO - Tags/Módulos - Total: 45
export const moduloOutubro = [
    { name: "API", value: 14, percentage: 31.11 },
    { name: "Database", value: 12, percentage: 26.67 },
    { name: "Authentication", value: 8, percentage: 17.78 },
    { name: "Integration", value: 7, percentage: 15.56 },
    { name: "Performance", value: 4, percentage: 8.89 },
];

// NOVEMBRO - Tags/Módulos - Total: 52
export const moduloNovembro = [
    { name: "API", value: 18, percentage: 34.62 },
    { name: "Integration", value: 14, percentage: 26.92 },
    { name: "Database", value: 10, percentage: 19.23 },
    { name: "Authentication", value: 6, percentage: 11.54 },
    { name: "Performance", value: 4, percentage: 7.69 },
];

// Totais
export const totalBackendOutubro = 45;
export const totalBackendNovembro = 52;

// Cores por tipo de tarefa
export const TIPO_TAREFA_COLORS: Record<string, string> = {
    "Bug Fix": "#EF4444",        // Vermelho
    "Feature": "#22C55E",         // Verde
    "Improvement": "#3B82F6",     // Azul
    "Refactoring": "#A855F7",     // Roxo
    "Documentation": "#F59E0B",   // Amarelo
};

// Cores por prioridade
export const PRIORIDADE_COLORS: Record<string, string> = {
    "Urgente": "#EF4444",         // Vermelho
    "Alta": "#F97316",            // Laranja
    "Média": "#FACC15",           // Amarelo
    "Baixa": "#22C55E",           // Verde
};

// Cores por módulo
export const MODULO_COLORS: Record<string, string> = {
    "API": "#A855F7",             // Roxo primário
    "Database": "#3B82F6",        // Azul
    "Authentication": "#22C55E",  // Verde
    "Integration": "#EC4899",     // Rosa
    "Performance": "#F97316",     // Laranja
};

// Cores por responsável
export const RESPONSAVEL_COLORS: Record<string, string> = {
    "João Silva": "#A855F7",
    "Maria Santos": "#22C55E",
    "Pedro Costa": "#3B82F6",
    "Ana Oliveira": "#EC4899",
    "Lucas Ferreira": "#F59E0B",
};

// Helpers
export const getTipoTarefaColor = (name: string): string => {
    return TIPO_TAREFA_COLORS[name] || "#94A3B8";
};

export const getPrioridadeColor = (name: string): string => {
    return PRIORIDADE_COLORS[name] || "#94A3B8";
};

export const getModuloColor = (name: string): string => {
    return MODULO_COLORS[name] || "#94A3B8";
};

export const getResponsavelColor = (name: string): string => {
    return RESPONSAVEL_COLORS[name] || "#94A3B8";
};

// Calcular crescimento
export const calculateGrowth = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number((((current - previous) / previous) * 100).toFixed(1));
};

// KPIs Backend
export const kpisBackend = {
    totalOutubro: totalBackendOutubro,
    totalNovembro: totalBackendNovembro,
    totalGeral: totalBackendOutubro + totalBackendNovembro,
    variacaoTotal: calculateGrowth(totalBackendNovembro, totalBackendOutubro),
};

// Encontrar melhor performer
export const findBestPerformer = (data: { name: string; value: number }[]) => {
    return data.reduce((best, item) => (item.value > best.value ? item : best), data[0]);
};

// Encontrar maior crescimento entre meses
export const findBiggestGrowth = (
    outData: { name: string; value: number }[],
    novData: { name: string; value: number }[]
) => {
    const combined = outData.map((out) => {
        const nov = novData.find((n) => n.name === out.name);
        const novValue = nov?.value || 0;
        const growth = calculateGrowth(novValue, out.value);
        return { name: out.name, growth, outValue: out.value, novValue };
    });

    // Add items only in November
    novData.forEach((nov) => {
        if (!outData.find((o) => o.name === nov.name)) {
            combined.push({ name: nov.name, growth: 100, outValue: 0, novValue: nov.value });
        }
    });

    return combined.reduce((best, item) => (item.growth > best.growth ? item : best), combined[0]);
};
