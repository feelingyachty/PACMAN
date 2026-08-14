# Feeling Yachty — GHL-Related Bots

High-level purpose and node flow for each AI / chat bot workflow. Structures sampled via n8n MCP (`mode=structure`, selected nodes filtered where helpful).

---

## 1. AI Sales Assistant SMS

| | |
|--|--|
| **ID** | `4XzFaUrhStHu8TwB` |
| **Active** | Yes |
| **Trigger** | GHL webhook (inbound SMS/WhatsApp message) |
| **Model** | xAI Grok (`lmChatXAiGrok`) |

### Purpose
Primary sales agent attached to GHL conversations. Answers guests, updates contacts/tags via tools, and can hand off to a human.

### Node flow
1. **GHL Webhook** → **Normalize Input**
2. **Empty Message?** → early **Empty Message Reply** if blank
3. **Get Contact Gate** → **Has Human Handover?**  
   - If tagged for human handover → **Handover Reply** (no AI)
4. **Get Session** (data table) → **Resolve Contact ID** → **Check Gap** → **IF Should Reset**  
   - Optional **Reset Memory** → **Upsert Session**
5. **AI Agent** with:
   - Memory: **Window Buffer Memory**
   - Tools: **Get / Create / Update GHL Contact**, **Add GHL Tags**
6. **Persist Contact Mapping** (code + data table)
7. **Needs Assignment?**  
   - Yes → **Assign to Muhammad** → **Upsert Muhammad Contact** → **Email Muhammad**  
   - Then **Respond to Webhook** (reply body for GHL)

### GHL relevance
Direct: contact CRUD, tags, assignment, conversation reply path.

---

## 2. Omni Inbound AI Router

| | |
|--|--|
| **ID** | `0niqJuwwVeYjim3i` |
| **Active** | Yes |
| **Triggers** | Schedule + Webhook |

### Purpose
Poller/router that finds conversations needing a reply (or missed-call seeds) and either sends a missed-call SMS or invokes the AI Sales Assistant webhook (`/webhook/ghl-ai-agent`). Deduplicates via data table. Tag gate skips `human handover` and `disabled_temp`.

### Node flow
1. **Schedule** or **Webhook** → **Config** (lookback, dry-run defaults: webhook dry unless `dryRun=false`; schedule live; caps on actions)
2. **Search Conversations** → **Search Missed Call Tags** → **Filter Candidates**
3. **Has Candidates?** → loop **Process Candidate**
4. **Need Messages?** → optional **Get Messages** → **Analyze Action**  
   - Missed-call path → `missed_call_seed`  
   - Else latest inbound SMS/WhatsApp with no later outbound → `ai_reply`
5. **Should Process?** → **Check Dedup** → **Already Processed?**
6. **Get Contact** → **Tag Gate** → **Allow AI?** → **Live Send?**
7. **Is Missed Seed?**  
   - Yes: **Send Missed Call SMS** → **Tag Missed Seeded**  
   - No: **Call AI Agent** → **Send AI Reply** → **Tag AI Active**
8. **Mark Processed** → **Next Candidate** / **Summary Report**

### GHL relevance
Core orchestration for AI SMS coverage on the CRM inbox.

---

## 3. Support Receptionist Bot

| | |
|--|--|
| **ID** | `fbg3vzibqAMnda6Y` |
| **Active** | Yes |
| **Trigger** | **Support Bot Chat Webhook** |

### Purpose
Website support receptionist: qualify interest, respond via chat API, and log handoff-ready leads.

### Node flow
1. **Support Bot Chat Webhook** → **Normalize Input**
2. **Support Receptionist Agent** (Grok + **Chat Memory** + **Structured Output Parser**)
3. Parallel: **Respond** to webhook  
   and **Handoff Ready?** → **Log Qualified Lead** (data table)
4. **Yacht Listings Lookup** tool exists but is **disabled**

### GHL relevance
Indirect — lead logging is in n8n data table; not the GHL SMS agent. Qualified leads in GHL may still alert via the separate **GHL Qualified Leads to Google Chat** workflow when GHL workflows fire.

---

## 4. Mom Bot Chat (TEST)

| | |
|--|--|
| **ID** | `7cY6co0FV7PDEaz3` |
| **Active** | Yes |
| **Trigger** | **Mom Bot Chat Webhook** |

### Purpose
Test harness for the “Mom” / Karin sales voice with live yacht listing lookup.

### Node flow
1. **Mom Bot Chat Webhook** → **Mom Bot Agent**
2. Tools/memory: **Yacht Listings Lookup** (sub-workflow), **Chat Memory**, **xAI Grok**
3. **Respond**

### Related: Mom Bot Training Data Export (`7g4Q3OVzvxTqP2m7`)
- **Manual** / **Extraction Webhook**: pull GHL conversations → filter last year → extract Karin message pairs → AI classifier strips generic replies → **Save Training Row** (Sheets)
- Secondary **Chat Webhook** path hosts an export-time Support Receptionist agent (OpenAI) that can save chat leads to Sheets

### GHL relevance
Training data is sourced from GHL conversations; the TEST bot itself is webhook chat, not inbox SMS.

---

## 5. Viator Section Bot

| | |
|--|--|
| **ID** | `mIQiRjAwyPZLJV1X` |
| **Active** | Yes |
| **Trigger** | **Viator Bot Webhook** |

### Purpose
Site chat for Viator-facing pages: detect city, load knowledge base context, answer with structured output.

### Node flow
1. **Viator Bot Webhook** → **Detect City + Load KB** (code)
2. **Viator Section Agent** (Grok + **Chat Memory** + **Structured Output Parser**)
3. **Respond**

### GHL relevance
Indirect (web Q&A). Viator *bookings* enter GHL via Bokun workflows, not this bot.

---

## 6. Yacht Listings Data (Sub)

| | |
|--|--|
| **ID** | `zjjBklS6cICHUriQ` |
| **Active** | Yes |
| **Trigger** | **When Called** (`executeWorkflowTrigger`) |

### Purpose
Shared tool backend for bots that need listing facts.

### Node flow
**When Called** → **Read Yacht Listings** (Google Sheets) → **Trim To Essentials**

---

## 7. TEMP AI Stress Test GHL Helper (inactive)

| | |
|--|--|
| **ID** | `WboCfAlfDwHDaYHA` |
| **Active** | No |

### Purpose
Temporary HTTP helper for load/stress testing AI ↔ GHL: route action → upsert contact / add tags / get contact → respond.

Do not use in production traffic; keep inactive unless deliberately testing.

---

## Bot interaction map

```
GHL Inbox (SMS/WA)
    │
    ├─(schedule/poll)──► Omni Inbound AI Router ──► AI Sales Assistant SMS
    │                         │
    │                         └─ missed-call seed SMS (GHL)
    │
Website chat ──► Support Receptionist / Mom Bot TEST / Viator Section Bot
                      │
                      └─ Yacht Listings Data Sub (Sheets)
```
