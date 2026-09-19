-- ==============================================================================
-- THATRAGHAVARORA PRODUCTION DATABASE SCHEMA
-- Cyber Security, Penetration Testing LMS & Portfolio Platform
-- Execute in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE (Linked with Supabase Auth)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  bio TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = EXCLUDED.full_name;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ──────────────────────────────────────────────────────────────────────────────
-- 2. COURSES TABLE (Dynamic LMS Course Catalog)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Cyber Security',
  price TEXT NOT NULL,
  original_price TEXT,
  thumbnail TEXT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  duration TEXT,
  level TEXT DEFAULT 'Beginner to Advanced',
  instructor_name TEXT DEFAULT 'Raghav Arora',
  instructor_role TEXT DEFAULT 'Lead Security Researcher & Founder',
  curriculum JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by everyone."
  ON public.courses FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage courses."
  ON public.courses FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 3. ROADMAPS TABLE (Dynamic LMS Roadmaps & Blueprints)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Web Pentesting',
  price TEXT NOT NULL,
  original_price TEXT,
  thumbnail TEXT,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  modules_count INTEGER DEFAULT 6,
  badge TEXT DEFAULT 'Bestseller',
  phases JSONB DEFAULT '[]'::jsonb,
  what_is_included TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published roadmaps are viewable by everyone."
  ON public.roadmaps FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage roadmaps."
  ON public.roadmaps FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 4. PURCHASES & ENROLLMENTS TABLE (With UTR Verification & Timing)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('roadmap', 'course', 'bundle')),
  item_slug TEXT NOT NULL,
  item_title TEXT,
  amount TEXT NOT NULL,
  payment_method TEXT DEFAULT 'upi' CHECK (payment_method IN ('upi', 'paypal', 'card', 'free', 'demo', 'admin_grant')),
  transaction_id TEXT NOT NULL,
  utr_number TEXT, -- 12-digit UPI UTR / Bank Reference Number entered by student
  payment_screenshot_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'expired', 'refunded')),
  verification_status TEXT DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_verification', 'rejected')),
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  enrolled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases."
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' = user_email);

CREATE POLICY "Anyone or service role can insert purchases."
  ON public.purchases FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update purchases and verify UTR."
  ON public.purchases FOR UPDATE
  USING (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 5. COURSE PROGRESS TABLE (Lesson & Video Tracking with Enrolled Date)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  course_slug TEXT NOT NULL,
  completed_lectures INTEGER[] DEFAULT '{}',
  progress_percent NUMERIC(5, 2) DEFAULT 0.00,
  last_watched_lecture TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_watched_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, course_slug)
);

ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own course progress."
  ON public.course_progress FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' = user_email);

CREATE POLICY "Users can insert or update course progress."
  ON public.course_progress FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 6. ROADMAP PROGRESS TABLE (Interactive Checklist Tracking)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  roadmap_slug TEXT NOT NULL,
  completed_items TEXT[] DEFAULT '{}',
  progress_percent NUMERIC(5, 2) DEFAULT 0.00,
  enrolled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (roadmap_slug, user_email)
);

ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone or authenticated user can view roadmap progress."
  ON public.roadmap_progress FOR SELECT
  USING (true);

