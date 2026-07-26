"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, ExternalLink, Lock, Send } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import {
  chatCandidates,
  chatDetails,
  stageConfig,
  type ChatCandidate,
  type ChatDetail,
  type PipelineStage,
} from "@/app/employers/data/chat_data"

const stageOrder: PipelineStage[] = ["match", "chat", "interview", "trial", "offer", "onboarding"]

function stageProgress(stage: PipelineStage) {
  const index = stageOrder.indexOf(stage)
  return `${(index / (stageOrder.length - 1)) * 100}%`
}

const outlineButtonClass =
  "!bg-secondary !text-accent border-soft-border !px-4 !py-2 hover:!bg-soft-hover"
const dangerButtonClass =
  "!bg-secondary !text-signal-red border-pastel-red !px-4 !py-2 hover:!bg-pastel-red"

// ponytail: all pipeline mutations live in page-local state; swap for API calls when a backend exists.
interface Message {
  side: "left" | "right"
  text: string
}

interface InterviewRound {
  title: string
  person: string
  status: "Completed" | "Scheduled"
  date: string
  notes: string
}

interface CandidateState {
  stage: PipelineStage
  declined: boolean
  messages: Message[]
  rounds: InterviewRound[]
  checklist: boolean[]
  offerResent: boolean
}

const onboardingItems = ["Sign offer letter", "Background check", "Laptop shipped", "Day-1 buddy assigned", "First-week onboarding plan"]

function initialCandidateState(candidate: ChatCandidate): CandidateState {
  return {
    stage: candidate.stage,
    declined: false,
    messages: [
      { side: "left", text: "Thanks for the match — the dashboard brief looks close to work I shipped in DataLens." },
      { side: "right", text: "Great. We care most about query builder UX and role-based access. Can you walk us through your approach?" },
      { side: "left", text: "Yes. I would start with saved views, then add constrained filters before exposing free-form SQL." },
    ],
    rounds: [
      { title: "Round 1 · Video · 45 min", person: "Jordan Hale · Eng Manager", status: "Completed", date: "2026-06-02", notes: "Strong ownership story. Probe async collaboration next." },
      { title: "Round 2 · Product collaboration", person: "Mina Lee · PM", status: "Scheduled", date: "Thu 11:00 ET", notes: "Review requirements prioritization and tradeoffs." },
    ],
    checklist: onboardingItems.map(() => false),
    offerResent: false,
  }
}

type UpdateState = (updater: (prev: CandidateState) => CandidateState) => void

