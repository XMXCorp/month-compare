import { getOfficialNiche } from "./officialProducts";


// Generated Data for Backend Funil
// Source: funil outubro.xlsx and funil novembro.xlsx

export interface FunilMetric {
    name: string;
    value: number;
    percentage: number;
}

export const funilTotalOutubro = 65;
export const funilTotalNovembro = 404;

export const funilResponsaveisOutubro = [
    {
        "name": "Felipe Godoy",
        "value": 17,
        "percentage": 26.15
    },
    {
        "name": "Bruno Carvalho",
        "value": 16,
        "percentage": 24.62
    },
    {
        "name": "Tharissa Sanches",
        "value": 8,
        "percentage": 12.31
    },
    {
        "name": "Webert Cunha",
        "value": 7,
        "percentage": 10.77
    },
    {
        "name": "Pedro Vilela Amelotti",
        "value": 5,
        "percentage": 7.69
    },
    {
        "name": "Moisés Costa",
        "value": 5,
        "percentage": 7.69
    },
    {
        "name": "Wesley Nunes",
        "value": 5,
        "percentage": 7.69
    },
    {
        "name": "Rodrigo Paes",
        "value": 4,
        "percentage": 6.15
    },
    {
        "name": "Emilly Miller",
        "value": 3,
        "percentage": 4.62
    }
];
export const funilResponsaveisNovembro = [
    {
        "name": "Victoria Regina",
        "value": 103,
        "percentage": 25.5
    },
    {
        "name": "Rodrigo Paes",
        "value": 46,
        "percentage": 11.39
    },
    {
        "name": "Tharissa Sanches",
        "value": 39,
        "percentage": 9.65
    },
    {
        "name": "Emilly Miller",
        "value": 36,
        "percentage": 8.91
    },
    {
        "name": "Felipe Godoy",
        "value": 31,
        "percentage": 7.67
    },
    {
        "name": "Matheus Kaio",
        "value": 31,
        "percentage": 7.67
    },
    {
        "name": "Eliane Santos",
        "value": 27,
        "percentage": 6.68
    },
    {
        "name": "Caio Carneiro",
        "value": 24,
        "percentage": 5.94
    },
    {
        "name": "Moisés Costa",
        "value": 23,
        "percentage": 5.69
    },
    {
        "name": "Pedro Vilela Amelotti",
        "value": 19,
        "percentage": 4.7
    },
    {
        "name": "Bruno Carvalho",
        "value": 16,
        "percentage": 3.96
    },
    {
        "name": "Pedro Santiago",
        "value": 11,
        "percentage": 2.72
    },
    {
        "name": "João Pedro Xavier Millen Penedo",
        "value": 4,
        "percentage": 0.99
    },
    {
        "name": "Denner Silva",
        "value": 3,
        "percentage": 0.74
    },
    {
        "name": "Wesley Nunes",
        "value": 3,
        "percentage": 0.74
    },
    {
        "name": "Leonardo Cruz",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Jamile Castro Félix",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Não Atribuído",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Mariana Freitas",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "Paulo Mitis",
        "value": 1,
        "percentage": 0.25
    }
];

export const funilProdutosOutubro = [
    {
        "name": "️ Presgera",
        "value": 17,
        "percentage": 26.15
    },
    {
        "name": "Memyts",
        "value": 12,
        "percentage": 18.46
    },
    {
        "name": "Arialief Neuropathy",
        "value": 11,
        "percentage": 16.92
    },
    {
        "name": "Todos Produtos",
        "value": 7,
        "percentage": 10.77
    },
    {
        "name": "Laellium",
        "value": 5,
        "percentage": 7.69
    },
    {
        "name": "Karylief",
        "value": 3,
        "percentage": 4.62
    },
    {
        "name": "Feilaira",
        "value": 3,
        "percentage": 4.62
    },
    {
        "name": "Alphacur",
        "value": 2,
        "percentage": 3.08
    },
    {
        "name": "Alitoryn",
        "value": 2,
        "percentage": 3.08
    },
    {
        "name": "️garaherb",
        "value": 1,
        "percentage": 1.54
    },
    {
        "name": "Korvizol",
        "value": 1,
        "percentage": 1.54
    },
    {
        "name": "Operação Geral",
        "value": 1,
        "percentage": 1.54
    }
];
export const funilProdutosNovembro = [
    {
        "name": "Laellium",
        "value": 77,
        "percentage": 19.06
    },
    {
        "name": "Memyts",
        "value": 70,
        "percentage": 17.33
    },
    {
        "name": "️ Presgera",
        "value": 52,
        "percentage": 12.87
    },
    {
        "name": "️jertaris",
        "value": 44,
        "percentage": 10.89
    },
    {
        "name": "️garaherb",
        "value": 32,
        "percentage": 7.92
    },
    {
        "name": "Blinzador",
        "value": 23,
        "percentage": 5.69
    },
    {
        "name": "Arialief Neuropathy",
        "value": 23,
        "percentage": 5.69
    },
    {
        "name": "Karylief",
        "value": 21,
        "percentage": 5.2
    },
    {
        "name": "Feilaira",
        "value": 12,
        "percentage": 2.97
    },
    {
        "name": "Alphacur",
        "value": 11,
        "percentage": 2.72
    },
    {
        "name": "Korvizol",
        "value": 9,
        "percentage": 2.23
    },
    {
        "name": "Alitoryn",
        "value": 5,
        "percentage": 1.24
    },
    {
        "name": "Todos Produtos",
        "value": 5,
        "percentage": 1.24
    },
    {
        "name": "Mahgryn",
        "value": 4,
        "percentage": 0.99
    },
    {
        "name": "Olisteren",
        "value": 3,
        "percentage": 0.74
    },
    {
        "name": "🪸zerevest",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Keskara",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Basmontex",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Operação Geral",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Cetadusse",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "Kymezol",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "Cucudrops",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "Goldenfrib",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "‍ Vergolief",
        "value": 1,
        "percentage": 0.25
    }
];