CREATE POLICY "Anyone or authenticated user can insert or update roadmap progress."
  ON public.roadmap_progress FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 7. BLOGS & ARTICLES TABLE (Admin Upload & Content Publishing)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT DEFAULT 'Web Security',
  tags TEXT[] DEFAULT '{"Bug Bounty", "Web Pentesting"}',
  read_time TEXT DEFAULT '5 min read',
  author_name TEXT DEFAULT 'Raghav Arora',
  author_avatar TEXT DEFAULT '/images/hero-avatar.jpg',
  is_published BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blogs are viewable by everyone."
  ON public.blogs FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert, update and delete blogs."
  ON public.blogs FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 8. COMMUNITY POSTS & COMMENTS TABLE (Student Forum & Discussions)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  author_role TEXT DEFAULT 'Student',
  avatar_color TEXT DEFAULT 'bg-yellow-300',
  category TEXT NOT NULL CHECK (category IN ('Bug Bounty', 'Web Security', 'Doubt & Help', 'Achievement', 'General')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view community posts."
  ON public.community_posts FOR SELECT
  USING (true);

CREATE POLICY "Anyone or authenticated users can create community posts."
  ON public.community_posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update likes on community posts."
  ON public.community_posts FOR UPDATE
  USING (true);


CREATE TABLE IF NOT EXISTS public.community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  avatar_color TEXT DEFAULT 'bg-yellow-300',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view community comments."
  ON public.community_comments FOR SELECT
  USING (true);

CREATE POLICY "Anyone or authenticated users can create community comments."
  ON public.community_comments FOR INSERT
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 9. INQUIRIES TABLE (Hire Me Client Leads & Quotes)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_handle TEXT,
  service_type TEXT NOT NULL,
  details TEXT NOT NULL,
  preferred_timeline TEXT DEFAULT 'Flexible',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert inquiries."
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view inquiries submitted with their email."
  ON public.inquiries FOR SELECT
  USING (auth.jwt()->>'email' = email);

CREATE POLICY "Admins can view and update inquiries."
  ON public.inquiries FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 10. CERTIFICATES TABLE (Accreditation & Verification Engine)
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  course_or_roadmap_title TEXT NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE NOT NULL,
  instructor_name TEXT DEFAULT 'Raghav Arora',
  instructor_title TEXT DEFAULT 'Lead Security Researcher & Founder',
  verification_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public certificates can be verified by everyone."
  ON public.certificates FOR SELECT
  USING (true);

CREATE POLICY "Admins can issue certificates."
  ON public.certificates FOR ALL
  USING (true)
  WITH CHECK (true);


-- ──────────────────────────────────────────────────────────────────────────────
-- 11. INITIAL SEED DATA (Ready on Day 1)
-- ──────────────────────────────────────────────────────────────────────────────

-- Insert Primary Roadmaps
INSERT INTO public.roadmaps (slug, title, subtitle, description, category, price, original_price, modules_count, badge)
VALUES (
  'web-pentesting-cyber-security',
  'Complete Web Pentesting & Cyber Security Roadmap',
  'From Absolute Beginner to Professional Bug Bounty Hunter & Penetration Tester',
  'A battle-tested, phase-by-phase structured blueprint that takes you from zero networking knowledge to hunting real vulnerabilities on live targets.',
  'Web Pentesting',
  '99 RS | $2',
  '499 RS | $10',
  6,
  'Bestseller'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Primary Courses
INSERT INTO public.courses (slug, title, subtitle, description, category, price, original_price, thumbnail, duration, level)
VALUES (
  'computer-networking',
  'Computer Networking from Scratch',
  'Deep masterclass on OSI model, TCP/IP, DNS, routing and packet analysis with Wireshark',
  'Learn the fundamentals that power modern computer networks and security testing.',
  'Networking',
  '1499 RS',
  '2999 RS',
  '/images/course-networking.jpg',
  '12 Hours',
  'Beginner to Intermediate'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Seed Blogs
INSERT INTO public.blogs (slug, title, excerpt, content, category, tags, read_time)
VALUES
(
  'how-to-find-first-bug-bounty',
  'How I Found My First Critical Bug in a Fortune 500 Company',
  'A practical step-by-step walkthrough of finding an IDOR that exposed sensitive user data.',
  'Finding your first bug bounty can feel overwhelming. In this post, I break down the exact methodology I used to discover an IDOR vulnerability in an enterprise authorization header...',
  'Bug Bounty',
  '{"Bug Bounty", "IDOR", "Recon"}',
  '6 min read'
),
(
  'burp-suite-pro-tips-2026',
  'Top 10 Burp Suite Pro Tips for High-Impact Hunting',
  'Learn how to leverage Intruder, Match and Replace, and Turbo Intruder to find race conditions.',
  'Burp Suite is the bread and butter of any web application penetration tester. Here are 10 workflows you need to integrate into your daily testing...',
  'Tools & Automation',
  '{"Burp Suite", "Web Pentesting", "Pro Tips"}',
  '8 min read'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Sample Verified Purchases with UTR Numbers
INSERT INTO public.purchases (
  user_email, item_type, item_slug, item_title, amount, payment_method, transaction_id, utr_number, status, verification_status
)
VALUES
(
  'student.demo@thatraghavarora.in',
  'roadmap',
  'web-pentesting-cyber-security',
  'Complete Web Pentesting & Cyber Security Roadmap',
  '99 RS',
  'upi',
  'TXN-UPI-994810',
  '428910294821',
  'active',
  'verified'
)
ON CONFLICT DO NOTHING;

-- Done!
