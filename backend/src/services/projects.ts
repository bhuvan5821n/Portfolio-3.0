import { projectsRepository, type ProjectWithRelations } from "../repositories/projects.js";

export type ProjectListItem = {
  slug: string;
  name: string;
  description: string;
  status: string | null;
  category: string | null;
  featured: boolean | null;
  tools: string[];
  year: string | null;
};

export type ProjectDetail = {
  slug: string;
  name: string;
  description: string;
  status: string | null;
  category: string | null;
  featured: boolean | null;
  year: string | null;
  duration: string | null;
  role: string | null;
  team: string | null;
  targetUser: string | null;
  context: string | null;
  problem: string | null;
  why: string | null;
  engineering: string | null;
  contribution: string[];
  implemented: string[];
  testing: string[];
  planned: string[];
  decisions: string[];
  tools: string[];
  result: string | null;
  feedback: string | null;
  learning: string[];
  limitations: string[];
  nextStep: string | null;
  sourceNote: string | null;
  lastModified: string | null;
  sources: { type: string; href: string; label: string }[];
  media: { type: string; source: string; alt: string; caption: string | null; evidence: string | null }[];
  technologies: string[];
};

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toListItem(row: ProjectWithRelations): ProjectListItem {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    status: row.status,
    category: row.category,
    featured: row.featured,
    tools: parseJsonArray(row.tools),
    year: row.year,
  };
}

function toDetail(row: ProjectWithRelations): ProjectDetail {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    status: row.status,
    category: row.category,
    featured: row.featured,
    year: row.year,
    duration: row.duration,
    role: row.role,
    team: row.team,
    targetUser: row.targetUser,
    context: row.context,
    problem: row.problem,
    why: row.why,
    engineering: row.engineering,
    contribution: parseJsonArray(row.contribution),
    implemented: parseJsonArray(row.implemented),
    testing: parseJsonArray(row.testing),
    planned: parseJsonArray(row.planned),
    decisions: parseJsonArray(row.decisions),
    tools: parseJsonArray(row.tools),
    result: row.result,
    feedback: row.feedback,
    learning: parseJsonArray(row.learning),
    limitations: parseJsonArray(row.limitations),
    nextStep: row.nextStep,
    sourceNote: row.sourceNote,
    lastModified: row.lastModified,
    sources: row.sources.map((s) => ({ type: s.type, href: s.href, label: s.label })),
    media: row.media.map((m) => ({ type: m.type, source: m.source, alt: m.alt, caption: m.caption, evidence: m.evidence })),
    technologies: row.technologies.map((t) => t.technology),
  };
}

export function listProjects(opts: { featured?: boolean; category?: string; limit?: number; offset?: number } = {}): ProjectListItem[] {
  return projectsRepository.list(opts).map(toListItem);
}

export function getProject(slug: string): ProjectDetail | null {
  const row = projectsRepository.getBySlug(slug);
  return row ? toDetail(row) : null;
}

export function getProjectCount(opts: { featured?: boolean; category?: string } = {}): number {
  return projectsRepository.count(opts);
}
