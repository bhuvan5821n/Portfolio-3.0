import type { InferInsertModel } from "drizzle-orm";
import { projects, projectSources, projectMedia, projectTechnologies } from "../../database/schema.js";

type ProjectInsert = InferInsertModel<typeof projects>;
type SourceInsert = InferInsertModel<typeof projectSources>;
type MediaInsert = InferInsertModel<typeof projectMedia>;
type TechInsert = InferInsertModel<typeof projectTechnologies>;

type ProjectSeed = {
  project: ProjectInsert;
  sources: SourceInsert[];
  media: MediaInsert[];
  technologies: TechInsert[];
};

const decorativeNotice =
  "This scene is a decorative project representation, not evidence of a working product.";

export const projectsSeed: ProjectSeed[] = [
  {
    project: {
      slug: "friday",
      name: "FRIDAY / JARVIS",
      description:
        "Voice, memory and tools. A personal AI assistant built around Windows and the way I use my computer.",
      status: "Experiment",
      category: "AI & automation",
      role: "Creator and lead developer",
      problem:
        "A conversational assistant needs to do more than answer: it needs context and a way to act on a computer.",
      why: "My public profile describes wanting an assistant that works around the way I think and use my computer.",
      engineering:
        "A Python desktop application separates model routing, action tools, local memory and the PyQt6 interface. Playwright connects browser actions; Gemini provides AI capabilities.",
      implemented: JSON.stringify([
        "Voice interaction and JARVIS / FRIDAY personas",
        "Screen awareness and browser automation",
        "Local long-term memory and application tools",
      ]),
      decisions: JSON.stringify([
        "Separate identity from resettable personal memory.",
        "Keep tools in their own action modules.",
        "Target Windows 10/11 as the primary desktop environment.",
      ]),
      tools: JSON.stringify(["Python", "PyQt6", "Gemini", "Playwright"]),
      result:
        "The public repository includes application code, setup instructions, tests and archived interface captures. This portfolio does not claim a fresh end-to-end assistant test.",
      limitations: JSON.stringify([
        "Voice requires a microphone; model services require configuration and connectivity.",
        "Some browser actions depend on installed browsers and signed-in sessions.",
      ]),
      sourceNote:
        "Based on the public README, source structure and archived media. Personal learning notes have not yet been recorded.",
      featured: true,
    },
    sources: [{ projectId: 0, type: "source", href: "https://github.com/bhuvan5821n/Friday-and-Jarvis", label: "Explore source on GitHub" }],
    media: [
      {
        projectId: 0,
        type: "image",
        source: "/media/projects/friday/friday-intelligence-system-dashboard.png",
        alt: "FRIDAY Intelligence System desktop interface with system telemetry, AI routing controls, voice status, workspace information, assistant chat, and creative tool modules.",
        caption: "Current FRIDAY Intelligence System interface showing system overview, AI control center, workspace tools, and creative studio modules.",
        evidence: "real evidence",
      },
    ],
    technologies: [
      { projectId: 0, technology: "Python" },
      { projectId: 0, technology: "PyQt6" },
      { projectId: 0, technology: "Gemini" },
      { projectId: 0, technology: "Playwright" },
    ],
  },
  {
    project: {
      slug: "hackscout",
      name: "HackScout",
      description:
        "Hackathon discovery with traceable sources, explainable ranking and a useful fallback when the web fails.",
      status: "Built",
      category: "AI & automation",
      problem:
        "Event details are spread across Luma, Devpost and community pages, making dates, location and relevance hard to compare.",
      engineering:
        "An Express API delegates web retrieval to WebCMD, then validates, normalizes and ranks the returned facts. Nearby Scout adds Leaflet and OpenStreetMap.",
      implemented: JSON.stringify([
        "Hackathon discovery and deterministic ranking",
        "Clearly separated live results and verified snapshots",
        "Nearby search with manual-area or optional location input",
      ]),
      decisions: JSON.stringify([
        "Missing facts stay unknown.",
        "Retry once before using a previously verified snapshot.",
        "Keep location coordinates in memory for the active request.",
      ]),
      tools: JSON.stringify(["Node.js", "Express", "WebCMD", "JavaScript", "Leaflet"]),
      result:
        "The repository publishes source, tests and demo acceptance notes. Those notes describe verification at the time they were written; no current service reliability is implied.",
      limitations: JSON.stringify([
        "Only two configured opportunity sources are documented.",
        "Public geodata availability and browser location permissions affect nearby results.",
      ]),
      sourceNote:
        "Public README and hackathon documentation. Event attendance, placement and awards are not asserted.",
      featured: false,
    },
    sources: [{ projectId: 0, type: "source", href: "https://github.com/bhuvan5821n/HackScout-AI", label: "Explore source on GitHub" }],
    media: [],
    technologies: [
      { projectId: 0, technology: "Node.js" },
      { projectId: 0, technology: "Express" },
      { projectId: 0, technology: "WebCMD" },
      { projectId: 0, technology: "Leaflet" },
    ],
  },
  {
    project: {
      slug: "finance-tracker",
      name: "B.G. Finance",
      description:
        "An offline-first Android finance tracker. Everyday expenses, budgets and spending patterns stay on the device.",
      status: "Built",
      category: "Apps",
      problem:
        "Personal expense tracking should remain useful without a cloud account or a constant connection.",
      engineering:
        "Kotlin and Jetpack Compose render the native app, backed by a local Room database. Separate layers handle transaction parsing, money calculations and backup encryption.",
      implemented: JSON.stringify([
        "Transactions, categories and monthly budgets",
        "Local search and spending analytics",
        "CSV export and scheduled workers",
      ]),
      decisions: JSON.stringify([
        "Use local Room storage for ordinary financial activity.",
        "Omit the INTERNET permission from the native Android application.",
        "Label browser-prototype features separately from native features.",
      ]),
      tools: JSON.stringify(["Kotlin", "Jetpack Compose", "Room", "WorkManager"]),
      result:
        "The repository contains native Android source and installation documentation, alongside a separately identified browser prototype.",
      limitations: JSON.stringify([
        "The complete biometric/PIN UI and encrypted backup file-picker workflow are listed as future work.",
        "Owe & Owed remains a browser-prototype feature.",
      ]),
      sourceNote:
        "Feature boundaries come from the public repository README. No financial outcomes or download counts are claimed.",
      featured: false,
    },
    sources: [{ projectId: 0, type: "source", href: "https://github.com/bhuvan5821n/Finance-app", label: "Explore source on GitHub" }],
    media: [],
    technologies: [
      { projectId: 0, technology: "Kotlin" },
      { projectId: 0, technology: "Jetpack Compose" },
      { projectId: 0, technology: "Room" },
      { projectId: 0, technology: "WorkManager" },
    ],
  },
  {
    project: {
      slug: "markwell",
      name: "Markwell",
      description:
        "A multi-page website connecting corrugated packaging products with clear quote and contact paths.",
      status: "Built",
      category: "Web & business",
      role: "Website developer",
      problem:
        "Industrial buyers need product information and a practical way to specify packaging requirements.",
      engineering:
        "Next.js and TypeScript pages connect a product catalog, request-for-quote forms and server-side lead handling.",
      implemented: JSON.stringify([
        "Product and industry pages",
        "Request-for-quote and contact forms",
        "Per-page metadata and structured data",
      ]),
      decisions: JSON.stringify([
        "Collect dimensions, quantity, printing and delivery details in the quote flow.",
        "Provide multiple contact paths for different buyer needs.",
      ]),
      tools: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer"]),
      result:
        "Public source and a documented website URL are available. Business conversion or revenue results are not published.",
      limitations: JSON.stringify(["Email delivery depends on SMTP configuration."]),
      sourceNote:
        "The public repository credits Bhuvan Gowda P as developer. Company metrics are not personal project impact.",
      featured: false,
    },
    sources: [
      { projectId: 0, type: "source", href: "https://github.com/bhuvan5821n/Markwell", label: "Explore source on GitHub" },
      { projectId: 0, type: "live site", href: "https://markwellpackaging.netlify.app/", label: "Visit Markwell" },
    ],
    media: [],
    technologies: [
      { projectId: 0, technology: "Next.js" },
      { projectId: 0, technology: "TypeScript" },
      { projectId: 0, technology: "Tailwind CSS" },
      { projectId: 0, technology: "Nodemailer" },
    ],
  },
  {
    project: {
      slug: "fleetmind",
      name: "FleetMind AI",
      description:
        "A proposed approach to maintenance-risk decisions for commercial fleets.",
      status: "Concept study",
      category: "Product concepts",
      context: "Product and business concept.",
      featured: false,
    },
    sources: [],
    media: [],
    technologies: [],
  },
  {
    project: {
      slug: "grain-za",
      name: "Grain-Za",
      description:
        "A concept study for a grain-based snack bar, its packaging and its business story.",
      status: "Concept study",
      category: "Product concepts",
      context: "Product concept.",
      featured: false,
    },
    sources: [],
    media: [],
    technologies: [],
  },
  {
    project: {
      slug: "space-shooter",
      name: "Space Shooter",
      description:
        "A small arcade game project whose implementation details are being documented.",
      status: null,
      category: "Small games",
      featured: false,
    },
    sources: [],
    media: [],
    technologies: [],
  },
  {
    project: {
      slug: "procedural-frontier",
      name: "Procedural Frontier",
      description:
        "An experiment asking how a generated world can keep inviting exploration.",
      status: "Experiment",
      category: "Small games",
      featured: false,
    },
    sources: [],
    media: [],
    technologies: [],
  },
  {
    project: {
      slug: "portfolio-evolution",
      name: "Portfolio evolution",
      description:
        "From an early personal site to a tactile workspace, then a seasonal archive built for the phone in your hand.",
      status: "Built",
      category: "Web & business",
      problem:
        "A portfolio needs to explain a builder's range without forcing every idea into the same software-project card.",
      why: "This archive brings technical systems, business thinking, music and storytelling into one connected personal world.",
      engineering:
        "Next.js server-rendered content meets a bounded canvas frame renderer, a recursive SVG tree and accessible navigation.",
      implemented: JSON.stringify([
        "Five seasonal routes",
        "160-frame adaptive scroll sequence",
        "Source-backed project and creative records",
      ]),
      decisions: JSON.stringify([
        "Keep all 160 source frames; adapt delivery instead.",
        "Keep normal navigation alongside a seasonal map.",
        "Make mobile a first-class composition.",
      ]),
      tools: JSON.stringify(["Next.js", "React", "TypeScript", "Canvas", "SVG"]),
      result:
        "The current archive can be explored locally. The source link documents the earlier public portfolio.",
      limitations: JSON.stringify([
        "Portfolio 1.0 source was not present in the local reference folder.",
        "Current deployment is intentionally withheld.",
      ]),
      sourceNote:
        "Older portfolio files are read-only references. This project's mathematical systems belong to the portfolio itself.",
      featured: true,
    },
    sources: [{ projectId: 0, type: "source", href: "https://github.com/bhuvan5821n/Portfolio", label: "Explore source on GitHub" }],
    media: [],
    technologies: [
      { projectId: 0, technology: "Next.js" },
      { projectId: 0, technology: "React" },
      { projectId: 0, technology: "TypeScript" },
    ],
  },
];
