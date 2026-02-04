import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { supabase } from "./config/supabase.js";

dotenv.config();

const app = express();

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set in .env');
  process.exit(1);  // Exit if missing
}

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= AUTH MIDDLEWARE ================= */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.warn('Auth middleware: No token provided');
    return res.status(401).json({ message: "Token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.warn('Auth middleware: Invalid token');
      return res.status(403).json({ message: "Invalid token" });
    }
    // Log only decoded payload (no raw token)
    console.log('Auth middleware: token decoded', { id: user.id, email: user.email });
    req.user = user;
    next();
  });
};

/* ================= COURSES DATA ================= */
const courses = [
  // ================= FREE COURSES ===============
  {
    id: "intro-generative-ai",
    title: "Introduction to Generative AI",
    description: "Learn the fundamentals of Generative AI, ChatGPT, and modern AI tools with real-world examples.",
    category: "Programming",
    pricing: "Free",
    level: "Beginner",
    duration: "2 weeks",
    students: "18K",
    rating: "4.7",
    color: "from-sky-500 to-indigo-600",
    image: "🤖"
  },
  {
    id: "intro-mern-stack",
    title: "Introduction to MERN Stack",
    description: "Understand the basics of MongoDB, Express, React, and Node before starting full-stack development.",
    category: "Programming",
    pricing: "Free",
    level: "Beginner",
    duration: "3 weeks",
    students: "15.2K",
    rating: "4.6",
    color: "from-green-500 to-emerald-600",
    image: "🌐"
  },
  // ================= PAID COURSES =================
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    description: "Master Python from basics to advanced concepts with hands-on projects and practical examples.",
    category: "Programming",
    pricing: "Paid",
    level: "Beginner",
    duration: "8 weeks",
    students: "12.5K",
    rating: "4.9",
    color: "from-emerald-500 to-teal-600",
    image: "🐍"
  },
  {
    id: "javascript-developer",
    title: "JavaScript Developer",
    description: "Become a modern JavaScript developer with ES6+, DOM, async programming, and real projects.",
    category: "Programming",
    pricing: "Paid",
    level: "Intermediate",
    duration: "10 weeks",
    students: "9.8K",
    rating: "4.8",
    color: "from-yellow-500 to-orange-600",
    image: "⚡"
  },
  {
    id: "fullstack-web-dev",
    title: "Full-Stack Web Development (MERN)",
    description: "Build complete full-stack applications using React, Node.js, MongoDB, and deploy them professionally.",
    category: "Programming",
    pricing: "Paid",
    level: "Advanced",
    duration: "16 weeks",
    students: "7.2K",
    rating: "4.9",
    color: "from-primary to-neon-cyan",
    image: "🚀"
  }
];

/* ================= ROUTES ================= */

// TEST
app.get("/", (req, res) => {
  res.send("🚀 PostgreSQL Server Running");
});

/* ========== COURSES ========== */
app.get("/api/courses", (req, res) => {
  try {
    res.json(courses);
  } catch (err) {
    console.error("Courses Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/courses/:id", (req, res) => {
  try {
    const course = courses.find(c => c.id === req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error("Course Detail Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========== SIGNUP ========== */
app.post("/api/users/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    // Check user exists - using Supabase query
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user - persist hashed password to `password` column
    const { error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }]);

    if (error) throw error;

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========== LOGIN ========== */
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    // Fetch user - using Supabase query
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) return res.status(400).json({ message: "Invalid credentials" });

    // Ensure user has a stored password
    if (!user.password) return res.status(400).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    // Return token and basic user info (including role so client can avoid an extra profile fetch if desired)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      },
    });
  } catch (err) {
    console.error("Login Error:", err);  // Check this log for details
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

/* ========== PROFILE (PROTECTED) ========== */
app.get("/api/users/profile", authenticateToken, async (req, res) => {
  try {
    console.log('Profile request, token payload:', req.user);

    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // Try lookup by id first
    let user = null;
    let error = null;

    if (req.user.id) {
      const result = await supabase
        .from('users')
        .select('id, name, email, role, "profileImage"')
        .eq('id', req.user.id)
        .single();
      user = result.data;
      if (user) user.avatar = user.profileImage; // Map profileImage to avatar for frontend
      error = result.error;
      console.log('Supabase profile by id:', { error: error || null, user: user ? { id: user.id, email: user.email } : null });
    }

    // If not found and we have an email in token, try lookup by email
    if ((!user || !user.id) && req.user.email) {
      const result = await supabase
        .from('users')
        .select('id, name, email, role, "profileImage"')
        .eq('email', req.user.email)
        .single();
      user = result.data;
      if (user) user.avatar = user.profileImage; // Map profileImage to avatar for frontend
      error = result.error;
      console.log('Supabase profile by email:', { error: error || null, user: user ? { id: user.id, email: user.email } : null });
    }

    if (error || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});