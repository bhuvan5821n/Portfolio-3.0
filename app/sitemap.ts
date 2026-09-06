import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

// This is the portfolio content revision date, not a project completion date.
// Update it intentionally when published page content changes.
const SITE_CONTENT_REVISION = "2026-09-05";

const coreRoutes = [
  "/",
  "/achievements",
  "/projects",
  "/lab",
  "/profile",
] as const;

function projectRevision(project: unknown): string {
  if (
    typeof project === "object" &&
    project !== null &&
    "lastModified" in project &&
    typeof project.lastModified === "string" &&
    /^\d{4}-\d{2}-\d{2}/.test(project.lastModified)
  ) {
    return project.lastModified;
  }

  return SITE_CONTENT_REVISION;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...coreRoutes.map((pathname) => ({
      url: absoluteUrl(pathname),
      lastModified: SITE_CONTENT_REVISION,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: projectRevision(project),
    })),
  ];
}
