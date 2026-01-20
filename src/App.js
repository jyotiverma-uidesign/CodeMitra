import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Ragister from "./pages/Ragister";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import CoursesDetails from "./pages/CoursesDetails";
import Profile from "./pages/Profile";
import AdminPyment from "./pages/admin/AdminPyment";
import Deshboard from "./pages/Deshboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import ThemeToggle from "./pages/ThemeToggle";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollTop";
const queryClient = new QueryClient();
const App = () => {
    // 🔹 Set default dark mode on initial load
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme ?? (systemDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, []);
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Sonner, {}), _jsx(ScrollToTop, { smooth: true }), _jsxs(AuthProvider, { children: [_jsx(ScrollToTop, { smooth: true }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Index, {}) }), _jsx(Route, { path: "/courses", element: _jsx(Courses, {}) }), _jsx(Route, { path: "/courses/:id", element: _jsx(CoursesDetails, {}) }), _jsx(Route, { path: "/gallery", element: _jsx(Gallery, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Ragister, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/deshboard", element: _jsx(Deshboard, {}) }), _jsx(Route, { path: "/admin/pyment", element: _jsx(AdminPyment, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/reset-password/:token", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }), _jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsx(ThemeToggle, {}) })] })] }) }));
};
export default App;
