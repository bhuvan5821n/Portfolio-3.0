import { task, logger } from "@trigger.dev/sdk/v3";

export const refreshCreativeMetadata = task({
  id: "refresh-creative-metadata",
  maxDuration: 90,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
  },
  run: async (payload: Record<string, unknown>) => {
    logger.info("Starting creative metadata refresh", { payload });

    const { getSpotifyProvider } = await import("../../providers/spotify.js");
    const { getWebtoonProvider } = await import("../../providers/webtoon.js");

    const spotify = getSpotifyProvider();
    const webtoon = getWebtoonProvider();
    const results: Record<string, { configured: boolean; success: boolean }> = {};

    if (spotify.isConfigured()) {
      try {
        const artist = await spotify.getArtist("7MerLC0ZGytRkTf9mSBfS4");
        results.spotify = { configured: true, success: !!artist };
      } catch (err) {
        logger.error("Spotify refresh failed", { error: String(err) });
        results.spotify = { configured: true, success: false };
      }
    } else {
      results.spotify = { configured: false, success: false };
    }

    if (webtoon.isConfigured()) {
      try {
        const series = await webtoon.getSeries("1168738");
        results.webtoon = { configured: true, success: !!series };
      } catch (err) {
        logger.error("WEBTOON refresh failed", { error: String(err) });
        results.webtoon = { configured: true, success: false };
      }
    } else {
      results.webtoon = { configured: false, success: false };
    }

    logger.info("Creative metadata refresh completed", { results });
    return { status: "completed", results };
  },
});
