'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Bell, BriefcaseBusiness, CheckCheck, FileText, MessageSquare, Sparkles, Star, Target, UserRound, X } from 'lucide-react'

import { candidateNotifications, type CandidateNotification, type CandidateNotificationType } from '@/app/candidates/data/notifications_data'
import { Button } from '@/app/components/ui/button'
import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from '@/app/components/ui/dialog'
import {
  HoverCardArrow,
  HoverCardPopup,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from '@/app/components/ui/hover-card'
import { cn } from '@/lib/utils'

const iconStyles: Record<CandidateNotificationType, { icon: typeof Bell; className: string; label: string }> = {
  match: { icon: Sparkles, className: 'bg-pastel-purple text-signal-purple', label: 'Match' },
  recommendation: { icon: Star, className: 'bg-pastel-green text-signal-green', label: 'Recommendation' },
  application: { icon: BriefcaseBusiness, className: 'bg-pastel-amber text-signal-orange', label: 'Application' },
  artifact: { icon: FileText, className: 'bg-pastel-red text-signal-red', label: 'Artifact' },
  feedback: { icon: MessageSquare, className: 'bg-pastel-blue text-signal-blue', label: 'Feedback' },
  profile: { icon: UserRound, className: 'bg-pastel-pink text-signal-pink', label: 'Profile' },
  digest: { icon: Target, className: 'bg-pastel-blue text-signal-blue', label: 'Digest' },
}

function NotificationIcon({ notification }: { notification: CandidateNotification }) {
  const style = iconStyles[notification.type]
  const Icon = style.icon

  return (
    <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', style.className)}>
      <Icon size={18} />
    </span>
  )
}

function NotificationPreview({ notification }: { notification: CandidateNotification }) {
  return (
    <Link
      href={notification.url}
      className={cn(
        'flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-soft-hover',
        !notification.read && 'bg-soft-unread'
      )}
    >
      <NotificationIcon notification={notification} />
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-accent">{notification.title}</p>
          {!notification.read && <span className="size-2 shrink-0 rounded-full bg-signal-red" />}
        </div>
        <p className="line-clamp-2 text-xs text-muted">{notification.description}</p>
        <p className="mt-1 text-[11px] text-muted">{notification.timeAgo}</p>
      </div>
    </Link>
  )
}

function NotificationRow({ notification }: { notification: CandidateNotification }) {
  const style = iconStyles[notification.type]

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 px-4 py-3 transition-colors hover:bg-soft-hover',
        !notification.read && 'bg-soft-unread'
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <NotificationIcon notification={notification} />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <span className="text-xs font-semibold text-accent">{style.label}</span>
            {!notification.read && <span className="size-2 rounded-full bg-signal-red" />}
          </div>
          <p className="text-sm font-semibold text-accent">{notification.title}</p>
          <p className="text-sm text-muted">{notification.description}</p>
          <p className="mt-0.5 text-xs text-muted">{notification.timeAgo}</p>
        </div>
      </div>
      <Link href={notification.url} className="shrink-0 text-[11px] font-medium text-signal-blue hover:underline">
        View
      </Link>
    </div>
  )
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState(candidateNotifications)
  const [dialogOpen, setDialogOpen] = useState(false)

  const unread = useMemo(() => notifications.filter((notification) => !notification.read), [notifications])
  const previewNotifications = unread.length > 0 ? unread.slice(0, 4) : notifications.slice(0, 3)
  const readCount = notifications.length - unread.length

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <>
      <HoverCardRoot>
        <HoverCardTrigger
          delay={150}
          closeDelay={150}
          render={
            <Button
              aria-label="Open notifications"
              variant="ghost"
              size="icon"
              className="relative size-10 !rounded-full !bg-transparent !p-0 text-muted hover:!bg-primary hover:text-accent"
              onClick={() => setDialogOpen(true)}
            />
          }
        >
          <Bell size={22} />
          {unread.length > 0 && (
            <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-signal-red px-1.5 text-[10px] font-bold leading-5 text-secondary">
              {unread.length > 9 ? '9+' : unread.length}
            </span>
          )}
        </HoverCardTrigger>

        <HoverCardPortal>
          <HoverCardPositioner side="bottom" align="end">
            <HoverCardPopup className="w-86 p-0">
              <HoverCardArrow className="relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] before:absolute before:bottom-0 before:left-1/2 before:size-2 before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:border-light-border before:bg-secondary before:content-['']" />
              <div className="border-b border-light-border px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-headings text-sm font-bold text-accent">Notifications</p>
                  <span className="text-[11px] text-muted">{unread.length} unread</span>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {previewNotifications.length > 0 ? (
                  <div className="space-y-1">
                    {previewNotifications.map((notification) => (
                      <NotificationPreview key={notification.id} notification={notification} />
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-8 text-center">
                    <p className="text-sm font-semibold text-accent">No new notifications</p>
                    <p className="mt-1 text-xs text-muted">Matches and application updates appear here.</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="w-full border-t border-light-border px-4 py-3 text-center text-xs font-semibold text-signal-blue transition-colors hover:bg-soft-hover"
              >
                See all notifications
              </button>
            </HoverCardPopup>
          </HoverCardPositioner>
        </HoverCardPortal>
      </HoverCardRoot>

      <DialogRoot open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="font-headings text-2xl font-bold text-accent">Notifications</DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted">
                  {unread.length} unread · {notifications.length} total
                </DialogDescription>
              </div>
              <DialogClose className="grid size-9 shrink-0 place-items-center text-muted hover:text-accent" aria-label="Close notifications">
                <X size={18} />
              </DialogClose>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-pastel-red p-4">
                <p className="text-xs text-muted">Unread</p>
                <p className="mt-3 text-2xl font-bold text-accent">{unread.length}</p>
              </div>
              <div className="rounded-2xl bg-pastel-purple p-4">
                <p className="text-xs text-muted">Total</p>
                <p className="mt-3 text-2xl font-bold text-accent">{notifications.length}</p>
              </div>
              <div className="rounded-2xl bg-pastel-green p-4">
                <p className="text-xs text-muted">Read</p>
                <p className="mt-3 text-2xl font-bold text-accent">{readCount}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-light-border bg-secondary shadow-card">
              <div className="flex items-center justify-between border-b border-soft-row-border px-4 py-3">
                <h2 className="font-headings text-sm font-bold text-accent">All notifications</h2>
                <button
                  type="button"
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>
              </div>
              <div className="max-h-[38vh] overflow-y-auto divide-y divide-soft-row-border">
                {notifications.map((notification) => (
                  <NotificationRow key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          </DialogPopup>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
