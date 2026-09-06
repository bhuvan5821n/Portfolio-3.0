-- Portfolio 3.0 Backend - PostgreSQL Migration 001
-- Initial schema

CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  introduction TEXT NOT NULL,
  personality_note TEXT,
  role TEXT,
  location TEXT,
  education_summary TEXT,
  education_institution TEXT,
  education_program TEXT,
  education_current_year TEXT,
  education_expected_graduation TEXT,
  current_focus TEXT,
  opportunity_target_role TEXT,
  opportunity_type TEXT,
  opportunity_availability TEXT,
  opportunity_preferred_location TEXT,
  contact_email TEXT,
  contact_github TEXT,
  contact_linkedin TEXT,
  contact_resume TEXT,
  working_method_label TEXT,
  working_method_description TEXT,
  content_version TEXT DEFAULT '2026.09',
  last_content_update TEXT,
  created_at TEXT NOT NULL DEFAULT NOW(),
  updated_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT,
  category TEXT,
  year TEXT,
  duration TEXT,
  role TEXT,
  team TEXT,
  target_user TEXT,
  context TEXT,
  problem TEXT,
  why TEXT,
  engineering TEXT,
  contribution TEXT,
  implemented TEXT,
  testing TEXT,
  planned TEXT,
  decisions TEXT,
  tools TEXT,
  result TEXT,
  feedback TEXT,
  learning TEXT,
  limitations TEXT,
  next_step TEXT,
  featured BOOLEAN DEFAULT FALSE,
  source_note TEXT,
  last_modified TEXT,
  created_at TEXT NOT NULL DEFAULT NOW(),
  updated_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_sources (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  href TEXT NOT NULL,
  label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_media (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  source TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  evidence TEXT
);

CREATE TABLE IF NOT EXISTS project_technologies (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS capabilities (
  id SERIAL PRIMARY KEY,
  cap_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  stage TEXT NOT NULL,
  stage_detail TEXT NOT NULL,
  statement TEXT NOT NULL,
  actions TEXT,
  working_set TEXT,
  evidence_note TEXT,
  created_at TEXT NOT NULL DEFAULT NOW(),
  updated_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS capability_evidence (
  id SERIAL PRIMARY KEY,
  capability_id INTEGER NOT NULL REFERENCES capabilities(id) ON DELETE CASCADE,
  route TEXT NOT NULL,
  label TEXT NOT NULL,
  detail TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_capabilities (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  capability_id INTEGER NOT NULL REFERENCES capabilities(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  detail TEXT NOT NULL,
  source TEXT,
  source_label TEXT,
  date TEXT,
  created_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS creative_works (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  artist TEXT,
  description TEXT,
  href TEXT,
  embed TEXT,
  cover TEXT,
  genre TEXT,
  role TEXT,
  provenance TEXT,
  source TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TEXT NOT NULL DEFAULT NOW(),
  updated_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS creative_sources (
  id SERIAL PRIMARY KEY,
  creative_work_id INTEGER NOT NULL REFERENCES creative_works(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  href TEXT NOT NULL,
  label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS signals (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  date TEXT NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  creative_work_id INTEGER REFERENCES creative_works(id),
  source_id TEXT,
  visibility TEXT DEFAULT 'public',
  created_at TEXT NOT NULL DEFAULT NOW(),
  updated_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  honeypot TEXT,
  ip_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS integration_cache (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  data TEXT NOT NULL,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS automation_runs (
  id SERIAL PRIMARY KEY,
  task_name TEXT NOT NULL,
  run_id TEXT,
  status TEXT NOT NULL,
  duration DOUBLE PRECISION,
  result TEXT,
  error TEXT,
  created_at TEXT NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_project_sources_project_id ON project_sources(project_id);
CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_project_id ON project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_capabilities_cap_id ON capabilities(cap_id);
CREATE INDEX IF NOT EXISTS idx_capability_evidence_capability_id ON capability_evidence(capability_id);
CREATE INDEX IF NOT EXISTS idx_creative_works_slug ON creative_works(slug);
CREATE INDEX IF NOT EXISTS idx_creative_sources_creative_work_id ON creative_sources(creative_work_id);
CREATE INDEX IF NOT EXISTS idx_signals_slug ON signals(slug);
CREATE INDEX IF NOT EXISTS idx_signals_date ON signals(date);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_ip_hash ON contact_submissions(ip_hash);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_integration_cache_key ON integration_cache(key);
CREATE INDEX IF NOT EXISTS idx_automation_runs_task_name ON automation_runs(task_name);
