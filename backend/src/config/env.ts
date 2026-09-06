import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  FRONTEND_ORIGINS: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  SPOTIFY_CLIENT_ID: z.string().optional(),
  SPOTIFY_CLIENT_SECRET: z.string().optional(),
  CONTACT_PROVIDER: z.enum(["console", "nodemailer", "none"]).default("console"),
  CONTACT_FROM: z.string().optional(),
  CONTACT_TO: z.string().optional(),
  TRIGGER_SECRET_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
  if (!_env) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      console.error("Invalid environment variables:", result.error.flatten().fieldErrors);
      _env = envSchema.parse({});
    } else {
      _env = result.data;
    }
  }
  return _env;
}
