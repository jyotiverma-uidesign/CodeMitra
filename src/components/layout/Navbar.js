import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Menu, X, Shield, LayoutDashboard, User, LogOut, } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
// ✅ Theme Toggle import
import ThemeToggle from "../../pages/ThemeToggle";
const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAdmin, signOut } = useAuth();
    const handleSignOut = async () => {
        await signOut();
        setProfileOpen(false);
        navigate("/");
    };
    return (_jsx(motion.nav, { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6 }, className: "fixed top-0 left-0 right-0 z-50 glass-panel-strong border-b border-border/30", children: _jsx("div", { className: "container mx-auto px-4 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16 lg:h-20", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx("div", { className: "w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-md", children: _jsx("img", { src: "/Code Mitra.png", alt: "Code Mitra Logo", className: "w-7 h-7 object-contain" }) }), _jsx("span", { className: "text-xl font-bold gradient-text", children: "Code Mitra" })] }), _jsx("div", { className: "hidden lg:flex items-center gap-1", children: navLinks.map((link) => (_jsx(Link, { to: link.path, className: `px-4 py-2 text-sm font-medium rounded-lg ${location.pathname === link.path
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"}`, children: link.name }, link.path))) }), _jsxs("div", { className: "hidden lg:flex items-center gap-3 relative", children: [_jsx(ThemeToggle, {}), user ? (_jsxs(_Fragment, { children: [isAdmin && (_jsx(Link, { to: "/admin", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [_jsx(Shield, { className: "w-4 h-4" }), "Admin"] }) })), _jsx(Link, { to: "/deshboard", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [_jsx(LayoutDashboard, { className: "w-4 h-4" }), "Dashboard"] }) }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setProfileOpen(!profileOpen), className: "w-9 h-9 rounded-full border overflow-hidden flex items-center justify-center bg-muted", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: "profile", className: "w-full h-full object-cover" })) : (_jsx("span", { className: "font-semibold text-sm", children: user.name?.charAt(0).toUpperCase() })) }), profileOpen && (_jsxs("div", { className: "absolute right-0 mt-3 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden", children: [_jsxs("div", { className: "px-4 py-3 border-b", children: [_jsx("p", { className: "text-sm font-medium", children: user.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: user.email })] }), _jsxs(Link, { to: "/profile", onClick: () => setProfileOpen(false), className: "flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm", children: [_jsx(User, { className: "w-4 h-4" }), "Profile"] }), _jsxs(Link, { to: "/deshboard", onClick: () => setProfileOpen(false), className: "flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm", children: [_jsx(LayoutDashboard, { className: "w-4 h-4" }), "Dashboard"] }), _jsxs("button", { onClick: handleSignOut, className: "flex w-full items-center gap-2 px-4 py-2 hover:bg-muted text-sm text-red-500", children: [_jsx(LogOut, { className: "w-4 h-4" }), "Sign Out"] })] }))] })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", children: _jsx(Button, { variant: "ghost", size: "sm", children: "Sign In" }) }), _jsx(Link, { to: "/register", children: _jsx(Button, { variant: "premium", size: "sm", children: "Get Started" }) })] }))] }), _jsx("button", { onClick: () => setIsOpen(!isOpen), className: "lg:hidden p-2", children: isOpen ? _jsx(X, {}) : _jsx(Menu, {}) })] }) }) }));
};
