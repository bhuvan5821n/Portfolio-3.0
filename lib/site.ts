const FALLBACK_SITE_ORIGIN = "https://bhuvan-gowda.netlify.app";

function resolveSiteOrigin(value: string | undefined): string {
  if (!value?.trim()) return FALLBACK_SITE_ORIGIN;

  try {
    const candidate = new URL(value.trim());

    if (candidate.protocol !== "https:" && candidate.protocol !== "http:") {
      return FALLBACK_SITE_ORIGIN;
    }

    return candidate.origin;
  } catch {
    return FALLBACK_SITE_ORIGIN;
  }
}

export const siteConfig = {
  name: "Bhuvan Gowda P",
  shortName: "Bhuvan",
  description:
    "CHRONO//ROOTS: the personal archive of Bhuvan Gowda P. AI, automation, apps, business ideas, music and WEBTOON storytelling across five seasons.",
  origin: resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  fallbackOrigin: FALLBACK_SITE_ORIGIN,
  locale: "en_IN",
  language: "en",
  themeColor: "#101a20",
  backgroundColor: "#101a20",
} as const;

export function absoluteUrl(pathname = "/"): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, `${siteConfig.origin}/`).toString();
}
