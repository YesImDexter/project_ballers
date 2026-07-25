"use client"

import { useState } from "react"
import Link from "next/link"
import { notifications as allNotifications } from "@/app/employers/data/notifications_data"
import { Bell, CheckCheck, FileText, MessageSquare, Sparkles, Star, X } from "lucide-react"

const iconStyles = [
  { icon: Sparkles, className: "bg-pastel-purple text-signal-purple" },
  { icon: Star, className: "bg-pastel-green text-signal-green" },
  { icon: Bell, className: "bg-pastel-amber text-signal-orange" },
  { icon: FileText, className: "bg-pastel-red text-signal-red" },
  { icon: MessageSquare, className: "bg-pastel-blue text-signal-blue" },
  { icon: Sparkles, className: "bg-pastel-pink text-signal-pink" },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const unread = notifications.filter((n) => !n.read)
  const read = notifications.filter((n) => n.read)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="flex-1 bg-primary">
      <div className="flex items-start justify-between px-8 py-6">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-accent">Notifications</h1>
          <p className="mt-1 text-sm text-muted">
            {unread.length} unread · {notifications.length} total
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-[#e5e7eb] hover:text-accent"
        >
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      <div className="px-8 pb-8">
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="flex min-h-[100px] flex-col justify-between rounded-2xl bg-pastel-red p-5">
            <p className="text-xs text-muted">Unread</p>
            <div>
              <p className="text-2xl font-bold text-accent">{unread.length}</p>
              <p className="text-xs text-muted">Action needed</p>
            </div>
          </div>
          <div className="flex min-h-[100px] flex-col justify-between rounded-2xl bg-pastel-purple p-5">
            <p className="text-xs text-muted">Total</p>
            <div>
              <p className="text-2xl font-bold text-accent">{notifications.length}</p>
              <p className="text-xs text-muted">Last 7 days</p>
            </div>
          </div>
          <div className="flex min-h-[100px] flex-col justify-between rounded-2xl bg-pastel-green p-5">
            <p className="text-xs text-muted">Read</p>
            <div>
              <p className="text-2xl font-bold text-accent">{read.length}</p>
              <p className="text-xs text-muted">Archived</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-card shadow-card">
          <div className="border-b border-[#f3f4f6] px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headings text-sm font-bold text-accent">All notifications</h2>
              <span className="text-[10px] text-muted">Auto-archive after 30 days</span>
            </div>
          </div>

          <div className="divide-y divide-[#f3f4f6]">
            {notifications.map((notification, index) => {
              const style = iconStyles[index % iconStyles.length]
              const Icon = style.icon
              return (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between px-6 py-4 transition-colors hover:bg-[#fafafa] ${
                    !notification.read ? "bg-soft-unread" : ""
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${style.className}`}>
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="text-xs font-semibold text-accent">{notification.type}</span>
                        {!notification.read && <span className="size-2 rounded-full bg-[#ef4444]" />}
                      </div>
                      <p className="text-sm text-muted">{notification.description}</p>
                      <p className="mt-0.5 text-xs text-[#9ca3af]">{notification.timeAgo}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex shrink-0 items-center gap-2">
                    <Link href={notification.url} className="text-[11px] font-medium text-signal-blue hover:text-[#1d4ed8]">
                      View
                    </Link>
                    <button className="grid size-8 place-items-center rounded-md bg-[#f3f4f6] text-muted hover:bg-[#e5e7eb]">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
