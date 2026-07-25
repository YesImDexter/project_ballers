import { employerCompany } from "@/app/employers/data/company_data"
import { demandTickets, type DemandStatus } from "@/app/employers/data/demands_data"
import { candidateMatches } from "@/app/employers/data/matches_data"
import { notifications } from "@/app/employers/data/notifications_data"
import { hiringOutcomes } from "@/app/employers/data/outcomes_data"
import {
  Activity,
  ArrowLeftRight,
  Award,
  Bell,
  Briefcase,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  Sparkles,
  Star,
  Target,
  TicketCheck,
  UserCheck,
  Users,
} from "lucide-react"
import Link from "next/link"

const funnelItems = [
  { label: "Matches surfaced", value: 18, width: "100%", color: "#3B82F6", icon: Users, chip: "bg-blue-100 text-blue-600" },
  { label: "Mutual swipes", value: 8, width: "44%", color: "#8B5CF6", icon: ArrowLeftRight, chip: "bg-violet-100 text-violet-600" },
  { label: "Chats opened", value: 6, width: "33%", color: "#10B981", icon: MessageSquare, chip: "bg-emerald-100 text-emerald-600" },
  { label: "Interviews", value: 4, width: "22%", color: "#F59E0B", icon: Clock, chip: "bg-amber-100 text-amber-700" },
  { label: "Trials", value: 2, width: "11%", color: "#F97316", icon: FileText, chip: "bg-orange-100 text-orange-700" },
  { label: "Offers", value: 2, width: "11%", color: "#EC4899", icon: Award, chip: "bg-pink-100 text-pink-700" },
  { label: "Hires", value: 1, width: "6%", color: "#059669", icon: UserCheck, chip: "bg-green-100 text-green-700" },
]

const quickActions = [
  { label: "Post demand", href: "/employers/demands/new", icon: Plus, chip: "bg-[#d1fae5] text-emerald-600" },
  { label: "Review matches", href: "/employers/matches", icon: Sparkles, chip: "bg-[#e9d5ff] text-violet-600" },
  { label: "Chat & trials", href: "/employers/chat", icon: MessageSquare, chip: "bg-[#fed7aa] text-orange-700" },
  { label: "Outcomes", href: "/employers/outcomes", icon: Award, chip: "bg-[#bfdbfe] text-blue-700" },
]

const notificationStyles = [
  { icon: Sparkles, chip: "bg-purple-100 text-purple-600" },
  { icon: Star, chip: "bg-green-100 text-green-600" },
  { icon: Clock, chip: "bg-amber-100 text-amber-700" },
  { icon: FileText, chip: "bg-red-100 text-red-700" },
]

const recentActivity = [
  { event: "Offer extended to Maya Rodriguez", meta: "Northwind · 2h ago", icon: Award, chip: "bg-green-100 text-green-600" },
  { event: "New mutual match created", meta: "Devon Park · 5h ago", icon: Sparkles, chip: "bg-purple-100 text-purple-600" },
  { event: "Trial task reviewed · 4.5 / 5", meta: "Self-serve dashboard · 1d ago", icon: Star, chip: "bg-amber-100 text-amber-700" },
  { event: "Interview round 2 booked", meta: "Riya Patel · 1d ago", icon: Clock, chip: "bg-orange-100 text-orange-700" },
  { event: "Demand ticket published", meta: "Vendor ingestion · 3d ago", icon: FileText, chip: "bg-blue-100 text-blue-700" },
  { event: "Devon Park hired — onboarding started", meta: "Backend · 5d ago", icon: Briefcase, chip: "bg-pink-100 text-pink-700" },
]

const dashboardStatusConfig: Record<DemandStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-[#d1fae5] text-emerald-700" },
  in_review: { label: "In Review", className: "bg-[#fef3c7] text-amber-700" },
  draft: { label: "Draft", className: "bg-[#f3f4f6] text-gray-600" },
}

const cardClass = "bg-white border border-[#e5e7eb] rounded-[24px]"
const darkCardClass = "bg-[#1f2937] rounded-[24px] text-white"

