import { profileRepository, type ProfileRow } from "../repositories/profile.js";

export type ProfileResponse = {
  name: string;
  shortName: string;
  headline: string;
  introduction: string;
  personalityNote: string | null;
  role: string | null;
  location: string | null;
  education: {
    summary: string | null;
    institution: string | null;
    program: string | null;
    currentYear: string | null;
    expectedGraduation: string | null;
  };
  currentFocus: string[];
  opportunity: {
    targetRole: string | null;
    type: string | null;
    availability: string | null;
    preferredLocation: string | null;
  };
  contact: {
    email: string | null;
    github: string | null;
    linkedin: string | null;
    resume: string | null;
  };
  workingMethod: {
    label: string | null;
    description: string | null;
  };
  contentVersion: string | null;
  lastContentUpdate: string | null;
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

export function getProfile(): ProfileResponse | null {
  const row = profileRepository.get();
  if (!row) return null;

  return {
    name: row.name,
    shortName: row.shortName,
    headline: row.headline,
    introduction: row.introduction,
    personalityNote: row.personalityNote,
    role: row.role,
    location: row.location,
    education: {
      summary: row.educationSummary,
      institution: row.educationInstitution,
      program: row.educationProgram,
      currentYear: row.educationCurrentYear,
      expectedGraduation: row.educationExpectedGraduation,
    },
    currentFocus: parseJsonArray(row.currentFocus),
    opportunity: {
      targetRole: row.opportunityTargetRole,
      type: row.opportunityType,
      availability: row.opportunityAvailability,
      preferredLocation: row.opportunityPreferredLocation,
    },
    contact: {
      email: row.contactEmail,
      github: row.contactGithub,
      linkedin: row.contactLinkedin,
      resume: row.contactResume,
    },
    workingMethod: {
      label: row.workingMethodLabel,
      description: row.workingMethodDescription,
    },
    contentVersion: row.contentVersion,
    lastContentUpdate: row.lastContentUpdate,
  };
}
