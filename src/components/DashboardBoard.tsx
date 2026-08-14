"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Agent, StoreData, Task } from "@/lib/types";
import { COLUMNS } from "@/lib/columns";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailModal } from "@/components/TaskDetailModal";

async function fetchStore(): Promise<StoreData> {
  const res = await fetch("/api/store", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load store");
  return res.json();
}

export function DashboardBoard() {
  const [store, setStore] = useState<StoreData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Task | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const data = await fetchStore();
      setStore(data);
      setError(null);
      if (selected) {
        const fresh = data.tasks.find((t) => t.id === selected.id) ?? null;
        setSelected(fresh);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    }
  }, [selected]);

  useEffect(() => {
    void reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agentsById = useMemo(() => {
    const map = new Map<string, Agent>();
    store?.agents.forEach((a) => map.set(a.id, a));
    return map;
  }, [store]);

  const pendingCount =
    store?.tasks.filter((t) => t.status === "needs_approval").length ?? 0;
  const verifyingCount =
    store?.tasks.filter((t) => t.status === "verifying").length ?? 0;

  async function runAction(
    taskId: string,
    body: Record<string, unknown>,
  ): Promise<void> {
    setBusyId(taskId);
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Action failed");
      }
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  if (!store) {
    return (
      <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
        Loading command center…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rise grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)] px-6 py-7 text-[var(--paper)] shadow-[var(--shadow)] md:px-8">
          <div
            className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[var(--brand)] opacity-90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-24 h-24 w-24 rounded-full bg-[var(--sea)] opacity-70"
            aria-hidden
          />
          <p className="pill mb-4 bg-[var(--brand)] text-[var(--ink)]">
            Online · Head of Agents
          </p>
          <h1 className="display relative max-w-xl text-4xl font-extrabold leading-[0.95] md:text-5xl">
            PACMAN
          </h1>
          <p className="relative mt-3 max-w-lg text-sm leading-relaxed text-[rgba(243,240,230,0.78)] md:text-base">
            Every MDI agent task, approval, and verification — one board. Corey
            proposes; you approve; Pacman verifies.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Awaiting you",
              value: pendingCount,
              tone: "bg-[var(--brand)]",
            },
            {
              label: "Pacman review",
              value: verifyingCount,
              tone: "bg-[var(--sea-soft)]",
            },
            {
              label: "Agents",
              value: store.agents.length,
              tone: "bg-white/70",
            },
            {
              label: "Knowledge docs",
              value: store.knowledge.length,
              tone: "bg-white/70",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`panel rise rounded-2xl p-4 ${stat.tone}`}
              style={{ animationDelay: `${0.08 * (i + 1)}s` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {stat.label}
              </div>
              <div className="display mt-2 text-3xl font-extrabold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-[var(--alert)]/30 bg-[#f8e6dc] px-4 py-3 text-sm text-[var(--alert)]">
          {error}
        </div>
      )}

      <section className="board-scroll rise overflow-x-auto pb-2">
        <div className="flex min-w-max gap-3">
          {COLUMNS.map((col) => {
            const tasks = store.tasks.filter((t) => t.status === col.id);
            const hot = col.id === "needs_approval" && tasks.length > 0;
            return (
              <div
                key={col.id}
                className={`flex w-[300px] flex-col rounded-2xl border border-[var(--line)] bg-[rgba(255,252,245,0.55)] p-3 ${
                  hot ? "ring-2 ring-[var(--brand)]" : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-2 px-1">
                  <div>
                    <h2 className="display text-base font-bold">{col.label}</h2>
                    <p className="text-xs text-[var(--muted)]">{col.hint}</p>
                  </div>
                  <span className="pill bg-black/5 text-[var(--ink-soft)]">
                    {tasks.length}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      agent={agentsById.get(task.agentId)}
                      busy={busyId === task.id}
                      onOpen={() => setSelected(task)}
                      onApprove={() =>
                        runAction(task.id, { action: "approve" })
                      }
                      onReject={() =>
                        runAction(task.id, {
                          action: "reject",
                          reason: "Needs revision",
                        })
                      }
                    />
                  ))}
                  {tasks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[var(--line)] px-3 py-8 text-center text-xs text-[var(--muted)]">
                      Empty lane
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel rise rounded-2xl p-5">
        <h2 className="display mb-3 text-lg font-bold">Live activity</h2>
        <ul className="space-y-2">
          {store.activity.slice(0, 8).map((event) => (
            <li
              key={event.id}
              className="flex items-start justify-between gap-4 border-b border-[var(--line)] py-2 text-sm last:border-0"
            >
              <span className="text-[var(--ink-soft)]">{event.message}</span>
              <time className="shrink-0 text-xs text-[var(--muted)]">
                {new Date(event.at).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      </section>

      {selected && (
        <TaskDetailModal
          task={selected}
          agent={agentsById.get(selected.agentId)}
          busy={busyId === selected.id}
          onClose={() => setSelected(null)}
          onApprove={() => runAction(selected.id, { action: "approve" })}
          onReject={() =>
            runAction(selected.id, {
              action: "reject",
              reason: "Needs revision",
            })
          }
          onSubmitVerification={() =>
            runAction(selected.id, {
              action: "submit_verification",
              implementationNotes: "Agent marked implementation complete.",
            })
          }
          onVerify={(ok) =>
            runAction(selected.id, {
              action: "verify",
              ok,
              verificationNotes: ok
                ? "Pacman verified live change matches proposal."
                : "Verification failed — send back for rework.",
            })
          }
        />
      )}
    </div>
  );
}
