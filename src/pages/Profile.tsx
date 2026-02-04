import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, Camera, Trash2, Lock } from "lucide-react";
import { Button } from "../components/ui/button";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!user)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
        Please login to view your profile
      </div>
    );

  // =========================
  // Avatar Upload
  // =========================
  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append("avatar", avatarFile);
    formData.append("email", user.email);

    const res = await fetch("http://localhost:5000/upload-avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      updateUser({ avatar: data.avatar });
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
      updateUser({ avatar: "" });
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

  return (
    <div className="max-w-4xl mx-auto px-4 mt-28">
      {/* Header Card */}
      <div className="relative glass-panel rounded-2xl p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-primary-foreground">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Upload */}
            <label className="absolute -bottom-3 -right-3 bg-background p-2 rounded-full shadow cursor-pointer">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setAvatarFile(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2 justify-center sm:justify-start mt-1">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>

            <div className="flex gap-3 mt-4 justify-center sm:justify-start">
              <Button size="sm" onClick={handleAvatarUpload}>
                Save Photo
              </Button>
              {user.avatar && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveAvatar}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Personal Information
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Change Password
          </h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              className="w-full p-2 rounded border bg-background"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 rounded border bg-background"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Button onClick={handleChangePassword}>
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {message && (
        <p className="mt-6 text-center text-sm text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default Profile;
