import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { kpis as kpisVSL } from "@/data/dashboardData";
import { kpisAds } from "@/data/dashboardAdsData";
import { Video, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import { SECTOR_COLORS } from "@/data/globalColors";

const AudiovisualCompiled = () => {
    // Aggregation Logic
    const totalOutubro = kpisVSL.totalOutubro + kpisAds.totalOutubro;
    const totalNovembro = kpisVSL.totalNovembro + kpisAds.totalNovembro;
    const totalGeral = totalOutubro + totalNovembro;
    const variacao = totalOutubro === 0 ? 100 : ((totalNovembro - totalOutubro) / totalOutubro) * 100;

    const comparisonData = [
        { name: "VSLs", Outubro: kpisVSL.totalOutubro, Novembro: kpisVSL.totalNovembro },
        { name: "ADS", Outubro: kpisAds.totalOutubro, Novembro: kpisAds.totalNovembro },
    ];

    const distributionData = [
        { name: "VSLs", value: kpisVSL.totalGeral, color: SECTOR_COLORS.Audiovisual },
        { name: "ADS", value: kpisAds.totalGeral, color: SECTOR_COLORS.ADS },
    ];

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Audiovisual - Visão Geral"
                    subtitle="Compilado VSLs + ADS • Performance Integrada"
                    dashboardType="ads"
                />

                <main className="space-y-8 mt-8">
                    {/* KPIs */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Total Produzido"
                            value={totalGeral}
                            previousValue={0}
                            subtitle="Soma VSLs + ADS (2 Meses)"
                            icon={<Video className="w-5 h-5" />}
                            variant="primary"
                            delay={0}
                        />
                        <MetricCard
                            title="Outubro"
                            value={totalOutubro}
                            previousValue={0}
                            subtitle="Total de entregas"
                            icon={<BarChart3 className="w-5 h-5" />}
                            variant="primary"
                            delay={100}
                        />
                        <MetricCard
                            title="Novembro"
                            value={totalNovembro}
                            previousValue={totalOutubro}
                            subtitle="Total de entregas"
                            icon={<BarChart3 className="w-5 h-5" />}
                            variant="accent"
                            delay={200}
                        />
                        <MetricCard
                            title="Variação Mensal"
                            value={`${variacao > 0 ? '+' : ''}${variacao.toFixed(1)}%`}
                            subtitle={variacao >= 0 ? "Crescimento" : "Redução"}
                            icon={<TrendingUp className="w-5 h-5" />}
                            variant={variacao >= 0 ? "success" : "primary"}
                            delay={300}
                        />
                    </section>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 border-primary/10 shadow-md">
                            <CardHeader>
                                <CardTitle>Comparativo por Tipo (Out vs Nov)</CardTitle>
                                <CardDescription>Volume de entregas segmentado</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend />
                                        <Bar dataKey="Outubro" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Outubro" />
                                        <Bar dataKey="Novembro" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Novembro" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/10 shadow-md">
                            <CardHeader>
                                <CardTitle>Distribuição Total</CardTitle>
                                <CardDescription>VSLs vs ADS (Geral)</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={distributionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {distributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Recharts Wrapper
const RechartsPieChart = (props: any) => <PieChartComponent {...props} />;
import { PieChart as PieChartComponent } from "recharts";

export default AudiovisualCompiled;
