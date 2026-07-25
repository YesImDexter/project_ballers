'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { candidateApplications, type ApplicationStage } from '@/app/candidates/data/candidate_data';

const stageLabels: Record<ApplicationStage, string> = {
  applied: 'APPLIED',
  screening: 'SCREENING',
  interview: 'INTERVIEW',
  offer: 'OFFER',
};

export function UserProfile() {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
        <h3 className="font-semibold" style={{ color: 'var(--color-foreground)' }}>John Doe</h3>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Senior Developer</p>
        <a href='/candidates/profile' className="mt-4 w-full text-white py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--color-foreground)' }}>
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
        <div key={app.id} className="bg-card rounded-lg border p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer" style={{ borderColor: 'var(--color-light-border)' }}>
          <div className="flex items-start gap-2 mb-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: 'var(--color-foreground)' }}>
              {app.logo}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-foreground)' }}>{app.company}</p>
              <p className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>{app.jobTitle}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{app.fit}% fit</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-near-black)' }}>
              {stageLabels[app.stage]}
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{app.currency} {app.salaryMin.toLocaleString()}-{app.salaryMax.toLocaleString()}</p>
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

  const navItems = [
    { name: 'Home', href: '/candidates' },
    { name: 'Discover', href: '/candidates/discover' },
    { name: 'Activity', href: '/candidates/activity' },
    { name: 'Compass', href: '/candidates/compass' },
    { name: 'Recommendations', href: '/candidates/recommendations' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b border-light-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 gap-8">
          {/* Left Container */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-2xl font-bold text-amber-600">Logo</div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 rounded-full px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Center Container */}
          <div className="flex gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-amber-600 border-amber-600'
                    : 'text-gray-600 border-transparent hover:text-near-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Container */}
          <div className="flex items-center gap-6 shrink-0">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>

            <a href="/" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
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
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
