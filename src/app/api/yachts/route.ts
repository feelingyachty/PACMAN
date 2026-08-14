import { NextResponse } from "next/server";
import { yachtSource, yachtStats, yachts } from "@/lib/yachts";

export async function GET() {
  return NextResponse.json({
    source: yachtSource,
    stats: yachtStats(),
    yachts,
  });
}
