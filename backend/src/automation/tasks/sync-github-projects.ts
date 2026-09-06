import { task, logger } from "@trigger.dev/sdk/v3";

export const syncGithubProjects = task({
  id: "sync-github-projects",
  maxDuration: 120,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 30000,
  },
  run: async (payload: Record<string, unknown>) => {
    logger.info("Starting GitHub project sync", { payload });

    const { getGitHubProvider } = await import("../../providers/github.js");
    const github = getGitHubProvider();

    if (!github.isConfigured()) {
      logger.warn("GitHub not configured, skipping sync");
      return { status: "skipped", reason: "not_configured" };
    }

    const repos = ["Friday-and-Jarvis", "HackScout-AI", "Finance-app", "Markwell", "Portfolio"];
    const results: Record<string, boolean> = {};

    for (const repo of repos) {
      try {
        const data = await github.getRepository("bhuvan5821n", repo);
        results[repo] = !!data;
      } catch (err) {
        logger.error(`Failed to fetch repo ${repo}`, { error: String(err) });
        results[repo] = false;
      }
    }

    const successCount = Object.values(results).filter(Boolean).length;
    logger.info("GitHub sync completed", { total: repos.length, success: successCount });

    return { status: "completed", results, successCount, totalRepos: repos.length };
  },
});
