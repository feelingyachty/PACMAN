# Feeling Yachty — n8n Workflow Inventory

Instance: `feelingyachty.app.n8n.cloud`  
Documented from live workflow structure (n8n MCP). Do not commit secrets or credential values.

**Ops:** Fixes go to PACMAN `/n8n`. Errors channel: `#n8n-errors` (`C0BPZ5WT9V1`).

| Status | Count |
|--------|------:|
| Active | 33 |
| Inactive | 5 |
| **Total** | **38** |

---

## Complete inventory

| ID | Name | Active | Purpose (inferred) | GHL relevance |
|----|------|:------:|---------------------|---------------|
| `0niqJuwwVeYjim3i` | Omni Inbound AI Router | Yes | Polls GHL conversations + missed-call tags; seeds missed-call SMS or calls AI Sales Assistant webhook; dedup via data table; tag gate blocks `human handover` / `disabled_temp` | **Core** — conversation search, contact tags, SMS/WhatsApp send via GHL API |
| `1AivD5g0J0mNrmil` | BookMyBoat Weekly Sync | Yes | Weekly (or webhook) sync of BookMyBoat API → Google Sheet; diffs, logs, email summary | None (ops/inventory sheets) |
| `2tJkGIvRlvWFbrpf` | Full Charter+ID History Backfill | Yes | Manual/webhook backfill: pulls Viator + Bareboat form pages (V1–V3, B1–B3), writes charter/ID fields + tags to GHL contacts | **High** — historical custom-field + tag backfill |
| `3ntAg4vVAUkB0YYD` | Panama WordPress Auto Blogging | No | Legacy Panama-only AI blog publisher (topic table → OpenAI → WP media/post). Superseded by consolidated blogger | None |
| `3yH7bb3XoXWmrVw2` | GHL Reminders to Google Chat | Yes | GHL webhook → normalize → switch by reminder type → Panama/Miami missed-call or message reminder Chat posts | **High** — outbound alert from GHL workflows |
| `4XzFaUrhStHu8TwB` | AI Sales Assistant SMS | Yes | GHL inbound SMS webhook → AI agent (xAI Grok) with GHL tools (get/create/update contact, tags); human-handover gate; assign/email Muhammad when needed | **Core** — primary sales AI on GHL conversations |
| `620PZ7PYfvRHeWEK` | Post-Pay Docs Pack SMS | Yes | Schedule/webhook: find fees-paid / Woo-paid contacts missing docs pack; SMS agreement + ID links; tag `docs pack sent` | **High** — tag searches + SMS via GHL |
| `64WNnB3HrNJOrVNB` | GHL Payment Pending to Google Chat | Yes | GHL webhook → billing Chat for payment-pending opportunities | **High** — alert bridge |
| `75uNzV4CwhunbVZf` | Government ID Form Sync | Yes | Every 30m / webhook: fetch Viator + Bareboat form submissions → write ID fields + tags on GHL contacts | **High** — form → contact custom fields |
| `7cY6co0FV7PDEaz3` | Mom Bot Chat TEST | Yes | Webhook chat bot (Mom Bot agent + Grok + yacht listings sub-workflow) for training/voice testing | Indirect (training for GHL-style sales voice) |
| `7g4Q3OVzvxTqP2m7` | Mom Bot Training Data Export | Yes | Export Karin GHL conversation pairs → Sheets; AI filter generic replies; also hosts export-chat agent path | **High** — reads GHL conversations/messages |
| `7kUHv3SnHmsacwo1` | FY WP Push Test | No | Manual auth test: GET WordPress yachts (app password was invalid) | None |
| `DVWnX1MM2ljzalDY` | Call Transcript to Notes | Yes | Schedule/webhook: GHL conversations → call recordings → Whisper → contact notes; dedup table | **High** — conversations + notes API |
| `E35PUvzWdlzcgvT0` | PPC Leads Report | No | Daily GHL conversation/contact/notes scrape → Google Sheet report | **Medium** — reporting only |
| `GfAhDXH69wekCJDq` | Charter Agreement Sync & Reminders | Yes | Every 30m: match paid contacts to signed charter forms; tag signed / needs agreement; clear needs when signed | **Core** — agreement lifecycle on contacts |
| `Iy9OnTlVA0gB2vkW` | Charter Agreement Reminder SMS | Yes | Webhook-driven: contacts with needs-agreement (not signed) → SMS reminder + reminded tag | **High** |
| `JmFABzKCKszc06YB` | GHL Viator Charter to Google Chat | Yes | GHL webhook → Chat for new Viator charter pipeline events | **High** |
| `L4P6x6As9FYO5tzR` | Pipeline Stage Sync | Yes | Schedule/webhook: organic/Viator qualified + paid tags → upsert GHL opportunities/stages | **Core** — opportunity stage automation |
| `Mmj0jlpswUuXA4GG` | Bokun Booking Change/Cancel to Slack | Yes | Bokun change webhook → normalize (`activityBookings`) → E.164 phone → upsert GHL (Viator/Bokun fields + urgent tag) → Slack `#viator-cancellation-modifications-updates` | **Core** — Viator cancel/update path |
| `RUqfXaObxUUup2Ys` | GHL Website Order to Google Chat | Yes | GHL website-order webhook → Miami/Panama billing Chat (or unmatched no-op) | **High** |
| `TkLWlpBVSa287X5E` | Bokun New Booking to GHL | Yes | Bokun new-booking webhook → normalize + E.164 → upsert contact → create booking record → link contact | **Core** — Viator/Bokun intake |
| `Vh90KZMaefUxL2sY` | GHL Original Charter to Google Chat | Yes | GHL webhook → Chat for organic/original charter events | **High** |
| `WboCfAlfDwHDaYHA` | TEMP AI Stress Test GHL Helper | No | Temporary helper webhook: upsert / tag / get GHL contact for AI stress tests | Test-only |
| `aSaECkefyG2FbW3S` | GHL Panama WooCommerce Order to Google Chat | Yes | GHL Panama Woo order webhook → billing Chat | **High** |
| `fbg3vzibqAMnda6Y` | Support Receptionist Bot | Yes | Website support chat webhook → Grok agent + structured output; logs qualified leads to data table; yacht lookup tool currently disabled | Indirect (lead capture; not GHL SMS) |
| `g43rMtzoPHrvegIT` | My Database WordPress Price Push | Yes | Weekly/webhook: Google Sheet prices ↔ WP yachts; push price updates + email summary | None (WP catalog) |
| `gKezuNipPn2PjqTV` | WordPress Auto Blogging | Yes | Consolidated Miami + Panama scheduled AI blogging → draft WP posts + Slack “draft ready” | None |
| `lFWzUjwsJBaYI4eP` | Day-Before Missing Docs Alert | Yes | Schedule/webhook: day-before trips missing agreement/ID → Google Chat ops alert + alerted tags | **High** |
| `mIQiRjAwyPZLJV1X` | Viator Section Bot | Yes | Website Viator-section chat: detect city + KB → Grok agent + structured output | Indirect (Viator web Q&A) |
| `mXp0HzVvmCY5GQJo` | BookMyBoat Weekly Sync Client Sheet | Yes | Same pattern as BookMyBoat sync for client-facing sheet | None |
| `muYU19IHNO9C1s5J` | GHL Qualified Leads to Google Chat | Yes | GHL qualified-lead webhook → Chat | **High** |
| `nPUKffAsEmXzE7AE` | Post-Trip Review SMS | Yes | Schedule/webhook: post-trip paid contacts → review SMS + `review asked` tag | **High** |
| `qlkHJz9t8Hycxckw` | Miami WordPress Auto Blogging | No | Legacy Miami-only blogger; replaced by consolidated workflow | None |
| `rFKFpjz2aV9IpVFO` | WooCommerce Profile Backfill | Yes | Webhook: list Woo orders → upsert GHL WooCommerce profile fields | **High** |
| `shnHRgDJiu4qI8Bo` | GHL Miami WooCommerce Order to Google Chat | Yes | GHL Miami Woo order webhook → billing Chat | **High** |
| `t5qCvpFPAZra3mtU` | WordPress to GHL Sync | Yes | HMAC-signed WP webhook (`fy-webhook`): `booking.paid` / `ticket.created` / `ticket.reply` → GHL upsert/notes/conversation + Google Chat. **Silent since ~Aug 8** (no live WP deliveries) | **Core** when WP fires |
| `vokMW7sXUJCuncxc` | WooCommerce Order Paid to GHL Router | Yes | Woo order-updated trigger → if paid → upsert fees-paid → route Panama vs Miami GHL inbound webhooks | **Core** — Woo → GHL payment bridge |
| `zjjBklS6cICHUriQ` | Yacht Listings Data Sub | Yes | Sub-workflow: read yacht listings Google Sheet → trim for bot tools | Shared by Mom Bot / chat agents |

