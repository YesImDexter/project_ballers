"use client"

import { useState } from "react"
import { employerCompany } from "@/app/employers/data/company_data"
import { CompanyInfoForm } from "./components/CompanyInfoForm"
import { Pencil } from "lucide-react"
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

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
        <div className="px-4 py-6 sm:px-8">
          <button onClick={() => setEditing(false)} className="mb-3 text-sm text-muted hover:text-accent">
            ← Back
          </button>
          <h1 className="font-headings text-3xl font-bold leading-tight text-accent">Edit Company Profile</h1>
          <p className="mt-1 text-sm text-muted">Update the details candidates see before they swipe.</p>
        </div>
        <div className="max-w-2xl px-4 pb-8 sm:px-8">
          <Card className="p-6">
            <CompanyInfoForm defaultValues={{ ...employerCompany }} onClose={() => setEditing(false)} />
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-primary">
      <div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <h1 className="font-headings text-3xl font-bold leading-tight text-accent">Company Profile</h1>
          <p className="mt-1 text-sm text-muted">
            Candidates see this before deciding to swipe. Keep it specific and honest.
          </p>
        </div>
        <Button
          onClick={() => setEditing(true)}
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-secondary transition-opacity hover:opacity-90"
        >
          <Pencil size={15} />
          Edit
        </Button>
      </div>

      <div className="space-y-8 px-4 pb-8 sm:px-8">
        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">Company information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <Card key={field.key} className="px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{field.label}</p>
                <p className="mt-1 text-sm font-medium text-accent">{employerCompany[field.key]}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">About</h2>
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">One-paragraph description</p>
            <p className="mt-2 text-sm leading-relaxed text-accent">{employerCompany.about}</p>
          </Card>
        </section>

        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">Hiring focus</h2>
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">What you&apos;re hiring for now</p>
            <p className="mt-2 text-sm leading-relaxed text-accent">{employerCompany.hiringFocus}</p>
          </Card>
        </section>

        <section>
          <h2 className="mb-4 font-headings text-lg font-bold text-accent">Contact</h2>
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Hiring contact</p>
            <p className="mt-2 text-sm text-accent">{employerCompany.hiringContact}</p>
          </Card>
        </section>
      </div>
    </div>
  )
}
