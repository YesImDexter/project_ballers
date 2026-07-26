export interface Notification {
  id: string
  type: string
  title: string
  description: string
  timeAgo: string
  url: string
  read: boolean
}

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "New mutual match",
    title: "New mutual match",
    description: "Maya Rodriguez matched with Self-serve dashboard.",
    timeAgo: "5m ago",
    url: "/employers/matches",
    read: false,
  },
  {
    id: "n2",
    type: "Trial submitted",
    title: "Trial submitted",
    description: "Maya submitted the trial task · scored 4.5 / 5.",
    timeAgo: "2h ago",
    url: "/employers/chat",
    read: false,
  },
  {
    id: "n3",
    type: "Interview scheduled",
    title: "Interview scheduled",
    description: "Interview with Devon Park scheduled for Thu 11:00 ET.",
    timeAgo: "1d ago",
    url: "/employers/chat",
    read: false,
  },
  {
    id: "n4",
    type: "Demand needs review",
    title: "Demand needs review",
    description: "Design system ticket is still in Draft — review needed.",
    timeAgo: "2d ago",
    url: "/employers/demands",
    read: false,
  },
  {
    id: "n5",
    type: "Offer extended",
    title: "Offer extended",
    description: "Offer extended to Maya Rodriguez for Backend Engineer.",
    timeAgo: "3d ago",
    url: "/employers/outcomes",
    read: true,
  },
  {
    id: "n6",
    type: "New message",
    title: "New message",
    description: "Devon Park replied in the trial thread.",
    timeAgo: "3d ago",
    url: "/employers/chat",
    read: true,
  },
  {
    id: "n7",
    type: "Profile update",
    title: "Profile update",
    description: "Riya Patel updated her portfolio with new case studies.",
    timeAgo: "4d ago",
    url: "/employers/matches",
    read: true,
  },
  {
    id: "n8",
    type: "Hire confirmed",
    title: "Hire confirmed",
    description: "Devon Park hired — onboarding started.",
    timeAgo: "5d ago",
    url: "/employers/outcomes",
    read: true,
  },
  {
    id: "n9",
    type: "Demand published",
    title: "Demand published",
    description: "Vendor ingestion demand is now live.",
    timeAgo: "6d ago",
    url: "/employers/demands",
    read: true,
  },
]
