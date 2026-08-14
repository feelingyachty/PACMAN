# Weekly Monday documentation update

**Schedule:** Every Monday at **09:00 America/Bogota** (14:00 UTC).

## Goal

Keep PACMAN mirrors of WordPress, Elementor, and GoHighLevel documentation current so agents always have fresh official guidance alongside Feeling Yachty’s live GHL/n8n architecture docs.

## What gets refreshed

| Source | URLs / roots | Destination |
|--------|--------------|-------------|
| WordPress Developer Handbook | `developer.wordpress.org`, `wordpress.org/documentation` | `docs/wordpress/official/` |
| Elementor | `developers.elementor.com`, `elementor.com/help` | `docs/elementor/official/` |
| GoHighLevel API | `marketplace.gohighlevel.com/docs`, `highlevel.stoplight.io/docs/integrations` | `docs/ghl/official/` |
| GoHighLevel Help / Blog / Ideas | `help.gohighlevel.com`, `gohighlevel.com/blog`, `ideas.gohighlevel.com` | `docs/ghl/official/` |
| Live n8n inventory | `n8n-api` MCP / instance | `docs/n8n/WORKFLOW_INVENTORY.md` (manual/agent refresh) |

## How it runs

1. **GitHub Actions** — `.github/workflows/weekly-docs-update.yml` (cron `0 14 * * 1`)
2. **Local / cloud agent** — `scripts/weekly-docs-update.sh`
3. **n8n reminder** — workflow `Feeling Yachty - Monday Docs Refresh Reminder` (`XjPh1Q5NKeUG3lcq`) posts to `#n8n-errors` every Monday 09:00 America/Bogota
4. **Slack DM reminders** — scheduled Monday DMs to Feeling Yachty (backup nudge)
5. **Firecrawl monitors** (preferred once `FIRECRAWL_API_KEY` is set) — change detection on docs hubs with goal: *substantive docs/API/changelog updates only*

## Operator checklist (Mondays)

- [ ] Run or confirm Actions/script refresh succeeded
- [ ] Skim `docs/ops/CHANGELOG_UPDATES.md` for meaningful diffs
- [ ] Re-list n8n workflows if bots were changed this week
- [ ] Note any breaking GHL API or Elementor/WordPress changes that affect FY workflows
- [ ] Commit + push updates on a `cursor/docs-refresh-…` branch if not auto-committed

## Firecrawl monitors (after API key)

```bash
export PATH=~/.npm-global/bin:$PATH
# Example Monday morning monitors
firecrawl monitor create --name "WP + Elementor + GHL docs Monday" \
  --schedule "Mondays at 09:00 America/Bogota" \
  --goal "Alert only on substantive documentation, API, or release changes for WordPress, Elementor, or GoHighLevel." \
  --scrape-urls "https://developer.wordpress.org/rest-api/,https://developers.elementor.com/docs/,https://marketplace.gohighlevel.com/docs/,https://highlevel.stoplight.io/docs/integrations/,https://wordpress.org/news/category/releases/,https://elementor.com/blog/,https://www.gohighlevel.com/blog" \
  --email payments@feelingyachty.com
```

Until the Firecrawl API key is in the environment, use the scrape-based `weekly-docs-update.sh` path.
