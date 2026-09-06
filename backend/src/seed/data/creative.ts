import type { InferInsertModel } from "drizzle-orm";
import { creativeWorks, creativeSources } from "../../database/schema.js";

type CreativeInsert = InferInsertModel<typeof creativeWorks>;
type SourceInsert = InferInsertModel<typeof creativeSources>;

type CreativeSeed = {
  work: CreativeInsert;
  sources: SourceInsert[];
};

export const creativeSeed: CreativeSeed[] = [
  {
    work: {
      slug: "error-404-hero-not-found",
      type: "webtoon",
      title: "ERROR 404: HERO NOT FOUND",
      description:
        "A BBA student is summoned into a fantasy world by mistake. Unable to fit the hero system, he starts rewriting its rules. My interests in code, business and building become a visual story.",
      href: "https://www.webtoons.com/en/canvas/error-404-hero-not-found/list?title_no=1168738",
      cover: "/media/chrono/webtoon-cover.jpg",
      genre: "Fantasy / Comedy",
      role: "Creator",
      provenance:
        "Public series ID matches the local creator dashboard; the original cover credits Bhuvan Gowda P.",
      verified: true,
    },
    sources: [
      { creativeWorkId: 0, type: "public page", href: "https://www.webtoons.com/en/canvas/error-404-hero-not-found/list?title_no=1168738", label: "Read the series on WEBTOON" },
    ],
  },
  {
    work: {
      slug: "bhuvan5821n-music",
      type: "music",
      title: "bhuvan5821n",
      artist: "bhuvan5821n",
      description:
        "Another way to work with rhythm, atmosphere and feeling. My music lives alongside the things I build.",
      href: "https://open.spotify.com/artist/7MerLC0ZGytRkTf9mSBfS4",
      embed: "https://open.spotify.com/embed/artist/7MerLC0ZGytRkTf9mSBfS4?utm_source=generator&theme=0",
      role: "Artist",
      verified: true,
    },
    sources: [
      { creativeWorkId: 0, type: "spotify", href: "https://open.spotify.com/artist/7MerLC0ZGytRkTf9mSBfS4", label: "Listen on Spotify" },
    ],
  },
  {
    work: {
      slug: "bhuvan-laser",
      type: "visual",
      title: "Bhuvan Laser Portrait",
      description:
        "An animated binary portrait from my GitHub profile. A two-dimensional artwork, not captured 3D scan data.",
      href: "https://github.com/bhuvan5821n/bhuvan5821n/blob/main/assets/laser/bhuvan-laser.svg",
      source: "/media/chrono/bhuvan-laser.svg",
      role: "Artist",
      verified: true,
    },
    sources: [
      { creativeWorkId: 0, type: "github", href: "https://github.com/bhuvan5821n/bhuvan5821n/blob/main/assets/laser/bhuvan-laser.svg", label: "View on GitHub" },
    ],
  },
];
