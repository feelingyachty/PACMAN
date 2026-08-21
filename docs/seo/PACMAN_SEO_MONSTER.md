# PACMAN SEO Monster — Executive Summary (Fernando)

## What was trained

PACMAN now has an agent skill pack grounded in **publicly published** Holistic SEO / Topical Authority / Semantic SEO materials by **Koray Tuğberk GÜBÜR** (you’ve called him **Corey Tongberg**).

| Asset | Path |
|-------|------|
| Skill (invoke this) | `skills/seo-corey-tongberg/SKILL.md` |
| Conceptual model + glossary | `skills/seo-corey-tongberg/FRAMEWORK.md` |
| FY playbooks + publish checklists | `skills/seo-corey-tongberg/PLAYBOOKS.md` |
| PACMAN upgrades beyond baseline Koray practice | `skills/seo-corey-tongberg/BEYOND_KORAY.md` |
| Downloaded source catalog | `docs/seo/koray-framework/INDEX.md` |
| Technique database (JSON + SQLite) | `docs/seo/koray-technique-db/` + `data/seo/koray_techniques.sqlite` |
| Daily SEO briefs (8am ET) | `docs/seo/daily-updates/` |
| Raw sources | `docs/seo/koray-framework/{white-papers,theoretical,external}/` |

**Important:** This is training on **public articles/case studies** + PACMAN operationalization for Feeling Yachty. It does **not** claim ownership of Koray’s paywalled course videos.

---

## How to invoke

In Cursor / agent chat, say things like:

- “Use the Corey Tongberg / Koray SEO skill”
- “Build a topical map for Miami + Panama yacht charter”
- “Brief the Miami yacht charter money page + cluster”
- “Audit this URL for semantic gaps”
- “Brand SERP hardening for Feeling Yachty”
- “PACMAN SEO monster — expand map without dilution”

Agents should auto-trigger on topical authority, semantic SEO, EAV, cannibalization, charter SEO, etc. (see skill frontmatter).

---

## How it applies to feeling.com / Feeling Yachty

**Source context we locked for agents:** Feeling Yachty is a **private yacht charter / experiences** brand (Miami, Panama, and other served destinations) — not a generic travel blog.

Agents are instructed to:

1. Build **topical maps** (core money/charter nodes vs outer guides with bridges) before flooding WordPress with posts.  
2. Brief pages with **entities, attributes, values**, heading vectors, and multi-query SERP intent clusters.  
3. Prevent **cannibalization** (one owner URL per query cluster) across Miami/Panama.  
4. Hunt **contradictions** (capacities, policies, city facts) before publish.  
5. Respect **WordPress + Elementor** realities and keep answer passages crawlable.  
6. Pipe learning through **n8n auto-blogging** (map-only topics) and **GHL** objections/bookings as content feedback — not as an excuse for off-map AI spam.

---

## Quality bar (what “monster” means)

Beyond a human casually applying Koray’s public framework, PACMAN must run:

- Multi-query simulation  
- Entity graph completeness scoring  
- SERP intent clustering  
- Contradiction detection  
- Cannibalization registry  
- Post-publish measurement / update loops  

Details: `skills/seo-corey-tongberg/BEYOND_KORAY.md`.

---

## What to expect operationally

- **Outputs:** topical maps, briefs, audit scorecards, publish checklists — actionable for WP.  
- **Not outputs:** fake traffic forecasts, invented fleet/pricing facts, or “we secretly used Koray’s course.”  
- **Stack awareness:** works alongside existing GHL/n8n/WordPress docs in `AGENTS.md`.

---

## Next useful asks

1. “Generate v1 topical map for Feeling Yachty Miami + Panama from the live site IA.”  
2. “Audit the current Miami charter money page against Playbook C.”  
3. “Constrain n8n WordPress Auto Blogging topics to the map.”  
