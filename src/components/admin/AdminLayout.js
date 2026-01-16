import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Loader2 } from "lucide-react";
export const AdminLayout = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
        else if (!loading && user && !isAdmin) {
            navigate("/dashboard");
        }
    }, [user, loading, isAdmin, navigate]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-primary" }) }));
    }
    if (!user || !isAdmin) {
        return null;
    }
    return (_jsx(SidebarProvider, { children: _jsxs("div", { className: "min-h-screen flex w-full bg-background", children: [_jsx(AdminSidebar, {}), _jsx("main", { className: "flex-1 overflow-auto", children: children })] }) }));
};
