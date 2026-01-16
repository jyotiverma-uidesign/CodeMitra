import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const USERS_FILE = "./users.json";

/* ================= HELPERS ================= */
const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8") || "[]");
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

/* ================= PASSWORD VALIDATION ================= */
const isStrongPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
};

/* ================= EMAIL CONFIG (UNCHANGED) ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_16_DIGIT_APP_PASSWORD",
  },
});

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const users = getUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Account already exists" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be 8+ chars, include uppercase, number & symbol",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hashedPassword,
    passwordHistory: [],
    avatar: "",
  });

  saveUsers(users);
  res.json({ message: "Registration successful" });
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

/* ================= FORGOT PASSWORD (UNCHANGED) ================= */
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const users = getUsers();

    const userIndex = users.findIndex((u) => u.email === email);

    // security response
    if (userIndex === -1) {
      return res.json({ message: "If email exists, reset link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000;

    users[userIndex].resetToken = token;
    users[userIndex].resetTokenExpiry = expiry;
    saveUsers(users);

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Code Mitra" <YOUR_GMAIL@gmail.com>`,
      to: email,
      subject: "Reset your password",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Valid for 15 minutes</p>
      `,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ message: "Email service failed" });
  }
});

/* ================= RESET PASSWORD (UPDATED) ================= */
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({
      message:
        "Password must be 8+ chars, include uppercase, number & symbol",
    });
  }

  const users = getUsers();
  const userIndex = users.findIndex(
    (u) =>
      u.resetToken === token &&
      u.resetTokenExpiry &&
      u.resetTokenExpiry > Date.now()
  );

  if (userIndex === -1) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // prevent password reuse (last 3)
  for (const oldHash of users[userIndex].passwordHistory || []) {
    const reused = await bcrypt.compare(newPassword, oldHash);
    if (reused) {
      return res.status(400).json({
        message: "You cannot reuse your last 3 passwords",
      });
    }
  }

  // save current password into history
  users[userIndex].passwordHistory.unshift(users[userIndex].password);
  users[userIndex].passwordHistory =
    users[userIndex].passwordHistory.slice(0, 3);

  users[userIndex].password = await bcrypt.hash(newPassword, 10);

  delete users[userIndex].resetToken;
  delete users[userIndex].resetTokenExpiry;

  saveUsers(users);

  res.json({ message: "Password reset successful" });
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`✅ Secure Server running on http://localhost:${PORT}`);
});
