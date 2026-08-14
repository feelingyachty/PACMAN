# Holistic / Semantic SEO Framework (Koray → PACMAN)

**Author of source concepts:** Koray Tuğberk GÜBÜR (user nickname: **Corey Tongberg**).  
**Scope:** Distillation of *publicly published* Holistic SEO research studies and theoretical guides in `docs/seo/koray-framework/`.  
**Not claimed:** Ownership of paywalled Semantic SEO course videos or proprietary client deliverables beyond what appears in public articles.

This document is the conceptual model agents must internalize before executing `PLAYBOOKS.md`.

---

## 1. Big picture

Search engines moved from string IR toward **semantic / hybrid** systems: entities, contexts, neural matching, quality thresholds, and continuous re-ranking. Holistic SEO responds by treating the site as a **web entity** with:

- a **source context** (primary focus / purpose),
- a **topical map** (what knowledge is covered and in what hierarchy),
- a **semantic content network** (documents + bridges + formats),
- **EAV-rich** text (entities, attributes, values),
- **historical data** (consistent satisfaction over time),
- and **holistic** signals (speed, accessibility, branding, PR, local identity) that reduce embarrassment risk and raise trust.

**Topical Authority** = positive ranking state earned when a source covers a topic’s connected queries/intents with accurate, unique, expert information — not when it “has a blog.”

Koray’s public Topical Authority case study framed results such as **0 → ~128k organic traffic in 123 days** and **~12k organic clicks/day by day 162** on the primary project (GetWordly), with parallel sites using the same method (e.g. Interingilizce OnCrawl summary: **~10k → 200k+** in ~5 months). Treat these as **source-reported**, not FY forecasts.

---

## 2. Source context, brand identity, contextual bridges

### Source context

The website’s perspective and function on the open web: monetization + purpose + how the existing content network defines topics.

- The same entity (“electronic bicycle,” “yacht charter”) must be **defined differently** by different source contexts.
- Discordant topical maps (topics that don’t match primary focus) invite quality demotion; Google’s “primary focus” / helpful-content thinking aligns with this.
- Source context sets **macro contexts** for briefs and decides **core vs outer** map sections.

**FY default source context:** private yacht charter operator / experience brand for served destinations (Miami, Panama, etc.), not a generic travel magazine.

### Brand identity (Semantic SEO sense)

More than logo/colors. Includes purpose + attributes: founder, mission, origin, staff, expertise, address, market position, third-party definitions. Brand identity and source context must **cohere**. Expanding topics (e.g. Encazip energy → credit/insurance) requires a **roof context** and bridges — otherwise dilution.

### Contextual bridge

Phrase/concept connections between side-topics that keep navigation and internal links inside compatible **query candidate categories / templates**, with shared entities and attributes. Without bridges, internal links fail to pass **topic-sensitive** relevance. Bridges define topical borders, prioritization, and gap-closing order.

---

## 3. Topical maps: core vs outer

A **topical map** (topical graph) is the planned set of cornerstones for a topic: questions (how/what/who/where), answers, entities, and connections — ordered for publishing.

| Layer | Role | FY examples |
|-------|------|-------------|
| **Core** | Directly serves source context + conversion | Miami yacht charter, Panama yacht charter, yacht types, occasion charters, booking attributes |
| **Outer** | Adjacent knowledge that still bridges to core | Seasonality, marinas, packing, landmarks-as-itinerary legs, group planning |
| **Reject / park** | No bridge or wrong brand identity | Unrelated niches, cities not served, thin AI filler |

### Expansion methods (from Topical Map study)

1. Cover **more entities of the same type** (more teams / more yacht classes / more destinations FY actually serves).
2. Cover **more attributes** of existing entities (capacity, amenities, departure, duration).
3. **Deepen context** with consistency (same definitions, same predicates, better bridges).
4. Close **topical gaps** between **centroids** with bridges (not random posts).
5. Align **query network borders** with **document conceptual borders** (Kanbanize lesson: mismatch hurts).

### Prioritization

Koray’s English-learning projects intentionally delayed some head terms until coverage/authority existed on supporting nodes. **Do not** open with only competitive money keywords on a thin FY topical graph.

### Topical coverage / borders / connections

- **Coverage:** competence breadth/depth on a topic.
- **Borders:** where the map stops (enforced by source context).
- **Connections:** how documents link contexts; wrong angle (e.g. pagespeed-as-dev vs pagespeed-as-SEO) changes how engines classify you.

---

## 4. Semantic content networks

A **semantic content network** is the living graph of documents designed from **query–document–intent templates**, not a pile of posts.

Design rules distilled from public materials:

- Process **same entity types** with **same attribute/question templates** for symmetry (templatic coverage + microsemantics).
- Pair **informational + commercial** surfaces (e-commerce/charter analogs): definitions and buying pages must reciprocally support each other.
- Use **algorithmic authorship** / content item briefs: hierarchy, vectors, connections specified before prose.
- Prefer **I-node** contextual in-content links; avoid anchor spam; vary anchors; keep links relevant.
- Match **content format** to SERP (lists, tables, definitional paragraphs, FAQs).
- Keep content **as short as possible, as long as necessary**; short dependency trees.
- **Neighbor content** and site segmentation affect trust propagation — keep folders/hubs coherent.

