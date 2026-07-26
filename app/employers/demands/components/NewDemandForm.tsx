"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRef, useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Plus, X } from "lucide-react"

const newDemandSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

export type NewDemandValues = z.infer<typeof newDemandSchema>

interface ListRow {
  id: number
  value: string
}

export function NewDemandForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewDemandValues>({
    resolver: zodResolver(newDemandSchema),
    defaultValues: { title: "", description: "" },
  })

  const nextId = useRef(2)
  const [deliverables, setDeliverables] = useState<ListRow[]>([{ id: 0, value: "" }])
  const [metrics, setMetrics] = useState<ListRow[]>([{ id: 1, value: "" }])

  const addRow = (setRows: typeof setDeliverables) =>
    setRows((prev) => [...prev, { id: nextId.current++, value: "" }])
  const removeRow = (setRows: typeof setDeliverables, id: number) =>
    setRows((prev) => prev.filter((row) => row.id !== id))
  const updateRow = (setRows: typeof setDeliverables, id: number, value: string) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, value } : row)))

  const onSubmit = async (data: NewDemandValues) => {
    console.log("New demand ticket:", {
      ...data,
      deliverables: deliverables.map((d) => d.value).filter(Boolean),
      successMetrics: metrics.map((m) => m.value).filter(Boolean),
    })
    await new Promise((r) => setTimeout(r, 500))
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
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
        <Textarea
          {...register("description")}
          placeholder="Describe the real challenge — not a generic job description..."
          className="resize-none"
          rows={4}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Deliverables */}
      <div className="space-y-2">
        <Label>Deliverables</Label>
        {deliverables.map((row) => (
          <div key={row.id} className="flex gap-2">
            <span className="pt-2.5 text-sm text-muted">→</span>
            <div className="flex-1">
              <Input
                value={row.value}
                onChange={(e) => updateRow(setDeliverables, row.id, e.target.value)}
                placeholder="e.g., Self-serve dashboard MVP"
              />
            </div>
            {deliverables.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(setDeliverables, row.id)}
                aria-label="Remove deliverable"
                className="pt-2 text-muted hover:text-destructive"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addRow(setDeliverables)} className="flex items-center gap-1 text-xs font-medium text-brand hover:underline">
          <Plus size={14} /> Add deliverable
        </button>
      </div>

      {/* Success metrics */}
      <div className="space-y-2">
        <Label>Success metrics</Label>
        {metrics.map((row) => (
          <div key={row.id} className="flex gap-2">
            <span className="pt-2.5 text-sm text-muted">→</span>
            <div className="flex-1">
              <Input
                value={row.value}
                onChange={(e) => updateRow(setMetrics, row.id, e.target.value)}
                placeholder="e.g., Ad-hoc requests reduced by 60%"
              />
            </div>
            {metrics.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(setMetrics, row.id)}
                aria-label="Remove metric"
                className="pt-2 text-muted hover:text-destructive"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addRow(setMetrics)} className="flex items-center gap-1 text-xs font-medium text-brand hover:underline">
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
