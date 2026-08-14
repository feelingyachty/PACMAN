"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Board" },
  { href: "/approvals", label: "Approvals" },
  { href: "/agents", label: "Agents" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/intel", label: "Intel" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(243,240,230,0.82)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[var(--brand)] shadow-[0_8px_20px_rgba(245,197,24,0.45)] transition-transform group-hover:scale-105">
              <span className="display text-lg font-extrabold text-[var(--ink)]">
                P
              </span>
              <span className="absolute -right-0.5 top-1 h-2.5 w-2.5 rounded-full bg-[var(--ink)]" />
            </span>
            <div>
              <div className="display text-xl font-extrabold leading-none tracking-tight">
                PACMAN
              </div>
              <div className="text-xs font-medium text-[var(--muted)]">
                MDI Agent Command Center
              </div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[var(--ink)] text-[var(--brand)]"
                      : "text-[var(--ink-soft)] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
