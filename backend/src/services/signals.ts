import { signalsRepository, type SignalRow } from "../repositories/signals.js";

export type SignalResponse = {
  slug: string;
  type: string;
  title: string;
  summary: string;
  date: string;
  projectId: number | null;
  creativeWorkId: number | null;
  sourceId: string | null;
  visibility: string | null;
};

function toResponse(row: SignalRow): SignalResponse {
  return {
    slug: row.slug,
    type: row.type,
    title: row.title,
    summary: row.summary,
    date: row.date,
    projectId: row.projectId,
    creativeWorkId: row.creativeWorkId,
    sourceId: row.sourceId,
    visibility: row.visibility,
  };
}

export function listSignals(opts: { type?: string; limit?: number; offset?: number } = {}): SignalResponse[] {
  return signalsRepository.list(opts).map(toResponse);
}
