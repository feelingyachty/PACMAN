import type { StoreData, Task } from "./types";

export async function fetchStore(): Promise<StoreData> {
  const res = await fetch("/api/store", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load command center");
  return res.json();
}

export async function patchTask(
  taskId: string,
  body: Record<string, unknown>,
): Promise<Task> {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Action failed");
  return data as Task;
}

export async function createTask(body: {
  title: string;
  description?: string;
  agentId: string;
  priority?: string;
  tags?: string[];
}): Promise<Task> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Could not assign task");
  return data as Task;
}
