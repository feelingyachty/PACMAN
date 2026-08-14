import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import {
  addLearningEntry,
  getLearningPayload,
  readDigestMarkdown,
  type LearningTopic,
} from "@/lib/learning";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId") ?? undefined;
  const weekOf = searchParams.get("weekOf") ?? undefined;
  const wantDigest = searchParams.get("digest") === "1";
  const includeMarkdown = searchParams.get("meta") !== "1";

  if (wantDigest && agentId && weekOf) {
    const md = await readDigestMarkdown(agentId, weekOf);
    if (!md) {
      return NextResponse.json({ error: "Digest not found" }, { status: 404 });
    }
    return NextResponse.json({ agentId, weekOf, markdown: md });
  }

  const payload = await getLearningPayload({
    agentId,
    weekOf,
    includeMarkdown,
  });
  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    agentId?: string;
    title?: string;
    topic?: LearningTopic;
    summary?: string;
    takeaways?: string[];
    whyItMatters?: string;
    url?: string;
    source?: string;
    repoPath?: string;
    weekOf?: string;
  };

  try {
    const entry = await addLearningEntry({
      agentId: String(body.agentId || ""),
      title: String(body.title || ""),
      topic: body.topic as LearningTopic,
      summary: String(body.summary || ""),
      takeaways: Array.isArray(body.takeaways) ? body.takeaways.map(String) : [],
      whyItMatters: String(body.whyItMatters || ""),
      url: body.url,
      source: body.source,
      repoPath: body.repoPath,
      weekOf: body.weekOf,
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not log learning" },
      { status: 400 },
    );
  }
}
