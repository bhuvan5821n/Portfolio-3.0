import { creativeRepository, type CreativeWithSources } from "../repositories/creative.js";

export type CreativeResponse = {
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
  verified: boolean | null;
  sources: { type: string; href: string; label: string }[];
};

function toResponse(row: CreativeWithSources): CreativeResponse {
  return {
    slug: row.slug,
    type: row.type,
    title: row.title,
    artist: row.artist,
    description: row.description,
    href: row.href,
    embed: row.embed,
    cover: row.cover,
    genre: row.genre,
    role: row.role,
    provenance: row.provenance,
    source: row.source,
    verified: row.verified,
    sources: row.sources.map((s) => ({ type: s.type, href: s.href, label: s.label })),
  };
}

export function listCreative(type?: string): CreativeResponse[] {
  return creativeRepository.list(type).map(toResponse);
}

export function getCreative(slug: string): CreativeResponse | null {
  const row = creativeRepository.getBySlug(slug);
  return row ? toResponse(row) : null;
}
