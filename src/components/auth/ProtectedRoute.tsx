import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    // Simple localStorage check. In a real app, use a context or proper auth service.
    const isAuthenticated = localStorage.getItem("lideres_auth") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/lideres/login" replace />;
    }

    return <Outlet />;
};
