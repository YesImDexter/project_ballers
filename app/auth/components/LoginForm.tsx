"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  role: z.enum(["candidate", "employer"]),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

function AuthInput({
  label,
  error,
  id,
  className,
  ...props
}: {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} data-invalid={!!error || undefined} className={className} {...props} />
      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
    </div>
  )
}

function AuthToggle({
  value,
  onValueChange,
}: {
  value: "candidate" | "employer"
  onValueChange: (value: "candidate" | "employer") => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="leading-none select-none text-xs font-medium uppercase tracking-widest text-muted-foreground">I am a</label>
      <ToggleGroup
        value={[value]}
        onValueChange={(val) => { if (val.length > 0) onValueChange(val[0] as "candidate" | "employer") }}
        className="w-full"
      >
        <ToggleGroupItem value="candidate" className="flex-1 text-sm">Candidate</ToggleGroupItem>
        <ToggleGroupItem value="employer" className="flex-1 text-sm">Employer</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export function LoginForm({ defaultRole = "candidate" }: { defaultRole?: "candidate" | "employer" }) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: defaultRole, email: "", password: "" },
  })
  const role = watch("role")
  const router = useRouter()

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login submit:", data)
    await new Promise((r) => setTimeout(r, 1000))

    router.push(`/${data.role}s`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest font-medium text-muted">Welcome back</p>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          {role === "candidate" ? "Find your next opportunity" : "Hire top talent"}
        </h2>
      </div>
      <AuthToggle value={role} onValueChange={(val) => setValue("role", val, { shouldValidate: true })} />
      <AuthInput label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
      <AuthInput label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in\u2026" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-muted">
        No account yet?{" "}
        <Link href={`/auth?mode=register${defaultRole === "employer" ? "&role=employer" : ""}`} className="text-accent underline underline-offset-2 hover:opacity-80">
          Create one
        </Link>
      </p>
    </form>
  )
}
