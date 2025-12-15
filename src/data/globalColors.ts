import { OFFICIAL_NICHE_COLORS as BASE_NICHE_COLORS } from "./officialProducts";

/**
 * GLOBAL COLOR PALETTE
 * Single source of truth for all domain entities.
 */

// 1. PRODUCTS
// Specific colors for top products. Fallback for others.
export const PRODUCT_COLORS: Record<string, string> = {
    // Top Performers
    "MEMYTS": "#8B5CF6",    // Violet (Memory)
    "LAELLIUM": "#3B82F6",  // Blue (Weight)
    "GARAHERB": "#22C55E",  // Green (Adult)
    "PRESGERA": "#F97316",  // Orange (Nerve)
    "JERTARIS": "#EAB308",  // Yellow (Prostate)
    "KARYLIEF": "#EC4899",  // Pink (Tinnitus)
    "BLINZADOR": "#14B8A6", // Teal (Fungus)
    "ZEREVEST": "#06B6D4",  // Cyan (Fungus)
    "ALPHACUR": "#6366F1",  // Indigo
    "FEILAIRA": "#F43F5E",  // Rose
    "KEDAFILA": "#84CC16",  // Lime
    "MAX TROIANO": "#10B981", // Emerald
    "LIPOZEM": "#0EA5E9",   // Sky
    "CUCUDROPS": "#A855F7", // Purple
    "MAHGRYN": "#D946EF",   // Fuchsia
};

// Helper to clean names and remove emojis/symbols
export const cleanName = (name: string): string => {
    return name.replace(/[^\w\s\u00C0-\u00FF]/g, '').trim().toUpperCase();
};

export const getProductColor = (productName: string): string => {
    const key = cleanName(productName);

    // 1. Direct match
    if (PRODUCT_COLORS[key]) return PRODUCT_COLORS[key];

    // 2. Fuzzy / Substring match
    const knownProducts = Object.keys(PRODUCT_COLORS);
    const match = knownProducts.find(p => key.includes(p) || p.includes(key));
    if (match) return PRODUCT_COLORS[match];

    return "#94A3B8"; // Slate-400 (Neutral)
};

// 2. NICHES
// Re-export or extend official niche colors
export const NICHE_COLORS = { ...BASE_NICHE_COLORS };

export const getNicheColor = (nicheName: string): string => {
    const key = cleanName(nicheName);

    // Direct match
    if (NICHE_COLORS[key]) return NICHE_COLORS[key];

    // Fuzzy match
    const knownNiches = Object.keys(NICHE_COLORS);
    const match = knownNiches.find(n => key.includes(n) || n.includes(key));
    if (match) return NICHE_COLORS[match];

    return "#94A3B8";
};

// 3. SECTORS
export const SECTOR_COLORS = {
    "Audiovisual": "#3B82F6", // Blue
    "ADS": "#F59E0B",         // Amber
    "Backend": "#A855F7",     // Purple
    "Funil": "#22C55E",       // Green
};
