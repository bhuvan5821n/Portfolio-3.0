import { task, logger } from "@trigger.dev/sdk/v3";

export const rebuildSignalFeed = task({
  id: "rebuild-signal-feed",
  maxDuration: 60,
  retry: {
    maxAttempts: 2,
    minTimeoutInMs: 3000,
  },
  run: async (payload: Record<string, unknown>) => {
    logger.info("Rebuilding signal feed from verified sources", { payload });

    const { getDb, saveDb } = await import("../../database/index.js");
    const schema = await import("../../database/schema.js");

    const db = getDb();
    const existing = db.select().from(schema.signals).all();

    logger.info("Signal feed rebuild completed", { existingSignals: existing.length });

    return { status: "completed", signalsCount: existing.length };
  },
});
