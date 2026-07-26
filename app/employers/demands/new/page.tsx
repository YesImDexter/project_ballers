"use client"

import { NewDemandForm } from "@/app/employers/demands/components/NewDemandForm"
import { useRouter } from "next/navigation"

export default function NewDemandPage() {
  const router = useRouter()

  return (
    <div className="flex-1 bg-primary">
      <div className="px-4 py-6 sm:px-8">
        <button onClick={() => router.back()} className="mb-3 text-sm text-muted hover:text-accent">
          ← Back
        </button>
        <h1 className="font-headings text-3xl font-bold leading-tight text-accent">New Demand Ticket</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">Describe the real work to be done, then define deliverables and success metrics.</p>
      </div>
      <div className="max-w-2xl px-4 pb-8 sm:px-8">
        <div className="rounded-2xl bg-secondary p-6 shadow-card">
          <NewDemandForm onClose={() => router.push("/employers/demands")} />
        </div>
      </div>
    </div>
  )
}
