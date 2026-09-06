import type { FastifyInstance } from "fastify";
import { getProfile } from "../../services/profile.js";

export async function profileRoutes(app: FastifyInstance) {
  app.get("/api/v1/profile", async (request, reply) => {
    const profile = getProfile();
    if (!profile) {
      return reply.status(404).send({
        success: false,
        error: { code: "PROFILE_NOT_FOUND", message: "Profile not found", requestId: request.id },
      });
    }
    return reply.send({ success: true, data: profile });
  });
}
