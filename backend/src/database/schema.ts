import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  headline: text("headline").notNull(),
  introduction: text("introduction").notNull(),
  personalityNote: text("personality_note"),
  role: text("role"),
  location: text("location"),
  educationSummary: text("education_summary"),
  educationInstitution: text("education_institution"),
  educationProgram: text("education_program"),
  educationCurrentYear: text("education_current_year"),
  educationExpectedGraduation: text("education_expected_graduation"),
  currentFocus: text("current_focus"),
  opportunityTargetRole: text("opportunity_target_role"),
  opportunityType: text("opportunity_type"),
  opportunityAvailability: text("opportunity_availability"),
  opportunityPreferredLocation: text("opportunity_preferred_location"),
  contactEmail: text("contact_email"),
  contactGithub: text("contact_github"),
  contactLinkedin: text("contact_linkedin"),
  contactResume: text("contact_resume"),
  workingMethodLabel: text("working_method_label"),
  workingMethodDescription: text("working_method_description"),
  contentVersion: text("content_version").default("2026.09"),
  lastContentUpdate: text("last_content_update"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status"),
  category: text("category"),
  year: text("year"),
  duration: text("duration"),
  role: text("role"),
  team: text("team"),
  targetUser: text("target_user"),
  context: text("context"),
  problem: text("problem"),
  why: text("why"),
  engineering: text("engineering"),
  contribution: text("contribution"),
  implemented: text("implemented"),
  testing: text("testing"),
  planned: text("planned"),
  decisions: text("decisions"),
  tools: text("tools"),
  result: text("result"),
  feedback: text("feedback"),
  learning: text("learning"),
  limitations: text("limitations"),
  nextStep: text("next_step"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  sourceNote: text("source_note"),
  lastModified: text("last_modified"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

export const projectSources = sqliteTable("project_sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  type: text("type").notNull(),
  href: text("href").notNull(),
  label: text("label").notNull(),
});

export const projectMedia = sqliteTable("project_media", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  type: text("type").notNull(),
  source: text("source").notNull(),
  alt: text("alt").notNull(),
  caption: text("caption"),
  evidence: text("evidence"),
});

export const projectTechnologies = sqliteTable("project_technologies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  technology: text("technology").notNull(),
});

export const capabilities = sqliteTable("capabilities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  capId: text("cap_id").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  stage: text("stage").notNull(),
  stageDetail: text("stage_detail").notNull(),
  statement: text("statement").notNull(),
  actions: text("actions"),
  workingSet: text("working_set"),
  evidenceNote: text("evidence_note"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

export const capabilityEvidence = sqliteTable("capability_evidence", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  capabilityId: integer("capability_id").notNull().references(() => capabilities.id),
  route: text("route").notNull(),
  label: text("label").notNull(),
  detail: text("detail").notNull(),
});

export const projectCapabilities = sqliteTable("project_capabilities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  capabilityId: integer("capability_id").notNull().references(() => capabilities.id),
});

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  detail: text("detail").notNull(),
  source: text("source"),
  sourceLabel: text("source_label"),
  date: text("date"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

export const creativeWorks = sqliteTable("creative_works", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  artist: text("artist"),
  description: text("description"),
  href: text("href"),
  embed: text("embed"),
  cover: text("cover"),
  genre: text("genre"),
  role: text("role"),
  provenance: text("provenance"),
  source: text("source"),
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

export const creativeSources = sqliteTable("creative_sources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  creativeWorkId: integer("creative_work_id").notNull().references(() => creativeWorks.id),
  type: text("type").notNull(),
  href: text("href").notNull(),
  label: text("label").notNull(),
});

export const signals = sqliteTable("signals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  date: text("date").notNull(),
  projectId: integer("project_id").references(() => projects.id),
  creativeWorkId: integer("creative_work_id").references(() => creativeWorks.id),
  sourceId: text("source_id"),
  visibility: text("visibility").default("public"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  honeypot: text("honeypot"),
  ipHash: text("ip_hash"),
  status: text("status").default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

export const integrationCache = sqliteTable("integration_cache", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  data: text("data").notNull(),
  expiresAt: text("expires_at"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

export const automationRuns = sqliteTable("automation_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  taskName: text("task_name").notNull(),
  runId: text("run_id"),
  status: text("status").notNull(),
  duration: real("duration"),
  result: text("result"),
  error: text("error"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});
