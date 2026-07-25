export interface HiringOutcome {
  id: string
  candidateName: string
  role: string
  outcome: "Hired" | "Passed"
  rating: number
  feedback: string
  date: string
}

export const hiringOutcomes: HiringOutcome[] = [
  {
    id: "o1",
    candidateName: "Devon Park",
    role: "Backend Engineer",
    outcome: "Hired",
    rating: 5,
    feedback: "Trial task delivered above bar; offer accepted.",
    date: "2026-04-18",
  },
  {
    id: "o2",
    candidateName: "Sasha Lin",
    role: "Frontend Engineer",
    outcome: "Passed",
    rating: 3,
    feedback: "Strong portfolio but availability mismatched our timeline.",
    date: "2026-03-02",
  },
]
