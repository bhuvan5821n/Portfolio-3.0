import type { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from "fastify";

export async function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const statusCode = error.statusCode ?? 500;

    if (statusCode >= 500) {
      app.log.error({ err: error }, "Unhandled server error");
    }

    const isValidationError = statusCode === 400 && error.validation;
    const code = isValidationError ? "VALIDATION_ERROR" : (error.code ?? "INTERNAL_ERROR");

    return reply.status(statusCode).send({
      success: false,
      error: {
        code,
        message: isValidationError
          ? "Invalid request parameters"
          : (statusCode >= 500 ? "Internal server error" : error.message),
        requestId: request.id,
      },
    });
  });

  app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
        requestId: request.id,
      },
    });
  });
}
