"use client";

import type { Agent, Task } from "@/lib/types";
import { COLUMNS } from "@/lib/columns";
import { TaskCard } from "@/components/TaskCard";

export function KanbanBoard({
  tasks,
  agentsById,
  busyId,
  hideEmptyParked = false,
  onOpen,
  onApprove,
  onReject,
}: {
  tasks: Task[];
  agentsById: Map<string, Agent>;
  busyId: string | null;
  hideEmptyParked?: boolean;
  onOpen: (task: Task) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const columns = hideEmptyParked
    ? COLUMNS.filter((col) => {
        if (col.id !== "blocked" && col.id !== "rejected") return true;
        return tasks.some((t) => t.status === col.id);
      })
    : COLUMNS;

  return (
    <div className="board-scroll overflow-x-auto pb-2">
      <div className="flex min-w-max gap-3">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          const hot = col.id === "needs_approval" && colTasks.length > 0;
          return (
            <div
              key={col.id}
              className={`flex w-[300px] flex-col rounded-2xl border border-[var(--line)] bg-black/20 p-3 ${
                hot ? "ring-2 ring-[var(--brand)]" : ""
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-2 px-1">
                <div>
                  <h2 className="display text-base font-bold">{col.label}</h2>
                  <p className="text-xs text-[var(--muted)]">{col.hint}</p>
                </div>
                <span className="pill bg-white/5 text-[var(--ink-dim)]">
                  {colTasks.length}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                {colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    agent={agentsById.get(task.agentId)}
                    busy={busyId === task.id}
                    onOpen={() => onOpen(task)}
                    onApprove={() => onApprove(task.id)}
                    onReject={() => onReject(task.id)}
                  />
                ))}
                {colTasks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[var(--line)] px-3 py-8 text-center text-xs text-[var(--muted)]">
                    Empty lane
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