function MatchPanel({ detail, state, update }: { detail: ChatDetail; state: CandidateState; update: UpdateState }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-soft-border p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">Match score</p>
        <div className="mt-3 flex items-end gap-2">
          <span className="font-headings text-4xl font-bold text-accent">{detail.matchScore}</span>
          <span className="pb-1 text-sm text-muted">/ 100</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-soft-row-border">
          <div className="h-full rounded-full bg-accent" style={{ width: `${detail.matchScore}%` }} />
        </div>
        <p className="mt-3 text-sm text-muted">Candidate expects: {detail.salaryExpectation}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold text-accent">Why this matched</h3>
          <ul className="mt-3 space-y-2">
            {detail.whyMatched.map((reason) => (
              <li key={reason} className="flex gap-2 text-sm text-muted"><span className="text-success-text">•</span>{reason}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-semibold text-accent">Demand requirements</h3>
          <ul className="mt-3 space-y-2">
            {detail.demandRequirements.map((item) => (
              <li key={item} className="text-sm text-muted">→ {item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">Matching skills</p>
          <div className="flex flex-wrap gap-2">
            {detail.matchingSkills.map((skill) => <span key={skill} className="rounded-full bg-soft-surface px-3 py-1 text-xs text-accent">{skill}</span>)}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">Gaps to probe</p>
          <div className="flex flex-wrap gap-2">
            {detail.gapsToProbe.map((gap) => <span key={gap} className="rounded-full bg-warm-active px-3 py-1 text-xs text-warm-text">{gap}</span>)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <Button className="!px-4 !py-2" disabled={state.declined} onClick={() => update((s) => ({ ...s, stage: "interview" }))}>
          Schedule interview
        </Button>
        <Button
          className="border-success-border !bg-success-panel !px-4 !py-2 !text-success-text hover:!bg-success-panel/80"
          disabled={state.declined}
          onClick={() => update((s) => ({ ...s, stage: "trial" }))}
        >
          Send trial brief
        </Button>
        <Button
          className="border-purple-border !bg-purple-panel !px-4 !py-2 !text-purple-text hover:!bg-purple-panel/80"
          disabled={state.declined}
          onClick={() => update((s) => ({ ...s, stage: "offer" }))}
        >
          Extend offer
        </Button>
        <Button className={dangerButtonClass} disabled={state.declined} onClick={() => update((s) => ({ ...s, declined: true }))}>
          Decline candidate
        </Button>
      </div>
    </div>
  )
}

function ChatPanel({ selected, state, update }: { selected: ChatCandidate; state: CandidateState; update: UpdateState }) {
  const [draft, setDraft] = useState("")

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return
    update((s) => ({ ...s, messages: [...s.messages, { side: "right", text }] }))
    setDraft("")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-soft-border p-4">
        {state.messages.map((message, index) => (
          <div key={index} className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm sm:max-w-[60%] ${message.side === "right" ? "bg-accent text-secondary" : "bg-soft-surface text-accent"}`}>{message.text}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-soft-border p-3">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          placeholder={`Write a message to ${selected.name}...`}
          className="min-h-20 !rounded-lg border-soft-border"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">Trial tasks and interviews are tracked in this thread.</p>
          <div className="flex gap-2">
            <Button
              className={outlineButtonClass}
              disabled={state.declined}
              onClick={() =>
                update((s) => ({
                  ...s,
                  stage: "interview",
                  messages: [...s.messages, { side: "right", text: "We'd like to propose an interview — does this week work for you?" }],
                }))
              }
            >
              Propose interview
            </Button>
            <Button className="!px-4 !py-2" onClick={sendMessage} disabled={!draft.trim()}>
              <span className="inline-flex items-center gap-1">Send <Send size={14} /></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InterviewPanel({ state, update }: { state: CandidateState; update: UpdateState }) {
  return (
    <div className="space-y-4">
      {state.rounds.map((round) => (
        <div key={round.title} className="rounded-xl border border-soft-border p-4">
          <div className="flex items-start justify-between gap-3">
            <div><p className="font-medium text-accent">{round.title}</p><p className="text-sm text-muted">{round.person}</p></div>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${round.status === "Completed" ? "bg-success-panel text-success-text" : "bg-info-panel text-info-text"}`}>{round.status}</span>
          </div>
          <p className="mt-2 text-xs text-muted">{round.date}</p>
          <p className="mt-3 text-sm text-muted">{round.notes}</p>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <Button
          className={outlineButtonClass}
          disabled={state.declined}
          onClick={() =>
            update((s) => ({
              ...s,
              rounds: [
                ...s.rounds,
                { title: `Round ${s.rounds.length + 1} · To schedule`, person: "Interviewer TBD", status: "Scheduled", date: "Pick a slot", notes: "Agenda to be defined." },
              ],
            }))
          }
        >
          Add interview
        </Button>
        <Button
          className="border-success-border !bg-success-panel !px-4 !py-2 !text-success-text hover:!bg-success-panel/80"
          disabled={state.declined}
          onClick={() =>
            update((s) => ({
              ...s,
              stage: "trial",
              rounds: s.rounds.map((r) => ({ ...r, status: "Completed" as const })),
            }))
          }
        >
          Mark passed
        </Button>
        <Button className={dangerButtonClass} disabled={state.declined} onClick={() => update((s) => ({ ...s, declined: true }))}>
          Mark failed
        </Button>
      </div>
    </div>
  )
}

function TrialPanel({ detail, state, update }: { detail: ChatDetail; state: CandidateState; update: UpdateState }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-soft-border p-4">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">Brief</p>
        <p className="mt-2 text-sm text-accent">Prototype a self-serve query builder for non-technical PMs using the demand requirements below.</p>
      </div>
      <div className="rounded-xl border border-soft-border p-4">
        <div className="mb-3 flex items-center justify-between"><p className="font-medium text-accent">Deliverables</p><span className="rounded-full bg-success-panel px-2.5 py-0.5 text-xs text-success-text">Reviewed · Score 4.5 / 5</span></div>
        <div className="space-y-2">
          {detail.demandRequirements.map((item, index) => <div key={item} className="flex items-center gap-2 text-sm text-muted"><CheckCircle2 size={16} className={index < 2 ? "text-success-text" : "text-muted"} />{item}</div>)}
        </div>
        <span className="mt-3 block text-sm text-muted">github.com/maya/query-builder-trial</span>
      </div>
      <div className="rounded-xl border border-warm-border bg-warm-active p-4 text-sm text-accent">Internal feedback: strong UX flow; add clearer API failure handling before final offer.</div>
      <Button className="!px-4 !py-2" disabled={state.declined} onClick={() => update((s) => ({ ...s, stage: "offer" }))}>
        Advance
      </Button>
    </div>
  )
}

function OfferPanel({ selected, detail, state, update }: { selected: ChatCandidate; detail: ChatDetail; state: CandidateState; update: UpdateState }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-soft-border p-4 sm:flex-row sm:items-start sm:justify-between">
        <div><span className="rounded-full bg-pastel-amber px-2.5 py-0.5 text-xs font-medium text-signal-amber">Pending acceptance</span><p className="mt-3 font-medium text-accent">{selected.companyTitle}</p></div>
        <p className="text-sm text-muted">Respond by 2026-06-20</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-soft-border p-4"><p className="text-xs text-muted">Compensation</p><p className="mt-2 font-semibold text-accent">$108,000 base</p><p className="text-xs text-muted">+ 0.05% equity</p></div>
        <div className="rounded-xl border border-soft-border p-4"><p className="text-xs text-muted">Start date</p><p className="mt-2 font-semibold text-accent">2026-07-06</p></div>
        <div className="rounded-xl border border-soft-border p-4"><p className="text-xs text-muted">Location</p><p className="mt-2 font-semibold text-accent">Remote · US</p></div>
      </div>
      <p className="text-sm text-muted">Candidate expectation: {detail.salaryExpectation}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button className={outlineButtonClass} disabled={state.declined} onClick={() => update((s) => ({ ...s, offerResent: true }))}>
          Resend offer
        </Button>
        <Button className="!px-4 !py-2" disabled={state.declined} onClick={() => update((s) => ({ ...s, stage: "onboarding" }))}>
          Mark accepted
        </Button>
        <Button className={dangerButtonClass} disabled={state.declined} onClick={() => update((s) => ({ ...s, declined: true }))}>
          Withdraw offer
        </Button>
        {state.offerResent && <span className="text-xs font-medium text-success-text">Offer resent ✓</span>}
      </div>
    </div>
  )
}

function OnboardingPanel({ state, update }: { state: CandidateState; update: UpdateState }) {
  const unlocked = state.stage === "onboarding" && !state.declined
  const doneCount = state.checklist.filter(Boolean).length

  return (
    <div className="space-y-4">
      {!unlocked && (
        <div className="flex items-center gap-3 rounded-xl border border-soft-border bg-soft-surface p-4 text-sm text-muted"><Lock size={18} /> Onboarding unlocks once the candidate accepts the offer.</div>
      )}
      <div className="rounded-xl border border-soft-border p-4">
        <div className="mb-3 flex items-center justify-between"><p className="font-medium text-accent">Checklist</p><span className="text-xs text-muted">{doneCount} / {onboardingItems.length}</span></div>
        <div className="space-y-2">
          {onboardingItems.map((item, index) => (
            <button
              key={item}
              disabled={!unlocked}
              onClick={() =>
                update((s) => ({
                  ...s,
                  checklist: s.checklist.map((checked, i) => (i === index ? !checked : checked)),
                }))
              }
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${unlocked ? "text-accent hover:bg-soft-hover" : "text-muted opacity-60"}`}
              aria-pressed={state.checklist[index]}
            >
              <span className={`grid size-4 shrink-0 place-items-center rounded border ${state.checklist[index] ? "border-accent bg-accent text-secondary" : "border-soft-border"}`}>
                {state.checklist[index] && <CheckCircle2 size={12} />}
              </span>
              <span className={state.checklist[index] ? "line-through" : ""}>{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StagePanel({ stage, selected, detail, state, update }: { stage: PipelineStage; selected: ChatCandidate; detail: ChatDetail; state: CandidateState; update: UpdateState }) {
  if (stage === "match") return <MatchPanel detail={detail} state={state} update={update} />
  if (stage === "chat") return <ChatPanel selected={selected} state={state} update={update} />
  if (stage === "interview") return <InterviewPanel state={state} update={update} />
  if (stage === "trial") return <TrialPanel detail={detail} state={state} update={update} />
  if (stage === "offer") return <OfferPanel selected={selected} detail={detail} state={state} update={update} />
  return <OnboardingPanel state={state} update={update} />
}

function ChatContent() {
  const searchParams = useSearchParams()
  const candidateParam = searchParams.get("candidate")
  const initialCandidate =
    chatCandidates.find((c) => c.id === candidateParam) ?? chatCandidates[0] ?? null

  const [selectedId, setSelectedId] = useState(initialCandidate?.id ?? null)
  const [candidateStates, setCandidateStates] = useState<Record<string, CandidateState>>(() =>
    Object.fromEntries(chatCandidates.map((c) => [c.id, initialCandidateState(c)]))
  )
  const [activeStage, setActiveStage] = useState<PipelineStage>(initialCandidate?.stage ?? "match")

  const selected = chatCandidates.find((candidate) => candidate.id === selectedId)
  const detail = selectedId ? chatDetails[selectedId] : null
  const state = selectedId ? candidateStates[selectedId] : null

  const selectCandidate = (candidate: ChatCandidate) => {
    setSelectedId(candidate.id)
    setActiveStage(candidateStates[candidate.id]?.stage ?? candidate.stage)
  }

  const updateSelected: UpdateState = (updater) => {
    if (!selectedId) return
    setCandidateStates((prev) => {
      const next = updater(prev[selectedId])
      if (next.stage !== prev[selectedId].stage) setActiveStage(next.stage)
      return { ...prev, [selectedId]: next }
    })
  }

  return (
    <div className="flex-1 bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8">
          <h1 className="font-headings text-3xl font-bold leading-tight text-accent">Chat, Interview & Trial Tasks</h1>
          <p className="mt-1 text-sm text-muted">Manage every mutual match by demand ticket — from intro chat to onboarding.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="overflow-hidden rounded-2xl bg-secondary shadow-card">
            <div className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Candidates in pipeline</div>
            {chatCandidates.map((candidate, index) => {
              const candidateState = candidateStates[candidate.id]
              const config = stageConfig[candidateState.stage]
              const isActive = selectedId === candidate.id
              const avatarClass = index % 2 === 0 ? "bg-warm-active text-warm-text" : "border border-success-border bg-secondary text-warm-text"
              return (
                <button key={candidate.id} onClick={() => selectCandidate(candidate)} className={`flex w-full gap-3 border-b border-soft-border px-4 py-3 text-left transition-colors last:border-0 ${isActive ? candidateState.stage === "interview" ? "bg-success-panel" : "bg-warm-active" : "hover:bg-soft-hover"}`}>
                  <div className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold ${avatarClass}`}>{candidate.initials}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-medium text-accent">{candidate.name}</p><span className="text-xs text-muted">{candidate.timeAgo}</span></div>
                    <p className="mt-0.5 truncate text-xs text-muted">for {candidate.companyTitle}</p>
                    <p className="mt-1 truncate text-sm font-medium text-accent">{candidate.demandTitle}</p>
                    {candidateState.declined ? (
                      <span className="mt-2 inline-block rounded-full bg-pastel-red px-2.5 py-0.5 text-xs font-medium text-signal-red">Declined</span>
                    ) : (
                      <span className="mt-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-secondary">{config.label}</span>
                    )}
                  </div>
                </button>
              )
            })}
          </aside>

          <section className="overflow-hidden rounded-2xl bg-secondary shadow-card">
            {selected && detail && state ? (
              <>
                <div className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-warm-active text-base font-bold text-warm-text">{selected.initials}</div>
                      <div>
                        <h2 className="text-lg font-bold text-accent">{selected.name}</h2>
                        <p className="text-sm text-muted">Applying for {selected.companyTitle}</p>
                        <Link href="/employers/matches" className="mt-1 inline-flex items-center gap-1 text-sm text-signal-blue hover:underline">Demand: {selected.demandTitle} <ExternalLink size={12} /></Link>
                      </div>
                    </div>
                    {state.declined ? (
                      <div className="shrink-0 rounded-full bg-pastel-red px-3 py-1 text-xs font-medium text-signal-red">Declined</div>
                    ) : (
                      <div className="shrink-0 rounded-full bg-soft-surface px-3 py-1 text-xs font-medium text-accent">{stageConfig[activeStage].label} · step {stageConfig[activeStage].step} / 6</div>
                    )}
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-soft-row-border"><div className="h-full rounded-full bg-accent transition-all" style={{ width: stageProgress(activeStage) }} /></div>
                </div>

                <div className="border-y border-soft-row-border px-5 py-3">
                  <div className="flex flex-wrap gap-2">
                    {stageOrder.map((stage) => {
                      const actualIndex = stageOrder.indexOf(state.stage)
                      const index = stageOrder.indexOf(stage)
                      const isActive = activeStage === stage
                      const isFuture = index > actualIndex
                      return (
                        <button key={stage} onClick={() => setActiveStage(stage)} className={`h-8 rounded-xl border-2 px-2 py-1.5 text-xs transition ${isActive ? "border-accent bg-secondary font-medium text-accent" : isFuture ? "border-soft-border text-muted opacity-50 hover:opacity-100" : "border-soft-border text-accent hover:bg-soft-hover"}`}>
                          {stageConfig[stage].label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-6 p-5">
                  <StagePanel stage={activeStage} selected={selected} detail={detail} state={state} update={updateSelected} />

                  <div className="border-t border-soft-row-border pt-5">
                    <h3 className="mb-3 text-sm font-semibold text-accent">Progress history</h3>
                    <div className="space-y-2">
                      {detail.progressHistory.map((item) => (
                        <div key={item.event} className="flex items-center justify-between gap-4 text-sm text-muted">
                          <span>{item.event}</span>
                          <span className="text-xs text-muted">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-40 items-center justify-center text-sm text-muted">Select a candidate to view details</div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatContent />
    </Suspense>
  )
}
