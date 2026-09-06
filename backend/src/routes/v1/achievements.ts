import type { FastifyInstance } from "fastify";
import { listAchievements } from "../../services/achievements.js";

export async function achievementRoutes(app: FastifyInstance) {
  app.get("/api/v1/achievements", async (_request, reply) => {
    const achievements = listAchievements();
    return reply.send({ success: true, data: achievements });
  });
}
