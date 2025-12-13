
/**
 * OFFICIAL PRODUCT - NICHE MAPPING
 * Generated from 'todos produtos excel.xlsx'
 */

export const OFFICIAL_PRODUCT_MAP: Record<string, string> = {
    "🧘‍♀️ DANMYTS": "⚡ ENERGY",
    "🧘‍♀️DANMYTS": "⚡ ENERGY",
    "🌿FELAROMI": "🌿 GREENS",
    "💧BLINZADOR": "🍄 FUNGOS",
    "🪸ZEREVEST": "🍄 FUNGOS",
    "⚡️GARAHERB": "🍆 ADULTO",
    "🐴 MAX TROIANO": "🍆 ADULTO",
    "🐴MAXTROIANO": "🍆 ADULTO",
    "💪KEDAFILA": "🍆 ADULTO",
    "🥷 KESKARA": "🍆 ADULTO",
    "🥷KESKARA": "🍆 ADULTO",
    "ERECTOZYN": "🍆 ADULTO",
    "🥣 FARULENA": "🍜 GUT",
    "🥣FARULENA": "🍜 GUT",
    "LAELLIUM GUT": "🍜 GUT",
    "LAELLIUMGUT": "🍜 GUT",
    "✨ATHENTYS": "🎯 CONCENTRAÇÃO",
    "👀CERAMIRI": "👁️ VISÃO",
    "☝️JERTARIS": "👆 PROSTATE",
    "💥 RESVERADOR": "💥 BOOST",
    "💥RESVERADOR": "💥 BOOST",
    "🌟GOLDENFRIB": "💩 CONSTIPAÇÃO",
    "💊 MAHGRYN": "💪 EMAGRECIMENTO",
    "💊MAHGRYN": "💪 EMAGRECIMENTO",
    "🔥LAELLIUM": "💪 EMAGRECIMENTO",
    "🥒CUCUDROPS": "💪 EMAGRECIMENTO",
    "🧘‍♀️ LIPOZEM": "💪 EMAGRECIMENTO",
    "🧘‍♀️LIPOZEM": "💪 EMAGRECIMENTO",
    "🤧ZALOVIRA": "🔋IMMUNE SUPPORT",
    "BASMONTEX ⛰️": "🦶 JOINT",
    "BASMONTEX⛰️": "🦶 JOINT",
    "FEILAIRA 🦶": "🦶 JOINT",
    "FEILAIRA🦶": "🦶 JOINT",
    "ALITORYN": "🦷 DENTAL",
    "KARYLIEF": "🦻TINNITUS",
    "OLISTEREN": "🦻TINNITUS",
    "💭 MEMYTS": "🧠 MEMORY",
    "💭MEMYTS": "🧠 MEMORY",
    "HALEGRYN": "🧠 MEMORY",
    "VELYNIVO": "🧴 SKIN",
    "🍭CETADUSSE": "🩸BLOOD",
    "🎈TENURIMA": "🩸BLOOD",
    "⚙️PRESGERA": "🩻 NERVE PAIN",
    "🌼KORVIZOL": "🩻 NERVE PAIN",
    "🦴CETACONDOR": "🩻 NERVE PAIN",
    "🧬ALPHACUR": "🩻 NERVE PAIN",
    "🩻 SCIATILIEF": "🩻 NERVE PAIN",
    "🩻SCIATILIEF": "🩻 NERVE PAIN",
    "🩻ARIALIEF": "🩻 NERVE PAIN",
    "ARIOVIRA": "🩻 NERVE PAIN",
    "KYMEZOL": "🩻 NERVE PAIN",
    "NEUROPATHY": "🩻 NERVE PAIN",
    "😴 XELOVITA": "😴 SLEEP",
    "😴XELOVITA": "😴 SLEEP",
    "MEMYTS DREAM": "😴 SLEEP",
    "MEMYTSDREAM": "😴 SLEEP",
    "VERGOLIEF": "😵‍💫VERTIGEM"
};

export const OFFICIAL_NICHE_COLORS: Record<string, string> = {
    "⚡ ENERGY": "#EF4444",
    "🌿 GREENS": "#F97316",
    "🍄 FUNGOS": "#F59E0B",
    "🍆 ADULTO": "#84CC16",
    "🍜 GUT": "#22C55E",
    "🎯 CONCENTRAÇÃO": "#10B981",
    "👁️ VISÃO": "#14B8A6",
    "👆 PROSTATE": "#06B6D4",
    "💥 BOOST": "#0EA5E9",
    "💩 CONSTIPAÇÃO": "#3B82F6",
    "💪 EMAGRECIMENTO": "#6366F1",
    "🔋IMMUNE SUPPORT": "#8B5CF6",
    "🦶 JOINT": "#A855F7",
    "🦷 DENTAL": "#D946EF",
    "🦻TINNITUS": "#EC4899",
    "🧠 MEMORY": "#F43F5E",
    "🧴 SKIN": "#E11D48",
    "🩸BLOOD": "#BE123C",
    "🩻 NERVE PAIN": "#881337",
    "🫁 LUNG": "#4C1D95",
    "😴 SLEEP": "#EF4444",
    "😵‍💫VERTIGEM": "#F97316"
};

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
