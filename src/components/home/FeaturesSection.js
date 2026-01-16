import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Layers, Rocket, Shield, Cpu, Users, Zap } from "lucide-react";
const features = [
    {
        icon: Layers,
        title: "Structured Learning",
        description: "Follow carefully crafted learning paths from beginner to advanced, with each concept building on the previous.",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Rocket,
        title: "Hands-On Projects",
        description: "Build real-world projects that you can add to your portfolio and showcase to potential employers.",
        color: "text-neon-cyan",
        bg: "bg-neon-cyan/10",
    },
    {
        icon: Shield,
        title: "Industry Certification",
        description: "Earn recognized certificates upon course completion to validate your skills in the job market.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        icon: Cpu,
        title: "Interactive Coding",
        description: "Practice with our built-in code editor featuring real-time feedback and auto-grading.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    {
        icon: Users,
        title: "Expert Mentorship",
        description: "Get guidance from experienced developers who have worked at top tech companies.",
        color: "text-neon-pink",
        bg: "bg-neon-pink/10",
    },
    {
        icon: Zap,
        title: "Career Support",
        description: "Access job placement assistance, resume reviews, and interview preparation resources.",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};
export const FeaturesSection = () => {
    return (_jsxs("section", { className: "py-24 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-dot-pattern opacity-30" }), _jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl" }), _jsxs("div", { className: "container mx-auto px-4 lg:px-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsx("span", { className: "inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-neon-cyan mb-4", children: "Why Code Mitra?" }), _jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4", children: ["Everything You Need to", " ", _jsx("span", { className: "gradient-text", children: "Succeed" })] }), _jsx("p", { className: "text-muted-foreground text-lg", children: "We've designed our platform with your success in mind, providing all the tools and support you need." })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: features.map((feature, index) => (_jsx(motion.div, { variants: itemVariants, className: "group", children: _jsxs("div", { className: "glass-panel p-6 h-full card-hover border-border/30 hover:border-primary/30", children: [_jsx("div", { className: `w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`, children: _jsx(feature.icon, { className: `w-6 h-6 ${feature.color}` }) }), _jsx("h3", { className: "text-lg font-semibold mb-2 group-hover:text-primary transition-colors", children: feature.title }), _jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feature.description })] }) }, feature.title))) })] })] }));
};
