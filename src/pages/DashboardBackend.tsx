import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { BackendHighlights } from "@/components/dashboard-backend/BackendHighlights";
import { BackendDetailedComparison } from "@/components/dashboard-backend/BackendDetailedComparison";
import { BackendComparisonBarChart } from "@/components/dashboard-backend/BackendComparisonBarChart";
import { TrendingUp, TrendingDown, Server, Code, Users, Flag, Layers } from "lucide-react";
import {
    tipoTarefaOutubro,
    tipoTarefaNovembro,
    responsavelOutubro,
    responsavelNovembro,
    prioridadeOutubro,
    prioridadeNovembro,
    moduloOutubro,
    moduloNovembro,
    totalBackendOutubro,
    totalBackendNovembro,
    kpisBackend,
    getTipoTarefaColor,
    getModuloColor,
} from "@/data/dashboardBackendData";

const DashboardBackend = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader
                    title="Dashboard Backend"
                    subtitle="Análise Comparativa • Equipe de Desenvolvimento"
                    dashboardType="ads"
                />

                <main className="space-y-8">
                    {/* KPIs Principais */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="Total Outubro"
                            value={totalBackendOutubro}
                            previousValue={0}
                            subtitle="Tarefas aprovadas"
                            icon={<Server className="w-5 h-5" />}
                            variant="primary"
                            delay={0}
                        />
                        <MetricCard
                            title="Total Novembro"
                            value={totalBackendNovembro}
                            previousValue={totalBackendOutubro}
                            subtitle="Tarefas aprovadas"
                            icon={<Server className="w-5 h-5" />}
                            variant="accent"
                            delay={100}
                        />
                        <MetricCard
                            title="Total Geral"
                            value={kpisBackend.totalGeral}
                            previousValue={0}
                            subtitle="Soma dos dois meses"
                            icon={<Code className="w-5 h-5" />}
                            variant="success"
                            delay={200}
                        />
                        <InsightCard
                            title="Variação Mensal"
                            value={`${kpisBackend.variacaoTotal > 0 ? '+' : ''}${kpisBackend.variacaoTotal}%`}
                            description={kpisBackend.variacaoTotal >= 0 ? "Crescimento no período" : "Redução no período"}
                            icon={kpisBackend.variacaoTotal >= 0 ? TrendingUp : TrendingDown}
                            variant={kpisBackend.variacaoTotal >= 0 ? "success" : "warning"}
                            delay={300}
                        />
                    </section>

                    {/* Destaques Visuais */}
                    <section>
                        <BackendHighlights />
                    </section>

                    {/* Gráficos Comparativos de Barras */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            Comparativo Mensal - Evolução
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <BackendComparisonBarChart
                                title="Tipos de Tarefa - Outubro vs Novembro"
                                subtitle="Comparativo de entregas por tipo"
                                dataOutubro={tipoTarefaOutubro}
                                dataNovembro={tipoTarefaNovembro}
                                delay={0}
                            />
                            <BackendComparisonBarChart
                                title="Módulos - Outubro vs Novembro"
                                subtitle="Comparativo de entregas por módulo"
                                dataOutubro={moduloOutubro}
                                dataNovembro={moduloNovembro}
                                delay={100}
                            />
                        </div>
                    </section>

                    {/* Comparativo Detalhado */}
                    <section>
                        <BackendDetailedComparison
                            title="Visão Geral - Comparativo Mensal"
                            subtitle="Análise detalhada por categoria"
                            tipoOutubro={tipoTarefaOutubro}
                            tipoNovembro={tipoTarefaNovembro}
                            responsavelOutubro={responsavelOutubro}
                            responsavelNovembro={responsavelNovembro}
                            prioridadeOutubro={prioridadeOutubro}
                            prioridadeNovembro={prioridadeNovembro}
                        />
                    </section>

                    {/* Tipos de Tarefa */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-primary" />
                            Distribuição por Tipo de Tarefa
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DonutChart
                                title="Tipos - Outubro"
                                subtitle={`${totalBackendOutubro} entregas`}
                                data={tipoTarefaOutubro}
                                delay={0}
                                colorFn={getTipoTarefaColor}
                            />
                            <DonutChart
                                title="Tipos - Novembro"
                                subtitle={`${totalBackendNovembro} entregas`}
                                data={tipoTarefaNovembro}
                                delay={100}
                                colorFn={getTipoTarefaColor}
                            />
                        </div>
                    </section>

                    {/* Módulos */}
                    <section>
                        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Flag className="w-5 h-5 text-primary" />
                            Distribuição por Módulo
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DonutChart
                                title="Módulos - Outubro"
                                subtitle={`${totalBackendOutubro} entregas`}
                                data={moduloOutubro}
                                delay={0}
                                colorFn={getModuloColor}
                            />
                            <DonutChart
                                title="Módulos - Novembro"
                                subtitle={`${totalBackendNovembro} entregas`}
                                data={moduloNovembro}
                                delay={100}
                                colorFn={getModuloColor}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardBackend;
