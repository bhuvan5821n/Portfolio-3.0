import { eq } from "drizzle-orm";
import { getDb, saveDb } from "../database/index.js";
import * as schema from "../database/schema.js";
import { profileSeed } from "./data/profile.js";
import { projectsSeed } from "./data/projects.js";
import { capabilitiesSeed } from "./data/capabilities.js";
import { achievementsSeed } from "./data/achievements.js";
import { creativeSeed } from "./data/creative.js";
import { signalsSeed } from "./data/signals.js";

export function seed() {
  const db = getDb();

  console.log("Seeding profile...");
  const existingProfile = db.select().from(schema.profiles).limit(1).get();
  if (!existingProfile) {
    db.insert(schema.profiles).values(profileSeed).run();
  }

  console.log("Seeding projects...");
  for (const { project, sources, media, technologies } of projectsSeed) {
    const existing = db.select().from(schema.projects)
      .where(eq(schema.projects.slug, project.slug))
      .limit(1).get();
    if (!existing) {
      const result = db.insert(schema.projects).values(project).returning().get();
      for (const s of sources) {
        db.insert(schema.projectSources).values({ ...s, projectId: result.id }).run();
      }
      for (const m of media) {
        db.insert(schema.projectMedia).values({ ...m, projectId: result.id }).run();
      }
      for (const t of technologies) {
        db.insert(schema.projectTechnologies).values({ ...t, projectId: result.id }).run();
      }
    }
  }

  console.log("Seeding capabilities...");
  for (const { capability, evidence } of capabilitiesSeed) {
    const existing = db.select().from(schema.capabilities)
      .where(eq(schema.capabilities.capId, capability.capId))
      .limit(1).get();
    if (!existing) {
      const result = db.insert(schema.capabilities).values(capability).returning().get();
      for (const e of evidence) {
        db.insert(schema.capabilityEvidence).values({ ...e, capabilityId: result.id }).run();
      }
    }
  }

  console.log("Seeding achievements...");
  const existingAchievements = db.select().from(schema.achievements).limit(1).get();
  if (!existingAchievements) {
    for (const a of achievementsSeed) {
      db.insert(schema.achievements).values(a).run();
    }
  }

  console.log("Seeding creative works...");
  for (const { work, sources } of creativeSeed) {
    const existing = db.select().from(schema.creativeWorks)
      .where(eq(schema.creativeWorks.slug, work.slug))
      .limit(1).get();
    if (!existing) {
      const result = db.insert(schema.creativeWorks).values(work).returning().get();
      for (const s of sources) {
        db.insert(schema.creativeSources).values({ ...s, creativeWorkId: result.id }).run();
      }
    }
  }

  console.log("Seeding signals...");
  for (const signal of signalsSeed) {
    const existing = db.select().from(schema.signals)
      .where(eq(schema.signals.slug, signal.slug))
      .limit(1).get();
    if (!existing) {
      db.insert(schema.signals).values(signal).run();
    }
  }

  saveDb();
  console.log("Seed complete.");
}
