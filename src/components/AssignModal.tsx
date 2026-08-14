"use client";

import { useState, type FormEvent } from "react";
import type { Agent, Priority } from "@/lib/types";
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
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
        className="panel rise w-full max-w-lg space-y-3 rounded-3xl p-6"
      >
        <h2 className="display text-2xl font-extrabold">Assign work</h2>
        <p className="text-xs text-[var(--muted)]">
          Pacman tracks it from Assigned to Done. Approval applies if that agent
          is gated.
        </p>
        {error && <p className="text-sm text-[var(--alert)]">{error}</p>}
        <input name="title" required placeholder="Task title" className="field" />
        <textarea
          name="description"
          rows={3}
          placeholder="What they must do"
          className="field"
        />
        <select name="agentId" className="field" defaultValue={defaultAgentId}>
          {agents
            .filter((a) => a.id !== "pacman" || agents.length === 1)
            .concat(agents.filter((a) => a.id === "pacman"))
            .filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i)
            .map((agent) => (
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
