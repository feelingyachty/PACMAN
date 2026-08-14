export const LEARNING_TOPICS = [
  "seo",
  "dev",
  "wordpress",
  "elementor",
  "ghl",
  "ops",
  "ai",
  "product",
] as const;

export type LearningTopic = (typeof LEARNING_TOPICS)[number];

export const LEARNING_GITHUB_TREE =
  process.env.NEXT_PUBLIC_LEARNING_ARCHIVE_URL ??
  "https://github.com/feelingyachty/PACMAN/tree/main/data/learning";

export interface LearningEntry {
  id: string;
  agentId: string;
  /** Monday of the study week in America/Bogota, YYYY-MM-DD */
  weekOf: string;
  readAt: string;
  title: string;
  topic: LearningTopic;
  url?: string;
  source?: string;
  summary: string;
  takeaways: string[];
  whyItMatters: string;
  /** Optional path inside this repo for offline reading */
  repoPath?: string;
}

export interface LearningIndex {
  version: number;
  updatedAt: string;
  entries: LearningEntry[];
}

export interface LearningDigestMeta {
  agentId: string;
  weekOf: string;
  path: string;
  title: string;
  markdown?: string;
}

export interface LearningPayload {
  index: LearningIndex;
  digests: LearningDigestMeta[];
  currentWeekOf: string;
  agentIds: string[];
  topics: LearningTopic[];
  stats: {
    thisWeek: number;
    total: number;
    byAgent: Record<string, number>;
    byTopic: Record<string, number>;
  };
}
