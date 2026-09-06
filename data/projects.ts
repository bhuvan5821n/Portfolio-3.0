export type ProjectStatus =
  | "Live"
  | "Built"
  | "Prototype"
  | "In progress"
  | "Concept study"
  | "Experiment"
  | null;

export type ProjectMediaType = "image" | "video" | "audio" | "document" | "prototype";
export type ProjectMediaEvidence = "real evidence" | "concept artifact" | "decorative art";

export type ProjectMedia = {
  type: ProjectMediaType;
  source: string;
  alt: string;
  caption: string;
  evidence: ProjectMediaEvidence;
};

export type ProjectLinkType =
  | "live site"
  | "demo"
  | "source"
  | "video"
  | "deck"
  | "prototype"
  | "certificate"
  | "event page"
  | "article";

export type ProjectLink = {
  type: ProjectLinkType;
  href: string;
  label: string;
};

export type MissionRoomVariant = {
  centralObject: string;
  supportingObjects: readonly string[];
  interactions: readonly string[];
  evidenceRole: "decorative";
  evidenceNotice: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  year: string | null;
  duration: string | null;
  role: string | null;
  team: string | null;
  targetUser: string | null;
  context: string | null;
  problem: string | null;
  contribution: readonly string[] | null;
  implemented: readonly string[] | null;
  testing: readonly string[] | null;
  planned: readonly string[] | null;
  decisions: readonly string[] | null;
  tools: readonly string[] | null;
  media: readonly ProjectMedia[] | null;
  links: readonly ProjectLink[] | null;
  result: string | null;
  feedback: string | null;
  learning: readonly string[] | null;
  limitations: readonly string[] | null;
  nextStep: string | null;
  lastModified: string | null;
  missionRoom: MissionRoomVariant;
};

const decorativeNotice =
  "This scene is a decorative project representation, not evidence of a working product.";

const originalProjects = [
  {
    slug: "friday",
    name: "FRIDAY",
    description: "A personal assistant experiment exploring voice, contextual memory and tools.",
    status: "Experiment",
    year: null,
    duration: null,
    role: null,
    team: null,
    targetUser: null,
    context: null,
    problem: null,
    contribution: null,
    implemented: null,
    testing: null,
    planned: null,
    decisions: null,
    tools: null,
    media: null,
    links: null,
    result: null,
    feedback: null,
    learning: null,
    limitations: null,
    nextStep: null,
    lastModified: null,
    missionRoom: {
      centralObject: "Compact AI terminal with a waveform screen",
      supportingObjects: ["Microphone", "Memory-chip tokens"],
      interactions: [
        "Waveform responds to pointer or scroll",
        "Microphone ring responds to hover or focus",
        "Memory tokens connect visually",
      ],
      evidenceRole: "decorative",
      evidenceNotice: decorativeNotice,
    },
  },
  {
    slug: "fleetmind",
    name: "FleetMind AI",
    description: "A proposed approach to maintenance-risk decisions for commercial fleets.",
    status: "Concept study",
    year: null,
    duration: null,
    role: null,
    team: null,
    targetUser: null,
    context: "Product and business concept.",
    problem: null,
    contribution: null,
    implemented: null,
    testing: null,
    planned: null,
    decisions: null,
    tools: null,
    media: null,
    links: null,
    result: null,
    feedback: null,
    learning: null,
    limitations: null,
    nextStep: null,
    lastModified: null,
    missionRoom: {
      centralObject: "Fleet route table with miniature trucks",
      supportingObjects: ["Maintenance map", "Route nodes", "Container tokens"],
      interactions: [
        "Trucks travel short routes according to scroll",
        "Route nodes illuminate",
        "Map layers separate slightly",
      ],
      evidenceRole: "decorative",
      evidenceNotice: decorativeNotice,
    },
  },
  {
    slug: "grain-za",
    name: "Grain-Za",
    description: "A concept study for a grain-based snack bar, its packaging and its business story.",
    status: "Concept study",
    year: null,
    duration: null,
    role: null,
    team: null,
    targetUser: null,
    context: "Product concept.",
    problem: null,
    contribution: null,
    implemented: null,
    testing: null,
    planned: null,
    decisions: null,
    tools: null,
    media: null,
    links: null,
    result: null,
    feedback: null,
    learning: null,
    limitations: null,
    nextStep: null,
    lastModified: null,
    missionRoom: {
      centralObject: "Snack-bar package study",
      supportingObjects: ["Wrapper", "Grain bowls", "Ingredient papers", "Packaging notes"],
      interactions: [
        "Wrapper opens slightly",
        "Ingredients separate into a small composition",
        "Packaging notes reveal",
      ],
      evidenceRole: "decorative",
      evidenceNotice: decorativeNotice,
    },
  },
  {
    slug: "markwell",
    name: "Markwell",
    description:
      "A packaging-industry website project whose scope and current condition are being documented.",
    status: null,
    year: null,
    duration: null,
    role: null,
    team: null,
    targetUser: null,
    context: null,
    problem: null,
    contribution: null,
    implemented: null,
    testing: null,
    planned: null,
    decisions: null,
    tools: null,
    media: null,
    links: null,
    result: null,
    feedback: null,
    learning: null,
    limitations: null,
    nextStep: null,
    lastModified: null,
    missionRoom: {
      centralObject: "Corrugated carton with a packaging die line",
      supportingObjects: ["Industrial stamp", "Browser workflow card"],
      interactions: [
        "Carton unfolds",
        "Stamp presses",
        "Browser card reveals a second layer",
      ],
      evidenceRole: "decorative",
      evidenceNotice: decorativeNotice,
    },
  },
  {
    slug: "space-shooter",
    name: "Space Shooter",
    description: "A small arcade game project whose implementation details are being documented.",
    status: null,
    year: null,
    duration: null,
    role: null,
    team: null,
    targetUser: null,
    context: null,
    problem: null,
    contribution: null,
    implemented: null,
    testing: null,
    planned: null,
    decisions: null,
    tools: null,
    media: null,
    links: null,
    result: null,
    feedback: null,
    learning: null,
    limitations: null,
    nextStep: null,
    lastModified: null,
    missionRoom: {
      centralObject: "Original small arcade spacecraft",
      supportingObjects: ["Asteroid tokens", "Joystick", "Score-light module"],
      interactions: [
        "Spacecraft tilts",
        "Asteroids orbit a short distance",
        "Joystick provides tactile feedback",
      ],
      evidenceRole: "decorative",
      evidenceNotice: decorativeNotice,
    },
  },
  {
    slug: "procedural-frontier",
    name: "Procedural Frontier",
    description: "An experiment asking how a generated world can keep inviting exploration.",
    status: "Experiment",
    year: null,
    duration: null,
    role: null,
    team: null,
    targetUser: null,
    context: null,
    problem: null,
    contribution: null,
    implemented: null,
    testing: null,
    planned: null,
    decisions: null,
    tools: null,
    media: null,
    links: null,
    result: null,
    feedback: null,
    learning: null,
    limitations: null,
    nextStep: null,
    lastModified: null,
    missionRoom: {
      centralObject: "Modular terrain generator",
      supportingObjects: ["Terrain tiles", "Small mountains", "Exploration marker"],
      interactions: [
        "Tiles generate outward during scroll",
        "Marker moves to a generated tile",
        "Terrain layers rise slightly",
      ],
      evidenceRole: "decorative",
      evidenceNotice: decorativeNotice,
    },
  },
] as const satisfies readonly Project[];

