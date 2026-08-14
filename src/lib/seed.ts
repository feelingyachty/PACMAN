import { defaultMandate, defaultPlaybook } from "./playbooks";
import { STORE_VERSION, type StoreData } from "./types";

const hoursAgo = (h: number) =>
  new Date(Date.now() - h * 60 * 60 * 1000).toISOString();

const emptyStats = {
  completed: 0,
  pendingApproval: 0,
  inProgress: 0,
  verifiedByPacman: 0,
  blocked: 0,
  assignedTotal: 0,
  completionRate: 0,
  verificationPassRate: 0,
};

export const seedStore: StoreData = {
  version: STORE_VERSION,
  agents: [
    {
      id: "pacman",
      name: "Pacman",
      codename: "PACMAN",
      role: "manager",
      title: "Head of Agents",
      specialty:
        "Fleet command, verification, SEO + developer intel, WordPress, Elementor, V8r listings",
      mandate: defaultMandate("manager", "Pacman"),
      playbook: defaultPlaybook("manager"),
      status: "online",
      avatarColor: "#F5C518",
      requiresApproval: false,
      knowledgeDomains: ["semantic-seo", "wordpress", "elementor", "v8r", "ops"],
      stats: emptyStats,
      notes:
        "Manager of all MDI agents. Does not do the agents' jobs for them. Verifies every implementation. Helps only when it changes the outcome.",
      createdAt: hoursAgo(720),
    },
    {
      id: "corey",
      name: "Corey",
      codename: "COREY-SEO",
      role: "seo",
      title: "Semantic SEO Specialist",
      specialty:
        "Koray Tuğberk Gübür (Turberg) semantic SEO — topical maps, entity graphs, query networks, SERP-driven coverage",
      mandate: defaultMandate("seo", "Corey"),
      playbook: defaultPlaybook("seo"),
      status: "busy",
      avatarColor: "#2F6FED",
      requiresApproval: true,
      knowledgeDomains: ["semantic-seo", "feeling.com", "content"],
      stats: emptyStats,
      notes:
        "feeling.com sitemap in, proposals out. No production write without Approve. Pacman verifies live.",
      createdAt: hoursAgo(240),
    },
  ],
  tasks: [
    {
      id: "task-corey-1",
      title: "feeling.com sitemap semantic gap audit",
      description:
        "Ingest feeling.com sitemap, map each URL to a central entity + attributes, and propose the minimum supporting pages needed to close Turberg coverage gaps.",
      agentId: "corey",
      assignedBy: "owner",
      status: "needs_approval",
      priority: "high",
      tags: ["feeling.com", "sitemap", "semantic-seo"],
      createdAt: hoursAgo(18),
      updatedAt: hoursAgo(2),
      proposal: {
        summary:
          "Add 4 supporting entity pages and rewrite 2 thin category intros. No slug changes on money pages.",
        targetUrl: "https://feeling.com/sitemap.xml",
        impact: "high",
        details:
          "Money pages lack attribute + related-entity coverage versus ranking documents. Cluster is designed to feed the existing conversion URLs, not replace them.",
        proposedActions: [
          "Create /guides/charter-experience as an entity hub",
          "Add visible FAQ + FAQ schema on the top 3 landing pages",
          "Rewrite /destinations intro with attribute coverage from SERP docs",
          "Internal-link new hubs from homepage and booking CTAs",
        ],
        evidence: [
          "Sitemap URL count mapped to 11 entity clusters",
          "3 competitor ranking docs used for attribute extraction",
          "No proposed URL overlaps an existing money-page slug",
        ],
      },
    },
    {
      id: "task-corey-2",
      title: "Title & H1 alignment for booking funnels",
      description:
        "Align title tags and H1s on booking funnel pages with query semantics — not keyword stuffing.",
      agentId: "corey",
      assignedBy: "owner",
      status: "needs_approval",
      priority: "medium",
      tags: ["on-page", "feeling.com"],
      createdAt: hoursAgo(10),
      updatedAt: hoursAgo(3),
      proposal: {
        summary:
          "Update 6 title/H1 pairs on booking funnel URLs to match dominant SERP intent.",
        targetUrl: "https://feeling.com",
        impact: "medium",
        details:
          "Current titles over-index on brand. Ranking documents lead with experience + location attributes. Slugs stay put.",
        proposedActions: [
          "Rewrite titles on 6 funnel pages",
          "Match H1 to primary entity + one differentiating attribute",
          "Keep a consistent brand suffix",
        ],
        evidence: [
          "SERP title patterns logged for 6 head queries",
          "No duplicate H1 planned across the funnel",
        ],
      },
    },
    {
      id: "task-corey-3",
      title: "Weekly competitor SERP scan",
      description:
        "Scan competitor SERPs for feeling.com head terms and log entity/attribute shifts.",
      agentId: "corey",
      assignedBy: "pacman",
      status: "working",
      priority: "medium",
      tags: ["research", "serp"],
      createdAt: hoursAgo(6),
      updatedAt: hoursAgo(1),
    },
    {
      id: "task-pacman-1",
      title: "Keep WordPress + V8r knowledge current",
      description:
        "Pacman owns the knowledge packs used to verify WP, Elementor, and V8r listing changes.",
      agentId: "pacman",
      assignedBy: "pacman",
      status: "working",
      priority: "low",
      tags: ["knowledge", "wordpress", "v8r"],
      createdAt: hoursAgo(4),
      updatedAt: hoursAgo(1),
    },
    {
      id: "task-corey-4",
      title: "Internal link graph — blog → money pages",
      description:
        "Propose contextual internal links from blog posts to primary conversion pages.",
      agentId: "corey",
      assignedBy: "owner",
      status: "assigned",
      priority: "medium",
      tags: ["internal-links"],
      createdAt: hoursAgo(2),
      updatedAt: hoursAgo(2),
    },
    {
      id: "task-corey-done",
      title: "Meta description refresh — homepage",
      description: "Approved and verified homepage meta description update.",
      agentId: "corey",
      assignedBy: "owner",
      status: "done",
      priority: "low",
      tags: ["on-page"],
      createdAt: hoursAgo(72),
      updatedAt: hoursAgo(48),
      approvedAt: hoursAgo(50),
      approvedBy: "owner",
      verifiedBy: "pacman",
      verificationNotes: "Live meta matches proposal. SERP preview OK.",
      implementationNotes: "Updated SEO plugin meta description in WordPress.",
    },
  ],
  logs: [
    {
      id: "log-1",
      at: hoursAgo(16),
      agentId: "corey",
      taskId: "task-corey-1",
      kind: "research",
      title: "Ingested feeling.com sitemap",
      body: "Mapped sitemap URLs into entity clusters. Flagged thin category intros and missing supporting hubs.",
    },
    {
      id: "log-2",
      at: hoursAgo(8),
      agentId: "corey",
      taskId: "task-corey-1",
      kind: "proposal",
      title: "Submitted sitemap gap proposal",
      body: "4 supporting pages + 2 rewrites. Waiting on owner Approve.",
    },
    {
      id: "log-3",
      at: hoursAgo(4),
      agentId: "corey",
      taskId: "task-corey-3",
      kind: "research",
      title: "SERP scan in progress",
      body: "Logging entity/attribute shifts on head charter queries.",
    },
    {
      id: "log-4",
      at: hoursAgo(48),
      agentId: "pacman",
      taskId: "task-corey-done",
      kind: "verification",
      title: "Verified homepage meta",
      body: "Live description matches approved copy.",
    },
    {
      id: "log-5",
      at: hoursAgo(1),
      agentId: "pacman",
      kind: "intel",
      title: "Intel refresh",
      body: "SEO + developer + WordPress + V8r signals updated on the Intel board.",
    },
  ],
  knowledge: [],
  intel: [
    {
      id: "intel-1",
      category: "seo",
      title: "Entity-complete supporting pages still outrank thin keyword posts",
      summary:
        "Coverage of attributes and related entities beats repeating a head term. Matches Turberg topical-map practice Corey uses on feeling.com.",
      publishedAt: hoursAgo(20),
      relevance: "Use on every Corey proposal review",
    },
    {
      id: "intel-2",
      category: "dev",
      title: "Server mutations + revalidate remain the stable approval pattern",
      summary:
        "Keep Approve/Verify as server writes. Client boards should refetch, not invent state.",
      publishedAt: hoursAgo(12),
      relevance: "PACMAN command-center architecture",
    },
    {
      id: "intel-3",
      category: "wordpress",
      title: "Elementor containers are the layout primitive — sections are legacy",
      summary:
        "New work uses Flexbox/Grid containers. Nested classic sections are a verification fail.",
      publishedAt: hoursAgo(30),
      relevance: "WordPress implementation checklist",
    },
    {
      id: "intel-4",
      category: "booking",
      title: "Incomplete V8r listings leak conversion",
      summary:
        "Missing amenities, stale calendars, and thin galleries bounce guests before the quote.",
      publishedAt: hoursAgo(8),
      relevance: "Pacman V8r change verification",
    },
  ],
  activity: [
    {
      id: "act-1",
      at: hoursAgo(2),
      type: "status_changed",
      message: "Corey submitted sitemap semantic gap audit for approval",
      taskId: "task-corey-1",
      agentId: "corey",
    },
    {
      id: "act-2",
      at: hoursAgo(3),
      type: "status_changed",
      message: "Corey submitted title/H1 alignment proposal for approval",
      taskId: "task-corey-2",
      agentId: "corey",
    },
    {
      id: "act-3",
      at: hoursAgo(1),
      type: "intel",
      message: "Pacman refreshed SEO + developer intel",
      agentId: "pacman",
    },
  ],
};
