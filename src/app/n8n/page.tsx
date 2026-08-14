"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Agent, Automation, AutomationKind } from "@/lib/types";

const KINDS: Array<AutomationKind | "all"> = [
  "all",
  "ai-agent",
  "content",
  "sync",
  "notify",
  "ops",
];

export default function N8nPage() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<{
    mcp: {
      url: string;
      reachable: boolean;
      authorized: boolean;
      detail: string;
      serverName?: string;
      tools: string[];
      toolCount: number;
    };
    automations: Automation[];
    agents: Agent[];
  } | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/n8n", { cache: "no-store" });
      setData(await res.json());
    })();
  }, []);

  const rows = useMemo(() => {
    const list = data?.automations ?? [];
    const byKind = kind === "all" ? list : list.filter((a) => a.kind === kind);
    const q = query.trim().toLowerCase();
    if (!q) return byKind;
    return byKind.filter((a) => a.name.toLowerCase().includes(q));
  }, [data, kind, query]);

  if (!data) {
    return (
      <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
        Probing n8n…
      </div>
    );
  }

  const active = data.automations.filter((a) => a.active).length;

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          feelingyachty.app.n8n.cloud
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">n8n fleet</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
          Infrastructure only. Pacman watches this instance. Workflows become
          agents on the command board only when you introduce them.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="panel rise rounded-2xl p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            MCP
          </div>
          <div className="display mt-2 text-xl font-extrabold">
            {data.mcp.authorized
              ? "Connected"
              : data.mcp.reachable
                ? "Auth required"
                : "Unreachable"}
          </div>
          <p className="mt-2 break-all text-xs text-[var(--muted)]">
            n8n-mcp · {data.mcp.serverName} · {data.mcp.toolCount} tools
          </p>
          <p className="mt-1 text-xs text-[var(--ink-dim)]">{data.mcp.detail}</p>
        </div>
        <div className="panel rise rounded-2xl p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Workflows
          </div>
          <div className="display mt-2 text-3xl font-extrabold">
            {data.automations.length}
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">{active} active</p>
        </div>
        <div className="panel rise rounded-2xl p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            n8n agents
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.agents.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                None on the roster yet. Introduce an agent when it is ready.
              </p>
            ) : (
              data.agents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.id}`}
                  className="rounded-full bg-[var(--brand)] px-3 py-1 text-sm font-bold text-[#14160f]"
                >
                  {agent.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {data.mcp.authorized && data.mcp.tools.length > 0 && (
        <section className="panel rise rounded-2xl p-5">
          <h2 className="display mb-3 text-lg font-bold">MCP tools Pacman can call</h2>
          <div className="flex flex-wrap gap-2">
            {data.mcp.tools.map((tool) => (
              <span key={tool} className="pill bg-white/5 text-[var(--ink-dim)]">
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="rise flex flex-wrap items-center gap-2">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              kind === k
                ? "bg-[var(--brand)] text-[#14160f]"
                : "bg-white/5 text-[var(--ink-dim)]"
            }`}
          >
            {k}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search workflows"
          className="field ml-auto max-w-xs"
        />
      </div>

      <div className="panel rise overflow-hidden rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/30 text-[11px] uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Workflow</th>
              <th className="px-4 py-3">Kind</th>
              <th className="px-4 py-3">Nodes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[var(--muted)]">
                  No workflows match.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">
                  <a
                    href={row.editorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold underline decoration-[var(--line)] hover:text-[var(--brand)]"
                  >
                    {row.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-[var(--ink-dim)]">{row.kind}</td>
                <td className="px-4 py-3 text-[var(--ink-dim)]">{row.nodeCount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`pill ${
                      row.active
                        ? "bg-[var(--sea-dim)] text-[var(--sea)]"
                        : "bg-white/5 text-[var(--muted)]"
                    }`}
                  >
                    {row.active ? "active" : "off"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
