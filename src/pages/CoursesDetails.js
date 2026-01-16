import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { CourseVideoPlayer } from "./courses/CourseVideoPlayer";
import { Clock, BookOpen, User, Star, Play, CreditCard, AlertTriangle, } from "lucide-react";
const TXN_REGEX = /^[A-Za-z0-9]{10,25}$/;
const CourseDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const course = location.state?.course || null;
    const [showDemo, setShowDemo] = useState(false);
    const [showUPI, setShowUPI] = useState(false);
    const [txnId, setTxnId] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState("");
    const amount = course?.price ?? 499;
    if (!course) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center text-xl", children: "Course not found" }));
    }
    const handlePaymentSubmit = () => {
        setError("");
        if (!TXN_REGEX.test(txnId)) {
            setError("Invalid Transaction ID format");
            return;
        }
        if (!confirmed) {
            setError("Please confirm payment");
            return;
        }
        const paymentRecord = {
            paymentId: txnId,
            courseId: course.id,
            courseTitle: course.title,
            amount,
            status: "PENDING",
            createdAt: Date.now(),
        };
        const existing = JSON.parse(localStorage.getItem("payments") || "[]");
        localStorage.setItem("payments", JSON.stringify([...existing, paymentRecord]));
        setShowUPI(false);
        navigate("/deshboard");
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-24 pb-16", children: _jsx("section", { className: "py-12", children: _jsx("div", { className: "container mx-auto px-4 max-w-5xl", children: _jsx(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "glass-panel-strong p-8 rounded-3xl", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsx("div", { className: `w-28 h-28 rounded-3xl bg-gradient-to-br ${course.color}
                  flex items-center justify-center text-5xl`, children: course.image }), _jsxs("div", { className: "flex-1", children: [_jsx("h1", { className: "text-4xl font-bold gradient-text mb-3", children: course.title }), _jsx("p", { className: "text-muted-foreground mb-6", children: course.description }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(User, { className: "w-4 h-4" }), " ", course.level] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Clock, { className: "w-4 h-4" }), " ", course.duration] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(BookOpen, { className: "w-4 h-4" }), " ", course.students] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400 fill-yellow-400" }), course.rating] })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(Button, { size: "lg", variant: "premium", onClick: () => setShowUPI(true), children: [_jsx(CreditCard, { className: "w-5 h-5 mr-2" }), "Enroll Now \u2013 \u20B9", amount] }), _jsxs(Button, { size: "lg", variant: "outline", onClick: () => setShowDemo(true), children: [_jsx(Play, { className: "w-5 h-5 mr-2" }), "Watch Demo"] })] })] })] }) }) }) }) }), _jsx(Footer, {}), _jsx(AnimatePresence, { children: showDemo && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm", children: _jsx(CourseVideoPlayer, { title: `${course.title} – Demo`, videoUrl: null, onClose: () => setShowDemo(false) }) })) }), _jsx(AnimatePresence, { children: showUPI && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: _jsxs(motion.div, { initial: { scale: 0.85, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.85, opacity: 0 }, transition: { duration: 0.4 }, className: "relative bg-white rounded-3xl p-6 w-full max-w-sm text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Pay via UPI" }), _jsxs("p", { className: "text-sm text-gray-600 mb-3", children: ["Amount: ", _jsxs("b", { children: ["\u20B9", amount] })] }), _jsx("img", { src: "/barcode.jpeg", alt: "UPI QR", className: "w-48 mx-auto mb-4" }), _jsx("input", { type: "text", placeholder: "UPI Transaction ID", value: txnId, onChange: (e) => setTxnId(e.target.value.trim()), className: "w-full mb-2 px-4 py-2 border rounded-lg text-sm" }), _jsxs("label", { className: "flex items-center gap-2 text-sm mb-3", children: [_jsx("input", { type: "checkbox", checked: confirmed, onChange: (e) => setConfirmed(e.target.checked) }), "I confirm payment of \u20B9", amount] }), error && (_jsxs("div", { className: "flex items-center gap-2 text-red-500 text-sm mb-3", children: [_jsx(AlertTriangle, { className: "w-4 h-4" }), error] })), _jsx(Button, { className: "w-full", disabled: !txnId || !confirmed, onClick: handlePaymentSubmit, children: "I have paid" }), _jsx("button", { onClick: () => setShowUPI(false), className: "mt-3 text-sm text-gray-500", children: "Cancel" })] }) })) })] }));
};
export default CourseDetail;
