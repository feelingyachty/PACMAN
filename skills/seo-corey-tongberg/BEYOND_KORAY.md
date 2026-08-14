# Beyond Koray — PACMAN upgrades for Feeling Yachty

Koray Tuğberk GÜBÜR’s public Holistic / Semantic / Topical Authority materials define the **baseline**. PACMAN should **outperform a single human** applying that baseline by using parallelism, full-site memory, automation hooks, and FY stack awareness.

This file lists **explicit upgrades**. Do not confuse them with claims that we own Koray’s paywalled course.

---

## 1. Parallel SERP analysis (multi-query simulation)

**Human baseline:** Spot-check a few keywords, mimic the #1 result.  
**PACMAN bar:**

- Always analyze a **query network** (10–20 queries) before briefing a money page.
- Cluster SERPs by shared results/features → **intent clusters**.
- Compare Google + at least one other engine when unique information gain is unclear.
- Record format winners (list vs table vs video vs local pack) and map them to Elementor sections deliberately.
- Prefer changing **what the engine understands about the need** (clear EAV, better answers) over blind clone-the-#1 layouts.

**Output artifact:** `serp_cluster_table` in every money-page brief.

---

## 2. Full-site consistency (graph memory)

**Human baseline:** Optimize the page in front of them.  
**PACMAN bar:**

- Maintain a living **query → URL ownership** table for feeling.com (and city variants).
- Diff **definitions** of yacht classes, inclusions, cities served, and policies across the site.
- Ensure folder/hub semantics match source context (charter hubs don’t drift into generic travel magazines).
- When adding a node, list **all old URLs** that need bridge/anchor updates (content configuration at network scale).

**Output artifact:** updated topical map version + ownership table on every content PR.

---

## 3. Automated contradiction detection

**Human baseline:** Occasional editorial review.  
**PACMAN bar — hunt before publish:**

| Check | Examples |
|-------|----------|
| Numeric | Capacities, durations, passenger counts, “from $” if shown |
| Geographic | Miami facts on Panama URLs; wrong marinas |
| Policy | Alcohol, cancellation, what “private” means |
| Identity | Founding claims, addresses, phone formats (E.164 in GHL; display consistent on site) |
| Superlatives | “#1,” “cheapest,” “only” — verify or remove |
| Cross-language | If ES/EN exist, entity facts must match |

Fail the publish checklist on unresolved contradictions.

---

## 4. Entity graph completeness scoring

**Human baseline:** “We should write about birthdays sometime.”  
**PACMAN bar:**

For each **core entity**, score 0–1 completeness:

- Page exists?  
- Key attributes filled?  
- Questions/FAQ coverage?  
- Linked to money page?  
- Corroborated with media/schema where appropriate?  
- Indexed / receiving impressions?

Prioritize the lowest scores on **core** entities before outer fluff. Expand entity *types* only after gate in Playbook D.

---

## 5. SERP intent clustering + cannibalization prevention

**Human baseline:** One URL per keyword guess.  
**PACMAN bar:**

- Label clusters: KNOW / DO / VISIT / mixed commercial-investigation / brand.
- One **owner URL** per cluster; supporters may rank for long tails but must not steal H1/title of the owner.
- Before new publish, search ownership table + on-site titles for collisions.
- Merge or canonicalize near-duplicates (common WordPress failure mode).

---

## 6. Continuous refresh cadence (update score)

**Human baseline:** Publish and forget.  
**Koray baseline:** Update based on initial ranking; raise publish frequency deliberately.  
**PACMAN bar:**

- Every commercial URL gets a **revision trigger list** (wrong queries, high impress/low CTR, missing PAA, outdated season facts).
- Prefer **section updates** that add facts/bridges over rewriting for length.
- Sync seasonal nodes (summer Miami demand, Panama weather windows) on a recurring review — without turning the site into a news dump.
- After core algorithm volatility: audit topical consolidation (thin outer pages prune/bridge; strengthen EAV on money pages).

---

## 7. n8n / GHL feedback loops (FY-specific)

Feeling Yachty’s demand stack is not a pure media site.

| Signal | Use for SEO |
|--------|-------------|
| GHL qualified leads / booking questions | Mine real objections → FAQ / EAV attributes on money pages |
| Missed-call / SMS bot topics | Discover KNOW gaps (“how long,” “how many people,” “what’s included”) |
| Woo paid orders by city | Validate which city/occasion clusters convert — prioritize map tiers |
| WordPress auto-blogging (`gKezuNipPn2PjqTV`) | **Only** topics with map node IDs; reject off-map AI titles |
| Slack `#n8n-errors` | Catch broken publish paths that create soft-404 / draft leaks |

**Rules:**

- Auto-blogging is a **draft factory**, not a topical map.
- Close the loop: sales objections → brief updates → page updates → bots answer consistently with on-site facts (avoid bot/site contradictions).

---

## 8. WordPress / Elementor execution constraints

Koray experiments sometimes used almost no chrome (few links, no menus) to isolate semantics. **FY production cannot copy that literally.**

### Constraints

- Elementor can bury answer passages below heroes, sliders, and cards — **fix main content early**.
- Boilerplate (global headers, popups, repeated sections) raises similarity and dilutes main content weight — keep unique charter facts in the primary content widget.
- DOM weight / unused widgets hurt cost of retrieval — prefer simpler section stacks on money pages.
- WP near-duplicate pages and leftover Miami/Panama legacy blogger workflows risk cannibalization — consolidate ownership.
- Application passwords / REST: agents must use env credentials; don’t invent UI click-paths that aren’t automated.
- Images: real charter photography beats stock for entity identity; compress; set dimensions to limit CLS.

### PACMAN Elementor rules

1. First viewport may brand, but **indexable answer + primary entity** must appear in HTML text near the top of the content area.  
2. CTAs allowed; don’t replace factual sections with only buttons.  
3. FAQs must be real text nodes if using FAQ schema.  
4. Avoid creating a new design system; match Feeling Yachty patterns (`docs/elementor/FEELING_YACHTY.md`).

---

## 9. Holistic without theater

Encazip-style holistic work (speed, a11y, PR, entitization) matters, but PACMAN should sequence:

1. Source context + map + ownership  
2. Money page semantic quality + bridges  
3. Contradiction / cannibalization cleanup  
4. Brand SERP / GBP consistency  
5. Performance passes on templates that affect all money URLs  
6. PR/entity mentions when identity is already coherent  

Don’t burn cycles on micro-CSS while the topical map is chaos.

---

## 10. Measurement loops (define “done” as learning)

After publish:

1. Confirm indexation.  
2. Watch query mix 14–28 days — capture *wrong* queries as map bugs.  
3. Update brief templates when the same gap repeats.  
4. Report to Fernando in plain language: what cluster moved, what was revised, what fact is still needed from ops — **no fake %**.

---

## 11. What PACMAN must never do

- Fabricate Koray-like case study results for FY  
- Pretend access to unpaid course modules  
- Let n8n flood outer topics that fail Playbook D gates  
- Clone competitor fluff that contradicts FY ops  
- “SEO redesign” that breaks booking/GHL paths  

---

## 12. One-line standard

**If a careful human following Koray’s public playbook would ship it, PACMAN still runs multi-query clustering, ownership diff, contradiction hunt, entity completeness score, and a post-publish measurement hook before calling it done.**
