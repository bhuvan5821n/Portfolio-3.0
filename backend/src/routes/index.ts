import type { FastifyInstance } from "fastify";
import { healthRoutes } from "./v1/health.js";
import { systemRoutes } from "./v1/system.js";
import { profileRoutes } from "./v1/profile.js";
import { projectRoutes } from "./v1/projects.js";
import { capabilityRoutes } from "./v1/capabilities.js";
import { achievementRoutes } from "./v1/achievements.js";
import { creativeRoutes } from "./v1/creative.js";
import { signalRoutes } from "./v1/signals.js";
import { contactRoutes } from "./v1/contact.js";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes);
  await app.register(systemRoutes);
  await app.register(profileRoutes);
  await app.register(projectRoutes);
  await app.register(capabilityRoutes);
  await app.register(achievementRoutes);
  await app.register(creativeRoutes);
  await app.register(signalRoutes);
  await app.register(contactRoutes);
}
