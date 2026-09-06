import { getEnv } from "../config/env.js";

export type DatabaseDriver = "sqlite" | "postgresql";

export function getDatabaseDriver(): DatabaseDriver {
  return getEnv().DATABASE_URL ? "postgresql" : "sqlite";
}
