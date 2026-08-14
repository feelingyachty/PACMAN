# PACMAN — MDI Agent Command

Pacman is the head of the MDI agent fleet. This is the command center: Trello-style cards, per-agent progress, one-click approvals, Pacman verification, and a **Learning** tab for continuous SEO + developer study.

## What Pacman does

- Watches every assigned task until it is Done
- Opens a **progress page** for every new agent (`/agents/{id}`)
- Turns **approval ON** when that agent can change production
- Verifies implementations against the approved proposal
- Keeps Turberg SEO, V8r, WordPress, and Elementor in the database
- Tracks SEO + developer intel
- **Studies continuously** (SEO + development trends) and logs it under **Learning**

## Learning tab

`/learning` shows every employee’s reading for the current week, with takeaways and one-click “Open source,” plus week history.

Repo archive (git-backed forever):

- `data/learning/index.json` — structured entries
- `data/learning/digests/{agentId}/{weekOf}.md` — easy-read weekly digests for Fernando

## Standing order

When you tell Pacman “this is a new agent”:

1. Roster them
2. Open their progress page (everything they do + work log)
3. Wire approval if they can ship production changes
4. Assign work → they propose if needed → you Approve → they implement → Pacman verifies
5. They get a Learning lane automatically (same roster) — log what they study each week

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 · Learning at http://localhost:3000/learning

## Seeded fleet

- **Pacman** — manager / verifier / continuous study
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
| GET | `/api/learning` | Learning index + digests (`?digest=1&agentId=&weekOf=`) |

Runtime board state: `data/store.json` (gitignored, reseeded when store version changes).  
Learning archive: `data/learning/**` (**committed**).
