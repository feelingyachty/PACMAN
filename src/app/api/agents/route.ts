import { NextResponse } from "next/server";
import { addAgent, listAgents } from "@/lib/store";
import type { AgentRole, AgentStatus } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await listAgents());
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.name || !body?.role || !body?.title) {
    return NextResponse.json(
      { error: "name, role, and title are required" },
      { status: 400 },
    );
  }

  const agent = await addAgent({
    name: body.name,
    codename: body.codename,
    role: body.role as AgentRole,
    title: body.title,
    specialty: body.specialty ?? "",
    status: (body.status as AgentStatus) ?? "idle",
    avatarColor: body.avatarColor ?? "#5B8C5A",
    requiresApproval: body.requiresApproval ?? true,
    knowledgeDomains: body.knowledgeDomains ?? [],
    notes: body.notes,
  });

  return NextResponse.json(agent, { status: 201 });
}
