import express from "express";
import { readPayments, writePayments } from "../utils/fileDb.js";

const router = express.Router();

/* USER submits payment */
router.post("/submit", (req, res) => {
  const { paymentId, courseId, amount } = req.body;

  if (!paymentId || !courseId || !amount) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const payments = readPayments();

  payments.push({
    id: Date.now().toString(),
    paymentId,
    courseId,
    amount,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  });

  writePayments(payments);

  res.json({ success: true, message: "Payment submitted, waiting approval" });
});

/* ADMIN: get all payments */
router.get("/", (req, res) => {
  const payments = readPayments();
  res.json(payments);
});

/* ADMIN: approve payment */
router.post("/approve/:id", (req, res) => {
  const payments = readPayments();
  const payment = payments.find(p => p.id === req.params.id);

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  payment.status = "APPROVED";
  writePayments(payments);

  res.json({ success: true });
});

export default router;
