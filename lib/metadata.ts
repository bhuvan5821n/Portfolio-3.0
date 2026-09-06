import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  imagePath?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export type ProjectMetadataInput = {
  slug: string;
  name: string;
  description?: string | null;
  summary?: string | null;
};

const DEFAULT_SOCIAL_IMAGE = "/opengraph-image";

export function createPageMetadata({
  title,
  description,
  pathname,
  imagePath = DEFAULT_SOCIAL_IMAGE,
  imageAlt = "Bhuvan Gowda P portfolio artwork",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(pathname);
  const image = absoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function createProjectMetadata(
  project: ProjectMetadataInput,
): Metadata {
  const description =
    project.description ??
    project.summary ??
    `A case study from ${siteConfig.name}'s portfolio.`;

  return createPageMetadata({
    title: `${project.name} case study | ${siteConfig.name}`,
    description,
    pathname: `/projects/${project.slug}`,
    imagePath: `/projects/${project.slug}/opengraph-image`,
    imageAlt: `${project.name} case study artwork`,
  });
}

export const routeMetadata = {
  home: createPageMetadata({
    title: `${siteConfig.name} | CHRONO//ROOTS`,
    description: siteConfig.description,
    pathname: "/",
  }),
  work: createPageMetadata({
    title: `Projects — The Inventor’s Archive | ${siteConfig.name}`,
    description:
      "A collection of Bhuvan's builds, prototypes, concept studies and experiments.",
    pathname: "/projects",
  }),
  experiments: createPageMetadata({
    title: `Lab — Experimental Systems | ${siteConfig.name}`,
    description:
      "Small tests, unfinished ideas and things Bhuvan is learning by making.",
    pathname: "/lab",
  }),
  presentations: createPageMetadata({
    title: `Achievements — The Academy | ${siteConfig.name}`,
    description:
      "Study, software build milestones and creative publication from Bhuvan Gowda P, with sources alongside each record.",
    pathname: "/achievements",
  }),
  about: createPageMetadata({
    title: `Profile & Creative Signals | ${siteConfig.name}`,
    description:
      "About Bhuvan Gowda P, a BBA student in Bengaluru who learns through practical technology and product experiments.",
    pathname: "/profile",
  }),
  notFound: createPageMetadata({
    title: `Page not found | ${siteConfig.name}`,
    description: "The requested page could not be found.",
    pathname: "/404",
    noIndex: true,
  }),
} satisfies Record<string, Metadata>;

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: [
      "bhuvan5821n",
      "bhuvan5821na",
    ],
    sameAs: [
      "https://github.com/bhuvan5821n",
      "https://www.instagram.com/bhuvan5821na/",
      "https://open.spotify.com/artist/7MerLC0ZGytRkTf9mSBfS4",
    ],
    url: absoluteUrl("/"),
  } as const;
}

export function createCreativeWorkJsonLd(project: ProjectMetadataInput) {
  const description = project.description ?? project.summary;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    ...(description ? { description } : {}),
    url: absoluteUrl(`/projects/${project.slug}`),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
  } as const;
}

export function serializeJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
