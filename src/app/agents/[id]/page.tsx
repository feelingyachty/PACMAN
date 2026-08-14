"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { ActivityEvent, Agent, StoreData, Task } from "@/lib/types";
import { COLUMNS } from "@/lib/columns";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetailModal } from "@/components/TaskDetailModal";

export default function AgentProgressPage() {
  const params = useParams<{ id: string }>();
  const agentId = params.id;

  const [store, setStore] = useState<StoreData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Task | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const res = await fetch("/api/store", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load");
    const data = (await res.json()) as StoreData;
    setStore(data);
    if (selected) {
      setSelected(data.tasks.find((t) => t.id === selected.id) ?? null);
    }
  }, [selected]);

  useEffect(() => {
    void reload().catch((e) =>
      setError(e instanceof Error ? e.message : "Load failed"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const agent: Agent | undefined = store?.agents.find((a) => a.id === agentId);

  const tasks = useMemo(
    () => store?.tasks.filter((t) => t.agentId === agentId) ?? [],
    [store, agentId],
  );

  const activity: ActivityEvent[] = useMemo(
    () => store?.activity.filter((e) => e.agentId === agentId) ?? [],
    [store, agentId],
  );

  async function runAction(taskId: string, body: Record<string, unknown>) {
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
        Loading agent progress…
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="panel rise rounded-2xl p-10 text-center">
        <p className="display text-xl font-bold">Agent not found</p>
        <Link
          href="/agents"
          className="mt-3 inline-block text-sm font-semibold text-[var(--sea)] underline"
        >
          Back to roster
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rise flex flex-wrap items-center gap-2 text-sm">
        <Link href="/agents" className="font-semibold text-[var(--muted)]">
          Agents
        </Link>
        <span className="text-[var(--muted)]">/</span>
        <span className="font-bold">{agent.name}</span>
        <Link
          href={`/?agent=${agent.id}`}
          className="ml-auto rounded-full bg-black/5 px-3 py-1 text-xs font-bold"
        >
          Filter main board
        </Link>
      </div>

      <header className="rise overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)] p-6 text-[var(--paper)] md:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <span
            className="grid h-14 w-14 place-items-center rounded-full text-xl font-extrabold text-[var(--ink)]"
            style={{ background: agent.avatarColor }}
          >
            {agent.name.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgba(243,240,230,0.55)]">
              Pacman progress lane · {agent.status}
            </p>
            <h1 className="display text-3xl font-extrabold md:text-4xl">
              {agent.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-[var(--brand)]">
              {agent.title}
            </p>
            <p className="mt-2 max-w-2xl text-sm text-[rgba(243,240,230,0.75)]">
              {agent.specialty}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.requiresApproval ? (
                <span className="pill bg-[var(--brand)] text-[var(--ink)]">
                  Approval gate ON
                </span>
              ) : (
                <span className="pill bg-white/10 text-[var(--paper)]">
                  No approval gate
                </span>
              )}
              {agent.knowledgeDomains.map((d) => (
                <span key={d} className="pill bg-white/10 text-[var(--paper)]">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Done", agent.stats.completed],
            ["Active", agent.stats.inProgress],
            ["Needs you", agent.stats.pendingApproval],
            ["Verified", agent.stats.verifiedByPacman],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="rounded-2xl bg-white/5 px-3 py-3"
            >
              <div className="display text-2xl font-extrabold">{value}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[rgba(243,240,230,0.55)]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-[var(--alert)]/30 bg-[#f8e6dc] px-4 py-3 text-sm text-[var(--alert)]">
          {error}
        </div>
      )}

      <section className="board-scroll rise overflow-x-auto pb-2">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="display text-xl font-bold">
              Everything {agent.name} is doing
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Full pipeline for this agent only
            </p>
          </div>
          <span className="pill bg-black/5">{tasks.length} tasks</span>
        </div>
        <div className="flex min-w-max gap-3">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className={`flex w-[280px] flex-col rounded-2xl border border-[var(--line)] bg-[rgba(255,252,245,0.55)] p-3 ${
                  col.id === "needs_approval" && colTasks.length
                    ? "ring-2 ring-[var(--brand)]"
                    : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-between px-1">
                  <h3 className="display text-sm font-bold">{col.label}</h3>
                  <span className="pill bg-black/5">{colTasks.length}</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      agent={agent}
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
                  {colTasks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[var(--line)] px-3 py-6 text-center text-xs text-[var(--muted)]">
                      —
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel rise rounded-2xl p-5">
        <h2 className="display mb-3 text-lg font-bold">Activity log</h2>
        {activity.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No activity yet.</p>
        ) : (
          <ul className="space-y-2">
            {activity.map((event) => (
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
        )}
      </section>

      {agent.notes && (
        <section className="panel rise rounded-2xl p-5 text-sm text-[var(--ink-soft)]">
          <h2 className="display mb-2 text-lg font-bold text-[var(--ink)]">
            Pacman notes
          </h2>
          {agent.notes}
        </section>
      )}

      {selected && (
        <TaskDetailModal
          task={selected}
          agent={agent}
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
