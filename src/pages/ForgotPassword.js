import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axios.post("http://localhost:5000/forgot-password", {
                email,
            });
            setMessage(res.data.message);
        }
        catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded shadow w-[350px]", children: [_jsx("h2", { className: "text-xl font-semibold mb-4 text-center", children: "Forgot Password" }), _jsx("input", { type: "email", placeholder: "Enter your email", className: "w-full border p-2 rounded mb-3", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("button", { disabled: loading, className: "w-full bg-blue-600 text-white py-2 rounded", children: loading ? "Sending..." : "Send Reset Link" }), message && (_jsx("p", { className: "text-center text-sm mt-3 text-green-600", children: message }))] }) }));
};
export default ForgotPassword;
