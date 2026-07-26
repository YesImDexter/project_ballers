"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { ChevronDown, Star } from "lucide-react"
import { useState } from "react"

const newOutcomeSchema = z.object({
  candidateName: z.string().min(1, "Candidate name is required"),
  role: z.string().min(1, "Role is required"),
  outcome: z.enum(["Hired", "Passed"]),
  rating: z.number().min(1, "Rating is required").max(5),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
})

export type NewOutcomeValues = z.infer<typeof newOutcomeSchema>

export function NewOutcomeForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewOutcomeValues>({
    resolver: zodResolver(newOutcomeSchema),
    defaultValues: { candidateName: "", role: "", outcome: "Hired", rating: 0, feedback: "", date: new Date().toISOString().split("T")[0] },
  })

  const rating = watch("rating")
  const [hoveredStar, setHoveredStar] = useState(0)

  const onSubmit = async (data: NewOutcomeValues) => {
    console.log("New outcome:", data)
    await new Promise((r) => setTimeout(r, 500))
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
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
        <div className="relative">
          <select
            {...register("outcome")}
            className="w-full appearance-none rounded-2xl border border-soft-border bg-secondary px-4 py-2.5 pr-10 text-sm outline-none transition-colors focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="Hired">Hired</option>
            <option value="Passed">Passed</option>
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
        </div>
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
              onClick={() => setValue("rating", star, { shouldValidate: true })}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={rating === star}
              className="transition-colors"
            >
              <Star
                size={24}
                className={star <= (hoveredStar || rating) ? "fill-signal-amber text-signal-amber" : "text-soft-border"}
              />
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">{rating > 0 ? `${rating}/5` : "Click to rate"}</p>
        {errors.rating && <p className="text-xs text-destructive">{errors.rating.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Feedback</Label>
        <Textarea
          {...register("feedback")}
          placeholder="What worked? What didn't? Any notable signals..."
          className="resize-none"
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
