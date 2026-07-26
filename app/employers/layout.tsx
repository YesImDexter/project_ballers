import { AppShell } from "@/app/components/AppShell"
import {
  LayoutDashboard,
  Building2,
  TicketCheck,
  ArrowLeftRight,
  MessageSquare,
  Target,
  Bell,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/employers", icon: <LayoutDashboard size={18} /> },
  { label: "Company Profile", href: "/employers/company", icon: <Building2 size={18} /> },
  { label: "Demand Tickets", href: "/employers/demands", icon: <TicketCheck size={18} /> },
  { label: "Swipe Matches", href: "/employers/matches", icon: <ArrowLeftRight size={18} /> },
  { label: "Chat & Trials", href: "/employers/chat", icon: <MessageSquare size={18} /> },
  { label: "Outcomes", href: "/employers/outcomes", icon: <Target size={18} /> },
  { label: "Notifications", href: "/employers/notifications", icon: <Bell size={18} /> },
]

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={navItems}
      user={{ initials: "NA", name: "Northwind Analytics" }}
    >
      {children}
    </AppShell>
  )
}
