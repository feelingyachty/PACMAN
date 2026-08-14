# PACMAN — MDI Agent Command

Pacman is the head of the MDI agent fleet. This is the command center: Trello-style cards, per-agent progress, one-click approvals, and Pacman verification.

## What Pacman does

- Watches every assigned task until it is Done
- Opens a **progress page** for every new agent (`/agents/{id}`)
- Turns **approval ON** when that agent can change production
- Verifies implementations against the approved proposal
- Keeps Turberg SEO, V8r, WordPress, and Elementor in the database
- Tracks SEO + developer intel

## Standing order

When you tell Pacman “this is a new agent”:

1. Roster them
2. Open their progress page (everything they do + work log)
3. Wire approval if they can ship production changes
4. Assign work → they propose if needed → you Approve → they implement → Pacman verifies

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Seeded fleet

- **Pacman** — manager / verifier
- **Corey** — Turberg semantic SEO, feeling.com sitemap work, approval gated

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/store` | Full state |
| POST | `/api/store` | `{ "action": "reset" }` |
| GET/POST | `/api/agents` | List / onboard |
| GET/POST | `/api/tasks` | List / assign |
| PATCH | `/api/tasks/:id` | `approve`, `reject`, `submit_verification`, `verify`, `status` |
| GET/POST | `/api/logs` | Work log |

Data lives in `data/store.json` (reseeded when the store version changes).
