import { getEnv } from "../config/env.js";

export interface ContactNotifier {
  isConfigured(): boolean;
  notify(data: { submissionId: string; subjectLength: number; messageLength: number }): Promise<boolean>;
}

function maskEmail(_email: string): string {
  return "***@***.***";
}

export class ConsoleContactNotifier implements ContactNotifier {
  isConfigured(): boolean {
    return getEnv().CONTACT_PROVIDER === "console";
  }

  async notify(data: { submissionId: string; subjectLength: number; messageLength: number }): Promise<boolean> {
    console.log("[contact] Submission received", {
      submissionId: data.submissionId,
      subjectLength: data.subjectLength,
      messageLength: data.messageLength,
      provider: "console",
    });
    return true;
  }
}

let _provider: ContactNotifier | null = null;

export function getContactNotifier(): ContactNotifier {
  if (_provider) return _provider;
  _provider = new ConsoleContactNotifier();
  return _provider;
}

export { maskEmail };
