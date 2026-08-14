import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { seedStore } from "./seed";
import { knowledgeDocs } from "./knowledge";
import { defaultMandate, defaultPlaybook, roleNeedsApproval } from "./playbooks";
import type {
  ActivityEvent,
  Agent,
  AgentRole,
  AgentStats,
  StoreData,
  Task,
  TaskStatus,
  WorkKind,
  WorkLog,
} from "./types";
import { STORE_VERSION } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

function emptyStats(): AgentStats {
  return {
    completed: 0,
    pendingApproval: 0,
    inProgress: 0,
    verifiedByPacman: 0,
    blocked: 0,
    assignedTotal: 0,
    completionRate: 0,
    verificationPassRate: 0,
  };
}

function mergeKnowledge(existing: StoreData["knowledge"] = []) {
  const byId = new Map(existing.map((doc) => [doc.id, doc]));
  for (const doc of knowledgeDocs) {
    byId.set(doc.id, doc);
  }
  return Array.from(byId.values());
}

function isCurrentStore(parsed: unknown): parsed is StoreData {
  if (!parsed || typeof parsed !== "object") return false;
  const data = parsed as StoreData;
  return (
    data.version === STORE_VERSION &&
    Array.isArray(data.agents) &&
    Array.isArray(data.tasks) &&
    Array.isArray(data.logs)
  );
}

async function ensureStore(): Promise<StoreData> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!isCurrentStore(parsed)) {
      const fresh = initialStore();
      await writeStore(fresh);
      return fresh;
    }
    parsed.knowledge = mergeKnowledge(parsed.knowledge);
    return parsed;
  } catch {
    const initial = initialStore();
    await writeStore(initial);
    return initial;
  }
}

function initialStore(): StoreData {
  return {
    ...seedStore,
    version: STORE_VERSION,
    knowledge: knowledgeDocs,
  };
}

async function writeStore(data: StoreData): Promise<void> {
  data.version = STORE_VERSION;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2));
}

function pushActivity(
  data: StoreData,
  event: Omit<ActivityEvent, "id" | "at"> & { at?: string },
) {
  data.activity.unshift({
    id: randomUUID(),
    at: event.at ?? new Date().toISOString(),
    type: event.type,
    message: event.message,
    taskId: event.taskId,
    agentId: event.agentId,
  });
  data.activity = data.activity.slice(0, 200);
}

function pushLog(
  data: StoreData,
  log: Omit<WorkLog, "id" | "at"> & { at?: string },
) {
  data.logs.unshift({
    id: randomUUID(),
    at: log.at ?? new Date().toISOString(),
    agentId: log.agentId,
    taskId: log.taskId,
    kind: log.kind,
    title: log.title,
    body: log.body,
  });
  data.logs = data.logs.slice(0, 500);
}

function recalcAgentStats(data: StoreData) {
  for (const agent of data.agents) {
    const tasks = data.tasks.filter((t) => t.agentId === agent.id);
    const completed = tasks.filter((t) => t.status === "done").length;
    const blocked = tasks.filter((t) =>
      t.status === "blocked" || t.status === "rejected",
    ).length;
    const verified = tasks.filter(
      (t) => t.status === "done" && t.verifiedBy === "pacman",
    ).length;
    const finished = completed + blocked;
    agent.stats = {
      completed,
      pendingApproval: tasks.filter((t) => t.status === "needs_approval").length,
      inProgress: tasks.filter((t) =>
        ["assigned", "working", "implementing", "verifying"].includes(t.status),
      ).length,
      verifiedByPacman: verified,
      blocked,
      assignedTotal: tasks.length,
      completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
      verificationPassRate: finished
        ? Math.round((verified / finished) * 100)
        : 0,
    };
  }
}

export async function getStore(): Promise<StoreData> {
  const data = await ensureStore();
  recalcAgentStats(data);
  return data;
}

export async function listAgents(): Promise<Agent[]> {
  return (await getStore()).agents;
}

export function slugId(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || randomUUID();
}

