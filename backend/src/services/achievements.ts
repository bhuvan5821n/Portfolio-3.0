import { achievementsRepository, type AchievementRow } from "../repositories/achievements.js";

export type AchievementResponse = {
  id: number;
  title: string;
  type: string;
  detail: string;
  source: string | null;
  sourceLabel: string | null;
  date: string | null;
};

function toResponse(row: AchievementRow): AchievementResponse {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    detail: row.detail,
    source: row.source,
    sourceLabel: row.sourceLabel,
    date: row.date,
  };
}

export function listAchievements(): AchievementResponse[] {
  return achievementsRepository.list().map(toResponse);
}
