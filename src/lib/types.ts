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

export interface Agent {
  id: string;
  name: string;
  codename?: string;
  role: AgentRole;
  title: string;
  specialty: string;
  status: AgentStatus;
  avatarColor: string;
  requiresApproval: boolean;
  knowledgeDomains: string[];
  stats: {
    completed: number;
    pendingApproval: number;
    inProgress: number;
    verifiedByPacman: number;
  };
  notes?: string;
}

export interface ChangeProposal {
  summary: string;
  targetUrl?: string;
  impact: "low" | "medium" | "high";
  details: string;
  proposedActions: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  agentId: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high" | "critical";
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

export interface KnowledgeDoc {
  id: string;
  title: string;
  domain: "seo" | "v8r" | "wordpress" | "elementor" | "news" | "ops";
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
    | "intel";
  message: string;
  taskId?: string;
  agentId?: string;
}

export interface StoreData {
  agents: Agent[];
  tasks: Task[];
  knowledge: KnowledgeDoc[];
  intel: IntelItem[];
  activity: ActivityEvent[];
}