**Content configuration:** revise networks after initial ranking — fix vocabulary gaps, broken context flow, inaccurate facts, then re-evaluate.

---

## 5. Entities, attributes, values (EAV)

### Entity-oriented search

Engines select pages by **entity types, attributes, facts, and n-gram patterns**. Improving topical authority is often closing **information gaps**, not keyword gaps.

Practices:

- Compare competitor entities, facts, questions, layouts, anchors.
- Order attributes by **relatedness to source context**, **prominence**, and **popularity** (distinct concepts).
- Connect entities via ontology triples; use mutual attributes to lock context (countries+currency → finance; countries+education → education).
- Define entities **for this source’s context** (yacht as charter product + experience, not only as vessel encyclopedia entry).

### EAV architecture

- **Entity:** real-world or conceptual thing with independent existence.
- **Attribute:** property (simple/composite, single/multi-valued, direct/indirect, derived/stored).
- **Value:** the concrete content of that attribute (typed value sets).

**Key attributes** differentiate entities within an entity set for a given context (e.g. for charter shopping: capacity, duration, departure marina, amenities — not arbitrary trivia).

Neural matching (in Koray’s framing) aligns **EAV triples** from incomplete queries to documents — so pages should make triples explicit and question-ready.

### Named entity recognition (NER)

Recognize, type, and relate entities in text; support semantic annotations, relation detection, taxonomies/ontologies. For SEO: make important entities clear, consistent, and linkable without diluting context.

### Entity identity management & Brand SERP

- Entities have **identity tiers** (competing “isA” definitions). Consensus / corroboration across the web decides which tier dominates.
- **Brand SERP** (Jason Barnard term; covered in Koray’s guide): SERP for the exact brand name — GBP, sitelinks, reviews, PAA, knowledge panel candidates, news, videos.
- Harden FY identity: consistent NAP, about/services facts, third-party corroboration, suppress contradictions, own brand queries with accurate answers.

---

## 6. Contextual vectors, hierarchy, knowledge domains

| Concept | Meaning for agents |
|---------|-------------------|
| **Knowledge domain** | Niche with its own layouts, sentence norms, and satisfaction models (currency bounce ≠ article bounce). |
| **Contextual vector / domain** | Angle of coverage (compare / predict / chronology; charter-for-birthday vs charter-for-corporate). |
| **Contextual hierarchy** | Sub-intents nested under parent intents; shared vs distinct phrases. |
| **Topical graph** | Cornerstone Q&A + entities for a topic. |
| **Neural matching / nets** | Queries clustered by meaning; subtopics in hierarchy — cover the net, not one string. |
| **Heading vectors** | Heading chains that score answer passages; root title + H2/H3 journey must fit the question. |
| **Query / SERP mapping** | Design documents from SERP structure and intent, including page 2–3 and other engines for unique gain. |

---

## 7. Query semantics & search intent

Traditional buckets (informational, transactional, commercial, navigational, brand, news, local) are coarse. Google also speaks in **DO / KNOW / KNOW SIMPLE / VISIT IN PERSON / WEBSITE**.

Koray’s practice goes further: **thousands of micro-patterns**, sequential sessions, query **templates** and **themes**, verb/frame semantics (FrameNet-style roles), lexical relations (synonymy, hyponymy, etc.).

**Agent rule:** assign each FY URL a **canonical intent cluster**, not a single keyword. Commercial charter queries often mix KNOW (what’s included) + DO (book) + VISIT (marina/local).

**Lexical semantics:** semantic similarity ≠ semantic relevance. Closely related words can still be wrong for source context. Prefer predicates and frames that match charter buying journeys.

---

## 8. Historical data vs macro context

- **Historical data:** accumulated behavioral and quality evidence (clicks, satisfaction, consistency, crawl patterns, brand demand). Sticky authority needs positive sessions over time (Kanbanize lesson: permanence ≠ one spike).
- **Macro context:** broader environment — wars, cultural day-of-week effects, core updates, demand shocks — can reset or confuse algorithms when history is thin (Azerbaijan / Arabic Friday examples in Topical Authority study).
- **Ranking state:** sites can sit in negative plateaus; incomplete semantic work + stopping mid-campaign delays reversal (ABCFinance / Roxie examples tied to later BCAU consolidation).
- **Broad index refresh / topical consolidation:** core updates re-evaluate topical graphs; incomplete or noisy graphs get hurt; consolidated entity-rich graphs recover/gain (Entity SEO / BKMKitap narrative).

For FY: prefer steady map completion + updates over bursty off-map AI posts.

---

## 9. Cost of retrieval, information gain, quality thresholds

### Cost of retrieval

Cost to crawl, render, evaluate, associate, index, and serve a document relative to its value. High PageRank / quality / engagement can justify cost; thin, duplicate, parameter-bloated, or off-demand pages raise cost and dilute ranking signals.

