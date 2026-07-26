import { hiringOutcomes } from "@/app/employers/data/outcomes_data"
import { ClipboardList, Plus } from "lucide-react"
import Link from "next/link"
import { Card } from "@/app/components/ui/card"

export default function OutcomesPage() {
  return (
    <div className="flex-1 bg-primary">
      <div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <h1 className="font-headings text-3xl font-bold leading-tight text-accent">Hiring Outcomes & Feedback</h1>
          <p className="mt-1 text-sm text-muted">
            Outcomes feed back into matching quality. Record what worked and what didn&apos;t.
          </p>
        </div>
        <Link
          href="/employers/outcomes/new"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 self-start rounded-full bg-accent px-4 text-sm font-medium text-secondary transition-opacity hover:opacity-90 text-center"
        >
          <Plus size={16} /> Record outcome
        </Link>
      </div>

      <div className="px-4 pb-8 sm:px-8">
        <h2 className="mb-4 font-headings text-lg font-bold text-accent">Recorded outcomes</h2>
        {hiringOutcomes.length === 0 ? (
          <Card className="p-12 text-center">
            <ClipboardList size={32} className="mx-auto text-muted" />
            <p className="mt-3 text-sm font-semibold text-accent">No outcomes recorded yet</p>
            <p className="mt-1 text-xs text-muted">Record your first hiring outcome to improve match quality.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {hiringOutcomes.map((outcome) => (
              <Card key={outcome.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-headings text-base font-bold text-accent">{outcome.candidateName}</h3>
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-secondary">
                      {outcome.role}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{outcome.feedback}</p>
                  <p className="mt-2 text-xs text-muted">{outcome.date}</p>
                </div>
                <div className="shrink-0 text-left sm:ml-4 sm:text-right">
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
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
