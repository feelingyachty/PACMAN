#!/usr/bin/env node
/**
 * Stub Monday learning digests for known employees.
 * weekOf = Monday in America/Bogota.
 */
import { mkdir, readdir, access, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIGESTS = path.join(ROOT, "data", "learning", "digests");
const TZ = "America/Bogota";

function mondayOf(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
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

async function existingAgents() {
  const seeded = new Set(["pacman", "corey"]);
  try {
    for (const name of await readdir(DIGESTS)) {
      if (/^[a-z0-9][a-z0-9-]{0,62}$/.test(name)) seeded.add(name);
    }
  } catch {
    /* first run */
  }
  return [...seeded];
}

const week = mondayOf();
const agents = await existingAgents();
await mkdir(DIGESTS, { recursive: true });

for (const agentId of agents) {
  const dir = path.join(DIGESTS, agentId);
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${week}.md`);
  try {
    await access(file);
  } catch {
    await writeFile(
      file,
      `# ${agentId} — Learning digest · week of ${week}\n\n_No reads logged yet. Log study from /learning or \`scripts/log-learning.sh\`._\n`,
    );
    console.log(`stubbed ${path.relative(ROOT, file)}`);
  }
}

const log = path.join(ROOT, "docs", "ops", "CHANGELOG_UPDATES.md");
try {
  await appendFile(
    log,
    `- Learning week stub ${week} for ${agents.join(", ")}\n`,
  );
} catch {
  /* changelog may not exist in a sparse checkout */
}

console.log(`Learning week ${week} ready for ${agents.join(", ")}`);
