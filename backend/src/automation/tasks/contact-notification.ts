import { task, logger } from "@trigger.dev/sdk/v3";

export const contactNotification = task({
  id: "contact-notification",
  maxDuration: 30,
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 2000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: { name: string; email: string; subject: string }) => {
    logger.info("Processing contact notification", {
      submissionId: `contact_${Date.now()}`,
      subjectLength: payload.subject.length,
      provider: "console",
    });

    return { status: "completed", notified: false };
  },
});
