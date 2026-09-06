import type { FastifyInstance } from "fastify";
import { listCapabilities } from "../../services/capabilities.js";

export async function capabilityRoutes(app: FastifyInstance) {
  app.get("/api/v1/capabilities", async (_request, reply) => {
    const capabilities = listCapabilities();
    return reply.send({ success: true, data: capabilities });
  });
}
