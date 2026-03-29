-- Slydr Music Platform - Auth Sync Fix
-- This script ensures that every Supabase Auth signup 
-- automatically creates a corresponding profile in public.users

-- 1. Create the sync function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'artist'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Backfill existing users (Optional safeguard)
-- This will insert any users in auth.users that are missing in public.users
INSERT INTO public.users (id, email, full_name, role)
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'full_name',
  'artist'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;