---

## Grouped by role

### AI / bots
- Omni Inbound AI Router  
- AI Sales Assistant SMS  
- Support Receptionist Bot  
- Mom Bot Chat TEST  
- Mom Bot Training Data Export  
- Viator Section Bot  
- Yacht Listings Data Sub  
- TEMP AI Stress Test GHL Helper (inactive)

### Booking & payment intake
- Bokun New Booking to GHL  
- Bokun Booking Change/Cancel to Slack  
- WooCommerce Order Paid to GHL Router  
- GHL Panama / Miami WooCommerce Order → Google Chat  
- GHL Website Order to Google Chat  
- WordPress to GHL Sync  

### Docs, agreements, lifecycle SMS
- Charter Agreement Sync & Reminders  
- Charter Agreement Reminder SMS  
- Post-Pay Docs Pack SMS  
- Government ID Form Sync  
- Day-Before Missing Docs Alert  
- Post-Trip Review SMS  
- Full Charter+ID History Backfill  
- WooCommerce Profile Backfill  

### Alerts (GHL → Google Chat)
- GHL Reminders to Google Chat  
- GHL Payment Pending to Google Chat  
- GHL Viator Charter to Google Chat  
- GHL Original Charter to Google Chat  
- GHL Qualified Leads to Google Chat  

### CRM hygiene / enrichment
- Pipeline Stage Sync  
- Call Transcript to Notes  

### Content & catalog (low/no GHL)
- WordPress Auto Blogging (+ inactive Panama/Miami legacy)  
- My Database WordPress Price Push  
- BookMyBoat Weekly Sync (+ Client Sheet)  
- FY WP Push Test (inactive)  
- PPC Leads Report (inactive)  

---

## Known operational notes

- **Phone → GHL:** must be E.164 (`+…`); Bokun flows sanitize before upsert and omit phone if not `+`-prefixed.  
- **Viator webhooks:** real payloads use `activityBookings` (not only `productBookings`).  
- **Urgent cancel tag:** `viator_cancel_urgent_48h` (Slack channel `C0BQ42JBKHU`).  
- **WordPress → GHL Sync:** last executions ~Aug 8; active but no live webhooks since then.  
- **FY WP Push Test:** inactive; WP app password was invalid when tested.  

See also: [`../ghl/SYSTEM_OVERVIEW.md`](../ghl/SYSTEM_OVERVIEW.md), [`../ghl/BOTS.md`](../ghl/BOTS.md), [`../ghl/INTEGRATIONS.md`](../ghl/INTEGRATIONS.md).
