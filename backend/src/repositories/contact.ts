import { eq } from "drizzle-orm";
import { getDb, persistNow } from "../database/index.js";
import { contactSubmissions } from "../database/schema.js";
import type { InferSelectModel } from "drizzle-orm";

export type ContactRow = InferSelectModel<typeof contactSubmissions>;

export const contactRepository = {
  create(data: { name: string; email: string; subject: string; message: string; honeypot?: string; ipHash?: string }): ContactRow {
    const db = getDb();
    const result = db
      .insert(contactSubmissions)
      .values({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        honeypot: data.honeypot ?? "",
        ipHash: data.ipHash ?? null,
        status: "pending",
      })
      .returning()
      .get();

    persistNow();
    return result;
  },

  countRecent(ipHash: string, windowMs: number = 60000): number {
    const db = getDb();
    const cutoff = new Date(Date.now() - windowMs).toISOString();
    const rows = db.select().from(contactSubmissions).all();
    return rows.filter((r) => r.ipHash === ipHash && r.createdAt && r.createdAt > cutoff).length;
  },
};
