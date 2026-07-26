"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { demandTickets, statusConfig } from "@/app/employers/data/demands_data";
import { candidateMatches } from "@/app/employers/data/matches_data";
import { chatCandidates } from "@/app/employers/data/chat_data";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";

type MatchTab = "by_demand" | "mutual";

const mutualCandidateNames = chatCandidates.map((c) => c.name);

// Matches and chat use different id spaces; bridge by candidate name.
function chatHrefFor(name: string) {
  const chatCandidate = chatCandidates.find((c) => c.name === name);
  return chatCandidate
    ? `/employers/chat?candidate=${chatCandidate.id}`
    : "/employers/chat";
}

const statCards = [
  {
    key: "activeTickets",
    label: "Active demand tickets",
    hint: "With at least one candidate match",
    className: "bg-pastel-blue border-pastel-blue",
  },
  {
    key: "strongMatches",
    label: "Strong matches",
    hint: "≥ 80% fit score across tickets",
    className: "bg-pastel-green border-pastel-green",
  },
  {
    key: "avgScore",
    label: "Avg. match score",
    hint: "All matches, all tickets",
    suffix: "%",
    className: "bg-pastel-orange border-pastel-orange",
  },
  {
    key: "mutualMatches",
    label: "Mutual matches",
    hint: "Unique candidates in pool",
    className: "bg-pastel-purple border-pastel-purple",
  },
] as const;

