import type { InferInsertModel } from "drizzle-orm";
import { achievements } from "../../database/schema.js";

type AchievementInsert = InferInsertModel<typeof achievements>;

export const achievementsSeed: AchievementInsert[] = [
  {
    title: "Business Administration",
    type: "Study",
    detail:
      "Studying business while building practical technology and creative experiments.",
    source: "https://github.com/bhuvan5821n",
    sourceLabel: "Public profile",
    date: null,
  },
  {
    title: "HackScout technical documentation",
    type: "Project record",
    detail:
      "A documented discovery system, with source validation, failure handling and a hackathon judge brief. Participation details and awards are not yet verified.",
    source: "https://github.com/bhuvan5821n/HackScout-AI/blob/main/HACKATHON.md",
    sourceLabel: "Read project brief",
    date: null,
  },
  {
    title: "A story becomes a series",
    type: "Creative milestone",
    detail:
      "ERROR 404: HERO NOT FOUND has a public home on WEBTOON CANVAS, connecting a builder's perspective with fantasy storytelling.",
    source: "https://www.webtoons.com/en/canvas/error-404-hero-not-found/list?title_no=1168738",
    sourceLabel: "Read the series",
    date: "2026-08-29",
  },
];
