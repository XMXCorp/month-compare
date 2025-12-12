import { ChartCard } from "@/components/dashboard/ChartCard";
import { ComparisonTable, combineData, DataItem } from "./BackendDetailedComparison";
import { HorizontalBarChart } from "@/components/dashboard/HorizontalBarChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { Package, Smartphone, Users, Briefcase, Zap, Target } from "lucide-react";
import { getProductColor } from "@/data/dashboardBackendData";

interface BackendCustomFieldsComparisonProps {
    title: string;
    subtitle: string;
    produtoBlackOutubro: DataItem[];
    produtoBlackNovembro: DataItem[];
    plataformaOutubro: DataItem[];
    plataformaNovembro: DataItem[];
    squadsOutubro: DataItem[];
    squadsNovembro: DataItem[];
    nichosOutubro: DataItem[];
    nichosNovembro: DataItem[];
    setorXmxOutubro: DataItem[];
    setorXmxNovembro: DataItem[];
}

export function BackendCustomFieldsComparison({
    title,
    subtitle,
    produtoBlackOutubro,
    produtoBlackNovembro,
    plataformaOutubro,
    plataformaNovembro,
    squadsOutubro,
    squadsNovembro,
    nichosOutubro,
    nichosNovembro,
    setorXmxOutubro,
    setorXmxNovembro,
}: BackendCustomFieldsComparisonProps) {
    const squadsData = combineData(squadsOutubro, squadsNovembro);
    const nichosData = combineData(nichosOutubro, nichosNovembro);
    const setorXmxData = combineData(setorXmxOutubro, setorXmxNovembro);

    // Filter top 10 products
    const topProdutoOutubro = produtoBlackOutubro.slice(0, 10);
    const topProdutoNovembro = produtoBlackNovembro.slice(0, 10);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <div>
                    <h2 className="text-xl font-bold text-foreground">{title}</h2>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
            </div>

            {/* Destaque: Produto Black */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HorizontalBarChart
                    title="Produto Black - Outubro"
                    subtitle="Principais produtos"
                    data={topProdutoOutubro}
                    colorFn={getProductColor}
                    delay={100}
                />
                <HorizontalBarChart
                    title="Produto Black - Novembro"
                    subtitle="Principais produtos"
                    data={topProdutoNovembro}
                    colorFn={getProductColor}
                    delay={200}
                />
            </div>

            {/* Grid Secundário: Nichos e Plataforma */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ComparisonTable
                    title="Nichos (Squads Area)"
                    icon={Target}
                    data={nichosData}
                    gradientFrom="from-pink-500"
                    gradientTo="to-rose-500"
                    iconColor="text-pink-400"
                    delay={300}
                />
                <DonutChart
                    title="Plataforma - Comparativo Total"
                    subtitle="Distribuição por plataforma (Nov)"
                    data={plataformaNovembro}
                    delay={300}
                />
            </div>

            {/* Grid Terciário: Squads e Setor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ComparisonTable
                    title="Squads (Categoria)"
                    icon={Users}
                    data={squadsData}
                    gradientFrom="from-violet-500"
                    gradientTo="to-purple-500"
                    iconColor="text-violet-400"
                    delay={400}
                />
                <ComparisonTable
                    title="Setor XMX"
                    icon={Briefcase}
                    data={setorXmxData}
                    gradientFrom="from-blue-500"
                    gradientTo="to-cyan-500"
                    iconColor="text-blue-400"
                    delay={500}
                />
            </div>
        </div>
    );
}
