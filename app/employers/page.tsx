"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { pipelineHealthData } from "@/app/employers/data/pipeline_health_data";
import { employerCompany } from "@/app/employers/data/company_data";
import {
  demandTickets,
  statusConfig,
  type DemandStatus,
} from "@/app/employers/data/demands_data";
import { candidateMatches } from "@/app/employers/data/matches_data";
import { notifications } from "@/app/employers/data/notifications_data";
import { hiringOutcomes } from "@/app/employers/data/outcomes_data";
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
  TicketCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";

// Recharts requires literal colors — values mirror --signal-* / --brand-soft tokens in globals.css.
const CHART_LINE = "#f59e0b";

const funnelItems = [
  {
    label: "Matches surfaced",
    value: 18,
    width: "100%",
    color: "#1d4ed8",
    icon: Users,
    chip: "bg-pastel-blue text-signal-blue",
  },
  {
    label: "Mutual swipes",
    value: 8,
    width: "44%",
    color: "#7c3aed",
    icon: ArrowLeftRight,
    chip: "bg-pastel-purple text-signal-purple",
  },
  {
    label: "Chats opened",
    value: 6,
    width: "33%",
    color: "#059669",
    icon: MessageSquare,
    chip: "bg-pastel-green text-signal-green",
  },
  {
    label: "Interviews",
    value: 4,
    width: "22%",
    color: "#d97706",
    icon: Clock,
    chip: "bg-pastel-amber text-signal-amber",
  },
  {
    label: "Trials",
    value: 2,
    width: "11%",
    color: "#b45309",
    icon: FileText,
    chip: "bg-pastel-orange text-signal-orange",
  },
  {
    label: "Offers",
    value: 2,
    width: "11%",
    color: "#be185d",
    icon: Award,
    chip: "bg-pastel-pink text-signal-pink",
  },
  {
    label: "Hires",
    value: 1,
    width: "6%",
    color: "#059669",
    icon: UserCheck,
    chip: "bg-pastel-green text-signal-green",
  },
];

const quickActions = [
  {
    label: "Post demand",
    href: "/employers/demands/new",
    icon: Plus,
    chip: "bg-pastel-green text-signal-green",
  },
  {
    label: "Review matches",
    href: "/employers/matches",
    icon: Sparkles,
    chip: "bg-pastel-purple text-signal-purple",
  },
  {
    label: "Chat & trials",
    href: "/employers/chat",
    icon: MessageSquare,
    chip: "bg-pastel-orange text-signal-orange",
  },
  {
    label: "Outcomes",
    href: "/employers/outcomes",
    icon: Award,
    chip: "bg-pastel-blue text-signal-blue",
  },
];

const notificationStyles = [
  { icon: Sparkles, chip: "bg-pastel-purple text-signal-purple" },
  { icon: Star, chip: "bg-pastel-green text-signal-green" },
  { icon: Clock, chip: "bg-pastel-amber text-signal-amber" },
  { icon: FileText, chip: "bg-pastel-red text-signal-red" },
];

const recentActivity = [
  {
    event: "Offer extended to Maya Rodriguez",
    meta: "Northwind · 2h ago",
    icon: Award,
    chip: "bg-pastel-green text-signal-green",
  },
  {
    event: "New mutual match created",
    meta: "Devon Park · 5h ago",
    icon: Sparkles,
    chip: "bg-pastel-purple text-signal-purple",
  },
  {
    event: "Trial task reviewed · 4.5 / 5",
    meta: "Self-serve dashboard · 1d ago",
    icon: Star,
    chip: "bg-pastel-amber text-signal-amber",
  },
  {
    event: "Interview round 2 booked",
    meta: "Riya Patel · 1d ago",
    icon: Clock,
    chip: "bg-pastel-orange text-signal-orange",
  },
  {
    event: "Demand ticket published",
    meta: "Vendor ingestion · 3d ago",
    icon: FileText,
    chip: "bg-pastel-blue text-signal-blue",
  },
  {
    event: "Devon Park hired — onboarding started",
    meta: "Backend · 5d ago",
    icon: Briefcase,
    chip: "bg-pastel-pink text-signal-pink",
  },
];

const statusFilters: Array<{ value: DemandStatus | "all"; label: string }> = [
  { value: "all", label: "All status" },
  { value: "active", label: "Active" },
  { value: "in_review", label: "In Review" },
  { value: "draft", label: "Draft" },
];

