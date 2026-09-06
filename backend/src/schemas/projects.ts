import { z } from "zod";

export const projectQuerySchema = z.object({
  featured: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  category: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const projectParamsSchema = z.object({
  slug: z.string().min(1),
});
