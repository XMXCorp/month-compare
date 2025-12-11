import { TrendingUp, TrendingDown, Trophy, Zap, Target, Users } from "lucide-react";
import {
    tipoTarefaOutubro,
    tipoTarefaNovembro,
    responsavelOutubro,
    responsavelNovembro,
    kpisBackend,
    findBestPerformer,
    findBiggestGrowth,
} from "@/data/dashboardBackendData";

export function BackendHighlights() {
    const bestTipoOut = findBestPerformer(tipoTarefaOutubro);
    const bestTipoNov = findBestPerformer(tipoTarefaNovembro);
    const bestResponsavel = findBestPerformer(responsavelNovembro);
    const biggestGrowth = findBiggestGrowth(tipoTarefaOutubro, tipoTarefaNovembro);

    const highlights = [
        {
            title: "Total de Entregas",
            value: kpisBackend.totalGeral,
            subtitle: `Out: ${kpisBackend.totalOutubro} | Nov: ${kpisBackend.totalNovembro}`,
            icon: Target,
            gradient: "from-purple-500 to-violet-600",
            shadowColor: "shadow-purple-500/25",
        },
        {
            title: "Variação Mensal",
            value: `${kpisBackend.variacaoTotal > 0 ? "+" : ""}${kpisBackend.variacaoTotal}%`,
            subtitle: kpisBackend.variacaoTotal >= 0 ? "Crescimento no período" : "Redução no período",
            icon: kpisBackend.variacaoTotal >= 0 ? TrendingUp : TrendingDown,
            gradient: kpisBackend.variacaoTotal >= 0 ? "from-green-500 to-emerald-600" : "from-red-500 to-rose-600",
            shadowColor: kpisBackend.variacaoTotal >= 0 ? "shadow-green-500/25" : "shadow-red-500/25",
        },
        {
            title: "Top Tipo de Tarefa",
            value: bestTipoNov.name,
            subtitle: `${bestTipoNov.value} entregas em Novembro`,
            icon: Trophy,
            gradient: "from-amber-500 to-orange-600",
            shadowColor: "shadow-amber-500/25",
        },
        {
            title: "Maior Crescimento",
            value: biggestGrowth.name,
            subtitle: `+${biggestGrowth.growth.toFixed(0)}% de Out para Nov`,
            icon: Zap,
            gradient: "from-cyan-500 to-blue-600",
            shadowColor: "shadow-cyan-500/25",
        },
        {
            title: "Top Desenvolvedor",
            value: bestResponsavel.name,
            subtitle: `${bestResponsavel.value} entregas aprovadas`,
            icon: Users,
            gradient: "from-pink-500 to-rose-600",
            shadowColor: "shadow-pink-500/25",
        },
    ];

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Destaques do Período
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {highlights.map((item, index) => (
                    <div
                        key={item.title}
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-5 text-white shadow-xl ${item.shadowColor} animate-fade-in`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <item.icon className="w-6 h-6 text-white/80" />
                                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                                    {item.title}
                                </span>
                            </div>
                            <div className="text-2xl font-bold mb-1 truncate">{item.value}</div>
                            <div className="text-sm text-white/70 truncate">{item.subtitle}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
