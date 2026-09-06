import type { FastifyInstance } from "fastify";
import { listCreative, getCreative } from "../../services/creative.js";
import { creativeQuerySchema, creativeParamsSchema } from "../../schemas/creative.js";

export async function creativeRoutes(app: FastifyInstance) {
  app.get("/api/v1/creative", async (request, reply) => {
    const parsed = creativeQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: { code: "INVALID_QUERY", message: "Invalid query parameters", requestId: request.id },
      });
    }
    const works = listCreative(parsed.data.type);
    return reply.send({ success: true, data: works });
  });

  app.get("/api/v1/creative/:slug", async (request, reply) => {
    const parsed = creativeParamsSchema.safeParse(request.params);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: { code: "INVALID_PARAMS", message: "Invalid creative slug", requestId: request.id },
      });
    }
    const work = getCreative(parsed.data.slug);
    if (!work) {
      return reply.status(404).send({
        success: false,
        error: { code: "CREATIVE_NOT_FOUND", message: "Creative work not found", requestId: request.id },
      });
    }
    return reply.send({ success: true, data: work });
  });
}
