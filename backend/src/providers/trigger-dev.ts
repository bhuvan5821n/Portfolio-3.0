import { configure, tasks, runs } from "@trigger.dev/sdk/v3";
import type { AutomationProvider } from "./automation.js";

let _configured = false;

function ensureConfigured(): void {
  if (_configured) return;
  const secretKey = process.env.TRIGGER_SECRET_KEY;
  if (secretKey) {
    configure({ secretKey });
    _configured = true;
  }
}

export class TriggerDevAutomationProvider implements AutomationProvider {
  isConfigured(): boolean {
    return !!process.env.TRIGGER_SECRET_KEY;
  }

  async trigger(taskName: string, payload: Record<string, unknown>): Promise<{ runId: string } | null> {
    if (!this.isConfigured()) return null;

    ensureConfigured();

    try {
      const referencedTasks = await import("../automation/index.js");

      const taskMap: Record<string, { id: string }> = {
        "sync-github-projects": referencedTasks.syncGithubProjects,
        "refresh-creative-metadata": referencedTasks.refreshCreativeMetadata,
        "rebuild-signal-feed": referencedTasks.rebuildSignalFeed,
        "portfolio-content-health-check": referencedTasks.portfolioContentHealthCheck,
        "contact-notification": referencedTasks.contactNotification,
        "refresh-public-cache": referencedTasks.refreshPublicCache,
        "cleanup-maintenance": referencedTasks.cleanupMaintenance,
      };

      const taskRef = taskMap[taskName];
      if (!taskRef) return null;

      const run = await tasks.trigger(taskRef.id, payload);
      return { runId: run.id };
    } catch (err) {
      console.error(`[Trigger.dev] Failed to trigger ${taskName}:`, err);
      return null;
    }
  }

  async getRunStatus(runId: string): Promise<{ status: string; duration?: number } | null> {
    if (!this.isConfigured()) return null;

    ensureConfigured();

    try {
      const run = await runs.retrieve(runId);
      return { status: run.status };
    } catch (err) {
      console.error(`[Trigger.dev] Failed to get run status for ${runId}:`, err);
      return null;
    }
  }
}
