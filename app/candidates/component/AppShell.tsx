'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { candidateApplications, type ApplicationStage } from '@/app/candidates/data/candidate_data';
import { candidateDetails } from '@/app/candidates/data/candidate_details';
import { NotificationBell } from './NotificationBell';

const stageLabels: Record<ApplicationStage, string> = {
  applied: 'APPLIED',
  screening: 'SCREENING',
  interview: 'INTERVIEW',
  offer: 'OFFER',
};

export function UserProfile() {
  const { profile } = candidateDetails;
  
  return (
    <div className="bg-secondary border border-light-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full mb-4 flex items-center justify-center text-white text-lg font-bold">
          {profile.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <h3 className="font-semibold text-accent">{profile.name}</h3>
        <p className="text-sm text-muted">{profile.title}</p>
        <a href='/candidates/profile' className="mt-4 w-full bg-accent text-secondary py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90">
          View Profile
        </a>
      </div>
    </div>
  );
}

export function ApplicationCards() {
  return (
    <div className="space-y-3">
      {candidateApplications.map((app) => (
        <div key={app.id} className="bg-secondary border border-light-border rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0 bg-accent">
              {app.logo}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate text-accent">{app.company}</p>
              <p className="text-xs truncate text-muted">{app.jobTitle}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">{app.fit}% fit</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-pastel-amber text-signal-amber">
              {stageLabels[app.stage]}
            </span>
          </div>
          <p className="text-xs text-muted">{app.currency} {app.salaryMin.toLocaleString()}-{app.salaryMax.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export function CandidateSidebar() {
  return (
    <div className="col-span-1 sticky top-24 h-fit space-y-6">
      {/* User Profile Row */}
      <UserProfile />

      {/* Application Summary Cards */}
      <ApplicationCards />
    </div>
  );
}

export default function AppShell() {
  const pathname = usePathname();
  const [activityOpen, setActivityOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/candidates' },
    { name: 'Discover', href: '/candidates/discover' },
    { name: 'Matches', href: '/candidates/matches' },
    { name: 'Compass', href: '/candidates/compass' },
    { name: 'Recommendations', href: '/candidates/recommendations' },
  ];

  const activityOptions = [
    { name: 'Applications', href: '/candidates/activity/applications' },
    { name: 'Artifacts', href: '/candidates/activity/artifacts' },
  ];

  const isActive = (href: string) => pathname === href;
  const isActivityActive = activityOptions.some((opt) => pathname === opt.href);

  return (
    <nav className="bg-secondary border-b border-light-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 gap-8">
          {/* Left Container */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-2xl font-bold text-accent">CareerOS</div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-primary border border-light-border rounded-full px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-brand text-accent placeholder-muted"
            />
          </div>

          {/* Center Container */}
          <div className="flex gap-8 flex-1 justify-center items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-accent border-accent'
                    : 'text-muted border-transparent hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Activity Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActivityOpen(!activityOpen)}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  isActivityActive
                    ? 'text-accent border-accent'
                    : 'text-muted border-transparent hover:text-accent'
                }`}
              >
                Activity
                <span
                  className={`inline-block transition-transform duration-200 ${
                    activityOpen ? 'rotate-180' : ''
                  }`}
                  style={{ fontSize: '0.5rem', lineHeight: '1' }}
                >
                  ▼
                </span>
              </button>
              
              {activityOpen && (
                <div className="absolute top-full left-0 mt-2 bg-secondary border border-light-border rounded-xl shadow-lg py-2 min-w-40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {activityOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      className="block px-4 py-2 text-sm text-muted hover:bg-primary hover:text-accent transition-colors"
                      onClick={() => setActivityOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Container */}
          <div className="flex items-center gap-6 shrink-0">
            <NotificationBell />

            <Link href="/" className="flex items-center gap-2 px-4 py-2 text-muted hover:text-accent hover:bg-primary rounded-lg transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
