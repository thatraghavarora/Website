-- ==============================================================================
-- SUPABASE DATABASE SCHEMA: hackerraghavarora
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Profiles
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

-- Trigger: Automatically create profile on new user signup in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. Create Purchases Table (Roadmaps & Courses Unlocks)
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('roadmap', 'course', 'bundle')),
  item_slug TEXT NOT NULL,
  item_title TEXT,
  amount TEXT,
  payment_method TEXT DEFAULT 'upi' CHECK (payment_method IN ('upi', 'paypal', 'card', 'free', 'demo')),
  transaction_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'expired', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases."
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' = user_email);

CREATE POLICY "Authenticated users or service role can insert purchases."
  ON public.purchases FOR INSERT
  WITH CHECK (true);


-- 3. Create Inquiries Table (Hire Me 1:1 Sessions & Freelance Quotes)
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

-- Enable RLS on Inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an inquiry
CREATE POLICY "Anyone can insert inquiries."
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Allow users to view their own inquiries by email
CREATE POLICY "Users can view inquiries submitted with their email."
  ON public.inquiries FOR SELECT
  USING (auth.jwt()->>'email' = email);


-- 4. Create Course Progress Table (Lesson Tracking)
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  completed_lectures INTEGER[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, course_slug)
);

-- Enable RLS on Course Progress
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own course progress."
  ON public.course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own course progress."
  ON public.course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own course progress."
  ON public.course_progress FOR UPDATE
  USING (auth.uid() = user_id);
