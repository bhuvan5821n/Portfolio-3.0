import { eq, desc } from "drizzle-orm";
import { getDb } from "../database/index.js";
import { signals } from "../database/schema.js";
import type { InferSelectModel } from "drizzle-orm";

export type SignalRow = InferSelectModel<typeof signals>;

export const signalsRepository = {
  list(opts: { type?: string; limit?: number; offset?: number } = {}): SignalRow[] {
    const db = getDb();
    const conditions = opts.type ? eq(signals.type, opts.type) : undefined;
    return db
      .select()
      .from(signals)
      .where(conditions)
      .orderBy(desc(signals.date))
      .limit(opts.limit ?? 20)
      .offset(opts.offset ?? 0)
      .all();
  },

  getBySlug(slug: string): SignalRow | undefined {
    const db = getDb();
    return db.select().from(signals).where(eq(signals.slug, slug)).limit(1).get();
  },
};
