import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { initDb, getDb, saveDb } from "../src/database/index.js";
import { seed } from "../src/seed/index.js";
import { buildApp } from "../src/index.js";
import type { FastifyInstance } from "fastify";

let app: FastifyInstance;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.FRONTEND_ORIGINS = "http://localhost:3000";
  await initDb();
  seed();
  app = await buildApp();
  await app.ready();
});

describe("Health", () => {
  it("returns 200 with healthy status", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/health" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.status).toBe("healthy");
    expect(body.data.version).toBeDefined();
  });
});

describe("System Public", () => {
  it("returns system info with content version", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/system/public" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.name).toBe("CHRONO//ROOTS");
    expect(body.data.contentVersion).toBeDefined();
  });
});

describe("Profile", () => {
  it("returns profile with correct contract", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/profile" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.name).toBe("Bhuvan Gowda P");
    expect(body.data.headline).toBe("Curiosity, with roots.");
    expect(body.data.education).toBeDefined();
    expect(body.data.contact).toBeDefined();
    expect(body.data.workingMethod).toBeDefined();
    expect(body.data.currentFocus).toBeInstanceOf(Array);
  });
});

describe("Projects", () => {
  it("returns project list", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.meta.total).toBeGreaterThan(0);
  });

  it("supports featured filter", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects?featured=true" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.every((p: any) => p.featured === true)).toBe(true);
  });

  it("supports category filter", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects?category=AI%20%26%20automation" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
  });

  it("returns existing project by slug", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects/friday" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.slug).toBe("friday");
    expect(body.data.name).toContain("FRIDAY");
    expect(body.data.sources).toBeInstanceOf(Array);
    expect(body.data.technologies).toBeInstanceOf(Array);
  });

  it("returns 404 for missing project", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects/nonexistent" });
    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("PROJECT_NOT_FOUND");
  });
});

describe("Capabilities", () => {
  it("returns capability list", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/capabilities" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0].id).toBeDefined();
    expect(body.data[0].actions).toBeInstanceOf(Array);
  });
});

describe("Achievements", () => {
  it("returns achievement list", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/achievements" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });
});

describe("Creative", () => {
  it("returns creative work list", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/creative" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("supports type filter", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/creative?type=webtoon" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.every((c: any) => c.type === "webtoon")).toBe(true);
  });

  it("returns existing creative work by slug", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/creative/error-404-hero-not-found" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.slug).toBe("error-404-hero-not-found");
    expect(body.data.type).toBe("webtoon");
    expect(body.data.sources).toBeInstanceOf(Array);
  });

  it("returns 404 for missing creative work", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/creative/nonexistent" });
    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("CREATIVE_NOT_FOUND");
  });
});

describe("Signals", () => {
  it("returns signal list ordered by date desc", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/signals" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("supports limit parameter", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/signals?limit=2" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.data.length).toBeLessThanOrEqual(2);
  });

  it("supports type filter", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/signals?type=CREATIVE" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.every((s: any) => s.type === "CREATIVE")).toBe(true);
  });
});

describe("Contact", () => {
  it("accepts valid contact submission", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/contact",
      payload: {
        name: "Test User",
        email: "test@example.com",
        subject: "Hello",
        message: "This is a test message.",
      },
    });
    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(body.data.id).toBeGreaterThan(0);
  });

  it("rejects invalid email", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/contact",
      payload: {
        name: "Test",
        email: "not-an-email",
        subject: "Hello",
        message: "Test",
      },
    });
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects oversized message", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/contact",
      payload: {
        name: "Test",
        email: "test@example.com",
        subject: "Hello",
        message: "x".repeat(6000),
      },
    });
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
  });

  it("rejects empty name", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/contact",
      payload: {
        name: "",
        email: "test@example.com",
        subject: "Hello",
        message: "Test",
      },
    });
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
  });

  it("accepts honeypot field (silent reject)", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/contact",
      payload: {
        name: "Bot",
        email: "bot@spam.com",
        subject: "Spam",
        message: "Buy stuff",
        honeypot: "gotcha",
      },
    });
    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
  });
});

