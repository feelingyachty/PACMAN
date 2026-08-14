"use client";

import Link from "next/link";
import { useCommand } from "@/components/useCommand";

export default function IntelPage() {
  const cmd = useCommand();
  const items = cmd.store?.intel ?? [];

  return (
    <div className="space-y-6">
      <header className="rise flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            Stay current
          </p>
          <h1 className="display text-3xl font-extrabold md:text-4xl">Intel</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
            SEO and developer signals Pacman watches so the fleet does not work
            off last year&apos;s assumptions. Deep study belongs on Learning.
          </p>
        </div>
        <Link
          href="/learning"
          className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[#14160f]"
        >
          Open Learning
        </Link>
      </header>

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
            <div className="mt-4 flex flex-wrap gap-2">
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[var(--brand)] px-3 py-1.5 text-sm font-bold text-[#14160f]"
                >
                  Open source
                </a>
              )}
              <Link
                href={`/learning?q=${encodeURIComponent(item.title)}`}
                className="rounded-xl border border-[var(--line)] px-3 py-1.5 text-sm font-bold"
              >
                Find in Learning
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