export async function addAgent(input: {
  name: string;
  role: AgentRole;
  title: string;
  specialty?: string;
  mandate?: string;
  playbook?: string;
  codename?: string;
  status?: Agent["status"];
  avatarColor?: string;
  requiresApproval?: boolean;
  knowledgeDomains?: string[];
  notes?: string;
  id?: string;
}): Promise<Agent> {
  const data = await ensureStore();
  const now = new Date().toISOString();
  const requiresApproval =
    input.requiresApproval ?? roleNeedsApproval(input.role);

  const agent: Agent = {
    id: input.id ?? slugId(input.name),
    name: input.name,
    codename: input.codename,
    role: input.role,
    title: input.title,
    specialty: input.specialty ?? "",
    mandate: input.mandate ?? defaultMandate(input.role, input.name),
    playbook: input.playbook ?? defaultPlaybook(input.role),
    status: input.status ?? "idle",
    avatarColor: input.avatarColor ?? "#5B8C5A",
    requiresApproval,
    knowledgeDomains: input.knowledgeDomains ?? [],
    stats: emptyStats(),
    notes: input.notes,
    createdAt: now,
  };

  if (data.agents.some((a) => a.id === agent.id)) {
    agent.id = `${agent.id}-${randomUUID().slice(0, 8)}`;
  }

  data.agents.push(agent);

  const onboardTask: Task = {
    id: randomUUID(),
    title: `${agent.name}: first assignment pending`,
    description: requiresApproval
      ? `Pacman opened a progress lane for ${agent.name}. Production changes require owner Approve before implement. Pacman verifies after.`
      : `Pacman opened a progress lane for ${agent.name}. Every task is logged here. Pacman verifies outcomes.`,
    agentId: agent.id,
    assignedBy: "pacman",
    status: "assigned",
    priority: "medium",
    tags: ["onboarding", agent.role],
    createdAt: now,
    updatedAt: now,
  };
  data.tasks.unshift(onboardTask);

  pushLog(data, {
    agentId: agent.id,
    taskId: onboardTask.id,
    kind: "onboard",
    title: `Pacman onboarded ${agent.name}`,
    body: [
      `Progress page: /agents/${agent.id}`,
      `Approval gate: ${requiresApproval ? "ON" : "OFF"}`,
      `Mandate: ${agent.mandate}`,
    ].join("\n"),
  });

  pushActivity(data, {
    type: "agent_added",
    message: `Pacman onboarded ${agent.name} — progress page live${
      requiresApproval ? " · approval gate ON" : ""
    }`,
    agentId: agent.id,
    taskId: onboardTask.id,
  });

  recalcAgentStats(data);
  await writeStore(data);
  return agent;
}

export async function createTask(
  input: Omit<Task, "id" | "createdAt" | "updatedAt" | "assignedBy"> & {
    id?: string;
    assignedBy?: string;
  },
): Promise<Task> {
  const data = await ensureStore();
  const now = new Date().toISOString();
  const task: Task = {
    ...input,
    id: input.id ?? randomUUID(),
    assignedBy: input.assignedBy ?? "owner",
    createdAt: now,
    updatedAt: now,
  };
  data.tasks.unshift(task);

  pushLog(data, {
    agentId: task.agentId,
    taskId: task.id,
    kind: "assignment",
    title: `Assigned: ${task.title}`,
    body: task.description,
  });
  pushActivity(data, {
    type: "task_created",
    message: `Assigned to fleet: ${task.title}`,
    taskId: task.id,
    agentId: task.agentId,
  });

  recalcAgentStats(data);
  await writeStore(data);
  return task;
}

export async function addWorkLog(input: {
  agentId: string;
  taskId?: string;
  kind: WorkKind;
  title: string;
  body: string;
}): Promise<WorkLog> {
  const data = await ensureStore();
  pushLog(data, input);
  pushActivity(data, {
    type: "work_logged",
    message: input.title,
    agentId: input.agentId,
    taskId: input.taskId,
  });
  await writeStore(data);
  return data.logs[0];
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  extras?: Partial<Task>,
): Promise<Task | null> {
  const data = await ensureStore();
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task) return null;

  const prev = task.status;
  Object.assign(task, extras, {
    status,
    updatedAt: new Date().toISOString(),
  });

  pushLog(data, {
    agentId: task.agentId,
    taskId: task.id,
    kind: "note",
    title: `${task.title}: ${prev} → ${status}`,
    body: extras?.implementationNotes || extras?.verificationNotes || "",
  });
  pushActivity(data, {
    type: "status_changed",
    message: `"${task.title}" moved ${prev} → ${status}`,
    taskId: task.id,
    agentId: task.agentId,
  });

  recalcAgentStats(data);
  await writeStore(data);
  return task;
}

