-- Slydr Music Platform - RLS Policy Fix
-- Fixes the 500 Internal Server Error caused by recursive RLS policies.
-- The "Admins can view all user profiles" policy on the users table
-- references itself, creating infinite recursion.
--
-- Solution: Use a SECURITY DEFINER function to check roles without
-- triggering RLS on the users table.

-- ============================================
-- 1. CREATE ROLE-CHECK HELPER (bypasses RLS)
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
  SELECT role FROM public.users WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================
-- 2. DROP OLD RECURSIVE POLICIES
-- ============================================

-- Users table
DROP POLICY IF EXISTS "Admins can view all user profiles" ON users;
DROP POLICY IF EXISTS "Admins can update any user" ON users;

-- Packages table
DROP POLICY IF EXISTS "Admins can manage packages" ON packages;

-- Campaigns table
DROP POLICY IF EXISTS "Admins can view all campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admins can update any campaign" ON campaigns;

-- Campaign tasks table
DROP POLICY IF EXISTS "Admins can view all tasks" ON campaign_tasks;
DROP POLICY IF EXISTS "Admins can manage tasks" ON campaign_tasks;

-- Campaign updates table
DROP POLICY IF EXISTS "Admins can view all updates" ON campaign_updates;
DROP POLICY IF EXISTS "Admins can create updates" ON campaign_updates;

-- Files table
DROP POLICY IF EXISTS "Admins can view all files" ON files;
DROP POLICY IF EXISTS "Admins can upload files" ON files;

-- Messages table (the admin part of the combined policy)
DROP POLICY IF EXISTS "Campaign participants can view messages" ON messages;
DROP POLICY IF EXISTS "Campaign participants can send messages" ON messages;

-- ============================================
-- 3. RECREATE POLICIES USING HELPER FUNCTION
-- ============================================

-- Users table
CREATE POLICY "Admins can view all user profiles" ON users
  FOR SELECT USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

CREATE POLICY "Admins can update any user" ON users
  FOR UPDATE USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- Packages table
CREATE POLICY "Admins can manage packages" ON packages
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- Campaigns table
CREATE POLICY "Admins can view all campaigns" ON campaigns
  FOR SELECT USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

CREATE POLICY "Admins can update any campaign" ON campaigns
  FOR UPDATE USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- Campaign tasks table
CREATE POLICY "Admins can view all tasks" ON campaign_tasks
  FOR SELECT USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

CREATE POLICY "Admins can manage tasks" ON campaign_tasks
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- Campaign updates table
CREATE POLICY "Admins can view all updates" ON campaign_updates
  FOR SELECT USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

CREATE POLICY "Admins can create updates" ON campaign_updates
  FOR INSERT WITH CHECK (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- Files table
CREATE POLICY "Admins can view all files" ON files
  FOR SELECT USING (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

CREATE POLICY "Admins can upload files" ON files
  FOR INSERT WITH CHECK (
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- Messages table
CREATE POLICY "Campaign participants can view messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE id = campaign_id AND artist_id = auth.uid()
    ) OR
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

CREATE POLICY "Campaign participants can send messages" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE id = campaign_id AND artist_id = auth.uid()
    ) OR
    public.get_user_role(auth.uid()) IN ('admin', 'superadmin')
  );

-- ============================================
-- 4. ADD INSERT POLICY FOR USERS TABLE
-- (needed so the trigger can insert new users)
-- ============================================

DROP POLICY IF EXISTS "Allow trigger to insert users" ON users;
CREATE POLICY "Allow trigger to insert users" ON users
  FOR INSERT WITH CHECK (true);
