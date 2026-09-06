import { z } from "zod";
import { contactRepository } from "../repositories/contact.js";
import { getContactNotifier } from "../providers/contact.js";
import crypto from "crypto";

export type ContactResult =
  | { success: true; id: number }
  | { success: false; error: string };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function generateSubmissionId(): string {
  return `c_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

export function submitContact(
  input: { name: string; email: string; subject: string; message: string; honeypot?: string },
  clientIp: string
): ContactResult {
  if (input.honeypot && input.honeypot.length > 0) {
    return { success: true, id: -1 };
  }

  const ipHash = hashIp(clientIp);
  const recentCount = contactRepository.countRecent(ipHash, RATE_LIMIT_WINDOW_MS);
  if (recentCount >= RATE_LIMIT_MAX) {
    return { success: false, error: "Rate limit exceeded. Please try again later." };
  }

  try {
    const row = contactRepository.create({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      honeypot: input.honeypot ?? "",
      ipHash,
    });

    const submissionId = generateSubmissionId();
    const notifier = getContactNotifier();
    notifier.notify({
      submissionId,
      subjectLength: input.subject.length,
      messageLength: input.message.length,
    }).catch(() => {});

    return { success: true, id: row.id };
  } catch (err) {
    return { success: false, error: "Failed to save contact submission." };
  }
}
