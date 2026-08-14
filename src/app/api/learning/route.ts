import { NextResponse } from "next/server";
import {
  getLearningPayload,
  readDigestMarkdown,
} from "@/lib/learning";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId");
  const weekOf = searchParams.get("weekOf");
  const wantDigest = searchParams.get("digest") === "1";

  if (wantDigest && agentId && weekOf) {
    const md = await readDigestMarkdown(agentId, weekOf);
    if (!md) {
      return NextResponse.json({ error: "Digest not found" }, { status: 404 });
    }
    return NextResponse.json({ agentId, weekOf, markdown: md });
  }

  const payload = await getLearningPayload();
  return NextResponse.json(payload);
}