function MatchesContent() {
  const searchParams = useSearchParams();
  const ticketParam = searchParams.get("ticket");
  const validTicketParam = demandTickets.some((t) => t.id === ticketParam)
    ? ticketParam
    : null;

  const [tab, setTab] = useState<MatchTab>("by_demand");
  const [expanded, setExpanded] = useState<string[]>([
    validTicketParam ?? "d1",
  ]);
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(
    validTicketParam,
  );

  const stats = {
    activeTickets: demandTickets.filter((t) => t.matchesCount > 0).length,
    strongMatches: candidateMatches.filter(
      (m) => m.scoreLabel === "Strong Match",
    ).length,
    avgScore: Math.round(
      candidateMatches.reduce((sum, m) => sum + m.score, 0) /
        candidateMatches.length,
    ),
    mutualMatches: mutualCandidateNames.length,
  };

  const filteredTickets = selectedTicket
    ? demandTickets.filter((t) => t.id === selectedTicket)
    : demandTickets;

  const mutualMatches = candidateMatches
    .filter((match) => mutualCandidateNames.includes(match.name))
    .sort((a, b) => b.score - a.score)
    .filter(
      (match, index, matches) =>
        matches.findIndex((item) => item.name === match.name) === index,
    )
    .filter(
      (match) =>
        search === "" ||
        match.name.toLowerCase().includes(search.toLowerCase()) ||
        match.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase()),
        ),
    );

  const switchTab = (next: MatchTab) => {
    setTab(next);
    setSearch("");
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const matchScoreClass = (score: number) =>
    score >= 80
      ? "text-signal-green"
      : score >= 65
        ? "text-signal-amber"
        : "text-signal-red";

  return (
    <div className="flex-1 bg-primary">
      <div className="px-4 py-6 sm:px-8">
        <h1 className="font-headings text-3xl font-bold leading-tight text-accent">
          Candidate Matches
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Matches are grouped by the demand ticket they belong to. Expand a
          ticket to inspect candidates and decide.
        </p>
      </div>

      <div className="space-y-6 px-4 pb-8 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className={`rounded-2xl border p-6 transition-shadow ${card.className}`}
            >
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted">
                {card.label}
              </p>
              <p className="mt-2 font-headings text-4xl font-bold text-accent">
                {stats[card.key]}
                {"suffix" in card ? card.suffix : ""}
              </p>
              <p className="mt-2 text-xs text-muted">{card.hint}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full bg-secondary p-1 shadow-card">
            <button
              onClick={() => switchTab("by_demand")}
              className={`h-9 rounded-full px-4 text-sm font-medium transition-colors ${
                tab === "by_demand"
                  ? "bg-accent text-secondary shadow-card"
                  : "text-muted hover:text-accent"
              }`}
            >
              By demand ticket
            </button>
            <button
              onClick={() => switchTab("mutual")}
              className={`h-9 rounded-full px-4 text-sm font-medium transition-colors ${
                tab === "mutual"
                  ? "bg-accent text-secondary shadow-card"
                  : "text-muted hover:text-accent"
              }`}
            >
              Mutual{" "}
              <span className="ml-1 rounded-full bg-soft-surface px-1.5 text-[10px] text-muted">
                {stats.mutualMatches}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tab === "by_demand" && (
            <>
              <button
                onClick={() => setSelectedTicket(null)}
                className={`h-9 rounded-full border px-3.5 text-xs transition-colors ${
                  selectedTicket === null
                    ? "border-accent bg-accent text-secondary"
                    : "border-soft-border bg-secondary text-accent hover:bg-soft-surface"
                }`}
              >
                All tickets{" "}
                <span className="ml-1 rounded-full bg-soft-surface px-1.5 text-[10px] text-muted">
                  {candidateMatches.length}
                </span>
              </button>
              {demandTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`h-9 max-w-[220px] truncate rounded-full border px-3.5 text-xs transition-colors ${
                    selectedTicket === ticket.id
                      ? "border-accent bg-accent text-secondary"
                      : "border-soft-border bg-secondary text-accent hover:bg-soft-surface"
                  }`}
                >
                  {ticket.title}{" "}
                  <span className="ml-1 rounded-full bg-soft-surface px-1.5 text-[10px] text-muted">
                    {
                      candidateMatches.filter(
                        (m) => m.demandTicketId === ticket.id,
                      ).length
                    }
                  </span>
                </button>
              ))}
              <div className="relative w-full sm:ml-auto sm:w-64">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted"
                />
                <Input
                  type="text"
                  placeholder="Filter candidates…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="!bg-secondary !pl-9"
                />
              </div>
            </>
          )}
        </div>

        {tab === "mutual" ? (
          <div className="overflow-hidden rounded-2xl bg-secondary shadow-card">
            <div className="flex items-center justify-between gap-3 border-b border-soft-row-border p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  Mutual matches
                </p>
                <h2 className="font-headings text-lg font-bold text-accent">
                  Candidates who swiped back
                </h2>
              </div>
              <span className="shrink-0 rounded-full bg-pastel-purple px-2.5 py-1 text-xs font-medium text-signal-purple">
                {mutualMatches.length} mutual
              </span>
            </div>
            <div className="divide-y divide-soft-row-border">
              {mutualMatches.length > 0 ? (
                mutualMatches.map((match) => (
                  <Link
                    key={match.id}
                    href={chatHrefFor(match.name)}
                    className="flex flex-col gap-4 p-5 transition-colors hover:bg-soft-hover sm:flex-row sm:items-center"
                  >
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent font-headings text-sm font-bold text-secondary">
                      {match.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-accent">
                          {match.name}
                        </p>
                        <span className="rounded-full bg-pastel-green px-2 py-0.5 text-[10px] font-medium text-signal-green">
                          Mutual
                        </span>
                      </div>
                      <p className="text-xs text-muted">{match.school}</p>
                      <p className="mt-1 truncate text-sm text-muted">
                        {match.matchReason}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {match.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-soft-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p
                        className={`font-headings text-2xl font-bold ${matchScoreClass(match.score)}`}
                      >
                        {match.score}%
                      </p>
                      <p className="text-[10px] text-muted">
                        {match.scoreLabel}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-sm text-muted">
                  No mutual matches found.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => {
              const matches = candidateMatches.filter(
                (m) =>
                  m.demandTicketId === ticket.id &&
                  (search === "" ||
                    m.name.toLowerCase().includes(search.toLowerCase()) ||
                    m.skills.some((skill) =>
                      skill.toLowerCase().includes(search.toLowerCase()),
                    )),
              );
              const isExpanded = expanded.includes(ticket.id);
              const strongCount = matches.filter(
                (m) => m.scoreLabel === "Strong Match",
              ).length;

              return (
                <div
                  key={ticket.id}
                  className="overflow-hidden rounded-2xl bg-secondary shadow-card"
                >
                  <button
                    onClick={() => toggleExpand(ticket.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-soft-hover"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-soft-surface text-accent">
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-widest text-muted">
                          Demand ticket
                        </p>
                        <p className="font-headings font-bold text-accent">
                          {ticket.title}
                        </p>
                        <p className="truncate text-sm text-muted">
                          {ticket.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[ticket.status].className}`}
                      >
                        {statusConfig[ticket.status].label}
                      </span>
                      <p className="mt-1 text-xs text-muted">
                        {matches.length} · {strongCount} strong
                      </p>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="overflow-x-auto border-t border-soft-row-border">
                      <table className="w-full min-w-150 text-sm">
                        <thead className="bg-soft-hover">
                          <tr className="text-left text-[10px] uppercase tracking-widest text-muted">
                            <th className="px-5 py-2.5 font-medium">
                              Candidate
                            </th>
                            <th className="px-5 py-2.5 font-medium">
                              Why matched
                            </th>
                            <th className="px-5 py-2.5 font-medium">Skills</th>
                            <th className="px-5 py-2.5 font-medium">Match</th>
                            <th className="px-5 py-2.5 font-medium" />
                          </tr>
                        </thead>
                        <tbody>
                          {matches.map((match) => (
                            <tr
                              key={match.id}
                              className="border-t border-soft-row-border transition-colors hover:bg-soft-hover"
                            >
                              <td className="px-5 py-4">
                                <Link
                                  href={chatHrefFor(match.name)}
                                  className="group flex items-center gap-3"
                                >
                                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent font-headings text-sm font-bold text-secondary">
                                    {match.initials}
                                  </div>
                                  <div>
                                    <p className="font-medium text-accent group-hover:text-brand">
                                      {match.name}
                                    </p>
                                    <p className="text-xs text-muted">
                                      {match.school}
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="max-w-xs px-5 py-4 text-sm text-muted">
                                {match.matchReason}
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex flex-wrap gap-1.5">
                                  {match.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="rounded-full bg-soft-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <p
                                  className={`font-headings text-xl font-bold ${matchScoreClass(match.score)}`}
                                >
                                  {match.score}%
                                </p>
                                <p className="text-[10px] text-muted">
                                  {match.scoreLabel}
                                </p>
                              </td>
                              <td className="px-5 py-4">
                                <Link
                                  href={chatHrefFor(match.name)}
                                  className="text-xs font-medium text-brand hover:underline"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense>
      <MatchesContent />
    </Suspense>
  );
}
