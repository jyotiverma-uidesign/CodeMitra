import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark"); // default dark
    // 🔹 Detect saved or system theme
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const finalTheme = saved ?? (systemDark ? "dark" : "light");
        setTheme(finalTheme);
        document.documentElement.classList.toggle("dark", finalTheme === "dark");
    }, []);
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        // 🔹 Apply dark class globally
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    const bgClass = theme === "dark"
        ? "bg-white/10 border-white/20 hover:bg-white/20"
        : "bg-yellow-100 border-yellow-300 hover:bg-yellow-200";
    const iconColor = theme === "dark" ? "text-white" : "text-yellow-600";
    return (_jsx(motion.button, { onClick: toggleTheme, whileTap: { scale: 0.9 }, className: `
        relative w-11 h-11 rounded-full
        flex items-center justify-center
        ${bgClass}
        backdrop-blur-md border shadow-lg
        transition-colors
      `, children: _jsx(AnimatePresence, { mode: "wait", initial: false, children: _jsx(motion.div, { initial: { rotate: -90, opacity: 0, scale: 0.5 }, animate: { rotate: 0, opacity: 1, scale: 1 }, exit: { rotate: 90, opacity: 0, scale: 0.5 }, transition: { duration: 0.3 }, children: theme === "dark" ? (_jsx(Moon, { className: `w-5 h-5 ${iconColor}` })) : (_jsx(Sun, { className: `w-5 h-5 ${iconColor}` })) }, theme) }) }));
}
