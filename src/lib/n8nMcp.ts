import { N8N_MCP_URL } from "./types";

export const N8N_MCP_TOOLS = [
  "search_workflows",
  "get_workflow_details",
  "execute_workflow",
  "get_workflow_execution",
  "search_workflow_executions",
  "get_workflow_history",
  "get_workflow_version",
  "publish_workflow",
  "unpublish_workflow",
  "test_workflow",
  "prepare_workflow_pin_data",
  "list_credentials",
  "list_n8n_connect_services",
  "list_workflow_tags",
  "search_data_tables",
  "create_data_table",
  "rename_data_table",
  "add_data_table_column",
  "delete_data_table_column",
  "rename_data_table_column",
  "add_data_table_rows",
  "search_nodes",
  "get_node_types",
  "get_workflow_best_practices",
  "explore_node_resources",
  "validate_workflow",
  "validate_node_config",
  "create_workflow_from_code",
  "search_projects",
  "search_folders",
  "archive_workflow",
  "update_workflow",
  "restore_workflow_version",
  "get_workflow_sdk_reference",
] as const;

function parseSseJson(body: string): unknown {
  const line = body
    .split("\n")
    .find((l) => l.startsWith("data: "));
  if (!line) throw new Error("MCP response was not SSE JSON");
  return JSON.parse(line.slice(6));
}

export async function n8nMcpRequest(
  method: string,
  params: Record<string, unknown> = {},
): Promise<unknown> {
  const token = process.env.N8N_MCP_TOKEN;
  if (!token) throw new Error("N8N_MCP_TOKEN is not set");

  const res = await fetch(N8N_MCP_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text.slice(0, 240));
  return parseSseJson(text);
}

export async function probeN8nMcp(): Promise<{
  authorized: boolean;
  reachable: boolean;
  detail: string;
  serverName?: string;
  toolCount: number;
}> {
  const token = process.env.N8N_MCP_TOKEN;
  if (!token) {
    return {
      authorized: false,
      reachable: false,
      detail: "N8N_MCP_TOKEN not set",
      toolCount: 0,
    };
  }

  try {
    const raw = (await n8nMcpRequest("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "pacman", version: "0.1.0" },
    })) as {
      result?: { serverInfo?: { name?: string; version?: string } };
      error?: { message?: string };
    };

    if (raw.error) {
      return {
        authorized: false,
        reachable: true,
        detail: raw.error.message ?? "initialize error",
        toolCount: 0,
      };
    }

    return {
      authorized: true,
      reachable: true,
      detail: "initialize ok",
      serverName: raw.result?.serverInfo?.name,
      toolCount: N8N_MCP_TOOLS.length,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "probe failed";
    const unauthorized = /unauthor/i.test(message);
    return {
      authorized: false,
      reachable: !message.includes("fetch"),
      detail: unauthorized ? "Unauthorized" : message.slice(0, 180),
      toolCount: 0,
    };
  }
}
