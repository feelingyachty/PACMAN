"use client";

import { useEffect, useState } from "react";
import type { IntelItem } from "@/lib/types";

export default function IntelPage() {
  const [items, setItems] = useState<IntelItem[]>([]);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/store");
      const store = await res.json();
      setItems(store.intel);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Always current
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">
          Intel feed
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
          Latest SEO and developer signals Pacman watches so the fleet stays
          sharp. Expand with live sources next.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item, i) => (
          <article
            key={item.id}
            className="panel rise rounded-2xl p-5"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="pill bg-[var(--sea-soft)] text-[var(--sea)]">
                {item.category}
              </span>
              <time className="text-xs text-[var(--muted)]">
                {new Date(item.publishedAt).toLocaleString()}
              </time>
            </div>
            <h2 className="display mt-3 text-lg font-bold">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              {item.summary}
            </p>
            <p className="mt-3 text-xs font-semibold text-[var(--muted)]">
              Why it matters: {item.relevance}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
