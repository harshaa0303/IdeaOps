-- ========================================
-- STEP 1: Create all 5 tables
-- ========================================

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  avatar TEXT,
  role TEXT,
  bio TEXT,
  skills JSONB DEFAULT '[]',
  ideasSubmitted INT DEFAULT 0,
  projectsJoined INT DEFAULT 0,
  mvpBuilt INT DEFAULT 0,
  reputation INT DEFAULT 0,
  location TEXT,
  availability TEXT DEFAULT 'available',
  completedProjects INT DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0.0
);

-- 2. IDEAS
CREATE TABLE IF NOT EXISTS ideas (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  shortDescription TEXT,
  problemStatement TEXT,
  solution TEXT,
  targetAudience TEXT,
  marketOpportunity TEXT,
  requiredSkills JSONB DEFAULT '[]',
  difficulty TEXT,
  mvpTimeline TEXT,
  teamNeeded INT DEFAULT 0,
  votes INT DEFAULT 0,
  status TEXT DEFAULT 'open',
  ownerId BIGINT REFERENCES users(id),
  applicants INT DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- 3. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  type TEXT,
  title TEXT,
  message TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- 4. COMMENTS
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  ideaId BIGINT REFERENCES ideas(id),
  userId BIGINT,
  userName TEXT,
  userAvatar TEXT,
  content TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  likes INT DEFAULT 0
);

-- 5. SUCCESS_STORIES
CREATE TABLE IF NOT EXISTS success_stories (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  founders JSONB DEFAULT '[]',
  launchedDate TIMESTAMPTZ,
  image TEXT
);

-- ========================================
-- STEP 2: Disable RLS so the app can write
-- ========================================

ALTER TABLE ideas DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories DISABLE ROW LEVEL SECURITY;

-- ========================================
-- STEP 3: Auto-create user profile on signup
-- ========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, avatar, role, reputation)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NULL,
    'idea-creator',
    0
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
