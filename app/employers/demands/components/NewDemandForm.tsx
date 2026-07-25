"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Plus, X } from "lucide-react"

const newDemandSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

export type NewDemandValues = z.infer<typeof newDemandSchema>

export function NewDemandForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewDemandValues>({
    resolver: zodResolver(newDemandSchema),
    defaultValues: { title: "", description: "" },
  })

  const [deliverables, setDeliverables] = useState([""])
  const [metrics, setMetrics] = useState([""])

  const addDeliverable = () => setDeliverables((prev) => [...prev, ""])
  const removeDeliverable = (i: number) => setDeliverables((prev) => prev.filter((_, j) => j !== i))
  const updateDeliverable = (i: number, val: string) =>
    setDeliverables((prev) => prev.map((d, j) => (j === i ? val : d)))

  const addMetric = () => setMetrics((prev) => [...prev, ""])
  const removeMetric = (i: number) => setMetrics((prev) => prev.filter((_, j) => j !== i))
  const updateMetric = (i: number, val: string) =>
    setMetrics((prev) => prev.map((m, j) => (j === i ? val : m)))

  const onSubmit = async (data: NewDemandValues) => {
    console.log("New demand ticket:", {
      ...data,
      deliverables: deliverables.filter(Boolean),
      successMetrics: metrics.filter(Boolean),
    })
    await new Promise((r) => setTimeout(r, 500))
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-1.5">
        <Label>Title</Label>
        <Input
          {...register("title")}
          placeholder="e.g., Self-serve analytics dashboard ownership"
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <textarea
          {...register("description")}
          placeholder="Describe the real challenge — not a generic job description..."
          className="w-full rounded-xl border border-soft-border bg-card px-3 py-2 text-sm outline-none resize-none transition-colors focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={4}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Deliverables */}
      <div className="space-y-2">
        <Label>Deliverables</Label>
        {deliverables.map((d, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-muted pt-2.5 text-sm">→</span>
            <div className="flex-1">
              <Input value={d} onChange={(e) => updateDeliverable(i, e.target.value)} placeholder="e.g., Self-serve dashboard MVP" />
            </div>
            {deliverables.length > 1 && (
              <button type="button" onClick={() => removeDeliverable(i)} className="text-muted hover:text-destructive pt-2">
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addDeliverable} className="flex items-center gap-1 text-xs text-brand font-medium hover:underline">
          <Plus size={14} /> Add deliverable
        </button>
      </div>

      {/* Success metrics */}
      <div className="space-y-2">
        <Label>Success metrics</Label>
        {metrics.map((m, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-muted pt-2.5 text-sm">→</span>
            <div className="flex-1">
              <Input value={m} onChange={(e) => updateMetric(i, e.target.value)} placeholder="e.g., Ad-hoc requests reduced by 60%" />
            </div>
            {metrics.length > 1 && (
              <button type="button" onClick={() => removeMetric(i)} className="text-muted hover:text-destructive pt-2">
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addMetric} className="flex items-center gap-1 text-xs text-brand font-medium hover:underline">
          <Plus size={14} /> Add metric
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create demand ticket"}
        </Button>
      </div>
    </form>
  )
}
