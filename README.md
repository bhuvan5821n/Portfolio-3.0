# Portfolio 3.0 — CHRONO//ROOTS

The personal portfolio of **Bhuvan Gowda P**: a seasonal archive connecting AI, software, business, experimentation, music, and storytelling.

## What is inside

- A responsive Next.js 16 and React 19 frontend written in TypeScript
- CHRONO//ROOTS seasonal environments for projects, experiments, achievements, and profile work
- A bounded 160-frame, scroll-controlled portrait sequence with reduced-motion and low-data fallbacks
- Verified project records, including the FRIDAY personal assistant and B.G. Finance Android application
- Technical Arsenal sections covering AI/LLM workflows, software engineering, and web development
- WEBTOON and Spotify creative work with source links
- A Fastify and TypeScript Portfolio API with SQLite persistence, validation, and local-content fallbacks
- Prepared adapters for Trigger.dev, GitHub, Spotify, and PostgreSQL; external providers remain disabled without credentials
- Playwright interaction, responsive, runtime, and accessibility coverage

## Local development

Use a current Node.js version supported by Next.js 16.

```powershell
npm install
npm run dev
```

Run the API in a second terminal:

```powershell
cd backend
npm install
npm run dev
```

The frontend defaults to `http://localhost:3000`; the API defaults to `http://127.0.0.1:3001`. Copy the safe `.env.example` templates when local overrides are needed. Never commit populated environment files.

## Validation

Frontend:

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Backend:

```powershell
cd backend
npm run typecheck
npm run test
npm run build
```

When the API is unavailable, public pages retain the verified local content. The contact form reports the outage and keeps the email route available.

## Content and media

Project claims stay tied to inspectable sources. Generated seasonal scenes are presentation assets, while real evidence such as the FRIDAY interface is labeled separately. The original 160-frame sequence and required production media live under `public/media/`.

No deployment is included in this repository setup.
