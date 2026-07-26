"use client"

import { useState } from "react"
import { employerCompany } from "@/app/employers/data/company_data"
import { CompanyInfoForm } from "./components/CompanyInfoForm"
import { Pencil } from "lucide-react"

const fields: { key: keyof typeof employerCompany; label: string }[] = [
  { key: "name", label: "Company name" },
  { key: "industry", label: "Industry" },
  { key: "teamSize", label: "Team size" },
  { key: "location", label: "Location" },
  { key: "founded", label: "Founded" },
  { key: "website", label: "Website" },
]

export default function CompanyProfilePage() {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <div className="flex-1 bg-primary">
        <div className="px-8 py-6">
          <button onClick={() => setEditing(false)} className="mb-3 text-sm text-muted hover:text-accent">
            ← Back
          </button>
          <h1 className="text-[34px] font-bold leading-tight text-accent">Edit Company Profile</h1>
          <p className="mt-1 text-sm text-muted">Update the details candidates see before they swipe.</p>
        </div>
        <div className="max-w-2xl px-8 pb-8">
          <div className="rounded-2xl bg-card p-6 shadow-card">
            <CompanyInfoForm defaultValues={{ ...employerCompany }} onClose={() => setEditing(false)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-primary">
      <div className="flex items-start justify-between px-8 py-6">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-accent">Company Profile</h1>
          <p className="mt-1 text-sm text-muted">
            Candidates see this before deciding to swipe. Keep it specific and honest.
          </p>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Pencil size={15} />
          Edit
        </button>
      </div>

      <div className="space-y-8 px-8 pb-8">
        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">Company information</h2>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className="rounded-2xl bg-card px-5 py-4 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{field.label}</p>
                <p className="mt-1 text-sm font-medium text-accent">{employerCompany[field.key]}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">About</h2>
          <div className="rounded-2xl bg-card p-5 shadow-card">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">One-paragraph description</p>
            <p className="mt-2 text-sm leading-relaxed text-accent">{employerCompany.about}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">Hiring focus</h2>
          <div className="rounded-2xl bg-card p-5 shadow-card">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">What you&apos;re hiring for now</p>
            <p className="mt-2 text-sm leading-relaxed text-accent">{employerCompany.hiringFocus}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">Contact</h2>
          <div className="rounded-2xl bg-card p-5 shadow-card">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Hiring contact</p>
            <p className="mt-2 text-sm text-accent">{employerCompany.hiringContact}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
