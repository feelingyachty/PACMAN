# PACMAN — MDI Agent Command Center

Pacman is the head of the MDI agent fleet. This dashboard is the visual ops board for assigning work, approving change proposals, and verifying implementations.

## What it does

- **Kanban board** — Assigned → Working → Needs Approval → Implementing → Pacman Review → Done
- **One-click approvals** — Agents like **Corey** (semantic SEO / Turberg) submit proposals; you approve before they implement
- **Verification** — After implementation, Pacman reviews and marks Done or Blocked
- **Agent roster** — Add specialists (SEO, WordPress, booking, etc.) with optional approval gates
- **Knowledge database** — Semantic SEO, V8r booking, WordPress, and Elementor ops packs
- **Intel feed** — SEO + developer signals Pacman tracks

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/store` | Full dashboard state |
| POST | `/api/store` | `{ "action": "reset" }` reseeds data |
| GET/POST | `/api/agents` | List / add agents |
| GET/POST | `/api/tasks` | List / create tasks |
| PATCH | `/api/tasks/:id` | `approve`, `reject`, `submit_verification`, `verify`, `status` |

Data persists in `data/store.json`.

## Seeded agents

- **Pacman** — manager / verifier
- **Corey** — semantic SEO specialist (approval required); sample feeling.com proposals on the board