export default function EmployerDashboard() {
  const [activePeriod, setActivePeriod] = useState("1M");
  const [statusFilterIndex, setStatusFilterIndex] = useState(0);

  const chartData = useMemo(() => {
    const msMap: Record<string, number> = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "1Y": 365,
      All: 9999,
    };
    const days = msMap[activePeriod];
    const cutoff = new Date(Date.now() - days * 86400000);
    return pipelineHealthData.filter((d) => new Date(d.date) >= cutoff);
  }, [activePeriod]);

  const statusFilter = statusFilters[statusFilterIndex];
  const visibleTickets =
    statusFilter.value === "all"
      ? demandTickets
      : demandTickets.filter((t) => t.status === statusFilter.value);

  const unreadNotifs = notifications.filter((n) => !n.read);
  const strongMatches = candidateMatches.filter(
    (m) => m.scoreLabel === "Strong Match",
  );
  const topCandidates = candidateMatches
    .filter((m, i, arr) => arr.findIndex((x) => x.name === m.name) === i)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const activeDemandCount = demandTickets.filter(
    (t) => t.status === "active",
  ).length;

  return (
    <div className="flex-1 bg-primary">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div>
          <h1 className="font-headings text-3xl font-bold leading-tight text-accent">
            Hiring overview
          </h1>
          <p className="mt-1 text-xs text-muted">
            {employerCompany.name} · {employerCompany.industry} ·{" "}
            {employerCompany.teamSize}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/employers/notifications"
            className="relative inline-flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-secondary hover:text-accent"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-signal-red text-[10px] font-bold text-secondary">
              {unreadNotifs.length}
            </span>
          </Link>
          <Link
            href="/employers/demands/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-secondary transition-opacity hover:opacity-90"
          >
            <Plus size={14} />
            New demand
          </Link>
          <div className="flex size-8 items-center justify-center rounded-xl bg-pastel-red text-xs font-bold text-signal-red">
            NA
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 pb-8 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          <div className="flex flex-col rounded-2xl bg-accent p-6 text-secondary sm:row-span-3">
            <p className="text-sm uppercase tracking-widest text-secondary/60">
              Pipeline health
            </p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-3xl font-bold">18</p>
              <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1">
                <TrendingUp className="h-3 w-3" />
                <p className="text-xs">+2 strong this week</p>
              </div>
            </div>
            <p className="mt-1 text-xs text-secondary/60">
              Candidates surfaced across {activeDemandCount} active demand
              {activeDemandCount === 1 ? "" : "s"}
            </p>
            <div className="mt-4 min-h-45 grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="pipelineGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={CHART_LINE}
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor={CHART_LINE}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111111",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#a3a3a3" }}
                    itemStyle={{ color: "#ffffff" }}
                    formatter={(value) => [value, "Candidates"]}
                    labelFormatter={(label) =>
                      new Date(label as string).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="candidates"
                    stroke={CHART_LINE}
                    strokeWidth={2}
                    fill="url(#pipelineGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: CHART_LINE }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex gap-1 rounded-full bg-secondary/10 p-1 text-[10px] text-secondary/70">
              {["1D", "1W", "1M", "3M", "1Y", "All"].map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`rounded-full px-2 py-1 transition-colors ${activePeriod === period ? "bg-secondary text-accent" : "hover:bg-secondary/10"}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-[120px] flex-col justify-between rounded-2xl bg-pastel-green p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-accent/70">Active tickets</p>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/60 text-signal-green">
                <TicketCheck size={18} />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {activeDemandCount}
              </p>
              <p className="mt-1 text-xs text-accent/70">
                {demandTickets.filter((t) => t.status === "in_review").length}{" "}
                in review
              </p>
            </div>
          </div>
          <div className="flex min-h-[120px] flex-col justify-between rounded-2xl bg-pastel-purple p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-accent/70">In trial / interview</p>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/60 text-signal-purple">
                <Users size={18} />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">1</p>
              <p className="mt-1 text-xs text-accent/70">1 offers out</p>
            </div>
          </div>
          <div className="flex min-h-[120px] flex-col justify-between rounded-2xl bg-pastel-orange p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-accent/70">Hires this quarter</p>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/60 text-signal-orange">
                <Award size={18} />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {hiringOutcomes.filter((o) => o.outcome === "Hired").length}
              </p>
              <p className="mt-1 text-xs text-accent/70">6% conversion</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 rounded-2xl border border-light-border bg-secondary px-5 py-4 text-sm font-medium text-accent shadow-card transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${action.chip}`}
                >
                  <Icon size={18} />
                </span>
                {action.label}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-headings text-xl font-bold text-accent">
                    Demand tickets
                  </h2>
                  <p className="text-xs text-muted">
                    Open roles · candidates surfacing in real time
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setStatusFilterIndex(
                        (statusFilterIndex + 1) % statusFilters.length,
                      )
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      statusFilter.value === "all"
                        ? "border-light-border text-muted hover:bg-soft-hover"
                        : "border-accent bg-accent text-secondary"
                    }`}
                    aria-label={`Filter by status: ${statusFilter.label}`}
                  >
                    {statusFilter.label}
                  </button>
                  <Link
                    href="/employers/demands"
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    View all
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-120 text-sm">
                  <thead>
                    <tr className="border-b border-soft-row-border text-left text-xs uppercase tracking-wider text-muted">
                      <th className="pb-3 font-semibold">Ticket</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Matches</th>
                      <th className="pb-3 font-semibold">Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="border-b border-soft-row-border last:border-0"
                      >
                        <td className="py-4">
                          <p className="font-semibold text-accent">
                            {ticket.title}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            Created {ticket.createdAt}
                          </p>
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusConfig[ticket.status].className}`}
                          >
                            {statusConfig[ticket.status].label}
                          </span>
                        </td>
                        <td className="py-4 font-semibold text-accent">
                          {ticket.matchesCount}
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/employers/matches?ticket=${ticket.id}`}
                            aria-label={`Open matches for ${ticket.title}`}
                            className="text-xs text-muted hover:text-accent"
                          >
                            →
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {visibleTickets.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-sm text-muted"
                        >
                          No tickets with this status.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-pastel-blue text-signal-blue">
                  <Activity size={18} />
                </span>
                <div>
                  <h2 className="font-headings text-xl font-bold text-accent">
                    Hiring funnel
                  </h2>
                  <p className="text-xs text-muted">This month · all demands</p>
                </div>
              </div>
              <div className="space-y-4">
                {funnelItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-xl ${item.chip}`}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center justify-between gap-4">
                          <p className="text-sm font-medium text-accent">
                            {item.label}
                          </p>
                          <p className="text-sm font-bold text-accent">
                            {item.value}
                          </p>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-soft-row-border">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: item.width,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-accent p-6 text-secondary">
              <p className="text-xs uppercase tracking-widest text-secondary/60">
                Action needed
              </p>
              <h3 className="mt-3 font-headings text-xl font-bold leading-tight">
                Review {strongMatches.length} strong candidates
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary/60">
                Surfaced across your active demands. The earlier you swipe, the
                warmer the intro chat.
              </p>
              <Link
                href="/employers/matches"
                className="mt-5 inline-flex rounded-full bg-secondary px-5 py-2.5 text-sm font-medium text-accent transition-opacity hover:opacity-90"
              >
                Go to matches
              </Link>
            </div>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-headings text-xl font-bold text-accent">
                  Top candidates
                </h2>
                <Link
                  href="/employers/matches"
                  className="text-xs font-medium text-accent hover:underline"
                >
                  All
                </Link>
              </div>
              <div className="space-y-4">
                {topCandidates.map((c) => (
                  <Link
                    key={c.id}
                    href={`/employers/chat?candidate=${c.id}`}
                    className="flex items-center gap-3 rounded-xl transition-colors hover:bg-soft-hover"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-pastel-red text-xs font-bold text-signal-red">
                      {c.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-accent">
                        {c.name}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {c.matchReason}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-signal-green">
                      +{c.score}%
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-headings text-xl font-bold text-accent">
                Notifications
              </h2>
              <span className="rounded-full bg-pastel-red px-2 py-1 text-[10px] font-bold text-signal-red">
                {unreadNotifs.length} NEW
              </span>
            </div>
            <div className="space-y-4">
              {unreadNotifs.map((n, index) => {
                const style =
                  notificationStyles[index % notificationStyles.length];
                const Icon = style.icon;
                return (
                  <div key={n.id} className="flex items-start gap-3">
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-xl ${style.chip}`}
                    >
                      <Icon size={15} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-accent">
                        {n.description}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {n.timeAgo.replace(" ago", "")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-headings text-xl font-bold text-accent">
                Recent activity
              </h2>
              <span className="text-xs text-muted">Last 7 days</span>
            </div>
            <div className="space-y-4">
              {recentActivity.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.event} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl ${a.chip}`}
                    >
                      <Icon size={14} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-accent">
                        {a.event}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{a.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="text-xs text-muted">
          {strongMatches.length} strong matches · 1 active conversations · 18
          total in pipeline
        </div>
      </div>
    </div>
  );
}
