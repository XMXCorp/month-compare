import { ArrowDown, ArrowUp, Minus, Search, Code, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { ChartCard } from "../dashboard/ChartCard";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface DataItem {
    name: string;
    value: number;
    percentage: number;
}

export interface BackendDetailedComparisonProps {
    title: string;
    subtitle: string;
    tipoOutubro: DataItem[];
    tipoNovembro: DataItem[];
    responsavelOutubro: DataItem[];
    responsavelNovembro: DataItem[];
    prioridadeOutubro: DataItem[];
    prioridadeNovembro: DataItem[];
}

interface ComparisonTableProps {
    title: string;
    icon: any;
    data: {
        name: string;
        outubro: number;
        novembro: number;
        diff: number;
    }[];
    gradientFrom: string;
    gradientTo: string;
    iconColor: string;
    delay?: number;
}

export function combineData(outubro: DataItem[], novembro: DataItem[]) {
    const allNames = new Set([
        ...outubro.map(d => d.name),
        ...novembro.map(d => d.name)
    ]);

    const combined = Array.from(allNames).map(name => {
        const outVal = outubro.find(d => d.name === name)?.value || 0;
        const novVal = novembro.find(d => d.name === name)?.value || 0;
        return {
            name,
            outubro: outVal,
            novembro: novVal,
            diff: novVal - outVal
        };
    });

    return combined.sort((a, b) => b.novembro - a.novembro);
}

function GrowthBadge({ value }: { value: number }) {
    if (value === 0) return <Badge variant="outline" className="text-muted-foreground"><Minus className="w-3 h-3 mr-1" /> 0</Badge>;
    if (value > 0) return <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50/10"><ArrowUp className="w-3 h-3 mr-1" /> {value}</Badge>;
    return <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50/10"><ArrowDown className="w-3 h-3 mr-1" /> {Math.abs(value)}</Badge>;
}

export function ComparisonTable({ title, icon: Icon, data, gradientFrom, gradientTo, iconColor, delay = 0 }: ComparisonTableProps) {
    return (
        <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${delay}ms` }}>
            <div className={`p-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-opacity-10`}>
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-white/20 backdrop-blur-sm ${iconColor}`}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">{title}</h3>
                </div>
            </div>

            <div className="flex items-center px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
                <div className="flex-1">Nome</div>
                <div className="w-16 text-center">Out</div>
                <div className="w-16 text-center">Nov</div>
                <div className="w-20 text-center">Dif</div>
            </div>

            <ScrollArea className="flex-1 h-[300px]">
                <div className="flex flex-col">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center px-4 py-3 border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                            <div className="flex-1 font-medium text-sm truncate pr-2" title={item.name}>
                                {item.name}
                            </div>
                            <div className="w-16 text-center text-sm text-muted-foreground">{item.outubro}</div>
                            <div className="w-16 text-center text-sm font-semibold">{item.novembro}</div>
                            <div className="w-20 text-center flex justify-center">
                                <GrowthBadge value={item.diff} />
                            </div>
                        </div>
                    ))}
                    {data.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                            Sem dados para exibir
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

export function BackendDetailedComparison({
    title,
    subtitle,
    tipoOutubro,
    tipoNovembro,
    responsavelOutubro,
    responsavelNovembro,
    prioridadeOutubro,
    prioridadeNovembro,
}: BackendDetailedComparisonProps) {
    const tipoData = combineData(tipoOutubro, tipoNovembro);
    const responsavelData = combineData(responsavelOutubro, responsavelNovembro);
    const prioridadeData = combineData(prioridadeOutubro, prioridadeNovembro);

    return (
        <ChartCard title={title} subtitle={subtitle} delay={0}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                <ComparisonTable
                    title="Tipos"
                    icon={Code}
                    data={tipoData}
                    gradientFrom="from-blue-500"
                    gradientTo="to-cyan-500"
                    iconColor="text-blue-400"
                    delay={100}
                />
                <ComparisonTable
                    title="Responsáveis"
                    icon={User}
                    data={responsavelData}
                    gradientFrom="from-violet-500"
                    gradientTo="to-purple-500"
                    iconColor="text-violet-400"
                    delay={200}
                />
                <ComparisonTable
                    title="Prioridades"
                    icon={AlertCircle}
                    data={prioridadeData}
                    gradientFrom="from-orange-500"
                    gradientTo="to-red-500"
                    iconColor="text-orange-400"
                    delay={300}
                />
            </div>
        </ChartCard>
    );
}
