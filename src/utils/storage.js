const KEY = "payments";
export const getPayments = () => {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
};
export const savePayment = (payment) => {
    const payments = getPayments();
    payments.push(payment);
    localStorage.setItem(KEY, JSON.stringify(payments));
};
export const updatePaymentStatus = (id, status) => {
    const payments = getPayments().map(p => p.id === id ? { ...p, status } : p);
    localStorage.setItem(KEY, JSON.stringify(payments));
};
