import type { ReactNode } from "react";

export function MarkdownLite({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;

  function flushList() {
    if (!list) return;
    const Tag = list.kind === "ol" ? "ol" : "ul";
    blocks.push(
      <Tag
        key={`list-${blocks.length}`}
        className={`${list.kind === "ol" ? "list-decimal" : "list-disc"} my-2 space-y-1 pl-5 text-sm text-[var(--ink)]`}
      >
        {list.items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {inline(item)}
          </li>
        ))}
      </Tag>,
    );
    list = null;
  }

  for (const line of lines) {
    const ol = line.match(/^\s{0,3}\d+\.\s+(.*)$/);
    const ul = line.match(/^\s{0,3}[-*]\s+(.*)$/);
    if (ol) {
      if (!list || list.kind !== "ol") {
        flushList();
        list = { kind: "ol", items: [] };
      }
      list.items.push(ol[1]);
      continue;
    }
    if (ul) {
      if (!list || list.kind !== "ul") {
        flushList();
        list = { kind: "ul", items: [] };
      }
      list.items.push(ul[1]);
      continue;
    }
    flushList();
    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={blocks.length} className="display mt-4 text-2xl font-extrabold first:mt-0">
          {inline(line.slice(2))}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={blocks.length} className="display mt-5 text-xl font-bold text-[var(--brand)]">
          {inline(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={blocks.length} className="mt-4 text-base font-bold">
          {inline(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={blocks.length}
          className="my-2 border-l-2 border-[var(--brand)] pl-3 text-sm italic text-[var(--ink-dim)]"
        >
          {inline(line.slice(2))}
        </blockquote>,
      );
    } else if (line.startsWith("|") && line.includes("|")) {
      blocks.push(
        <p key={blocks.length} className="overflow-x-auto font-mono text-[12px] text-[var(--ink-dim)]">
          {line}
        </p>,
      );
    } else if (!line.trim()) {
      blocks.push(<div key={blocks.length} className="h-2" />);
    } else {
      blocks.push(
        <p key={blocks.length} className="text-sm leading-relaxed text-[var(--ink-dim)]">
          {inline(line)}
        </p>,
      );
    }
  }
  flushList();
  return <div className="prose-kb space-y-1">{blocks}</div>;
}

function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={i++} className="font-semibold text-[var(--brand)]">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code key={i++} className="rounded bg-black/40 px-1 py-0.5 text-[12px] text-[var(--paper)]">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const href = m[2];
        const external = href.startsWith("http");
        parts.push(
          <a
            key={i++}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="font-semibold text-[var(--brand)] underline underline-offset-2"
          >
            {m[1]}
          </a>,
        );
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
