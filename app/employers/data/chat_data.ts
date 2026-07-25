export type PipelineStage = "match" | "chat" | "interview" | "trial" | "offer" | "onboarding"

export interface ChatCandidate {
  id: string
  initials: string
  name: string
  timeAgo: string
  companyTitle: string
  demandTitle: string
  stage: PipelineStage
}

export interface ChatDetail {
  matchScore: number
  salaryExpectation: string
  whyMatched: string[]
  matchingSkills: string[]
  gapsToProbe: string[]
  demandRequirements: string[]
  progressHistory: { event: string; date: string }[]
}

export const chatCandidates: ChatCandidate[] = [
  {
    id: "c1",
    initials: "MR",
    name: "Maya Rodriguez",
    timeAgo: "2h",
    companyTitle: "Northwind Analytics · Junior Full-Stack Engineer",
    demandTitle: "Self-serve analytics dashboard",
    stage: "offer",
  },
  {
    id: "c2",
    initials: "DP",
    name: "Devon Park",
    timeAgo: "1d",
    companyTitle: "Quill & Co · Data Engineer Intern",
    demandTitle: "Vendor ingestion pipeline",
    stage: "interview",
  },
]

export const chatDetails: Record<string, ChatDetail> = {
  c1: {
    matchScore: 88,
    salaryExpectation: "$95k – $115k",
    whyMatched: [
      "DataLens artifact maps directly to Northwind's self-serve dashboard scope.",
      "Stack overlap on TypeScript, React, Postgres above the 80% threshold.",
      "Both sides marked remote-friendly with overlapping time zones.",
    ],
    matchingSkills: ["TypeScript", "React", "PostgreSQL", "API Design"],
    gapsToProbe: ["AWS"],
    demandRequirements: ["Self-serve dashboard MVP", "Query builder UI", "Role-based access"],
    progressHistory: [
      { event: "Mutual match created", date: "2026-05-22" },
      { event: "Intro chat opened", date: "2026-05-25" },
      { event: "Interview round 1 completed", date: "2026-06-02" },
      { event: "Trial task assigned", date: "2026-06-05" },
      { event: "Trial submitted", date: "2026-06-09" },
      { event: "Trial reviewed · 4.5 / 5", date: "2026-06-11" },
      { event: "Offer extended — pending acceptance", date: "2026-06-14" },
    ],
  },
  c2: {
    matchScore: 91,
    salaryExpectation: "$75k – $90k",
    whyMatched: [
      "Production AWS + Terraform experience matches ingestion pipeline requirements 1:1.",
      "Payment processing background indicates strong data integrity instincts.",
      "Availability aligns with project timeline.",
    ],
    matchingSkills: ["AWS", "Terraform", "Python", "Kafka"],
    gapsToProbe: ["Real-time streaming"],
    demandRequirements: ["New ingestion service", "Monitoring + alerts", "Runbook"],
    progressHistory: [
      { event: "Mutual match created", date: "2026-06-06" },
      { event: "Intro chat opened", date: "2026-06-08" },
      { event: "Interview round 1 completed", date: "2026-06-14" },
    ],
  },
}

export const stageConfig: Record<PipelineStage, { label: string; step: number }> = {
  match: { label: "Match", step: 1 },
  chat: { label: "Chat", step: 2 },
  interview: { label: "Interview", step: 3 },
  trial: { label: "Trial Task", step: 4 },
  offer: { label: "Offer", step: 5 },
  onboarding: { label: "Onboarding", step: 6 },
}
