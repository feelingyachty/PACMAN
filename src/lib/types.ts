export type TaskStatus =
  | "assigned"
  | "working"
  | "needs_approval"
  | "implementing"
  | "verifying"
  | "done"
  | "blocked"
  | "rejected";

export type AgentRole =
  | "manager"
  | "seo"
  | "wordpress"
  | "booking"
  | "dev"
  | "research"
  | "custom";

export type AgentStatus = "online" | "busy" | "idle" | "offline";

export type Priority = "low" | "medium" | "high" | "critical";

export type Impact = "low" | "medium" | "high";

export type WorkKind =
  | "assignment"
  | "research"
  | "proposal"
  | "approval"
  | "implementation"
  | "verification"
  | "note"
  | "intel"
  | "onboard";

export interface AgentStats {
  completed: number;
  pendingApproval: number;
  inProgress: number;
  verifiedByPacman: number;
  blocked: number;
  assignedTotal: number;
  completionRate: number;
  verificationPassRate: number;
}

export interface Agent {
  id: string;
  name: string;
  codename?: string;
  role: AgentRole;
  title: string;
  specialty: string;
  mandate: string;
  playbook: string;
  status: AgentStatus;
  avatarColor: string;
  requiresApproval: boolean;
  knowledgeDomains: string[];
  stats: AgentStats;
  notes?: string;
  createdAt: string;
  source?: "pacman" | "n8n";
  n8nWorkflowId?: string;
}

export type AutomationKind = "ai-agent" | "ops" | "sync" | "notify" | "content";

export interface Automation {
  id: string;
  name: string;
  active: boolean;
  archived: boolean;
  nodeCount: number;
  kind: AutomationKind;
  updatedAt: string;
  editorUrl: string;
}

export interface ChangeProposal {
  summary: string;
  targetUrl?: string;
  impact: Impact;
  details: string;
  proposedActions: string[];
  evidence?: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  agentId: string;
  assignedBy: string;
  status: TaskStatus;
  priority: Priority;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueAt?: string;
  proposal?: ChangeProposal;
  implementationNotes?: string;
  verificationNotes?: string;
  verifiedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectedReason?: string;
}

export interface WorkLog {
  id: string;
  at: string;
  agentId: string;
  taskId?: string;
  kind: WorkKind;
  title: string;
  body: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  domain: "seo" | "v8r" | "wordpress" | "elementor" | "news" | "ops" | "n8n";
  summary: string;
  content: string;
  source?: string;
  updatedAt: string;
  tags: string[];
}

export interface IntelItem {
  id: string;
  category: "seo" | "dev" | "wordpress" | "booking";
  title: string;
  summary: string;
  url?: string;
  publishedAt: string;
  relevance: string;
}

export interface ActivityEvent {
  id: string;
  at: string;
  type:
    | "task_created"
    | "status_changed"
    | "approved"
    | "rejected"
    | "verified"
    | "agent_added"
    | "intel"
    | "work_logged";
  message: string;
  taskId?: string;
  agentId?: string;
}

export interface StoreData {
  version: number;
  agents: Agent[];
  tasks: Task[];
  logs: WorkLog[];
  knowledge: KnowledgeDoc[];
  intel: IntelItem[];
  activity: ActivityEvent[];
  automations: Automation[];
}

export const STORE_VERSION = 6;

export const N8N_BASE = "https://feelingyachty.app.n8n.cloud";
export const N8N_MCP_URL = `${N8N_BASE}/mcp-server/http`;
export const N8N_MCP_SERVER_NAME = "n8n-mcp";
