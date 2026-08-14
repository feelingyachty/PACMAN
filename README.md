# PACMAN — Feeling Yachty platform knowledge base

Developer knowledge repository for **GoHighLevel (GHL)**, **WordPress**, **Elementor**, and **n8n** automations used by Feeling Yachty.

## Quick start for agents

1. Read [`AGENTS.md`](./AGENTS.md) — how to work in this repo
2. Read [`docs/ghl/SYSTEM_OVERVIEW.md`](./docs/ghl/SYSTEM_OVERVIEW.md) — live GHL/n8n architecture
3. Use [`docs/n8n/WORKFLOW_INVENTORY.md`](./docs/n8n/WORKFLOW_INVENTORY.md) for workflow IDs
4. Use official mirrors under `docs/*/official/` for WordPress, Elementor, and GHL docs
5. Run Monday refresh via [`scripts/weekly-docs-update.sh`](./scripts/weekly-docs-update.sh)

## Layout

| Path | Contents |
|------|----------|
| `docs/ghl/` | Feeling Yachty GHL system, bots, integrations + official API/help mirrors |
| `docs/n8n/` | Live workflow inventory from `feelingyachty.app.n8n.cloud` |
| `docs/wordpress/` | WordPress handbook / REST API mirrors + FY notes |
| `docs/elementor/` | Elementor developer + editor help mirrors |
| `docs/ops/` | Weekly update schedule, sources, credentials checklist |
| `scripts/` | Docs refresh automation |
| `.github/workflows/` | Monday cron to refresh docs |

## Live systems (do not commit secrets)

- **n8n:** https://feelingyachty.app.n8n.cloud
- **Slack ops:** `#n8n-errors` (`C0BPZ5WT9V1`), `#viator-cancellation-modifications-updates` (`C0BQ42JBKHU`)
- **Fixes destination:** this PACMAN repo (`/n8n` docs + PRs)

## Weekly Monday updates

Every Monday the repo is expected to re-scrape WordPress, Elementor, and GoHighLevel documentation sources and commit updates. See [`docs/ops/WEEKLY_UPDATE.md`](./docs/ops/WEEKLY_UPDATE.md).
