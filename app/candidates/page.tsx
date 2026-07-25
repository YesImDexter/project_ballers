'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppShell, { CandidateSidebar } from './component/AppShell';

const userData = {
  name: 'Alex',
  currentMilestone: 'Mid-Level Developer',
  nextMilestone: 'Senior Developer',
  progressPercent: 40,
};

const activityData = {
  daysActive: 12,
  lastActionCompleted: "Completed 'Intro to System Design'",
};

const topRecommendations = [
  {
    id: '1',
    category: 'Course',
    title: 'Advanced System Design',
    impact: 'High',
    estimatedTime: '8 weeks',
  },
  {
    id: '2',
    category: 'Project',
    title: 'Lead Migration Project',
    impact: 'High',
    estimatedTime: '4 weeks',
  },
  {
    id: '3',
    category: 'Mentorship',
    title: 'Mentor Junior Developer',
    impact: 'High',
    estimatedTime: '5 hrs/week',
  },
];

const notificationsData = [
  {
    id: '1',
    message: 'New course matched to your goal',
    type: 'course',
  },
  {
    id: '2',
    message: 'Mentor left you feedback',
    type: 'feedback',
  },
  {
    id: '3',
    message: 'Recommendation updated based on profile',
    type: 'recommendation',
  },
];

const categoryColors = {
  Course: { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--color-accent)' },
  Project: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
  Mentorship: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' },
  Skill: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' },
  Certification: { bg: 'rgba(236, 72, 153, 0.1)', text: '#ec4899' },
};

const impactColors = {
  High: '#dc2626',
  Medium: '#f59e0b',
  Low: '#6b7280',
};

function NotificationItem({ notification, onDismiss }: { notification: any; onDismiss: (id: string) => void }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-card border rounded-lg" style={{ borderColor: 'var(--color-light-border)' }}>
      <div
        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />
      <p className="text-sm flex-1" style={{ color: 'var(--color-foreground)' }}>
        {notification.message}
      </p>
      <button
        onClick={() => onDismiss(notification.id)}
        className="text-xs transition-colors hover:opacity-75"
        style={{ color: 'var(--color-muted)' }}
      >
        ✕
      </button>
    </div>
  );
}

export default function Page() {
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([]);

  const handleDismissNotification = (id: string) => {
    setDismissedNotifications([...dismissedNotifications, id]);
  };

  const visibleNotifications = notificationsData.filter(
    (n) => !dismissedNotifications.includes(n.id)
  );

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-cream">
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <CandidateSidebar />

          {/* Right Content */}
          <div className="col-span-3 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>
                Welcome back, {userData.name}
              </h1>
              <p style={{ color: 'var(--color-muted)' }}>{today}</p>
            </div>

            {/* Main Grid: Progress + Quick Actions */}
            <div className="grid grid-cols-3 gap-6">
              {/* Progress Snapshot Card (spans 2 cols) */}
              <div className="col-span-2 bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Your Progress
                </h2>

                {/* Mini Compass Path */}
                <div className="mb-6">
                  <div className="hidden sm:flex items-center justify-between">
                    {/* Current Node */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      >
                        ✓
                      </div>
                      <p className="mt-2 text-sm font-semibold text-center" style={{ color: 'var(--color-foreground)' }}>
                        {userData.currentMilestone}
                      </p>
                    </div>

                    {/* Path Fill */}
                    <div className="flex-1 mx-4 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-light-border)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${userData.progressPercent}%`,
                          backgroundColor: 'var(--color-accent)',
                        }}
                      />
                    </div>

                    {/* Next Node */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{
                          backgroundColor: 'var(--color-accent-soft)',
                          color: 'var(--color-near-black)',
                        }}
                      >
                        →
                      </div>
                      <p className="mt-2 text-sm font-semibold text-center" style={{ color: 'var(--color-foreground)' }}>
                        {userData.nextMilestone}
                      </p>
                    </div>
                  </div>

                  {/* Mobile version */}
                  <div className="sm:hidden space-y-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      >
                        ✓
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Current</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                          {userData.currentMilestone}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-1 h-8" style={{ backgroundColor: 'var(--color-accent)' }} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: 'var(--color-accent-soft)',
                          color: 'var(--color-near-black)',
                        }}
                      >
                        →
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Next</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                          {userData.nextMilestone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Label and Button */}
                <div className="pt-4 border-t" style={{ borderColor: 'var(--color-light-border)' }}>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                      {userData.progressPercent}%
                    </span>{' '}
                    of the way to <span style={{ fontWeight: 500 }}>{userData.nextMilestone}</span>
                  </p>
                  <Link href="/candidates/compass">
                    <button
                      className="w-full py-2 rounded-lg font-medium transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream text-white"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      View Your Journey
                    </button>
                  </Link>
                </div>
              </div>

              {/* Activity Stats Card */}
              <div className="bg-card rounded-lg border p-6 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Your Momentum
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                      {activityData.daysActive}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      days active
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-foreground)' }}>
                      Last completed
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {activityData.lastActionCompleted}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Best Actions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Next Best Actions
                </h2>
                <Link href="/candidates/recommendations">
                  <span
                    className="text-sm font-medium cursor-pointer transition-opacity hover:opacity-75"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    See all →
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-card rounded-lg border p-4 shadow-sm hover:shadow-md transition-all"
                    style={{ borderColor: 'var(--color-light-border)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: categoryColors[rec.category as keyof typeof categoryColors]?.bg,
                          color: categoryColors[rec.category as keyof typeof categoryColors]?.text,
                        }}
                      >
                        {rec.category}
                      </span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: impactColors[rec.impact as keyof typeof impactColors] }}
                      />
                    </div>
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2" style={{ color: 'var(--color-foreground)' }}>
                      {rec.title}
                    </h4>
                    <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                      {rec.estimatedTime}
                    </p>
                    <button
                      className="w-full py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 text-white"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
