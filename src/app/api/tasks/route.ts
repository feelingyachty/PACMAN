import { NextResponse } from "next/server";
import { createTask } from "@/lib/store";
import { getStore } from "@/lib/store";
import type { Priority, TaskStatus } from "@/lib/types";

export async function GET() {
  return NextResponse.json((await getStore()).tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.title || !body?.agentId) {
    return NextResponse.json(
      { error: "title and agentId are required" },
      { status: 400 },
    );
  }

  const task = await createTask({
    title: body.title,
    description: body.description ?? "",
    agentId: body.agentId,
    assignedBy: body.assignedBy ?? "owner",
    status: (body.status as TaskStatus) ?? "assigned",
    priority: (body.priority as Priority) ?? "medium",
    tags: Array.isArray(body.tags)
      ? body.tags
      : String(body.tags || "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
    proposal: body.proposal,
  });

  return NextResponse.json(task, { status: 201 });
}
