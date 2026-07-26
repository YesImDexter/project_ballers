"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Star } from "lucide-react"
import { useState } from "react"

const newOutcomeSchema = z.object({
  candidateName: z.string().min(1, "Candidate name is required"),
  role: z.string().min(1, "Role is required"),
  outcome: z.enum(["Hired", "Passed"]),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
})

export type NewOutcomeValues = z.infer<typeof newOutcomeSchema>

export function NewOutcomeForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewOutcomeValues>({
    resolver: zodResolver(newOutcomeSchema),
    defaultValues: { candidateName: "", role: "", outcome: "Hired", feedback: "", date: new Date().toISOString().split("T")[0] },
  })

  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const onSubmit = async (data: NewOutcomeValues) => {
    console.log("New outcome:", { ...data, rating })
    await new Promise((r) => setTimeout(r, 500))
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-1.5">
        <Label>Candidate name</Label>
        <Input {...register("candidateName")} placeholder="e.g., Devon Park" />
        {errors.candidateName && <p className="text-xs text-destructive">{errors.candidateName.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Role</Label>
        <Input {...register("role")} placeholder="e.g., Backend Engineer" />
        {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Outcome</Label>
        <select
          {...register("outcome")}
          className="w-full rounded-full border border-soft-border bg-card px-3 py-2 text-sm outline-none transition-colors focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="Hired">Hired</option>
          <option value="Passed">Passed</option>
        </select>
        {errors.outcome && <p className="text-xs text-destructive">{errors.outcome.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="transition-colors"
            >
              <Star
                size={24}
                className={star <= (hoveredStar || rating) ? "fill-amber-400 text-amber-400" : "text-soft-border"}
              />
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">{rating > 0 ? `${rating}/5` : "Click to rate"}</p>
      </div>

      <div className="space-y-1.5">
        <Label>Feedback</Label>
        <textarea
          {...register("feedback")}
          placeholder="What worked? What didn't? Any notable signals..."
          className="w-full rounded-xl border border-soft-border bg-card px-3 py-2 text-sm outline-none resize-none transition-colors focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={4}
        />
        {errors.feedback && <p className="text-xs text-destructive">{errors.feedback.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Date</Label>
        <Input type="date" {...register("date")} />
        {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save outcome"}
        </Button>
      </div>
    </form>
  )
}
