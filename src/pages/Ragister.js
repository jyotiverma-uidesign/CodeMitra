import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Code2, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";
const benefits = [
    "Access to 100+ premium courses",
    "Hands-on projects & assignments",
    "Industry-recognized certificates",
    "24/7 community support",
];
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registration failed");
                return;
            }
            // Registration successful → redirect to login
            navigate("/login");
        }
        catch (err) {
            setError("Server error. Please try again later.");
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background flex", children: [_jsxs("div", { className: "hidden lg:flex flex-1 items-center justify-center relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" }), _jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-20" }), _jsx("div", { className: "absolute top-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl floating" }), _jsx("div", { className: "absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary/30 rounded-full blur-3xl floating", style: { animationDelay: "-2s" } }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.2 }, className: "relative z-10 p-12 max-w-md", children: [_jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-8 shadow-2xl", children: _jsx(Code2, { className: "w-10 h-10 text-primary-foreground" }) }), _jsx("h2", { className: "text-3xl font-bold mb-4", children: "Join Code Mitra" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Start your journey to becoming a professional developer with our comprehensive courses." }), _jsx("div", { className: "space-y-4", children: benefits.map((benefit, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4 + index * 0.1 }, className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center", children: _jsx(Check, { className: "w-3 h-3 text-primary" }) }), _jsx("span", { className: "text-sm text-muted-foreground", children: benefit })] }, benefit))) })] })] }), _jsx("div", { className: "flex-1 flex items-center justify-center p-8", children: _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, className: "w-full max-w-md", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-8", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center", children: _jsx(Code2, { className: "w-5 h-5 text-primary-foreground" }) }), _jsx("span", { className: "text-xl font-bold gradient-text", children: "Code Mitra" })] }), _jsx("h1", { className: "text-3xl font-bold mb-2", children: "Create an account" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Start your free trial today" }), error && _jsx("p", { className: "text-sm text-red-500 mb-2", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: "text", required: true, value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "w-full h-12 pl-12 pr-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors", placeholder: "John Doe" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "w-full h-12 pl-12 pr-4 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors", placeholder: "your@email.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), className: "w-full h-12 pl-12 pr-12 rounded-lg glass-panel border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Must be at least 8 characters" })] }), _jsxs(Button, { type: "submit", variant: "premium", size: "lg", className: "w-full group", children: ["Create Account", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] })] }), _jsxs("p", { className: "text-xs text-muted-foreground mt-6 text-center", children: ["By signing up, you agree to our", " ", _jsx(Link, { to: "/terms", className: "text-primary hover:underline", children: "Terms of Service" }), " and", " ", _jsx(Link, { to: "/privacy", className: "text-primary hover:underline", children: "Privacy Policy" })] }), _jsx("div", { className: "mt-8 text-center", children: _jsxs("p", { className: "text-muted-foreground", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "text-primary hover:underline font-medium", children: "Sign in" })] }) })] }) })] }));
};
export default Register;
