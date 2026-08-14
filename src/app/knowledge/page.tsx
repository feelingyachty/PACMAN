"use client";

import { useMemo, useState } from "react";
import { useCommand } from "@/components/useCommand";
import type { KnowledgeDoc } from "@/lib/types";

const DOMAINS = ["all", "seo", "v8r", "wordpress", "elementor", "ops", "n8n"] as const;

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
        <h2 key={i} className="display text-xl font-bold text-[var(--brand)]">
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
    if (/^\d+\.\s/.test(line))
      return (
        <li key={i} className="ml-4 list-decimal">
          {line.replace(/^\d+\.\s/, "")}
        </li>
      );
    if (!line.trim()) return <div key={i} className="h-2" />;
    return (
      <p key={i} className="text-sm leading-relaxed text-[var(--ink-dim)]">
        {line}
      </p>
    );
  });
}

export default function KnowledgePage() {
  const cmd = useCommand();
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const docs = cmd.store?.knowledge ?? [];
    return docs.filter((d) => {
      if (domain !== "all" && d.domain !== domain) return false;
      if (!q.trim()) return true;
      const hay = `${d.title} ${d.summary} ${d.content}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [cmd.store?.knowledge, domain, q]);

  const active: KnowledgeDoc | undefined =
    filtered.find((d) => d.id === activeId) ?? filtered[0];

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Pacman database
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">Knowledge</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
          Turberg semantic SEO, V8r booking, WordPress, Elementor — the packs
          Pacman uses to verify work.
        </p>
      </header>

      <div className="rise flex flex-wrap items-center gap-2">
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
                ? "bg-[var(--brand)] text-[#14160f]"
                : "bg-white/5 text-[var(--ink-dim)]"
            }`}
          >
            {d}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the database"
          className="field ml-auto max-w-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="panel rise rounded-2xl p-10 text-center">
          <p className="display text-xl font-bold">No packs match</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Try another domain or clear the search.
          </p>
        </div>
      ) : (
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="panel rise space-y-2 rounded-2xl p-3">
          {filtered.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActiveId(doc.id)}
              className={`w-full rounded-xl px-3 py-3 text-left ${
                active?.id === doc.id ? "bg-[var(--brand)] text-[#14160f]" : "hover:bg-white/5"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                {doc.domain}
              </div>
              <div className="display text-sm font-bold">{doc.title}</div>
            </button>
          ))}
        </aside>

        {active && (
          <article className="panel rise prose-kb rounded-2xl p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              {active.domain} · {active.source}
            </p>
            <h2 className="display mt-1 text-2xl font-extrabold md:text-3xl">
              {active.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-dim)]">{active.summary}</p>
            <div className="mt-6 space-y-1">{renderMarkdownLite(active.content)}</div>
          </article>
        )}
      </div>
      )}
    </div>
  );
}
