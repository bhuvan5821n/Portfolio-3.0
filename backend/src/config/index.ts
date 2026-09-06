import { getEnv, type Env } from "./env.js";

export type AppConfig = {
  env: Env;
  isProduction: boolean;
  isDevelopment: boolean;
  frontendOrigins: string[];
};

let _config: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!_config) {
    const env = getEnv();
    _config = {
      env,
      isProduction: env.NODE_ENV === "production",
      isDevelopment: env.NODE_ENV === "development",
      frontendOrigins: env.FRONTEND_ORIGINS.split(",").map((s) => s.trim()),
    };
  }
  return _config;
}
