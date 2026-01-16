import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Star, BookOpen, Search, Filter, } from "lucide-react";
import { courses } from "../data/Courses";
// ================= ANIMATION =================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
// ================= COMPONENT =================
const Courses = () => {
    const [searchInput, setSearchInput] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setAppliedSearch(searchInput.trim());
        }
    };
    // ================= FILTER + SORT =================
    const filteredCourses = courses.filter((course) => {
        if (!appliedSearch)
            return true;
        const term = appliedSearch.toLowerCase();
        return (course.title.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term) ||
            course.category.toLowerCase().includes(term) ||
            course.pricing.toLowerCase().includes(term));
    });
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-24 pb-16", children: [_jsx("section", { className: "relative py-16", children: _jsxs("div", { className: "container mx-auto px-4 text-center", children: [_jsxs("h1", { className: "text-5xl font-bold mb-6", children: ["Explore Our ", _jsx("span", { className: "gradient-text", children: "Courses" })] }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Learn from beginner to advanced with free and premium courses." }), _jsxs("div", { className: "flex gap-4 max-w-xl mx-auto", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { placeholder: "Search courses (free, paid, python...)", className: "w-full h-12 pl-12 pr-4 rounded-xl glass-panel text-black", value: searchInput, onChange: (e) => setSearchInput(e.target.value), onKeyDown: handleKeyDown })] }), _jsx(Button, { variant: "glass", children: _jsx(Filter, { className: "w-4 h-4" }) })] })] }) }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredCourses.map((course) => (_jsxs(motion.div, { variants: itemVariants, className: "glass-panel-strong p-6 flex flex-col", children: [_jsxs("span", { className: `text-xs px-3 py-1 rounded-full mb-3 w-fit
                      ${course.pricing === "Free"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"}`, children: [course.pricing, " Course"] }), _jsx("span", { className: "text-xs text-muted-foreground mb-3", children: course.category }), _jsx("div", { className: `w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl mb-4`, children: course.image }), _jsx("h3", { className: "text-xl font-bold mb-2", children: course.title }), _jsx("p", { className: "text-sm text-muted-foreground mb-4 flex-grow", children: course.description }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm mb-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-4 h-4" }), course.level] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), course.duration] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4" }), course.students] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "w-4 h-4 fill-yellow-500 text-yellow-500" }), course.rating] })] }), _jsx(Link, { to: `/courses/${course.id}`, state: { course }, children: _jsxs(Button, { variant: course.pricing === "Free" ? "secondary" : "outline", className: "w-full", children: [course.pricing === "Free" ? "Start Free" : "View Course", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] }, course.id))) }) }) })] }), _jsx(Footer, {})] }));
};
export default Courses;
