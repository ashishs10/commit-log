-- ============================================
-- schema.sql
-- Run: psql -U postgres -d devlog -f schema.sql
-- ============================================

-- CREATE TABLE ENTRIES

CREATE TABLE IF NOT EXISTS entries(
    id SERIAL PRIMARY KEY, 
    auth0_user_id TEXT NOT NULL, 
    github_user_name TEXT, 
    title TEXT NOT NULL, 
    content TEXT, 
    mood TEXT CHECK (mood IN ('great', 'ok', 'stuck')),
    github_activity JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----- Index: fast per-user lookups ----------------
CREATE INDEX IF NOT EXISTS idx_entries_user
ON entries (auth0_user_id, created_at DESC);