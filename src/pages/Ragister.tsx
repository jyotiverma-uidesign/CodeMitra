import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Code2, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const benefits = [
  "Access to 100+ premium courses",
  "Hands-on projects & assignments",
  "Industry-recognized certificates",
  "24/7 community support",
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Server error");
        return;
      }

      // ✅ Success
      navigate("/login");
    } catch (err: any) {
      console.error("Signup Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-12 max-w-md"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-8">
            <Code2 className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Join Code Mitra</h2>
          <p className="text-muted-foreground mb-8">
            Start your journey to becoming a professional developer.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border p-3 rounded"
            />

            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border p-3 rounded"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
