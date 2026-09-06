# Content verification matrix

Last audited: 2026-08-13

This file separates user-supplied baseline copy from independently observable evidence. Missing values remain `null` in production data. Missing links and media must be omitted rather than rendered as disabled actions or mock evidence.

Verification states used below:

- **Missing:** no usable source is present.
- **User-supplied, unverified:** a previous data file made the claim, but no supporting artifact is present.
- **Partially verified:** part of the statement is observable, but ownership, scope, or maturity remains unclear.
- **Externally observable:** the linked public resource was reachable during the audit.
- **Concern confirmed:** a specific asset or source issue was directly observed.

## Identity, opportunity, contact, and site origin

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/` and `/profile` | Target role | Prevents the portfolio from implying an unsupported professional title | The exact role or roles being sought | None | Missing |
| `/` and `/profile` | Opportunity type | Tells visitors whether internships, projects, freelance work, or other opportunities are relevant | Approved opportunity types | None | Missing |
| `/profile` | Official institution | The previous shorthand may not be the institution's official public name | Official institution name and permission to publish it | Previous profile data said `Christ Academy` | User-supplied, unverified |
| `/profile` | Exact program | `BBA` does not identify the official program title or specialization | Official program name and specialization, if any | Previous profile data said `BBA` | User-supplied, unverified |
| `/profile` | Current study year | The prior `second-year` claim can become stale | Current year or semester and the date it was confirmed | Previous profile data said `Second-year` | User-supplied, unverified |
| `/profile` | Expected graduation | Helps internship readers understand timing | Expected month and year | None | Missing |
| `/profile` | Availability | Prevents visitors from guessing start dates or time commitment | Availability date and any study constraints | None | Missing |
| `/profile` | Preferred work location | Distinguishes current location from remote or relocation preference | Remote, Bengaluru, hybrid, relocation, or another approved preference | None | Missing |
| `/profile` | Current location confirmation | Location is useful but should not be inferred from school or deployment data | Confirm that `Bengaluru, India` is current and approved for publication | Previous profile data | User-supplied, unverified |
| `/profile` and contact sections | Professional email | A public contact action must use an address Bhuvan owns and approves | Preferred public email plus explicit approval to publish it | A Gmail address existed in the previous profile data but was not verified | User-supplied, unverified |
| `/profile` and navigation | Resume | A resume action must point to a current real document | Accessible PDF, file size, last-updated date, and approval to publish | None | Missing |
| `/profile` | LinkedIn or another approved profile | Only verified social links should appear | Exact public URL and approval to display it | None | Missing |
| `/profile` | GitHub ownership and display approval | The URL resolves, but identity ownership still needs confirmation | Confirm ownership of `bhuvan5821n` and whether it should appear publicly | Public GitHub profile and previous profile data | Partially verified |
| All routes | Canonical site origin | Canonicals, sitemap, robots, and social links need one working production origin | Confirm the production URL and later confirm any custom domain | Brief names the Netlify deployment; `bhuvangowda.dev` had no DNS record during the audit | Partially verified |
| All routes | Stable content dates | Sitemap and structured data should not use a new timestamp on every build | A real last-modified date for each route and project | None | Missing |
| All routes | Portrait and likeness permission | The intro prominently uses a recognizable portrait | Confirm the subject, creator, source, and permission to publish | Supplied frame sequence | User-supplied, unverified |

## Cross-project fields

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| All six project routes | Year | Establishes chronology and keeps project ordering honest | Completion or active year for each project | None | Missing |
| All six project routes | Duration | Provides useful scope without invented complexity | Start and end dates or approximate duration for each project | None | Missing |
| All six project routes | Role | Separates Bhuvan's work from the project idea | Exact role and responsibilities for each project | None | Missing |
| All six project routes | Team | Prevents first-person copy from claiming team work | Solo or team status, names or roles, and permission to identify collaborators | None | Missing |
| All six project routes | Target user | Grounds each case study in a real or intended audience | Intended user and whether that audience was researched | None | Missing |
| All six project routes | Context | Distinguishes personal, academic, family, client, event, and commercial work | Project context and any naming permissions | Sparse previous project copy | User-supplied, unverified |
| All six project routes | Contribution | Makes the case study useful without overstating ownership | Concrete tasks Bhuvan personally completed | None | Missing |
| All six project routes | Implemented work | Separates working features from concept diagrams | A feature inventory tied to source, capture, or another artifact | Previous project copy only | User-supplied, unverified |
| All six project routes | Testing | Prevents proposed behavior from appearing validated | Test method, participants or setup, findings, and date | None | Missing |
| All six project routes | Planned work | Keeps future ideas separate from current behavior | Confirmed next features or experiments | Previous `next` strings had no supporting source | User-supplied, unverified |
| All six project routes | Decisions | Shows reasoning rather than generic project description | Two or three real decisions, alternatives, and reasons | None | Missing |
| All six project routes | Tools | Tool names should reflect actual use, not an aspirational ecosystem | Exact tools, versions where relevant, and evidence of use | Previous project technology lists | User-supplied, unverified |
| All six project routes | Real screenshots or captures | Decorative Mission Room art is not project evidence | Original screenshots, gameplay captures, photos, or exports with captions | No project media exists under `public/media` outside the intro | Missing |
| All six project routes | Demo links | Visitors should only see actions that work | Stable demo URL and confirmation of public access | None | Missing |
| All six project routes | Source links | Source CTAs must lead to substantive public material | Repository URL, license or access state, and confirmation it contains the claimed work | No project source links in production data | Missing |
| All six project routes | Result | A status is not a result | Current condition and any evidence-backed result | Previous `outcome` strings were mostly maturity descriptions | User-supplied, unverified |
| All six project routes | Feedback | Feedback cannot be implied without a source | Who gave feedback, what they said in paraphrase, and permission to share it | None | Missing |
| All six project routes | Learning | Learning statements should come from Bhuvan, not be inferred | One concrete reflection per project | None | Missing |
| All six project routes | Limitations | Clarifies maturity and avoids inflated case studies | Known technical, design, evidence, or scope limits | None | Missing |
| All six project routes | Next step | Must describe a real intended test, not filler | The next action Bhuvan actually intends to take | Previous `next` strings only | User-supplied, unverified |

## FRIDAY

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/projects/friday` | Current maturity confirmation | `Experiment` is a conservative category, not proof of a working artifact | Confirm whether any functioning prototype currently exists | A public GitHub repository named `Friday` was visible, but its contents were not retrievable during the audit | Partially verified |
| `/projects/friday` | Origin question | A case study needs the question that started the work | Bhuvan's own one-sentence origin question | None | Missing |
| `/projects/friday` | Intended use | A personal assistant can cover many unrelated needs | The exact intended task or situation | None | Missing |
| `/projects/friday` | What works now | Voice, memory, tools, and connectivity must not be implied by decorative UI | A tested feature list with a capture or source reference | Previous data claimed these capabilities without evidence | User-supplied, unverified |
| `/projects/friday` | What is being tested | Distinguishes active experiments from completed behavior | Current test, setup, and observed behavior | None | Missing |
| `/projects/friday` | What is planned | Keeps the roadmap separate from implementation | Confirmed planned features | None | Missing |
| `/projects/friday` | Real input-to-result example | Demonstrates actual behavior better than an architecture diagram | One reproducible input, intermediate behavior, and result | None | Missing |
| `/projects/friday` | Actual tools | Mem0, LiveKit, MCP, APIs, and Gmail must not appear as implemented without proof | Repository files, configuration, or a precise tool inventory | Previous project data | User-supplied, unverified |
| `/projects/friday` | Memory behavior | Memory scope and controls are central to the concept | What is stored, where, for how long, and how it is cleared | None | Missing |
| `/projects/friday` | Permissions and safety | Tool execution and account access require honest boundaries | Permission flow, confirmation steps, secrets handling, and disabled actions | None | Missing |
| `/projects/friday` | Limitations | Prevents an assistant experiment from reading as a general product | Known failure modes, unsupported tasks, and privacy limits | None | Missing |
| `/projects/friday` | Demo, video, or source | Supports claims visitors cannot otherwise inspect | A substantive public repository, demo, or short real capture | Public repository name only | Missing |

