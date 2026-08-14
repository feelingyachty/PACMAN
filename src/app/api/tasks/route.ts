import { NextResponse } from "next/server";
import { createTask, listTasks } from "@/lib/store";
import type { TaskStatus } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await listTasks());
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
    status: (body.status as TaskStatus) ?? "assigned",
    priority: body.priority ?? "medium",
    tags: body.tags ?? [],
    proposal: body.proposal,
  });

  return NextResponse.json(task, { status: 201 });
}
