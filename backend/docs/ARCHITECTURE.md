# Architecture

## Overview

Portfolio 3.0 backend serves verified content to the CHRONO//ROOTS frontend through a REST API.

## Request Flow

```
Frontend → Fastify Router → Zod Validation → Service Layer → Repository → SQLite
                                        ↓
                              Error Handler → Standard Error Envelope
```

## Layer Responsibilities

### Routes (`routes/v1/`)
HTTP handlers. Parse request, validate input, call services, format response. No business logic.

### Services (`services/`)
Business logic. Transform database rows into API responses. Orchestrate provider calls.

### Repositories (`repositories/`)
Data access. Drizzle ORM queries. No HTTP or business logic.

### Providers (`providers/`)
External integrations. GitHub, Spotify, WEBTOON, contact notification, cache, automation.

### Schemas (`schemas/`)
Zod validation schemas for request input.

### Database (`database/`)
Drizzle schema definition, SQLite initialization, table creation.

## Design Principles

1. **Graceful degradation**: Every external dependency has a local fallback
2. **No secrets in code**: Environment variables for all credentials
3. **Verified content only**: Seed data comes from actual Portfolio 3.0 sources
4. **Clean errors**: Standard envelope format, no stack traces in production
5. **Repository pattern**: No SQL in HTTP handlers
