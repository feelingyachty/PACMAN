import { StoreData } from "./types";

const now = new Date().toISOString();
const hoursAgo = (h: number) =>
  new Date(Date.now() - h * 60 * 60 * 1000).toISOString();

export const seedStore: StoreData = {
  agents: [
    {
      id: "pacman",
      name: "Pacman",
      codename: "PACMAN",
      role: "manager",
      title: "Head of Agents",
      specialty:
        "Command oversight, task verification, SEO/dev intel, WordPress & V8r operations",
      status: "online",
      avatarColor: "#F5C518",
      requiresApproval: false,
      knowledgeDomains: [
        "semantic-seo",
        "wordpress",
        "elementor",
        "v8r",
        "ops",
      ],
      stats: {
        completed: 12,
        pendingApproval: 0,
        inProgress: 1,
        verifiedByPacman: 0,
      },
      notes:
        "Manager of all MDI agents. Approves changes only when needed; verifies every implementation. Helps only when the team needs it.",
    },
    {
      id: "corey",
      name: "Corey",
      codename: "COREY-SEO",
      role: "seo",
      title: "Semantic SEO Specialist",
      specialty:
        "Koray Tuğberk Gübür (Turberg) semantic SEO — topical maps, entity graphs, SERP gap analysis",
      status: "busy",
      avatarColor: "#2F6FED",
      requiresApproval: true,
      knowledgeDomains: ["semantic-seo", "feeling.com", "content"],
      stats: {
        completed: 3,
        pendingApproval: 2,
        inProgress: 1,
        verifiedByPacman: 2,
      },
      notes:
        "Audits feeling.com against sitemap + semantic framework. All site changes require owner approval before implementation. Pacman verifies post-deploy.",
    },
  ],
  tasks: [
    {
      id: "task-corey-1",
      title: "feeling.com sitemap semantic gap audit",
      description:
        "Crawl feeling.com sitemap, map URLs to topical entities, and flag missing supporting pages vs Turberg semantic framework.",
      agentId: "corey",
      status: "needs_approval",
      priority: "high",
      tags: ["feeling.com", "sitemap", "semantic-seo"],
      createdAt: hoursAgo(18),
      updatedAt: hoursAgo(2),
      proposal: {
        summary:
          "Add 4 supporting entity pages and rewrite 2 thin category intros to close topical gaps.",
        targetUrl: "https://feeling.com/sitemap.xml",
        impact: "high",
        details:
          "Primary money pages lack enough attribute + entity coverage for competitive SERPs. Proposed cluster strengthens topical authority without cannibalizing existing URLs.",
        proposedActions: [
          "Create /guides/charter-experience entity hub",
          "Add FAQ schema blocks on top 3 landing pages",
          "Rewrite /destinations intro with attribute coverage",
          "Internal-link new hubs from homepage + booking CTAs",
        ],
      },
    },
    {
      id: "task-corey-2",
      title: "Title & H1 alignment for booking funnels",
      description:
        "Align title tags and H1s on booking funnel pages with query semantics (not keyword stuffing).",
      agentId: "corey",
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
          "Current titles over-index on brand; competitor SERPs reward experience + location attributes. No URL slug changes.",
        proposedActions: [
          "Rewrite titles on 6 funnel pages",
          "Match H1 to primary entity + attribute",
          "Preserve brand suffix consistently",
        ],
      },
    },
    {
      id: "task-corey-3",
      title: "Weekly competitor SERP scan",
      description:
        "Scan competitor SERPs for feeling.com head terms and log entity/attribute shifts.",
      agentId: "corey",
      status: "working",
      priority: "medium",
      tags: ["research", "serp"],
      createdAt: hoursAgo(6),
      updatedAt: hoursAgo(1),
    },
    {
      id: "task-pacman-1",
      title: "Verify Elementor knowledge pack load",
      description:
        "Confirm WordPress + Elementor knowledge docs are indexed and usable for future WP change tasks.",
      agentId: "pacman",
      status: "working",
      priority: "low",
      tags: ["knowledge", "wordpress"],
      createdAt: hoursAgo(4),
      updatedAt: hoursAgo(1),
    },
    {
      id: "task-corey-4",
      title: "Internal link graph pass — blog → money pages",
      description:
        "Propose contextual internal links from blog posts to primary conversion pages.",
      agentId: "corey",
      status: "assigned",
      priority: "medium",
      tags: ["internal-links"],
      createdAt: hoursAgo(2),
      updatedAt: hoursAgo(2),
    },
    {
      id: "task-corey-done",
      title: "Meta description refresh — homepage",
      description: "Approved and verified meta description update on homepage.",
      agentId: "corey",
      status: "done",
      priority: "low",
      tags: ["on-page"],
      createdAt: hoursAgo(72),
      updatedAt: hoursAgo(48),
      approvedAt: hoursAgo(50),
      approvedBy: "owner",
      verifiedBy: "pacman",
      verificationNotes: "Live meta matches proposal. SERP preview OK.",
      implementationNotes: "Updated Yoast meta description via WordPress.",
    },
  ],
  knowledge: [],
  intel: [
    {
      id: "intel-1",
      category: "seo",
      title: "Google continues rewarding entity-rich supporting content",
      summary:
        "Semantic coverage and attribute completeness remain stronger ranking signals than thin keyword pages — aligns with Turberg topical map practice.",
      publishedAt: hoursAgo(20),
      relevance: "Directly informs Corey audits on feeling.com",
    },
    {
      id: "intel-2",
      category: "dev",
      title: "Next.js App Router + Server Actions patterns stabilize",
      summary:
        "Prefer server mutations for approval workflows; keep client boards optimistic with revalidation.",
      publishedAt: hoursAgo(12),
      relevance: "PACMAN dashboard architecture",
    },
    {
      id: "intel-3",
      category: "wordpress",
      title: "Elementor container-based layouts preferred over legacy sections",
      summary:
        "New builds should use Flexbox containers; nested sections are legacy. Affects any WP implementation Pacman verifies.",
      publishedAt: hoursAgo(30),
      relevance: "WordPress change verification checklist",
    },
    {
      id: "intel-4",
      category: "booking",
      title: "V8r listing completeness correlates with conversion",
      summary:
        "Complete amenities, accurate calendars, and rich gallery metadata reduce bounce on booking listings.",
      publishedAt: hoursAgo(8),
      relevance: "Future V8r listing change tasks",
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
      message: "Pacman refreshed SEO + WordPress intel feed",
      agentId: "pacman",
    },
  ],
};

// Attach timestamp for knowledge docs loaded separately
void now;
