# Portfolio 3.0 Backend

CHRONO//ROOTS backend API serving portfolio content to the frontend.

## Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Fastify v5
- **Database**: SQLite via sql.js (WASM) — no native compilation required
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Testing**: Vitest with Fastify injection
- **Automation**: Trigger.dev (optional, graceful degradation)

## Quick Start

```bash
cd backend
npm install
npm run dev
```

API runs on `http://localhost:3001`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm test` | Run tests |
| `npm run lint` | Type check |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/system/public` | Public system info |
| GET | `/api/v1/profile` | Portfolio profile |
| GET | `/api/v1/projects` | List projects |
| GET | `/api/v1/projects/:slug` | Project detail |
| GET | `/api/v1/capabilities` | List capabilities |
| GET | `/api/v1/achievements` | List achievements |
| GET | `/api/v1/creative` | List creative works |
| GET | `/api/v1/creative/:slug` | Creative work detail |
| GET | `/api/v1/signals` | Signal feed |
| POST | `/api/v1/contact` | Submit contact form |

## Environment

Copy `.env.example` to `.env`. All variables are optional for local development.

## Database

SQLite database is created automatically at `data/portfolio.db`. Seed data is imported on first run.

## Architecture

```
src/
├── config/          Environment validation
├── database/        Drizzle schema + SQLite init
├── repositories/    Data access layer
├── services/        Business logic
├── providers/       External integrations
├── routes/v1/       API route handlers
├── schemas/         Zod validation schemas
├── middleware/       Security, error handling
├── automation/      Trigger.dev tasks
└── seed/            Seed data from Portfolio 3.0
```