Technical SEO (SaaS study list): crawlable IA, clean sitemaps, 200-targets only, no topic repetition across URLs, control parameters, reduce render cost — **align index signals**.

### Unique information gain

Patent-inspired idea: score how much *new useful* information a document adds vs alternatives. Original wording is not enough — answer questions competitors miss, with high information density.

**FY unique gain sources (only if true):** real fleet/ops knowledge, destination-specific charter logistics, transparent inclusions/exclusions, genuine itineraries, accurate local constraints.

### Quality thresholds & predictive ranking

Engines apply thresholds before competitive ranking. Semantic clarity, factuality, and satisfaction likelihood help clear thresholds; spammy/thin/discordant maps fail them.

### Initial ranking vs re-ranking

First indexed state matters (discovery links, sitemap presence, cannibalization-free launch). Later updates, neighbor quality, and behavioral proof shift re-ranking.

---

## 10. Holistic layer (beyond pure semantics)

From the Encazip Holistic SEO study precept: *“Every pixel, millisecond, byte, letter, and user matters.”*

Layers that interact with topical authority:

- Page experience / performance
- Semantic HTML / DOM weight
- Accessibility
- Structured data
- Visual segmentation (main content vs boilerplate)
- Digital PR / entitization / local listings
- Migration safety
- Author/E-E-A-T surfaces

**Experiment note:** Koray’s GetWordly topical-authority experiment deliberately omitted technical SEO to isolate semantic effects — and still showed crawl/index pain. For FY production sites, **do both**: semantic network + reasonable technical hygiene.

---

## 11. Information retrieval baseline

IR selects matching information from large collections (Boolean → statistical → ontological/link → neural). PageRank shifted hypertext authority; modern Google is hybrid. SEO that only chases strings fights yesterday’s model; SEO that builds entity-consistent, intent-satisfying document networks communicates with today’s stack.

---

## 12. Glossary (Koray / Holistic SEO terms)

| Term | Short definition |
|------|------------------|
| **Topical Authority** | Ranking state from comprehensive, accurate coverage of a topic’s connected intents |
| **Topical Map / Graph** | Planned hierarchy of topics, entities, and Q&A cornerstones |
| **Topical Coverage** | How completely a source covers a topic |
| **Topical Borders** | Edges of relevance enforced by source context |
| **Topical Gap** | Missing bridge/coverage between centroids |
| **Topical Centroid** | Central concept that organizes related concepts |
| **Topical Consolidation** | Engine’s merging/strengthening of topical understanding for a source |
| **Source Context** | Site’s primary purpose/perspective that reframes definitions |
| **Contextual Bridge** | Semantic link keeping two topics in compatible query space |
| **Brand Identity (SEO)** | Entity attributes of the brand that must cohere with the map |
| **Semantic Content Network** | Interlinked documents built from query–intent templates |
| **Contextual Vector** | Angle/profile of terms signaling context |
| **Contextual Hierarchy** | Nested sub-intents / contextual zones |
| **Knowledge Domain** | Niche with its own quality and layout norms |
| **EAV** | Entity–Attribute–Value knowledge representation |
| **Key Attribute** | Attribute that distinguishes entities in-context |
| **Information Gain** | Unique useful info vs competing documents |
| **Cost of Retrieval** | Engine cost to process a URL vs value |
| **Historical Data** | Accumulated trust/behavior evidence for a source |
| **Macro Context** | External demand/algorithm environment |
| **Query Template / Theme** | Reusable query pattern structure |
| **Neural Matching** | Meaning-based query–document association |
| **Heading Vector** | Contextual path of headings for answer scoring |
| **Algorithmic Authorship** | Rule-based writing system for consistent SCN quality |
| **Content Configuration** | Post-publish semantic revision loop |
| **Ranking State** | Positive/negative plateau of ranking behavior |
| **Broad Index Refresh** | Wide re-evaluation of indexed documents (often with updates) |
| **Brand SERP** | SERP for exact brand name query |
| **Entity Identity Tiers** | Competing definitional layers for an entity |
| **Corroboration of Web Answers** | Consensus-finding across sources for facts |
| **Search Engine Communication** | Designing sites so engines parse intent/expertise easily |
| **I-node / C-node / S-node links** | Link-type distinctions (individual contextual vs blocks vs sitewide nav) |
| **Neighbor Content** | Surrounding URLs influencing quality propagation |
| **Quality Threshold** | Minimum bar before competitive ranking |
| **Frame Semantics / SRL** | Verb-centered roles structuring events and queries |
| **Lexical Relations** | Synonymy, antonymy, hyponymy, etc. affecting relevance |
| **Holistic SEO** | Cross-vertical optimization (content + tech + UX + brand + PR…) |

---

## 13. Reading order for agents

1. This file  
2. `PLAYBOOKS.md`  
3. `SKILL.md` quality bar + `BEYOND_KORAY.md`  
4. Deep dives in `docs/seo/koray-framework/` per `INDEX.md` (topical-authority, topical-map, EAV, entity-seo, lexical-semantics, holistic-seo)