describe("Error Envelopes", () => {
  it("returns proper error envelope for 404 with requestId", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/nonexistent" });
    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
    expect(body.error.code).toBeDefined();
    expect(body.error.message).toBeDefined();
    expect(body.error.requestId).toBeDefined();
  });

  it("returns proper error envelope for validation error", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects?featured=invalid" });
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
    expect(body.error.code).toBeDefined();
    expect(body.error.requestId).toBeDefined();
  });
});

describe("API Envelope Consistency", () => {
  it("all success responses have success=true", async () => {
    const endpoints = [
      "/api/v1/health",
      "/api/v1/system/public",
      "/api/v1/profile",
      "/api/v1/projects",
      "/api/v1/capabilities",
      "/api/v1/achievements",
      "/api/v1/creative",
      "/api/v1/signals",
    ];

    for (const url of endpoints) {
      const res = await app.inject({ method: "GET", url });
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
      expect(body.data).toBeDefined();
    }
  });

  it("all error responses have success=false with error object", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/projects/nonexistent" });
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(false);
    expect(body.error).toBeDefined();
    expect(body.error.code).toBeDefined();
    expect(body.error.message).toBeDefined();
    expect(body.error.requestId).toBeDefined();
  });
});

describe("Provider Disabled Mode", () => {
  it("GitHub provider reports not configured", async () => {
    const { getGitHubProvider } = await import("../src/providers/github.js");
    const provider = getGitHubProvider();
    expect(provider.isConfigured()).toBe(false);
    const repo = await provider.getRepository("test", "test");
    expect(repo).toBeNull();
  });

  it("Spotify provider reports not configured", async () => {
    const { getSpotifyProvider } = await import("../src/providers/spotify.js");
    const provider = getSpotifyProvider();
    expect(provider.isConfigured()).toBe(false);
    const artist = await provider.getArtist("test");
    expect(artist).toBeNull();
  });

  it("Trigger.dev automation service works without credentials", async () => {
    const { AutomationService } = await import("../src/services/automation.js");
    const service = new AutomationService();
    const enabled = await service.isEnabled();
    expect(enabled).toBe(false);
    const runId = await service.syncGithubProjects();
    expect(runId).toBeNull();
  });

  it("Cache provider works", async () => {
    const { getCacheProvider } = await import("../src/providers/cache.js");
    const cache = getCacheProvider();
    expect(cache.isConfigured()).toBe(true);
    await cache.set("test-key", "test-value", 60);
    const value = await cache.get("test-key");
    expect(value).toBe("test-value");
    await cache.del("test-key");
    const deleted = await cache.get("test-key");
    expect(deleted).toBeNull();
  });

  it("Contact notifier uses privacy-safe logging", async () => {
    const { getContactNotifier } = await import("../src/providers/contact.js");
    const notifier = getContactNotifier();
    expect(notifier.isConfigured()).toBe(true);
    const result = await notifier.notify({
      submissionId: "test_123",
      subjectLength: 10,
      messageLength: 100,
    });
    expect(result).toBe(true);
  });
});

describe("Database Persistence", () => {
  it("contact submission persists to database", async () => {
    const db = getDb();
    const { contactSubmissions } = await import("../src/database/schema.js");
    const countBefore = db.select().from(contactSubmissions).all().length;

    await app.inject({
      method: "POST",
      url: "/api/v1/contact",
      payload: {
        name: "Persist Test",
        email: "persist@test.com",
        subject: "Persistence",
        message: "Testing persistence.",
      },
    });

    const countAfter = db.select().from(contactSubmissions).all().length;
    expect(countAfter).toBe(countBefore + 1);
  });
});

describe("Swagger Documentation", () => {
  it("serves Swagger UI at /docs", async () => {
    const res = await app.inject({ method: "GET", url: "/docs" });
    expect(res.statusCode).toBe(200);
  });

  it("serves OpenAPI JSON", async () => {
    const res = await app.inject({ method: "GET", url: "/docs/json" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.openapi).toBeDefined();
    expect(body.info.title).toBe("Portfolio 3.0 API");
    expect(body.paths).toBeDefined();
  });
});
