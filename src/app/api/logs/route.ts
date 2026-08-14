import { NextResponse } from "next/server";
import { addWorkLog, getStore } from "@/lib/store";
import type { WorkKind } from "@/lib/types";

export async function GET() {
  return NextResponse.json((await getStore()).logs);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.agentId || !body?.title) {
    return NextResponse.json(
      { error: "agentId and title are required" },
      { status: 400 },
    );
  }

  const log = await addWorkLog({
    agentId: body.agentId,
    taskId: body.taskId,
    kind: (body.kind as WorkKind) ?? "note",
    title: body.title,
    body: body.body ?? "",
  });

  return NextResponse.json(log, { status: 201 });
}