export const domains = [
  "AI assistants",
  "Product concepts",
  "Web projects",
  "Small games",
] as const;

/** Source-backed additions, researched 2026-09-05. Original records are preserved above. */
export type ArchiveProject = Project & { category?: string; why?: string; engineering?: string; sourceNote?: string };
const github = (repo: string): ProjectLink[] => [{ type: "source", href: `https://github.com/bhuvan5821n/${repo}`, label: "Explore source on GitHub" }];
const recovered: Record<string, Partial<ArchiveProject>> = {
  friday: {
    name: "FRIDAY", category: "AI & automation", role: "Creator and lead developer", status: "Prototype",
    description: "Voice, memory and tools. A personal AI assistant built around Windows and the way I use my computer.",
    problem: "A conversational assistant needs to do more than answer: it needs context and a way to act on a computer.",
    why: "My public profile describes wanting an assistant that works around the way I think and use my computer.",
    engineering: "A Python desktop application separates model routing, action tools, local memory and the PyQt6 interface. Playwright connects browser actions; Gemini provides AI capabilities.",
    implemented: ["Voice interaction and JARVIS / FRIDAY personas", "Screen awareness and browser automation", "Local long-term memory and application tools"],
    decisions: ["Separate identity from resettable personal memory.", "Keep tools in their own action modules.", "Target Windows 10/11 as the primary desktop environment."],
    tools: ["Python", "PyQt6", "OmniRoute", "Gemini Live", "Playwright"], links: github("Friday-and-Jarvis"),
    media: [{type:"image", source:"/media/projects/friday/friday-overview.webp", alt:"FRIDAY Intelligence System desktop interface with system telemetry, AI routing controls, voice status, workspace information, assistant chat, and creative tool modules.", caption:"User-supplied FRIDAY Intelligence System capture, 16 August 2026. Visible modules demonstrate the interface, not verified completeness of every feature.", evidence:"real evidence"}],
    result: "The public repository includes application code, setup instructions, tests and archived interface captures. This portfolio does not claim a fresh end-to-end assistant test.",
    limitations: ["Voice requires a microphone; model services require configuration and connectivity.", "Some browser actions depend on installed browsers and signed-in sessions."],
    sourceNote: "Based on the public README, source structure and archived media. Personal learning notes have not yet been recorded.",
  },
  markwell: {
    category: "Web & business", status: "Built", role: "Website developer",
    description: "A multi-page website connecting corrugated packaging products with clear quote and contact paths.",
    problem: "Industrial buyers need product information and a practical way to specify packaging requirements.",
    why: "A packaging enquiry needs enough detail to become a useful conversation: the product, its dimensions and how it will be manufactured and delivered.",
    engineering: "Next.js and TypeScript pages connect a product catalog, request-for-quote forms and server-side lead handling.",
    implemented: ["Product and industry pages", "Request-for-quote and contact forms", "Per-page metadata and structured data"],
    decisions: ["Collect dimensions, quantity, printing and delivery details in the quote flow.", "Provide multiple contact paths for different buyer needs."],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer"], links: [...github("Markwell"), {type:"live site",href:"https://markwellpackaging.netlify.app/",label:"Visit Markwell"}],
    result: "Public source and a documented website URL are available. Business conversion or revenue results are not published.",
    limitations: ["Email delivery depends on SMTP configuration."],
    sourceNote: "The public repository credits Bhuvan Gowda P as developer. Company metrics are not personal project impact.",
  },
};
const base: Project = {...originalProjects[0], media:null, missionRoom: originalProjects[0].missionRoom};
const added: ArchiveProject[] = [
  {...base, slug:"hackscout", name:"HackScout", category:"AI & automation", status:"Built",
    description:"Hackathon discovery with traceable sources, explainable ranking and a useful fallback when the web fails.",
    problem:"Event details are spread across Luma, Devpost and community pages, making dates, location and relevance hard to compare.",
    why:"A discovery tool is only useful if a person can understand where the facts came from and whether they are current. Source state and match reasons are part of the product experience.",
    engineering:"An Express API delegates web retrieval to WebCMD, then validates, normalizes and ranks the returned facts. Nearby Scout adds Leaflet and OpenStreetMap.",
    implemented:["Hackathon discovery and deterministic ranking", "Clearly separated live results and verified snapshots", "Nearby search with manual-area or optional location input"],
    decisions:["Missing facts stay unknown.", "Retry once before using a previously verified snapshot.", "Keep location coordinates in memory for the active request."],
    tools:["Node.js", "Express", "WebCMD", "JavaScript", "Leaflet"], links:github("HackScout-AI"),
    result:"The repository publishes source, tests and demo acceptance notes. Those notes describe verification at the time they were written; no current service reliability is implied.",
    limitations:["Only two configured opportunity sources are documented.","Public geodata availability and browser location permissions affect nearby results."],
    sourceNote:"Public README and hackathon documentation. Event attendance, placement and awards are not asserted."},
  {...base, slug:"finance-tracker", name:"B.G. Finance", category:"Apps", status:"Built",
    description:"An offline-first Android finance tracker. Everyday expenses, budgets and spending patterns stay on the device.",
    problem:"Personal expense tracking should remain useful without a cloud account or a constant connection.",
    why:"Daily records need to remain accessible on the phone. The native application is organized around local storage, search and everyday budgeting without a required cloud account.",
    engineering:"Kotlin and Jetpack Compose render the native app, backed by a local Room database. Separate layers handle transaction parsing, money calculations and backup encryption.",
    implemented:["Transactions, categories and monthly budgets", "Local search and spending analytics", "CSV export and scheduled workers"],
    decisions:["Use local Room storage for ordinary financial activity.","Omit the INTERNET permission from the native Android application.","Label browser-prototype features separately from native features."],
    tools:["Kotlin", "Jetpack Compose", "Room", "WorkManager"], links:github("Finance-app"),
    result:"The repository contains native Android source and installation documentation, alongside a separately identified browser prototype.",
    limitations:["The complete biometric/PIN UI and encrypted backup file-picker workflow are listed as future work.","Owe & Owed remains a browser-prototype feature."],
    sourceNote:"Feature boundaries come from the public repository README. No financial outcomes or download counts are claimed."},
  {...base, slug:"portfolio-evolution", name:"Portfolio evolution", category:"Web & business", status:"Built",
    description:"From an early personal site to a tactile workspace, then a seasonal archive built for the phone in your hand.",
    problem:"A portfolio needs to explain a builder's range without forcing every idea into the same software-project card.",
    why:"This archive brings technical systems, business thinking, music and storytelling into one connected personal world.",
    engineering:"Next.js server-rendered content meets a bounded canvas frame renderer, a recursive SVG tree and accessible navigation.",
    implemented:["Five seasonal routes", "160-frame adaptive scroll sequence", "Source-backed project and creative records"],
    decisions:["Keep all 160 source frames; adapt delivery instead.","Keep normal navigation alongside a seasonal map.","Make mobile a first-class composition."],
    tools:["Next.js", "React", "TypeScript", "Canvas", "SVG"], links:github("Portfolio"),
    result:"The current archive can be explored locally. The source link documents the earlier public portfolio.",
    limitations:["Portfolio 1.0 source was not present in the local reference folder.","Current deployment is intentionally withheld."],
    sourceNote:"Older portfolio files are read-only references. This project's mathematical systems belong to the portfolio itself."},
];
const all: ArchiveProject[] = originalProjects.map(p=>({...p, ...recovered[p.slug]}));
export const projects: readonly ArchiveProject[] = [all[0], added[0], added[1], all[3], all[1], all[2], all[4], all[5], added[2]];
