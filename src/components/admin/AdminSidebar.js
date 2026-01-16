import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { NavLink } from "../NavLink";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar, } from "../ui/sidebar";
const menuItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Courses", url: "/admin/courses", icon: BookOpen },
    { title: "Gallery", url: "/admin/gallery", icon: Images },
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Settings", url: "/admin/settings", icon: Settings },
];
export const AdminSidebar = () => {
    const { state } = useSidebar();
    const collapsed = state === "collapsed";
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await logout();
        navigate("/");
    };
    return (_jsxs(Sidebar, { className: `${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-sidebar-border bg-sidebar`, collapsible: "icon", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-sidebar-border", children: [!collapsed && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center", children: _jsx("span", { className: "text-sm font-bold text-primary-foreground", children: "CM" }) }), _jsx("span", { className: "font-bold text-sidebar-foreground", children: "Admin Panel" })] })), _jsx(SidebarTrigger, { className: "text-sidebar-foreground hover:bg-sidebar-accent rounded-lg p-1", children: collapsed ? _jsx(ChevronRight, { className: "w-4 h-4" }) : _jsx(ChevronLeft, { className: "w-4 h-4" }) })] }), _jsx(SidebarContent, { className: "py-4", children: _jsxs(SidebarGroup, { children: [!collapsed && _jsx(SidebarGroupLabel, { className: "text-muted-foreground px-4 mb-2", children: "Menu" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: menuItems.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs(NavLink, { to: item.url, end: item.url === "/admin", className: "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors", activeClassName: "bg-sidebar-accent text-sidebar-primary font-medium", children: [_jsx(item.icon, { className: "w-5 h-5 flex-shrink-0" }), !collapsed && _jsx("span", { children: item.title })] }) }) }, item.title))) }) })] }) }), _jsxs("div", { className: "mt-auto p-4 border-t border-sidebar-border", children: [!collapsed && user && (_jsxs("div", { className: "mb-4 px-2", children: [_jsx("p", { className: "text-sm font-medium text-sidebar-foreground truncate", children: user.email }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Administrator" })] })), _jsxs(Button, { variant: "ghost", className: `${collapsed ? "w-full justify-center p-2" : "w-full justify-start gap-3"} text-destructive hover:text-destructive hover:bg-destructive/10`, onClick: handleSignOut, children: [_jsx(LogOut, { className: "w-5 h-5" }), !collapsed && _jsx("span", { children: "Sign Out" })] })] })] }));
};
