"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Deliberate dark sidebar identity — the only place off the light token palette.
const SIDEBAR_BG = "bg-[#262626]"
const SIDEBAR_BORDER = "border-[#3a3a3a]"
const SIDEBAR_ACTIVE_TEXT = "text-[#262626]"

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export interface AppShellUser {
  initials: string
  name: string
}

function SidebarContent({
  navItems,
  user,
  brand,
  brandSubtitle,
  collapsed,
  onNavigate,
  onCollapse,
  onExpand,
  pathname,
}: {
  navItems: NavItem[]
  user: AppShellUser
  brand: string
  brandSubtitle: string
  collapsed: boolean
  onNavigate?: () => void
  onCollapse?: () => void
  onExpand?: () => void
  pathname: string
}) {
  return (
    <>
      <div className={cn("relative flex items-center gap-3 p-6", collapsed && "justify-center p-4")}>
        <Link href="/employers" className="min-w-0 flex-1" onClick={onNavigate}>
          <div className="truncate font-headings text-xl font-bold leading-none text-white">
            {collapsed ? "C" : brand}
          </div>
          {!collapsed && (
            <div className="mt-1 text-xs font-normal text-gray-400">{brandSubtitle}</div>
          )}
        </Link>
        {onCollapse && !collapsed && (
          <button
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {onExpand && collapsed && (
          <button
            onClick={onExpand}
            aria-label="Expand sidebar"
            className={cn(
              "absolute -right-3 top-1/2 -translate-y-1/2 rounded-full border p-1 text-gray-400 transition-colors hover:text-white",
              SIDEBAR_BORDER,
              SIDEBAR_BG
            )}
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
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-normal transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? cn("bg-white", SIDEBAR_ACTIVE_TEXT)
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

      <div className={cn("border-t px-6 py-5", SIDEBAR_BORDER, collapsed && "px-2")}>
        {collapsed ? (
          <div className="flex justify-center">
            <div className="flex size-8 items-center justify-center rounded-xl bg-pastel-red text-xs font-bold text-signal-red">
              {user.initials}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-pastel-red text-xs font-bold text-signal-red">
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
    </>
  )
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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-dvh flex-col bg-primary text-accent md:flex-row">
      {/* Mobile top bar */}
      <header
        className={cn(
          "flex items-center justify-between px-4 py-3 text-white md:hidden",
          SIDEBAR_BG
        )}
      >
        <Link href="/employers">
          <span className="font-headings text-lg font-bold">{brand}</span>
          <span className="ml-2 text-xs text-gray-400">{brandSubtitle}</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-full p-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside
            className={cn(
              "absolute inset-y-0 left-0 flex w-[280px] max-w-[85vw] flex-col text-white shadow-xl",
              SIDEBAR_BG
            )}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
            <SidebarContent
              navItems={navItems}
              user={user}
              brand={brand}
              brandSubtitle={brandSubtitle}
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
              pathname={pathname}
            />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r text-white transition-all duration-200 md:flex",
          SIDEBAR_BORDER,
          SIDEBAR_BG,
          collapsed ? "w-16" : "w-[260px]"
        )}
      >
        <SidebarContent
          navItems={navItems}
          user={user}
          brand={brand}
          brandSubtitle={brandSubtitle}
          collapsed={collapsed}
          onCollapse={() => setCollapsed(true)}
          onExpand={() => setCollapsed(false)}
          pathname={pathname}
        />
      </aside>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col">{children}</div>
      </main>
    </div>
  )
}
