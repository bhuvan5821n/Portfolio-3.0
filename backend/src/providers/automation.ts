export interface AutomationProvider {
  isConfigured(): boolean;
  trigger(taskName: string, payload: Record<string, unknown>): Promise<{ runId: string } | null>;
  getRunStatus(runId: string): Promise<{ status: string; duration?: number } | null>;
}

export class ConsoleAutomationProvider implements AutomationProvider {
  isConfigured(): boolean {
    return false;
  }

  async trigger(_taskName: string, _payload: Record<string, unknown>): Promise<null> {
    return null;
  }

  async getRunStatus(_runId: string): Promise<null> {
    return null;
  }
}

let _provider: AutomationProvider | null = null;

export async function getAutomationProvider(): Promise<AutomationProvider> {
  if (_provider) return _provider;

  const triggerKey = process.env.TRIGGER_SECRET_KEY;
  if (triggerKey) {
    try {
      const { TriggerDevAutomationProvider } = await import("./trigger-dev.js");
      _provider = new TriggerDevAutomationProvider();
    } catch {
      _provider = new ConsoleAutomationProvider();
    }
  } else {
    _provider = new ConsoleAutomationProvider();
  }

  return _provider;
}
