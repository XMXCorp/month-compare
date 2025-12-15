import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { BackendCustomFieldsComparison } from "@/components/dashboard-backend/BackendCustomFieldsComparison";
import { BackendModulesChart } from "@/components/dashboard-backend/BackendModulesChart";
import { Filter, Code, Flag, TrendingUp, TrendingDown, Layers } from "lucide-react";

import {
    funilTotalOutubro, funilTotalNovembro,
    kpisFunil,
    funilProdutosOutubro, funilProdutosNovembro,
    funilNichosOutubro, funilNichosNovembro,
    funilSquadsOutubro, funilSquadsNovembro,
    funilPlataformasOutubro, funilPlataformasNovembro,
    funilSetoresOutubro, funilSetoresNovembro
} from "@/data/dashboardFunilData";

import { getNicheColor } from "@/data/globalColors";

// removed local getColor helper


const BackendFunil = () => {
    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Funil de Desenvolvimento"
                    subtitle="Análise Comparativa • Equipe de Funil"
                    dashboardType="ads"
                />

                <main className="space-y-8 mt-8">
                    {/* KPIs Principais */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Total Outubro"
                            value={funilTotalOutubro}
                            previousValue={0}
                            subtitle="Tarefas do Funil"
                            icon={<Filter className="w-5 h-5" />}
                            variant="primary"
                            delay={0}
                        />
                        <MetricCard
                            title="Total Novembro"
                            value={funilTotalNovembro}
                            previousValue={funilTotalOutubro}
                            subtitle="Tarefas do Funil"
                            icon={<Filter className="w-5 h-5" />}
                            variant="accent"
                            delay={100}
                        />
                        <MetricCard
                            title="Total Geral"
                            value={kpisFunil.totalGeral}
                            previousValue={0}
                            subtitle="Outubro + Novembro"
                            icon={<Layers className="w-5 h-5" />}
                            variant="success"
                            delay={200}
                        />
                        <InsightCard
                            title="Variação Mensal"
                            value={`${kpisFunil.variacao > 0 ? '+' : ''}${kpisFunil.variacao}%`}
                            description={kpisFunil.variacao >= 0 ? "Crescimento no período" : "Redução no período"}
                            icon={kpisFunil.variacao >= 0 ? TrendingUp : TrendingDown}
                            variant={kpisFunil.variacao >= 0 ? "success" : "warning"}
                            delay={300}
                        />
                    </section>

                    {/* Gráficos Comparativos - Produtos */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            Comparativo Mensal - Produtos
                        </h2>

                        {/* Módulos (Maior destaque) */}
                        <div className="w-full">
                            <BackendModulesChart
                                title="Análise de Produtos (Funil)"
                                subtitle="Comparativo de entregas por Produto"
                                dataOutubro={funilProdutosOutubro}
                                dataNovembro={funilProdutosNovembro}
                                delay={100}
                            />
                        </div>
                    </section>

                    {/* Comparativo de Nichos (Substituindo Custom Fields) */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Flag className="w-5 h-5 text-primary" />
                            Comparativo Mensal - Nichos
                        </h2>

                        <div className="w-full">
                            {/* Reusing BackendModulesChart logic but for Niches is fine if the data shape matches, 
                                 otherwise we should use a similar chart logic. 
                                 BackendModulesChart expects {name, value, percentage}.
                                 Our niche data has that shape. */}
                            <BackendModulesChart
                                title="Análise de Nichos (Funil)"
                                subtitle="Comparativo de entregas por Nicho"
                                dataOutubro={funilNichosOutubro}
                                dataNovembro={funilNichosNovembro}
                                delay={200}
                                colorFn={getNicheColor}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default BackendFunil;
