import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { seedStore } from "./seed";
import { knowledgeDocs } from "./knowledge";
import type {
  ActivityEvent,
  Agent,
  StoreData,
  Task,
  TaskStatus,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

async function ensureStore(): Promise<StoreData> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoreData;
    if (!parsed.knowledge?.length) {
      parsed.knowledge = knowledgeDocs;
      await fs.writeFile(STORE_PATH, JSON.stringify(parsed, null, 2));
    }
    return parsed;
  } catch {
    const initial: StoreData = {
      ...seedStore,
      knowledge: knowledgeDocs,
    };
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
}

async function writeStore(data: StoreData): Promise<void> {
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
  data.activity = data.activity.slice(0, 100);
}

function recalcAgentStats(data: StoreData) {
  for (const agent of data.agents) {
    const tasks = data.tasks.filter((t) => t.agentId === agent.id);
    agent.stats = {
      completed: tasks.filter((t) => t.status === "done").length,
      pendingApproval: tasks.filter((t) => t.status === "needs_approval")
        .length,
      inProgress: tasks.filter((t) =>
        ["assigned", "working", "implementing", "verifying"].includes(t.status),
      ).length,
      verifiedByPacman: tasks.filter(
        (t) => t.status === "done" && t.verifiedBy === "pacman",
      ).length,
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

export async function addAgent(
  input: Omit<Agent, "id" | "stats"> & { id?: string },
): Promise<Agent> {
  const data = await ensureStore();
  const agent: Agent = {
    ...input,
    id: input.id ?? randomUUID(),
    stats: {
      completed: 0,
      pendingApproval: 0,
      inProgress: 0,
      verifiedByPacman: 0,
    },
  };
  data.agents.push(agent);
  pushActivity(data, {
    type: "agent_added",
    message: `Agent ${agent.name} joined the roster`,
    agentId: agent.id,
  });
  await writeStore(data);
  return agent;
}

export async function listTasks(): Promise<Task[]> {
  return (await getStore()).tasks;
}

export async function createTask(
  input: Omit<Task, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
  },
): Promise<Task> {
  const data = await ensureStore();
  const task: Task = {
    ...input,
    id: input.id ?? randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.tasks.unshift(task);
  pushActivity(data, {
    type: "task_created",
    message: `New task: ${task.title}`,
    taskId: task.id,
    agentId: task.agentId,
  });
  recalcAgentStats(data);
  await writeStore(data);
  return task;
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

  pushActivity(data, {
    type: "status_changed",
    message: `Task "${task.title}" moved ${prev} → ${status}`,
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
  return updateTaskStatus(taskId, "verifying", { implementationNotes });
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
    pushActivity(data, {
      type: "verified",
      message: `Pacman verified: ${task.title}`,
      taskId: task.id,
      agentId: task.agentId,
    });
  } else {
    task.status = "blocked";
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
  const initial: StoreData = {
    ...seedStore,
    knowledge: knowledgeDocs,
  };
  await writeStore(initial);
  return initial;
}
