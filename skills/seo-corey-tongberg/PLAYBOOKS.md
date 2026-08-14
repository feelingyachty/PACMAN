# PACMAN SEO Playbooks — Feeling Yachty (Koray / Corey Tongberg)

Execute these playbooks with `SKILL.md` doctrine and `FRAMEWORK.md` vocabulary.  
**Never invent prices, fleet specs, or traffic metrics.** Pull live facts from FY systems or mark `[FACT NEEDED]`.

---

## Playbook A — Build a topical map (yacht charter: Miami / Panama)

### Goal

Produce a source-context-aligned topical map with core vs outer sections, EAV skeletons, query templates, bridges, and publish priority — before any bulk writing.

### Steps

1. **Lock source context (1 paragraph)**  
   Example shape: *Feeling Yachty is a private yacht charter / experience brand serving [Miami / Panama / …], monetizing bookings and qualified leads — not a generic travel publisher.*

2. **Lock brand identity EAV**  
   | Attribute | Value status |
   |-----------|--------------|
   | Legal/brand names | Feeling Yachty, feeling.com, local variants |
   | Service areas | Miami, Panama, … |
   | Contact / NAP | Must match GBP + footer + schema |
   | Fleet / yacht classes offered | `[FACT NEEDED]` from ops |
   | Booking channels | Site / Woo / GHL / chat / phone |
   | Differentiators | Only verified |

3. **Inventory entity types (core)**  
   - Destinations & departure zones (Miami Beach, Biscayne Bay, Panama City, islands, canals — only real ones)  
   - Yacht / vessel classes  
   - Group size bands  
   - Occasions (birthday, bachelor, corporate, family)  
   - Durations (hourly, half-day, sunset, multi-day if offered)  
   - Activities (snorkeling, sightseeing, dining — if offered)  
   - Amenities (jet ski, DJ, catering — if offered)  
   - Seasonal / weather constraints  
   - Regulatory / safety basics (life jackets, captain, alcohol policy — accurate only)

4. **For each core entity type, draft attributes**  
   Example — *Yacht class*: capacity, crew, cabins, length band, ideal occasions, departure options, inclusions/exclusions.  
   Example — *Destination*: departure points, typical routes, landmarks, best seasons, travel time, photo spots, local rules.

5. **Build query templates (not keyword dumps)**  
   - `{yacht type} charter {city}`  
   - `private yacht charter {city}`  
   - `{occasion} yacht {city}`  
   - `yacht charter price {city}` / `how much` (answer with ranges/process, not fake numbers)  
   - `best yacht charter {city}`  
   - `{landmark} by yacht`  
   - `what’s included yacht charter`  
   - `public vs private charter`  
   - Brand: `Feeling Yachty`, `Feeling Yachty {city}`

6. **SERP sample (multi-query)**  
   For 8–12 seed templates × Miami and × Panama: note intent mix, SERP features, dominant page types (directory, operator, blog, video).

7. **Draw core vs outer**  
   - **Core:** money pages + definitional charter pages + yacht-type + occasion hubs that convert.  
   - **Outer:** guides that still use charter predicates and link to core.  
   - **Reject:** topics with no bridge (random recipes, unrelated cities, generic “digital nomad,” etc.).

8. **Define centroids & gaps**  
   Centroids might be: *Private charter Miami*, *Private charter Panama*, *Occasion charters*, *Yacht types*.  
   List gaps (e.g. strong Miami birthday coverage but zero corporate; Panama routes undefined).

9. **Contextual bridges (explicit)**  
   Write bridge sentences/anchor plans, e.g. *Panama canal sightseeing ↔ half-day charter Panama*; *Miami bachelor ↔ capacity 12+ yachts*.

10. **Publish priority queue**  
    - Tier 0: Brand/about/NAP consistency + existing money URL cleanup  
    - Tier 1: Supporting definitional nodes that feed money pages  
    - Tier 2: Money page reinforcement  
    - Tier 3: Outer bridges  
    - Tier 4: Cautious expansion (new entity types FY actually sells)

11. **Cannibalization registry**  
    Table: `query cluster → owner URL → supporting URLs → status`.

### Deliverable format

```markdown
# Topical Map — Feeling Yachty — [Date]
## Source context
## Brand identity EAV
## Core nodes (URL plan)
## Outer nodes (URL plan)
## Rejected / parked
## Query cluster → URL ownership
## Bridges
## Publish queue (30/60/90 nodes — counts, not calendar promises)
## Open facts needed from ops
```

### Exit criteria

- [ ] Source context written and approved against live site reality  
- [ ] ≥1 money URL planned per active city  
- [ ] Every outer node has ≥1 bridge to core  
- [ ] Ownership table has no duplicate owners for the same cluster  
- [ ] Fact gaps listed (not invented)

---

## Playbook B — Brief a money page + supporting cluster

### Goal

