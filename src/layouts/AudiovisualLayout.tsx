import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video } from "lucide-react";

const AudiovisualLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = location.pathname.split("/").pop();
    const activeTab = currentTab === "vsls" ? "vsls" : currentTab === "ads" ? "ads" : "total";

    return (
        <div className="min-h-screen bg-background">
            <Outlet />
        </div>
    );
};

export default AudiovisualLayout;
