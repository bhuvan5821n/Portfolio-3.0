import type { Achievement } from "@/data/achievements";
import { milestones } from "@/data/achievements";
import type { CreatorCapability } from "@/data/capabilities";
import { creatorCapabilities } from "@/data/capabilities";
import { creative } from "@/data/creative";
import type { Profile } from "@/data/profile";
import { profile } from "@/data/profile";
import type { ArchiveProject } from "@/data/projects";
import { projects } from "@/data/projects";

export type ContentSource = "api" | "local";

type ApiEnvelope<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; requestId?: string } };

type BackendProject = {
  slug: string;
  name: string;
  description: string;
  status: string | null;
  category: string | null;
  featured: boolean | null;
  year: string | null;
  duration?: string | null;
  role?: string | null;
  team?: string | null;
  targetUser?: string | null;
  context?: string | null;
  problem?: string | null;
  why?: string | null;
  engineering?: string | null;
  contribution?: string[];
  implemented?: string[];
  testing?: string[];
  planned?: string[];
  decisions?: string[];
  tools: string[];
  result?: string | null;
  feedback?: string | null;
  learning?: string[];
  limitations?: string[];
  nextStep?: string | null;
  sourceNote?: string | null;
  lastModified?: string | null;
  sources?: { type: string; href: string; label: string }[];
  media?: { type: string; source: string; alt: string; caption: string | null; evidence: string | null }[];
};

type BackendCapability = Omit<CreatorCapability, "id" | "evidenceNote"> & {
  id: string;
  evidenceNote: string | null;
};

type BackendAchievement = {
  id: number;
  title: string;
  type: string;
  detail: string;
  source: string | null;
  sourceLabel: string | null;
  date: string | null;
};

type BackendCreative = {
  slug: string;
  type: string;
  title: string;
  artist: string | null;
  description: string | null;
  href: string | null;
  embed: string | null;
  cover: string | null;
  genre: string | null;
  role: string | null;
  provenance: string | null;
  source: string | null;
};

export type PortfolioCreative = {
  webtoon:{title:string;role:string;description:string;href:string;cover:string;genre:string;provenance:string};
  music:{artist:string;href:string;embed:string;description:string};
  laser:{source:string;href:string;description:string};
};

const apiBaseUrl = () =>
  (process.env.PORTFOLIO_API_URL ?? process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ?? "http://127.0.0.1:3001")
    .replace(/\/$/, "");

async function requestApi<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiBaseUrl()}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(1_800),
      headers: { accept: "application/json" },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as ApiEnvelope<T>;
    return body.success ? body.data : null;
  } catch {
    return null;
  }
}

export async function getPortfolioProfile(): Promise<{ data: Profile; source: ContentSource }> {
  const backend = await requestApi<Profile>("/api/v1/profile");
  if (!backend) return { data: profile, source: "local" };
  return {
    data: {
      ...profile,
      ...backend,
      education: { ...profile.education, ...backend.education },
      opportunity: { ...profile.opportunity, ...backend.opportunity },
      contact: { ...profile.contact, ...backend.contact },
      workingMethod: { ...profile.workingMethod, ...backend.workingMethod },
    },
    source: "api",
  };
}

function fillProject(base: ArchiveProject, api?: BackendProject): ArchiveProject {
  if (!api) return base;
  const filled = { ...base } as ArchiveProject;
  const nullableKeys = [
    "year", "duration", "role", "team", "targetUser", "context", "problem", "why",
    "engineering", "result", "feedback", "nextStep", "sourceNote", "lastModified",
  ] as const;
  for (const key of nullableKeys) {
    if (!filled[key] && api[key]) Object.assign(filled, { [key]: api[key] });
  }
  const arrayKeys = ["contribution", "implemented", "testing", "planned", "decisions", "tools", "learning", "limitations"] as const;
  for (const key of arrayKeys) {
    const incoming = api[key];
    if ((!filled[key] || filled[key]?.length === 0) && incoming?.length) Object.assign(filled, { [key]: incoming });
  }
  if ((!filled.links || filled.links.length === 0) && api.sources?.length) {
    filled.links = api.sources as ArchiveProject["links"];
  }
  if ((!filled.media || filled.media.length === 0) && api.media?.length) {
    filled.media = api.media.map((item) => ({
      type: item.type as NonNullable<ArchiveProject["media"]>[number]["type"],
      source: item.source,
      alt: item.alt,
      caption: item.caption ?? "",
      evidence: item.evidence as NonNullable<ArchiveProject["media"]>[number]["evidence"],
    }));
  }
  return filled;
}

