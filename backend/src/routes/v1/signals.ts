import type { FastifyInstance } from "fastify";
import { listSignals } from "../../services/signals.js";
import { signalQuerySchema } from "../../schemas/signals.js";

export async function signalRoutes(app: FastifyInstance) {
  app.get("/api/v1/signals", async (request, reply) => {
    const parsed = signalQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: { code: "INVALID_QUERY", message: "Invalid query parameters", requestId: request.id },
      });
    }
    const signals = listSignals(parsed.data);
    return reply.send({ success: true, data: signals });
  });
}
