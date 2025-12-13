// Dados extraídos dos Excel de Outubro e Novembro 2025 - Dashboard ADS
// Outubro: 51 registros | Novembro: 48 registros
import { getOfficialNiche, OFFICIAL_NICHE_COLORS } from "./officialProducts";

// OUTUBRO - Produtos - Total: 51
export const produtoAdsOutubro = [
  { name: "MEMYTS", value: 28, percentage: 54.90 },
  { name: "LAELLIUM", value: 17, percentage: 33.33 },
  { name: "GARAHERB", value: 2, percentage: 3.92 },
  { name: "BLINZADOR", value: 2, percentage: 3.92 },
  { name: "KARYLIEF", value: 1, percentage: 1.96 },
  { name: "VAZIO", value: 1, percentage: 1.96 },
];

// NOVEMBRO - Produtos - Total: 48
export const produtoAdsNovembro = [
  { name: "KARYLIEF", value: 17, percentage: 35.42 },
  { name: "MEMYTS", value: 13, percentage: 27.08 },
  { name: "JERTARIS", value: 10, percentage: 20.83 },
  { name: "GARAHERB", value: 4, percentage: 8.33 },
  { name: "BLINZADOR", value: 3, percentage: 6.25 },
  { name: "KORVIZOL", value: 1, percentage: 2.08 },
];

// Helper to calc niches
const calculateNiches = (products: typeof produtoAdsOutubro) => {
  const nicheMap = new Map<string, number>();
  products.forEach(p => {
    const niche = getOfficialNiche(p.name);
    const val = nicheMap.get(niche) || 0;
    nicheMap.set(niche, val + p.value);
  });

  const total = Array.from(nicheMap.values()).reduce((a, b) => a + b, 0);
  return Array.from(nicheMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: Number(((value / total) * 100).toFixed(2))
    }))
    .sort((a, b) => b.value - a.value);
};

// DERIVED NICHES from Official Map
export const nichoOutubro = calculateNiches(produtoAdsOutubro);
export const nichoNovembro = calculateNiches(produtoAdsNovembro);

// OUTUBRO - Squads - Total: 51
export const squadOutubro = [
  { name: "GOOGLE", value: 46, percentage: 90.20 },
  { name: "AFILIADOS", value: 5, percentage: 9.80 },
];

// NOVEMBRO - Squads - Total: 48
export const squadNovembro = [
  { name: "GOOGLE", value: 37, percentage: 77.08 },
  { name: "AFILIADOS", value: 11, percentage: 22.92 },
];

// OUTUBRO - Assignees - Total: 51
export const assigneeOutubro = [
  { name: "Rafael Andrade", value: 28, percentage: 54.90 },
  { name: "Leonardo da Silva", value: 20, percentage: 39.22 },
  { name: "Bruno Cesar", value: 3, percentage: 5.88 },
];

// NOVEMBRO - Assignees - Total: 48
export const assigneeNovembro = [
  { name: "Rafael Andrade", value: 26, percentage: 54.17 },
  { name: "Leonardo da Silva", value: 18, percentage: 37.50 },
  { name: "Amanda Peralli Machado", value: 2, percentage: 4.17 },
  { name: "Bruno Cesar", value: 1, percentage: 2.08 },
  { name: "Colaborativo", value: 1, percentage: 2.08 },
];

// Totais
export const totalAdsOutubro = 51;
export const totalAdsNovembro = 48;

// Cores por squad
export const SQUAD_COLORS: Record<string, string> = {
  "GOOGLE": "#A855F7",        // Roxo primário
  "AFILIADOS": "#FACC15",     // Amarelo
};

// Cores por produto ADS
export const PRODUTO_ADS_COLORS: Record<string, string> = {
  "MEMYTS": "#A855F7",        // Roxo
  "LAELLIUM": "#38BDF8",      // Azul
  "GARAHERB": "#22C55E",      // Verde
  "BLINZADOR": "#EC4899",     // Rosa
  "KARYLIEF": "#FACC15",      // Amarelo
  "JERTARIS": "#F97316",      // Laranja
  "KORVIZOL": "#06B6D4",      // Cyan
  "VAZIO": "#64748B",         // Slate
};

// Helpers
export const getNichoColor = (name: string): string => {
  return OFFICIAL_NICHE_COLORS[name] || "#94A3B8";
};

export const getSquadColor = (name: string): string => {
  return SQUAD_COLORS[name.toUpperCase()] || SQUAD_COLORS[name] || "#94A3B8";
};

export const getProdutoAdsColor = (name: string): string => {
  return PRODUTO_ADS_COLORS[name.toUpperCase()] || PRODUTO_ADS_COLORS[name] || "#94A3B8";
};

// Calcular crescimento
export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

// KPIs ADS
export const kpisAds = {
  totalOutubro: totalAdsOutubro,
  totalNovembro: totalAdsNovembro,
  totalGeral: totalAdsOutubro + totalAdsNovembro,
  variacaoTotal: calculateGrowth(totalAdsNovembro, totalAdsOutubro),
};
