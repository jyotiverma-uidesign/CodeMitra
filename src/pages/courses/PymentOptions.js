import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
export const PaymentOptions = ({ price, installmentAllowed, onSelect, onClose, loading, }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showUPI, setShowUPI] = useState(false);
    const [txnId, setTxnId] = useState("");
    const [error, setError] = useState("");
    const installmentAmount = Math.ceil(price / 5);
    const handleProceed = () => {
        if (!selectedPlan)
            return;
        setShowUPI(true); // ⬅️ move to UPI step
    };
    const validateTxnId = (id) => {
        const regex = /^[a-zA-Z0-9@._-]{12,35}$/;
        return regex.test(id);
    };
    const handleConfirmPayment = () => {
        if (!validateTxnId(txnId)) {
            setError("Invalid Transaction ID");
            return;
        }
        // 🔒 Save as PENDING (NO direct access)
        const payments = JSON.parse(localStorage.getItem("payments") || "[]");
        payments.push({
            id: Date.now().toString(),
            courseId: "python-fundamentals", // dynamic later
            amount: selectedPlan === "full" ? price : installmentAmount,
            plan: selectedPlan,
            transactionId: txnId,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        });
        localStorage.setItem("payments", JSON.stringify(payments));
        setShowUPI(false);
        onClose(); // close modal
    };
    return (_jsxs(_Fragment, { children: [!showUPI && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, className: "glass-panel-strong p-6 md:p-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold gradient-text", children: "Choose Payment Plan" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Select how you'd like to pay" })] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { onClick: () => setSelectedPlan("full"), className: `p-6 rounded-2xl border-2 cursor-pointer ${selectedPlan === "full"
                                    ? "border-primary bg-primary/10"
                                    : "border-border/50"}`, children: [_jsx("h4", { className: "font-semibold mb-2", children: "Full Payment" }), _jsxs("div", { className: "text-3xl font-bold", children: ["\u20B9", price] })] }), installmentAllowed && (_jsxs("div", { onClick: () => setSelectedPlan("installment"), className: `p-6 rounded-2xl border-2 cursor-pointer ${selectedPlan === "installment"
                                    ? "border-secondary bg-secondary/10"
                                    : "border-border/50"}`, children: [_jsx("h4", { className: "font-semibold mb-2", children: "Installments" }), _jsxs("div", { className: "text-3xl font-bold", children: ["\u20B9", installmentAmount, "/month"] })] }))] }), _jsx(Button, { variant: "premium", size: "lg", className: "w-full", onClick: handleProceed, disabled: !selectedPlan, children: "Proceed to UPI" })] })), showUPI && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "glass-panel-strong p-6 md:p-8", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "Pay via UPI" }), _jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: ["Scan & pay exact amount \u20B9", price] }), _jsx("img", { src: "/barcode.jpeg", alt: "UPI QR", className: "w-48 mx-auto mb-4" }), _jsx("input", { placeholder: "Enter Transaction ID", value: txnId, onChange: (e) => {
                            setTxnId(e.target.value);
                            setError("");
                        }, className: "w-full p-3 rounded-xl border mb-2" }), error && (_jsx("p", { className: "text-sm text-red-500 mb-2", children: error })), _jsx(Button, { className: "w-full", onClick: handleConfirmPayment, children: "Confirm Payment" }), _jsx("button", { onClick: () => setShowUPI(false), className: "text-sm text-gray-500 mt-3 w-full", children: "Back" })] }))] }));
};
