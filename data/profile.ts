export type EducationProfile = {
  summary: string;
  institution: string | null;
  program: string | null;
  currentYear: string | null;
  expectedGraduation: string | null;
};

export type OpportunityProfile = {
  targetRole: string | null;
  type: string | null;
  availability: string | null;
  preferredLocation: string | null;
};

export type ContactProfile = {
  email: string | null;
  github: string | null;
  linkedin: string | null;
  resume: string | null;
};

export type Profile = {
  name: string;
  shortName: string;
  headline: string;
  introduction: string;
  personalityNote: string | null;
  role: string | null;
  location: string | null;
  education: EducationProfile;
  currentFocus: readonly string[];
  opportunity: OpportunityProfile;
  contact: ContactProfile;
  workingMethod: {
    label: string;
    description: string;
  };
};

export const profile = {
  name: "Bhuvan Gowda P",
  shortName: "Bhuvan",
  headline: "Curiosity, with roots.",
  introduction:
    "I’m Bhuvan, a BBA student editing videos and experimenting with AI assistants, small games, websites and product ideas.",
  personalityNote: "Currently turning unfinished ideas into slightly less unfinished ideas.",
  role: null,
  location: "Bengaluru, India",
  education: {
    summary: "BBA student",
    institution: "Christ Academy",
    program: "Business Administration",
    currentYear: null,
    expectedGraduation: null,
  },
  currentFocus: [
    "Video editing and visual storytelling",
    "AI assistant experiments",
    "Websites and interactive prototypes",
    "Small games and product ideas",
  ],
  opportunity: {
    targetRole: null,
    type: null,
    availability: null,
    preferredLocation: null,
  },
  contact: {
    email: "reenareenar728@gmail.com",
    github: "https://github.com/bhuvan5821n",
    linkedin: null,
    resume: null,
  },
  workingMethod: {
    label: "Question → Prototype → Observe → Rebuild",
    description:
      "I start with a question, make a small prototype, observe what happens, and rebuild from what I learn.",
  },
} as const satisfies Profile;