One commercial URL (e.g. `/miami-yacht-charter/`) plus 3–7 supporting URLs that raise information gain and topical coverage without cannibalizing the money page.

### Steps

1. **Select money page** from map; confirm ownership of primary query cluster.

2. **Multi-query simulation (required)**  
   List 10–20 queries the money page should *influence* vs queries reserved for support pages.

3. **Intent cluster label**  
   Example: `DO+VISIT commercial charter — Miami` with KNOW sub-intents answered in-page (inclusions, process) without spinning a second money URL.

4. **EAV brief for money page**

   | Entity | Attribute | Value / instruction |
   |--------|-----------|---------------------|
   | Feeling Yachty Miami charter | Service area | … |
   | Yacht options | Classes offered | … |
   | Booking | Steps | … |
   | Trip | Durations | … |
   | Trust | Captain/safety | … |

5. **Heading vector (money page)**  
   - H1: primary commercial intent  
   - Early answer passage: what you get + who it’s for  
   - Yacht options / capacities  
   - Popular itineraries / experiences  
   - Occasions  
   - Inclusions / exclusions  
   - Booking process / CTA  
   - FAQs (objections)  
   Avoid stuffing every outer guide into the money page.

6. **Support cluster design**  
   Examples:  
   - Birthday yacht Miami (occasion depth)  
   - Sunset charter Miami (duration/experience)  
   - Yacht sizes / capacity guide (attribute depth)  
   - Miami departure / marina orientation (local KNOW → links to book)  
   Each support page: **one job**, bridges back with contextual anchors.

7. **Internal link plan**  
   - Money → each support (1 contextual I-node link each, varied anchors)  
   - Each support → money (primary CTA link)  
   - Lateral links only when same entity type / shared attribute  
   - No identical exact-match anchors repeated ≥3 times on one page (Koray OnCrawl heuristic)

8. **Information gain checklist**  
   What can FY uniquely say? Ops truth only. Mark competitor-parity facts vs FY-only facts.

9. **Conversion + Elementor constraints**  
   - CTA to real booking/chat/GHL path  
   - Keep main content in readable HTML (not only image text)  
   - FAQ schema only if visible FAQ matches  

10. **Draft → contradiction pass** vs other Miami/Panama pages.

### Deliverable

Full brief markdown for money page + one brief per support URL + link graph.

### Exit criteria

- [ ] Query ownership unambiguous  
- [ ] Support pages do not target the money page’s canonical head terms as H1  
- [ ] Bridges and CTAs specified  
- [ ] No unresolved `[FACT NEEDED]` in critical conversion claims (or explicitly omitted)

---

## Playbook C — Audit an existing URL for semantic gaps

### Goal

Score a live URL against map + SERP + EAV completeness; produce a revision brief.

### Steps

1. **Identify claimed central entity + source-context fit.** Off-map? Recommend redirect/merge/noindex or rewrite.

2. **Extract EAV triples present** (list). Mark inaccurate / outdated / vague.

3. **Multi-query check**  
   From GSC (if available) + SERP: which queries does it rank for? Which should it? Leakage into another URL’s cluster?

4. **Competitor information gap**  
   Top 5 results: facts, questions, formats FY lacks. Prefer gaps FY can honestly fill.

5. **Heading vector audit**  
   Does H1→H2 path answer the canonical intent early? Or is the answer buried under Elementor hero fluff?

6. **Bridge audit**  
   Inlinks/outlinks: topical? Or orphan / wrong folder?

