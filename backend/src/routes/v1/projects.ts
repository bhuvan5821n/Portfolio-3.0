import type { FastifyInstance } from "fastify";
import { listProjects, getProject, getProjectCount } from "../../services/projects.js";
import { projectQuerySchema, projectParamsSchema } from "../../schemas/projects.js";

export async function projectRoutes(app: FastifyInstance) {
  app.get("/api/v1/projects", async (request, reply) => {
    const parsed = projectQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: { code: "INVALID_QUERY", message: "Invalid query parameters", requestId: request.id },
      });
    }
    const { featured, category, limit, offset } = parsed.data;
    const projects = listProjects({ featured, category, limit, offset });
    const total = getProjectCount({ featured, category });
    return reply.send({
      success: true,
      data: projects,
      meta: { total, limit, offset },
    });
  });

  app.get("/api/v1/projects/:slug", async (request, reply) => {
    const parsed = projectParamsSchema.safeParse(request.params);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: { code: "INVALID_PARAMS", message: "Invalid project slug", requestId: request.id },
      });
    }
    const project = getProject(parsed.data.slug);
    if (!project) {
      return reply.status(404).send({
        success: false,
        error: { code: "PROJECT_NOT_FOUND", message: "Project not found", requestId: request.id },
      });
    }
    return reply.send({ success: true, data: project });
  });
}
