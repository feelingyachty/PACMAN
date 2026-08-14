import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  LEARNING_TOPICS,
  type LearningDigestMeta,
  type LearningEntry,
  type LearningIndex,
  type LearningPayload,
  type LearningTopic,
} from "./learning-types";

export type {
  LearningDigestMeta,
  LearningEntry,
  LearningIndex,
  LearningPayload,
  LearningTopic,
} from "./learning-types";

export { LEARNING_TOPICS, LEARNING_GITHUB_TREE } from "./learning-types";

const ROOT = path.join(process.cwd(), "data", "learning");
const INDEX_PATH = path.join(ROOT, "index.json");
const DIGESTS_ROOT = path.join(ROOT, "digests");
const LEARNING_TZ = "America/Bogota";

const MAX_TITLE = 200;
const MAX_SUMMARY = 2000;
const MAX_WHY = 1000;
const MAX_TAKEAWAYS = 12;
const MAX_TAKEAWAY = 400;

export function isSafeAgentId(agentId: string): boolean {
  return /^[a-z0-9][a-z0-9-]{0,62}$/.test(agentId);
}

export function isWeekOf(weekOf: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(weekOf)) return false;
  const [y, m, d] = weekOf.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

export function isSafeRepoPath(repoPath: string): boolean {
  if (!repoPath || repoPath.length > 240) return false;
  if (repoPath.startsWith("/") || repoPath.includes("..") || repoPath.includes("\\")) {
    return false;
  }
  return /^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(repoPath);
}

export function isHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function clip(value: string, max: number): string {
  return value.trim().slice(0, max);
}

/** Monday of the study week in America/Bogota (FY ops timezone). */
export function mondayOf(d = new Date(), timeZone = LEARNING_TZ): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(d);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const local = new Date(`${map.year}-${map.month}-${map.day}T12:00:00Z`);
  const weekday = local.getUTCDay();
  const diff = weekday === 0 ? -6 : 1 - weekday;
  local.setUTCDate(local.getUTCDate() + diff);
  return local.toISOString().slice(0, 10);
}

function emptyIndex(): LearningIndex {
  return { version: 1, updatedAt: new Date().toISOString(), entries: [] };
}

export async function readLearningIndex(): Promise<LearningIndex> {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8");
    const parsed = JSON.parse(raw) as LearningIndex;
    if (!parsed || !Array.isArray(parsed.entries)) return emptyIndex();
    return {
      version: parsed.version ?? 1,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      entries: parsed.entries.filter(
        (e) => e && isSafeAgentId(e.agentId) && isWeekOf(e.weekOf) && e.title,
      ),
    };
  } catch {
    return emptyIndex();
  }
}

async function writeLearningIndex(index: LearningIndex): Promise<void> {
  index.updatedAt = new Date().toISOString();
  await fs.mkdir(ROOT, { recursive: true });
  await fs.writeFile(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`);
}

export async function listDigests(opts?: {
  includeMarkdown?: boolean;
}): Promise<LearningDigestMeta[]> {
  const includeMarkdown = opts?.includeMarkdown !== false;
  const out: LearningDigestMeta[] = [];
  let agents: string[] = [];
  try {
    agents = await fs.readdir(DIGESTS_ROOT);
  } catch {
    return out;
  }
  for (const agentId of agents) {
    if (!isSafeAgentId(agentId)) continue;
    const dir = path.join(DIGESTS_ROOT, agentId);
    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const weekOf = file.replace(/\.md$/, "");
      if (!isWeekOf(weekOf)) continue;
      const markdown = includeMarkdown
        ? ((await readDigestMarkdown(agentId, weekOf)) ?? "")
        : undefined;
      out.push({
        agentId,
        weekOf,
        path: `data/learning/digests/${agentId}/${file}`,
        title: `${agentId} · week of ${weekOf}`,
        markdown,
      });
    }
  }
  out.sort((a, b) => b.weekOf.localeCompare(a.weekOf));
  return out;
}

export async function readDigestMarkdown(
  agentId: string,
  weekOf: string,
): Promise<string | null> {
  if (!isSafeAgentId(agentId) || !isWeekOf(weekOf)) return null;
  const file = path.join(DIGESTS_ROOT, agentId, `${weekOf}.md`);
  const resolved = path.resolve(file);
  if (!resolved.startsWith(path.resolve(DIGESTS_ROOT) + path.sep)) return null;
  try {
    return await fs.readFile(resolved, "utf8");
  } catch {
    return null;
  }
}

function statsFor(entries: LearningEntry[], weekOf: string) {
  const byAgent: Record<string, number> = {};
  const byTopic: Record<string, number> = {};
  let thisWeek = 0;
  for (const e of entries) {
    if (e.weekOf !== weekOf) continue;
    thisWeek += 1;
    byAgent[e.agentId] = (byAgent[e.agentId] ?? 0) + 1;
    byTopic[e.topic] = (byTopic[e.topic] ?? 0) + 1;
  }
  return { thisWeek, total: entries.length, byAgent, byTopic };
}

export async function getLearningPayload(opts?: {
  agentId?: string;
  weekOf?: string;
  includeMarkdown?: boolean;
}): Promise<LearningPayload> {
  const [index, digests] = await Promise.all([
    readLearningIndex(),
    listDigests({ includeMarkdown: opts?.includeMarkdown }),
  ]);
  const currentWeekOf = mondayOf();
  const agentFilter =
    opts?.agentId && isSafeAgentId(opts.agentId) ? opts.agentId : undefined;
  const weekFilter = opts?.weekOf && isWeekOf(opts.weekOf) ? opts.weekOf : undefined;
  const entries = index.entries.filter((e) => {
    if (agentFilter && e.agentId !== agentFilter) return false;
    if (weekFilter && e.weekOf !== weekFilter) return false;
    return true;
  });
  const filteredDigests = digests.filter((d) => {
    if (agentFilter && d.agentId !== agentFilter) return false;
    if (weekFilter && d.weekOf !== weekFilter) return false;
    return true;
  });
  const agentIds = Array.from(
    new Set([
      ...index.entries.map((e) => e.agentId),
      ...digests.map((d) => d.agentId),
    ]),
  ).sort();
  return {
    index: { ...index, entries },
    digests: filteredDigests,
    currentWeekOf,
    agentIds,
    topics: [...LEARNING_TOPICS],
    stats: statsFor(index.entries, currentWeekOf),
  };
}

export async function ensureLearningWeek(
  agentIds: string[],
  weekOf?: string,
): Promise<string> {
  const week = weekOf && isWeekOf(weekOf) ? weekOf : mondayOf();
  for (const agentId of agentIds) {
    if (!isSafeAgentId(agentId)) continue;
    const dir = path.join(DIGESTS_ROOT, agentId);
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, `${week}.md`);
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(
        file,
        `# ${agentId} — Learning digest · week of ${week}\n\n_No reads logged yet. Log study from /learning or \`scripts/log-learning.sh\`._\n`,
      );
    }
  }
  return week;
}

