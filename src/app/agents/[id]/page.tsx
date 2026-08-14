"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useCommand } from "@/components/useCommand";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { AssignModal } from "@/components/AssignModal";

export default function AgentProgressPage() {
  const params = useParams<{ id: string }>();
  const agentId = params.id;
  const cmd = useCommand();
  const [assignOpen, setAssignOpen] = useState(false);

  const agent = cmd.store?.agents.find((a) => a.id === agentId);
  const tasks = useMemo(
    () => cmd.store?.tasks.filter((t) => t.agentId === agentId) ?? [],
    [cmd.store, agentId],
  );
  const logs = useMemo(
    () => cmd.store?.logs.filter((l) => l.agentId === agentId || (l.taskId && tasks.some((t) => t.id === l.taskId))) ?? [],
    [cmd.store, agentId, tasks],
  );

  if (!cmd.store) {
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
        <Link href="/agents" className="mt-3 inline-block text-sm font-semibold text-[var(--brand)] underline">
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
          className="ml-auto text-xs font-bold text-[var(--brand)] underline"
        >
          Filter command board
        </Link>
      </div>

      <header className="rise overflow-hidden rounded-3xl border border-[var(--line)] bg-[#0c0d09] p-6 md:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <span
            className="grid h-14 w-14 place-items-center rounded-full text-xl font-extrabold text-[#14160f]"
            style={{ background: agent.avatarColor }}
          >
            {agent.name.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Progress lane · {agent.status}
            </p>
            <h1 className="display text-3xl font-extrabold md:text-4xl">{agent.name}</h1>
            <p className="mt-1 text-sm font-semibold text-[var(--brand)]">{agent.title}</p>
            <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">{agent.mandate}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`pill ${
                  agent.requiresApproval
                    ? "bg-[var(--brand)] text-[#14160f]"
                    : "bg-white/10"
                }`}
              >
                {agent.requiresApproval ? "Approval gate ON" : "No approval gate"}
              </span>
              {agent.knowledgeDomains.map((d) => (
                <span key={d} className="pill bg-white/10">
                  {d}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAssignOpen(true)}
            className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[#14160f]"
          >
            Assign work
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            ["Done", agent.stats.completed],
            ["Active", agent.stats.inProgress],
            ["Needs you", agent.stats.pendingApproval],
            ["Verified", agent.stats.verifiedByPacman],
            ["Complete", `${agent.stats.completionRate}%`],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-2xl bg-white/5 px-3 py-3">
              <div className="display text-2xl font-extrabold">{value}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {cmd.error && (
        <div className="rounded-xl bg-[#3a1c12] px-4 py-3 text-sm text-[var(--alert)]">
          {cmd.error}
        </div>
      )}

      <section className="rise">
        <div className="mb-3">
          <h2 className="display text-xl font-bold">Everything {agent.name} is doing</h2>
          <p className="text-sm text-[var(--muted)]">Their board only</p>
        </div>
        <KanbanBoard
          tasks={tasks}
          agentsById={cmd.agentsById}
          busyId={cmd.busyId}
          onOpen={cmd.setSelected}
          onApprove={cmd.approve}
          onReject={cmd.reject}
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel rise rounded-2xl p-5">
          <h2 className="display mb-3 text-lg font-bold">Work log</h2>
          {logs.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">Nothing logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {logs.map((log) => (
                <li key={log.id} className="border-b border-[var(--line)] pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{log.title}</span>
                    <span className="pill bg-white/5">{log.kind}</span>
                  </div>
                  {log.body && (
                    <p className="mt-1 whitespace-pre-line text-sm text-[var(--ink-dim)]">
                      {log.body}
                    </p>
                  )}
                  <time className="mt-1 block text-xs text-[var(--muted)]">
                    {new Date(log.at).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel rise rounded-2xl p-5">
          <h2 className="display mb-3 text-lg font-bold">Playbook</h2>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink-dim)]">
            {agent.playbook}
          </pre>
          {agent.notes && (
            <p className="mt-4 text-sm text-[var(--muted)]">{agent.notes}</p>
          )}
        </section>
      </div>

      {cmd.selected && (
        <TaskDetailModal
          task={cmd.selected}
          agent={agent}
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
          defaultAgentId={agent.id}
          onClose={() => setAssignOpen(false)}
          onCreated={() => void cmd.reload()}
        />
      )}
    </div>
  );
}
