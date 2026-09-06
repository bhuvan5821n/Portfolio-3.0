import { task, logger } from "@trigger.dev/sdk/v3";

export const refreshPublicCache = task({
  id: "refresh-public-cache",
  maxDuration: 120,
  retry: {
    maxAttempts: 2,
    minTimeoutInMs: 5000,
  },
  run: async (payload: Record<string, unknown>) => {
    logger.info("Refreshing external integration cache", { payload });

    const { getCacheProvider } = await import("../../providers/cache.js");
    const cache = getCacheProvider();

    const keysToRefresh = ["github:repos", "spotify:artist", "creative:metadata"];
    const refreshed: string[] = [];

    for (const key of keysToRefresh) {
      try {
        const existing = await cache.get(key);
        if (existing) {
          refreshed.push(key);
        }
      } catch (err) {
        logger.error(`Cache refresh failed for ${key}`, { error: String(err) });
      }
    }

    logger.info("Cache refresh completed", { refreshed });
    return { status: "completed", refreshed };
  },
});
