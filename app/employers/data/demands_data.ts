export type DemandStatus = "active" | "in_review" | "draft"

export interface DemandTicket {
  id: string
  title: string
  description: string
  status: DemandStatus
  createdAt: string
  deliverables: string[]
  successMetrics: string[]
  matchesCount: number
}

export const demandTickets: DemandTicket[] = [
  {
    id: "d1",
    title: "Self-serve analytics dashboard ownership",
    description:
      "Our ops team relies on engineering for every report. We need an engineer to own a self-serve dashboard so PMs can answer their own questions.",
    status: "active",
    createdAt: "2026-05-21",
    deliverables: ["Self-serve dashboard MVP", "Query builder UI", "Role-based access"],
    successMetrics: [
      "Ad-hoc requests reduced by 60%",
      "WAU > 20 internal users",
      "P95 query under 2s",
    ],
    matchesCount: 12,
  },
  {
    id: "d2",
    title: "Ingestion pipeline rewrite",
    description:
      "Our current ingestion is a Lambda spaghetti. We need a maintainable service with monitoring and a clear runbook.",
    status: "in_review",
    createdAt: "2026-06-04",
    deliverables: ["New ingestion service", "Monitoring + alerts", "Runbook"],
    successMetrics: [
      "Zero unattended failures over 30 days",
      "MTTR under 30 min",
    ],
    matchesCount: 6,
  },
  {
    id: "d3",
    title: "Design system migration",
    description:
      "Our UI components drifted across two product surfaces. Consolidate them and migrate the older surface.",
    status: "draft",
    createdAt: "2026-06-10",
    deliverables: ["Shared component package", "Migration of legacy surface", "Storybook"],
    successMetrics: [
      "100% of legacy surface migrated",
      "Component duplication < 5%",
    ],
    matchesCount: 0,
  },
]

export const statusConfig: Record<DemandStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-accent text-white" },
  in_review: { label: "In Review", className: "bg-pastel-amber text-signal-amber" },
  draft: { label: "Draft", className: "bg-soft-surface text-muted" },
}
