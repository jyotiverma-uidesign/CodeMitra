import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export const PaymentPending = () => (_jsxs("div", { className: "h-screen flex flex-col items-center justify-center", children: [_jsx(motion.div, { animate: { opacity: [0.3, 1, 0.3] }, transition: { repeat: Infinity, duration: 1.5 }, className: "text-xl font-semibold", children: "Verifying Payment\u2026" }), _jsx("p", { className: "text-gray-500 mt-2", children: "Access will unlock after admin approval" })] }));