export async function getPortfolioProjects(): Promise<{ data: readonly ArchiveProject[]; source: ContentSource }> {
  const backend = await requestApi<BackendProject[]>("/api/v1/projects?limit=50");
  if (!backend?.length) return { data: projects, source: "local" };
  const bySlug = new Map(backend.map((item) => [item.slug, item]));
  return { data: projects.map((item) => fillProject(item, bySlug.get(item.slug))), source: "api" };
}

export async function getPortfolioProject(slug: string): Promise<{ data: ArchiveProject | null; source: ContentSource }> {
  const local = projects.find((item) => item.slug === slug) ?? null;
  if (!local) return { data: null, source: "local" };
  const backend = await requestApi<BackendProject>(`/api/v1/projects/${encodeURIComponent(slug)}`);
  return backend ? { data: fillProject(local, backend), source: "api" } : { data: local, source: "local" };
}

export async function getPortfolioCapabilities(): Promise<{ data: readonly CreatorCapability[]; source: ContentSource }> {
  const backend = await requestApi<BackendCapability[]>("/api/v1/capabilities");
  if (!backend?.length) return { data: creatorCapabilities, source: "local" };
  const confirmedIds = new Set(backend.map((item) => item.id));
  return {
    data: creatorCapabilities.map((item) => confirmedIds.has(item.id) ? { ...item } : item),
    source: "api",
  };
}

export async function getPortfolioAchievements(): Promise<{ data: readonly Achievement[]; source: ContentSource }> {
  const backend = await requestApi<BackendAchievement[]>("/api/v1/achievements");
  if (!backend?.length) return { data: milestones, source: "local" };
  const byTitle = new Map(backend.map((item) => [item.title, item]));
  return {
    data: milestones.map((item) => {
      const match = byTitle.get(item.title);
      return match ? {
        ...item,
        source: item.source ?? match.source,
        label: item.label || match.sourceLabel || "Open source",
        date: item.date ?? match.date,
      } : item;
    }),
    source: "api",
  };
}

export async function getPortfolioCreative(): Promise<{ data: PortfolioCreative; source: ContentSource }> {
  const backend = await requestApi<BackendCreative[]>("/api/v1/creative");
  if (!backend?.length) return { data: creative as PortfolioCreative, source: "local" };
  const webtoon = backend.find((item) => item.type === "webtoon");
  const music = backend.find((item) => item.type === "music");
  const laser = backend.find((item) => item.slug === "bhuvan-laser");
  return {
    data: {
      webtoon: {
        ...creative.webtoon,
        title: webtoon?.title ?? creative.webtoon.title,
        role: webtoon?.role ?? creative.webtoon.role,
        href: webtoon?.href ?? creative.webtoon.href,
        cover: webtoon?.cover ?? creative.webtoon.cover,
        genre: webtoon?.genre ?? creative.webtoon.genre,
        provenance: webtoon?.provenance ?? creative.webtoon.provenance,
      },
      music: {
        ...creative.music,
        artist: music?.artist ?? creative.music.artist,
        href: music?.href ?? creative.music.href,
        embed: music?.embed ?? creative.music.embed,
      },
      laser: {
        ...creative.laser,
        source: laser?.source ?? creative.laser.source,
        href: laser?.href ?? creative.laser.href,
      },
    },
    source: "api",
  };
}

export async function getSignalsSource(): Promise<ContentSource> {
  const signals = await requestApi<unknown[]>("/api/v1/signals?limit=20");
  return signals ? "api" : "local";
}

export function getPortfolioApiUrl(): string {
  return apiBaseUrl();
}
