import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { getProductColor, getNicheColor, cleanName } from "@/data/globalColors";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { Target, Video, Server, TrendingUp, Layers, Filter } from "lucide-react";

// Data Imports
import {
    kpis as kpisAv,
    produtoOutubro as prodAvOut,
    produtoNovembro as prodAvNov,
    nichosOutubro as avNichoOut,
    nichosNovembro as avNichoNov
} from "@/data/dashboardData";
import {
    kpisAds,
    produtoAdsOutubro as prodAdsOut,
    produtoAdsNovembro as prodAdsNov,
    nichoOutubro as adsNichoOut,
    nichoNovembro as adsNichoNov
} from "@/data/dashboardAdsData";
import {
    kpisBackend,
    moduloOutubro as prodBackOut,
    moduloNovembro as prodBackNov,
    nichosOutubro as nichoBackOut,
    nichosNovembro as nichoBackNov
} from "@/data/dashboardBackendData";
import {
    kpisFunil,
    funilProdutosOutubro as prodFunilOut,
    funilProdutosNovembro as prodFunilNov,
    //    funilNichosOutubro as nichoFunilOut,
    //    funilNichosNovembro as nichoFunilNov
    funilNichosOutubro as nichoFunilOut,
    funilNichosNovembro as nichoFunilNov
} from "@/data/dashboardFunilData";

// --- Aggregation Logic ---

// Helper to normalize and merge data
const mergeProductData = () => {
    const productsMap = new Map<string, { name: string, av: number, ads: number, backend: number, funil: number }>();

    // Helper to add data
    const addData = (data: { name: string, value: number }[], type: 'av' | 'ads' | 'backend' | 'funil') => {
        data.forEach(item => {
            const key = cleanName(item.name); // Normalize key
            if (!productsMap.has(key)) {
                productsMap.set(key, { name: item.name, av: 0, ads: 0, backend: 0, funil: 0 });
            }
            const entry = productsMap.get(key)!;
            entry[type] += item.value;
            // Prefer cleaner names if available
            if (cleanName(item.name).length === item.name.length && item.name.length < entry.name.length) {
                // Heuristic: If new name is clean and shorter (or just prefer standard casing)
                // Actually, let's just keep the first one or update if it looks better. 
                // For now, simple aggregation is key.
            }
        });
    };

    // Aggregate ALL (Outubro + Novembro) for a total picture
    addData(prodAvOut, 'av');
    addData(prodAvNov, 'av');
    addData(prodAdsOut, 'ads');
    addData(prodAdsNov, 'ads');
    addData(prodBackOut, 'backend');
    addData(prodBackNov, 'backend');
    addData(prodFunilOut, 'funil');
    addData(prodFunilNov, 'funil');

    return Array.from(productsMap.values())
        .map(item => ({
            ...item,
            total: item.av + item.ads + item.backend + item.funil
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10); // Top 10 Products by Activity
};

const topProducts = mergeProductData();

// Aggregate Nichos (Audiovisual + Backend + Ads + Funil)
const aggregatedNiches = (() => {
    const map = new Map<string, { name: string, av: number, ads: number, backend: number, funil: number }>();

    // Updated process to handle 4 types
    const process = (list: { name: string, value: number }[], field: 'av' | 'ads' | 'backend' | 'funil') => {
        list.forEach(i => {
            const k = cleanName(i.name);
            const curr = map.get(k) || { name: i.name, av: 0, ads: 0, backend: 0, funil: 0 };
            curr[field] += i.value;
            map.set(k, curr);
        });
    }

    process(avNichoOut, 'av');
    process(avNichoNov, 'av');
    process(adsNichoOut, 'ads');
    process(adsNichoNov, 'ads');
    process(nichoBackOut, 'backend');
    process(nichoBackNov, 'backend');
    process(nichoFunilOut, 'funil');
    process(nichoFunilNov, 'funil');

    return Array.from(map.values())
        .map(item => ({
            ...item,
            total: item.av + item.ads + item.backend + item.funil
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 8);
})();

const Resumo = () => {
    // Total Stats
    const totalAv = kpisAv.totalGeral;
    const totalAds = kpisAds.totalGeral;
    const totalBack = kpisBackend.totalGeral;
    const totalFunil = kpisFunil.totalGeral;

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Resumo Executivo"
                    subtitle="Visão Consolidada: Audiovisual, ADS, Backend e Funil"
                    dashboardType="ads"
                />

                <main className="space-y-8 mt-8">
                    {/* Top KPIs */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Produção Audiovisual"
                            subtitle="VSLs e Criativos (Out+Nov)"
                            value={totalAv}
                            icon={<Video className="w-5 h-5" />}
                            variant="primary"
                            previousValue={0}
                        />
                        <MetricCard
                            title="Desempenho ADS"
                            subtitle="Campanhas/Criativos (Out+Nov)"
                            value={totalAds}
                            icon={<Target className="w-5 h-5" />}
                            variant="accent"
                            previousValue={0}
                        />
                        <MetricCard
                            title="Produção Backend"
                            subtitle="Tarefas e Features (Out+Nov)"
                            value={totalBack}
                            icon={<Server className="w-5 h-5" />}
                            variant="success"
                            previousValue={0}
                        />
                        <MetricCard
                            title="Produção Funil"
                            subtitle="Tarefas e Entregas (Out+Nov)"
                            value={totalFunil}
                            icon={<Filter className="w-5 h-5" />}
                            variant="secondary"
                            previousValue={0}
                        />
                    </section>

                    {/* Strategic Compass (Product & Niche) */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ChartCard title="Foco por Produto (Top 10)" subtitle="Consolidado (AV + ADS + Backend + Funil)">
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                                        <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                                            {topProducts.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getProductColor(entry.name)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        <ChartCard title="Direção por Nicho" subtitle="Alinhamento Estratégico da Empresa">
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={aggregatedNiches} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                                        <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                                            {aggregatedNiches.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getNicheColor(entry.name)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>
                    </section>

                    {/* Text Summary */}
                    <section>
                        <div className="bg-muted/30 p-6 rounded-2xl border border-border h-fit">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Resumo Estratégico
                            </h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                        O produto <strong className="text-foreground">{topProducts[0]?.name}</strong> se destaca como o maior foco operacional da empresa,
                                        liderando o volume de entregas somadas entre todas as squads.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                        O nicho de <strong className="text-foreground">{aggregatedNiches[0]?.name}</strong> representa a maior fatia de produção técnica e criativa,
                                        evidenciando a prioridade estratégica atual.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                        Integração Completa: Os dados refletem a totalidade das operações,
                                        unificando Audiovisual, ADS, Backend e Funil com métricas coerentes.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Resumo;
