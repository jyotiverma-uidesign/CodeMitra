import { PaymentRecord } from "../types/payment";

const KEY = "payments";

export const getPayments = (): PaymentRecord[] => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const savePayment = (payment: PaymentRecord) => {
  const payments = getPayments();
  payments.push(payment);
  localStorage.setItem(KEY, JSON.stringify(payments));
};

export const updatePaymentStatus = (id: string, status: string) => {
  const payments = getPayments().map(p =>
    p.id === id ? { ...p, status } : p
  );
  localStorage.setItem(KEY, JSON.stringify(payments));
};
