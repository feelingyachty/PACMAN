"use client";

import { useMemo, useState } from "react";
import { useCommand } from "@/components/useCommand";
import type { IntelItem } from "@/lib/types";

const CATS: Array<IntelItem["category"] | "all"> = [
  "all",
  "seo",
  "dev",
  "wordpress",
  "booking",
];

export default function IntelPage() {
  const cmd = useCommand();
  const [cat, setCat] = useState<(typeof CATS)[number]>("all");
  const items = useMemo(() => {
    const list = cmd.store?.intel ?? [];
    return cat === "all" ? list : list.filter((item) => item.category === cat);
  }, [cmd.store?.intel, cat]);

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Stay current
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">Intel</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
          SEO and developer signals Pacman watches so the fleet does not work
          off last year&apos;s assumptions.
        </p>
      </header>

      <div className="rise flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              cat === c
                ? "bg-[var(--brand)] text-[#14160f]"
                : "bg-white/5 text-[var(--ink-dim)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="panel rise rounded-2xl p-10 text-center">
          <p className="display text-xl font-bold">No signals in this lane</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Pacman will drop new SEO and developer notes here as they land.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, i) => (
            <article
              key={item.id}
              className="panel rise rounded-2xl p-5"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="pill bg-[var(--sea-dim)] text-[var(--sea)]">
                  {item.category}
                </span>
                <time className="text-xs text-[var(--muted)]">
                  {new Date(item.publishedAt).toLocaleString()}
                </time>
              </div>
              <h2 className="display mt-3 text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dim)]">
                {item.summary}
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--muted)]">
                Why it matters: {item.relevance}
              </p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs font-bold text-[var(--brand)] underline"
                >
                  Source
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