// Helper for dynamic niche calculation
const calculateNiches = (products: { name: string; value: number }[]) => {
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

export const funilNichosOutubro = calculateNiches(funilProdutosOutubro);
export const funilNichosNovembro = calculateNiches(funilProdutosNovembro);


export const funilSquadsOutubro = [
    {
        "name": "Funil",
        "value": 30,
        "percentage": 46.15
    },
    {
        "name": "Produto",
        "value": 30,
        "percentage": 46.15
    },
    {
        "name": "Backend 🪣",
        "value": 5,
        "percentage": 7.69
    }
];
export const funilSquadsNovembro = [
    {
        "name": "Produto",
        "value": 171,
        "percentage": 42.33
    },
    {
        "name": "Funil",
        "value": 127,
        "percentage": 31.44
    },
    {
        "name": "Dados",
        "value": 54,
        "percentage": 13.37
    },
    {
        "name": "Backend 🪣",
        "value": 47,
        "percentage": 11.63
    },
    {
        "name": "Afiliados",
        "value": 2,
        "percentage": 0.5
    },
    {
        "name": "Suporte ️",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "Tráfego",
        "value": 1,
        "percentage": 0.25
    },
    {
        "name": "Gestão",
        "value": 1,
        "percentage": 0.25
    }
];

export const funilPlataformasOutubro = [
    {
        "name": "Cartpanda",
        "value": 43,
        "percentage": 66.15
    },
    {
        "name": "Todas",
        "value": 9,
        "percentage": 13.85
    },
    {
        "name": "Buygoods",
        "value": 8,
        "percentage": 12.31
    },
    {
        "name": "Não Informado",
        "value": 2,
        "percentage": 3.08
    },
    {
        "name": "Clickbank",
        "value": 2,
        "percentage": 3.08
    },
    {
        "name": "Digistore24",
        "value": 1,
        "percentage": 1.54
    }
];
export const funilPlataformasNovembro = [
    {
        "name": "Cartpanda",
        "value": 278,
        "percentage": 68.81
    },
    {
        "name": "Todas",
        "value": 77,
        "percentage": 19.06
    },
    {
        "name": "Clickbank",
        "value": 38,
        "percentage": 9.41
    },
    {
        "name": "Buygoods",
        "value": 11,
        "percentage": 2.72
    }
];

export const funilSetoresOutubro = [
    {
        "name": "Funil",
        "value": 28,
        "percentage": 43.08
    },
    {
        "name": "Produto",
        "value": 19,
        "percentage": 29.23
    },
    {
        "name": "Tecnologia",
        "value": 12,
        "percentage": 18.46
    },
    {
        "name": "Reembolso",
        "value": 3,
        "percentage": 4.62
    },
    {
        "name": "Design",
        "value": 3,
        "percentage": 4.62
    }
];
export const funilSetoresNovembro = [
    {
        "name": "Produto",
        "value": 179,
        "percentage": 44.31
    },
    {
        "name": "Tecnologia",
        "value": 110,
        "percentage": 27.23
    },
    {
        "name": "Design",
        "value": 56,
        "percentage": 13.86
    },
    {
        "name": "Funil",
        "value": 51,
        "percentage": 12.62
    },
    {
        "name": "Copy ️",
        "value": 7,
        "percentage": 1.73
    },
    {
        "name": "Gestão",
        "value": 1,
        "percentage": 0.25
    }
];

export const kpisFunil = {
    totalOutubro: funilTotalOutubro,
    totalNovembro: funilTotalNovembro,
    totalGeral: funilTotalOutubro + funilTotalNovembro,
    variacao: funilTotalOutubro === 0 ? 100 : Number((((funilTotalNovembro - funilTotalOutubro) / funilTotalOutubro) * 100).toFixed(1))
};
