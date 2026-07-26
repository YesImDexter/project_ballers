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

const registerSchema = z
  .object({
    role: z.enum(["candidate", "employer"]),
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    institution: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>

function AuthInput({
  label,
  error,
  id,
  className,
  required,
  ...props
}: {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
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

export function RegisterForm({ defaultRole = "candidate" }: { defaultRole?: "candidate" | "employer" }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: defaultRole,
      name: defaultRole === "employer" ? "" : undefined,
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      institution: "",
    },
  })
  const role = watch("role")
  const router = useRouter()

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Register submit:", data)
    await new Promise((r) => setTimeout(r, 1000))
    if (data.role === "candidate") {
      router.push("/candidates/onboarding")
    } else {
      router.push(`/${data.role}s`)
    }
  }

  const roleSuffix = defaultRole === "employer" ? "&role=employer" : ""

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest font-medium text-muted">Join CareerOS</p>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          {role === "candidate" ? "Start your journey" : "Find your next hire"}
        </h2>
      </div>

      <AuthToggle
        value={role}
        onValueChange={(val) => setValue("role", val, { shouldValidate: true })}
      />

      {role === "employer" && (
        <AuthInput label="Full name" type="text" placeholder="John Doe" error={errors.name?.message} required {...register("name")} />
      )}
      <AuthInput label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} required {...register("email")} />
      <AuthInput label="Password" type="password" placeholder="••••••••" error={errors.password?.message} required {...register("password")} />
      <AuthInput label="Confirm password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} required {...register("confirmPassword")} />
      <AuthInput label="Phone Number" type="text" placeholder="123-456-7890" error={errors.phone?.message} {...register("phone")} />
      <AuthInput
        label={role === "candidate" ? "University / Institution" : "Company Name"}
        type="text"
        placeholder={role === "candidate" ? "e.g., Harvard University" : "e.g., Tech Corp"}
        error={errors.institution?.message}
        {...register("institution")}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account\u2026" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href={`/auth?mode=login${roleSuffix}`} className="text-accent underline underline-offset-2 hover:opacity-80">
          Sign in
        </Link>
      </p>
    </form>
  )
}
