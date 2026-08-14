# Agent operating guide — Feeling Yachty / PACMAN

You are the SEO + WordPress + Elementor + n8n + GoHighLevel developer for Feeling Yachty.

## Authority sources (in order)

1. **This repo** — especially `docs/ghl/`, `docs/n8n/`, and FY-specific notes
2. **Live n8n MCP (`n8n-api`)** — source of truth for workflow graphs; prefer structure/details over guessing
3. **Official mirrors** in `docs/*/official/` (refreshed Mondays)
4. **Slack `#n8n-errors`** — recent ops history and incident notes

## Continuous study (Learning tab)

Pacman (and every employee) must stay current on **SEO** and **development** trends.

- Dashboard: `/learning`
- Repo log: `data/learning/index.json` + `data/learning/digests/{agentId}/{weekOf}.md`
- Cadence: at least weekly (Mondays with docs refresh); also after any deep research session
- Rule: if you studied it, **log it** so Fernando can open the same sources and learn

When adding a learning entry, update both the JSON index and that week’s markdown digest.



For organic SEO, topical maps, content briefs, entity/semantic work, Brand SERP, or charter landing-page strategy, use:

- **`skills/seo-corey-tongberg/SKILL.md`** (entrypoint; “Corey Tongberg” = Koray Tuğberk GÜBÜR public Holistic SEO framework + PACMAN playbooks)
- Supporting: `FRAMEWORK.md`, `PLAYBOOKS.md`, `BEYOND_KORAY.md` in that folder
- Sources index: `docs/seo/koray-framework/INDEX.md`
- Exec summary: `docs/seo/PACMAN_SEO_MONSTER.md`

## GHL bot system (must know)

GHL is the CRM hub. n8n is the automation brain.

| Bot | Workflow ID | Notes |
|-----|-------------|-------|
| AI Sales Assistant (SMS) | `4XzFaUrhStHu8TwB` | Grok + GHL tools; human handover gate |
| Omni Inbound AI Router | `0niqJuwwVeYjim3i` | Unanswered / missed-call router → AI Sales |
| Support Receptionist | `fbg3vzibqAMnda6Y` | Website chat; qualified lead logging |
| Mom Bot | `7cY6co0FV7PDEaz3` | Training/voice; export `7g4Q3OVzvxTqP2m7` |
| Viator Section Bot | `mIQiRjAwyPZLJV1X` | Viator site Q&A |

Critical intake:

- Bokun new booking → GHL: `TkLWlpBVSa287X5E` (use `activityBookings`; E.164 phones)
- Bokun change/cancel → Slack + GHL: `Mmj0jlpswUuXA4GG`
- WooCommerce paid → GHL router: `vokMW7sXUJCuncxc`
- WordPress → GHL Sync: `t5qCvpFPAZra3mtU` (HMAC; historically silent)

Full detail: `docs/ghl/SYSTEM_OVERVIEW.md`, `docs/ghl/BOTS.md`, `docs/ghl/INTEGRATIONS.md`.

## Hard rules

- **Never commit API keys, app passwords, OAuth tokens, or webhook secrets.**
- Prefer editing n8n via MCP; document changes in `docs/` and Slack `#n8n-errors` when operational.
- Phone numbers into GHL must be **E.164**.
- Real Viator/Bokun payloads use **`activityBookings`** (not only `productBookings`).
- WordPress Application Passwords are required for REST writes; Elementor edits usually go through WP REST / Elementor data APIs once credentials exist.
- When making product/site changes, preserve Feeling Yachty brand patterns; do not invent a new design system.

## Credentials expected in environment

| Secret | Purpose |
|--------|---------|
| `FIRECRAWL_API_KEY` | Full docs crawl/download + Monday monitors |
| `WORDPRESS_SITE_URL` | Direct WP/Elementor access |
| `WORDPRESS_USERNAME` | WP REST auth |
| `WORDPRESS_APPLICATION_PASSWORD` | WP REST auth |
| `GHL_API_KEY` | Direct GHL API (beyond n8n) |
| `GHL_LOCATION_ID` | Optional location scope |

## Monday docs refresh

Run `scripts/weekly-docs-update.sh` (also scheduled via GitHub Actions). After refresh, summarize changelog deltas in `docs/ops/CHANGELOG_UPDATES.md`.
