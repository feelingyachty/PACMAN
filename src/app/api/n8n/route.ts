import { NextResponse } from "next/server";
import { N8N_MCP_URL } from "@/lib/types";
import { getStore } from "@/lib/store";

export async function GET() {
  const store = await getStore();
  const token = process.env.N8N_MCP_TOKEN;

  let mcp = {
    url: N8N_MCP_URL,
    reachable: false,
    authorized: false,
    detail: "not probed",
  };

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(N8N_MCP_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {},
          clientInfo: { name: "pacman", version: "0.1.0" },
        },
      }),
    });
    const text = await res.text();
    mcp = {
      url: N8N_MCP_URL,
      reachable: true,
      authorized: res.ok,
      detail: res.ok ? "initialize ok" : text.slice(0, 180),
    };
  } catch (e) {
    mcp.detail = e instanceof Error ? e.message : "probe failed";
  }

  return NextResponse.json({
    mcp,
    automations: store.automations,
    agents: store.agents.filter((a) => a.source === "n8n"),
  });
}
