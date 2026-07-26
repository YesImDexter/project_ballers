'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import AppShell, { UserProfile } from '@/app/candidates/component/AppShell';
import { candidateApplications, type ApplicationStage } from '@/app/candidates/data/candidate_data';

const stageLabels: Record<ApplicationStage, string> = {
  applied: 'APPLIED',
  screening: 'SCREENING',
  interview: 'INTERVIEW',
  offer: 'OFFER',
};

const stageMessages: Record<ApplicationStage, string> = {
  applied: 'Your application has been submitted and is under review.',
  screening: 'Your application is being reviewed by our screening team.',
  interview: 'You\'ve been selected for an interview. Great progress!',
  offer: 'You\'ve received an offer! Congratulations!',
};

const stageColors: Record<ApplicationStage, { bg: string; text: string; border: string }> = {
  applied: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', border: '#3b82f6' },
  screening: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316', border: '#f97316' },
  interview: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7', border: '#a855f7' },
  offer: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e', border: '#22c55e' },
};

function StageBadge({ stage }: { stage: ApplicationStage }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
      <div className="flex-1">
        <p className="text-xs font-semibold" style={{ color: 'var(--color-foreground)' }}>
          {stageLabels[stage]}
        </p>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {stageMessages[stage]}
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const [selectedStage, setSelectedStage] = useState<ApplicationStage | 'All'>('All');

  const filteredApplications = useMemo(() => {
    if (selectedStage === 'All') {
      return candidateApplications;
    }
    return candidateApplications.filter((app) => app.stage === selectedStage);
  }, [selectedStage]);

  const stages: ApplicationStage[] = ['applied', 'screening', 'interview', 'offer'];

  return (
    <div className="min-h-screen bg-cream">
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1 sticky top-24 h-fit">
            <UserProfile />
          </div>

          {/* Right Content (Big) */}
          <div className="col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
                Your Applications
              </h1>
              <p style={{ color: 'var(--color-muted)' }}>
                Track all your job applications and their current status
              </p>
            </div>

            {/* Stage Filter */}
            <div className="bg-card rounded-lg border p-6 mb-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)' }}>Filter by stage</p>
              <div className="flex flex-wrap gap-2">
                {['All', ...stages].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage as ApplicationStage | 'All')}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                    style={{
                      backgroundColor: selectedStage === stage ? 'var(--color-accent)' : 'var(--color-light-border)',
                      color: selectedStage === stage ? 'white' : 'var(--color-foreground)',
                    }}
                  >
                    {stage === 'All' ? 'All' : stageLabels[stage as ApplicationStage]}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications List */}
            {filteredApplications.length > 0 ? (
              <div className="space-y-4">
                {filteredApplications.map((application) => {
                  const stageColor = stageColors[application.stage];
                  return (
                    <div
                      key={application.id}
                      className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-all"
                      style={{ borderColor: 'var(--color-light-border)' }}
                    >
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4 flex-1">
                          <div
                          className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden"
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                              <h3 className="font-semibold text-lg" style={{ color: 'var(--color-foreground)' }}>
                                {application.company}
                              </h3>
                              <span
                                className="px-2 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  backgroundColor: stageColor.bg,
                                  color: stageColor.text,
                                }}
                              >
                                {stageLabels[application.stage]}
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                              {application.jobTitle}
                            </p>
                          </div>
                        </div>

                        {/* Fit Score */}
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                              {application.fit}%
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                            fit match
                          </p>
                        </div>
                      </div>

                      {/* Stage Message */}
                      <div
                        className="rounded-lg p-3 mb-4"
                        style={{ backgroundColor: stageColor.bg }}
                      >
                        <p className="text-sm" style={{ color: stageColor.text }}>
                          {stageMessages[application.stage]}
                        </p>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-b mb-4" style={{ borderColor: 'var(--color-light-border)' }}>
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Salary Range</p>
                          <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                            {application.currency} {application.salaryMin.toLocaleString()}-{application.salaryMax.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Location</p>
                          <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                            {application.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Status</p>
                          <p className="text-sm font-semibold" style={{ color: stageColor.text }}>
                            {stageLabels[application.stage]}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 flex-wrap">
                        {application.stage === 'offer' && (
                          <>
                            <Link
                              href={`/candidates/activity/applications/${application.id}`}
                              className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{ backgroundColor: 'var(--color-accent)' }}
                            >
                              Review Offer
                            </Link>
                            <button
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              View Details
                            </button>
                            <button
                              className="text-sm font-medium ml-auto transition-colors hover:opacity-75"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {application.stage === 'interview' && (
                          <>
                            <Link
                              href={`/candidates/activity/applications/${application.id}`}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              View Application
                            </Link>
                            <button
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              Prepare
                            </button>
                            <button
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              Schedule
                            </button>
                            <button
                              className="text-sm font-medium ml-auto transition-colors hover:opacity-75"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              Reschedule
                            </button>
                          </>
                        )}
                        {application.stage === 'screening' && (
                          <>
                            <Link
                              href={`/candidates/activity/applications/${application.id}`}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              View Application
                            </Link>
                            <button
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              View Role
                            </button>
                            <button
                              className="text-sm font-medium ml-auto transition-colors hover:opacity-75"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              Track Status
                            </button>
                          </>
                        )}
                        {application.stage === 'applied' && (
                          <>
                            <Link
                              href={`/candidates/activity/applications/${application.id}`}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                              style={{
                                borderColor: 'var(--color-light-border)',
                                color: 'var(--color-foreground)',
                              }}
                            >
                              View Application
                            </Link>
                            <button
                              className="text-sm font-medium ml-auto transition-colors hover:opacity-75"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              Withdraw
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="bg-card rounded-lg border p-12 shadow-sm text-center"
                style={{ borderColor: 'var(--color-light-border)' }}
              >
                <svg
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: 'var(--color-muted)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p style={{ color: 'var(--color-muted)' }}>
                  No applications in this stage yet. Keep applying!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
