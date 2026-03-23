-- Slydr Music Platform - Database Schema
-- This script initializes all tables and RLS policies

-- ============================================
-- 1. USER ROLES ENUM & POLICIES
-- ============================================

CREATE TYPE user_role AS ENUM ('artist', 'admin', 'superadmin');

-- ============================================
-- 2. USERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role user_role DEFAULT 'artist',
  bio TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all user profiles" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any user" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 3. PACKAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL, -- 'promotion', 'design', 'playlist_pitching', 'social_media', etc.
  features JSONB DEFAULT '[]',
  turnaround_days INTEGER DEFAULT 14,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on packages table
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Policies for packages table
CREATE POLICY "Everyone can view active packages" ON packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON packages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 4. CAMPAIGNS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES packages(id),
  release_name TEXT NOT NULL,
  release_date DATE,
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'on_hold'
  progress_percentage INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on campaigns table
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Policies for campaigns table
CREATE POLICY "Artists can view their own campaigns" ON campaigns
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY "Admins can view all campaigns" ON campaigns
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Artists can create campaigns" ON campaigns
  FOR INSERT WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can update their own campaigns" ON campaigns
  FOR UPDATE USING (auth.uid() = artist_id);

CREATE POLICY "Admins can update any campaign" ON campaigns
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 5. CAMPAIGN TASKS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on campaign_tasks table
ALTER TABLE campaign_tasks ENABLE ROW LEVEL SECURITY;

-- Policies for campaign_tasks table
CREATE POLICY "Artists can view tasks for their campaigns" ON campaign_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns WHERE id = campaign_id AND artist_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all tasks" ON campaign_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Admins can manage tasks" ON campaign_tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 6. CAMPAIGN UPDATES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS campaign_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on campaign_updates table
ALTER TABLE campaign_updates ENABLE ROW LEVEL SECURITY;

-- Policies for campaign_updates table
CREATE POLICY "Artists can view updates for their campaigns" ON campaign_updates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns WHERE id = campaign_id AND artist_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all updates" ON campaign_updates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Admins can create updates" ON campaign_updates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 7. FILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  file_url TEXT NOT NULL,
  category TEXT, -- 'track', 'artwork', 'promotional', 'deliverable'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on files table
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Policies for files table
CREATE POLICY "Artists can view their own files" ON files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Artists can view files from their campaigns" ON files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns WHERE id = campaign_id AND artist_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all files" ON files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Users can upload files" ON files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can upload files" ON files
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 8. MESSAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for messages table
CREATE POLICY "Campaign participants can view messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE id = campaign_id AND artist_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Campaign participants can send messages" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE id = campaign_id AND artist_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- ============================================
-- 9. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_campaigns_artist_id ON campaigns(artist_id);
CREATE INDEX idx_campaigns_package_id ON campaigns(package_id);
CREATE INDEX idx_campaign_tasks_campaign_id ON campaign_tasks(campaign_id);
CREATE INDEX idx_campaign_tasks_assigned_to ON campaign_tasks(assigned_to);
CREATE INDEX idx_campaign_updates_campaign_id ON campaign_updates(campaign_id);
CREATE INDEX idx_files_campaign_id ON files(campaign_id);
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_messages_campaign_id ON messages(campaign_id);

-- ============================================
-- 10. TRIGGER FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_tasks_updated_at BEFORE UPDATE ON campaign_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
