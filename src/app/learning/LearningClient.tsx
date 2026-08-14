"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCommand } from "@/components/useCommand";
import type { LearningEntry, LearningPayload } from "@/lib/learning-types";

const TOPIC_TONE: Record<string, string> = {
  seo: "bg-[var(--sea-dim)] text-[var(--sea)]",
  dev: "bg-[#2a2040] text-[#c4a8ff]",
  wordpress: "bg-[#1e2a40] text-[#8eb6ff]",
  elementor: "bg-[#3a2030] text-[#ffb0c8]",
  ghl: "bg-[#203528] text-[#8dffb0]",
  ops: "bg-black/40 text-[var(--muted)]",
  ai: "bg-[#403020] text-[#ffd28a]",
  product: "bg-black/40 text-[var(--ink-dim)]",
};

function formatDay(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function LearningClient() {
  const cmd = useCommand();
  const searchParams = useSearchParams();
  const agentParam = searchParams.get("agent");
  const [payload, setPayload] = useState<LearningPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string>(agentParam ?? "pacman");
  const [weekOf, setWeekOf] = useState<string | null>(null);
  const [digest, setDigest] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (agentParam) setAgentId(agentParam);
  }, [agentParam]);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/learning", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load learning log");
        const data = (await res.json()) as LearningPayload;
        setPayload(data);
        setWeekOf(data.currentWeekOf);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load failed");
      }
    })();
  }, []);

  useEffect(() => {
    if (!agentId || !weekOf) {
      setDigest(null);
      return;
    }
    void (async () => {
      const res = await fetch(
        `/api/learning?digest=1&agentId=${encodeURIComponent(agentId)}&weekOf=${encodeURIComponent(weekOf)}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        setDigest(null);
        return;
      }
      const data = (await res.json()) as { markdown: string };
      setDigest(data.markdown);
    })();
  }, [agentId, weekOf]);

  const agents = cmd.store?.agents ?? [];

  const entries = useMemo(() => {
    if (!payload || !weekOf) return [] as LearningEntry[];
    return payload.index.entries
      .filter((e) => e.agentId === agentId && e.weekOf === weekOf)
      .sort((a, b) => b.readAt.localeCompare(a.readAt));
  }, [payload, agentId, weekOf]);

  const historyWeeks = useMemo(() => {
    if (!payload) return [] as string[];
    const set = new Set(
      payload.index.entries
        .filter((e) => e.agentId === agentId)
        .map((e) => e.weekOf),
    );
    for (const d of payload.digests) {
      if (d.agentId === agentId) set.add(d.weekOf);
    }
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [payload, agentId]);

  const weekCounts = useMemo(() => {
    const map = new Map<string, number>();
    if (!payload) return map;
    const week = weekOf ?? payload.currentWeekOf;
    for (const e of payload.index.entries) {
      if (e.weekOf !== week) continue;
      map.set(e.agentId, (map.get(e.agentId) ?? 0) + 1);
    }
    return map;
  }, [payload, weekOf]);

  if (error) {
    return (
      <div className="panel rounded-2xl p-8 text-[var(--alert)]">{error}</div>
    );
  }

  if (!payload || !weekOf) {
    return (
      <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
        Loading learning log…
      </div>
    );
  }

  const selectedAgent = agents.find((a) => a.id === agentId);

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Continuous study
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">Learning</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
          What every employee read this week — plus full history, saved in the
          repo so you can open it anytime and learn alongside them.
        </p>
      </header>

      <section className="rise grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => {
          const count = weekCounts.get(agent.id) ?? 0;
          const active = agent.id === agentId;
          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => setAgentId(agent.id)}
              className={`panel rounded-2xl p-4 text-left transition ${
                active
                  ? "ring-2 ring-[var(--brand)]"
                  : "hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold text-[#14160f]"
                  style={{ background: agent.avatarColor }}
                >
                  {agent.name.slice(0, 1)}
                </span>
                <div>
                  <div className="font-bold">{agent.name}</div>
                  <div className="text-[11px] text-[var(--muted)]">
                    {agent.title}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-[var(--ink-dim)]">
                <span className="display text-2xl font-extrabold text-[var(--brand)]">
                  {count}
                </span>{" "}
                reads this week
              </div>
            </button>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="panel rise h-fit rounded-2xl p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            History · {selectedAgent?.name ?? agentId}
          </div>
          <ul className="mt-3 space-y-1">
            {historyWeeks.map((w) => (
              <li key={w}>
                <button
                  type="button"
                  onClick={() => setWeekOf(w)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold ${
                    w === weekOf
                      ? "bg-[var(--brand)] text-[#14160f]"
                      : "hover:bg-white/5"
                  }`}
                >
                  Week of {w}
                  {w === payload.currentWeekOf ? " · now" : ""}
                </button>
              </li>
            ))}
            {historyWeeks.length === 0 && (
              <li className="px-3 py-2 text-sm text-[var(--muted)]">
                No study logged yet for this employee.
              </li>
            )}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-[var(--muted)]">
            Files live in{" "}
            <code className="text-[var(--ink-dim)]">data/learning/</code> so
            git keeps the archive forever.
          </p>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="display text-2xl font-extrabold">
                {selectedAgent?.name ?? agentId}
              </h2>
              <p className="text-sm text-[var(--ink-dim)]">
                Week of {weekOf} · {entries.length} item
                {entries.length === 1 ? "" : "s"}
              </p>
            </div>
            {selectedAgent && (
              <Link
                href={`/agents/${selectedAgent.id}`}
                className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm font-bold"
              >
                Open progress page
              </Link>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="panel rounded-2xl p-8 text-sm text-[var(--muted)]">
              No readings logged for this week yet. Pacman will add SEO +
              developer study here every Monday (and whenever deep research
              happens).
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, i) => {
                const open = openId === entry.id;
                return (
                  <article
                    key={entry.id}
                    className="panel rise rounded-2xl p-5"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`pill ${TOPIC_TONE[entry.topic] ?? TOPIC_TONE.ops}`}
                      >
                        {entry.topic}
                      </span>
                      <time className="text-xs text-[var(--muted)]">
                        {formatDay(entry.readAt)}
                      </time>
                      {entry.source && (
                        <span className="text-xs text-[var(--muted)]">
                          · {entry.source}
                        </span>
                      )}
                    </div>
                    <h3 className="display mt-2 text-lg font-bold leading-snug">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dim)]">
                      {entry.summary}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-[var(--muted)]">
                      Why it matters: {entry.whyItMatters}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.url && (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-[var(--brand)] px-3 py-1.5 text-sm font-bold text-[#14160f]"
                        >
                          Open source
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setOpenId(open ? null : entry.id)
                        }
                        className="rounded-xl border border-[var(--line)] px-3 py-1.5 text-sm font-bold"
                      >
                        {open ? "Hide takeaways" : "Show takeaways"}
                      </button>
                      {entry.repoPath && (
                        <span className="rounded-xl border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--muted)]">
                          Repo: {entry.repoPath}
                        </span>
                      )}
                    </div>

                    {open && (
                      <ul className="mt-4 space-y-2 border-t border-[var(--line)] pt-4">
                        {entry.takeaways.map((t) => (
                          <li
                            key={t}
                            className="flex gap-2 text-sm text-[var(--ink)]"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          <section className="panel rise rounded-2xl p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="display text-xl font-extrabold">
                Week digest (easy read)
              </h3>
              <span className="text-xs text-[var(--muted)]">
                data/learning/digests/{agentId}/{weekOf}.md
              </span>
            </div>
            {digest ? (
              <pre className="mt-4 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-xl bg-black/35 p-4 text-[13px] leading-relaxed text-[var(--paper)]">
                {digest}
              </pre>
            ) : (
              <p className="mt-3 text-sm text-[var(--muted)]">
                No markdown digest file for this week yet.
              </p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
