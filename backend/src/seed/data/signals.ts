import type { InferInsertModel } from "drizzle-orm";
import { signals } from "../../database/schema.js";

type SignalInsert = InferInsertModel<typeof signals>;

export const signalsSeed: SignalInsert[] = [
  {
    slug: "webtoon-series-published",
    type: "CREATIVE",
    title: "ERROR 404: HERO NOT FOUND published",
    summary:
      "A fantasy/comedy WEBTOON CANVAS series created by Bhuvan Gowda P goes live.",
    date: "2026-08-29",
    sourceId: "webtoon-canvas",
    visibility: "public",
  },
  {
    slug: "portfolio-3-0-chronoroots",
    type: "PROJECT",
    title: "CHRONO//ROOTS portfolio archive begins",
    summary:
      "Portfolio 3.0 launches as a seasonal archive connecting technology, business, music and storytelling.",
    date: "2026-09-01",
    sourceId: "portfolio",
    visibility: "public",
  },
  {
    slug: "friday-experiment-continues",
    type: "EXPERIMENT",
    title: "FRIDAY assistant experiment continues",
    summary:
      "Voice, memory and tool experiments continue in the FRIDAY/JARVIS project.",
    date: "2026-09-01",
    sourceId: "github",
    visibility: "public",
  },
  {
    slug: "music-on-spotify",
    type: "RELEASE",
    title: "Music available on Spotify",
    summary:
      "bhuvan5821n artist profile live on Spotify.",
    date: "2026-08-15",
    sourceId: "spotify",
    visibility: "public",
  },
];
