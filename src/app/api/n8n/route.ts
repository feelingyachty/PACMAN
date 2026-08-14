import { NextResponse } from "next/server";
import { N8N_MCP_URL } from "@/lib/types";
import { getStore } from "@/lib/store";
import { N8N_MCP_TOOLS, probeN8nMcp } from "@/lib/n8nMcp";

export async function GET() {
  const store = await getStore();
  const mcp = await probeN8nMcp();

  return NextResponse.json({
    mcp: {
      url: N8N_MCP_URL,
      reachable: mcp.reachable,
      authorized: mcp.authorized,
      detail: mcp.detail,
      serverName: mcp.serverName ?? "n8n MCP Server",
      tools: mcp.authorized ? N8N_MCP_TOOLS : [],
      toolCount: mcp.toolCount,
    },
    automations: store.automations,
    agents: store.agents.filter((a) => a.source === "n8n"),
  });
}
