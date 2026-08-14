"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCommand } from "@/components/useCommand";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { AssignModal } from "@/components/AssignModal";
import type { LearningPayload } from "@/lib/learning-types";

export function DashboardBoard() {
  const searchParams = useSearchParams();
  const agentParam = searchParams.get("agent");
  const cmd = useCommand();
  const [agentFilter, setAgentFilter] = useState<string | "all">(
    agentParam ?? "all",
  );
  const [assignOpen, setAssignOpen] = useState(false);
  const [learning, setLearning] = useState<LearningPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/learning?meta=1", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: LearningPayload | null) => {
        if (!cancelled && data) setLearning(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (agentParam) setAgentFilter(agentParam);
  }, [agentParam]);

  const visibleTasks = useMemo(() => {
    if (!cmd.store) return [];
    if (agentFilter === "all") return cmd.store.tasks;
    return cmd.store.tasks.filter((t) => t.agentId === agentFilter);
  }, [cmd.store, agentFilter]);

  if (!cmd.store) {
    return (
      <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
        Loading command center…
      </div>
    );
  }

  const pending = visibleTasks.filter((t) => t.status === "needs_approval").length;
  const verifying = visibleTasks.filter((t) => t.status === "verifying").length;
  const filterAgent =
    agentFilter === "all" ? null : cmd.agentsById.get(agentFilter);

  return (
    <div className="space-y-6">
      <section className="rise grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[#0c0d09] px-6 py-7 md:px-8">
          <div
            className="pointer-events-none absolute -right-8 -top-14 h-52 w-52 rounded-full bg-[var(--brand)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-4 right-28 h-20 w-20 rounded-full bg-[var(--sea)] opacity-80"
            aria-hidden
          />
          <p className="pill mb-4 bg-[var(--brand)] text-[#14160f]">
            Online · Head of Agents
          </p>
          <h1 className="display relative text-4xl font-extrabold leading-[0.95] md:text-5xl">
            PACMAN
          </h1>
          <p className="relative mt-3 max-w-lg text-sm leading-relaxed text-[var(--ink-dim)] md:text-base">
            Every MDI agent. Every assignment. Approve when they want to change
            production. Pacman verifies they actually did it.
          </p>
          <div className="relative mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAssignOpen(true)}
              className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[#14160f]"
            >
              Assign work
            </button>
            <Link
              href="/approvals"
              className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-bold"
            >
              Approval inbox ({pending})
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["Awaiting you", pending, "bg-[var(--brand)] text-[#14160f]"],
            ["Pacman review", verifying, "bg-[var(--sea-dim)]"],
            ["Agents", cmd.store.agents.length, "bg-black/30"],
            ["Logged actions", cmd.store.logs.length, "bg-black/30"],
          ].map(([label, value, tone], i) => (
            <div
              key={String(label)}
              className={`panel rise rounded-2xl p-4 ${tone}`}
              style={{ animationDelay: `${0.06 * (i + 1)}s` }}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                {label}
              </div>
              <div className="display mt-2 text-3xl font-extrabold">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rise panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Continuous study
          </p>
          <h2 className="display mt-1 text-xl font-extrabold">Learning log</h2>
          <p className="mt-1 max-w-xl text-sm text-[var(--ink-dim)]">
            See what Pacman, Corey, and every future employee read this week —
            plus history saved in the repo so you can study the same material.
          </p>
          {learning && (
            <p className="mt-2 text-sm text-[var(--ink)]">
              <span className="display text-2xl font-extrabold text-[var(--brand)]">
                {learning.stats.thisWeek}
              </span>{" "}
              reads this week
              {Object.entries(learning.stats.byAgent).length > 0 && (
                <span className="text-[var(--muted)]">
                  {" "}
                  ·{" "}
                  {Object.entries(learning.stats.byAgent)
                    .map(([id, n]) => `${id} ${n}`)
                    .join(" · ")}
                </span>
              )}
            </p>
          )}
        </div>
        <Link
          href="/learning"
          className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-[#14160f]"
        >
          Open Learning
        </Link>
      </section>

      <section className="rise flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Watch
        </span>
        <button
          type="button"
          onClick={() => setAgentFilter("all")}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            agentFilter === "all"
              ? "bg-[var(--brand)] text-[#14160f]"
              : "bg-white/5 text-[var(--ink-dim)]"
          }`}
        >
          Fleet
        </button>
        {cmd.store.agents.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => setAgentFilter(agent.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              agentFilter === agent.id
                ? "bg-[var(--brand)] text-[#14160f]"
                : "bg-white/5 text-[var(--ink-dim)]"
            }`}
          >
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full"
              style={{ background: agent.avatarColor }}
            />
            {agent.name}
          </button>
        ))}
        {filterAgent && (
          <Link
            href={`/agents/${filterAgent.id}`}
            className="ml-auto text-xs font-bold text-[var(--brand)] underline"
          >
            {filterAgent.name} progress →
          </Link>
        )}
      </section>

      {cmd.error && (
        <div className="rounded-xl border border-[var(--alert)]/40 bg-[#3a1c12] px-4 py-3 text-sm text-[var(--alert)]">
          {cmd.error}
        </div>
      )}

      <KanbanBoard
        tasks={visibleTasks}
        agentsById={cmd.agentsById}
        busyId={cmd.busyId}
        onOpen={cmd.setSelected}
        onApprove={cmd.approve}
        onReject={cmd.reject}
      />

      <section className="panel rise rounded-2xl p-5">
        <h2 className="display mb-3 text-lg font-bold">Live activity</h2>
        <ul className="space-y-2">
          {cmd.store.activity
            .filter((e) => agentFilter === "all" || e.agentId === agentFilter)
            .slice(0, 8)
            .map((event) => (
              <li
                key={event.id}
                className="flex items-start justify-between gap-4 border-b border-[var(--line)] py-2 text-sm last:border-0"
              >
                <span className="text-[var(--ink-dim)]">{event.message}</span>
                <time className="shrink-0 text-xs text-[var(--muted)]">
                  {new Date(event.at).toLocaleString()}
                </time>
              </li>
            ))}
        </ul>
      </section>

      {cmd.selected && (
        <TaskDetailModal
          task={cmd.selected}
          agent={cmd.agentsById.get(cmd.selected.agentId)}
          logs={cmd.store.logs}
          busy={cmd.busyId === cmd.selected.id}
          onClose={() => cmd.setSelected(null)}
          onApprove={() => cmd.approve(cmd.selected!.id)}
          onReject={() => cmd.reject(cmd.selected!.id)}
          onSubmitVerification={() => cmd.submitVerification(cmd.selected!.id)}
          onVerify={(ok) => cmd.verify(cmd.selected!.id, ok)}
        />
      )}

      {assignOpen && (
        <AssignModal
          agents={cmd.store.agents}
          defaultAgentId={filterAgent?.id}
          onClose={() => setAssignOpen(false)}
          onCreated={() => void cmd.reload()}
        />
      )}
    </div>
  );
}
