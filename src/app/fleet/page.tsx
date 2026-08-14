"use client";

import { useMemo, useState } from "react";
import type { Yacht } from "@/lib/yachts";
import { yachtSource, yachtStats, yachts } from "@/lib/yachts";

const TYPES = ["all", ...Array.from(new Set(yachts.map((y) => y.type))).sort()];

export default function FleetPage() {
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Yacht | null>(null);
  const stats = yachtStats();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return yachts
      .filter((yacht) => (type === "all" ? true : yacht.type === type))
      .filter((yacht) => {
        if (!q) return true;
        return `${yacht.name} ${yacht.brand} ${yacht.model} ${yacht.owner} ${yacht.location} ${yacht.id}`
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => (b.pricePerHour ?? 0) - (a.pricePerHour ?? 0));
  }, [type, query]);

  return (
    <div className="space-y-6">
      <header className="rise">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          Source of truth · {yachtSource.tab}
        </p>
        <h1 className="display text-3xl font-extrabold md:text-4xl">Fleet</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-dim)]">
          Pacman reads only the Feeling Yachty Main tab. Other tabs in the
          BookMyBoat sheet are ignored. Listing, V8r, and booking facts get
          checked against this inventory.
        </p>
        <a
          href={yachtSource.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs font-bold text-[var(--brand)] underline"
        >
          Open Feeling Yachty Main
        </a>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          ["Yachts", stats.count],
          ["Types", Object.keys(stats.types).length],
          ["Captained", stats.captains],
          ["Avg $/hr", `$${stats.avgPrice}`],
        ].map(([label, value]) => (
          <div key={String(label)} className="panel rise rounded-2xl p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
              {label}
            </div>
            <div className="display mt-1 text-2xl font-extrabold">{value}</div>
          </div>
        ))}
      </section>

      <div className="rise flex flex-wrap items-center gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              type === t
                ? "bg-[var(--brand)] text-[#14160f]"
                : "bg-white/5 text-[var(--ink-dim)]"
            }`}
          >
            {t}
            {t !== "all" ? ` (${stats.types[t] ?? 0})` : ""}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, owner, location, ID"
          className="field ml-auto max-w-xs"
        />
      </div>

      {rows.length === 0 ? (
        <div className="panel rise rounded-2xl p-10 text-center">
          <p className="display text-xl font-bold">No yachts match</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Clear search or pick another type.
          </p>
        </div>
      ) : (
        <div className="panel rise overflow-hidden rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/30 text-[11px] uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Yacht</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">$/hr</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Captain</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((yacht) => (
                <tr
                  key={yacht.id}
                  className="cursor-pointer border-t border-[var(--line)] hover:bg-white/5"
                  onClick={() => setSelected(yacht)}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold">{yacht.name}</div>
                    <div className="text-xs text-[var(--muted)]">
                      #{yacht.id} · {yacht.brand} {yacht.model} · {yacht.year}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--ink-dim)]">{yacht.type}</td>
                  <td className="px-4 py-3 text-[var(--ink-dim)]">
                    {yacht.lengthFt}ft · {yacht.capacity} pax
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {yacht.priceRaw ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--ink-dim)]">{yacht.owner}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`pill ${
                        yacht.captainIncluded
                          ? "bg-[var(--sea-dim)] text-[var(--sea)]"
                          : "bg-white/5 text-[var(--muted)]"
                      }`}
                    >
                      {yacht.captainIncluded ? "yes" : "no"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <article
            className="panel rise max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  #{selected.id} · {selected.type} · {selected.status}
                </p>
                <h2 className="display text-2xl font-extrabold">{selected.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full bg-white/5 px-3 py-1 text-sm font-semibold"
              >
                Close
              </button>
            </div>
            {selected.heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selected.heroImage}
                alt={selected.name}
                className="mb-4 h-48 w-full rounded-2xl object-cover"
              />
            )}
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Fact label="Brand" value={selected.brand} />
              <Fact label="Model" value={selected.model} />
              <Fact label="Year" value={selected.year} />
              <Fact label="Length" value={selected.lengthFt ? `${selected.lengthFt} ft` : null} />
              <Fact label="Capacity" value={selected.capacity ? `${selected.capacity} guests` : null} />
              <Fact label="Price / hour" value={selected.priceRaw} />
              <Fact label="Owner" value={selected.owner} />
              <Fact label="Captain" value={selected.captainIncluded ? "Included" : "Not included"} />
              <Fact label="Photos" value={selected.photoCount} />
              <Fact label="Rating" value={selected.rating} />
            </dl>
            <p className="mt-4 text-sm text-[var(--ink-dim)]">{selected.location}</p>
            {selected.description && (
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-dim)]">
                {selected.description}
              </p>
            )}
          </article>
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="rounded-xl bg-black/20 px-3 py-2">
      <dt className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </dt>
      <dd className="font-semibold">{value ?? "—"}</dd>
    </div>
  );
}
