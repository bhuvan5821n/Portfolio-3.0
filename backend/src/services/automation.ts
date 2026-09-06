import { getAutomationProvider, type AutomationProvider } from "../providers/automation.js";

export class AutomationService {
  private provider: AutomationProvider | null = null;

  private async getProvider(): Promise<AutomationProvider> {
    if (!this.provider) {
      this.provider = await getAutomationProvider();
    }
    return this.provider;
  }

  async isEnabled(): Promise<boolean> {
    const p = await this.getProvider();
    return p.isConfigured();
  }

  async triggerTask(taskName: string, payload: Record<string, unknown>): Promise<string | null> {
    const p = await this.getProvider();
    if (!p.isConfigured()) return null;
    const result = await p.trigger(taskName, payload);
    return result?.runId ?? null;
  }

  async syncGithubProjects(): Promise<string | null> {
    return this.triggerTask("sync-github-projects", {});
  }

  async refreshCreativeMetadata(): Promise<string | null> {
    return this.triggerTask("refresh-creative-metadata", {});
  }

  async rebuildSignalFeed(): Promise<string | null> {
    return this.triggerTask("rebuild-signal-feed", {});
  }

  async runHealthCheck(): Promise<string | null> {
    return this.triggerTask("portfolio-content-health-check", {});
  }

  async sendContactNotification(payload: { name: string; email: string; subject: string }): Promise<string | null> {
    return this.triggerTask("contact-notification", payload);
  }

  async refreshCache(): Promise<string | null> {
    return this.triggerTask("refresh-public-cache", {});
  }

  async runMaintenance(): Promise<string | null> {
    return this.triggerTask("cleanup-maintenance", {});
  }
}
