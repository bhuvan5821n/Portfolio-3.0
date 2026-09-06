import { eq } from "drizzle-orm";
import { getDb } from "../database/index.js";
import { achievements } from "../database/schema.js";
import type { InferSelectModel } from "drizzle-orm";

export type AchievementRow = InferSelectModel<typeof achievements>;

export const achievementsRepository = {
  list(): AchievementRow[] {
    const db = getDb();
    return db.select().from(achievements).all();
  },

  getById(id: number): AchievementRow | undefined {
    const db = getDb();
    return db.select().from(achievements).where(eq(achievements.id, id)).limit(1).get();
  },
};
