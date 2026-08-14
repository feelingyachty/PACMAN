# Feeling Yachty — GHL / n8n System Overview

GoHighLevel (GHL) is the CRM hub. n8n (`feelingyachty.app.n8n.cloud`) is the integration and automation layer: bots, booking intake, payment bridges, docs lifecycle, and staff alerts.

```
                    ┌─────────────────────────────────────┐
                    │           GoHighLevel (CRM)         │
                    │  Contacts · Tags · Opportunities · SMS │
                    │  Custom fields: Viator / Bokun (21)  │
                    └───────────────┬───────────────────────┘
           inbound ▲               │               │ outbound
                   │               ▼               ▼
    Bokun / Viator │         n8n Cloud          SMS to guests
    WooCommerce    │    feelingyachty.app…      Google Chat
    WordPress      │                             Slack (#viator…, #n8n-errors)
    Website bots   │
```

---

## CRM hub (GHL)

GHL stores guests, pipeline stages, conversation history, and tags that drive automation:

| Concern | How it shows up |
|---------|-----------------|
| Identity | Contact upsert by email/phone; **phone must be E.164** |
| Booking source | Tags like `bokun_booking`, `viator`, `woocommerce`, `booking-paid` |
| Docs state | Tags for fees paid, needs agreement, signed, docs pack sent, ID on file, day-before alerted, review asked |
| AI control | `human handover`, `disabled_temp`, AI-active / missed-seeded tags |
| Viator cancel urgency | `viator_cancel_urgent_48h` |

### Custom field folder: **Viator / Bokun Booking** (21 fields)

Used heavily by Bokun new-booking and change/cancel workflows. Fields written include (keys as used in n8n):

- `booking_reference`, `product_purchased`, `charter_date`, `charter_time`, `guest_count`
- `inclusions`, `exclusions`, `special_requests`, `rate_package`, `yacht_location`, `charter_duration`
- `third_party_booking_order_viator_trip_advisor_get_your_guide_expedia_etc`
- `payment_status`, `order_total`, `lead_source_type`, `service_interested`, `preferred_city`
- `reservation_status`, `inquiry_status`
- `bokun_booking_id`, `bokun_channel`, `bokun_extras`, `bokun_raw_summary`

---

## Bots (AI layer)

| Bot | Workflow ID | Role |
|-----|-------------|------|
| **AI Sales Assistant SMS** | `4XzFaUrhStHu8TwB` | GHL SMS/WhatsApp sales agent (Grok + GHL tools) |
| **Omni Inbound AI Router** | `0niqJuwwVeYjim3i` | Polls unanswered inbound / missed calls → seeds SMS or calls AI Sales webhook |
| **Support Receptionist Bot** | `fbg3vzibqAMnda6Y` | Website support chat; logs qualified leads |
| **Mom Bot** | `7cY6co0FV7PDEaz3` (+ training export `7g4Q3OVzvxTqP2m7`) | Voice/training bot modeled on Karin conversations |
| **Viator Section Bot** | `mIQiRjAwyPZLJV1X` | City-aware Q&A for Viator website section |

Shared listing data: **Yacht Listings Data Sub** (`zjjBklS6cICHUriQ`) reads a Google Sheet for bot tools.

Detail: [`BOTS.md`](./BOTS.md).

---

## Inbound integrations → GHL

| Source | Path | Primary workflows |
|--------|------|-------------------|
| **Bokun / Viator** | Webhooks → normalize `activityBookings` → upsert contact (+ booking record on create) | `TkLWlpBVSa287X5E`, `Mmj0jlpswUuXA4GG` |
| **WooCommerce** (Panama/Miami) | Order paid → route city → GHL webhooks + fees-paid upsert | `vokMW7sXUJCuncxc` → GHL, then Chat workflows |
| **WordPress** | HMAC webhook `fy-webhook` for `booking.paid` / tickets | `t5qCvpFPAZra3mtU` — **active but silent since Aug 8** |

Detail: [`INTEGRATIONS.md`](./INTEGRATIONS.md).

---

## Outbound from GHL / n8n

### SMS (guest-facing)
- Omni Router / AI Sales replies  
- Charter agreement reminders  
- Post-pay docs pack  
- Post-trip review  

### Google Chat (staff)
Pattern: GHL workflow fires n8n webhook → normalize fields → HTTP/Google Chat post.

- Reminders (Panama/Miami missed call + message)  
- Payment pending, website orders, Woo Panama/Miami orders  
- Viator charter, original charter, qualified leads  
- Day-before missing docs  
- WordPress booking/ticket notifies (when WP fires)  

### Slack
- **`#viator-cancellation-modifications-updates`** (`C0BQ42JBKHU`) — Bokun update/cancel (with `<!channel>` on urgent &lt;48h)  
- **`#n8n-errors`** (`C0BPZ5WT9V1`) — automation failures  
- Blog draft-ready notifications (WordPress Auto Blogging)  
- Fixes coordination: PACMAN `/n8n`  

**Bokun change webhook URL:**  
`https://feelingyachty.app.n8n.cloud/webhook/fy-bokun-booking-change`

---

## Docs & charter lifecycle (GHL-centric)

```
Paid (fees / Woo / Bokun)
    → Post-Pay Docs Pack SMS
    → Charter Agreement Sync (forms ↔ tags)
    → Agreement Reminder SMS
    → Government ID Form Sync
    → Day-Before Missing Docs Alert (staff Chat)
    → Post-Trip Review SMS
```

Pipeline Stage Sync keeps opportunities aligned with qualified + paid tags.

---

## Important facts (from ops / Slack)

| Fact | Detail |
|------|--------|
| n8n instance | `feelingyachty.app.n8n.cloud` |
| Fix routing | PACMAN `/n8n` |
| Errors channel | `#n8n-errors` `C0BPZ5WT9V1` |
| Viator Slack | `#viator-cancellation-modifications-updates` `C0BQ42JBKHU` |
| Phone format | E.164 required for GHL |
| Viator payload shape | Prefer `activityBookings` over `productBookings` |
| Urgent cancel | Tag `viator_cancel_urgent_48h` |
| WP → GHL | Silent — no live webhooks since Aug 8 |
| FY WP Push Test | Inactive; WP app password was invalid |

---

## Related docs

- Full workflow table: [`../n8n/WORKFLOW_INVENTORY.md`](../n8n/WORKFLOW_INVENTORY.md)  
- Bot node flows: [`BOTS.md`](./BOTS.md)  
- Integration paths: [`INTEGRATIONS.md`](./INTEGRATIONS.md)
