import type { AgentRole } from "./types";

export function defaultMandate(role: AgentRole, name: string): string {
  switch (role) {
    case "manager":
      return `${name} runs the MDI fleet: assign, watch, approve-gate, verify. Help only when it changes the outcome.`;
    case "seo":
      return `${name} audits sites against the Turberg semantic framework, submits every production change for approval, then implements only after Approve. Pacman verifies live.`;
    case "wordpress":
      return `${name} drafts WordPress/Elementor changes. Approval required before publish. Pacman verifies front-end + mobile.`;
    case "booking":
      return `${name} drafts V8r listing/booking changes. Price, policy, and public copy need approval. Pacman applies or verifies in V8r.`;
    case "dev":
      return `${name} ships code and integrations. Production deploys need approval unless Pacman is the implementer.`;
    case "research":
      return `${name} researches and briefs. No production writes. Findings can become proposals for gated agents.`;
    default:
      return `${name} executes assigned work. If the work can change production, approval is required.`;
  }
}

export function defaultPlaybook(role: AgentRole): string {
  switch (role) {
    case "seo":
      return [
        "1. Ingest sitemap + current URL→entity map",
        "2. Pull SERP entities/attributes for the cluster",
        "3. Diff coverage gaps (no vague 'add more content')",
        "4. Write a change proposal (URLs, actions, impact)",
        "5. Wait for owner Approve",
        "6. Implement exactly what was approved",
        "7. Hand to Pacman for live verification",
        "8. Log the sources you studied to /learning",
      ].join("\n");
    case "wordpress":
      return [
        "1. Draft in staging or Elementor draft",
        "2. Note widgets, templates, and globals touched",
        "3. Submit proposal (before/after + pages)",
        "4. On Approve: publish, clear cache",
        "5. Pacman verifies desktop + mobile",
      ].join("\n");
    case "booking":
      return [
        "1. Snapshot current V8r listing fields",
        "2. Propose field-level before/after",
        "3. Approval required for price, policy, public copy",
        "4. Pacman implements or verifies in V8r",
        "5. Check public page, calendar, quote path",
      ].join("\n");
    case "dev":
      return [
        "1. Scope + risk",
        "2. Implement on a branch",
        "3. Approval if it ships to production",
        "4. Pacman verifies against the brief",
      ].join("\n");
    case "research":
      return [
        "1. Define the question",
        "2. Collect sources",
        "3. Brief Pacman + owner",
        "4. Convert findings into gated tasks if action is needed",
        "5. Log sources + takeaways on /learning",
      ].join("\n");
    case "manager":
      return [
        "1. Watch every assigned task to Done",
        "2. Enforce approval gates",
        "3. Verify implementations against proposals",
        "4. Stay current on SEO + developer intel",
        "5. Log every study session to /learning (data/learning/)",
        "6. Intervene only when it helps",
      ].join("\n");
    default:
      return [
        "1. Take the assignment",
        "2. Log the work",
        "3. Propose if production changes",
        "4. Implement only after Approve when gated",
        "5. Pacman verifies",
      ].join("\n");
  }
}

export function roleNeedsApproval(role: AgentRole): boolean {
  return role === "seo" || role === "wordpress" || role === "booking" || role === "dev";
}
