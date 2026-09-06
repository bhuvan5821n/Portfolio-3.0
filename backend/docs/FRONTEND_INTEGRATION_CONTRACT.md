# Frontend Integration Contract

## Response Format

### Success
```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

---

## Endpoints

### GET /api/v1/health

**Response**: `{ status: "healthy", version: "1.0.0", timestamp: string }`
**Cache**: No cache
**SSR**: No
**Fallback**: Always available

---

### GET /api/v1/system/public

**Response**: `{ name: "CHRONO//ROOTS", version: "3.0.0", apiVersion: "v1", contentVersion: string }`
**Cache**: 1 hour
**SSR**: Yes
**Fallback**: Static values

---

### GET /api/v1/profile

**Response**: Profile object with education, contact, working method
**Cache**: 1 hour
**SSR**: Yes
**Fallback**: 404 if not seeded

---

### GET /api/v1/projects

**Query**: `?featured=true&category=ai&limit=50&offset=0`
**Response**: Array of project summaries with meta `{ total, limit, offset }`
**Cache**: 30 minutes
**SSR**: Yes
**Fallback**: Empty array

---

### GET /api/v1/projects/:slug

**Response**: Full project detail with sources, media, technologies
**Cache**: 30 minutes
**SSR**: Yes
**Fallback**: 404

---

### GET /api/v1/capabilities

**Response**: Array of capabilities with evidence links
**Cache**: 1 hour
**SSR**: Yes
**Fallback**: Empty array

---

### GET /api/v1/achievements

**Response**: Array of achievements
**Cache**: 1 hour
**SSR**: Yes
**Fallback**: Empty array

---

### GET /api/v1/creative

**Query**: `?type=music&limit=50&offset=0`
**Response**: Array of creative works
**Cache**: 30 minutes
**SSR**: Yes
**Fallback**: Empty array

---

### GET /api/v1/creative/:slug

**Response**: Full creative work detail with sources
**Cache**: 30 minutes
**SSR**: Yes
**Fallback**: 404

---

### GET /api/v1/signals

**Query**: `?type=BUILD&limit=10&offset=0`
**Response**: Array of signals ordered by date desc
**Cache**: 15 minutes
**SSR**: Yes
**Fallback**: Empty array

---

### POST /api/v1/contact

**Body**: `{ name, email, subject, message, honeypot? }`
**Response**: `{ id, message }`
**Cache**: Never
**SSR**: No
**Fallback**: Rate limit or validation error

---

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| NOT_FOUND | 404 | Route not found |
| PROJECT_NOT_FOUND | 404 | Project slug not found |
| CREATIVE_NOT_FOUND | 404 | Creative work slug not found |
| PROFILE_NOT_FOUND | 404 | Profile not seeded |
| VALIDATION_ERROR | 400 | Invalid request input |
| INVALID_QUERY | 400 | Invalid query parameters |
| INVALID_PARAMS | 400 | Invalid path parameters |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |
