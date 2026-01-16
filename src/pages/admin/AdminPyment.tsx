import { Button } from "../../components/ui/button";

/* =========================
   LOCAL STORAGE FUNCTIONS
========================= */

const getPayments = () => {
  return JSON.parse(localStorage.getItem("payments") || "[]");
};

const updatePaymentStatus = (id: string, status: string) => {
  const payments = getPayments();

  const updatedPayments = payments.map((p: any) =>
    p.paymentId === id ? { ...p, status } : p
  );

  localStorage.setItem("payments", JSON.stringify(updatedPayments));
  window.location.reload();
};

/* =========================
   COMPONENT
========================= */

const AdminPayments = () => {
  const payments = getPayments();

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Admin – Payment Approvals
      </h1>

      {payments.length === 0 && <p>No payments found</p>}

      <div className="space-y-4">
        {payments.map((p: any) => (
          <div
            key={p.paymentId}
            className="p-4 border rounded-xl flex justify-between items-center"
          >
            <div>
              <p>
                <b>Course:</b> {p.courseId}
              </p>
              <p>
                <b>Txn:</b> {p.paymentId}
              </p>
              <p>
                <b>Amount:</b> ₹{p.amount}
              </p>
              <p>
                <b>Status:</b> {p.status}
              </p>
            </div>

            {p.status === "PENDING" && (
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    updatePaymentStatus(p.paymentId, "APPROVED")
                  }
                >
                  Approve
                </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    updatePaymentStatus(p.paymentId, "REJECTED")
                  }
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPayments;
