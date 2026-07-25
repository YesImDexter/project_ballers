"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export interface AppShellUser {
  initials: string
  name: string
}

export function AppShell({
  navItems,
  user,
  children,
  brand = "CareerOS",
  brandSubtitle = "Employer",
}: {
  navItems: NavItem[]
  user: AppShellUser
  children: React.ReactNode
  brand?: string
  brandSubtitle?: string
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-primary text-[#111] overflow-y-hidden">
      <aside
        className={cn(
          "flex shrink-0 flex-col border-r border-[#3a3a3a] bg-[#262626] text-white transition-all duration-200",
          collapsed ? "w-16" : "w-[260px]"
        )}
      >
        <div className={cn("flex items-center gap-3 p-6", collapsed && "justify-center p-4")}>
          <Link href="/employers" className="min-w-0 flex-1">
            <div className="truncate font-headings text-xl font-bold leading-none text-white">
              {collapsed ? "C" : brand}
            </div>
            {!collapsed && (
              <div className="mt-1 text-xs font-normal text-gray-400">{brandSubtitle}</div>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className="absolute left-12 rounded-full border border-[#3a3a3a] bg-[#262626] p-1 text-gray-400 transition-colors hover:text-white"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3 pb-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/employers" && pathname.startsWith(`${item.href}/`))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-normal transition-colors",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "bg-white text-[#262626]"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className={cn("border-t border-[#3a3a3a] px-6 py-5", collapsed && "px-2")}>
          {collapsed ? (
            <div className="flex justify-center">
              <div className="flex size-8 items-center justify-center rounded-xl bg-rose-100 text-xs font-bold text-rose-700">
                {user.initials}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-xs font-bold text-rose-700">
                  {user.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Signed in as</p>
                  <p className="truncate text-sm font-medium text-white">{user.name}</p>
                </div>
              </div>
              <Link
                href="/auth?mode=login"
                className="inline-flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-white"
              >
                <LogOut size={14} />
                Log out
              </Link>
            </div>
          )}
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex min-w-0 w-full flex-col min-h-fit overflow-y-auto max-w-[1280px] mx-auto">{children}</div>
      </main>
    </div>
  )
}
