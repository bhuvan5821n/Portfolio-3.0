import type { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/api/v1/health", async (_request, reply) => {
    return reply.send({
      success: true,
      data: {
        status: "healthy",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
      },
    });
  });
}
