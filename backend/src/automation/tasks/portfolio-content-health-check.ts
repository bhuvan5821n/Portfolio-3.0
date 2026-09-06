import { task, logger } from "@trigger.dev/sdk/v3";

const APPROVED_URLS = [
  "https://www.webtoons.com/en/canvas/error-404-hero-not-found/list?title_no=1168738",
  "https://open.spotify.com/artist/7MerLC0ZGytRkTf9mSBfS4",
  "https://github.com/bhuvan5821n",
  "https://github.com/bhuvan5821n/Friday-and-Jarvis",
  "https://github.com/bhuvan5821n/HackScout-AI",
  "https://github.com/bhuvan5821n/Finance-app",
  "https://github.com/bhuvan5821n/Markwell",
  "https://markwellpackaging.netlify.app/",
];

async function checkUrl(url: string): Promise<{ url: string; status: number | "error"; ok: boolean }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "Portfolio3-HealthCheck/1.0" },
    });

    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "Portfolio3-HealthCheck/1.0" },
      });
    }

    return { url, status: response.status, ok: response.ok };
  } catch {
    return { url, status: "error", ok: false };
  } finally {
    clearTimeout(timeout);
  }
}

export const portfolioContentHealthCheck = task({
  id: "portfolio-content-health-check",
  maxDuration: 180,
  retry: {
    maxAttempts: 2,
    minTimeoutInMs: 10000,
  },
  run: async (payload: Record<string, unknown>) => {
    logger.info("Running content health check", { urlCount: APPROVED_URLS.length });

    const results = await Promise.all(APPROVED_URLS.map(checkUrl));
    const broken = results.filter((r) => !r.ok);

    if (broken.length > 0) {
      logger.warn("Broken links detected", { broken: broken.map((b) => b.url) });
    } else {
      logger.info("All approved URLs healthy");
    }

    return { status: "completed", results, brokenCount: broken.length, totalChecked: results.length };
  },
});
