import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { getProductColor, getNicheColor } from "@/data/globalColors";
import {
    kpis as kpisVSL,
    produtoOutubro as prodAvOut,
    produtoNovembro as prodAvNov,
    nichosOutubro as avNichoOut,
    nichosNovembro as avNichoNov
} from "@/data/dashboardData";
import {
    kpisAds,
    assigneeOutubro as adsAssigneeOut,
    assigneeNovembro as adsAssigneeNov,
    produtoAdsOutubro as prodAdsOut,
    produtoAdsNovembro as prodAdsNov,
    nichoOutubro as adsNichoOut,
    nichoNovembro as adsNichoNov
} from "@/data/dashboardAdsData";
import {
    kpisBackend,
    responsavelOutubro as backendAssigneeOut,
    responsavelNovembro as backendAssigneeNov,
    moduloOutubro as prodBackOut,
    moduloNovembro as prodBackNov,
    nichosOutubro as nichoBackOut,
    nichosNovembro as nichoBackNov
} from "@/data/dashboardBackendData";
import {
    kpisFunil,
    funilResponsaveisOutubro as funilAssigneeOut,
    funilResponsaveisNovembro as funilAssigneeNov,
    funilProdutosOutubro as prodFunilOut,
    funilProdutosNovembro as prodFunilNov,
    funilNichosOutubro as nichoFunilOut,
    funilNichosNovembro as nichoFunilNov
} from "@/data/dashboardFunilData";
import { Users, Server, Filter, Video, TrendingUp, BarChart3, Trophy, Medal, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// --- Logic Reuse from Resumo ---

// Helper to normalize and merge data for DIRECTION
const mergeProductData = () => {
    const productsMap = new Map<string, { name: string, av: number, ads: number, backend: number, funil: number, total: number }>();

    const addData = (data: { name: string, value: number }[], type: 'av' | 'ads' | 'backend' | 'funil') => {
        data.forEach(item => {
            const key = item.name.trim().toUpperCase();
            if (!productsMap.has(key)) {
                productsMap.set(key, { name: item.name, av: 0, ads: 0, backend: 0, funil: 0, total: 0 });
            }
            const entry = productsMap.get(key)!;
            entry[type] += item.value;
            entry.total += item.value;
            if (item.name.length > entry.name.length && item.name.toUpperCase() !== item.name) {
                entry.name = item.name;
            }
        });
    };

    addData(prodAvOut, 'av'); addData(prodAvNov, 'av');
    addData(prodAdsOut, 'ads'); addData(prodAdsNov, 'ads');
    addData(prodBackOut, 'backend'); addData(prodBackNov, 'backend');
    addData(prodFunilOut, 'funil'); addData(prodFunilNov, 'funil');

    return Array.from(productsMap.values())
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
};

const aggregatedNiches = (() => {
    const map = new Map<string, { name: string, av: number, ads: number, backend: number, funil: number, total: number }>();

    const process = (list: { name: string, value: number }[], field: 'av' | 'ads' | 'backend' | 'funil') => {
        list.forEach(i => {
            const k = i.name.toUpperCase().trim();
            const curr = map.get(k) || { name: i.name, av: 0, ads: 0, backend: 0, funil: 0, total: 0 };
            curr[field] += i.value;
            curr.total += i.value;
            map.set(k, curr);
        });
    }

    process(avNichoOut, 'av'); process(avNichoNov, 'av');
    process(adsNichoOut, 'ads'); process(adsNichoNov, 'ads');
    process(nichoBackOut, 'backend'); process(nichoBackNov, 'backend');
    process(nichoFunilOut, 'funil'); process(nichoFunilNov, 'funil');

    return Array.from(map.values())
        .sort((a, b) => b.total - a.total)
        .slice(0, 8);
})();

// --- People Logic ---

const mergePeopleData = (outData: any[] = [], novData: any[] = []) => {
    const map = new Map();
    const safeOut = Array.isArray(outData) ? outData : [];
    const safeNov = Array.isArray(novData) ? novData : [];

    safeOut.forEach(p => {
        if (p && p.name) map.set(p.name, { name: p.name, outubro: p.value || 0, novembro: 0 });
    });

    safeNov.forEach(p => {
        if (p && p.name) {
            const existing = map.get(p.name) || { name: p.name, outubro: 0, novembro: 0 };
            existing.novembro = p.value || 0;
            map.set(p.name, existing);
        }
    });

    return Array.from(map.values()).map((p: any) => ({
        ...p,
        total: (p.outubro || 0) + (p.novembro || 0),
        variacao: p.outubro === 0 ? (p.novembro > 0 ? 100 : 0) : ((p.novembro - p.outubro) / p.outubro) * 100
    })).sort((a: any, b: any) => b.total - a.total);
};

const LideresDashboard = () => {
    // 1. Strategic Data
    const topProducts = mergeProductData();
    const topNiches = aggregatedNiches;

    // 2. People Data
    // Note: VSL Data is currently missing individually in exports, using ADS for Audiovisual Team
    const adsPeople = mergePeopleData(adsAssigneeOut || [], adsAssigneeNov || []);
    const backendPeople = mergePeopleData(backendAssigneeOut || [], backendAssigneeNov || []);
    const funilPeople = mergePeopleData(funilAssigneeOut || [], funilAssigneeNov || []);

    // Combine Audiovisual (VSL + ADS) - Currently just ADS available
    const audiovisualPeople = [...adsPeople].sort((a, b) => b.total - a.total);

    // 3. Top Performers
    const topAv = audiovisualPeople[0];
    const topBackend = backendPeople[0];
    const topFunil = funilPeople[0];

    const renderPodiumCard = (title: string, person: any, icon: any, colorClass: string) => (
        <Card className="border-border shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-3 opacity-10 ${colorClass}`}>
                <Crown className="w-16 h-16" />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${colorClass.replace('text-', 'bg-').replace('600', '100')} ${colorClass}`}>
                        {person?.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <div className="text-xl font-bold">{person?.name}</div>
                        <div className="text-sm text-muted-foreground">{person?.total} entregas</div>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                    <Badge variant="outline" className="bg-background">
                        Top 1 Performance
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );

    const renderTable = (title: string, data: any[], icon: any, colorHex: string) => (
        <Card className="border-border h-full">
            <CardHeader className="border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2 text-lg">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[50%]">Nome</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Evolução</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 8).map((person, index) => (
                            <TableRow key={person.name}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    {index < 3 && <Medal className={`w-4 h-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />}
                                    {person.name}
                                </TableCell>
                                <TableCell className="text-right font-bold">{person.total}</TableCell>
                                <TableCell className="text-right">
                                    <span className={person.variacao > 0 ? "text-green-600" : "text-red-500"}>
                                        {person.variacao > 0 ? "+" : ""}{person.variacao.toFixed(0)}%
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background animate-fade-in space-y-8 pb-10">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Painel de Líderes"
                    subtitle="Alinhamento Estratégico & Alta Performance"
                    dashboardType="ads"
                />

                {/* Seção 1: Bússola Estratégica (Nicho e Produto) */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">Direção da Empresa</h2>
                        <span className="text-sm text-muted-foreground ml-2">(Sinergia entre Setores)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Chart: Top Niches */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Foco por Nicho</CardTitle>
                                <CardDescription>Onde estamos concentrando energia (Todos os setores)</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topNiches} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))' }} />
                                        <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                                            {topNiches.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getNicheColor(entry.name)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Chart: Top Products */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Foco por Produto</CardTitle>
                                <CardDescription>Produtos com maior tração operacional</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))' }} />
                                        <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                                            {topProducts.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getProductColor(entry.name)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Seção 2: Pódio de Performance */}
                <section>
                    <div className="flex items-center gap-2 mb-6 mt-10">
                        <Trophy className="w-6 h-6 text-amber-500" />
                        <h2 className="text-2xl font-bold">Top Performance</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderPodiumCard("Audiovisual & Ads", topAv, <Video className="w-4 h-4" />, "text-blue-600")}
                        {renderPodiumCard("Backend & Infra", topBackend, <Server className="w-4 h-4" />, "text-purple-600")}
                        {renderPodiumCard("Funil & Produção", topFunil, <Filter className="w-4 h-4" />, "text-green-600")}
                    </div>
                </section>

                {/* Seção 3: Detalhamento por Time */}
                <section>
                    <div className="flex items-center gap-2 mb-6 mt-10">
                        <Users className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">Performance da Equipe</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {renderTable("Audiovisual", audiovisualPeople, <Video className="w-5 h-5 text-blue-500" />, "#3B82F6")}
                        {renderTable("Backend", backendPeople, <Server className="w-5 h-5 text-purple-500" />, "#A855F7")}
                        {renderTable("Funil", funilPeople, <Filter className="w-5 h-5 text-green-500" />, "#22C55E")}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LideresDashboard;
