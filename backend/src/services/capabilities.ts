import { capabilitiesRepository, type CapabilityWithEvidence } from "../repositories/capabilities.js";

export type CapabilityResponse = {
  id: string;
  name: string;
  shortDescription: string;
  stage: string;
  stageDetail: string;
  statement: string;
  actions: string[];
  workingSet: string[];
  evidence: { route: string; label: string; detail: string }[];
  evidenceNote: string | null;
};

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toResponse(row: CapabilityWithEvidence): CapabilityResponse {
  return {
    id: row.capId,
    name: row.name,
    shortDescription: row.shortDescription,
    stage: row.stage,
    stageDetail: row.stageDetail,
    statement: row.statement,
    actions: parseJsonArray(row.actions),
    workingSet: parseJsonArray(row.workingSet),
    evidence: row.evidence.map((e) => ({ route: e.route, label: e.label, detail: e.detail })),
    evidenceNote: row.evidenceNote,
  };
}

export function listCapabilities(): CapabilityResponse[] {
  return capabilitiesRepository.list().map(toResponse);
}

export function getCapability(capId: string): CapabilityResponse | null {
  const row = capabilitiesRepository.getByCapId(capId);
  return row ? toResponse(row) : null;
}
