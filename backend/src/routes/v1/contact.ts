import type { FastifyInstance } from "fastify";
import { contactSchema } from "../../schemas/contact.js";
import { submitContact } from "../../services/contact.js";

export async function contactRoutes(app: FastifyInstance) {
  app.post("/api/v1/contact", async (request, reply) => {
    const parsed = contactSchema.safeParse(request.body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const message = Object.entries(errors)
        .map(([k, v]) => `${k}: ${v?.join(", ")}`)
        .join("; ");
      return reply.status(400).send({
        success: false,
        error: { code: "VALIDATION_ERROR", message: message || "Invalid input", requestId: request.id },
      });
    }

    const { honeypot, ...input } = parsed.data;
    const clientIp = request.ip || "unknown";
    const result = submitContact({ ...input, honeypot }, clientIp);

    if (!result.success) {
      return reply.status(429).send({
        success: false,
        error: { code: "RATE_LIMITED", message: result.error, requestId: request.id },
      });
    }

    return reply.status(201).send({
      success: true,
      data: { id: result.id, message: "Contact submission received." },
    });
  });
}
