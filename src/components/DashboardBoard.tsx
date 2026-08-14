"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCommand } from "@/components/useCommand";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { AssignModal } from "@/components/AssignModal";
import { CommandWidgets } from "@/components/CommandWidgets";
import type { Priority } from "@/lib/types";

const PRIORITIES: Array<Priority | "all"> = [
  "all",
  "critical",
  "high",
  "medium",
  "low",
];

export function DashboardBoard() {
  const searchParams = useSearchParams();
  const agentParam = searchParams.get("agent");
  const laneParam = searchParams.get("lane");
  const cmd = useCommand();
  const [agentFilter, setAgentFilter] = useState<string | "all">(
    agentParam ?? "all",
  );
  const [priority, setPriority] = useState<Priority | "all">("all");
  const [assignOpen, setAssignOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showParked, setShowParked] = useState(false);

  useEffect(() => {
    if (agentParam) setAgentFilter(agentParam);
  }, [agentParam]);

  const visibleTasks = useMemo(() => {
    if (!cmd.store) return [];
    const byAgent =
      agentFilter === "all"
        ? cmd.store.tasks
        : cmd.store.tasks.filter((t) => t.agentId === agentFilter);
    const byPriority =
      priority === "all"
        ? byAgent
        : byAgent.filter((t) => t.priority === priority);
    const q = query.trim().toLowerCase();
    const searched = q
      ? byPriority.filter((t) =>
          `${t.title} ${t.description} ${t.tags.join(" ")} ${t.proposal?.summary ?? ""}`
            .toLowerCase()
            .includes(q),
        )
      : byPriority;
    if (laneParam) {
      return searched.filter((t) => t.status === laneParam);
    }
    return searched;
  }, [cmd.store, agentFilter, query, priority, laneParam]);

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
  const activity = cmd.store.activity.filter(
    (e) => agentFilter === "all" || e.agentId === agentFilter,
  );

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
            Pacman + Corey today. New agents land here when you introduce them.
            Approve production changes. Pacman verifies they actually shipped.
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
            <Link
              href="/fleet"
              className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-bold"
            >
              Fleet
            </Link>
            <Link
              href="/n8n"
              className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-bold"
            >
              n8n
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

      <CommandWidgets
        agents={cmd.store.agents}
        tasks={cmd.store.tasks}
        intel={cmd.store.intel}
        onOpenTask={cmd.setSelected}
      />

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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority | "all")}
          className="field max-w-[140px]"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? "All priority" : p}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-xs font-semibold text-[var(--ink-dim)]">
          <input
            type="checkbox"
            checked={showParked}
            onChange={(e) => setShowParked(e.target.checked)}
          />
          Show empty parked lanes
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cards"
          className="field ml-auto max-w-xs"
        />
        {filterAgent && (
          <Link
            href={`/agents/${filterAgent.id}`}
            className="text-xs font-bold text-[var(--brand)] underline"
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

      {visibleTasks.length === 0 ? (
        <div className="panel rise rounded-2xl p-10 text-center">
          <p className="display text-xl font-bold">No cards match</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Clear search or assign the next piece of work.
          </p>
        </div>
      ) : (
        <KanbanBoard
          tasks={visibleTasks}
          agentsById={cmd.agentsById}
          busyId={cmd.busyId}
          hideEmptyParked={!showParked}
          onOpen={cmd.setSelected}
          onApprove={cmd.approve}
          onReject={(id) => cmd.reject(id)}
        />
      )}

      <section className="panel rise rounded-2xl p-5">
        <h2 className="display mb-3 text-lg font-bold">Live activity</h2>
        {activity.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            No activity yet. Assign work and it will show up here.
          </p>
        ) : (
          <ul className="space-y-2">
            {activity.slice(0, 8).map((event) => (
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
        )}
      </section>

      {cmd.selected && (
        <TaskDetailModal
          task={cmd.selected}
          agent={cmd.agentsById.get(cmd.selected.agentId)}
          logs={cmd.store.logs}
          busy={cmd.busyId === cmd.selected.id}
          onClose={() => cmd.setSelected(null)}
          onApprove={() => cmd.approve(cmd.selected!.id)}
          onReject={(reason) => cmd.reject(cmd.selected!.id, reason)}
          onSubmitVerification={(notes) =>
            cmd.submitVerification(cmd.selected!.id, notes)
          }
          onVerify={(ok, notes) => cmd.verify(cmd.selected!.id, ok, notes)}
          onMove={(status) => cmd.move(cmd.selected!.id, status)}
          onRemove={() => void cmd.remove(cmd.selected!.id)}
          onAddNote={(title, body) =>
            void cmd.addNote(cmd.selected!, title, body)
          }
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