## FleetMind AI

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/projects/fleetmind` | Intended user | `Commercial fleets` is too broad for a decision workflow | Fleet size, user role, and operating context | Previous project copy | User-supplied, unverified |
| `/projects/fleetmind` | Source of the problem | The concept must not imply fleet-operator research that did not happen | Observation, research source, interview, class brief, or event prompt | None | Missing |
| `/projects/fleetmind` | Assumptions | Makes the concept's uncertainty explicit | Sensor, data quality, adoption, maintenance, and business assumptions | None | Missing |
| `/projects/fleetmind` | Proposed telemetry flow | The flow can be shown as a proposal without pretending it runs | Inputs, transformations, decision point, and intended output | Previous copy named generic telemetry and analytics | User-supplied, unverified |
| `/projects/fleetmind` | Pitch or concept artifacts | A real deck is stronger evidence than decorative score panels | Original deck, diagrams, notes, or event material with captions | None | Missing |
| `/projects/fleetmind` | Business-model assumptions | Exact pricing was previously shown without explanation | Cost basis, pricing rationale, unit assumptions, and validation state | Previous data listed exact prices without a source | User-supplied, unverified |
| `/projects/fleetmind` | Risks | Predictive maintenance has data, safety, and trust risks | The main technical and adoption risks Bhuvan identified | None | Missing |
| `/projects/fleetmind` | Validation plan | A concept study should say what must be tested first | First operator conversation, data test, or feasibility check | None | Missing |
| `/projects/fleetmind` | Presentation record | The presentation cannot be called verified without event facts | Exact event, date, organizer, role, result, and proof | Two previous field-log entries may describe the same presentation | User-supplied, unverified |

## Grain-Za

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/projects/grain-za` | Artifact inventory | `Built` cannot be used until the deliverable is known | Confirm whether a physical bar, recipe, package, identity, pitch, pricing model, landing page, or only a concept exists | Previous project copy | User-supplied, unverified |
| `/projects/grain-za` | Prototype and testing state | A package concept is different from a prepared and tested product | Prototype photos, preparation notes, test method, participants, and findings | None | Missing |
| `/projects/grain-za` | Ingredient basis | Ingredient visuals should reflect a real recipe rather than decoration | Confirmed ingredient list and whether it was ever prepared | Previous page named several ingredients without a source | User-supplied, unverified |
| `/projects/grain-za` | Nutrition or health sources | `Protein`, `superfood`, and benefit language can become unsupported health claims | Lab data, recipe calculation source, qualified review, or approval to omit all claims | Previous project copy only | Missing |
| `/projects/grain-za` | Packaging and brand evidence | Shows what was actually designed | Original wrapper, dieline, identity, or presentation export with captions | None | Missing |
| `/projects/grain-za` | Pricing and customer thinking | Business claims need assumptions and research context | Pricing model, comparison basis, audience, and any real feedback | None | Missing |

