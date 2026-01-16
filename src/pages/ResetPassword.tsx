import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/reset-password/${token}`,
        { newPassword: password }
      );
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Error");
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
      {msg && <p className="mt-3 text-center">{msg}</p>}
    </form>
  );
};

export default ResetPassword;
