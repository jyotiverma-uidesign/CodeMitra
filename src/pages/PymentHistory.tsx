import { getPayments } from "../utils/storage";

export default function PaymentHistory() {
  const payments = getPayments();

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      {payments.length === 0 && (
        <p className="text-gray-400">No payments yet</p>
      )}

      {payments.map(p => (
        <div
          key={p.paymentId}
          className="p-4 border border-white/10 rounded-xl mb-4"
        >
          <p className="font-semibold">{p.courseId}</p>

          <p className="text-sm text-gray-400">
            Amount: ₹{p.amount}
          </p>

          <p
            className={`text-xs font-medium mt-1 ${
              p.status === "APPROVED"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {p.status}
          </p>
        </div>
      ))}
    </div>
  );
}
