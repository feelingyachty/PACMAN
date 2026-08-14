"use client";

import type { Agent, Task } from "@/lib/types";

const PRIORITY: Record<Task["priority"], string> = {
  low: "bg-black/5 text-[var(--muted)]",
  medium: "bg-[var(--sea-soft)] text-[var(--sea)]",
  high: "bg-[#f8e6dc] text-[var(--alert)]",
  critical: "bg-[var(--alert)] text-white",
};

export function TaskCard({
  task,
  agent,
  busy,
  onOpen,
  onApprove,
  onReject,
}: {
  task: Task;
  agent?: Agent;
  busy?: boolean;
  onOpen: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const needsApproval = task.status === "needs_approval";

  return (
    <article
      className={`group rounded-xl border border-[var(--line)] bg-[var(--card)] p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        needsApproval ? "approve-pulse" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left"
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className={`pill ${PRIORITY[task.priority]}`}>
            {task.priority}
          </span>
          {agent && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-soft)]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: agent.avatarColor }}
              />
              {agent.name}
            </span>
          )}
        </div>
        <h3 className="display text-sm font-bold leading-snug text-[var(--ink)]">
          {task.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
          {task.proposal?.summary ?? task.description}
        </p>
        {task.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>

      {needsApproval && (
        <div className="mt-3 flex gap-2 border-t border-[var(--line)] pt-3">
          <button
            type="button"
            disabled={busy}
            onClick={onApprove}
            className="flex-1 rounded-lg bg-[var(--good)] px-2 py-1.5 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onReject}
            className="rounded-lg border border-[var(--line)] px-2 py-1.5 text-xs font-bold text-[var(--ink-soft)] hover:bg-black/5 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}
    </article>
  );
}
