import Fastify from "fastify";
import { getConfig } from "./config/index.js";
import { saveDb } from "./database/index.js";
import { registerMiddleware } from "./middleware/security.js";
import { registerErrorHandler } from "./middleware/errorHandler.js";
import { registerRoutes } from "./routes/index.js";

export async function buildApp() {
  const config = getConfig();

  const app = Fastify({
    logger: {
      level: config.isProduction ? "info" : "debug",
      ...(config.isDevelopment && {
        transport: { target: "pino-pretty", options: { colorize: true } },
      }),
    },
    trustProxy: true,
    bodyLimit: 10240,
  });

  await registerSwagger(app);
  await registerMiddleware(app);
  await registerErrorHandler(app);
  await registerRoutes(app);

  app.addHook("onClose", async () => {
    saveDb();
  });

  return app;
}

async function registerSwagger(app: ReturnType<typeof Fastify>) {
  const { default: swagger } = await import("@fastify/swagger");
  const { default: swaggerUi } = await import("@fastify/swagger-ui");

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Portfolio 3.0 API",
        description: "CHRONO//ROOTS backend API serving verified portfolio content.",
        version: "1.0.0",
      },
      servers: [
        { url: "http://localhost:3001", description: "Local development" },
      ],
      components: {
        schemas: {
          SuccessResponse: {
            type: "object",
            properties: {
              success: { type: "boolean", enum: [true] },
              data: {},
              meta: { type: "object" },
            },
          },
          ErrorResponse: {
            type: "object",
            properties: {
              success: { type: "boolean", enum: [false] },
              error: {
                type: "object",
                properties: {
                  code: { type: "string" },
                  message: { type: "string" },
                  requestId: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      deepLinking: true,
      displayRequestDuration: true,
    },
  });
}

// Vercel entrypoint: export the built app for serverless functions.
// Local standalone: run this file directly to start the HTTP server.
if (process.env.VITEST === undefined) {
  const { initDb } = await import("./database/index.js");
  const { seed } = await import("./seed/index.js");

  await initDb();
  seed();
}

export const app = process.env.VITEST === undefined ? await buildApp() : undefined;

if (process.env.VITEST === undefined && process.env.VERCEL === undefined) {
  const config = getConfig();
  await app!.listen({ port: config.env.PORT, host: "0.0.0.0" });
  console.log(`Portfolio 3.0 API running on port ${config.env.PORT}`);
}
