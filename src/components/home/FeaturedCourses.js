import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Clock, Users, Star, BookOpen } from "lucide-react";
const courses = [
    {
        id: 1,
        title: "Python Fundamentals",
        description: "Master Python from basics to advanced concepts with hands-on projects and real-world applications.",
        image: "🐍",
        level: "Beginner",
        duration: "8 weeks",
        students: "12.5K",
        rating: 4.9,
        color: "from-emerald-500 to-teal-600",
        tag: "Most Popular",
    },
    {
        id: 2,
        title: "JavaScript Developer",
        description: "Become a JavaScript expert with modern ES6+, DOM manipulation, and async programming.",
        image: "⚡",
        level: "Intermediate",
        duration: "10 weeks",
        students: "9.8K",
        rating: 4.8,
        color: "from-yellow-500 to-orange-600",
        tag: "Trending",
    },
    {
        id: 3,
        title: "Full-Stack Web Development",
        description: "Build complete web applications with React, Node.js, MongoDB, and modern deployment practices.",
        image: "🚀",
        level: "Advanced",
        duration: "16 weeks",
        students: "7.2K",
        rating: 4.9,
        color: "from-primary to-neon-cyan",
        tag: "Premium",
    },
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};
export const FeaturedCourses = () => {
    return (_jsxs("section", { className: "py-24 relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial opacity-50" }), _jsxs("div", { className: "container mx-auto px-4 lg:px-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsx("span", { className: "inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-4", children: "Featured Courses" }), _jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4", children: ["Industry-Ready", " ", _jsx("span", { className: "gradient-text", children: "Learning Paths" })] }), _jsx("p", { className: "text-muted-foreground text-lg", children: "Structured courses designed by industry experts to transform beginners into job-ready developers." })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: courses.map((course) => (_jsx(motion.div, { variants: itemVariants, className: "group relative", children: _jsxs("div", { className: "glass-panel-strong p-6 h-full flex flex-col card-hover", children: [_jsx("div", { className: "absolute -top-3 right-6", children: _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r ${course.color} text-white shadow-lg`, children: course.tag }) }), _jsx("div", { className: `w-16 h-16 rounded-2xl bg-linear-to-br ${course.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`, children: course.image }), _jsx("h3", { className: "text-xl font-bold mb-2 group-hover:text-primary transition-colors", children: course.title }), _jsx("p", { className: "text-muted-foreground text-sm mb-6 grow", children: course.description }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(BookOpen, { className: "w-4 h-4 text-primary" }), _jsx("span", { children: course.level })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Clock, { className: "w-4 h-4 text-neon-cyan" }), _jsx("span", { children: course.duration })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Users, { className: "w-4 h-4 text-primary" }), _jsxs("span", { children: [course.students, " students"] })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-500 fill-yellow-500" }), _jsx("span", { children: course.rating })] })] }), _jsx(Link, { to: `/courses/${course.id}`, children: _jsxs(Button, { variant: "outline", className: "w-full group/btn", children: ["View Course", _jsx(ArrowRight, { className: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform" })] }) })] }) }, course.id))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.3 }, className: "text-center mt-12", children: _jsx(Link, { to: "/courses", children: _jsxs(Button, { variant: "premium", size: "lg", className: "group", children: ["Explore All Courses", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }) }) })] })] }));
};
