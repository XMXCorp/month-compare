import { ChartCard } from "@/components/dashboard/ChartCard";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid, LabelList } from "recharts";

interface DataItem {
    name: string;
    value: number;
    percentage: number;
}

interface BackendModulesChartProps {
    title: string;
    subtitle: string;
    dataOutubro: DataItem[];
    dataNovembro: DataItem[];
    delay?: number;
}

const COLORS = {
    outubro: "#3B82F6",  // Blue
    novembro: "#A855F7", // Purple
};

export function BackendModulesChart({
    title,
    subtitle,
    dataOutubro,
    dataNovembro,
    delay = 0,
}: BackendModulesChartProps) {
    // Combine and sort data
    const allNames = new Set([
        ...dataOutubro.map(d => d.name),
        ...dataNovembro.map(d => d.name)
    ]);

    const chartData = Array.from(allNames).map(name => {
        const outItem = dataOutubro.find(d => d.name === name);
        const novItem = dataNovembro.find(d => d.name === name);
        return {
            name: name, // Full name for Y axis
            outubro: outItem?.value || 0,
            novembro: novItem?.value || 0,
            total: (outItem?.value || 0) + (novItem?.value || 0)
        };
    }).sort((a, b) => b.total - a.total); // Sort by total volume

    // Increase height dynamically based on number of items, minimum 600px
    const minHeight = 600;
    const dynamicHeight = Math.max(minHeight, chartData.length * 40); // 40px per item

    return (
        <ChartCard title={title} subtitle={subtitle} delay={delay}>
            <div className="w-full mt-6" style={{ height: `${dynamicHeight}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 20, right: 50, left: 100, bottom: 20 }}
                        barGap={4}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.2} />
                        <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={13}
                            fontWeight={500}
                            width={100}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                padding: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                            formatter={(value: number, name: string) => [
                                <span className="font-bold">{value} entregas</span>,
                                name === "outubro" ? "Outubro/25" : "Novembro/25"
                            ]}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            formatter={(value) => (
                                <span className="font-medium text-foreground ml-1">
                                    {value === "outubro" ? "Outubro/25" : "Novembro/25"}
                                </span>
                            )}
                        />
                        <Bar
                            dataKey="outubro"
                            fill={COLORS.outubro}
                            radius={[0, 4, 4, 0]}
                            name="outubro"
                            barSize={12}
                        >
                            <LabelList dataKey="outubro" position="right" fontSize={10} fill="#64748B" formatter={(val: number) => val > 0 ? val : ''} />
                        </Bar>
                        <Bar
                            dataKey="novembro"
                            fill={COLORS.novembro}
                            radius={[0, 4, 4, 0]}
                            name="novembro"
                            barSize={12}
                        >
                            <LabelList dataKey="novembro" position="right" fontSize={10} fill="#64748B" formatter={(val: number) => val > 0 ? val : ''} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    );
}
