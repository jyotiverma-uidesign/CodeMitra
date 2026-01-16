import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Heart, Users, Award } from "lucide-react";
const values = [
    {
        icon: Target,
        title: "Mission-Driven",
        description: "We're committed to making quality coding education accessible to everyone, regardless of their background.",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Heart,
        title: "Student-First",
        description: "Every decision we make is guided by what's best for our students and their learning journey.",
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
    {
        icon: Users,
        title: "Community",
        description: "We believe in the power of community and peer learning to accelerate growth.",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        icon: Award,
        title: "Excellence",
        description: "We strive for excellence in everything we do, from course content to student support.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
];
const team = [
    { name: "Jyoti verma", role: "Founder & CEO", emoji: "👨‍💻" },
    { name: "Nitesh Rajpoot", role: "Head of Curriculum", emoji: "👩‍🏫" },
    { name: "Vimlesh Bdoliya", role: "Lead Instructor", emoji: "👨‍🎓" },
    { name: "Rinki Kushwah", role: "Community Manager", emoji: "👩‍💼" },
];
const About = () => {
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-24 pb-16", children: [_jsxs("section", { className: "relative py-20 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-hero" }), _jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-20" }), _jsx("div", { className: "container mx-auto px-4 lg:px-8 relative", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center max-w-3xl mx-auto", children: [_jsx("span", { className: "inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-6", children: "Our Story" }), _jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: ["Empowering the Next Generation of", " ", _jsx("span", { className: "gradient-text", children: "Developers" })] }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Code Mitra was founded with a simple mission: to make quality coding education accessible to everyone. We believe that anyone can learn to code with the right guidance and support." })] }) })] }), _jsx("section", { className: "py-20", children: _jsx("div", { className: "container mx-auto px-4 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: ["Our ", _jsx("span", { className: "gradient-text", children: "Mission" })] }), _jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "We started Code Mitra in 2022 with a vision to bridge the gap between traditional education and industry requirements. Our founders, themselves self-taught developers, understood the struggles of learning to code without proper guidance." }), _jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Today, we've helped over 50,000 students transform their careers and land jobs at top tech companies. Our curriculum is continuously updated to reflect the latest industry trends and technologies." }), _jsx(Link, { to: "/courses", children: _jsxs(Button, { variant: "premium", size: "lg", className: "group", children: ["Explore Courses", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }) })] }), _jsx(motion.div, { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "glass-panel-strong p-8", children: _jsx("div", { className: "grid grid-cols-2 gap-6", children: [
                                                { value: "50K+", label: "Students" },
                                                { value: "100+", label: "Courses" },
                                                { value: "95%", label: "Success Rate" },
                                                { value: "50+", label: "Countries" },
                                            ].map((stat, index) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl md:text-4xl font-bold gradient-text mb-2", children: stat.value }), _jsx("div", { className: "text-sm text-muted-foreground", children: stat.label })] }, stat.label))) }) })] }) }) }), _jsxs("section", { className: "py-20 relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial opacity-30" }), _jsxs("div", { className: "container mx-auto px-4 lg:px-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: ["Our ", _jsx("span", { className: "gradient-text", children: "Values" })] }), _jsx("p", { className: "text-muted-foreground", children: "The principles that guide everything we do at Code Mitra." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: values.map((value, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-panel p-6 text-center card-hover", children: [_jsx("div", { className: `w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`, children: _jsx(value.icon, { className: `w-6 h-6 ${value.color}` }) }), _jsx("h3", { className: "font-semibold mb-2", children: value.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: value.description })] }, value.title))) })] })] }), _jsx("section", { className: "py-20", children: _jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: ["Meet Our ", _jsx("span", { className: "gradient-text", children: "Team" })] }), _jsx("p", { className: "text-muted-foreground", children: "The passionate individuals behind Code Mitra." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: team.map((member, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-panel-strong p-6 text-center card-hover", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mx-auto mb-4", children: member.emoji }), _jsx("h3", { className: "font-semibold mb-1", children: member.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: member.role })] }, member.name))) })] }) })] }), _jsx(Footer, {})] }));
};
export default About;
