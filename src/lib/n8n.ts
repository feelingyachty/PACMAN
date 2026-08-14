import { N8N_BASE, type Automation, type AutomationKind } from "./types";

type Row = {
  id: string;
  name: string;
  active: boolean;
  archived?: boolean;
  nodeCount: number;
  updatedAt: string;
  kind: AutomationKind;
};

const ROWS: Row[] = [
  { id: "0niqJuwwVeYjim3i", name: "Omni Inbound AI Router", active: true, nodeCount: 29, updatedAt: "2026-08-14T14:41:54.712Z", kind: "ai-agent" },
  { id: "4XzFaUrhStHu8TwB", name: "AI Sales Assistant (SMS)", active: true, nodeCount: 27, updatedAt: "2026-08-14T14:56:53.204Z", kind: "ai-agent" },
  { id: "fbg3vzibqAMnda6Y", name: "Support Receptionist Bot", active: true, nodeCount: 10, updatedAt: "2026-08-14T14:35:15.657Z", kind: "ai-agent" },
  { id: "7cY6co0FV7PDEaz3", name: "Mom Bot Chat (TEST)", active: true, nodeCount: 6, updatedAt: "2026-08-14T03:49:05.384Z", kind: "ai-agent" },
  { id: "mIQiRjAwyPZLJV1X", name: "Viator Section Bot", active: true, nodeCount: 7, updatedAt: "2026-08-14T14:35:14.966Z", kind: "ai-agent" },
  { id: "gKezuNipPn2PjqTV", name: "WordPress Auto Blogging", active: true, nodeCount: 29, updatedAt: "2026-08-14T11:53:07.521Z", kind: "content" },
  { id: "3ntAg4vVAUkB0YYD", name: "Panama WordPress Auto Blogging", active: false, nodeCount: 15, updatedAt: "2026-08-14T03:14:38.904Z", kind: "content" },
  { id: "qlkHJz9t8Hycxckw", name: "Miami WordPress Auto Blogging", active: false, nodeCount: 14, updatedAt: "2026-08-14T03:14:39.932Z", kind: "content" },
  { id: "3FmrsdL4mdepk0gO", name: "Exec Dashboard", active: true, nodeCount: 9, updatedAt: "2026-08-14T15:46:56.413Z", kind: "ops" },
  { id: "lv8YzRr8G4yDRrgy", name: "Exec Dashboard Metrics", active: true, nodeCount: 22, updatedAt: "2026-08-14T15:43:53.860Z", kind: "ops" },
  { id: "TkLWlpBVSa287X5E", name: "Bokun New Booking to GHL", active: true, nodeCount: 6, updatedAt: "2026-08-14T15:22:58.242Z", kind: "sync" },
  { id: "Mmj0jlpswUuXA4GG", name: "Bokun Booking Change/Cancel to Slack", active: true, nodeCount: 8, updatedAt: "2026-08-14T15:22:58.750Z", kind: "notify" },
  { id: "vokMW7sXUJCuncxc", name: "WooCommerce Order Paid to GHL Router", active: true, nodeCount: 7, updatedAt: "2026-08-14T15:21:56.499Z", kind: "sync" },
  { id: "rFKFpjz2aV9IpVFO", name: "WooCommerce Profile Backfill", active: true, nodeCount: 12, updatedAt: "2026-08-14T15:28:35.325Z", kind: "sync" },
  { id: "t5qCvpFPAZra3mtU", name: "WordPress to GHL Sync", active: true, nodeCount: 17, updatedAt: "2026-08-08T10:38:29.515Z", kind: "sync" },
  { id: "g43rMtzoPHrvegIT", name: "My Database - WordPress Price Push", active: true, nodeCount: 11, updatedAt: "2026-08-12T18:30:54.475Z", kind: "sync" },
  { id: "1AivD5g0J0mNrmil", name: "BookMyBoat Weekly Sync", active: true, nodeCount: 13, updatedAt: "2026-08-12T18:25:06.783Z", kind: "sync" },
  { id: "mXp0HzVvmCY5GQJo", name: "BookMyBoat Weekly Sync (Client Sheet)", active: true, nodeCount: 13, updatedAt: "2026-08-12T18:46:06.607Z", kind: "sync" },
  { id: "2tJkGIvRlvWFbrpf", name: "Full Charter+ID History Backfill", active: true, nodeCount: 18, updatedAt: "2026-08-14T12:10:29.702Z", kind: "sync" },
  { id: "75uNzV4CwhunbVZf", name: "Government ID Form Sync", active: true, nodeCount: 15, updatedAt: "2026-08-14T12:10:52.021Z", kind: "sync" },
  { id: "GfAhDXH69wekCJDq", name: "Charter Agreement Sync & Reminders", active: true, nodeCount: 22, updatedAt: "2026-08-14T12:10:51.259Z", kind: "ops" },
  { id: "Iy9OnTlVA0gB2vkW", name: "Charter Agreement Reminder SMS", active: true, nodeCount: 14, updatedAt: "2026-08-14T14:27:52.880Z", kind: "notify" },
  { id: "620PZ7PYfvRHeWEK", name: "Post-Pay Docs Pack SMS", active: true, nodeCount: 18, updatedAt: "2026-08-14T14:29:06.883Z", kind: "notify" },
  { id: "lFWzUjwsJBaYI4eP", name: "Day-Before Missing Docs Alert", active: true, nodeCount: 20, updatedAt: "2026-08-14T14:29:48.842Z", kind: "notify" },
  { id: "nPUKffAsEmXzE7AE", name: "Post-Trip Review SMS", active: true, nodeCount: 16, updatedAt: "2026-08-14T14:37:27.885Z", kind: "notify" },
  { id: "L4P6x6As9FYO5tzR", name: "Pipeline Stage Sync", active: true, nodeCount: 16, updatedAt: "2026-08-14T14:37:25.128Z", kind: "sync" },
  { id: "DVWnX1MM2ljzalDY", name: "Call Transcript to Notes", active: true, nodeCount: 19, updatedAt: "2026-08-14T12:29:35.910Z", kind: "ops" },
  { id: "3yH7bb3XoXWmrVw2", name: "GHL Reminders to Google Chat", active: true, nodeCount: 8, updatedAt: "2026-08-12T21:44:56.141Z", kind: "notify" },
  { id: "64WNnB3HrNJOrVNB", name: "GHL Payment Pending to Google Chat", active: true, nodeCount: 3, updatedAt: "2026-08-12T22:11:16.874Z", kind: "notify" },
  { id: "RUqfXaObxUUup2Ys", name: "GHL Website Order to Google Chat", active: true, nodeCount: 6, updatedAt: "2026-08-12T22:11:17.375Z", kind: "notify" },
  { id: "JmFABzKCKszc06YB", name: "GHL Viator Charter to Google Chat", active: true, nodeCount: 3, updatedAt: "2026-08-12T22:56:34.299Z", kind: "notify" },
  { id: "Vh90KZMaefUxL2sY", name: "GHL Original Charter to Google Chat", active: true, nodeCount: 3, updatedAt: "2026-08-12T23:03:44.463Z", kind: "notify" },
  { id: "muYU19IHNO9C1s5J", name: "GHL Qualified Leads to Google Chat", active: true, nodeCount: 3, updatedAt: "2026-08-12T22:42:38.712Z", kind: "notify" },
  { id: "aSaECkefyG2FbW3S", name: "GHL Panama WooCommerce Order to Google Chat", active: true, nodeCount: 3, updatedAt: "2026-08-13T12:43:38.808Z", kind: "notify" },
  { id: "shnHRgDJiu4qI8Bo", name: "GHL Miami WooCommerce Order to Google Chat", active: true, nodeCount: 3, updatedAt: "2026-08-13T12:43:31.849Z", kind: "notify" },
  { id: "XjPh1Q5NKeUG3lcq", name: "Monday Docs Refresh Reminder", active: true, nodeCount: 2, updatedAt: "2026-08-14T15:40:19.076Z", kind: "notify" },
  { id: "zjjBklS6cICHUriQ", name: "Yacht Listings Data (Sub)", active: true, nodeCount: 3, updatedAt: "2026-08-13T22:56:22.983Z", kind: "ops" },
  { id: "7g4Q3OVzvxTqP2m7", name: "Mom Bot Training Data Export", active: true, nodeCount: 28, updatedAt: "2026-08-14T00:35:24.215Z", kind: "ops" },
  { id: "E35PUvzWdlzcgvT0", name: "PPC Leads Report", active: false, nodeCount: 11, updatedAt: "2026-08-11T12:32:43.491Z", kind: "ops" },
  { id: "q9cMKVN8V9aNmxgX", name: "Clean Mom Training Data", active: false, nodeCount: 4, updatedAt: "2026-08-11T21:56:29.610Z", kind: "ops" },
  { id: "WboCfAlfDwHDaYHA", name: "TEMP AI Stress Test GHL Helper", active: false, nodeCount: 8, updatedAt: "2026-08-14T15:02:38.328Z", kind: "ops" },
  { id: "7kUHv3SnHmsacwo1", name: "FY WP Push Test", active: false, nodeCount: 2, updatedAt: "2026-08-11T11:37:54.236Z", kind: "ops" },
  { id: "rLOvxeN4qKuj9qnD", name: "Manual PPC Report Entry (one-off)", active: false, nodeCount: 3, updatedAt: "2026-08-11T18:06:41.707Z", kind: "ops" },
];

export function n8nAutomations(): Automation[] {
  return ROWS.map((row) => ({
    id: row.id,
    name: row.name,
    active: row.active,
    archived: Boolean(row.archived),
    nodeCount: row.nodeCount,
    kind: row.kind,
    updatedAt: row.updatedAt,
    editorUrl: `${N8N_BASE}/workflow/${row.id}`,
  }));
}
