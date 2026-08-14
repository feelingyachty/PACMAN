# Documentation refresh log

## 2026-08-14 — Initial import

- Imported live Feeling Yachty GHL/n8n architecture from n8n Cloud + Slack `#n8n-errors`.
- Scraped official WordPress, Elementor, and GoHighLevel documentation into `docs/*/official/`.
- Established Monday weekly refresh process (`scripts/weekly-docs-update.sh` + GitHub Actions + Slack reminders).

### Official mirrors seeded

- WordPress: REST API, auth, themes, plugins/hooks, coding standards, roles, permalinks, block editor, wp-config
- Elementor: developers hub, widgets, hooks, forms, CLI, themes, managers, data structure, editor help, Flexbox containers
- GHL: marketplace docs, Stoplight integrations overview, Contacts, Opportunities, Conversations, Locations, Custom Values, OAuth, Calendars, Help Center, Blog, Ideas

### Known ops gaps (from Slack)

- WordPress → GHL Sync active but silent (no live webhooks since ~Aug 8)
- FY WP Push Test application password invalid
- Bokun historical backfill blocked without API Access Key/Secret

### Monday reminders armed

- n8n workflow `XjPh1Q5NKeUG3lcq` activated (Mondays 09:00 America/Bogota → `#n8n-errors`)
- Slack DMs scheduled through 2026-11-02
- GitHub Action cron: Mondays 14:00 UTC
