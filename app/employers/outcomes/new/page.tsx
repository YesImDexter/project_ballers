"use client"

import { NewOutcomeForm } from "@/app/employers/outcomes/components/NewOutcomeForm"
import { useRouter } from "next/navigation"

export default function NewOutcomePage() {
  const router = useRouter()

  return (
    <div className="flex-1 bg-primary">
      <div className="px-8 py-6">
        <button onClick={() => router.back()} className="mb-3 text-sm text-muted hover:text-accent">
          ← Back
        </button>
        <h1 className="text-[34px] font-bold leading-tight text-accent">Record Outcome</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Log the result of a hiring engagement — what worked, what didn&apos;t, and how the candidate performed.
        </p>
      </div>
      <div className="max-w-2xl px-8 pb-8">
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <NewOutcomeForm onClose={() => router.push("/employers/outcomes")} />
        </div>
      </div>
    </div>
  )
}
