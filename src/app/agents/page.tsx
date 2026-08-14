"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCommand } from "@/components/useCommand";
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
  const router = useRouter();
  const cmd = useCommand();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/agents", {
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
      }),
    });
    const agent = (await res.json()) as Agent;
    setSaving(false);
    setOpen(false);
    router.push(`/agents/${agent.id}`);
  }

  return (
    <div className="space-y-6">
      <header className="rise flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Roster
          </p>
          <h1 className="display text-3xl font-extrabold md:text-4xl">Agents</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
            Tell Pacman a new agent exists. They get a progress page, a work
            log, and an approval gate if they can change production.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-[#14160f]"
        >
          New agent
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {(cmd.store?.agents ?? []).map((agent, i) => (
          <Link
            key={agent.id}
            href={`/agents/${agent.id}`}
            className="panel rise block rounded-2xl p-5 transition hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-extrabold text-[#14160f]"
                style={{ background: agent.avatarColor }}
              >
                {agent.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="display text-xl font-bold">{agent.name}</h2>
                  <span className="pill bg-white/5 text-[var(--muted)]">
                    {agent.status}
                  </span>
                  {agent.requiresApproval && (
                    <span className="pill bg-[#3a1c12] text-[var(--alert)]">
                      approval gate
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm font-semibold text-[var(--ink-dim)]">
                  {agent.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {agent.specialty}
                </p>
                <p className="mt-3 text-xs font-bold text-[var(--brand)]">
                  Open progress →
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 border-t border-[var(--line)] pt-4 text-center">
              {[
                ["Done", agent.stats.completed],
                ["Active", agent.stats.inProgress],
                ["Waiting", agent.stats.pendingApproval],
                ["Rate", `${agent.stats.completionRate}%`],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <div className="display text-xl font-extrabold">{value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={onSubmit}
            onClick={(e) => e.stopPropagation()}
            className="panel rise w-full max-w-lg space-y-3 rounded-3xl p-6"
          >
            <h2 className="display text-2xl font-extrabold">Onboard agent</h2>
            <p className="text-xs text-[var(--muted)]">
              Pacman will open their progress page and log the onboard.
            </p>
            <input name="name" required placeholder="Name" className="field" />
            <input name="codename" placeholder="Codename" className="field" />
            <input name="title" required placeholder="Title" className="field" />
            <select name="role" className="field" defaultValue="seo">
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
              className="field"
            />
            <input
              name="knowledgeDomains"
              placeholder="Knowledge domains (comma-separated)"
              className="field"
            />
            <input
              name="avatarColor"
              type="color"
              defaultValue="#2F6FED"
              className="field h-10"
            />
            <textarea name="notes" placeholder="Notes" rows={2} className="field" />
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input name="requiresApproval" type="checkbox" defaultChecked />
              Approval gate — they cannot ship production changes without Approve
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-bold">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[#14160f] disabled:opacity-50"
              >
                {saving ? "Onboarding…" : "Onboard with Pacman"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
