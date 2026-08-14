"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Agent, AgentRole } from "@/lib/types";

const ROLES: AgentRole[] = [
  "seo",
  "wordpress",
  "booking",
  "dev",
  "research",
  "custom",
  "manager",
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/agents");
    setAgents(await res.json());
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        codename: fd.get("codename"),
        role: fd.get("role"),
        title: fd.get("title"),
        specialty: fd.get("specialty"),
        requiresApproval: fd.get("requiresApproval") === "on",
        avatarColor: fd.get("avatarColor") || "#5B8C5A",
        knowledgeDomains: String(fd.get("knowledgeDomains") || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        notes: fd.get("notes"),
        status: "idle",
      }),
    });
    setSaving(false);
    setOpen(false);
    await load();
  }

  return (
    <div className="space-y-6">
      <header className="rise flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Roster
          </p>
          <h1 className="display text-3xl font-extrabold md:text-4xl">
            Agents
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
            Pacman manages the fleet. Agents marked for approval cannot ship
            production changes until you click Approve.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-[var(--brand)]"
        >
          Add agent
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((agent, i) => (
          <article
            key={agent.id}
            className="panel rise rounded-2xl p-5"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-extrabold text-[var(--ink)]"
                style={{ background: agent.avatarColor }}
              >
                {agent.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="display text-xl font-bold">{agent.name}</h2>
                  <span className="pill bg-black/5 text-[var(--muted)]">
                    {agent.status}
                  </span>
                  {agent.requiresApproval && (
                    <span className="pill bg-[#f8e6dc] text-[var(--alert)]">
                      approval gate
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm font-semibold text-[var(--ink-soft)]">
                  {agent.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {agent.specialty}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 border-t border-[var(--line)] pt-4 text-center">
              {[
                ["Done", agent.stats.completed],
                ["Active", agent.stats.inProgress],
                ["Waiting", agent.stats.pendingApproval],
                ["Verified", agent.stats.verifiedByPacman],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <div className="display text-xl font-extrabold">{value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            {agent.notes && (
              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                {agent.notes}
              </p>
            )}
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={onSubmit}
            onClick={(e) => e.stopPropagation()}
            className="panel rise w-full max-w-lg space-y-3 rounded-3xl p-6"
          >
            <h2 className="display text-2xl font-extrabold">Add agent</h2>
            <input
              name="name"
              required
              placeholder="Name (e.g. Corey)"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
            />
            <input
              name="codename"
              placeholder="Codename"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
            />
            <input
              name="title"
              required
              placeholder="Title"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
            />
            <select
              name="role"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
              defaultValue="seo"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <textarea
              name="specialty"
              placeholder="Specialty"
              rows={2}
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
            />
            <input
              name="knowledgeDomains"
              placeholder="Knowledge domains (comma-separated)"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
            />
            <input
              name="avatarColor"
              type="color"
              defaultValue="#2F6FED"
              className="h-10 w-full rounded-xl border border-[var(--line)] bg-white"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              rows={2}
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2"
            />
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                name="requiresApproval"
                type="checkbox"
                defaultChecked
              />
              Requires approval before implementing changes
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[var(--ink)] px-4 py-2 text-sm font-bold text-[var(--brand)] disabled:opacity-50"
              >
                {saving ? "Saving…" : "Add to roster"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
