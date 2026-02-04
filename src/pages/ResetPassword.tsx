import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ frontend validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/reset-password/${token}`,
        { newPassword: password }
      );

      setSuccess(res.data.message);
      setError("");

      setTimeout(() => navigate("/login"), 2000);

    } catch (err: any) {
      setSuccess("");
      setError(
        err.response?.data?.message ||
        "Something went wrong. Try again."
      );
    }
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 w-full">
        Reset
      </button>

      {error && <p className="mt-3 text-center text-red-600">{error}</p>}
      {success && <p className="mt-3 text-center text-green-600">{success}</p>}
    </form>
  );
};

export default ResetPassword;
