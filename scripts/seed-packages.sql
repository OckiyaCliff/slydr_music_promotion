-- Slydr Music Platform - Seed Data: Service Packages
-- Run this in your Supabase SQL Editor to populate initial packages.
-- Admins can edit these later from the admin panel.

-- Clear existing packages (optional, remove this line to append instead)
-- DELETE FROM packages;

-- ============================================
-- PROMOTION PACKAGES
-- ============================================

INSERT INTO packages (name, description, price, category, features, turnaround_days, is_active) VALUES
(
  'Starter Promo',
  'Perfect for new artists looking to build initial traction. Get your music in front of real listeners.',
  49.99,
  'promotion',
  '["Social media promotion (1 platform)", "Basic audience targeting", "Campaign performance report", "Up to 5K estimated reach", "Email support"]',
  7,
  true
),
(
  'Growth Promo',
  'Amplify your reach with multi-platform promotion and advanced targeting for serious growth.',
  149.99,
  'promotion',
  '["Social media promotion (3 platforms)", "Advanced audience targeting", "Real-time analytics dashboard", "Up to 25K estimated reach", "Dedicated campaign manager", "Weekly progress reports", "Priority support"]',
  14,
  true
),
(
  'Pro Promo',
  'The full-scale launch package. Maximum exposure with premium placements and influencer partnerships.',
  349.99,
  'promotion',
  '["Social media promotion (all platforms)", "Premium audience targeting & retargeting", "Influencer partnerships (3-5 creators)", "Up to 100K estimated reach", "Dedicated senior campaign manager", "Daily progress reports", "PR outreach to music blogs", "Custom content creation", "24/7 priority support"]',
  21,
  true
);

-- ============================================
-- PLAYLIST PITCHING PACKAGES
-- ============================================

INSERT INTO packages (name, description, price, category, features, turnaround_days, is_active) VALUES
(
  'Indie Pitch',
  'Get your track submitted to independent playlist curators across Spotify and Apple Music.',
  39.99,
  'playlist_pitching',
  '["Submission to 10+ indie playlists", "Genre-matched targeting", "Placement report", "Spotify & Apple Music focus", "Email support"]',
  10,
  true
),
(
  'Curator Network',
  'Access our premium network of high-traffic curators for maximum playlist exposure.',
  129.99,
  'playlist_pitching',
  '["Submission to 30+ curated playlists", "Genre & mood-matched targeting", "Guaranteed minimum 3 placements", "All major streaming platforms", "Detailed placement analytics", "Curator feedback included", "Priority support"]',
  14,
  true
),
(
  'Editorial Push',
  'Our team pitches directly to editorial and algorithmic playlist teams for top-tier placements.',
  299.99,
  'playlist_pitching',
  '["Submission to 50+ playlists including editorial", "Direct pitching to editorial teams", "Guaranteed minimum 8 placements", "All streaming platforms", "Full analytics suite", "Curator & editor feedback", "Follow-up re-pitching", "Dedicated playlist strategist", "24/7 support"]',
  21,
  true
);

-- ============================================
-- COVER ART & DESIGN PACKAGES
-- ============================================

INSERT INTO packages (name, description, price, category, features, turnaround_days, is_active) VALUES
(
  'Essential Art',
  'Clean, professional cover art for your single or EP. Stand out on streaming platforms.',
  29.99,
  'design',
  '["1 custom cover art design", "2 revision rounds", "High-res files (3000x3000)", "Streaming platform optimized", "Source file included"]',
  5,
  true
),
(
  'Visual Identity',
  'Complete visual branding package including cover art, social media assets, and promotional graphics.',
  99.99,
  'design',
  '["1 custom cover art design", "Social media banner set (4 platforms)", "3 promotional graphics", "4 revision rounds", "High-res & web-optimized files", "Brand color palette", "Typography recommendations", "Source files included"]',
  10,
  true
),
(
  'Full Brand Suite',
  'Everything you need to visually launch a release — from artwork to animated content and press kits.',
  249.99,
  'design',
  '["2 custom cover art variations", "Complete social media kit", "Animated artwork (15s loop)", "Press kit design", "Lyric card templates (5)", "Unlimited revisions", "All source files", "Brand guidelines document", "Dedicated designer", "Rush delivery available"]',
  14,
  true
);

-- ============================================
-- SOCIAL MEDIA MANAGEMENT PACKAGES
-- ============================================

INSERT INTO packages (name, description, price, category, features, turnaround_days, is_active) VALUES
(
  'Social Starter',
  'Kickstart your social media presence with curated content and basic management.',
  79.99,
  'social_media',
  '["Content calendar (2 weeks)", "8 posts designed & scheduled", "1 platform management", "Basic engagement strategy", "Performance summary report"]',
  14,
  true
),
(
  'Content Creator',
  'Consistent, high-quality social media content across multiple platforms to grow your fanbase.',
  199.99,
  'social_media',
  '["Content calendar (4 weeks)", "20 posts designed & scheduled", "3 platform management", "Story & Reel templates", "Hashtag & SEO strategy", "Community engagement", "Bi-weekly analytics reports", "Content strategy consultation"]',
  30,
  true
),
(
  'Full Management',
  'We become your social media team. Full management, content creation, and growth strategy.',
  449.99,
  'social_media',
  '["Content calendar (4 weeks)", "30+ posts designed & scheduled", "All platform management", "Daily story content", "Reel & TikTok creation (8/month)", "Advanced growth strategy", "Fan engagement & DM management", "Weekly analytics & strategy calls", "Influencer collaboration coordination", "24/7 dedicated social manager"]',
  30,
  true
);
