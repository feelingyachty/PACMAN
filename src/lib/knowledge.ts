import type { KnowledgeDoc } from "./types";

const ts = new Date().toISOString();

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: "kb-seo-turberg",
    title: "Turberg Semantic SEO — Pacman Mastery Pack",
    domain: "seo",
    summary:
      "Koray Tuğberk Gübür semantic SEO as Pacman uses it to brief Corey, judge proposals, and verify live changes.",
    source: "Internal mastery pack — Koray Tuğberk Gübür / Topical Authority methodology",
    updatedAt: ts,
    tags: ["turberg", "koray", "semantic-seo", "topical-map", "corey"],
    content: `# Turberg Semantic SEO — Pacman Mastery Pack

Pacman learned this framework from the start and uses it as the scoring rubric for Corey.

This is not keyword SEO. It is **meaning, coverage, and retrieval cost**.

## Vocabulary Pacman and Corey share

- **Source context** — the real-world domain the site claims expertise in (e.g. yacht charter / destination experience).
- **Central entity** — the thing a URL is about. One URL, one central entity.
- **Attributes** — properties of that entity (location, vessel type, duration, guest count, season).
- **Predicates / facts** — true statements connecting entities (a destination *has* a marina; a charter *includes* a skipper).
- **Query network** — queries that share the same entity need and intent. One dominant URL per network.
- **Topical map** — hierarchy from source context → entities → attributes → facts → supporting URLs.
- **Historical data** — stable definitions and consistent names. Do not rename an entity every brief.
- **Cost of retrieval** — how hard it is for a search engine (or a guest) to get a complete answer from this URL and its neighbors.
- **Information fluency** — the page reads like someone who lives in the domain, not someone stuffing terms.

## How Corey is supposed to work feeling.com

1. Ingest **sitemap.xml**
2. Map every indexable URL → central entity
3. Extract entities/attributes from **ranking documents**, not from a keyword tool alone
4. Diff: what attributes and related entities do winners cover that we do not?
5. Propose the **smallest** set of pages/edits that close the gap without cannibalizing money URLs
6. Submit for **owner Approve**
7. Implement only the approved list
8. Pacman verifies live

## Proposal rules (Approve?)

Pacman rejects vague briefs. A Corey proposal must include:

- Sitemap or URL list touched
- Central entity per URL
- Why this does **not** cannibalize an existing money page
- Attribute gaps named specifically
- Internal links from support → money
- Schema only if the same facts are visible on the page
- Honest impact (low / medium / high)

## Verification rules (after implement)

- Titles, H1, meta match the approved copy
- One H1 per view
- New URLs are indexable (no accidental noindex, no canonical loops)
- Internal links 200
- No thin stubs shipped “to fill the map”
- Structured data validates **and** matches visible text

## What Pacman does not let through

- Keyword-stuffed titles
- New URLs that steal the same intent as an existing money page
- FAQ schema with answers that are not on the page
- “Add more content” with no entity list
- Slug changes on converting URLs without an explicit owner decision
`,
  },
  {
    id: "kb-v8r",
    title: "V8r Booking & Listings — Pacman Ops Pack",
    domain: "v8r",
    summary:
      "How Pacman creates and edits V8r booking listings: fields, calendars, media, pricing, policies, and verification.",
    source: "Internal V8r booking operations pack",
    updatedAt: ts,
    tags: ["v8r", "booking", "listings", "calendars", "pricing"],
    content: `# V8r Booking & Listings — Pacman Ops Pack

Pacman owns production changes to V8r listings and booking. Other agents may draft. Pacman implements or verifies.

## Listing anatomy

Every listing Pacman touches is checked against this skeleton:

- **Identity** — title, property/vessel type, short pitch, long description
- **Location** — address or marina, neighborhood copy, map pin
- **Capacity** — guests, cabins, berths, bathrooms
- **Amenities** — structured flags only if they are true (wifi, A/C, skipper, water toys, parking)
- **Media** — hero first, then gallery; alt text on every image
- **Pricing** — base rate, weekend/season rules, minimum stay, fees, deposits
- **Calendar** — blocked dates, external iCal, booking window, turnaround
- **Policies** — cancellation, house/vessel rules, check-in and check-out
- **Booking path** — instant book vs request, extras, quote preview

## Change control

1. Snapshot current fields (before)
2. Write a field-level after list
3. Owner Approve required for **price, policy, or public copy**
4. Pacman applies the change in V8r
5. Verify public listing, calendar, and a sample quote

## Verification checklist

- Public title and description match the approved copy
- Amenities are real — no marketing fiction
- Calendar blocks are correct; no double-book window
- Sample dates produce the intended price
- Hero image loads; gallery has no broken slots
- Booking CTA works on a phone-width viewport
- Each listing has unique copy — no fleet-wide boilerplate

## SEO on listings

Pacman writes listing titles as **entity + one differentiator** (location, vessel, experience). Descriptions cover attributes as facts. No stuffing. No duplicate paragraphs across the fleet.
`,
  },
  {
    id: "kb-wordpress",
    title: "WordPress — Pacman Expert Pack",
    domain: "wordpress",
    summary:
      "WordPress as Pacman operates it: objects, settings, roles, permalinks, SEO plugins, safety, and publish discipline.",
    source: "Internal WordPress mastery pack",
    updatedAt: ts,
    tags: ["wordpress", "cms", "permalinks", "roles", "seo-plugin"],
    content: `# WordPress — Pacman Expert Pack

WordPress is a content database plus a theme plus plugins. Pacman never treats the editor as the whole system.

## Objects

- **Posts** — dated, changeable, usually in a feed
- **Pages** — structural, in the IA
- **Custom post types** — listings, testimonials, destinations when the theme/plugin defines them
- **Taxonomies** — categories, tags, or custom
- **Media** — attachments with alt, title, caption
- **Menus / widgets** — navigation and side regions
- **Users** — Administrator, Editor, Author, Contributor, Subscriber

## Settings Pacman always opens

- Settings → Permalinks → Post name
- Settings → Reading → homepage
- Settings → Discussion — comments policy
- Settings → Media — image sizes
- Visibility / indexing on staging vs production
- Users → only the roles needed

## SEO plugin layer (Yoast, Rank Math, and equivalents)

- Focus keyphrase is an **entity hint**, not a stuffing target
- Title and meta must match the approved proposal
- Canonical must point at the URL we intend to rank
- Breadcrumbs follow the IA
- XML sitemap on; thin utility URLs out
- Noindex thank-you, cart, and account screens

## Safe change workflow

1. Draft or staging first
2. Proposal → owner Approve if it is public
3. Publish
4. Clear page cache, object cache, and CDN
5. Pacman verifies the front-end, the template, and a phone-width pass

## Safety

- Child theme or a builder — never edit parent theme core
- Backup before plugin or PHP changes
- Update WordPress, theme, and plugins with a changelog read
- One optimization plugin stack — do not stack three caches
`,
  },
  {
    id: "kb-elementor",
    title: "Elementor — Settings, Builder, Verification",
    domain: "elementor",
    summary:
      "Elementor the way Pacman verifies it: containers, site settings, theme builder, responsive controls, widgets, and failure modes.",
    source: "Internal Elementor mastery pack",
    updatedAt: ts,
    tags: ["elementor", "containers", "theme-builder", "site-settings"],
    content: `# Elementor — Pacman Expert Pack

## Architecture

- **Containers (Flexbox / Grid)** — the layout primitive. Prefer these.
- **Legacy sections / columns** — do not introduce on new work.
- **Widgets** — Heading, Text, Image, Button, Form, HTML, Loop, etc.
- **Site Settings** — global colors, fonts, theme style, layout width, breakpoints, lightbox
- **Theme Builder** — header, footer, single, archive, 404
- **Responsive** — desktop / tablet / mobile per control, plus hide/show

## Site Settings Pacman knows cold

- Global colors and fonts (tokens, not one-off hex on every widget)
- Theme Style: body, H1–H6, buttons, form fields
- Layout: content width, gaps
- Breakpoints
- Custom CSS only when a global style cannot do it

## Edit discipline

1. Structure with containers
2. Padding and margin on containers first
3. Use globals
4. Mobile pass before any proposal is called done
5. Update → cache clear → Pacman verifies

## Widget failure modes

- Heading: more than one H1 on the view
- Button: wrong destination or unapproved UTM
- Image: no alt, huge uncompressed file
- Form: submissions not landing after publish
- HTML: optimizer strips or breaks it

## Verification checklist

- Containers, not accidental nested legacy sections
- Typography from globals
- No overlap on tablet or mobile
- CTAs go where the proposal said
- Theme Builder template was not silently overridden
- No layout shift from fonts or hero images
`,
  },
  {
    id: "kb-ops-pacman",
    title: "PACMAN Operating System",
    domain: "ops",
    summary:
      "Standing orders: new-agent intake, approval doctrine, verification, and when Pacman helps.",
    source: "Internal ops doctrine",
    updatedAt: ts,
    tags: ["pacman", "ops", "approval", "onboarding"],
    content: `# PACMAN Operating System

Pacman is the head of every MDI agent.

Pacman:

- Watches every assigned task until it is Done or honestly Blocked
- Builds a **progress page** for every new agent
- Turns **approval ON** when that agent can change production
- Verifies implementations against the approved proposal
- Stays current on SEO and developer news
- Helps only when helping changes the outcome

## Standing order — new agent (ALWAYS)

When the owner says “this is a new agent”:

1. Roster them (name, role, specialty, mandate)
2. Open \`/agents/{id}\` so the owner can see **everything they do**
3. Approval gate ON for SEO, WordPress, V8r/booking, and production code
4. Seed a first assignment card so the lane is never empty
5. Log the onboard event
6. From then on: assign → they work → they propose if needed → owner Approves → they implement → Pacman verifies

No exceptions. New agent = new visibility + the right approval rules.

## Board

1. Assigned
2. Working
3. Needs Approval
4. Implementing
5. Pacman Review
6. Done
7. Blocked / Rejected

## Approval doctrine

If \`requiresApproval\` is true, nothing public ships without Approve.

Approve → Implementing → Pacman Review → Done.

## When Pacman steps in

- Agent stuck past the point of usefulness
- Verification fails twice
- Two domains collide (SEO vs booking vs WordPress)
- The owner asks
`,
  },
  {
    id: "kb-n8n",
    title: "Feeling Yachty n8n + MCP",
    domain: "n8n",
    summary:
      "Pacman is connected to feelingyachty.app.n8n.cloud. MCP HTTP endpoint is live and auth-gated. AI workflows are treated as agents.",
    source: "https://feelingyachty.app.n8n.cloud/mcp-server/http",
    updatedAt: ts,
    tags: ["n8n", "mcp", "ghl", "wordpress"],
    content: `# Feeling Yachty n8n

Instance: https://feelingyachty.app.n8n.cloud
MCP: https://feelingyachty.app.n8n.cloud/mcp-server/http

The MCP URL answers, but it requires an Authorization header. Until a bearer token is in the environment, Pacman can list and watch workflows via the n8n API, not call MCP tools.

## Agents that live in n8n

- **Sales** — AI Sales Assistant (SMS). Grok + GHL tools + human handover.
- **Support** — Support Receptionist Bot. Chat qualify / handoff.
- **Omni** — Omni Inbound AI Router. Missed-call seeds + live-send gate.
- **Blogger** — WordPress Auto Blogging. Miami + Panama. Production content. Approval required.

## Pacman rules for n8n agents

- Prompt, routing, or publish-mode changes need Approve
- Blogger posts are production WordPress — Pacman verifies
- Live SMS send stays behind Omni's Live Send? gate
- The rest of the instance (Bokun, Woo, GHL chats, docs SMS) is ops automation — watch health, do not "help" unless asked
`,
  },
];
