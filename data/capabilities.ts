export type CapabilityEvidence = {
  route: string;
  label: string;
  detail: string;
};

export type CapabilityStage = "Hands-on" | "Building" | "Exploring";

export type CapabilityLanguage = {
  name: string;
  stage: "Built with" | "Used in projects" | "Hands-on";
  project: string;
  source: string;
};

export type CreatorCapability = {
  id: "editing" | "visual" | "ai" | "engineering" | "web" | "business" | "interactive";
  name: string;
  shortDescription: string;
  stage: CapabilityStage;
  stageDetail: string;
  statement: string;
  actions: readonly string[];
  workingSet: readonly string[];
  evidence: readonly CapabilityEvidence[];
  evidenceNote: string;
  headline?: string;
  languages?: readonly CapabilityLanguage[];
  tools?: readonly string[];
};

export type LearningInterest = {
  name: string;
  detail: string;
  relatedProjectSlugs: readonly string[];
};

export const creatorCapabilities = [
  {
    id: "editing",
    name: "Video editing",
    shortDescription: "Pace, sound, text and story.",
    stage: "Hands-on",
    stageDetail: "I actively practise this.",
    statement:
      "I turn raw clips into clear, energetic stories by controlling rhythm, sound and what the viewer notices next.",
    actions: [
      "Cutting and pacing",
      "Transitions with a purpose",
      "Subtitles and on-screen text",
      "Audio cleanup and timing",
      "Short-form story structure",
    ],
    workingSet: ["Video editing", "Short-form content", "Visual storytelling"],
    evidence: [],
    evidenceNote: "Editing samples are the next real artifacts to add here.",
  },
  {
    id: "visual",
    name: "Visual design",
    shortDescription: "Images that make ideas easier to see.",
    stage: "Hands-on",
    stageDetail: "I actively practise this.",
    statement:
      "I build the visual layer around an idea so it becomes easier to understand and more enjoyable to look at.",
    actions: [
      "Thumbnail composition",
      "Poster and social layouts",
      "Presentation design",
      "Image editing",
      "Interface composition",
    ],
    workingSet: ["Thumbnails", "Posters", "Presentations", "Image editing"],
    evidence: [
      {
        route: "/achievements",
        label: "See presentations",
        detail: "Presentation records are being organized.",
      },
    ],
    evidenceNote: "More visual samples will be connected as they are organized.",
  },
  {
    id: "ai",
    name: "AI creation & systems",
    headline: "AI & Intelligent Systems",
    shortDescription: "Assistants, workflows and useful experiments.",
    stage: "Building",
    stageDetail: "I use this in current projects.",
    statement:
      "I build assistants and automation around LLMs, context, tools and real computer workflows. FRIDAY brings those parts together in a desktop prototype.",
    actions: [
      "Model routing for text and vision, with configurable overrides",
      "Prompt construction and selected long-term context",
      "Voice and screen inputs connected to model sessions",
      "Asynchronous browser actions and structured tool calls",
      "Local commands alongside AI-assisted workflows",
    ],
    workingSet: [
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
    ],
    evidence: [
      {
        route: "/projects/friday",
        label: "Open FRIDAY",
        detail: "Python, PyQt6, OmniRoute, Gemini Live, memory and Playwright action modules.",
      },
      {
        route: "/projects/hackscout",
        label: "Explore HackScout",
        detail: "WebCMD-based discovery, deterministic ranking and verified-snapshot fallback.",
      },
    ],
    evidenceNote: "Supported by application source and documentation. FRIDAY remains a prototype; HackScout’s ranking is deterministic, not an LLM inference.",
  },
  {
    id: "engineering",
    name: "Code & engineering",
    headline: "Code & engineering",
    shortDescription: "Languages, systems and tools that turn ideas into software.",
    stage: "Building",
    stageDetail: "Project use, with evidence for each language.",
    statement: "I move between languages as the problem changes: Python for assistants and automation, TypeScript for interfaces, Kotlin for Android, and hands-on C++ work in the audio capture layer.",
    actions: [
      "Python desktop applications and workflow automation",
      "JavaScript / TypeScript interfaces and API logic",
      "Native Android development with Kotlin",
      "Asynchronous tasks and browser-tool integration",
      "Debugging and regression tests around real workflows",
    ],
    workingSet: ["PyQt6", "asyncio", "Jetpack Compose", "Room", "WorkManager"],
    languages: [
      {name:"Python",stage:"Built with",project:"FRIDAY",source:"https://github.com/bhuvan5821n/Friday-and-Jarvis/blob/main/main.py"},
      {name:"JavaScript",stage:"Built with",project:"HackScout",source:"https://github.com/bhuvan5821n/HackScout-AI/blob/main/server.js"},
      {name:"TypeScript",stage:"Built with",project:"Markwell",source:"https://github.com/bhuvan5821n/Markwell/blob/main/app/page.tsx"},
      {name:"Kotlin",stage:"Used in projects",project:"B.G. Finance",source:"https://github.com/bhuvan5821n/Finance-app/blob/main/app/src/main/java/com/ledger/finance/MainActivity.kt"},
      {name:"C++",stage:"Hands-on",project:"FRIDAY / SpeechCore",source:"https://github.com/bhuvan5821n/Friday-and-Jarvis/blob/main/SpeechCore/src/speechcore.cpp"},
      {name:"HTML",stage:"Built with",project:"HackScout",source:"https://github.com/bhuvan5821n/HackScout-AI/blob/main/public/index.html"},
      {name:"CSS",stage:"Built with",project:"HackScout",source:"https://github.com/bhuvan5821n/HackScout-AI/blob/main/public/style.css"},
    ],
    tools: ["Git", "GitHub", "VS Code", "PowerShell"],
    evidence: [
      {route:"/projects/friday",label:"Inside FRIDAY",detail:"Desktop architecture, model routing and the boundary between tool execution and verified results."},
      {route:"/projects/finance-tracker",label:"Inside B.G. Finance",detail:"Compose interfaces, local Room persistence and separately implemented parsing and backup layers."},
    ],
    evidenceNote: "Language links open actual source files. C++ evidence is scoped to SpeechCore’s audio capture and Python bridge; no broader systems expertise is claimed.",
  },
  {
    id: "web",
    name: "Web building",
    headline: "Interfaces that hold together.",
    shortDescription: "Interfaces, prototypes and working pages.",
    stage: "Building",
    stageDetail: "I use this in current projects.",
    statement:
      "I build responsive interfaces and connect them to useful application logic, from Next.js product pages to an Express discovery API. The whole journey matters: information, interaction and a clear next step.",
    actions: [
      "React and Next.js interfaces with responsive layouts",
      "Node.js / Express endpoints and source validation",
      "Quote and contact flows with server-side handling",
      "Page metadata and structured data",
      "Playwright browser and accessibility checks in this portfolio",
    ],
    workingSet: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Playwright",
    ],
    evidence: [
      {
        route: "/projects/markwell",
        label: "Open Markwell",
        detail: "Next.js, React and TypeScript product pages, quote flows and SMTP lead handling.",
      },
      {
        route: "/projects/hackscout",
        label: "Open HackScout",
        detail: "Node.js and Express connect a JavaScript interface to validated WebCMD retrieval.",
      },
      {
        route: "/projects/portfolio-evolution",
        label: "Explore this portfolio",
        detail: "Server-rendered content, responsive CSS and Playwright interaction checks.",
      },
    ],
    evidenceNote: "The stacks above are supported by package manifests and implementation. Source availability does not imply a measured business outcome.",
  },
  {
    id: "business",
    name: "Product & business",
    shortDescription: "Ideas, positioning and clear communication.",
    stage: "Building",
    stageDetail: "I practise this through study and projects.",
    statement:
      "My business background helps me ask who an idea is for, why it matters and how to explain it without hiding behind technical language.",
    actions: [
      "Product thinking",
      "Pitching",
      "Marketing",
      "Distribution thinking",
      "Business modelling and presentation",
    ],
    workingSet: [
      "Product concepts",
      "Pitch decks",
      "Positioning",
      "Business models",
      "Presentations",
    ],
    evidence: [
      {
        route: "/projects/fleetmind",
        label: "Open FleetMind",
        detail: "A product and business concept study.",
      },
      {
        route: "/projects/grain-za",
        label: "Open Grain-Za",
        detail: "A packaging and business-story concept.",
      },
    ],
    evidenceNote: "These are labeled as concept studies until stronger proof is available.",
  },
  {
    id: "interactive",
    name: "Games & future tech",
    shortDescription: "The ideas I am curious enough to chase.",
    stage: "Exploring",
    stageDetail: "I am learning and experimenting here.",
    statement:
      "I explore interactive systems that can react, generate or move, even when the first version is rough and mostly teaches me what to try next.",
    actions: [
      "Game systems",
      "Procedural generation",
      "Voice systems",
      "Robotics and embedded systems",
      "Physical AI",
    ],
    workingSet: [
      "Small games",
      "Procedural worlds",
      "Voice experiments",
      "Robotics",
      "Embedded systems",
      "Physical AI",
    ],
    evidence: [
      {
        route: "/projects/space-shooter",
        label: "Open Space Shooter",
        detail: "A small arcade project being documented.",
      },
      {
        route: "/projects/procedural-frontier",
        label: "Open Procedural Frontier",
        detail: "A procedural-world experiment.",
      },
    ],
    evidenceNote: "These remain experiments until working captures or source are published.",
  },
] as const satisfies readonly CreatorCapability[];

export const currentlyLearning = [
  {
    name: "AI assistants",
    detail: "Exploring voice, contextual memory and tool use.",
    relatedProjectSlugs: ["friday"],
  },
  {
    name: "Small game systems",
    detail: "Exploring compact arcade loops and procedural generation.",
    relatedProjectSlugs: ["space-shooter", "procedural-frontier"],
  },
  {
    name: "Web interfaces",
    detail: "Learning how to make information easier to understand and navigate.",
    relatedProjectSlugs: ["markwell"],
  },
  {
    name: "Product concepts",
    detail: "Exploring positioning, packaging and validation questions.",
    relatedProjectSlugs: ["fleetmind", "grain-za"],
  },
] as const satisfies readonly LearningInterest[];
