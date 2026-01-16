import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword: password });
            setMsg(res.data.message);
            setTimeout(() => navigate("/login"), 2000);
        }
        catch (err) {
            setMsg(err.response?.data?.message || "Error");
        }
    };
    return (_jsxs("form", { onSubmit: submit, className: "p-6 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl mb-4", children: "Reset Password" }), _jsx("input", { type: "password", placeholder: "New password", className: "border p-2 w-full mb-3", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 w-full", children: "Reset" }), msg && _jsx("p", { className: "mt-3 text-center", children: msg })] }));
};
export default ResetPassword;
