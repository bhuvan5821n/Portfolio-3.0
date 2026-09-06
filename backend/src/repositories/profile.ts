import { getDb } from "../database/index.js";
import { profiles } from "../database/schema.js";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export type ProfileRow = InferSelectModel<typeof profiles>;

export const profileRepository = {
  get(): ProfileRow | undefined {
    const db = getDb();
    const rows = db.select().from(profiles).limit(1).all();
    return rows[0];
  },

  upsert(data: Omit<ProfileRow, "id" | "createdAt" | "updatedAt">): ProfileRow {
    const db = getDb();
    const existing = this.get();
    if (existing) {
      db.update(profiles)
        .set({ ...data, updatedAt: new Date().toISOString() })
        .where(eq(profiles.id, existing.id))
        .run();
      return this.get()!;
    }
    db.insert(profiles).values(data).run();
    return this.get()!;
  },
};
