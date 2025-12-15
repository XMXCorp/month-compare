import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DashboardAds from "./pages/DashboardAds";
import DashboardBackend from "./pages/DashboardBackend";
import BackendFunil from "./pages/BackendFunil";
import BackendCompiled from "./pages/BackendCompiled";
import BackendLayout from "./layouts/BackendLayout";
import AudiovisualLayout from "./layouts/AudiovisualLayout";
import AudiovisualCompiled from "./pages/AudiovisualCompiled";
import LideresLogin from "./pages/Lideres/LideresLogin";
import LideresDashboard from "./pages/Lideres/LideresDashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Resumo from "./pages/Resumo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to VSLs */}
          <Route path="/" element={<Navigate to="/audiovisual/vsls" replace />} />

          {/* Audiovisual section */}
          <Route path="/audiovisual" element={<AudiovisualLayout />}>
            <Route index element={<Navigate to="/audiovisual/total" replace />} />
            <Route path="total" element={<AudiovisualCompiled />} />
            <Route path="vsls" element={<Index />} />
            <Route path="ads" element={<DashboardAds />} />
          </Route>

          {/* Backend section */}
          <Route path="/backend" element={<BackendLayout />}>
            <Route index element={<Navigate to="/backend/total" replace />} />
            <Route path="compiled" element={<BackendCompiled />} />
            <Route path="total" element={<DashboardBackend />} />
            <Route path="funil" element={<BackendFunil />} />
          </Route>

          {/* Lideres section (Protected) */}
          <Route path="/lideres" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/lideres/dashboard" replace />} />
            <Route path="dashboard" element={<LideresDashboard />} />
          </Route>
          <Route path="/lideres/login" element={<LideresLogin />} />

          {/* Resumo section */}
          <Route path="/resumo" element={<Resumo />} />

          {/* Legacy routes redirect */}
          <Route path="/ads" element={<Navigate to="/audiovisual/ads" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
