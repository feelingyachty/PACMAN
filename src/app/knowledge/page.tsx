"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCommand } from "@/components/useCommand";
import { MarkdownLite } from "@/components/MarkdownLite";
import type { KnowledgeDoc } from "@/lib/types";

const DOMAINS = ["all", "seo", "v8r", "wordpress", "elementor", "ghl", "ops"] as const;

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
          Koray / Tongberg semantic SEO, V8r booking, WordPress, Elementor, GHL —
          the packs Pacman uses to verify work. Weekly study lives on Learning.
        </p>
        <Link
          href="/learning"
          className="mt-3 inline-block text-sm font-bold text-[var(--brand)] underline"
        >
          Open Learning →
        </Link>
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
            <div className="mt-6">
              <MarkdownLite content={active.content} />
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
