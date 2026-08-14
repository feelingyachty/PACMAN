"use client";

import { useEffect, useState } from "react";
import type { Agent, Task } from "@/lib/types";
import Link from "next/link";

export default function ApprovalsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    const [storeRes] = await Promise.all([fetch("/api/store")]);
    const store = await storeRes.json();
    setTasks(
      store.tasks.filter((t: Task) => t.status === "needs_approval"),
    );
    setAgents(store.agents);
  }

  useEffect(() => {
    void load();
  }, []);

  async function act(id: string, action: "approve" | "reject") {
    setBusyId(id);
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        reason: action === "reject" ? "Needs revision" : undefined,
      }),
    });
    await load();
    setBusyId(null);
  }

  const agentName = (id: string) =>
    agents.find((a) => a.id === id)?.name ?? id;

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Decision queue
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">
          Approvals
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
          One-click approve sends the agent to implement. Pacman verifies after
          the change lands.
        </p>
      </header>

      {tasks.length === 0 ? (
        <div className="panel rise rounded-2xl p-10 text-center">
          <p className="display text-xl font-bold">All clear</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            No proposals waiting.{" "}
            <Link href="/" className="font-semibold text-[var(--sea)] underline">
              Back to board
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task, i) => (
            <article
              key={task.id}
              className="panel rise approve-pulse rounded-2xl p-5"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {agentName(task.agentId)} · {task.priority} priority
                  </p>
                  <h2 className="display mt-1 text-xl font-bold">
                    {task.title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === task.id}
                    onClick={() => act(task.id, "approve")}
                    className="rounded-xl bg-[var(--good)] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === task.id}
                    onClick={() => act(task.id, "reject")}
                    className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-bold disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
              {task.proposal && (
                <div className="mt-4 rounded-xl bg-[var(--paper-2)]/70 p-4 text-sm text-[var(--ink-soft)]">
                  <p className="font-semibold text-[var(--ink)]">
                    {task.proposal.summary}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {task.proposal.proposedActions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
