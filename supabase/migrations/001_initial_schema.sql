-- ============================================================
-- FounderOS — Supabase PostgreSQL Schema
-- Run in Supabase SQL Editor or via: supabase db push
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- for full-text search on tasks/resources

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE task_status AS ENUM (
  'not_started',
  'in_progress',
  'blocked',
  'completed',
  'archived'
);

CREATE TYPE task_priority AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

CREATE TYPE resource_type AS ENUM (
  'pdf',
  'youtube',
  'article',
  'github',
  'loom',
  'image',
  'ai_export',
  'notes',
  'figma'
);

CREATE TYPE session_module AS ENUM (
  'backend',
  'product'
);

CREATE TYPE ai_source AS ENUM (
  'claude',
  'chatgpt',
  'manual',
  'n8n'
);

-- ============================================================
-- BUSINESSES
-- The top-level entity. Each venture is a business.
-- ============================================================

CREATE TABLE businesses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  color         TEXT NOT NULL DEFAULT '#6c63ff',
  icon          TEXT NOT NULL DEFAULT '⬡',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CATEGORIES
-- Groups tasks within a business module (backend/product).
-- e.g. "Company Formation", "Curriculum Development"
-- ============================================================

CREATE TABLE categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id   UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  module        session_module NOT NULL DEFAULT 'backend',
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(business_id, name, module)
);

-- ============================================================
-- TASKS
-- Core work unit. Belongs to a business + category.
-- ============================================================

