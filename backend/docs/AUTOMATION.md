# Automation

## Trigger.dev Integration

The backend includes Trigger.dev as the primary background automation layer. It works in disabled mode when `TRIGGER_SECRET_KEY` is not set.

## Tasks

| Task | Schedule | Description |
|------|----------|-------------|
| `sync-github-projects` | Every 6 hours | Refresh GitHub repository metadata |
| `refresh-creative-metadata` | Daily | Refresh Spotify/WEBTOON metadata |
| `rebuild-signal-feed` | Daily | Rebuild factual activity timeline |
| `portfolio-content-health-check` | Daily | Check public URLs for broken links |
| `contact-notification` | On contact | Process contact form submissions |
| `refresh-public-cache` | Every 4 hours | Refresh integration cache |
| `cleanup-maintenance` | Daily | Clean temporary/cache records |

## Disabled Mode

When Trigger.dev is not configured:
- `AutomationService.isEnabled()` returns `false`
- All task triggers return `null`
- Core API remains fully functional
- No errors are thrown

## Configuration

Set `TRIGGER_SECRET_KEY` environment variable to enable Trigger.dev integration.

## Schedules (Not Deployed)

Schedules are documented but not deployed. Configure in Trigger.dev dashboard when ready.
