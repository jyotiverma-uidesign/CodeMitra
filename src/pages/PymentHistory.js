import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getPayments } from "../utils/storage";
export default function PaymentHistory() {
    const payments = getPayments();
    return (_jsxs("div", { className: "p-10 text-white", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Payment History" }), payments.length === 0 && (_jsx("p", { className: "text-gray-400", children: "No payments yet" })), payments.map(p => (_jsxs("div", { className: "p-4 border border-white/10 rounded-xl mb-4", children: [_jsx("p", { className: "font-semibold", children: p.courseId }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Amount: \u20B9", p.amount] }), _jsx("p", { className: `text-xs font-medium mt-1 ${p.status === "APPROVED"
                            ? "text-green-400"
                            : "text-yellow-400"}`, children: p.status })] }, p.paymentId)))] }));
}
