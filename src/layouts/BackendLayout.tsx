import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Server } from "lucide-react";

const BackendLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = location.pathname.split("/").pop();
    const activeTab = currentTab === "funil" ? "funil" : currentTab === "total" ? "total" : "compiled";

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <div className="container mx-auto px-4 pt-6">
                <Tabs value={activeTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="total" onClick={() => navigate("/backend/total")}>
                            <Server className="w-4 h-4 mr-2" />
                            Visão Geral
                        </TabsTrigger>
                        <TabsTrigger value="funil" onClick={() => navigate("/backend/funil")}>
                            <Filter className="w-4 h-4 mr-2" />
                            Funil de Vendas
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <Outlet />
        </div>
    );
};

export default BackendLayout;
