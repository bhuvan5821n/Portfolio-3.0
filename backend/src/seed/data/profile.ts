import type { InferInsertModel } from "drizzle-orm";
import { profiles } from "../../database/schema.js";

type ProfileInsert = InferInsertModel<typeof profiles>;

export const profileSeed: ProfileInsert = {
  name: "Bhuvan Gowda P",
  shortName: "Bhuvan",
  headline: "Curiosity, with roots.",
  introduction:
    "I'm Bhuvan, a BBA student editing videos and experimenting with AI assistants, small games, websites and product ideas.",
  personalityNote: "Currently turning unfinished ideas into slightly less unfinished ideas.",
  role: null,
  location: "Bengaluru, India",
  educationSummary: "BBA student",
  educationInstitution: "Christ Academy",
  educationProgram: "Business Administration",
  educationCurrentYear: null,
  educationExpectedGraduation: null,
  currentFocus: JSON.stringify([
    "Video editing and visual storytelling",
    "AI assistant experiments",
    "Websites and interactive prototypes",
    "Small games and product ideas",
  ]),
  opportunityTargetRole: null,
  opportunityType: null,
  opportunityAvailability: null,
  opportunityPreferredLocation: null,
  contactEmail: "reenareenar728@gmail.com",
  contactGithub: "https://github.com/bhuvan5821n",
  contactLinkedin: null,
  contactResume: null,
  workingMethodLabel: "Question → Prototype → Observe → Rebuild",
  workingMethodDescription:
    "I start with a question, make a small prototype, observe what happens, and rebuild from what I learn.",
  contentVersion: "2026.09",
  lastContentUpdate: new Date().toISOString(),
};
