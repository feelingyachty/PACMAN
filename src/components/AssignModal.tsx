"use client";

import { useState, type FormEvent } from "react";
import type { Agent, Impact, Priority } from "@/lib/types";
import { createTask } from "@/lib/client";

export function AssignModal({
  agents,
  defaultAgentId,
  onClose,
  onCreated,
}: {
  agents: Agent[];
  defaultAgentId?: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [withProposal, setWithProposal] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const actions = String(fd.get("proposedActions") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    try {
      await createTask({
        title: String(fd.get("title") || ""),
        description: String(fd.get("description") || ""),
        agentId: String(fd.get("agentId") || ""),
        priority: String(fd.get("priority") || "medium") as Priority,
        tags: String(fd.get("tags") || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        proposal: withProposal
          ? {
              summary: String(fd.get("summary") || ""),
              targetUrl: String(fd.get("targetUrl") || "") || undefined,
              impact: String(fd.get("impact") || "medium") as Impact,
              details: String(fd.get("details") || ""),
              proposedActions: actions,
            }
          : undefined,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Assign failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="panel rise max-h-[90vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-3xl p-6"
      >
        <h2 className="display text-2xl font-extrabold">Assign work</h2>
        <p className="text-xs text-[var(--muted)]">
          Pacman tracks it from Assigned to Done. Attach a proposal when the
          work can change production.
        </p>
        {error && <p className="text-sm text-[var(--alert)]">{error}</p>}
        <input name="title" required placeholder="Task title" className="field" />
        <textarea
          name="description"
          rows={3}
          placeholder="What they must do"
          className="field"
        />
        <select
          name="agentId"
          className="field"
          defaultValue={defaultAgentId ?? agents.find((a) => a.id === "corey")?.id}
        >
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name} — {agent.title}
            </option>
          ))}
        </select>
        <select name="priority" className="field" defaultValue="medium">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
          <option value="critical">critical</option>
        </select>
        <input name="tags" placeholder="tags, comma-separated" className="field" />
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={withProposal}
            onChange={(e) => setWithProposal(e.target.checked)}
          />
          Attach a production change proposal
        </label>
        {withProposal && (
          <div className="space-y-3 rounded-2xl border border-[var(--line)] bg-black/20 p-3">
            <input
              name="summary"
              required
              placeholder="Proposal summary"
              className="field"
            />
            <input
              name="targetUrl"
              placeholder="Target URL (optional)"
              className="field"
            />
            <select name="impact" className="field" defaultValue="medium">
              <option value="low">impact low</option>
              <option value="medium">impact medium</option>
              <option value="high">impact high</option>
            </select>
            <textarea
              name="details"
              rows={3}
              placeholder="Why this change, and why it does not cannibalize money pages"
              className="field"
            />
            <textarea
              name="proposedActions"
              rows={4}
              placeholder={"One action per line\nCreate /guides/charter-experience\nAdd FAQ on top 3 landers"}
              className="field"
            />
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-bold">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[#14160f] disabled:opacity-50"
          >
            {saving ? "Assigning…" : "Assign"}
          </button>
        </div>
      </form>
    </div>
  );
}
