import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Target, Video, Server, TrendingUp, Layers } from "lucide-react";

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

// --- Aggregation Logic ---

// Helper to normalize and merge data
const mergeProductData = () => {
    const productsMap = new Map<string, { name: string, av: number, ads: number, backend: number }>();

    // Helper to add data
    const addData = (data: { name: string, value: number }[], type: 'av' | 'ads' | 'backend') => {
        data.forEach(item => {
            const key = item.name.trim().toUpperCase();
            if (!productsMap.has(key)) {
                productsMap.set(key, { name: item.name, av: 0, ads: 0, backend: 0 });
            }
            const entry = productsMap.get(key)!;
            entry[type] += item.value;
            // Update name to most common casing or non-UPPER if found
            if (item.name.length > entry.name.length && item.name.toUpperCase() !== item.name) {
                entry.name = item.name;
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

    return Array.from(productsMap.values())
        .sort((a, b) => (b.av + b.ads + b.backend) - (a.av + a.ads + a.backend))
        .slice(0, 10); // Top 10 Products by Activity
};

const topProducts = mergeProductData();

// Aggregate Nichos (Audiovisual + Backend + Ads)
const aggregatedNiches = (() => {
    const map = new Map<string, { name: string, av: number, ads: number, backend: number }>();

    // Updated process to handle 3 types
    const process = (list: { name: string, value: number }[], field: 'av' | 'ads' | 'backend') => {
        list.forEach(i => {
            const k = i.name.toUpperCase().trim();
            const curr = map.get(k) || { name: i.name, av: 0, ads: 0, backend: 0 };
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

    return Array.from(map.values())
        .sort((a, b) => (b.av + b.ads + b.backend) - (a.av + a.ads + a.backend))
        .slice(0, 8);
})();

const Resumo = () => {
    // Total Stats
    const totalAv = kpisAv.totalGeral;
    const totalAds = kpisAds.totalGeral;
    const totalBack = kpisBackend.totalGeral;

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Resumo Executivo"
                    subtitle="Visão Consolidada: Audiovisual, ADS e Backend"
                    dashboardType="general"
                />

                <main className="space-y-8 mt-8">
                    {/* Top KPIs */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    </section>

                    {/* Product Focus Chart */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Layers className="w-5 h-5 text-primary" />
                                Foco por Produto (Top 10)
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                Volume total de atividades consolidado (Audiovisual + ADS + Backend)
                            </p>
                        </div>

                        <ChartCard title="" className="h-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={topProducts}
                                    layout="vertical"
                                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                    <XAxis type="number" />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={100}
                                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                        cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="av" name="Audiovisual" stackId="a" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                                    <Bar dataKey="ads" name="ADS" stackId="a" fill="#F59E0B" />
                                    <Bar dataKey="backend" name="Backend" stackId="a" fill="#22C55E" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </section>

                    {/* Niche Analysis */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Direção por Nicho
                            </h2>
                            <div className="space-y-4">
                                {aggregatedNiches.map((niche, i) => {
                                    const total = niche.av + niche.ads + niche.backend;
                                    const max = aggregatedNiches[0].av + aggregatedNiches[0].ads + aggregatedNiches[0].backend;

                                    return (
                                        <div key={niche.name} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
                                            <div className="w-full">
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">{niche.name}</span>
                                                    <span className="text-sm text-muted-foreground">{total} ações</span>
                                                </div>
                                                <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                                                    <div style={{ width: `${(niche.av / total) * 100}%` }} className="bg-blue-500 h-full" title="Audiovisual" />
                                                    <div style={{ width: `${(niche.ads / total) * 100}%` }} className="bg-amber-500 h-full" title="ADS" />
                                                    <div style={{ width: `${(niche.backend / total) * 100}%` }} className="bg-green-500 h-full" title="Backend" />
                                                </div>
                                                <div className="flex justify-between text-[10px] mt-1 text-muted-foreground">
                                                    <span>AV: {niche.av}</span>
                                                    <span>ADS: {niche.ads}</span>
                                                    <span>Back: {niche.backend}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Insights Text / Summary */}
                        <div className="bg-muted/30 p-6 rounded-2xl border border-border h-fit">
                            <h3 className="font-semibold text-lg mb-4">Resumo Estratégico</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                        O produto <strong className="text-foreground">{topProducts[0]?.name}</strong> lidera as iniciativas da empresa,
                                        sendo o foco principal em todas as áreas.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                        O nicho de <strong className="text-foreground">{aggregatedNiches[0]?.name}</strong> domina a produção total,
                                        unificando esforços de Audiovisual, ADS e Backend.
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                        Visualização unificada: As cores e categorias agora seguem estritamente a planilha "Todos Produtos Excel".
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