export async function approveTask(taskId: string): Promise<Task | null> {
  const data = await ensureStore();
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task || task.status !== "needs_approval") return null;

  task.status = "implementing";
  task.approvedAt = new Date().toISOString();
  task.approvedBy = "owner";
  task.updatedAt = new Date().toISOString();

  pushLog(data, {
    agentId: task.agentId,
    taskId: task.id,
    kind: "approval",
    title: `Approved: ${task.title}`,
    body: "Owner approved. Agent may implement exactly the proposed actions. Pacman will verify.",
  });
  pushActivity(data, {
    type: "approved",
    message: `Approved: ${task.title} — agent may implement`,
    taskId: task.id,
    agentId: task.agentId,
  });

  recalcAgentStats(data);
  await writeStore(data);
  return task;
}

export async function rejectTask(
  taskId: string,
  reason: string,
): Promise<Task | null> {
  const data = await ensureStore();
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task || task.status !== "needs_approval") return null;

  task.status = "rejected";
  task.rejectedReason = reason;
  task.updatedAt = new Date().toISOString();

  pushLog(data, {
    agentId: task.agentId,
    taskId: task.id,
    kind: "approval",
    title: `Rejected: ${task.title}`,
    body: reason,
  });
  pushActivity(data, {
    type: "rejected",
    message: `Rejected: ${task.title} — ${reason}`,
    taskId: task.id,
    agentId: task.agentId,
  });

  recalcAgentStats(data);
  await writeStore(data);
  return task;
}

export async function submitForVerification(
  taskId: string,
  implementationNotes: string,
): Promise<Task | null> {
  const data = await ensureStore();
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task) return null;

  task.status = "verifying";
  task.implementationNotes = implementationNotes;
  task.updatedAt = new Date().toISOString();

  pushLog(data, {
    agentId: task.agentId,
    taskId: task.id,
    kind: "implementation",
    title: `Implemented: ${task.title}`,
    body: implementationNotes || "Agent marked implementation complete.",
  });
  pushActivity(data, {
    type: "status_changed",
    message: `"${task.title}" handed to Pacman for verification`,
    taskId: task.id,
    agentId: task.agentId,
  });

  recalcAgentStats(data);
  await writeStore(data);
  return task;
}

export async function verifyTask(
  taskId: string,
  ok: boolean,
  verificationNotes: string,
): Promise<Task | null> {
  const data = await ensureStore();
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task || task.status !== "verifying") return null;

  task.verificationNotes = verificationNotes;
  task.updatedAt = new Date().toISOString();

  if (ok) {
    task.status = "done";
    task.verifiedBy = "pacman";
    pushLog(data, {
      agentId: "pacman",
      taskId: task.id,
      kind: "verification",
      title: `Pacman verified: ${task.title}`,
      body: verificationNotes,
    });
    pushActivity(data, {
      type: "verified",
      message: `Pacman verified: ${task.title}`,
      taskId: task.id,
      agentId: task.agentId,
    });
  } else {
    task.status = "blocked";
    pushLog(data, {
      agentId: "pacman",
      taskId: task.id,
      kind: "verification",
      title: `Pacman blocked: ${task.title}`,
      body: verificationNotes,
    });
    pushActivity(data, {
      type: "status_changed",
      message: `Pacman blocked verification: ${task.title}`,
      taskId: task.id,
      agentId: task.agentId,
    });
  }

  recalcAgentStats(data);
  await writeStore(data);
  return task;
}

export async function resetStore(): Promise<StoreData> {
  const initial = initialStore();
  await writeStore(initial);
  return initial;
}