## Markwell

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/projects/markwell` | Project context | Determines whether the organization can be named and how ownership is described | Client, family, academic, or personal context plus naming permission | Previous project copy | User-supplied, unverified |
| `/projects/markwell` | Year and duration | Establishes when the website work occurred | Start, end, and approximate effort | None | Missing |
| `/projects/markwell` | Role and team | Separates Bhuvan's contribution from any existing company material | Exact tasks, collaborators, and permissions | None | Missing |
| `/projects/markwell` | Original business problem | Avoids inventing a manufacturing need after the fact | Original brief or stakeholder request | Previous project copy only | User-supplied, unverified |
| `/projects/markwell` | Audience | Supports information-architecture decisions | Intended customer or internal audience | None | Missing |
| `/projects/markwell` | Information architecture contribution | Clarifies what was designed rather than merely described | Sitemap, content model, wireframes, and Bhuvan's role | None | Missing |
| `/projects/markwell` | Design and development contribution | Required before calling the website built | Concrete pages, components, content, code, or deployment work | None | Missing |
| `/projects/markwell` | Live URL and current condition | A completed-site claim requires an inspectable current artifact | Public URL, access permission, and whether it is still maintained | None | Missing |
| `/projects/markwell` | Real screenshots | Decorative cartons and browser cards do not prove a website exists | Desktop and mobile captures with dates and captions | None | Missing |
| `/projects/markwell` | Result and limitations | Prevents `completed` from substituting for a real result | Current use, stakeholder response, incomplete areas, and constraints | None | Missing |
| `/projects/markwell` | Substantive source repository | The existing repository is not adequate evidence or a useful CTA | Add actual source with permission, or leave the source action omitted | Public repository contained one README with only `# Markwell` during the audit | Concern confirmed |

