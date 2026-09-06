import { eq } from "drizzle-orm";
import { getDb } from "../database/index.js";
import { creativeWorks, creativeSources } from "../database/schema.js";
import type { InferSelectModel } from "drizzle-orm";

export type CreativeRow = InferSelectModel<typeof creativeWorks>;
export type CreativeSourceRow = InferSelectModel<typeof creativeSources>;

export type CreativeWithSources = CreativeRow & {
  sources: CreativeSourceRow[];
};

export const creativeRepository = {
  list(type?: string): CreativeWithSources[] {
    const db = getDb();
    const conditions = type ? eq(creativeWorks.type, type) : undefined;
    const rows = db.select().from(creativeWorks).where(conditions).all();
    return rows.map((row) => ({
      ...row,
      sources: db.select().from(creativeSources).where(eq(creativeSources.creativeWorkId, row.id)).all(),
    }));
  },

  getBySlug(slug: string): CreativeWithSources | undefined {
    const db = getDb();
    const row = db.select().from(creativeWorks).where(eq(creativeWorks.slug, slug)).limit(1).get();
    if (!row) return undefined;
    return {
      ...row,
      sources: db.select().from(creativeSources).where(eq(creativeSources.creativeWorkId, row.id)).all(),
    };
  },
};
