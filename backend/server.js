import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));  // Allow frontend
app.use(express.json());  // Parse JSON
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));  // Serve files

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Password validation
const isStrongPassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

// Auth middleware
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.id)
      .single();
    if (error || !user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

// ================= USERS ROUTES =================

// Signup
app.post('/api/users/signup', upload.single('profileImage'), [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }).custom(isStrongPassword),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password: hashedPassword, profileImage: req.file?.path, role: 'user' }]);

  if (error) return res.status(400).json({ message: 'Account already exists' });
  res.status(201).json({ message: 'User created' });
});

// Login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
});

// Forgot Password
app.post('/api/users/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) return res.json({ message: 'If email exists, reset link sent' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 15 * 60 * 1000;

    const { error: updateError } = await supabase
      .from('users')
      .update({ resetToken: token, resetTokenExpiry: expiry })
      .eq('id', user.id);

    if (updateError) {
      console.log('Update failed:', updateError);
      return res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    try {
      await transporter.sendMail({
        from: `"Code Mitra" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Reset your password',
        html: `<h3>Password Reset</h3><p>Click <a href="${resetLink}">${resetLink}</a></p><p>Valid for 15 minutes</p>`,
      });
    } catch (emailErr) {
      console.log('Email failed:', emailErr);
      return res.status(500).json({ message: 'Failed to send email. Please try again.' });
    }

    res.json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.log('Unexpected error:', err);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// Reset Password
app.post('/api/users/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({ message: 'Password must be 8+ chars, include uppercase, number & symbol' });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('resetToken', token)
    .gt('resetTokenExpiry', Date.now())
    .single();

  if (error || !user) return res.status(400).json({ message: 'Invalid or expired token' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await supabase
    .from('users')
    .update({ password: hashedPassword, resetToken: null, resetTokenExpiry: null })
    .eq('id', user.id);

  res.json({ message: 'Password reset successful' });
});

// Profile
app.get('/api/users/profile', auth, async (req, res) => res.json(req.user));
app.put('/api/users/profile', auth, upload.single('profileImage'), async (req, res) => {
  const updates = req.body;
  if (req.file) updates.profileImage = req.file.path;
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', req.user.id)
    .select();
  if (error) return res.status(500).json({ message: 'Update failed' });
  res.json(data[0]);
});

// ================= COURSES ROUTES =================
app.get('/api/courses', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

app.post('/api/courses', auth, adminOnly, upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;
  const { data, error } = await supabase
    .from('courses')
    .insert([{ title, description, price, image: req.file?.path, instructor: req.user.id }]);
  if (error) return res.status(500).json({ message: 'Error creating course' });
  res.status(201).json(data[0]);
});

app.put('/api/courses/:id', auth, adminOnly, upload.single('image'), async (req, res) => {
  const updates = req.body;
  if (req.file) updates.image = req.file.path;
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', req.params.id)
    .select();
  if (error) return res.status(500).json({ message: 'Update failed' });
  res.json(data[0]);
});

app.delete('/api/courses/:id', auth, adminOnly, async (req, res) => {
  const { error } = await supabase.from('courses').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ message: 'Delete failed' });
  res.json({ message: 'Course deleted' });
});

// ================= PAYMENTS ROUTES =================
app.post('/api/payments', auth, async (req, res) => {
  const { courseId } = req.body;
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();
  if (courseError) return res.status(404).json({ message: 'Course not found' });

  const { data, error } = await supabase
    .from('payments')
    .insert([{ user: req.user.id, course: courseId, amount: course.price, status: 'completed' }]);
  if (error) return res.status(500).json({ message: 'Payment failed' });

  // Update enrolled users
  await supabase
    .from('users')
    .update({ enrolledCourses: [...(req.user.enrolledCourses || []), courseId] })
    .eq('id', req.user.id);
  await supabase
    .from('courses')
    .update({ enrolledUsers: [...(course.enrolledUsers || []), req.user.id] })
    .eq('id', courseId);

  res.json(data[0]);
});

app.get('/api/payments', auth, async (req, res) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*, course(*)')
    .eq('user', req.user.id);
  if (error) return res.status(500).json({ message: 'Error fetching payments' });
  res.json(data);
});

// ================= ANALYTICS ROUTES =================
app.get('/api/analytics', auth, adminOnly, async (req, res) => {
  const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
  const { count: totalCourses } = await supabase.from('courses').select('*', { count: 'exact', head: true });
  const { count: totalPayments } = await supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'completed');
  res.json({ totalUsers, totalCourses, totalPayments });
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});