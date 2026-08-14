"use client";

import { useState } from "react";
import type { Agent, Task, TaskStatus, WorkLog } from "@/lib/types";
import { COLUMNS } from "@/lib/columns";

export function TaskDetailModal({
  task,
  agent,
  logs = [],
  busy,
  onClose,
  onApprove,
  onReject,
  onSubmitVerification,
  onVerify,
  onMove,
  onRemove,
  onAddNote,
}: {
  task: Task;
  agent?: Agent;
  logs?: WorkLog[];
  busy?: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onSubmitVerification: (notes: string) => void;
  onVerify: (ok: boolean, notes: string) => void;
  onMove?: (status: TaskStatus) => void;
  onRemove?: () => void;
  onAddNote?: (title: string, body: string) => void;
}) {
  const related = logs.filter((l) => l.taskId === task.id);
  const [rejectReason, setRejectReason] = useState(task.rejectedReason ?? "");
  const [implNotes, setImplNotes] = useState(task.implementationNotes ?? "");
  const [verifyNotes, setVerifyNotes] = useState(task.verificationNotes ?? "");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-[2px] sm:items-center"
      onClick={onClose}
    >
      <div
        className="panel rise max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-5 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              {agent?.name ?? "Agent"} · {task.status.replaceAll("_", " ")}
            </p>
            <h2 className="display mt-1 text-2xl font-extrabold leading-tight">
              {task.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/5 px-3 py-1 text-sm font-semibold"
          >
            Close
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[var(--ink-dim)]">
          {task.description}
        </p>

        {task.proposal && (
          <div className="mt-5 rounded-2xl border border-[var(--line)] bg-black/20 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="display text-base font-bold">Change proposal</h3>
              <span className="pill bg-[var(--brand)] text-[#14160f]">
                impact {task.proposal.impact}
              </span>
            </div>
            <p className="text-sm text-[var(--ink-dim)]">{task.proposal.summary}</p>
            {task.proposal.targetUrl && (
              <a
                href={task.proposal.targetUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-[var(--sea)] underline"
              >
                {task.proposal.targetUrl}
              </a>
            )}
            <p className="mt-3 text-sm text-[var(--ink-dim)]">{task.proposal.details}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--ink-dim)]">
              {task.proposal.proposedActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            {task.proposal.evidence && task.proposal.evidence.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Evidence
                </div>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--ink-dim)]">
                  {task.proposal.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {(task.implementationNotes || task.verificationNotes || task.rejectedReason) && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {task.implementationNotes && (
              <Note label="Implementation" text={task.implementationNotes} />
            )}
            {task.verificationNotes && (
              <Note label="Pacman verification" text={task.verificationNotes} />
            )}
            {task.rejectedReason && (
              <Note label="Rejected" text={task.rejectedReason} />
            )}
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-5">
            <h3 className="display mb-2 text-base font-bold">Work on this card</h3>
            <ul className="space-y-2">
              {related.map((log) => (
                <li
                  key={log.id}
                  className="rounded-xl border border-[var(--line)] bg-black/15 px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{log.title}</span>
                    <span className="text-[10px] uppercase text-[var(--muted)]">
                      {log.kind}
                    </span>
                  </div>
                  {log.body && (
                    <p className="mt-1 text-[var(--ink-dim)]">{log.body}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {onAddNote && (
          <div className="mt-5 space-y-2 rounded-2xl border border-[var(--line)] bg-black/15 p-3">
            <h3 className="display text-sm font-bold">Add work note</h3>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title"
              className="field"
            />
            <textarea
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              rows={2}
              placeholder="What happened"
              className="field"
            />
            <button
              type="button"
              disabled={busy || !noteTitle.trim()}
              onClick={() => {
                onAddNote(noteTitle.trim(), noteBody.trim());
                setNoteTitle("");
                setNoteBody("");
              }}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs font-bold disabled:opacity-50"
            >
              Log note
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {task.status === "needs_approval" && (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={onApprove}
                className="approve-pulse rounded-xl bg-[var(--good)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                Approve — let them implement
              </button>
              <div className="flex min-w-[220px] flex-1 gap-2">
                <input
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reject reason"
                  className="field"
                />
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    onReject(rejectReason.trim() || "Needs revision")
                  }
                  className="rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm font-bold disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </>
          )}
          {task.status === "implementing" && (
            <div className="flex w-full flex-col gap-2">
              <textarea
                value={implNotes}
                onChange={(e) => setImplNotes(e.target.value)}
                rows={2}
                placeholder="What shipped, and where"
                className="field"
              />
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  onSubmitVerification(
                    implNotes.trim() || "Agent marked implementation complete.",
                  )
                }
                className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-[#14160f] disabled:opacity-50"
              >
                Mark implemented → Pacman review
              </button>
            </div>
          )}
          {task.status === "verifying" && (
            <div className="flex w-full flex-col gap-2">
              <textarea
                value={verifyNotes}
                onChange={(e) => setVerifyNotes(e.target.value)}
                rows={2}
                placeholder="Live vs proposal — what Pacman checked"
                className="field"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    onVerify(
                      true,
                      verifyNotes.trim() ||
                        "Pacman verified live change matches proposal.",
                    )
                  }
                  className="rounded-xl bg-[var(--good)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                >
                  Pacman: Verify OK
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    onVerify(
                      false,
                      verifyNotes.trim() ||
                        "Verification failed — send back for rework.",
                    )
                  }
                  className="rounded-xl bg-[var(--alert)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                >
                  Pacman: Block
                </button>
              </div>
            </div>
          )}
          {task.status === "assigned" && onMove && (
            <button
              type="button"
              disabled={busy}
              onClick={() => onMove("working")}
              className="rounded-xl bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-[var(--brand)] disabled:opacity-50"
            >
              Start work
            </button>
          )}
          {task.status === "working" && onMove && (
            <button
              type="button"
              disabled={busy}
              onClick={() => onMove("needs_approval")}
              className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-[#14160f] disabled:opacity-50"
            >
              Submit for approval
            </button>
          )}
          {onMove && (
            <select
              className="field max-w-[220px]"
              value={task.status}
              disabled={busy}
              onChange={(e) => onMove(e.target.value as TaskStatus)}
            >
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  Move to {col.label}
                </option>
              ))}
            </select>
          )}
          {onRemove && (
            <button
              type="button"
              disabled={busy}
              onClick={onRemove}
              className="rounded-xl border border-[var(--alert)]/40 px-4 py-2.5 text-sm font-bold text-[var(--alert)] disabled:opacity-50"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Note({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-[var(--line)] p-3 text-sm">
      <div className="text-xs font-bold uppercase text-[var(--muted)]">{label}</div>
      <p className="mt-1 text-[var(--ink-dim)]">{text}</p>
    </div>
  );
}
