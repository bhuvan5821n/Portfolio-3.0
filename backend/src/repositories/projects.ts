import { getDb } from "../database/index.js";
import { projects, projectSources, projectMedia, projectTechnologies } from "../database/schema.js";
import { eq, and } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export type ProjectRow = InferSelectModel<typeof projects>;
export type SourceRow = InferSelectModel<typeof projectSources>;
export type MediaRow = InferSelectModel<typeof projectMedia>;
export type TechRow = InferSelectModel<typeof projectTechnologies>;

export type ProjectWithRelations = ProjectRow & {
  sources: SourceRow[];
  media: MediaRow[];
  technologies: TechRow[];
};

export const projectsRepository = {
  list(opts: { featured?: boolean; category?: string; limit?: number; offset?: number } = {}): ProjectWithRelations[] {
    const db = getDb();
    const conditions = [];
    if (opts.featured !== undefined) conditions.push(eq(projects.featured, opts.featured));
    if (opts.category) conditions.push(eq(projects.category, opts.category));

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = db.select().from(projects).where(where).limit(opts.limit ?? 50).offset(opts.offset ?? 0).all();

    return rows.map((row) => ({
      ...row,
      sources: db.select().from(projectSources).where(eq(projectSources.projectId, row.id)).all(),
      media: db.select().from(projectMedia).where(eq(projectMedia.projectId, row.id)).all(),
      technologies: db.select().from(projectTechnologies).where(eq(projectTechnologies.projectId, row.id)).all(),
    }));
  },

  getBySlug(slug: string): ProjectWithRelations | undefined {
    const db = getDb();
    const row = db.select().from(projects).where(eq(projects.slug, slug)).limit(1).get();
    if (!row) return undefined;

    return {
      ...row,
      sources: db.select().from(projectSources).where(eq(projectSources.projectId, row.id)).all(),
      media: db.select().from(projectMedia).where(eq(projectMedia.projectId, row.id)).all(),
      technologies: db.select().from(projectTechnologies).where(eq(projectTechnologies.projectId, row.id)).all(),
    };
  },

  count(opts: { featured?: boolean; category?: string } = {}): number {
    const db = getDb();
    const conditions = [];
    if (opts.featured !== undefined) conditions.push(eq(projects.featured, opts.featured));
    if (opts.category) conditions.push(eq(projects.category, opts.category));
    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const result = db.select({ count: projects.id }).from(projects).where(where).all();
    return result.length;
  },
};
