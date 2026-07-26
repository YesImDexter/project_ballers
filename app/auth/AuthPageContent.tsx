"use client"

import { useSearchParams } from "next/navigation"
import { LoginForm } from "./components/LoginForm"
import { RegisterForm } from "./components/RegisterForm"

export function AuthPageContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") ?? "login"
  const rawRole = searchParams.get("role")
  const defaultRole: "candidate" | "employer" =
    rawRole === "employer" ? "employer" : "candidate"

  return mode === "register" ? (
    <RegisterForm defaultRole={defaultRole} />
  ) : (
    <LoginForm defaultRole={defaultRole} />
  )
}