export async function addLearningEntry(input: {
  agentId: string;
  title: string;
  topic: LearningTopic;
  summary: string;
  takeaways?: string[];
  whyItMatters: string;
  url?: string;
  source?: string;
  repoPath?: string;
  weekOf?: string;
}): Promise<LearningEntry> {
  if (!isSafeAgentId(input.agentId)) {
    throw new Error("Invalid agentId");
  }
  if (!LEARNING_TOPICS.includes(input.topic)) {
    throw new Error("Invalid topic");
  }
  if (input.url?.trim() && !isHttpUrl(input.url.trim())) {
    throw new Error("url must be http(s)");
  }
  if (input.repoPath?.trim() && !isSafeRepoPath(input.repoPath.trim())) {
    throw new Error("Invalid repoPath");
  }
  const weekOf = input.weekOf && isWeekOf(input.weekOf) ? input.weekOf : mondayOf();
  const entry: LearningEntry = {
    id: `learn-${input.agentId}-${weekOf}-${randomUUID().slice(0, 8)}`,
    agentId: input.agentId,
    weekOf,
    readAt: new Date().toISOString(),
    title: clip(input.title, MAX_TITLE),
    topic: input.topic,
    url: input.url?.trim() || undefined,
    source: input.source?.trim().slice(0, 120) || undefined,
    summary: clip(input.summary, MAX_SUMMARY),
    takeaways: (input.takeaways ?? [])
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, MAX_TAKEAWAYS)
      .map((t) => t.slice(0, MAX_TAKEAWAY)),
    whyItMatters: clip(input.whyItMatters, MAX_WHY),
    repoPath: input.repoPath?.trim() || undefined,
  };
  if (!entry.title || !entry.summary || !entry.whyItMatters) {
    throw new Error("title, summary, and whyItMatters are required");
  }

  const index = await readLearningIndex();
  index.entries.unshift(entry);
  await writeLearningIndex(index);
  await appendDigestLine(entry);
  return entry;
}

async function appendDigestLine(entry: LearningEntry): Promise<void> {
  const dir = path.join(DIGESTS_ROOT, entry.agentId);
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${entry.weekOf}.md`);
  let existing = "";
  try {
    existing = await fs.readFile(file, "utf8");
  } catch {
    existing = `# ${entry.agentId} — Learning digest · week of ${entry.weekOf}\n\n`;
  }
  const link = entry.url ? `[${entry.title}](${entry.url})` : entry.title;
  const block = [
    `## ${entry.topic.toUpperCase()} · ${entry.title}`,
    "",
    `- Source: ${link}${entry.source ? ` (${entry.source})` : ""}`,
    `- Why it matters: ${entry.whyItMatters}`,
    `- Summary: ${entry.summary}`,
    ...entry.takeaways.map((t) => `  - ${t}`),
    "",
  ].join("\n");
  await fs.writeFile(file, `${existing.trimEnd()}\n\n${block}\n`);
}

export function entriesForWeek(
  entries: LearningEntry[],
  weekOf: string,
  agentId?: string,
) {
  return entries
    .filter((e) => e.weekOf === weekOf && (!agentId || e.agentId === agentId))
    .sort((a, b) => b.readAt.localeCompare(a.readAt));
}
