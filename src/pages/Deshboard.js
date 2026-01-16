import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { easeOut } from "framer-motion";
import { Users, BookOpen, BarChart3, Settings, GraduationCap, LineChart, Award, User, CreditCard, } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
/* ================= DATA ================= */
const adminCards = [
    {
        title: "Users",
        description: "Manage platform users",
        icon: Users,
        route: "/admin/users",
    },
    {
        title: "Courses",
        description: "Create & manage courses",
        icon: BookOpen,
        route: "/admin/courses",
    },
    {
        title: "Payments", // 🔥 ADDED
        description: "Approve course payments",
        icon: CreditCard,
        route: "/admin/payments",
    },
    {
        title: "Analytics",
        description: "View platform analytics",
        icon: BarChart3,
        route: "/admin/analytics",
    },
    {
        title: "Settings",
        description: "System configuration",
        icon: Settings,
        route: "/admin/settings",
    },
];
const userCards = [
    {
        title: "My Courses",
        description: "Access your enrolled courses",
        icon: GraduationCap,
        route: "/my-courses",
    },
    {
        title: "Progress",
        description: "Track your learning progress",
        icon: LineChart,
        route: "/progress",
    },
    {
        title: "Certificates",
        description: "View earned certificates",
        icon: Award,
        route: "/certificates",
    },
    {
        title: "Profile",
        description: "Manage your profile",
        icon: User,
        route: "/profile",
    },
];
/* ================= ANIMATION ================= */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};
/* ================= COMPONENT ================= */
const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    const isAdmin = user?.role === "admin";
    const cards = isAdmin ? adminCards : userCards;
    const handleOpen = (route) => {
        navigate(route);
    };
    return (_jsxs("div", { className: "min-h-screen px-4 py-10 sm:px-6 lg:px-10 bg-gradient-to-br from-black via-slate-900 to-black text-white", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "mb-10", children: [_jsxs("h1", { className: "text-3xl md:text-4xl font-bold", children: ["Welcome back,", " ", _jsx("span", { className: "bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent", children: user?.name })] }), _jsx("p", { className: "mt-2 text-gray-400", children: isAdmin
                            ? "Manage your platform efficiently"
                            : "Continue your learning journey" })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: cards.map((card) => {
                    const Icon = card.icon;
                    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: {
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.4, ease: easeOut },
                            },
                        }, className: "relative rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10\r\n                         hover:border-cyan-400/40 transition-all duration-300\r\n                         shadow-[0_0_30px_rgba(0,255,255,0.05)]", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20", children: _jsx(Icon, { className: "w-6 h-6 text-cyan-400" }) }), _jsx("h3", { className: "text-lg font-semibold", children: card.title })] }), _jsx("p", { className: "text-sm text-gray-400 mb-6", children: card.description }), _jsx(Button, { variant: "outline", onClick: () => handleOpen(card.route), className: "w-full border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10", children: "Open" })] }, card.title));
                }) })] }));
};
export default Dashboard;
