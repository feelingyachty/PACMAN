import { NextResponse } from "next/server";
import {
  approveTask,
  rejectTask,
  submitForVerification,
  updateTaskStatus,
  verifyTask,
} from "@/lib/store";
import type { TaskStatus } from "@/lib/types";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await request.json();
  const action = body?.action as string | undefined;

  if (action === "approve") {
    const task = await approveTask(id);
    if (!task)
      return NextResponse.json(
        { error: "Task not awaiting approval" },
        { status: 400 },
      );
    return NextResponse.json(task);
  }

  if (action === "reject") {
    const task = await rejectTask(id, body.reason ?? "Rejected by owner");
    if (!task)
      return NextResponse.json(
        { error: "Task not awaiting approval" },
        { status: 400 },
      );
    return NextResponse.json(task);
  }

  if (action === "submit_verification") {
    const task = await submitForVerification(
      id,
      body.implementationNotes ?? "",
    );
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task);
  }

  if (action === "verify") {
    const task = await verifyTask(
      id,
      Boolean(body.ok),
      body.verificationNotes ?? "",
    );
    if (!task)
      return NextResponse.json(
        { error: "Task not awaiting verification" },
        { status: 400 },
      );
    return NextResponse.json(task);
  }

  if (action === "status" && body.status) {
    const task = await updateTaskStatus(id, body.status as TaskStatus, {
      implementationNotes: body.implementationNotes,
      verificationNotes: body.verificationNotes,
    });
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
