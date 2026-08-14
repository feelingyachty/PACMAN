# Learning archive

Git-backed study log for every PACMAN employee. Fernando reads this on `/learning`.

If it is not here, it did not happen.

## Layout

| Path | What |
|------|------|
| `index.json` | Structured entries (source of truth for the UI) |
| `digests/{agentId}/{weekOf}.md` | Human-readable week digest |
| `weekOf` | Monday of the study week in **America/Bogota**, `YYYY-MM-DD` |

## How to add a read

1. **Dashboard** — `/learning` → Log a read
2. **API** — `POST /api/learning`
3. **CLI** — `scripts/log-learning.sh --agent pacman --topic seo --title "..." --summary "..." --why "..."`

Do not invent fleet, pricing, or traffic metrics in takeaways.

## Topics

`seo` · `dev` · `wordpress` · `elementor` · `ghl` · `ops` · `ai` · `product`

## Monday

`scripts/weekly-docs-update.sh` calls `scripts/ensure-learning-week.mjs` to stub the current week for every employee who already has a digest folder (plus Pacman and Corey).
