import type { InferInsertModel } from "drizzle-orm";
import { capabilities, capabilityEvidence } from "../../database/schema.js";

type CapabilityInsert = InferInsertModel<typeof capabilities>;
type EvidenceInsert = InferInsertModel<typeof capabilityEvidence>;

type CapabilitySeed = {
  capability: CapabilityInsert;
  evidence: EvidenceInsert[];
};

export const capabilitiesSeed: CapabilitySeed[] = [
  {
    capability: {
      capId: "editing",
      name: "Video editing",
      shortDescription: "Pace, sound, text and story.",
      stage: "Hands-on",
      stageDetail: "I actively practise this.",
      statement:
        "I turn raw clips into clear, energetic stories by controlling rhythm, sound and what the viewer notices next.",
      actions: JSON.stringify([
        "Cutting and pacing",
        "Transitions with a purpose",
        "Subtitles and on-screen text",
        "Audio cleanup and timing",
        "Short-form story structure",
      ]),
      workingSet: JSON.stringify(["Video editing", "Short-form content", "Visual storytelling"]),
      evidenceNote: "Editing samples are the next real artifacts to add here.",
    },
    evidence: [],
  },
  {
    capability: {
      capId: "visual",
      name: "Visual design",
      shortDescription: "Images that make ideas easier to see.",
      stage: "Hands-on",
      stageDetail: "I actively practise this.",
      statement:
        "I build the visual layer around an idea so it becomes easier to understand and more enjoyable to look at.",
      actions: JSON.stringify([
        "Thumbnail composition",
        "Poster and social layouts",
        "Presentation design",
        "Image editing",
        "Interface composition",
      ]),
      workingSet: JSON.stringify(["Thumbnails", "Posters", "Presentations", "Image editing"]),
      evidenceNote: "More visual samples will be connected as they are organized.",
    },
    evidence: [
      { capabilityId: 0, route: "/achievements", label: "See presentations", detail: "Presentation records are being organized." },
    ],
  },
  {
    capability: {
      capId: "ai",
      name: "AI creation & systems",
      shortDescription: "Assistants, workflows and useful experiments.",
      stage: "Building",
      stageDetail: "I use this in current projects.",
      statement:
        "I build assistants and automation around LLMs, context, tools and real computer workflows. FRIDAY brings those parts together in a desktop prototype.",
      actions: JSON.stringify([
        "Model routing for text and vision, with configurable overrides",
        "Prompt construction and selected long-term context",
        "Voice and screen inputs connected to model sessions",
        "Asynchronous browser actions and structured tool calls",
        "Local commands alongside AI-assisted workflows",
      ]),
      workingSet: JSON.stringify([
        "LLM workflows",
        "Prompt engineering",
        "Model routing",
        "Tool use",
        "Context & memory",
        "Voice interfaces",
        "Screen awareness",
        "Browser automation",
        "Gemini",
        "Python",
      ]),
      evidenceNote: "Supported by application source and documentation. FRIDAY remains a prototype; HackScout's ranking is deterministic, not an LLM inference.",
    },
    evidence: [
      { capabilityId: 0, route: "/projects/friday", label: "Open FRIDAY", detail: "Python, PyQt6, OmniRoute, Gemini Live, memory and Playwright action modules." },
      { capabilityId: 0, route: "/projects/hackscout", label: "Explore HackScout", detail: "WebCMD-based discovery, deterministic ranking and verified-snapshot fallback." },
    ],
  },
  {
    capability: {
      capId: "engineering",
      name: "Code & engineering",
      shortDescription: "Languages, systems and tools that turn ideas into software.",
      stage: "Building",
      stageDetail: "Project use, with evidence for each language.",
      statement: "I move between languages as the problem changes: Python for assistants and automation, TypeScript for interfaces, Kotlin for Android, and hands-on C++ work in the audio capture layer.",
      actions: JSON.stringify([
        "Python desktop applications and workflow automation",
        "JavaScript / TypeScript interfaces and API logic",
        "Native Android development with Kotlin",
        "Asynchronous tasks and browser-tool integration",
        "Debugging and regression tests around real workflows",
      ]),
      workingSet: JSON.stringify(["Python", "JavaScript", "TypeScript", "Kotlin", "C++", "HTML", "CSS", "Git", "GitHub", "VS Code", "PowerShell"]),
      evidenceNote: "Language links in the frontend open actual source files. C++ evidence is scoped to SpeechCore's audio capture and Python bridge; no broader systems expertise is claimed.",
    },
    evidence: [
      { capabilityId: 0, route: "/projects/friday", label: "Inside FRIDAY", detail: "Desktop architecture, model routing and the boundary between tool execution and verified results." },
      { capabilityId: 0, route: "/projects/finance-tracker", label: "Inside B.G. Finance", detail: "Compose interfaces, local Room persistence and separately implemented parsing and backup layers." },
    ],
  },
  {
    capability: {
      capId: "web",
      name: "Web building",
      shortDescription: "Interfaces, prototypes and working pages.",
      stage: "Building",
      stageDetail: "I use this in current projects.",
      statement:
        "I turn ideas into responsive web interfaces and prototypes, learning the technical details by making the whole experience work.",
      actions: JSON.stringify([
        "Interface development",
        "Responsive layouts",
        "Interactive prototypes",
        "API integration",
        "Versioned project work",
      ]),
      workingSet: JSON.stringify([
        "Python",
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "APIs",
        "Git",
        "GitHub",
      ]),
      evidenceNote: "Project screenshots and exact implementation details still need to be added.",
    },
    evidence: [
      { capabilityId: 0, route: "/projects/markwell", label: "Open Markwell", detail: "A web project whose contribution is being documented." },
    ],
  },
  {
    capability: {
      capId: "business",
      name: "Product & business",
      shortDescription: "Ideas, positioning and clear communication.",
      stage: "Building",
      stageDetail: "I practise this through study and projects.",
      statement:
        "My business background helps me ask who an idea is for, why it matters and how to explain it without hiding behind technical language.",
      actions: JSON.stringify([
        "Product thinking",
        "Pitching",
        "Marketing",
        "Distribution thinking",
        "Business modelling and presentation",
      ]),
      workingSet: JSON.stringify([
        "Product concepts",
        "Pitch decks",
        "Positioning",
        "Business models",
        "Presentations",
      ]),
      evidenceNote: "These are labeled as concept studies until stronger proof is available.",
    },
    evidence: [
      { capabilityId: 0, route: "/projects/fleetmind", label: "Open FleetMind", detail: "A product and business concept study." },
      { capabilityId: 0, route: "/projects/grain-za", label: "Open Grain-Za", detail: "A packaging and business-story concept." },
    ],
  },
  {
    capability: {
      capId: "interactive",
      name: "Games & future tech",
      shortDescription: "The ideas I am curious enough to chase.",
      stage: "Exploring",
      stageDetail: "I am learning and experimenting here.",
      statement:
        "I explore interactive systems that can react, generate or move, even when the first version is rough and mostly teaches me what to try next.",
      actions: JSON.stringify([
        "Game systems",
        "Procedural generation",
        "Voice systems",
        "Robotics and embedded systems",
        "Physical AI",
      ]),
      workingSet: JSON.stringify([
        "Small games",
        "Procedural worlds",
        "Voice experiments",
        "Robotics",
        "Embedded systems",
        "Physical AI",
      ]),
      evidenceNote: "These remain experiments until working captures or source are published.",
    },
    evidence: [
      { capabilityId: 0, route: "/projects/space-shooter", label: "Open Space Shooter", detail: "A small arcade project being documented." },
      { capabilityId: 0, route: "/projects/procedural-frontier", label: "Open Procedural Frontier", detail: "A procedural-world experiment." },
    ],
  },
];
