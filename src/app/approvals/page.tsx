"use client";

import Link from "next/link";
import { useCommand } from "@/components/useCommand";
import { TaskDetailModal } from "@/components/TaskDetailModal";

export default function ApprovalsPage() {
  const cmd = useCommand();
  const tasks =
    cmd.store?.tasks.filter((t) => t.status === "needs_approval") ?? [];

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Decision queue
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">Approvals</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
          One click. If you Approve, they implement. Pacman then checks the live
          result against the proposal.
        </p>
      </header>

      {cmd.error && (
        <div className="rounded-xl bg-[#3a1c12] px-4 py-3 text-sm text-[var(--alert)]">
          {cmd.error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="panel rise rounded-2xl p-10 text-center">
          <p className="display text-xl font-bold">All clear</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Nothing waiting.{" "}
            <Link href="/" className="font-semibold text-[var(--brand)] underline">
              Back to command
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task, i) => {
            const agent = cmd.agentsById.get(task.agentId);
            return (
              <article
                key={task.id}
                className="panel rise approve-pulse rounded-2xl p-5"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => cmd.setSelected(task)}
                    className="text-left"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      {agent?.name ?? task.agentId} · {task.priority}
                    </p>
                    <h2 className="display mt-1 text-xl font-bold">{task.title}</h2>
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={cmd.busyId === task.id}
                      onClick={() => cmd.approve(task.id)}
                      className="rounded-xl bg-[var(--good)] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={cmd.busyId === task.id}
                      onClick={() => cmd.reject(task.id)}
                      className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-bold disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
                {task.proposal && (
                  <div className="mt-4 rounded-xl bg-black/20 p-4 text-sm text-[var(--ink-dim)]">
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
            );
          })}
        </div>
      )}

      {cmd.selected && cmd.store && (
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
    </div>
  );
}
