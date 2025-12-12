import { ChartCard } from "@/components/dashboard/ChartCard";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";

interface DataItem {
    name: string;
    value: number;
    percentage: number;
}

interface BackendComparisonBarChartProps {
    title: string;
    subtitle: string;
    dataOutubro: DataItem[];
    dataNovembro: DataItem[];
    delay?: number;
    height?: number;
}

const COLORS = {
    outubro: "#3B82F6",
    novembro: "#A855F7",
};

export function BackendComparisonBarChart({
    title,
    subtitle,
    dataOutubro,
    dataNovembro,
    delay = 0,
    height = 300,
}: BackendComparisonBarChartProps) {
    // Combinar dados para o gráfico
    const allNames = new Set([
        ...dataOutubro.map(d => d.name),
        ...dataNovembro.map(d => d.name)
    ]);

    const chartData = Array.from(allNames).map(name => {
        const outItem = dataOutubro.find(d => d.name === name);
        const novItem = dataNovembro.find(d => d.name === name);
        return {
            name: name.length > 12 ? name.slice(0, 12) + "..." : name,
            fullName: name,
            outubro: outItem?.value || 0,
            novembro: novItem?.value || 0,
        };
    }).sort((a, b) => (b.outubro + b.novembro) - (a.outubro + a.novembro));

    return (
        <ChartCard title={title} subtitle={subtitle} delay={delay}>
            <div className="w-full mt-4" style={{ height: `${height}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                    >
                        <XAxis type="number" stroke="#64748B" fontSize={12} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={12}
                            width={80}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                color: "hsl(var(--foreground))",
                            }}
                            formatter={(value: number, name: string) => [
                                `${value} entregas`,
                                name === "outubro" ? "Outubro" : "Novembro"
                            ]}
                            labelFormatter={(label) => {
                                const item = chartData.find(d => d.name === label);
                                return item?.fullName || label;
                            }}
                        />
                        <Legend
                            formatter={(value) => value === "outubro" ? "Outubro" : "Novembro"}
                            wrapperStyle={{ paddingTop: "10px" }}
                        />
                        <Bar
                            dataKey="outubro"
                            fill={COLORS.outubro}
                            radius={[0, 4, 4, 0]}
                            name="outubro"
                        />
                        <Bar
                            dataKey="novembro"
                            fill={COLORS.novembro}
                            radius={[0, 4, 4, 0]}
                            name="novembro"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    );
}
