import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { getConfig } from "../config/index.js";

export async function registerMiddleware(app: FastifyInstance) {
  const config = getConfig();

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  await app.register(cors, {
    origin: config.frontendOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    errorResponseBuilder: () => ({
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Please try again later.",
      },
    }),
  });

  app.addHook("onRequest", async (request: FastifyRequest) => {
    (request as FastifyRequest & { startTime?: number }).startTime = Date.now();
  });

  app.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = (request as FastifyRequest & { startTime?: number }).startTime ?? Date.now();
    const duration = Date.now() - startTime;
    request.log.info({
      requestId: request.id,
      route: request.url,
      method: request.method,
      status: reply.statusCode,
      duration,
    });
  });
}
