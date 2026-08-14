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

## Fleet source of truth

Yacht facts come from the authorized Google Sheet **Feeling Yachty Main** tab only (`BookMyBoat_Yacht_Listings_Fahad`). Other tabs are ignored. Browse the loaded inventory at `/fleet`.

## Command board

Assigned → Working → Needs Approval → Implementing → Pacman Review → Done. Blocked and Rejected sit to the side. Assign work with an optional production proposal. One-click Approve. Pacman verifies live against the proposal.

## Seeded fleet

- **Pacman** — manager / verifier
- **Corey** — Turberg semantic SEO, feeling.com sitemap work, approval gated

Other agents are added only when you introduce them. n8n is connected as infrastructure (`/n8n`), not as unfinished roster members.

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/store` | Full state |
| POST | `/api/store` | `{ "action": "reset" }` |
| GET/POST | `/api/agents` | List / onboard |
| GET/POST | `/api/tasks` | List / assign |
| PATCH | `/api/tasks/:id` | `approve`, `reject`, `submit_verification`, `verify`, `status` |
| GET/POST | `/api/logs` | Work log |
| GET | `/api/yachts` | Feeling Yachty Main inventory |

Data lives in `data/store.json` (reseeded when the store version changes).

## n8n MCP

Official Feeling Yachty n8n MCP server (do not put the bearer token in git):

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "type": "http",
      "url": "https://feelingyachty.app.n8n.cloud/mcp-server/http",
      "headers": {
        "Authorization": "Bearer ${env:N8N_MCP_TOKEN}"
      }
    }
  }
}
```

Set `N8N_MCP_TOKEN` in the environment. Pacman probes the same URL from `/n8n`.