7. **Contradiction scan** vs siblings (prices, capacities, cities served, “#1” claims).

8. **Cost of retrieval flags**  
   Duplicate sections sitewide, thin boilerplate ratio, parameter URLs, multiple near-duplicate charters.

9. **Scorecard (0–5 each)**  
   - Source context alignment  
   - EAV completeness  
   - Intent match / format match  
   - Information gain  
   - Internal bridge quality  
   - Cannibalization risk (5 = safe)  
   - Trust/identity clarity  

10. **Revision brief** ordered by impact: fix contradictions → clarify answer passage → add missing key attributes → relink → only then expand word count.

### Exit criteria

- [ ] Scorecard filled  
- [ ] Explicit keep / merge / rewrite / prune decision  
- [ ] Revision tasks actionable in WP/Elementor

---

## Playbook D — Expand topical map without dilution

### Goal

Add nodes only when brand identity + source context + bridges remain coherent (Encazip-style roof context discipline).

### Decision gate (all must pass)

1. **Identity fit:** Would a stranger still say this site is a yacht charter brand?  
2. **Bridge test:** Can you write a contextual bridge using shared entities/predicates to a core money page?  
3. **Demand test:** Is there query evidence *or* strategic unique-gain value (not vanity)?  
4. **Cost test:** Will this URL pay for crawl/index cost (no index bloat)?  
5. **Ownership test:** No cannibalization of existing clusters.  
6. **Ops truth test:** FY can maintain factual accuracy.

If any fail → park in `Rejected / later` with reason.

### Expansion patterns (allowed)

- More entities of same type (new occasion, new yacht class FY actually offers)  
- More attributes on existing entities (inclusions matrix, route options)  
- Deepening (itinerary-level pages that still CTA to charter)  
- City symmetry: if Miami has a node type that converts, mirror for Panama **only if** service exists  

### Expansion patterns (dangerous)

- New verticals without roof context (“finance,” “immigration,” random ecom)  
- Translating/publishing pages with no search demand (Realtygroup lesson)  
- Newsfirehose / announcements bloating the graph (SaaS cost-of-retrieval warning)  
- Auto-blogging off-map topics via n8n

### Process

1. Propose node → run decision gate  
2. Update map + ownership table  
3. Specify bridges + which existing pages get link updates (content configuration)  
4. Publish support before or with reinforcement of money pages — don’t orphan  

### Exit criteria

- [ ] Gate documented  
- [ ] Map version bumped  
- [ ] Link update list for old URLs included  

---

## Playbook E — Entity identity / Brand SERP hardening

### Goal

Make “Feeling Yachty” (and city variants) resolve to the correct identity tier: **yacht charter brand**, with clean SERP estate and consistent corroboration.

### Steps

1. **Brand SERP snapshot**  
   Query: `Feeling Yachty`, `Feeling Yachty Miami`, `Feeling Yachty Panama`, misspellings. Record: sitelinks, GBP, reviews sentiment, PAA, competing entities, news, directories, social profiles.

2. **Identity tier check**  
   Desired primary: charter operator / yacht experiences. Suppress confusing tiers (wrong industry entities sharing name fragments).

3. **Corroboration set**  
   Align: official site about, GBP, Facebook/Instagram/LinkedIn, directories, partner pages. Same NAP, same description angle.

4. **On-site identity pages**  
   About, contact, destinations served, policies — factual, schema-consistent where implemented.

5. **Own brand PAA / KNOW SIMPLE**  
   Answer: where we operate, how booking works, what a charter includes — on owned URLs.

6. **Review response protocol**  
   Public responses on GBP/major surfaces; escalate ops issues to GHL — don’t argue facts that are wrong on-site.

7. **Suppress / correct**  
   Outdated addresses, wrong city claims, duplicate GBPs, scraped directory lies — correct at source when possible.

8. **Knowledge panel candidacy (long game)**  
   Notability + consistent entity attributes across authoritative sources; don’t fake Wikipedia. Focus on consistency first.

9. **Monitor**  
   Re-check Brand SERP after major site changes; log identity regressions.

### Exit criteria

- [ ] Snapshot archived  
- [ ] NAP consistency checklist passed  
- [ ] Top brand queries dominated by owned or intended properties  
- [ ] No unresolved contradictory self-descriptions on feeling.com  

---

## Universal publishing checklist (agents must complete)

Copy into the PR / task before marking publish-ready:

### Strategy

- [ ] Node exists on topical map (core/outer labeled)  
- [ ] Query cluster owner assigned; no cannibalization  
- [ ] Multi-query simulation done (≥5 related queries)  
- [ ] Intent cluster labeled  
- [ ] Bridges to money page specified (if not itself money)

### Semantics / content

- [ ] Central entity clear in H1/first passage  
- [ ] Key EAV attributes present with verified values  
- [ ] Heading vector matches SERP/answer needs  
- [ ] Format matches SERP (list/table/FAQ as needed)  
- [ ] Unique information gain stated (FY-real)  
- [ ] Contradiction hunt vs siblings completed  
- [ ] Tone = charter operator source context  

### Technical / FY stack

- [ ] Canonical URL final; no parameter variants  
- [ ] Title/H1 aligned; not duplicated across URLs  
- [ ] Internal links implemented per brief  
- [ ] Main content indexable (not text-as-image only)  
- [ ] CTA points to live booking/chat/GHL path  
- [ ] Media alt text factual; compressed reasonably  
- [ ] If n8n auto-draft: human/agent map-check before publish  

### Measurement

- [ ] GSC inspection planned post-index  
- [ ] 14–28 day update triggers defined (what to revise if impressions without clicks, or wrong queries)  
- [ ] Optional: note expected GHL lead path for commercial pages  

### Attribution hygiene

- [ ] No fake metrics in content  
- [ ] No claiming Koray/course secrets  

---

## Quick reference — Miami vs Panama symmetry

| Dimension | Rule |
|-----------|------|
| Templates | Mirror query templates per city when service exists |
| Facts | Never copy Miami marina facts onto Panama pages |
| Bridges | City hubs can cross-link for multi-destination shoppers without merging identities |
| Ownership | `charter miami` ≠ `charter panama` — separate money URLs |
| Auto-blog | Consolidated workflow must tag city + map node ID |