export default function EmployerDashboard() {
  const unreadNotifs = notifications.filter((n) => !n.read)
  const strongMatches = candidateMatches.filter((m) => m.scoreLabel === "Strong Match")
  const topCandidates = candidateMatches
    .filter((m, i, arr) => arr.findIndex((x) => x.name === m.name) === i)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return (
    <div className="flex-1 bg-primary">
      <div className="flex items-start justify-between p-6">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-[#1f2937]">Hiring overview</h1>
          <p className="mt-1 text-xs text-gray-500">
            {employerCompany.name} · {employerCompany.industry} · {employerCompany.teamSize}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/employers/notifications"
            className="relative inline-flex size-9 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-white hover:text-[#1f2937]"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-[#1f2937]">
              {unreadNotifs.length}
            </span>
          </Link>
          <Link
            href="/employers/demands/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1f2937] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            <Plus size={14} />
            New demand
          </Link>
          <div className="flex size-8 items-center justify-center rounded-xl bg-rose-100 text-xs font-bold text-rose-700">
            NA
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 pb-8">
        <div className="grid grid-cols-4 gap-6">
          <div className={`${darkCardClass} p-6`}>
            <p className="text-sm text-gray-300">Pipeline health</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-3xl font-bold text-white">18</p>
              <p className="pb-1 text-sm text-gray-300">+2 strong this week</p>
            </div>
            <p className="mt-4 text-xs text-gray-400">Candidates surfaced across 1 active demand</p>
            <div className="mt-5 flex gap-1 rounded-full bg-white/10 p-1 text-[10px] text-gray-300">
              {["1D", "1W", "1M", "3M", "1Y", "All"].map((period, i) => (
                <button
                  key={period}
                  className={`rounded-full px-2 py-1 ${i === 1 ? "bg-white text-[#1f2937]" : ""}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-[120px] flex-col justify-between rounded-[24px] bg-[#d1fae5] p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-[#1f2937]/70">Active tickets</p>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/60 text-emerald-600">
                <TicketCheck size={18} />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111]">
                {demandTickets.filter((t) => t.status === "active").length}
              </p>
              <p className="mt-1 text-xs text-[#1f2937]/70">
                {demandTickets.filter((t) => t.status === "in_review").length} in review
              </p>
            </div>
          </div>
          <div className="flex min-h-[120px] flex-col justify-between rounded-[24px] bg-[#e9d5ff] p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-[#1f2937]/70">In trial / interview</p>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/60 text-violet-600">
                <Users size={18} />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111]">1</p>
              <p className="mt-1 text-xs text-[#1f2937]/70">1 offers out</p>
            </div>
          </div>
          <div className="flex min-h-[120px] flex-col justify-between rounded-[24px] bg-[#fed7aa] p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-[#1f2937]/70">Hires this quarter</p>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/60 text-orange-700">
                <Award size={18} />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111]">
                {hiringOutcomes.filter((o) => o.outcome === "Hired").length}
              </p>
              <p className="mt-1 text-xs text-[#1f2937]/70">6% conversion</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`${cardClass} flex items-center gap-3 px-5 py-4 text-sm font-medium text-[#1f2937] transition-all hover:-translate-y-0.5 hover:shadow-sm`}
              >
                <span className={`grid size-10 place-items-center rounded-xl ${action.chip}`}>
                  <Icon size={18} />
                </span>
                {action.label}
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className={`${cardClass} p-6`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1f2937]">Demand tickets</h2>
                  <p className="text-xs text-gray-500">Open roles · candidates surfacing in real time</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs text-gray-500">
                    All status
                  </button>
                  <Link href="/employers/demands" className="text-xs font-medium text-[#1f2937] hover:underline">
                    View all
                  </Link>
                </div>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e7eb] text-left text-xs uppercase tracking-wider text-gray-500">
                    <th className="pb-3 font-semibold">Ticket</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Matches</th>
                    <th className="pb-3 font-semibold">Open</th>
                  </tr>
                </thead>
                <tbody>
                  {demandTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-[#e5e7eb] last:border-0">
                      <td className="py-4">
                        <p className="font-semibold text-[#111]">{ticket.title}</p>
                        <p className="mt-1 text-xs text-gray-400">Created {ticket.createdAt}</p>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${dashboardStatusConfig[ticket.status].className}`}>
                          {dashboardStatusConfig[ticket.status].label}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-[#111]">{ticket.matchesCount}</td>
                      <td className="py-4">
                        <Link href="/employers/matches" className="text-xs text-gray-500 hover:text-[#111]">
                          →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${cardClass} p-6`}>
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-md bg-indigo-100 text-indigo-600">
                  <Activity size={18} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[#1f2937]">Hiring funnel</h2>
                  <p className="text-xs text-gray-500">This month · all demands</p>
                </div>
              </div>
              <div className="space-y-4">
                {funnelItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className={`grid size-9 shrink-0 place-items-center rounded-md ${item.chip}`}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center justify-between gap-4">
                          <p className="text-sm font-medium text-[#111]">{item.label}</p>
                          <p className="text-sm font-bold text-[#111]">{item.value}</p>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#f3f4f6]">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: item.width, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${darkCardClass} p-6`}>
              <p className="text-xs uppercase tracking-widest text-gray-400">Action needed</p>
              <h3 className="mt-3 text-xl font-bold leading-tight text-white">
                Review {strongMatches.length} strong candidates
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Surfaced across your active demands. The earlier you swipe, the warmer the intro chat.
              </p>
              <Link
                href="/employers/matches"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#1f2937] transition-opacity hover:opacity-90"
              >
                Go to matches
              </Link>
            </div>

            <div className={`${cardClass} p-6`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1f2937]">Top candidates</h2>
                <Link href="/employers/matches" className="text-xs font-medium text-[#1f2937] hover:underline">
                  All
                </Link>
              </div>
              <div className="space-y-4">
                {topCandidates.map((c) => (
                  <Link key={c.id} href="/employers/chat" className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-xs font-bold text-rose-700">
                      {c.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#111]">{c.name}</p>
                      <p className="truncate text-xs text-gray-500">{c.matchReason}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">+{c.score}%</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className={`${cardClass} p-6`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1f2937]">Notifications</h2>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-bold text-[#1f2937]">
                {unreadNotifs.length} NEW
              </span>
            </div>
            <div className="space-y-4">
              {unreadNotifs.map((n, index) => {
                const style = notificationStyles[index % notificationStyles.length]
                const Icon = style.icon
                return (
                  <div key={n.id} className="flex items-start gap-3">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-md ${style.chip}`}>
                      <Icon size={15} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#111]">{n.description}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{n.timeAgo.replace(" ago", "")}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={`${cardClass} p-6`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1f2937]">Recent activity</h2>
              <span className="text-xs text-gray-500">Last 7 days</span>
            </div>
            <div className="space-y-4">
              {recentActivity.map((a) => {
                const Icon = a.icon
                return (
                  <div key={a.event} className="flex items-start gap-3">
                    <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-md ${a.chip}`}>
                      <Icon size={14} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#111]">{a.event}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{a.meta}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          2 strong matches · 1 active conversations · 18 total in pipeline
        </div>
      </div>
    </div>
  )
}
