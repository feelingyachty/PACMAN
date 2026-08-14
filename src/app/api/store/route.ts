import { NextResponse } from "next/server";
import { getStore, resetStore } from "@/lib/store";

export async function GET() {
  const store = await getStore();
  return NextResponse.json(store);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body?.action === "reset") {
    const store = await resetStore();
    return NextResponse.json(store);
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
