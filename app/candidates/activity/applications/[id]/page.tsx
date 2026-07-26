'use client';

import { use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';
import { candidateApplications, JobApplication } from '@/app/candidates/data/candidate_data';

// ICON COMPONENTS
function CheckmarkIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// INTERVIEW TRIAL INTERFACE
interface InterviewRound {
  id: string;
  round: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  interviewer?: string;
  feedback?: string;
  score?: number;
}

// INTERVIEW TRIALS DATA
const interviewTrialsMap: Record<string, InterviewRound[]> = {
  '1': [
    {
      id: '1',
      round: 'Round 1',
      title: 'Initial Screening Call',
      description: 'HR screening to discuss background, motivations, and cultural fit.',
      status: 'completed',
      date: 'Jul 18, 2024',
      interviewer: 'Sarah Chen',
      feedback: 'Great communication skills and relevant experience',
      score: 9,
    },
    {
      id: '2',
      round: 'Round 2',
      title: 'Technical Interview',
      description: 'In-depth discussion of technical skills and problem-solving approach.',
      status: 'completed',
      date: 'Jul 22, 2024',
      interviewer: 'Michael Park',
      feedback: 'Solid understanding of analytics fundamentals',
      score: 8,
    },
    {
      id: '3',
      round: 'Round 3',
      title: 'Hiring Manager Round',
      description: 'Conversation with the direct manager about role expectations and team dynamics.',
      status: 'current',
      date: 'Jul 28, 2024',
      interviewer: 'Emma Rodriguez (Hiring Manager)',
    },
    {
      id: '4',
      round: 'Round 4',
      title: 'Final Round - Take Home Project',
      description: 'Complete a real-world analytics project to demonstrate your skills.',
      status: 'upcoming',
    },
  ],
  '2': [
    {
      id: '1',
      round: 'Round 1',
      title: 'Phone Screen',
      description: 'Initial conversation with recruiter.',
      status: 'completed',
      date: 'Jul 15, 2024',
      interviewer: 'James Liu',
      feedback: 'Relevant frontend experience',
      score: 8,
    },
    {
      id: '2',
      round: 'Round 2',
      title: 'Technical Assessment',
      description: 'Live coding challenge - React component development.',
      status: 'current',
    },
    {
      id: '3',
      round: 'Round 3',
      title: 'System Design Discussion',
      description: 'Architectural decisions and scalability considerations.',
      status: 'upcoming',
    },
  ],
  '3': [
    {
      id: '1',
      round: 'Round 1',
      title: 'Portfolio Review',
      description: 'Review of design portfolio and past projects.',
      status: 'completed',
      date: 'Jul 20, 2024',
      interviewer: 'Priya Sharma',
      feedback: 'Excellent design thinking and attention to detail',
      score: 10,
    },
  ],
};

// JOB DETAILS BY ID
const jobDetailsMap: Record<string, any> = {
  '1': {
    description:
      "We're looking for an experienced Product Analyst to join Grab's growing data team. You'll work on analyzing user behavior, building dashboards, and providing insights that drive product decisions.",
    requirements: [
      'SQL proficiency and data analysis experience',
      '2+ years in analytics or data science role',
      'Familiarity with business intelligence tools',
      'Strong communication and presentation skills',
      'Experience with A/B testing',
    ],
    responsibilities: [
      'Analyze user engagement and conversion metrics',
      'Build self-service dashboards for stakeholders',
      'Conduct exploratory data analysis',
      'Support product and marketing teams with insights',
      'Develop metrics and KPIs for new features',
    ],
  },
  '2': {
    description:
      'TikTok is seeking a Senior Frontend Engineer to lead the development of our web platform. You will work on building scalable, performant interfaces serving millions of users globally.',
    requirements: [
      'Expert proficiency in React and TypeScript',
      '5+ years of frontend development experience',
      'Experience with web performance optimization',
      'Knowledge of state management solutions',
      'Familiarity with testing frameworks and CI/CD',
    ],
    responsibilities: [
      'Design and implement new UI components',
      'Optimize application performance',
      'Mentor junior developers',
      'Participate in architecture decisions',
      'Collaborate with product and design teams',
    ],
  },
  '3': {
    description:
      "Join Shopee's UX/UI Design team to create amazing experiences for our customers across Southeast Asia. You'll work on mobile and web products used by millions daily.",
    requirements: [
      'Proficiency in Figma or similar design tools',
      '3+ years of UX/UI design experience',
      'Strong portfolio demonstrating design process',
      'Understanding of mobile and web design principles',
      'Excellent communication and collaboration skills',
    ],
    responsibilities: [
      'Design user interfaces and experiences',
      'Conduct user research and testing',
      'Create wireframes and prototypes',
      'Work with developers on implementation',
      'Iterate based on user feedback',
    ],
  },
};

function ApplicationTimeline({ stage }: { stage: string }) {
  const stages = ['applied', 'screening', 'interview', 'offer'];
  const currentIndex = stages.indexOf(stage);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border mb-8" style={{ borderColor: 'var(--color-light-border)' }}>
      <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--color-foreground)' }}>
        Application Progress
      </h3>
      <div className="space-y-3">
        {stages.map((s, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          return (
            <div key={s} className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-all"
                style={{
                  backgroundColor: isCompleted
                    ? 'var(--color-accent)'
                    : isCurrent
                    ? 'var(--color-accent)'
                    : 'var(--color-light-border)',
                  color: isUpcoming ? 'var(--color-muted)' : 'white',
                }}
              >
                {isCompleted ? <CheckmarkIcon /> : <span>{idx + 1}</span>}
              </div>
              <div className="flex-1">
                <div
                  className="rounded-xl px-4 py-3 transition-all"
                  style={{
                    backgroundColor: isCurrent ? 'var(--color-accent-soft)' : 'var(--color-primary)',
                    borderLeft: isCurrent ? '3px solid var(--color-accent)' : 'none',
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-muted)' }}>
                    {isCompleted ? '✓ Completed' : isCurrent ? '◆ Current' : '○ Upcoming'}
                  </p>
                  <p className="font-semibold capitalize" style={{ color: 'var(--color-foreground)' }}>
                    {s}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InterviewRounds({ rounds }: { rounds: InterviewRound[] }) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border mb-8" style={{ borderColor: 'var(--color-light-border)' }}>
      <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--color-foreground)' }}>
        Interview Process
      </h3>
      <div className="space-y-6">
        {rounds.map((round, idx) => (
          <div key={round.id} className="relative">
            {idx < rounds.length - 1 && (
              <div
                className="absolute left-5 top-14 w-0.5 h-16"
                style={{ backgroundColor: 'var(--color-light-border)' }}
              />
            )}
            <div className="flex items-start gap-4">
              <div className="shrink-0 pt-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  style={{
                    backgroundColor:
                      round.status === 'completed'
                        ? 'var(--color-accent)'
                        : round.status === 'current'
                        ? 'var(--color-accent-soft)'
                        : 'var(--color-light-border)',
                    color:
                      round.status === 'current' ? 'var(--color-near-black)' : 'white',
                  }}
                >
                  {round.status === 'completed' ? (
                    <CheckmarkIcon />
                  ) : round.status === 'current' ? (
                    <ClockIcon />
                  ) : (
                    <CircleIcon />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>
                    {round.round}
                  </p>
                  <h4 className="font-bold text-base" style={{ color: 'var(--color-foreground)' }}>
                    {round.title}
                  </h4>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>
                  {round.description}
                </p>
                {round.status === 'completed' && (
                  <div className="bg-green-50 rounded-lg p-3 mb-2" style={{ borderLeft: '3px solid var(--color-accent)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                      Completed • {round.date}
                    </p>
                    {round.interviewer && (
                      <p className="text-xs mb-2" style={{ color: 'var(--color-foreground)' }}>
                        <strong>Interviewer:</strong> {round.interviewer}
                      </p>
                    )}
                    {round.feedback && (
                      <p className="text-xs" style={{ color: 'var(--color-foreground)' }}>
                        <strong>Feedback:</strong> {round.feedback}
                      </p>
                    )}
                    {round.score && (
                      <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--color-accent)' }}>
                        Score: {round.score}/10
                      </p>
                    )}
                  </div>
                )}
                {round.status === 'current' && (
                  <div className="bg-amber-50 rounded-lg p-3" style={{ borderLeft: '3px solid var(--color-accent-soft)' }}>
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-near-black)' }}>
                      📅 Scheduled for {round.date}
                    </p>
                    {round.interviewer && (
                      <p className="text-xs mt-1" style={{ color: 'var(--color-foreground)' }}>
                        With: {round.interviewer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ApplicationDetailsProps {
  id: string;
}

export default function Page({ params }: { params: Promise<ApplicationDetailsProps> }) {
  const router = useRouter();
  const { id } = use(params);
  const application = useMemo(() => {
    return candidateApplications.find((app) => app.id === id);
  }, [id]);

  const jobDetails = useMemo(() => {
    return application ? jobDetailsMap[application.id] : null;
  }, [application]);

  const interviewRounds = useMemo(() => {
    return application ? interviewTrialsMap[application.id] || [] : [];
  }, [application]);

  if (!application) {
    return (
      <div className="min-h-screen bg-cream">
        <AppShell />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-6">
            <CandidateSidebar />
            <div className="col-span-3 text-center">
              <p style={{ color: 'var(--color-muted)' }}>Application not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <CandidateSidebar />

          {/* Right Content */}
          <div className="col-span-3">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-6 font-semibold transition-colors hover:opacity-70"
              style={{ color: 'var(--color-accent)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Applications
            </button>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-card rounded-2xl p-8 shadow-sm border" style={{ borderColor: 'var(--color-light-border)' }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-transparent">
                    <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wide mb-2" style={{ color: 'var(--color-muted)' }}>
                      {application.stage.toUpperCase()} STAGE
                    </p>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
                      {application.jobTitle}
                    </h1>
                    <p className="text-lg mb-4" style={{ color: 'var(--color-accent)' }}>
                      {application.company}
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl text-white font-bold text-2xl shadow-md"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  {application.fit}%
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-muted)' }}>
                    <LocationIcon />
                    LOCATION
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {application.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-muted)' }}>
                    <DollarIcon />
                    SALARY RANGE
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {application.currency} {application.salaryMin.toLocaleString()} - {application.salaryMax.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-muted)' }}>
                    <CalendarIcon />
                    APPLIED
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    Jul 10, 2024
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-muted)' }}>
                    <UserIcon />
                    FIT SCORE
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                    {application.fit}% Match
                  </p>
                </div>
              </div>
            </div>

            {/* Application Timeline */}
            <ApplicationTimeline stage={application.stage} />

            {/* Interview Rounds */}
            {interviewRounds.length > 0 && <InterviewRounds rounds={interviewRounds} />}

            {/* Job Description and Requirements */}
            {jobDetails && (
              <div className="grid grid-cols-3 gap-6">
                {/* Description */}
                <div className="col-span-2 bg-card rounded-2xl p-6 shadow-sm border" style={{ borderColor: 'var(--color-light-border)' }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-foreground)' }}>
                    About the Role
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
                    {jobDetails.description}
                  </p>

                  <h4 className="font-bold mb-3" style={{ color: 'var(--color-foreground)' }}>
                    Responsibilities
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {jobDetails.responsibilities.map((resp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
                        <CheckmarkIcon />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="bg-card rounded-2xl p-6 shadow-sm border" style={{ borderColor: 'var(--color-light-border)' }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-foreground)' }}>
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {jobDetails.requirements.map((req: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-foreground)' }}>
                        <span className="shrink-0 pt-1 font-bold" style={{ color: 'var(--color-accent)' }}>
                          •
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border flex gap-3" style={{ borderColor: 'var(--color-light-border)' }}>
              {application.stage === 'offer' && (
                <>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Accept Offer
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold border transition-colors"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Decline
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold border transition-colors"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Negotiate
                  </button>
                </>
              )}
              {application.stage === 'interview' && (
                <>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <CalendarIcon /> Schedule Interview
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold border transition-colors"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Ask Question
                  </button>
                </>
              )}
              {application.stage === 'screening' && (
                <>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    View Assessment
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold border transition-colors"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Contact Recruiter
                  </button>
                </>
              )}
              {application.stage === 'applied' && (
                <>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold border transition-colors"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                    }}
                  >
                    Withdraw Application
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Follow Up
                  </button>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
