import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/verify-otp", {
        email,
        otp,
      });

      setMessage("OTP verified successfully! Redirecting to reset password...");
      setTimeout(() => navigate(`/reset-password/${res.data.resetToken}`), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Verify OTP
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full border p-2 rounded mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyOTP;
