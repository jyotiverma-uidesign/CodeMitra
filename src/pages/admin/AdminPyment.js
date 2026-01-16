import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
/* =========================
   LOCAL STORAGE FUNCTIONS
========================= */
const getPayments = () => {
    return JSON.parse(localStorage.getItem("payments") || "[]");
};
const updatePaymentStatus = (id, status) => {
    const payments = getPayments();
    const updatedPayments = payments.map((p) => p.paymentId === id ? { ...p, status } : p);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    window.location.reload();
};
/* =========================
   COMPONENT
========================= */
const AdminPayments = () => {
    const payments = getPayments();
    return (_jsxs("div", { className: "p-10 text-white", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Admin \u2013 Payment Approvals" }), payments.length === 0 && _jsx("p", { children: "No payments found" }), _jsx("div", { className: "space-y-4", children: payments.map((p) => (_jsxs("div", { className: "p-4 border rounded-xl flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("p", { children: [_jsx("b", { children: "Course:" }), " ", p.courseId] }), _jsxs("p", { children: [_jsx("b", { children: "Txn:" }), " ", p.paymentId] }), _jsxs("p", { children: [_jsx("b", { children: "Amount:" }), " \u20B9", p.amount] }), _jsxs("p", { children: [_jsx("b", { children: "Status:" }), " ", p.status] })] }), p.status === "PENDING" && (_jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { onClick: () => updatePaymentStatus(p.paymentId, "APPROVED"), children: "Approve" }), _jsx(Button, { variant: "destructive", onClick: () => updatePaymentStatus(p.paymentId, "REJECTED"), children: "Reject" })] }))] }, p.paymentId))) })] }));
};
export default AdminPayments;
