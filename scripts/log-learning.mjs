#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = path.join(ROOT, "data", "learning", "index.json");
const DIGESTS = path.join(ROOT, "data", "learning", "digests");
const TOPICS = new Set([
  "seo",
  "dev",
  "wordpress",
  "elementor",
  "ghl",
  "ops",
  "ai",
  "product",
]);

function mondayOf(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const local = new Date(`${map.year}-${map.month}-${map.day}T12:00:00Z`);
  const weekday = local.getUTCDay();
  const diff = weekday === 0 ? -6 : 1 - weekday;
  local.setUTCDate(local.getUTCDate() + diff);
  return local.toISOString().slice(0, 10);
}

function arg(name, fallback = "") {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? String(process.argv[i + 1] ?? "") : fallback;
}

function args(name) {
  const out = [];
  for (let i = 0; i < process.argv.length; i += 1) {
    if (process.argv[i] === `--${name}`) out.push(String(process.argv[i + 1] ?? ""));
  }
  return out.filter(Boolean);
}

const agentId = arg("agent");
const topic = arg("topic");
const title = arg("title").trim();
const summary = arg("summary").trim();
const why = arg("why").trim();
const url = arg("url").trim();
const source = arg("source").trim();
const repoPath = arg("repo").trim();
const weekOf = arg("week") || mondayOf();
const takeaways = args("takeaway");

if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(agentId)) {
  console.error("Invalid --agent");
  process.exit(1);
}
if (!TOPICS.has(topic)) {
  console.error(`Invalid --topic. Use: ${[...TOPICS].join(", ")}`);
  process.exit(1);
}
if (!title || !summary || !why) {
  console.error("Required: --agent --topic --title --summary --why");
  process.exit(1);
}

const entry = {
  id: `learn-${agentId}-${weekOf}-${randomUUID().slice(0, 8)}`,
  agentId,
  weekOf,
  readAt: new Date().toISOString(),
  title,
  topic,
  url: url || undefined,
  source: source || undefined,
  summary,
  takeaways,
  whyItMatters: why,
  repoPath: repoPath || undefined,
};

let index = { version: 1, updatedAt: new Date().toISOString(), entries: [] };
try {
  index = JSON.parse(await readFile(INDEX, "utf8"));
  if (!Array.isArray(index.entries)) index.entries = [];
} catch {
  /* new archive */
}
index.entries.unshift(entry);
index.updatedAt = new Date().toISOString();
await mkdir(path.dirname(INDEX), { recursive: true });
await writeFile(INDEX, `${JSON.stringify(index, null, 2)}\n`);

const dir = path.join(DIGESTS, agentId);
await mkdir(dir, { recursive: true });
const digestFile = path.join(dir, `${weekOf}.md`);
let existing = "";
try {
  existing = await readFile(digestFile, "utf8");
} catch {
  existing = `# ${agentId} — Learning digest · week of ${weekOf}\n\n`;
}
const link = url ? `[${title}](${url})` : title;
const block = [
  `## ${topic.toUpperCase()} · ${title}`,
  "",
  `- Source: ${link}${source ? ` (${source})` : ""}`,
  `- Why it matters: ${why}`,
  `- Summary: ${summary}`,
  ...takeaways.map((t) => `  - ${t}`),
  "",
].join("\n");
await writeFile(digestFile, `${existing.trimEnd()}\n\n${block}\n`);

console.log(entry.id);
console.log(path.relative(ROOT, digestFile));
