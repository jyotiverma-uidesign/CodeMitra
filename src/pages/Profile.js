import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, Camera, Trash2, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
const Profile = () => {
    const { user, login } = useAuth();
    const [avatarFile, setAvatarFile] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    if (!user)
        return (_jsx("div", { className: "min-h-[60vh] flex items-center justify-center text-muted-foreground", children: "Please login to view your profile" }));
    // =========================
    // Avatar Upload
    // =========================
    const handleAvatarUpload = async () => {
        if (!avatarFile)
            return;
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        formData.append("email", user.email);
        const res = await fetch("http://localhost:5000/upload-avatar", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            login({ ...user, avatar: data.avatar });
            setMessage("Profile image updated successfully");
        }
    };
    // =========================
    // Avatar Remove
    // =========================
    const handleRemoveAvatar = async () => {
        const res = await fetch("http://localhost:5000/remove-avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
        });
        if (res.ok) {
            login({ ...user, avatar: "" });
            setMessage("Profile image removed");
        }
    };
    // =========================
    // Change Password
    // =========================
    const handleChangePassword = async () => {
        const res = await fetch("http://localhost:5000/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                oldPassword,
                newPassword,
            }),
        });
        const data = await res.json();
        setMessage(data.message);
        setOldPassword("");
        setNewPassword("");
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 mt-28", children: [_jsxs("div", { className: "relative glass-panel rounded-2xl p-8 mb-8 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" }), _jsxs("div", { className: "relative flex flex-col sm:flex-row items-center gap-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl overflow-hidden", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-full h-full object-cover" })) : (_jsx("span", { className: "text-4xl font-bold text-primary-foreground", children: user.name.charAt(0) })) }), _jsxs("label", { className: "absolute -bottom-3 -right-3 bg-background p-2 rounded-full shadow cursor-pointer", children: [_jsx(Camera, { className: "w-4 h-4" }), _jsx("input", { type: "file", accept: "image/*", hidden: true, onChange: (e) => setAvatarFile(e.target.files?.[0] || null) })] })] }), _jsxs("div", { className: "text-center sm:text-left", children: [_jsx("h1", { className: "text-3xl font-bold", children: user.name }), _jsxs("p", { className: "text-muted-foreground flex items-center gap-2 justify-center sm:justify-start mt-1", children: [_jsx(Mail, { className: "w-4 h-4" }), user.email] }), _jsxs("div", { className: "flex gap-3 mt-4 justify-center sm:justify-start", children: [_jsx(Button, { size: "sm", onClick: handleAvatarUpload, children: "Save Photo" }), user.avatar && (_jsxs(Button, { size: "sm", variant: "destructive", onClick: handleRemoveAvatar, children: [_jsx(Trash2, { className: "w-4 h-4 mr-1" }), "Remove"] }))] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "glass-panel rounded-2xl p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Personal Information" }), _jsxs("div", { className: "space-y-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(User, { className: "w-4 h-4 text-primary" }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Full Name" }), _jsx("p", { className: "font-medium", children: user.name })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Mail, { className: "w-4 h-4 text-primary" }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Email Address" }), _jsx("p", { className: "font-medium", children: user.email })] })] }), user.phone && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Phone, { className: "w-4 h-4 text-primary" }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", children: "Phone Number" }), _jsx("p", { className: "font-medium", children: user.phone })] })] }))] })] }), _jsxs("div", { className: "glass-panel rounded-2xl p-6", children: [_jsxs("h2", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx(Lock, { className: "w-4 h-4" }), "Change Password"] }), _jsxs("div", { className: "space-y-4", children: [_jsx("input", { type: "password", placeholder: "Old Password", className: "w-full p-2 rounded border bg-background", value: oldPassword, onChange: (e) => setOldPassword(e.target.value) }), _jsx("input", { type: "password", placeholder: "New Password", className: "w-full p-2 rounded border bg-background", value: newPassword, onChange: (e) => setNewPassword(e.target.value) }), _jsx(Button, { onClick: handleChangePassword, children: "Update Password" })] })] })] }), message && (_jsx("p", { className: "mt-6 text-center text-sm text-green-600", children: message }))] }));
};
export default Profile;
