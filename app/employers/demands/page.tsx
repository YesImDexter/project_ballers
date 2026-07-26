import Link from "next/link"
import { demandTickets, statusConfig } from "@/app/employers/data/demands_data"
import { Plus } from "lucide-react"
import { Card } from "@/app/components/ui/card"

export default function DemandTicketsPage() {
  return (
    <div className="flex-1 bg-primary">
      <div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <h1 className="font-headings text-3xl font-bold leading-tight text-accent">Demand Tickets</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Describe the real challenge — not a generic job description. The system builds a Demand Profile and finds matches.
          </p>
        </div>
        <Link
          href="/employers/demands/new"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-secondary transition-opacity hover:opacity-90 text-center w-fit"
        >
          <Plus size={16} /> New demand ticket
        </Link>
      </div>

      <div className="px-4 pb-8 sm:px-8">
        <h2 className="mb-4 font-headings text-lg font-bold text-accent">All tickets</h2>
        <div className="space-y-4">
          {demandTickets.map((ticket) => (
            <Card key={ticket.id} className="p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h3 className="font-headings text-lg font-bold text-accent">{ticket.title}</h3>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[ticket.status].className}`}>
                      {statusConfig[ticket.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted">Created {ticket.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-headings text-2xl font-bold text-accent">{ticket.matchesCount}</p>
                  <p className="text-xs uppercase tracking-wider text-muted">matches</p>
                </div>
              </div>

              <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted">{ticket.description}</p>

              <div className="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Deliverables</p>
                  <ul className="space-y-1.5">
                    {ticket.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-accent">
                        <span className="text-muted">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Success metrics</p>
                  <ul className="space-y-1.5">
                    {ticket.successMetrics.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-accent">
                        <span className="text-muted">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-soft-row-border pt-4">
                <Link
                  href={`/employers/matches?ticket=${ticket.id}`}
                  className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-secondary transition-opacity hover:opacity-90"
                >
                  Review matches
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
