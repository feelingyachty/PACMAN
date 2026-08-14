# Feeling Yachty — Integration Paths

How external systems connect through n8n to GHL, Slack, and Google Chat. No secrets or API keys are documented here — use n8n credentials UI.

Instance base: `https://feelingyachty.app.n8n.cloud`

---

## 1. Bokun / Viator → GHL (+ Slack)

### New booking → GHL
| | |
|--|--|
| Workflow | `TkLWlpBVSa287X5E` — Bokun New Booking to GHL |
| Active | Yes |

**Flow:**  
Webhook → **Normalize Booking Data** (prefer `activityBookings`; fallback `productBookings` / invoice) → **Sanitize Phone** (E.164) → **Upsert GHL Contact** (Viator/Bokun custom fields + tags) → **Create Booking Record** → **Link Contact to Booking**

**Notes:**
- Real Viator webhooks use **`activityBookings`**, not only `productBookings`.
- Phone omitted from GHL upsert unless it starts with `+`.
- Writes the **Viator / Bokun Booking** custom-field set (21 fields in GHL folder).

### Change / cancel → GHL + Slack
| | |
|--|--|
| Workflow | `Mmj0jlpswUuXA4GG` — Bokun Booking Change/Cancel to Slack |
| Active | Yes |
| Webhook path | `fy-bokun-booking-change` |
| Full URL | `https://feelingyachty.app.n8n.cloud/webhook/fy-bokun-booking-change` |

**Flow:**  
**Bokun Change Webhook** → **Normalize Change Data** → **Sanitize Phone** → **Upsert GHL Contact** (tags: `bokun_booking`, `viator`, `viator_cancelled` or `viator_updated`, and **`viator_cancel_urgent_48h`** when cancel is within ~48h) → **Merge Alert Payload** → **IF Urgent Cancel** → Slack to **`#viator-cancellation-modifications-updates`** (`C0BQ42JBKHU`)

---

## 2. WooCommerce (Panama / Miami) → GHL → Google Chat

### Paid order router
| | |
|--|--|
| Workflow | `vokMW7sXUJCuncxc` — WooCommerce Order Paid to GHL Router |
| Active | Yes |
| Trigger | WooCommerce **Order Updated** |

**Flow:**  
**Is Order Paid** → **Determine City & Order Info** → **Upsert GHL Fees Paid** → **Route to Panama or Miami** → HTTP to corresponding **GHL inbound webhooks** (Panama / Miami)

### Staff Chat mirrors (from GHL)
| Workflow ID | Name |
|-------------|------|
| `aSaECkefyG2FbW3S` | GHL Panama WooCommerce Order to Google Chat |
| `shnHRgDJiu4qI8Bo` | GHL Miami WooCommerce Order to Google Chat |

Pattern: GHL webhook → **Normalize Fields** → post to billing Chat space.

### Profile backfill
| | |
|--|--|
| Workflow | `rFKFpjz2aV9IpVFO` — WooCommerce Profile Backfill |
| Active | Yes |

Webhook → list Woo orders → plan → loop **Upsert GHL WC Profile**.

---

## 3. WordPress → GHL (+ Google Chat)

| | |
|--|--|
| Workflow | `t5qCvpFPAZra3mtU` — WordPress to GHL Sync |
| Active | Yes (but **silent** — no live webhooks since **Aug 8**) |
| Webhook path | `fy-webhook` |

**Flow (from sticky note / structure):**
1. **WordPress Webhook** (raw body) → **Verify HMAC Signature**
2. Always **Store Webhook Data** (audit table); invalid signature → **Reject - 401**
3. **Route by Event**:
   - **`booking.paid`** → Upsert contact → Add booking note → **Notify: New Booking** (Google Chat) → 200
   - **`ticket.created`** → Upsert → Create task/note → **Notify: New Ticket**
   - **`ticket.reply`** → Upsert → Update conversation (email via GHL) → 200 (no Chat)
   - Unknown → 200 ignored

**Ops notes:**
- HMAC secret lives in the Verify node / credentials — rotate via n8n UI; do not paste into git.
- WP deliveries are fire-once; failures live in WP Activity Log.
- **FY WP Push Test** (`7kUHv3SnHmsacwo1`, inactive): manual GET yachts for auth; **app password was invalid**.

