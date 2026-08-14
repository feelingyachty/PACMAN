import { promises as fs } from "fs";
import path from "path";
import type {
  LearningDigestMeta,
  LearningEntry,
  LearningIndex,
  LearningPayload,
} from "./learning-types";

export type {
  LearningDigestMeta,
  LearningEntry,
  LearningIndex,
  LearningPayload,
  LearningTopic,
} from "./learning-types";

const ROOT = path.join(process.cwd(), "data", "learning");
const INDEX_PATH = path.join(ROOT, "index.json");
const DIGESTS_ROOT = path.join(ROOT, "digests");

/** Monday (UTC date math) for a given Date */
export function mondayOf(d = new Date()): string {
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = x.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setUTCDate(x.getUTCDate() + diff);
  return x.toISOString().slice(0, 10);
}

export async function readLearningIndex(): Promise<LearningIndex> {
  const raw = await fs.readFile(INDEX_PATH, "utf8");
  return JSON.parse(raw) as LearningIndex;
}

export async function listDigests(): Promise<LearningDigestMeta[]> {
  const out: LearningDigestMeta[] = [];
  let agents: string[] = [];
  try {
    agents = await fs.readdir(DIGESTS_ROOT);
  } catch {
    return out;
  }
  for (const agentId of agents) {
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
      out.push({
        agentId,
        weekOf,
        path: `data/learning/digests/${agentId}/${file}`,
        title: `${agentId} · week of ${weekOf}`,
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
  const file = path.join(DIGESTS_ROOT, agentId, `${weekOf}.md`);
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function getLearningPayload(): Promise<LearningPayload> {
  const [index, digests] = await Promise.all([
    readLearningIndex(),
    listDigests(),
  ]);
  return {
    index,
    digests,
    currentWeekOf: mondayOf(),
  };
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
