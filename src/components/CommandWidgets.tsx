"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Agent, IntelItem, Task } from "@/lib/types";

export function CommandWidgets({
  agents,
  tasks,
  intel,
  onOpenTask,
}: {
  agents: Agent[];
  tasks: Task[];
  intel: IntelItem[];
  onOpenTask: (task: Task) => void;
}) {
  const pending = tasks.filter((t) => t.status === "needs_approval");
  const review = tasks.filter((t) => t.status === "verifying");
  const [n8n, setN8n] = useState<{
    authorized: boolean;
    reachable: boolean;
    toolCount: number;
    detail: string;
  } | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/n8n", { cache: "no-store" });
        const data = await res.json();
        setN8n({
          authorized: Boolean(data.mcp?.authorized),
          reachable: Boolean(data.mcp?.reachable),
          toolCount: Number(data.mcp?.toolCount ?? 0),
          detail: String(data.mcp?.detail ?? ""),
        });
      } catch {
        setN8n({
          authorized: false,
          reachable: false,
          toolCount: 0,
          detail: "Could not probe n8n",
        });
      }
    })();
  }, []);

  return (
    <section className="grid gap-3 lg:grid-cols-4">
      <Widget title="Approval queue" href="/approvals">
        {pending.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Nothing waiting on you.</p>
        ) : (
          <ul className="space-y-2">
            {pending.slice(0, 3).map((task) => (
              <li key={task.id}>
                <button
                  type="button"
                  onClick={() => onOpenTask(task)}
                  className="w-full text-left text-sm font-semibold hover:text-[var(--brand)]"
                >
                  {task.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Widget>

      <Widget title="Pacman review" href="/?lane=verifying">
        {review.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No live checks queued.</p>
        ) : (
          <ul className="space-y-2">
            {review.slice(0, 3).map((task) => (
              <li key={task.id}>
                <button
                  type="button"
                  onClick={() => onOpenTask(task)}
                  className="w-full text-left text-sm font-semibold hover:text-[var(--brand)]"
                >
                  {task.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Widget>

      <Widget title="Intel" href="/intel">
        {intel.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No signals yet.</p>
        ) : (
          <ul className="space-y-2">
            {intel.slice(0, 2).map((item) => (
              <li key={item.id} className="text-sm text-[var(--ink-dim)]">
                <span className="font-semibold text-[var(--ink)]">{item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </Widget>

      <Widget title="Connections" href="/n8n">
        <p className="text-sm font-semibold">
          {n8n
            ? n8n.authorized
              ? `n8n-mcp · ${n8n.toolCount} tools`
              : n8n.reachable
                ? "n8n reachable · auth required"
                : "n8n unreachable"
            : "Probing n8n…"}
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {agents.map((a) => a.name).join(" · ")} on the roster
        </p>
        {n8n?.detail && (
          <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-dim)]">
            {n8n.detail}
          </p>
        )}
      </Widget>
    </section>
  );
}

function Widget({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel rise rounded-2xl p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
          {title}
        </h2>
        <Link href={href} className="text-[11px] font-bold text-[var(--brand)]">
          Open
        </Link>
      </div>
      {children}
    </div>
  );
}