CREATE TABLE tasks (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id         UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id         UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  description         TEXT,
  status              task_status NOT NULL DEFAULT 'not_started',
  priority            task_priority NOT NULL DEFAULT 'medium',
  completion_percent  INTEGER NOT NULL DEFAULT 0 CHECK (completion_percent BETWEEN 0 AND 100),
  current_blocker     TEXT,
  next_step           TEXT,
  due_date            DATE,
  is_hidden           BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order          INTEGER NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DEPENDENCIES
-- Tracks which tasks must complete before others can start.
-- Powers the "Intersecting Task" timeline visualization.
-- ============================================================

CREATE TABLE dependencies (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id               UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  depends_on_task_id    UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  label                 TEXT,  -- e.g. "Intersecting Task: Pre-launch Checklist"
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(task_id, depends_on_task_id),
  -- Prevent self-dependency
  CHECK (task_id != depends_on_task_id)
);

-- ============================================================
-- MILESTONES
-- Key dates/events for each business.
-- ============================================================

CREATE TABLE milestones (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id   UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  target_date   DATE,
  is_completed  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SESSION LOGS
-- AI-generated or manually entered "where I left off" entries.
-- The heart of the continuity system.
-- ============================================================

CREATE TABLE session_logs (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id         UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  ai_source           ai_source NOT NULL DEFAULT 'manual',
  raw_input           TEXT,           -- original paste from ChatGPT/Claude
  summary             TEXT NOT NULL,
  completed_items     TEXT[] NOT NULL DEFAULT '{}',
  pending_items       TEXT[] NOT NULL DEFAULT '{}',
  blockers            TEXT[] NOT NULL DEFAULT '{}',
  next_steps          TEXT[] NOT NULL DEFAULT '{}',
  recommended_action  TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- RESOURCES
-- External links, PDFs, videos, AI exports, etc.
-- ============================================================

CREATE TABLE resources (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id     UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  resource_type   resource_type NOT NULL DEFAULT 'article',
  url             TEXT,
  file_path       TEXT,   -- Supabase Storage path for uploads
  tags            TEXT[] NOT NULL DEFAULT '{}',
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- HIDDEN TASKS
-- Tracks which tasks a user has hidden from the timeline.
-- Preserved in DB, excluded from active views.
-- ============================================================

CREATE TABLE hidden_tasks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id     UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hidden_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(task_id, user_id)
);

-- ============================================================
-- USER PREFERENCES
-- Per-user app settings.
-- ============================================================

CREATE TABLE user_preferences (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  default_business_id   UUID REFERENCES businesses(id),
  theme                 TEXT NOT NULL DEFAULT 'dark' CHECK (theme IN ('dark', 'light', 'system')),
  sidebar_collapsed     BOOLEAN NOT NULL DEFAULT FALSE,
  timezone              TEXT NOT NULL DEFAULT 'America/New_York',
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Tasks — most common query patterns
CREATE INDEX idx_tasks_business_id ON tasks(business_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_is_hidden ON tasks(is_hidden);
CREATE INDEX idx_tasks_updated_at ON tasks(updated_at DESC);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Full-text search on task titles
CREATE INDEX idx_tasks_title_trgm ON tasks USING gin(title gin_trgm_ops);

-- Categories
CREATE INDEX idx_categories_business_id ON categories(business_id);
CREATE INDEX idx_categories_module ON categories(module);

-- Session logs — always queried by business + recency
CREATE INDEX idx_session_logs_business_id ON session_logs(business_id);
CREATE INDEX idx_session_logs_created_at ON session_logs(created_at DESC);

-- Resources
CREATE INDEX idx_resources_business_id ON resources(business_id);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_resources_tags ON resources USING gin(tags);
CREATE INDEX idx_resources_title_trgm ON resources USING gin(title gin_trgm_ops);

-- Dependencies
CREATE INDEX idx_dependencies_task_id ON dependencies(task_id);
CREATE INDEX idx_dependencies_depends_on ON dependencies(depends_on_task_id);

-- Milestones
CREATE INDEX idx_milestones_business_id ON milestones(business_id);
CREATE INDEX idx_milestones_target_date ON milestones(target_date);

-- ============================================================
-- TRIGGERS — auto-update updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- VIEWS
-- Computed stats used by the dashboard.
-- ============================================================

-- Business overview with computed task metrics
CREATE OR REPLACE VIEW business_stats AS
SELECT
  b.id,
  b.name,
  b.slug,
  b.color,
  b.icon,
  b.is_active,
  COUNT(t.id) FILTER (WHERE NOT t.is_hidden) AS task_total,
  COUNT(t.id) FILTER (WHERE t.status = 'completed' AND NOT t.is_hidden) AS task_completed,
  COUNT(t.id) FILTER (WHERE t.status = 'blocked' AND NOT t.is_hidden) AS task_blocked,
  COUNT(t.id) FILTER (WHERE t.status = 'in_progress' AND NOT t.is_hidden) AS task_in_progress,
  CASE
    WHEN COUNT(t.id) FILTER (WHERE NOT t.is_hidden) = 0 THEN 0
    ELSE ROUND(
      COUNT(t.id) FILTER (WHERE t.status = 'completed' AND NOT t.is_hidden)::NUMERIC /
      COUNT(t.id) FILTER (WHERE NOT t.is_hidden) * 100
    )
  END AS overall_completion,
  MAX(t.updated_at) AS last_updated
FROM businesses b
LEFT JOIN tasks t ON t.business_id = b.id
GROUP BY b.id, b.name, b.slug, b.color, b.icon, b.is_active;

-- Latest session log per business
CREATE OR REPLACE VIEW latest_sessions AS
SELECT DISTINCT ON (business_id)
  id,
  business_id,
  ai_source,
  summary,
  completed_items,
  pending_items,
  blockers,
  next_steps,
  recommended_action,
  created_at
FROM session_logs
ORDER BY business_id, created_at DESC;

-- Tasks with category names (avoids repeated joins in app)
CREATE OR REPLACE VIEW tasks_with_category AS
SELECT
  t.*,
  c.name AS category_name,
  c.module AS category_module,
  c.sort_order AS category_sort_order
FROM tasks t
JOIN categories c ON c.id = t.category_id;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- All data is scoped to authenticated users.
-- For a single-user app this is intentionally permissive;
-- expand to per-user ownership when adding team support.
-- ============================================================

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE hidden_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read/write all business data
CREATE POLICY "auth_read_businesses" ON businesses
  FOR SELECT TO authenticated USING (TRUE);

CREATE POLICY "auth_write_businesses" ON businesses
  FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "auth_all_categories" ON categories
  FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "auth_all_tasks" ON tasks
  FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "auth_all_dependencies" ON dependencies
  FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "auth_all_milestones" ON milestones
  FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "auth_all_session_logs" ON session_logs
  FOR ALL TO authenticated USING (TRUE);

CREATE POLICY "auth_all_resources" ON resources
  FOR ALL TO authenticated USING (TRUE);

-- Hidden tasks are per-user
CREATE POLICY "own_hidden_tasks" ON hidden_tasks
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Preferences are per-user
CREATE POLICY "own_preferences" ON user_preferences
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================
-- STORAGE BUCKETS
-- Run these separately or in Supabase dashboard
-- ============================================================

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('resources', 'resources', FALSE);

-- CREATE POLICY "auth_upload_resources" ON storage.objects
--   FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'resources');

-- CREATE POLICY "auth_read_resources" ON storage.objects
--   FOR SELECT TO authenticated
--   USING (bucket_id = 'resources');
