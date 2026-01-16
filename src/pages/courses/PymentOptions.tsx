import { motion } from "framer-motion";
import { X, CreditCard, Wallet, Check, Loader2, Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";

interface PaymentOptionsProps {
  price: number;
  installmentAllowed: boolean;
  onSelect: (type: "full" | "installment") => void;
  onClose: () => void;
  loading: boolean;
}

export const PaymentOptions = ({
  price,
  installmentAllowed,
  onSelect,
  onClose,
  loading,
}: PaymentOptionsProps) => {
  const [selectedPlan, setSelectedPlan] =
    useState<"full" | "installment" | null>(null);

  const [showUPI, setShowUPI] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [error, setError] = useState("");

  const installmentAmount = Math.ceil(price / 5);

  const handleProceed = () => {
    if (!selectedPlan) return;
    setShowUPI(true); // ⬅️ move to UPI step
  };

  const validateTxnId = (id: string) => {
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

  return (
    <>
      {/* ===== PLAN SELECTION ===== */}
      {!showUPI && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-panel-strong p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold gradient-text">
                Choose Payment Plan
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Select how you'd like to pay
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Full */}
            <div
              onClick={() => setSelectedPlan("full")}
              className={`p-6 rounded-2xl border-2 cursor-pointer ${
                selectedPlan === "full"
                  ? "border-primary bg-primary/10"
                  : "border-border/50"
              }`}
            >
              <h4 className="font-semibold mb-2">Full Payment</h4>
              <div className="text-3xl font-bold">₹{price}</div>
            </div>

            {/* Installment */}
            {installmentAllowed && (
              <div
                onClick={() => setSelectedPlan("installment")}
                className={`p-6 rounded-2xl border-2 cursor-pointer ${
                  selectedPlan === "installment"
                    ? "border-secondary bg-secondary/10"
                    : "border-border/50"
                }`}
              >
                <h4 className="font-semibold mb-2">Installments</h4>
                <div className="text-3xl font-bold">
                  ₹{installmentAmount}/month
                </div>
              </div>
            )}
          </div>

          <Button
            variant="premium"
            size="lg"
            className="w-full"
            onClick={handleProceed}
            disabled={!selectedPlan}
          >
            Proceed to UPI
          </Button>
        </motion.div>
      )}

      {/* ===== UPI STEP ===== */}
      {showUPI && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel-strong p-6 md:p-8"
        >
          <h3 className="text-xl font-bold mb-2">Pay via UPI</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Scan & pay exact amount ₹{price}
          </p>

          <img
            src="/barcode.jpeg"
            alt="UPI QR"
            className="w-48 mx-auto mb-4"
          />

          <input
            placeholder="Enter Transaction ID"
            value={txnId}
            onChange={(e) => {
              setTxnId(e.target.value);
              setError("");
            }}
            className="w-full p-3 rounded-xl border mb-2"
          />

          {error && (
            <p className="text-sm text-red-500 mb-2">{error}</p>
          )}

          <Button className="w-full" onClick={handleConfirmPayment}>
            Confirm Payment
          </Button>

          <button
            onClick={() => setShowUPI(false)}
            className="text-sm text-gray-500 mt-3 w-full"
          >
            Back
          </button>
        </motion.div>
      )}
    </>
  );
};
