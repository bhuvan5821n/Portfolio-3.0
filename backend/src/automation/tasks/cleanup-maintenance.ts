import { task, logger } from "@trigger.dev/sdk/v3";

export const cleanupMaintenance = task({
  id: "cleanup-maintenance",
  maxDuration: 60,
  retry: {
    maxAttempts: 2,
    minTimeoutInMs: 3000,
  },
  run: async (payload: Record<string, unknown>) => {
    logger.info("Running maintenance cleanup", { payload });

    let cleaned = 0;

    try {
      const { getDb, saveDb } = await import("../../database/index.js");
      const schema = await import("../../database/schema.js");

      const db = getDb();
      const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const oldCache = db.select().from(schema.integrationCache).all()
        .filter((c) => c.expiresAt && c.expiresAt < cutoff);

      for (const entry of oldCache) {
        db.delete(schema.integrationCache).where(
          // @ts-ignore
          schema.integrationCache.id === entry.id
        ).run();
        cleaned++;
      }

      saveDb();
    } catch (err) {
      logger.error("Cleanup failed", { error: String(err) });
    }

    logger.info("Maintenance cleanup completed", { cleaned });
    return { status: "completed", cleaned };
  },
});