### Related WP (not GHL)
- **WordPress Auto Blogging** (`gKezuNipPn2PjqTV`) — AI drafts to WP + Slack draft-ready  
- Legacy inactive: Panama / Miami separate bloggers  
- **My Database WordPress Price Push** (`g43rMtzoPHrvegIT`) — Sheet → WP prices  

---

## 4. Slack

| Channel | ID | Used for |
|---------|-----|----------|
| `#n8n-errors` | `C0BPZ5WT9V1` | Automation errors; fixes coordinated in PACMAN `/n8n` |
| `#viator-cancellation-modifications-updates` | `C0BQ42JBKHU` | Bokun/Viator update & cancel alerts (urgent &lt;48h uses `@channel`) |

Other Slack usage: WordPress Auto Blogging **Slack Draft Ready** (content ops, not GHL).

---

## 5. Google Chat

Most GHL → Chat bridges share the same shape:

```
GHL Workflow Webhook → Normalize Fields → [optional Switch] → HTTP / Google Chat post
```

| Workflow | Purpose |
|----------|---------|
| `3yH7bb3XoXWmrVw2` | Consolidated reminders (Panama/Miami missed call + message) |
| `64WNnB3HrNJOrVNB` | Payment pending → billing Chat |
| `RUqfXaObxUUup2Ys` | Website order → Miami/Panama billing Chat |
| `JmFABzKCKszc06YB` | Viator charter pipeline alert |
| `Vh90KZMaefUxL2sY` | Original/organic charter alert |
| `muYU19IHNO9C1s5J` | Qualified leads alert |
| `aSaECkefyG2FbW3S` / `shnHRgDJiu4qI8Bo` | Woo Panama / Miami orders |
| `lFWzUjwsJBaYI4eP` | Day-before missing docs (ops alert + tags) |
| `t5qCvpFPAZra3mtU` | WP booking/ticket notifies (when WP fires) |

---

## 6. GHL internal automation (SMS / tags / forms)

These are not third-party “integrations” but close the GHL loop:

| Path | Workflows |
|--------|-----------|
| Agreement forms ↔ tags | `GfAhDXH69wekCJDq` Charter Agreement Sync |
| Agreement SMS | `Iy9OnTlVA0gB2vkW` |
| Docs pack SMS | `620PZ7PYfvRHeWEK` |
| ID form sync | `75uNzV4CwhunbVZf` |
| Pipeline opportunities | `L4P6x6As9FYO5tzR` |
| Call → notes | `DVWnX1MM2ljzalDY` |
| Review SMS | `nPUKffAsEmXzE7AE` |
| History backfill | `2tJkGIvRlvWFbrpf` |

---

## 7. BookMyBoat / Sheets (no GHL)

| Workflow | Role |
|----------|------|
| `1AivD5g0J0mNrmil` | Weekly BookMyBoat API ↔ Sheet + email |
| `mXp0HzVvmCY5GQJo` | Same for client sheet |

Useful for fleet/ops data; not wired into GHL contacts.

---

## Quick reference — webhook paths (public)

| Path | Workflow |
|-------|----------|
| `/webhook/fy-bokun-booking-change` | Bokun change/cancel |
| `/webhook/fy-webhook` | WordPress → GHL |
| `/webhook/ghl-ai-agent` | Called by Omni Router → AI Sales Assistant |

Exact GHL-outbound webhook paths for Chat bridges are configured inside each GHL workflow + n8n webhook node; discover with `n8n_get_workflow` structure mode if regenerating URLs.

---

## Checklist for new engineers

1. Prefer **structure** mode when exploring; use **details** / sticky notes for WP Sync and similar documented canvases.  
2. Never commit HMAC secrets, GHL tokens, or Woo/WP app passwords.  
3. Always normalize phones to **E.164** before GHL upsert.  
4. For Viator: parse **`activityBookings`** first.  
5. If WP→GHL is quiet, check WP plugin webhooks + HMAC before debugging n8n (last live activity ~Aug 8).  
6. Urgent Viator cancels: confirm tag `viator_cancel_urgent_48h` and Slack `C0BQ42JBKHU`.
