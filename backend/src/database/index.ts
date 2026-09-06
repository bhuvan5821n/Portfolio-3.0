import { drizzle as drizzleSqlJs } from "drizzle-orm/sql-js";
import initSqlJs, { type Database as SqlJsDatabase } from "sql.js";
import { getEnv } from "../config/env.js";
import { getDatabaseDriver } from "./driver.js";
import * as schema from "./schema.js";
import path from "path";
import fs from "fs";

export type AppDb = ReturnType<typeof drizzleSqlJs>;

let _db: AppDb | null = null;
let _sqlDb: SqlJsDatabase | null = null;
let _driver: "sqlite" | "postgresql" = "sqlite";

const CREATE_TABLES_SQLITE = `
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  featured INTEGER DEFAULT 0,
  source_note TEXT,
  last_modified TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS project_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  type TEXT NOT NULL,
  href TEXT NOT NULL,
  label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  type TEXT NOT NULL,
  source TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  evidence TEXT
);

CREATE TABLE IF NOT EXISTS project_technologies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  technology TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS capabilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cap_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  stage TEXT NOT NULL,
  stage_detail TEXT NOT NULL,
  statement TEXT NOT NULL,
  actions TEXT,
  working_set TEXT,
  evidence_note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS capability_evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  capability_id INTEGER NOT NULL REFERENCES capabilities(id),
  route TEXT NOT NULL,
  label TEXT NOT NULL,
  detail TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_capabilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  capability_id INTEGER NOT NULL REFERENCES capabilities(id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  detail TEXT NOT NULL,
  source TEXT,
  source_label TEXT,
  date TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS creative_works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  verified INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS creative_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creative_work_id INTEGER NOT NULL REFERENCES creative_works(id),
  type TEXT NOT NULL,
  href TEXT NOT NULL,
  label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS signals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  date TEXT NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  creative_work_id INTEGER REFERENCES creative_works(id),
  source_id TEXT,
  visibility TEXT DEFAULT 'public',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  honeypot TEXT,
  ip_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS integration_cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  data TEXT NOT NULL,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS automation_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_name TEXT NOT NULL,
  run_id TEXT,
  status TEXT NOT NULL,
  duration REAL,
  result TEXT,
  error TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

export function getDb(): AppDb {
  if (!_db) throw new Error("Database not initialized. Call initDb() first.");
  return _db;
}

export function getDbDriver(): "sqlite" | "postgresql" {
  return _driver;
}

export async function initDb(): Promise<AppDb> {
  if (_db) return _db;

  _driver = getDatabaseDriver();

  if (_driver === "postgresql") {
    return initPostgres();
  }

  return initSqlite();
}

async function initSqlite(): Promise<AppDb> {
  const SQL = await initSqlJs();

  const dbPath = path.resolve(process.cwd(), "data", "portfolio.db");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    _sqlDb = new SQL.Database(buffer);
  } else {
    _sqlDb = new SQL.Database();
  }

  _sqlDb.exec(CREATE_TABLES_SQLITE);
  _db = drizzleSqlJs(_sqlDb, { schema });
  return _db;
}

async function initPostgres(): Promise<AppDb> {
  const { Pool } = await import("pg");
  const { drizzle } = await import("drizzle-orm/node-postgres");

  const env = getEnv();
  const pool = new Pool({ connectionString: env.DATABASE_URL });

  _db = drizzle(pool, { schema }) as unknown as AppDb;
  return _db;
}

export function saveDb(): void {
  if (_driver === "sqlite" && _sqlDb) {
    try {
      const data = _sqlDb.export();
      const dbPath = path.resolve(process.cwd(), "data", "portfolio.db");
      const dir = path.dirname(dbPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dbPath, Buffer.from(data));
    } catch {
      // Vercel serverless has a read-only filesystem — silently skip persistence.
      // Contact submissions and other writes are held in memory only.
    }
  }
}

export function persistNow(): void {
  saveDb();
}

export function isUsingSqlite(): boolean {
  return _driver === "sqlite";
}
