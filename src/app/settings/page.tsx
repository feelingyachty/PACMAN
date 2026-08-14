"use client";

import { useState } from "react";
import Link from "next/link";
import { resetStore } from "@/lib/client";
import { useCommand } from "@/components/useCommand";
import { COLUMNS } from "@/lib/columns";

export default function SettingsPage() {
  const cmd = useCommand();
  const [resetting, setResetting] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function onReset() {
    setResetting(true);
    setNote(null);
    try {
      await resetStore();
      await cmd.reload();
      setNote("Store reset to Pacman + Corey seed.");
    } catch (e) {
      setNote(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Command
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">Settings</h1>
      </header>

      <section className="panel rise space-y-3 rounded-2xl p-5">
        <h2 className="display text-xl font-bold">Standing order</h2>
        <p className="text-sm leading-relaxed text-[var(--ink-dim)]">
          Roster is Pacman (manager) and Corey (SEO). When you tell Pacman a new
          agent is ready, they get a progress page, a work log, and an approval
          gate if they can change production. Unfinished agents stay off the
          board.
        </p>
      </section>

      <section className="panel rise space-y-3 rounded-2xl p-5">
        <h2 className="display text-xl font-bold">Board lanes</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {COLUMNS.map((col, i) => (
            <li key={col.id} className="rounded-xl bg-black/20 px-3 py-2 text-sm">
              <span className="font-bold text-[var(--brand)]">{i + 1}.</span>{" "}
              <span className="font-semibold">{col.label}</span>
              <span className="text-[var(--muted)]"> — {col.hint}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel rise space-y-3 rounded-2xl p-5">
        <h2 className="display text-xl font-bold">Connections</h2>
        <ul className="space-y-2 text-sm text-[var(--ink-dim)]">
          <li>
            n8n-mcp —{" "}
            <Link href="/n8n" className="font-semibold text-[var(--brand)] underline">
              fleet page
            </Link>{" "}
            · token from N8N_MCP_TOKEN
          </li>
          <li>
            Fleet —{" "}
            <Link href="/fleet" className="font-semibold text-[var(--brand)] underline">
              Feeling Yachty Main
            </Link>{" "}
            · other BookMyBoat tabs ignored
          </li>
          <li>
            Knowledge —{" "}
            <Link href="/knowledge" className="font-semibold text-[var(--brand)] underline">
              Turberg, V8r, WordPress, Elementor
            </Link>
          </li>
          <li>
            Intel —{" "}
            <Link href="/intel" className="font-semibold text-[var(--brand)] underline">
              SEO + developer signals
            </Link>
          </li>
        </ul>
      </section>

      <section className="panel rise space-y-3 rounded-2xl p-5">
        <h2 className="display text-xl font-bold">Data</h2>
        <p className="text-sm text-[var(--ink-dim)]">
          {cmd.store
            ? `${cmd.store.agents.length} agents · ${cmd.store.tasks.length} tasks · ${cmd.store.logs.length} log lines`
            : "Loading…"}
        </p>
        <button
          type="button"
          disabled={resetting}
          onClick={() => void onReset()}
          className="rounded-xl border border-[var(--alert)]/40 px-4 py-2 text-sm font-bold text-[var(--alert)] disabled:opacity-50"
        >
          {resetting ? "Resetting…" : "Reset to seed"}
        </button>
        {note && <p className="text-sm text-[var(--muted)]">{note}</p>}
      </section>
    </div>
  );
}