## Space Shooter

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/projects/space-shooter` | Current maturity | `Built` was unsupported by a capture or source artifact | Confirm whether the game runs and on which platform | Previous project status only | User-supplied, unverified |
| `/projects/space-shooter` | Engine, language, and platform | Establishes the real technical context | Exact engine, language, target platform, and versions where useful | None | Missing |
| `/projects/space-shooter` | Date and duration | Provides project scope | Start, end, and approximate duration | None | Missing |
| `/projects/space-shooter` | Core loop | Should describe real gameplay, not the decorative spacecraft | The actual player goal, actions, challenge, and end condition | Previous generic copy | User-supplied, unverified |
| `/projects/space-shooter` | Implemented systems | Movement, projectiles, enemies, collisions, and scoring were previously asserted without proof | Exact systems tied to source or capture | Previous project data | User-supplied, unverified |
| `/projects/space-shooter` | Technical or design challenge | Makes the case study specific | One real problem, attempted solution, and tradeoff | None | Missing |
| `/projects/space-shooter` | Gameplay capture | Provides direct evidence of the game | Original video or screenshots with a caption and date | None | Missing |
| `/projects/space-shooter` | Demo or source | Lets visitors inspect a real artifact | Working build or substantive public repository | None | Missing |
| `/projects/space-shooter` | Learning, limitation, and next iteration | Prevents generic completed-project copy | Bhuvan's concrete reflection, current limit, and intended next test | None | Missing |

## Procedural Frontier

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/projects/procedural-frontier` | Exact experiment question | The current safe description is provisional | Bhuvan's own question and intended player experience | Previous project copy | User-supplied, unverified |
| `/projects/procedural-frontier` | Technology | Establishes whether this is code, a design study, or another medium | Engine, language, libraries, and platform | None | Missing |
| `/projects/procedural-frontier` | Generation rules | Decorative outward-growing tiles must not imply the real algorithm | Rule set, chunk size, neighbor logic, and content constraints | Previous generic copy | User-supplied, unverified |
| `/projects/procedural-frontier` | Seed and state behavior | Important to reproducibility and continuity claims | Seed handling, save state, deterministic behavior, and reset behavior | None | Missing |
| `/projects/procedural-frontier` | Actual implementation | Separates the experiment idea from running generation | Implemented feature list tied to source or capture | Previous project copy asserted runtime expansion | User-supplied, unverified |
| `/projects/procedural-frontier` | Captured output | Shows what the generator really produces | Screenshots or video with seed or state context | None | Missing |
| `/projects/procedural-frontier` | Performance constraints | Runtime generation claims need a real operating envelope | Target hardware, frame rate observations, generation budget, or known bottleneck | None | Missing |
| `/projects/procedural-frontier` | Findings | An experiment should report what happened | Observations from real runs | None | Missing |
| `/projects/procedural-frontier` | Limitations and next test | Prevents an open-ended concept from sounding complete | Known failure case and the next rule to test | None | Missing |
| `/projects/procedural-frontier` | Demo, video, or source | Supports all implementation claims | Working build, real capture, or substantive repository | None | Missing |

