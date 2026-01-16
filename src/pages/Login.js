import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Code2, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // ✅ NEW
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }
            // ✅ AuthContext login
            login(data.user); // rememberMe future ke liye
            navigate("/", { replace: true });
        }
        catch (err) {
            setError("Server error. Please try again later.");
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-background flex", children: _jsx("div", { className: "flex-1 flex items-center justify-center p-8", children: _jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, className: "w-full max-w-md", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-8", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center", children: _jsx(Code2, { className: "w-5 h-5 text-primary-foreground" }) }), _jsx("span", { className: "text-xl font-bold gradient-text", children: "Code Mitra" })] }), _jsx("h1", { className: "text-3xl font-bold mb-2", children: "Welcome back" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Sign in to continue your learning journey" }), error && _jsx("p", { className: "text-sm text-red-500 mb-3", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "w-full h-12 pl-12 pr-4 rounded-lg glass-panel border-border/50 bg-muted/30", placeholder: "your@email.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), className: "w-full h-12 pl-12 pr-12 rounded-lg glass-panel border-border/50 bg-muted/30", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2", children: showPassword ? (_jsx(EyeOff, { className: "w-5 h-5" })) : (_jsx(Eye, { className: "w-5 h-5" })) })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked) }), "Remember me"] }), _jsx(Link, { to: "/forgot-password", className: "text-primary font-medium hover:underline", children: "Forgot password?" })] }), _jsxs(Button, { type: "submit", variant: "premium", size: "lg", className: "w-full", children: ["Sign In", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] })] }), _jsx("div", { className: "mt-8 text-center", children: _jsxs("p", { className: "text-muted-foreground", children: ["Don't have an account?", " ", _jsx(Link, { to: "/register", className: "text-primary font-medium", children: "Sign up" })] }) })] }) }) }));
};
export default Login;
