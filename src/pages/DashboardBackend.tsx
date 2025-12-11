import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Server, Database, Code, Cloud, Settings, ArrowRight } from "lucide-react";

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
                    {/* Coming Soon Section */}
                    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <div className="relative">
                            {/* Animated background elements */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "500ms" }} />
                            </div>

                            {/* Icon grid */}
                            <div className="relative grid grid-cols-3 gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 animate-fade-in" style={{ animationDelay: "0ms" }}>
                                    <Database className="w-8 h-8 text-blue-400" />
                                </div>
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 animate-fade-in" style={{ animationDelay: "100ms" }}>
                                    <Server className="w-8 h-8 text-purple-400" />
                                </div>
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 animate-fade-in" style={{ animationDelay: "200ms" }}>
                                    <Cloud className="w-8 h-8 text-green-400" />
                                </div>
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 animate-fade-in" style={{ animationDelay: "300ms" }}>
                                    <Code className="w-8 h-8 text-orange-400" />
                                </div>
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 animate-fade-in" style={{ animationDelay: "400ms" }}>
                                    <Settings className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                                </div>
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/20 animate-fade-in" style={{ animationDelay: "500ms" }}>
                                    <ArrowRight className="w-8 h-8 text-pink-400" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
                            Em Breve
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "700ms" }}>
                            O Dashboard Backend está em desenvolvimento. Em breve você terá acesso a métricas e análises da equipe de desenvolvimento.
                        </p>

                        {/* Feature hints */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl animate-fade-in" style={{ animationDelay: "800ms" }}>
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <Database className="w-6 h-6 text-blue-400 mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">APIs & Integrações</h3>
                                <p className="text-sm text-muted-foreground">Métricas de performance das APIs</p>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <Server className="w-6 h-6 text-purple-400 mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">Infraestrutura</h3>
                                <p className="text-sm text-muted-foreground">Monitoramento de servidores</p>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border">
                                <Code className="w-6 h-6 text-green-400 mb-2" />
                                <h3 className="font-semibold text-foreground mb-1">Produtividade</h3>
                                <p className="text-sm text-muted-foreground">Análise de entregas e sprints</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardBackend;
