-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  "profileImage" TEXT,
  role TEXT DEFAULT 'user',
  enrolledCourses UUID[] DEFAULT '{}',
  otp TEXT,
  otpExpiry BIGINT,
  resetToken TEXT,
  resetTokenExpiry BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  instructor UUID REFERENCES users(id),
  enrolledUsers UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user UUID REFERENCES users(id) NOT NULL,
  course UUID REFERENCES courses(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- Create policies for courses table
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create policies for payments table
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = user);

CREATE POLICY "Users can create their own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user);

CREATE POLICY "Admins can view all payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create policies for gallery_items table
CREATE POLICY "Anyone can view gallery items" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage gallery items" ON gallery_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
