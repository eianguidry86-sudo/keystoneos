-- ============================================================
-- FounderOS — Productivity Enhancements Migration
-- Adds Automated Calendar Scheduling, Context-Aware Prioritization,
-- and Actionable Smart Reminders.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_availability AS ENUM (
  'available',
  'away',
  'do_not_disturb'
);

CREATE TYPE task_context AS ENUM (
  'developer',
  'admin',
  'mobile_friendly',
  'general'
);

-- ============================================================
-- USER PREFERENCES: Add Availability Status
-- ============================================================

ALTER TABLE user_preferences
  ADD COLUMN availability_status user_availability NOT NULL DEFAULT 'available';

-- ============================================================
-- TASKS: Add Scheduling & Context Fields
-- ============================================================

ALTER TABLE tasks
  ADD COLUMN task_context task_context NOT NULL DEFAULT 'general',
  ADD COLUMN estimated_duration_mins INTEGER,
  ADD COLUMN scheduled_start TIMESTAMPTZ,
  ADD COLUMN scheduled_end TIMESTAMPTZ;

CREATE INDEX idx_tasks_scheduled_start ON tasks(scheduled_start);
CREATE INDEX idx_tasks_task_context ON tasks(task_context);

-- ============================================================
-- TASK REMINDERS
-- Actionable smart reminders with rich payloads (Tangent-Brain notes, URLs, etc.)
-- ============================================================

CREATE TABLE task_reminders (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id       UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  reminder_time TIMESTAMPTZ NOT NULL,
  is_sent       BOOLEAN NOT NULL DEFAULT FALSE,
  payload       JSONB NOT NULL DEFAULT '{}'::jsonb, -- Store URLs, notes, Tangent-Brain thoughts
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_task_reminders_task_id ON task_reminders(task_id);
CREATE INDEX idx_task_reminders_reminder_time ON task_reminders(reminder_time);
CREATE INDEX idx_task_reminders_is_sent ON task_reminders(is_sent);

-- Trigger for updated_at
CREATE TRIGGER trg_task_reminders_updated_at
  BEFORE UPDATE ON task_reminders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE task_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_all_task_reminders" ON task_reminders
  FOR ALL TO authenticated USING (TRUE);
