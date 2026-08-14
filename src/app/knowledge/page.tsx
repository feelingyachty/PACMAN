"use client";

import { useEffect, useMemo, useState } from "react";
import type { KnowledgeDoc } from "@/lib/types";

const DOMAINS = [
  "all",
  "seo",
  "v8r",
  "wordpress",
  "elementor",
  "ops",
  "news",
] as const;

function renderMarkdownLite(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("# "))
      return (
        <h1 key={i} className="display text-2xl font-extrabold">
          {line.slice(2)}
        </h1>
      );
    if (line.startsWith("## "))
      return (
        <h2 key={i} className="display text-xl font-bold">
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("- [ ] "))
      return (
        <li key={i} className="ml-4 list-disc">
          {line.slice(6)}
        </li>
      );
    if (line.startsWith("- "))
      return (
        <li key={i} className="ml-4 list-disc">
          {line.slice(2)}
        </li>
      );
    if (line.startsWith("1. ") || /^\d+\.\s/.test(line))
      return (
        <li key={i} className="ml-4 list-decimal">
          {line.replace(/^\d+\.\s/, "")}
        </li>
      );
    if (!line.trim()) return <div key={i} className="h-2" />;
    return (
      <p key={i} className="text-sm leading-relaxed text-[var(--ink-soft)]">
        {line}
      </p>
    );
  });
}

export default function KnowledgePage() {
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]>("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/store");
      const store = await res.json();
      setDocs(store.knowledge);
      setActiveId(store.knowledge[0]?.id ?? null);
    })();
  }, []);

  const filtered = useMemo(
    () =>
      domain === "all" ? docs : docs.filter((d) => d.domain === domain),
    [docs, domain],
  );

  const active = filtered.find((d) => d.id === activeId) ?? filtered[0];

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Pacman database
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">
          Knowledge
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
          Semantic SEO (Turberg), V8r booking, WordPress, and Elementor —
          loaded for Pacman oversight and verification.
        </p>
      </header>

      <div className="rise flex flex-wrap gap-2">
        {DOMAINS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setDomain(d);
              setActiveId(null);
            }}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              domain === d
                ? "bg-[var(--ink)] text-[var(--brand)]"
                : "bg-black/5 text-[var(--ink-soft)]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="panel rise space-y-2 rounded-2xl p-3">
          {filtered.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActiveId(doc.id)}
              className={`w-full rounded-xl px-3 py-3 text-left transition ${
                active?.id === doc.id
                  ? "bg-[var(--brand)]"
                  : "hover:bg-black/5"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                {doc.domain}
              </div>
              <div className="display text-sm font-bold">{doc.title}</div>
            </button>
          ))}
        </aside>

        {active && (
          <article className="panel rise prose-kb rounded-2xl p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              {active.domain} · updated{" "}
              {new Date(active.updatedAt).toLocaleDateString()}
            </p>
            <h2 className="display mt-1 text-2xl font-extrabold md:text-3xl">
              {active.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              {active.summary}
            </p>
            <div className="mt-6 space-y-1">
              {renderMarkdownLite(active.content)}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
