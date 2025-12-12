import { HighlightCard } from "@/components/dashboard/HighlightCard";
import { findBestPerformer, findBiggestGrowth, responsavelOutubro, responsavelNovembro, moduloOutubro, moduloNovembro } from "@/data/dashboardBackendData";
import { Trophy, TrendingUp, Zap, Target } from "lucide-react";

export function BackendHighlights() {
    const topPerformerOutubro = findBestPerformer(responsavelOutubro);
    const topPerformerNovembro = findBestPerformer(responsavelNovembro);

    // Calcular quem teve maior crescimento
    const dataOut = responsavelOutubro.map(d => ({ name: d.name, value: d.value }));
    const dataNov = responsavelNovembro.map(d => ({ name: d.name, value: d.value }));
    const biggestGrowth = findBiggestGrowth(dataOut, dataNov);

    // Calcular modulo mais ativo
    const topModuleOut = findBestPerformer(moduloOutubro);
    const topModuleNov = findBestPerformer(moduloNovembro);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HighlightCard
                title="Destaque Novembro"
                value={topPerformerNovembro.name}
                subtitle={`${topPerformerNovembro.value} entregas realizados`}
                icon={Trophy}
                gradientFrom="from-yellow-500"
                gradientTo="to-amber-600"
                delay={0}
            />

            <HighlightCard
                title="Maior Crescimento"
                value={biggestGrowth.name}
                subtitle={`${Number(biggestGrowth.growth).toFixed(0)}% de aumento`}
                icon={TrendingUp}
                gradientFrom="from-emerald-500"
                gradientTo="to-green-600"
                delay={100}
            />

            <HighlightCard
                title="Módulo Mais Ativo"
                value={topModuleNov.name}
                subtitle={`${topModuleNov.value} entregas em Novembro`}
                icon={Zap}
                gradientFrom="from-blue-500"
                gradientTo="to-cyan-600"
                delay={200}
            />

            <HighlightCard
                title="Consistência"
                value={topPerformerOutubro.name}
                subtitle={`Destaque em Outubro (${topPerformerOutubro.value})`}
                icon={Target}
                gradientFrom="from-purple-500"
                gradientTo="to-violet-600"
                delay={300}
            />
        </div>
    );
}
