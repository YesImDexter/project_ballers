"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"

const companyInfoSchema = z.object({
  name: z.string().min(1, "Required"),
  industry: z.string().min(1, "Required"),
  teamSize: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  founded: z.string().min(1, "Required"),
  website: z.string().min(1, "Required"),
  about: z.string().min(1, "Required"),
  hiringFocus: z.string().min(1, "Required"),
  hiringContact: z.string().email("Valid email required"),
})

type CompanyInfoValues = z.infer<typeof companyInfoSchema>

export function CompanyInfoForm({
  defaultValues,
  onClose,
}: {
  defaultValues: CompanyInfoValues
  onClose: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyInfoValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues,
  })

  const onSubmit = async (data: CompanyInfoValues) => {
    console.log("Company info update:", data)
    await new Promise((r) => setTimeout(r, 500))
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Company name</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Industry</Label>
          <Input {...register("industry")} />
          {errors.industry && <p className="text-xs text-destructive">{errors.industry.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Team size</Label>
          <Input {...register("teamSize")} />
          {errors.teamSize && <p className="text-xs text-destructive">{errors.teamSize.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Location</Label>
          <Input {...register("location")} />
          {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Founded</Label>
          <Input {...register("founded")} />
          {errors.founded && <p className="text-xs text-destructive">{errors.founded.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Website</Label>
          <Input {...register("website")} />
          {errors.website && <p className="text-xs text-destructive">{errors.website.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>About</Label>
        <Textarea {...register("about")} className="resize-none" rows={3} />
        {errors.about && <p className="text-xs text-destructive">{errors.about.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Hiring focus</Label>
        <Textarea {...register("hiringFocus")} className="resize-none" rows={2} />
        {errors.hiringFocus && <p className="text-xs text-destructive">{errors.hiringFocus.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Hiring contact</Label>
        <Input {...register("hiringContact")} />
        {errors.hiringContact && <p className="text-xs text-destructive">{errors.hiringContact.message}</p>}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
