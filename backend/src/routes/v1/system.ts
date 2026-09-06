import type { FastifyInstance } from "fastify";

export async function systemRoutes(app: FastifyInstance) {
  app.get("/api/v1/system/public", async (_request, reply) => {
    return reply.send({
      success: true,
      data: {
        name: "CHRONO//ROOTS",
        version: "3.0.0",
        apiVersion: "v1",
        contentVersion: "2026.09",
        lastContentUpdate: new Date().toISOString(),
        status: "operational",
      },
    });
  });
}
