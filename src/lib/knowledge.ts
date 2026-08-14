import type { KnowledgeDoc } from "./types";

const ts = new Date().toISOString();

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: "kb-seo-turberg",
    title: "Semantic SEO Framework (Turberg / Koray Tuğberk Gübür)",
    domain: "seo",
    summary:
      "Pacman’s mastery pack for Corey’s semantic SEO work — topical maps, entities, attributes, query networks, and SERP-driven coverage.",
    source: "Internal mastery pack — Koray Tuğberk Gübür semantic SEO methodology",
    updatedAt: ts,
    tags: ["turberg", "semantic-seo", "topical-map", "entities", "corey"],
    content: `# Semantic SEO Framework (Turberg)

Corey operates under this framework. Pacman uses it to review proposals and verify implementations.

## Core principles
1. **Topics > keywords** — Rank for meaning by covering a topic’s entities and attributes, not by repeating a head term.
2. **Topical maps** — Hierarchical graph: source context → central entities → attributes → predicates → facts.
3. **Query networks** — Group queries by shared search intent and entity need; assign one dominant URL per cluster to avoid cannibalization.
4. **SERP reality** — Extract entities/attributes from ranking documents before writing. Match quality bar, then exceed with unique evidence.
5. **Historical data** — Prefer durable definitions and consistent entity naming across the site graph.

## Pacman review checklist (approve?)
- [ ] Proposal cites sitemap URLs + affected clusters
- [ ] No cannibalization of existing money pages
- [ ] Entity/attribute coverage gaps are specific (not vague “add more content”)
- [ ] Internal links from supporting docs → money pages are defined
- [ ] Schema/FAQ only when it matches visible content
- [ ] Impact rated honestly (low/medium/high)

## Verification checklist (after Corey implements)
- [ ] Live titles/H1s/meta match approved copy
- [ ] New URLs indexable (no accidental noindex/canonical loops)
- [ ] Internal links resolve 200
- [ ] No duplicate H1 / thin stubs shipped
- [ ] Structured data validates if proposed

## feeling.com operating mode
1. Ingest sitemap
2. Map URLs → entities
3. Diff vs competitor SERP entity coverage
4. Submit change proposal for owner approval
5. On approve → implement
6. Pacman verifies live result
`,
  },
  {
    id: "kb-v8r",
    title: "V8r Booking & Listings Operations",
    domain: "v8r",
    summary:
      "Operational knowledge for Pacman when creating or editing V8r booking listings — fields, calendars, media, SEO-facing copy, and change control.",
    source: "Internal V8r booking operations pack",
    updatedAt: ts,
    tags: ["v8r", "booking", "listings", "calendars"],
    content: `# V8r Booking & Listings — Pacman Ops Pack

Pacman owns listing and booking changes. Agents may draft proposals; Pacman implements or verifies.

## Listing anatomy
- **Identity**: title, property type, short pitch, long description
- **Location**: address/geo, neighborhood narrative, map pin accuracy
- **Capacity**: guests, beds, bedrooms, bathrooms
- **Amenities**: structured amenity flags (wifi, parking, kitchen, etc.)
- **Media**: hero + gallery; alt text for SEO/accessibility
- **Pricing**: base rate, weekend/seasonal rules, min stay, fees, deposits
- **Calendar**: blocked dates, external iCal sync, booking window
- **Policies**: cancellation, house rules, check-in/out
- **Booking flow**: instant book vs request, extras/add-ons

## Change control
1. Draft proposal with before/after field list
2. Owner approval required for price, policy, or public copy changes
3. Pacman applies change in V8r
4. Verify: public listing page, calendar, price quote path

## Verification checklist
- [ ] Public title/description match approved copy
- [ ] Amenities reflect reality (no false claims)
- [ ] Calendar blocks correct; no double-book risk
- [ ] Price quote matches intended rules for sample dates
- [ ] Gallery order: hero first, no broken images
- [ ] Booking CTA reachable on mobile

## SEO notes for listings
- Titles: entity + differentiating attribute (location / vessel / experience)
- Descriptions: factual attribute coverage; avoid keyword stuffing
- Unique copy per listing; no boilerplate duplication across fleet
`,
  },
  {
    id: "kb-wordpress",
    title: "WordPress Expert Operations Pack",
    domain: "wordpress",
    summary:
      "Full WordPress ops knowledge for Pacman — posts/pages, themes, plugins, SEO plugins, permalinks, users, media, performance, and safety.",
    source: "Internal WordPress mastery pack",
    updatedAt: ts,
    tags: ["wordpress", "cms", "yoast", "permalinks"],
    content: `# WordPress — Pacman Expert Pack

## Mental model
WordPress = content database + theme presentation + plugins for capabilities.

## Core objects
- **Posts** vs **Pages** — posts are chronological; pages are structural
- **CPTs** — custom post types for listings, testimonials, etc.
- **Taxonomies** — categories/tags or custom
- **Media library** — attachments with alt/title/caption
- **Menus & widgets** — navigation + side regions
- **Users & roles** — Administrator, Editor, Author, Contributor, Subscriber

## Settings Pacman always checks
- Settings → Permalinks: post name (SEO-friendly)
- Reading: homepage display
- Discussion: comment policy
- Media: image sizes
- Privacy / visibility for staging

## Safe change workflow
1. Staging or draft first
2. Proposal → owner approve
3. Implement
4. Clear caches (plugin + CDN)
5. Verify front-end + mobile

## SEO plugin layer (Yoast / Rank Math patterns)
- Focus keyphrase as *entity hint*, not stuffing target
- Title / meta description match approved proposal
- Canonical correct
- Breadcrumbs consistent with IA
- XML sitemap enabled; exclude thin/utility URLs

## Performance & safety
- Prefer caching + image optimization plugins carefully (conflict risk)
- Never edit theme core; child theme or Elementor/theme builder
- Keep WP, theme, plugins updated; review changelogs before prod
- Backups before structural plugin changes
`,
  },
  {
    id: "kb-elementor",
    title: "Elementor Complete Settings & Builder Pack",
    domain: "elementor",
    summary:
      "Elementor builder mastery — containers, widgets, site settings, theme builder, responsive controls, and verification steps.",
    source: "Internal Elementor mastery pack",
    updatedAt: ts,
    tags: ["elementor", "wordpress", "page-builder", "containers"],
    content: `# Elementor — Pacman Expert Pack

## Architecture
- **Containers (Flexbox/Grid)** — modern layout primitive (prefer over legacy Sections/Columns)
- **Widgets** — Heading, Text Editor, Image, Button, Forms, HTML, etc.
- **Site Settings** — global colors, fonts, theme style
- **Theme Builder** — header/footer/single/archive templates
- **Responsive** — desktop / tablet / mobile per-control visibility & sizing

## Site Settings to know cold
- Global colors & fonts (design tokens)
- Theme Style: body, H1–H6, button, form fields
- Layout: content width, gaps
- Lightbox, breakpoints
- Custom CSS ( sparingly; prefer global styles )

## Editing workflow
1. Open with Elementor → structure with Containers
2. Set padding/margin on containers, not random widgets
3. Use global classes / site settings for consistency
4. Mobile pass mandatory before submit for verification
5. Update → clear cache → Pacman verifies

## Common widgets & gotchas
- **Heading**: one H1 per page view
- **Button**: link target + UTM only if approved
- **Image**: compress; set alt text
- **Forms**: confirm submissions + integrations after publish
- **HTML/shortcode**: escape conflicts with optimizers

## Verification checklist
- [ ] Structure uses containers (no accidental nested legacy sections)
- [ ] Typography matches globals
- [ ] No overlapping elements on tablet/mobile
- [ ] CTAs link to approved destinations
- [ ] No layout shift from unloaded fonts/images
- [ ] Theme Builder templates not overridden unintentionally
`,
  },
  {
    id: "kb-ops-pacman",
    title: "PACMAN Agent Operating System",
    domain: "ops",
    summary:
      "How Pacman runs the MDI agent fleet — assignment, approval, implementation, verification, and escalation.",
    source: "Internal ops doctrine",
    updatedAt: ts,
    tags: ["pacman", "ops", "approval", "verification"],
    content: `# PACMAN Operating System

## Role
Pacman is the head of all MDI agents. Pacman:
- Monitors every assigned task to completion
- Enforces approval gates for agents that require them (e.g. Corey)
- Verifies implementations against proposals
- Stays current on SEO + developer news
- Helps only when intervention improves outcomes

## Board columns
1. **Assigned** — queued
2. **Working** — agent executing research/draft
3. **Needs Approval** — proposal ready; owner one-click approve/reject
4. **Implementing** — approved; agent making the change
5. **Verifying** — Pacman checks correctness
6. **Done** — verified complete
7. **Blocked / Rejected** — needs rework or cancelled

## Approval doctrine
If an agent’s \`requiresApproval === true\`, no production change ships without owner Approve.
After Approve → Implementing → Verifying (Pacman) → Done.

## Escalation
Pacman jumps in when:
- Agent stuck > SLA
- Verification fails twice
- Cross-domain conflict (SEO vs booking vs WP)
`,
  },
];
