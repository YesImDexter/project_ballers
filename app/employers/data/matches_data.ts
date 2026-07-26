export type MatchLabel = "Strong Match" | "Potential Match" | "Skill Gap"

export interface CandidateMatch {
  id: string
  initials: string
  name: string
  school: string
  matchReason: string
  skills: string[]
  score: number
  scoreLabel: MatchLabel
  demandTicketId: string
}

export const candidateMatches: CandidateMatch[] = [
  // Self-serve analytics dashboard (d1)
  {
    id: "c1",
    initials: "MR",
    name: "Maya Rodriguez",
    school: "UC Berkeley · CS",
    matchReason: "DataLens artifact maps directly to the self-serve dashboard scope.",
    skills: ["TypeScript", "React", "PostgreSQL"],
    score: 88,
    scoreLabel: "Strong Match",
    demandTicketId: "d1",
  },
  {
    id: "c2",
    initials: "DP",
    name: "Devon Park",
    school: "Georgia Tech · CS",
    matchReason: "Strong backend ownership but lighter on frontend dashboard craft.",
    skills: ["AWS", "Terraform", "Python"],
    score: 74,
    scoreLabel: "Potential Match",
    demandTicketId: "d1",
  },
  {
    id: "c3",
    initials: "PA",
    name: "Priya Anand",
    school: "NYU · IDM",
    matchReason: "Excellent UI craft; query-builder backend ownership untested.",
    skills: ["React", "TypeScript", "Design Systems"],
    score: 62,
    scoreLabel: "Potential Match",
    demandTicketId: "d1",
  },
  // Ingestion pipeline rewrite (d2)
  {
    id: "c4",
    initials: "DP",
    name: "Devon Park",
    school: "Georgia Tech · CS",
    matchReason: "Production AWS + Terraform + payments ingestion close the brief 1:1.",
    skills: ["AWS", "Terraform", "Python"],
    score: 91,
    scoreLabel: "Strong Match",
    demandTicketId: "d2",
  },
  {
    id: "c5",
    initials: "MR",
    name: "Maya Rodriguez",
    school: "UC Berkeley · CS",
    matchReason: "Pipeline project mirrors the ingestion shape; no AWS production yet.",
    skills: ["TypeScript", "React", "PostgreSQL"],
    score: 78,
    scoreLabel: "Potential Match",
    demandTicketId: "d2",
  },
  // Design system migration (d3)
  {
    id: "c6",
    initials: "PA",
    name: "Priya Anand",
    school: "NYU · IDM",
    matchReason: "Tessera case study consolidated 80+ components into 22 primitives.",
    skills: ["React", "TypeScript", "Design Systems"],
    score: 86,
    scoreLabel: "Strong Match",
    demandTicketId: "d3",
  },
  {
    id: "c7",
    initials: "MR",
    name: "Maya Rodriguez",
    school: "UC Berkeley · CS",
    matchReason: "React fluent but limited design-systems leadership evidence.",
    skills: ["TypeScript", "React", "PostgreSQL"],
    score: 58,
    scoreLabel: "Skill Gap",
    demandTicketId: "d3",
  },
]