## Presentations and participation

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/achievements` | Exact event names | Generic `hackathon` and `business presentation` labels are not verifiable records | Official name for every event | Previous field-log data | User-supplied, unverified |
| `/achievements` | Organizers | Establishes the event source | Official organizer for each event | None | Missing |
| `/achievements` | Dates | Orders the scrapbook and prevents stale chronology | Full date or at least month and year for each event | None | Missing |
| `/achievements` | Location or format | Distinguishes campus, online, classroom, and public events | Venue, city, online format, or classroom context | None | Missing |
| `/achievements` | Role | Explains what Bhuvan did | Speaker, participant, team member, finalist, or another exact role | None | Missing |
| `/achievements` | Team | Avoids using `I` for shared work | Team name, collaborators or roles, and publication permission | None | Missing |
| `/achievements` | Topic or project | Connects the record to meaningful work | Official topic, project name, and Bhuvan's contribution | FleetMind was named in two previous records | Partially verified |
| `/achievements` | Accurate result | Participation must not imply an award or ranking | Result, selection stage, award, or explicit `participated` status | None | Missing |
| `/achievements` | Concrete contribution or learning | Replaces generic presentation slogans with useful detail | One specific action or reflection per event | Previous generic descriptions | User-supplied, unverified |
| `/achievements` | Proof artifact | Required before presenting entries as verified | Certificate, event page, photo, deck, program, or article with permission | None | Missing |
| `/achievements` | Duplicate reconciliation | Prevents one FleetMind event from appearing as multiple achievements | Confirm whether the previous pitch and FleetMind presentation entries refer to the same event | Previous field-log entries FLD-04 and FLD-05 | User-supplied, unverified |

Until these fields are supplied, the route should use: `Detailed presentation records are being organized.`

## Experiments and media

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/lab` | Synthetic-media artifacts | Product names and generic contact sheets do not prove an experiment | Original prompt, input, output, iteration notes, and publication rights | Previous lab copy named Gemini workflows | User-supplied, unverified |
| `/lab` | Automation artifacts | An automation section needs a distinct real test | Name, question, setup, output, learning, and source or capture | None | Missing |
| `/lab` | Voice-system artifacts | Voice should not be presented as implemented through FRIDAY alone | Real input and output capture, tools, and limitations | Previous FRIDAY copy | User-supplied, unverified |
| `/lab` | Robotics or hardware artifacts | A decorative circuit and `robotic car` statement are not evidence | Photos, parts list, code, wiring, test notes, and current condition | Previous lab copy | User-supplied, unverified |

Unsupported experiment areas should remain under `Currently learning` until evidence exists.

## Hero sequence and social media

| Route | Missing field | Why it matters | What Bhuvan must provide | Current source | Verification state |
| --- | --- | --- | --- | --- | --- |
| `/` | Frame creator and source | Needed for provenance and reuse permission | Creator, generation workflow or photographer, original source, and license | 160 supplied JPEG frames | Missing |
| `/` | Veo watermark decision | The watermark is baked into the supplied frames and must not be hidden or removed | Confirm that shipping watermarked frames is acceptable, or provide approved replacements | Watermark visible in inspected frames 1, 80, and 161 | Concern confirmed |
| `/` | Sequence continuity note | The manifest must continue to map actual files rather than assume contiguous numbering | Preserve the known missing source index and document any replacement | 160 files from indices 1 through 161; index 157 is absent | Externally observable |
| All routes | General social image | Open Graph and Twitter metadata need real artwork | Approved 1200 by 630 artwork and alt text | None | Missing |
| Project routes | Project social images | Generated art must not look like real project evidence | Approved project artwork clearly identified as decorative, or real evidence with permission | None | Missing |

## Production rendering rules

- Omit missing optional facts.
- Render `Project documentation in progress` when a status is `null`.
- Render `Visual documentation in progress` when project media is `null`.
- Do not render a link when its URL is missing or when the destination is not substantive.
- Treat every `missionRoom` object and interaction as decorative representation.
- Never infer `Built`, `Live`, users, results, awards, dates, tools, or technical behavior from decorative art.
- Keep FleetMind labeled `Concept study` and do not show invented telemetry, prediction scores, carbon values, or unexplained pricing.
- Keep Grain-Za free of nutrition and health claims until a source is supplied.
- Do not publish the previous email address until ownership and public-use approval are confirmed.
