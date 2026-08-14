"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCommand } from "@/components/useCommand";
import { LogReadForm } from "@/components/LogReadForm";
import { MarkdownLite } from "@/components/MarkdownLite";
import type { Agent } from "@/lib/types";
import {
  LEARNING_GITHUB_TREE,
  type LearningEntry,
  type LearningPayload,
  type LearningTopic,
} from "@/lib/learning-types";

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

const FLEET = "all";

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

function formatWeek(weekOf: string) {
  try {
    return new Date(`${weekOf}T12:00:00`).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return weekOf;
  }
}

export default function LearningClient() {
  const cmd = useCommand();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agentParam = searchParams.get("agent") ?? FLEET;
  const weekParam = searchParams.get("week");
  const topicParam = (searchParams.get("topic") ?? "all") as LearningTopic | "all";
  const qParam = searchParams.get("q") ?? "";

  const [payload, setPayload] = useState<LearningPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string>(agentParam);
  const [weekOf, setWeekOf] = useState<string | null>(weekParam);
  const [topic, setTopic] = useState<LearningTopic | "all">(topicParam);
  const [query, setQuery] = useState(qParam);
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setAgentId(agentParam);
  }, [agentParam]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/learning", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load learning log");
        const data = (await res.json()) as LearningPayload;
        if (cancelled) return;
        setPayload(data);
        setWeekOf((current) => current ?? weekParam ?? data.currentWeekOf);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Load failed");
      }
    })();
    return () => {
      cancelled = true;
    };
    // Full archive once; week/agent/topic/q are client filters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pushParams(next: {
    agent?: string;
    week?: string | null;
    topic?: string;
    q?: string;
  }) {
    const params = new URLSearchParams();
    const a = next.agent ?? agentId;
    const w = next.week === undefined ? weekOf : next.week;
    const t = next.topic ?? topic;
    const q = next.q ?? query;
    if (a && a !== FLEET) params.set("agent", a);
    if (w) params.set("week", w);
    if (t && t !== "all") params.set("topic", t);
    if (q.trim()) params.set("q", q.trim());
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const roster = cmd.store?.agents ?? [];
  const people = useMemo(() => {
    const byId = new Map<string, Agent>();
    for (const a of roster) byId.set(a.id, a);
    const extraIds = payload?.agentIds ?? [];
    const list = [...roster];
    for (const id of extraIds) {
      if (!byId.has(id)) {
        list.push({
          id,
          name: id,
          role: "custom",
          title: "Employee",
          specialty: "",
          mandate: "",
          playbook: "",
          status: "idle",
          avatarColor: "#8a8468",
          requiresApproval: false,
          knowledgeDomains: [],
          stats: {
            completed: 0,
            pendingApproval: 0,
            inProgress: 0,
            verifiedByPacman: 0,
            blocked: 0,
            assignedTotal: 0,
            completionRate: 0,
            verificationPassRate: 0,
          },
          createdAt: "",
        });
      }
    }
    return list;
  }, [roster, payload?.agentIds]);

  const selectedWeek = weekOf ?? payload?.currentWeekOf ?? "";

  const weekEntries = useMemo(() => {
    if (!payload || !selectedWeek) return [] as LearningEntry[];
    return payload.index.entries
      .filter((e) => e.weekOf === selectedWeek)
      .filter((e) => agentId === FLEET || e.agentId === agentId)
      .filter((e) => topic === "all" || e.topic === topic)
      .filter((e) => {
        if (!query.trim()) return true;
        const hay = `${e.title} ${e.summary} ${e.whyItMatters} ${e.takeaways.join(" ")} ${e.source ?? ""}`.toLowerCase();
        return hay.includes(query.toLowerCase());
      })
      .sort((a, b) => b.readAt.localeCompare(a.readAt));
  }, [payload, selectedWeek, agentId, topic, query]);

  const historyWeeks = useMemo(() => {
    if (!payload) return [] as string[];
    const set = new Set<string>();
    for (const e of payload.index.entries) {
      if (agentId === FLEET || e.agentId === agentId) set.add(e.weekOf);
    }
    for (const d of payload.digests) {
      if (agentId === FLEET || d.agentId === agentId) set.add(d.weekOf);
    }
    if (payload.currentWeekOf) set.add(payload.currentWeekOf);
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [payload, agentId]);

  const weekCounts = useMemo(() => {
    const map = new Map<string, number>();
    if (!payload || !selectedWeek) return map;
    for (const e of payload.index.entries) {
      if (e.weekOf !== selectedWeek) continue;
      map.set(e.agentId, (map.get(e.agentId) ?? 0) + 1);
    }
    return map;
  }, [payload, selectedWeek]);

  const digest = useMemo(() => {
    if (!payload || agentId === FLEET || !selectedWeek) return null;
    return (
      payload.digests.find((d) => d.agentId === agentId && d.weekOf === selectedWeek)
        ?.markdown ?? null
    );
  }, [payload, agentId, selectedWeek]);

  const selectedAgent = people.find((a) => a.id === agentId);
  const isCurrent = selectedWeek === payload?.currentWeekOf;

  if (error) {
    return (
      <div className="panel rounded-2xl p-8 text-[var(--alert)]">{error}</div>
    );
  }

  if (!payload || !selectedWeek) {
    return (
      <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
        Loading learning log…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rise flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Continuous study
          </p>
          <h1 className="display text-3xl font-extrabold md:text-4xl">Learning</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
            What every employee read — this week and the archive. Open any
            source, skim takeaways, or read the week digest. Saved in git under{" "}
            <code className="text-[var(--paper)]">data/learning/</code>.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-2">
          <LogReadForm
            defaultAgentId={agentId === FLEET ? "pacman" : agentId}
            agents={people.map((a) => ({ id: a.id, name: a.name }))}
            onCreated={(entry) => {
              setPayload((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  index: {
                    ...prev.index,
                    entries: [entry, ...prev.index.entries],
                  },
                  stats: {
                    ...prev.stats,
                    thisWeek:
                      entry.weekOf === prev.currentWeekOf
                        ? prev.stats.thisWeek + 1
                        : prev.stats.thisWeek,
                    total: prev.stats.total + 1,
                    byAgent: {
                      ...prev.stats.byAgent,
                      [entry.agentId]:
                        (prev.stats.byAgent[entry.agentId] ?? 0) +
                        (entry.weekOf === prev.currentWeekOf ? 1 : 0),
                    },
                  },
                };
              });
              setWeekOf(entry.weekOf);
              setAgentId(entry.agentId);
              pushParams({ agent: entry.agentId, week: entry.weekOf });
            }}
          />
          <Link
            href="/intel"
            className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm font-bold"
          >
            Intel board
          </Link>
          <a
            href={LEARNING_GITHUB_TREE}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm font-bold"
          >
            Open archive in GitHub
          </a>
        </div>
      </header>

      <section className="rise grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => {
            setAgentId(FLEET);
            pushParams({ agent: FLEET });
          }}
          className={`panel rounded-2xl p-4 text-left transition ${
            agentId === FLEET ? "ring-2 ring-[var(--brand)]" : "hover:-translate-y-0.5"
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Fleet
          </div>
          <div className="display mt-1 text-2xl font-extrabold">Everyone</div>
          <div className="mt-2 text-xs text-[var(--ink-dim)]">
            <span className="display text-2xl font-extrabold text-[var(--brand)]">
              {weekEntries.length}
            </span>{" "}
            shown · {payload.stats.thisWeek} this week · {payload.stats.total} total
          </div>
        </button>
        {people.map((agent) => {
          const count = weekCounts.get(agent.id) ?? 0;
          const active = agent.id === agentId;
          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => {
                setAgentId(agent.id);
                pushParams({ agent: agent.id });
              }}
              className={`panel rounded-2xl p-4 text-left transition ${
                active ? "ring-2 ring-[var(--brand)]" : "hover:-translate-y-0.5"
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
                  <div className="text-[11px] text-[var(--muted)]">{agent.title}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-[var(--ink-dim)]">
                <span className="display text-2xl font-extrabold text-[var(--brand)]">
                  {count}
                </span>{" "}
                {isCurrent ? "reads this week" : `reads · ${formatWeek(selectedWeek)}`}
              </div>
            </button>
          );
        })}
      </section>

      <section className="rise flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            pushParams({ q: e.target.value });
          }}
          placeholder="Search titles, takeaways, why it matters…"
          className="field max-w-md"
        />
        <button
          type="button"
          onClick={() => {
            setTopic("all");
            pushParams({ topic: "all" });
          }}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
            topic === "all"
              ? "bg-[var(--brand)] text-[#14160f]"
              : "bg-white/5 text-[var(--ink-dim)]"
          }`}
        >
          All topics
        </button>
        {payload.topics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTopic(t);
              pushParams({ topic: t });
            }}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              topic === t
                ? "bg-[var(--brand)] text-[#14160f]"
                : "bg-white/5 text-[var(--ink-dim)]"
            }`}
          >
            {t}
          </button>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="panel rise h-fit rounded-2xl p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            History · {selectedAgent?.name ?? "Fleet"}
          </div>
          <ul className="mt-3 space-y-1">
            {historyWeeks.map((w) => (
              <li key={w}>
                <button
                  type="button"
                  onClick={() => {
                    setWeekOf(w);
                    pushParams({ week: w });
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold ${
                    w === selectedWeek
                      ? "bg-[var(--brand)] text-[#14160f]"
                      : "hover:bg-white/5"
                  }`}
                >
                  {formatWeek(w)}
                  {w === payload.currentWeekOf ? " · now" : ""}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-[var(--muted)]">
            Monday weeks, America/Bogota. New employees appear here as soon as
            they are rostered.
          </p>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="display text-2xl font-extrabold">
                {agentId === FLEET ? "Everyone" : (selectedAgent?.name ?? agentId)}
              </h2>
              <p className="text-sm text-[var(--ink-dim)]">
                Week of {formatWeek(selectedWeek)} · {weekEntries.length} item
                {weekEntries.length === 1 ? "" : "s"}
                {topic !== "all" ? ` · ${topic}` : ""}
              </p>
            </div>
            {selectedAgent && agentId !== FLEET && (
              <Link
                href={`/agents/${selectedAgent.id}`}
                className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm font-bold"
              >
                Open progress page
              </Link>
            )}
          </div>

          {weekEntries.length === 0 ? (
            <div className="panel rounded-2xl p-8 text-sm text-[var(--muted)]">
              Nothing matches this filter. Clear search/topic, or pick another
              week. Pacman logs SEO + developer study every Monday.
            </div>
          ) : (
            <div className="space-y-3">
              {weekEntries.map((entry, i) => {
                const person = people.find((a) => a.id === entry.agentId);
                const open = openId === entry.id || openId === "*";
                return (
                  <article
                    key={entry.id}
                    className="panel rise rounded-2xl p-5"
                    style={{ animationDelay: `${Math.min(i, 8) * 0.03}s` }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`pill ${TOPIC_TONE[entry.topic] ?? TOPIC_TONE.ops}`}>
                        {entry.topic}
                      </span>
                      {agentId === FLEET && (
                        <Link
                          href={`/learning?agent=${entry.agentId}&week=${entry.weekOf}`}
                          className="text-xs font-bold text-[var(--brand)]"
                        >
                          {person?.name ?? entry.agentId}
                        </Link>
                      )}
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
                    <p className="mt-2 text-sm text-[var(--ink)]">
                      <span className="font-semibold text-[var(--brand)]">Why it matters. </span>
                      {entry.whyItMatters}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {entry.takeaways.map((t) => (
                        <li key={t} className="flex gap-2 text-sm text-[var(--ink)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>

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
                      {entry.repoPath && (
                        <button
                          type="button"
                          onClick={() => {
                            void navigator.clipboard?.writeText(entry.repoPath ?? "");
                            setCopied(entry.id);
                            window.setTimeout(() => setCopied(null), 1600);
                          }}
                          className="rounded-xl border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-dim)]"
                          title="Copy repo path"
                        >
                          {copied === entry.id ? "Copied path" : `Repo: ${entry.repoPath}`}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setOpenId(open && openId !== "*" ? null : entry.id)}
                        className="rounded-xl border border-[var(--line)] px-3 py-1.5 text-sm font-bold"
                      >
                        {open ? "Compact" : "More"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {agentId !== FLEET && (
            <section className="panel rise rounded-2xl p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="display text-xl font-extrabold">Week digest</h3>
                <span className="text-xs text-[var(--muted)]">
                  data/learning/digests/{agentId}/{selectedWeek}.md
                </span>
              </div>
              {digest ? (
                <div className="mt-4 max-h-[560px] overflow-auto rounded-xl bg-black/25 p-4">
                  <MarkdownLite content={digest} />
                </div>
              ) : (
                <p className="mt-3 text-sm text-[var(--muted)]">
                  No markdown digest for this week yet. Agents append one when
                  they log study.
                </p>
              )}
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
