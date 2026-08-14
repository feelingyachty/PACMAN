export type LearningTopic =
  | "seo"
  | "dev"
  | "wordpress"
  | "elementor"
  | "ghl"
  | "ops"
  | "ai"
  | "product";

export interface LearningEntry {
  id: string;
  agentId: string;
  /** Monday of the ISO week, YYYY-MM-DD */
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
}

export interface LearningPayload {
  index: LearningIndex;
  digests: LearningDigestMeta[];
  currentWeekOf: string;
}
