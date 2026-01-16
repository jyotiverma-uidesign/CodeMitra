import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        role: "Software Engineer at Google",
        image: "PS",
        content: "Code Mitra transformed my career. The structured learning path and hands-on projects helped me land my dream job at Google within 6 months.",
        rating: 5,
    },
    {
        id: 2,
        name: "Rahul Verma",
        role: "Full-Stack Developer",
        image: "RV",
        content: "The best investment I've made in my education. The instructors are incredibly knowledgeable and the community support is amazing.",
        rating: 5,
    },
    {
        id: 3,
        name: "Ananya Patel",
        role: "Frontend Developer at Microsoft",
        image: "AP",
        content: "From zero coding knowledge to working at Microsoft - Code Mitra made it possible. The curriculum is perfectly designed for beginners.",
        rating: 5,
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
    },
};
export const TestimonialsSection = () => {
    return (_jsxs("section", { className: "py-24 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" }), _jsxs("div", { className: "container mx-auto px-4 lg:px-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-center max-w-2xl mx-auto mb-16", children: [_jsx("span", { className: "inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-4", children: "Student Success Stories" }), _jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4", children: ["Loved by", " ", _jsx("span", { className: "gradient-text", children: "Developers" })] }), _jsx("p", { className: "text-muted-foreground text-lg", children: "Join thousands of successful developers who transformed their careers with Code Mitra." })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: testimonials.map((testimonial) => (_jsx(motion.div, { variants: itemVariants, className: "group", children: _jsxs("div", { className: "glass-panel-strong p-6 h-full card-hover relative", children: [_jsx(Quote, { className: "absolute top-4 right-4 w-8 h-8 text-primary/20" }), _jsx("div", { className: "flex gap-1 mb-4", children: Array.from({ length: testimonial.rating }).map((_, i) => (_jsx(Star, { className: "w-4 h-4 text-yellow-500 fill-yellow-500" }, i))) }), _jsxs("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: ["\"", testimonial.content, "\""] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-linear-to-br from-primary to-neon-cyan flex items-center justify-center text-primary-foreground font-semibold", children: testimonial.image }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-foreground", children: testimonial.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: testimonial.role })] })] })] }) }, testimonial.id))) })] })] }));
};
