import { hiringOutcomes } from "@/app/employers/data/outcomes_data"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function OutcomesPage() {
  return (
    <div className="flex-1 bg-primary">
      <div className="flex items-start justify-between px-8 py-6">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-accent">Hiring Outcomes & Feedback</h1>
          <p className="mt-1 text-sm text-muted">
            Outcomes feed back into matching quality. Record what worked and what didn&apos;t.
          </p>
        </div>
        <Link
          href="/employers/outcomes/new"
          className="inline-flex h-10 items-center gap-1.5 rounded border-2 border-accent bg-accent px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus size={16} /> Record outcome
        </Link>
      </div>

      <div className="px-8 pb-8">
        <h2 className="mb-4 font-headings text-lg font-bold text-accent">Recorded outcomes</h2>
        <div className="space-y-4">
          {hiringOutcomes.map((outcome) => (
            <div key={outcome.id} className="flex items-start justify-between rounded-2xl bg-card p-5 shadow-card">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-headings text-base font-bold text-accent">{outcome.candidateName}</h3>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-white">
                    {outcome.role}
                  </span>
                </div>
                <p className="text-sm text-muted">{outcome.feedback}</p>
                <p className="mt-2 text-xs text-muted">{outcome.date}</p>
              </div>
              <div className="ml-4 shrink-0 text-right">
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                    outcome.outcome === "Hired"
                      ? "bg-pastel-green text-signal-green"
                      : "bg-soft-surface text-muted"
                  }`}
                >
                  {outcome.outcome}
                </span>
                <p className="mt-2 font-headings text-2xl font-bold text-accent">
                  {outcome.rating}<span className="text-sm font-normal text-muted">/5</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
