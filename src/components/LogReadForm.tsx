"use client";

import { useState, type FormEvent } from "react";
import { LEARNING_TOPICS, type LearningEntry, type LearningTopic } from "@/lib/learning-types";

export function LogReadForm({
  defaultAgentId,
  agents,
  onCreated,
}: {
  defaultAgentId: string;
  agents: { id: string; name: string }[];
  onCreated: (entry: LearningEntry) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const takeaways = String(fd.get("takeaways") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const res = await fetch("/api/learning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentId: String(fd.get("agentId") || defaultAgentId),
        topic: String(fd.get("topic") || "seo") as LearningTopic,
        title: String(fd.get("title") || ""),
        summary: String(fd.get("summary") || ""),
        whyItMatters: String(fd.get("whyItMatters") || ""),
        url: String(fd.get("url") || "") || undefined,
        source: String(fd.get("source") || "") || undefined,
        repoPath: String(fd.get("repoPath") || "") || undefined,
        takeaways,
      }),
    });
    const data = (await res.json()) as LearningEntry & { error?: string };
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Could not log read");
      return;
    }
    e.currentTarget.reset();
    setOpen(false);
    onCreated(data);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[var(--brand)] px-3 py-2 text-sm font-bold text-[#14160f]"
      >
        Log a read
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="panel rise w-full max-w-xl space-y-3 rounded-2xl p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="display text-lg font-extrabold">Log a read</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-bold text-[var(--muted)]"
        >
          Cancel
        </button>
      </div>
      <p className="text-xs text-[var(--muted)]">
        Writes to <code>data/learning/</code> so Fernando can reopen the same source.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <select name="agentId" className="field" defaultValue={defaultAgentId}>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <select name="topic" className="field" defaultValue="seo">
          {LEARNING_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <input name="title" required placeholder="Title" className="field" />
      <input name="url" type="url" placeholder="https:// source URL" className="field" />
      <input name="source" placeholder="Source name (optional)" className="field" />
      <input name="repoPath" placeholder="Repo path (optional)" className="field" />
      <textarea
        name="summary"
        required
        rows={3}
        placeholder="What did you learn?"
        className="field"
      />
      <textarea
        name="whyItMatters"
        required
        rows={2}
        placeholder="Why it matters for Feeling Yachty"
        className="field"
      />
      <textarea
        name="takeaways"
        rows={3}
        placeholder="Takeaways — one per line"
        className="field"
      />
      {error && <p className="text-sm text-[var(--alert)]">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[#14160f] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save to archive"}
        </button>
      </div>
    </form>
  );
}
