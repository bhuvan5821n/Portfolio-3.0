import { getDb } from "../database/index.js";
import { capabilities, capabilityEvidence } from "../database/schema.js";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

export type CapabilityRow = InferSelectModel<typeof capabilities>;
export type EvidenceRow = InferSelectModel<typeof capabilityEvidence>;

export type CapabilityWithEvidence = CapabilityRow & {
  evidence: EvidenceRow[];
};

export const capabilitiesRepository = {
  list(): CapabilityWithEvidence[] {
    const db = getDb();
    const rows = db.select().from(capabilities).all();
    return rows.map((row) => ({
      ...row,
      evidence: db.select().from(capabilityEvidence).where(eq(capabilityEvidence.capabilityId, row.id)).all(),
    }));
  },

  getByCapId(capId: string): CapabilityWithEvidence | undefined {
    const db = getDb();
    const row = db.select().from(capabilities).where(eq(capabilities.capId, capId)).limit(1).get();
    if (!row) return undefined;
    return {
      ...row,
      evidence: db.select().from(capabilityEvidence).where(eq(capabilityEvidence.capabilityId, row.id)).all(),
    };
  },
};
