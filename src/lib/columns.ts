export const COLUMNS = [
  {
    id: "assigned",
    label: "Assigned",
    hint: "Queued for agent",
  },
  {
    id: "working",
    label: "Working",
    hint: "In flight",
  },
  {
    id: "needs_approval",
    label: "Needs Approval",
    hint: "Your call",
  },
  {
    id: "implementing",
    label: "Implementing",
    hint: "Approved — shipping",
  },
  {
    id: "verifying",
    label: "Pacman Review",
    hint: "Verify correctness",
  },
  {
    id: "done",
    label: "Done",
    hint: "Verified complete",
  },
  {
    id: "blocked",
    label: "Blocked",
    hint: "Failed verify / stuck",
  },
  {
    id: "rejected",
    label: "Rejected",
    hint: "Sent back",
  },
] as const;

export type ColumnId = (typeof COLUMNS)[number]["id"];
