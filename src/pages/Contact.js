import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Mail, MapPin, Phone, Send, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        value: "jyotiverma85190@gmail.com",
        description: "We'll respond within 24 hours",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: Phone,
        title: "Call Us",
        value: "+91 7440493953",
        description: "Mon-Fri, 9AM-6PM IST",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        value: "Bhopal, India",
        description: "Tech Park, Whitefield",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
];
const Contact = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Message Sent!",
            description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-24 pb-16", children: [_jsxs("section", { className: "relative py-20 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-hero" }), _jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-20" }), _jsx("div", { className: "container mx-auto px-4 lg:px-8 relative", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center max-w-3xl mx-auto", children: [_jsx("span", { className: "inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-6", children: "Get In Touch" }), _jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6", children: ["We'd Love to", " ", _jsx("span", { className: "gradient-text", children: "Hear From You" })] }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Have a question about our courses? Need help with your learning journey? We're here to help you succeed." })] }) })] }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "container mx-auto px-4 lg:px-8", children: _jsx("div", { className: "grid md:grid-cols-3 gap-6 mb-16", children: contactInfo.map((info, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "glass-panel-strong p-6 text-center card-hover", children: [_jsx("div", { className: `w-14 h-14 rounded-xl ${info.bg} flex items-center justify-center mx-auto mb-4`, children: _jsx(info.icon, { className: `w-6 h-6 ${info.color}` }) }), _jsx("h3", { className: "font-semibold mb-1", children: info.title }), _jsx("p", { className: "text-foreground font-medium mb-1", children: info.value }), _jsx("p", { className: "text-sm text-muted-foreground", children: info.description })] }, info.title))) }) }) }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "container mx-auto px-4 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "glass-panel-strong p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: _jsx(MessageCircle, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold", children: "Send us a message" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "We'll get back to you soon" })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Name" }), _jsx("input", { type: "text", required: true, value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "w-full h-12 px-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors", placeholder: "Your name" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Email" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "w-full h-12 px-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors", placeholder: "your@email.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Subject" }), _jsx("input", { type: "text", required: true, value: formData.subject, onChange: (e) => setFormData({ ...formData, subject: e.target.value }), className: "w-full h-12 px-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors", placeholder: "How can we help?" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Message" }), _jsx("textarea", { required: true, rows: 5, value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), className: "w-full px-4 py-3 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none", placeholder: "Tell us more..." })] }), _jsxs(Button, { type: "submit", variant: "premium", size: "lg", className: "w-full group", children: ["Send Message", _jsx(Send, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, className: "space-y-6", children: [_jsxs("div", { className: "glass-panel p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Clock, { className: "w-5 h-5 text-primary" }), _jsx("h3", { className: "font-semibold", children: "Response Time" })] }), _jsx("p", { className: "text-muted-foreground text-sm", children: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly." })] }), _jsxs("div", { className: "glass-panel p-6", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Frequently Asked" }), _jsx("div", { className: "space-y-4", children: [
                                                            "How do I access my enrolled courses?",
                                                            "Can I get a refund if I'm not satisfied?",
                                                            "Do you offer certificates upon completion?",
                                                            "Are there any prerequisites for courses?",
                                                        ].map((faq, index) => (_jsxs("p", { className: "text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors", children: ["\u2192 ", faq] }, index))) })] })] })] }) }) })] }), _jsx(Footer, {})] }));
};
export default Contact;
