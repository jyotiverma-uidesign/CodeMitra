import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Heart, Users, Award } from "lucide-react";
import { Helmet } from "react-helmet-async";
const values = [
    {
        icon: Target,
        title: "Mission-Driven Learning",
        description: "Our mission is to make frontend development and coding education practical, structured, and accessible for beginners.",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Heart,
        title: "Student-Centered Approach",
        description: "We focus on real learning outcomes by prioritizing clarity, practice, and long-term skill development.",
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
    {
        icon: Users,
        title: "Developer Community",
        description: "Code Mitra encourages collaborative learning through peer support and community-driven growth.",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        icon: Award,
        title: "Quality & Excellence",
        description: "Every course is designed with modern frontend standards, best practices, and industry relevance.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
];
const team = [
    { name: "Jyoti Verma", role: "Founder & Frontend Developer", emoji: "👩‍💻" },
    { name: "Nitesh Rajpoot", role: "Curriculum Strategist", emoji: "👨‍🏫" },
    { name: "Vimlesh Bdoliya", role: "Lead Frontend Instructor", emoji: "👨‍🎓" },
    { name: "Rinki Kushwah", role: "Community Manager", emoji: "👩‍💼" },
];
const About = () => {
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsxs(Helmet, { children: [_jsx("title", { children: "About Code Mitra | Learn Frontend & Coding Skills" }), _jsx("meta", { name: "description", content: "Code Mitra is a modern coding education platform focused on frontend development, web fundamentals, and practical learning. Learn HTML, CSS, JavaScript, React, and modern frontend workflows with hands-on projects." }), _jsx("meta", { name: "keywords", content: "Code Mitra, About, frontend development, learn coding, JavaScript, React, HTML, CSS, web development courses" }), _jsx("link", { rel: "canonical", href: "https://codemitra.in/about" }), _jsx("script", { type: "application/ld+json", children: `
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Code Mitra",
            "url": "https://codemitra.in",
            "logo": "https://codemitra.in/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/codemitra",
              "https://github.com/codemitra"
            ],
            "description": "Code Mitra provides industry-ready coding education and frontend development courses for beginners and aspiring developers."
          }
          ` }), _jsx("meta", { property: "og:title", content: "About Code Mitra | Learn Frontend & Coding Skills" }), _jsx("meta", { property: "og:description", content: "Code Mitra helps beginners and aspiring developers learn HTML, CSS, JavaScript, React, and modern frontend workflows with hands-on projects." }), _jsx("meta", { property: "og:type", content: "website" }), _jsx("meta", { property: "og:url", content: "https://codemitra.in/about" }), _jsx("meta", { property: "og:image", content: "https://codemitra.in/hero-banner.png" }), _jsx("meta", { property: "og:site_name", content: "Code Mitra" }), _jsx("meta", { name: "twitter:card", content: "summary_large_image" }), _jsx("meta", { name: "twitter:title", content: "About Code Mitra | Learn Frontend & Coding Skills" }), _jsx("meta", { name: "twitter:description", content: "Code Mitra helps beginners and aspiring developers learn HTML, CSS, JavaScript, React, and modern frontend workflows with hands-on projects." }), _jsx("meta", { name: "twitter:image", content: "https://codemitra.in/hero-banner.png" })] }), _jsx(Navbar, {}), _jsxs("main", { className: "pt-24 pb-16", children: [_jsxs("section", { className: "relative py-20 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-hero" }), _jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-20" }), _jsx("div", { className: "container mx-auto px-4 lg:px-8 relative", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center max-w-3xl mx-auto", children: [_jsx("span", { className: "inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-6", children: "About Code Mitra" }), _jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: ["Building Practical Skills for", " ", _jsx("span", { className: "gradient-text", children: "Frontend Developers" })] }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Code Mitra is a modern coding education platform focused on frontend development, web fundamentals, and practical learning. We help beginners and aspiring developers learn HTML, CSS, JavaScript, React, and modern frontend workflows with clarity and confidence." })] }) })] }), _jsx("section", { className: "py-20", children: _jsx("div", { className: "container mx-auto px-4 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: ["Our ", _jsx("span", { className: "gradient-text", children: "Mission" })] }), _jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Code Mitra was created to bridge the gap between theoretical learning and real-world frontend development skills. We focus on teaching concepts that developers actually use in modern web projects." }), _jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Our learning approach emphasizes hands-on practice, clean coding standards, responsive design, and performance-focused frontend development aligned with current industry needs." }), _jsx(Link, { to: "/courses", children: _jsxs(Button, { variant: "premium", size: "lg", className: "group", children: ["Explore Frontend Courses", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }) })] }), _jsx(motion.div, { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "glass-panel-strong p-8", children: _jsx("div", { className: "grid grid-cols-2 gap-6", children: [
                                                { value: "Beginner Friendly", label: "Learning Approach" },
                                                { value: "Modern Stack", label: "Frontend Technologies" },
                                                { value: "Hands-On", label: "Project-Based Learning" },
                                                { value: "Career Ready", label: "Skill-Oriented Courses" },
                                            ].map((stat) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg md:text-xl font-semibold gradient-text mb-2", children: stat.value }), _jsx("div", { className: "text-sm text-muted-foreground", children: stat.label })] }, stat.label))) }) })] }) }) }), _jsxs("section", { className: "py-20 relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial opacity-30" }), _jsxs("div", { className: "container mx-auto px-4 lg:px-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: ["Core ", _jsx("span", { className: "gradient-text", children: "Values" })] }), _jsx("p", { className: "text-muted-foreground", children: "Principles that shape how we teach coding and frontend development." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: values.map((value, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-panel p-6 text-center card-hover", children: [_jsx("div", { className: `w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-4`, children: _jsx(value.icon, { className: `w-6 h-6 ${value.color}` }) }), _jsx("h3", { className: "font-semibold mb-2", children: value.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: value.description })] }, value.title))) })] })] }), _jsx("section", { className: "py-20", children: _jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: ["Our ", _jsx("span", { className: "gradient-text", children: "Team" })] }), _jsx("p", { className: "text-muted-foreground", children: "Developers and mentors dedicated to teaching modern frontend skills." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: team.map((member, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-panel-strong p-6 text-center card-hover", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mx-auto mb-4", children: member.emoji }), _jsx("h3", { className: "font-semibold mb-1", children: member.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: member.role })] }, member.name))) })] }) })] }), _jsx(Footer, {})] }));
};
export default About;
