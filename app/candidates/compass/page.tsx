'use client';

import { useState, useMemo } from 'react';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';

interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  color: string;
  description?: string;
}

interface NextMilestoneData {
  title: string;
  description: string;
  timeframe: string;
  actions: string[];
}

const careerMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Junior Developer',
    date: 'Jan 2023',
    completed: true,
    color: 'from-blue-400 to-blue-600',
    description: 'Started career journey',
  },
  {
    id: '2',
    title: 'Onboarding Cert',
    date: 'Jun 2023',
    completed: true,
    color: 'from-cyan-400 to-cyan-600',
    description: 'Completed fundamentals',
  },
  {
    id: '3',
    title: 'Mid-Level Dev',
    date: 'Mar 2025',
    completed: true,
    color: 'from-emerald-400 to-emerald-600',
    description: 'Current position',
  },
  {
    id: '4',
    title: 'Senior Developer',
    date: 'Q3 2025',
    completed: false,
    color: 'from-amber-400 to-amber-600',
    description: 'Next milestone',
  },
  {
    id: '5',
    title: 'Staff Engineer',
    date: 'Q4 2026',
    completed: false,
    color: 'from-orange-400 to-orange-600',
    description: '12+ months ahead',
  },
  {
    id: '6',
    title: 'Principal Engineer',
    date: '2027+',
    completed: false,
    color: 'from-purple-400 to-purple-600',
    description: 'Long-term vision',
  },
];

const currentPosition = 'Mid-Level Developer';
const currentMilestoneIndex = 2;

const nextMilestone: NextMilestoneData = {
  title: 'Senior Developer',
  description: 'Lead high-impact projects, mentor junior developers, and contribute to architectural decisions.',
  timeframe: '~6 months',
  actions: [
    'Lead one project end-to-end',
    'Mentor a junior developer',
    'Complete Advanced System Design course',
  ],
};

const progressPercent = 40;

// SVG ICON COMPONENTS
function LightningIcon() {
  return (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 18h2V9h-2zm3-13h2v13h-2zm3-1h2v14h-2z" />
      <path d="M3 3h18v2H3z" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5S9.33 14.5 8.5 14.5 7 13.83 7 13s.67-1.5 1.5-1.5zm3.5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
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

function ArrowUpIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 14l5-5 5 5z" />
    </svg>
  );
}

function ArrowDiagonalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7m10 0v10" />
    </svg>
  );
}

// AI INSIGHT CARDS
interface InsightCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
  tagColor: 'amber' | 'pink' | 'purple' | 'green';
}

const insightCardsData: InsightCard[] = [
  {
    id: '1',
    icon: 'lightning',
    title: 'Quickest win this week',
    description: 'Complete a systems design mini-course to unlock 3 new recommended opportunities.',
    tag: '1 EVENING',
    tagColor: 'amber',
  },
  {
    id: '2',
    icon: 'target',
    title: 'Your differentiator',
    description: 'Your project leadership experience is rare. Emphasize this in interviews.',
    tag: 'DIFFERENTIATOR',
    tagColor: 'pink',
  },
  {
    id: '3',
    icon: 'sparkles',
    title: 'Recommended for you',
    description: 'Based on your profile, companies actively hiring for your trajectory are growing at 30%+ YoY.',
    tag: 'RECOMMENDED',
    tagColor: 'purple',
  },
  {
    id: '4',
    icon: 'chart',
    title: 'Boost your signal',
    description: 'Publish 1-2 technical articles to increase recruiter visibility by 45%.',
    tag: '8 HOURS',
    tagColor: 'green',
  },
];

function AiInsightCards() {
  const tagColorMap = {
    amber: { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
    green: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
  };

  return (
    <div className="mb-12">
      <div className="overflow-x-auto pb-4 -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
        <div className="flex gap-4 md:grid md:grid-cols-4">
          {insightCardsData.map((insight) => {
            const colors = tagColorMap[insight.tagColor];
            return (
              <div
                key={insight.id}
                className={`shrink-0 w-80 md:w-auto ${colors.bg} rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md`}
                style={{ borderColor: 'var(--color-light-border)' }}
              >
                {/* Tag Badge */}
                <div className="flex justify-end mb-3">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap tracking-wide ${colors.badge}`}>
                    {insight.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4 text-amber-600">
                  {insight.icon === 'lightning' && <LightningIcon />}
                  {insight.icon === 'target' && <TargetIcon />}
                  {insight.icon === 'sparkles' && <SparklesIcon />}
                  {insight.icon === 'chart' && <ChartIcon />}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: 'var(--color-foreground)' }}>
                    {insight.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// PATH PICKER
interface Path {
  id: string;
  icon: string;
  title: string;
  description: string;
  horizon: string;
  matchLift: number;
  demand: number;
  salary: string;
  skills: string[];
  roadmapSteps: RoadmapStep[];
  nextStepAction: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  status: 'done' | 'current' | 'upcoming';
  stepLabel: string;
  weekRange: string;
}

const pathsData: Path[] = [
  {
    id: 'cloud-infra',
    icon: 'cloud',
    title: 'Cloud Infrastructure Engineer',
    description: 'Design and manage scalable cloud systems',
    horizon: '6-9 months',
    matchLift: 34,
    demand: 287,
    salary: '$145K - $185K',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'CI/CD'],
    roadmapSteps: [
      { id: '1', title: 'Master Kubernetes fundamentals', status: 'done', stepLabel: 'Done', weekRange: 'WEEK 1-3' },
      { id: '2', title: 'Build 2 cloud infrastructure projects', status: 'current', stepLabel: 'Step 1 of 3', weekRange: 'WEEK 4-8' },
      { id: '3', title: 'Complete AWS Solutions Architect cert', status: 'upcoming', stepLabel: 'Step 2 of 3', weekRange: 'WEEK 9-12' },
      { id: '4', title: 'Lead migration project at work', status: 'upcoming', stepLabel: 'Step 3 of 3', weekRange: 'WEEK 13+' },
    ],
    nextStepAction: 'Start the Kubernetes deep-dive course and build your first containerized app this week.',
  },
  {
    id: 'analytics-eng',
    icon: 'barchart',
    title: 'Analytics Engineer',
    description: 'Bridge data engineering and analytics',
    horizon: '4-6 months',
    matchLift: 28,
    demand: 156,
    salary: '$135K - $175K',
    skills: ['dbt', 'SQL', 'Python', 'Looker', 'Snowflake'],
    roadmapSteps: [
      { id: '1', title: 'Learn dbt best practices', status: 'current', stepLabel: 'Step 1 of 3', weekRange: 'WEEK 1-2' },
      { id: '2', title: 'Build analytics pipeline project', status: 'upcoming', stepLabel: 'Step 2 of 3', weekRange: 'WEEK 3-6' },
      { id: '3', title: 'Get dbt Fundamentals certification', status: 'upcoming', stepLabel: 'Step 3 of 3', weekRange: 'WEEK 7-8' },
    ],
    nextStepAction: 'Enroll in the dbt Fundamentals course and set up your first dbt project.',
  },
  {
    id: 'ai-engineer',
    icon: 'robot',
    title: 'Applied AI Engineer',
    description: 'Build production AI/ML systems',
    horizon: '8-12 months',
    matchLift: 41,
    demand: 423,
    salary: '$160K - $220K',
    skills: ['LLMs', 'PyTorch', 'MLOps', 'Prompt Engineering', 'Vector DBs'],
    roadmapSteps: [
      { id: '1', title: 'Complete LLM fundamentals bootcamp', status: 'current', stepLabel: 'Step 1 of 4', weekRange: 'WEEK 1-4' },
      { id: '2', title: 'Build 2 LLM-powered applications', status: 'upcoming', stepLabel: 'Step 2 of 4', weekRange: 'WEEK 5-10' },
      { id: '3', title: 'Learn MLOps and deployment patterns', status: 'upcoming', stepLabel: 'Step 3 of 4', weekRange: 'WEEK 11-14' },
      { id: '4', title: 'Contribute to open-source AI project', status: 'upcoming', stepLabel: 'Step 4 of 4', weekRange: 'WEEK 15+' },
    ],
    nextStepAction: 'Start the LLM bootcamp and complete the first 2 modules covering transformer architectures.',
  },
];

function PathPicker({ selectedPathId, onSelectPath }: { selectedPathId: string; onSelectPath: (pathId: string) => void }) {
  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
          Pick a path to plan around
        </h2>
        <p style={{ color: 'var(--color-muted)' }}>
          Choose a career trajectory that aligns with your goals and skills. Your roadmap will update accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pathsData.map((path) => {
          const isSelected = selectedPathId === path.id;
          return (
            <div
              key={path.id}
              className={`rounded-2xl p-6 shadow-sm transition-all flex flex-col ${
                isSelected
                  ? 'border-2 bg-card'
                  : 'border bg-card hover:shadow-md'
              }`}
              style={{
                borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-light-border)',
              }}
            >
              {/* Header with badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                    {path.icon === 'cloud' && <CloudIcon />}
                    {path.icon === 'barchart' && <BarChartIcon />}
                    {path.icon === 'robot' && <RobotIcon />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--color-foreground)' }}>
                      {path.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {path.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid (2x2) */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-cream rounded-lg p-3">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>
                    HORIZON
                  </p>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-foreground)' }}>
                    {path.horizon}
                  </p>
                </div>
                <div className="bg-cream rounded-lg p-3">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>
                    MATCH LIFT
                  </p>
                  <p className="text-sm font-bold flex items-center gap-1" style={{ color: 'var(--color-accent)' }}>
                    +{path.matchLift}%
                    <ArrowUpIcon />
                  </p>
                </div>
                <div className="bg-cream rounded-lg p-3">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>
                    DEMAND
                  </p>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-foreground)' }}>
                    {path.demand} open
                  </p>
                </div>
                <div className="bg-cream rounded-lg p-3">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>
                    SALARY
                  </p>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-foreground)' }}>
                    {path.salary}
                  </p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mb-6">
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  SKILLS YOU'LL BUILD
                </p>
                <div className="flex flex-wrap gap-2">
                  {path.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-cream" style={{ color: 'var(--color-foreground)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-2 mt-auto">
                {isSelected ? (
                  <button
                    disabled
                    className="flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-opacity flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: '#111',
                      color: 'white',
                      opacity: 1,
                    }}
                  >
                    Plan selected
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onSelectPath(path.id)}
                      className="flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-colors border"
                      style={{
                        borderColor: 'var(--color-light-border)',
                        color: 'var(--color-foreground)',
                      }}
                    >
                      Choose this path
                    </button>
                    <button
                      className="px-3 py-2 rounded-lg font-semibold text-sm transition-colors border"
                      style={{
                        borderColor: 'var(--color-light-border)',
                        color: 'var(--color-muted)',
                      }}
                    >
                      Compare
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ROADMAP PANEL
function RoadmapPanel({ selectedPathId }: { selectedPathId: string }) {
  const selectedPath = useMemo(() => pathsData.find((p) => p.id === selectedPathId), [selectedPathId]);

  if (!selectedPath) return null;

  return (
    <div className="mb-12">
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Roadmap Card */}
        <div className="col-span-2 bg-card rounded-2xl p-8 shadow-sm border" style={{ borderColor: 'var(--color-light-border)' }}>
          <p className="text-xs font-bold tracking-wide mb-2" style={{ color: 'var(--color-muted)' }}>
            ROADMAP
          </p>
          <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>
            {selectedPath.title}
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
            Follow this structured path to reach your next career milestone.
          </p>

          {/* Step List */}
          <div className="space-y-4 relative">
            {selectedPath.roadmapSteps.map((step, idx) => (
              <div key={step.id} className="flex items-start gap-4 relative">
                {/* Connecting line */}
                {idx < selectedPath.roadmapSteps.length - 1 && (
                  <div
                    className="absolute left-5 top-10 w-0.5 h-12"
                    style={{ backgroundColor: 'var(--color-light-border)' }}
                  />
                )}

                {/* Status Icon */}
                <div className="shrink-0 pt-1">
                  {step.status === 'done' ? (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: step.status === 'current' ? 'var(--color-accent)' : 'var(--color-light-border)',
                        backgroundColor: step.status === 'current' ? 'var(--color-accent-soft)' : 'transparent',
                      }}
                    >
                      {step.status === 'current' && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 flex items-start justify-between pt-1">
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                      {step.title}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      {step.stepLabel}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cream" style={{ color: 'var(--color-muted)' }}>
                    {step.weekRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Next Step Callout */}
        <div
          className="col-span-1 rounded-2xl p-6 shadow-sm border"
          style={{
            backgroundColor: 'var(--color-accent)',
            borderColor: 'var(--color-near-black)',
          }}
        >
          <p className="text-xs font-bold tracking-wide mb-2 text-white">
            NEXT STEP
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <h4 className="text-lg font-bold text-white">Start</h4>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-white" style={{ color: 'var(--color-near-black)' }}>
              THIS WEEK
            </span>
          </div>
          <p className="text-sm mb-6 text-gray-200">
            {selectedPath.nextStepAction}
          </p>
          <button className="w-full py-2 px-3 rounded-lg font-semibold text-sm border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
            Add to plan <ArrowDiagonalIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// HIGH-IMPACT MOVES TABLE
interface HighImpactMove {
  id: string;
  targetRole: string;
  targetIcon: string;
  reason: string;
  missingSkills: string[];
  suggestedProject: string;
  timeline: string;
}

const highImpactMovesData: HighImpactMove[] = [
  {
    id: '1',
    targetRole: 'Site Reliability Engineer',
    targetIcon: 'shield',
    reason: 'Your ops experience + your learning velocity align well',
    missingSkills: ['Go', 'Prometheus', 'ELK Stack'],
    suggestedProject: 'Build a monitoring dashboard for your team\'s microservices',
    timeline: '6-8 weeks',
  },
  {
    id: '2',
    targetRole: 'Staff/Principal Engineer',
    targetIcon: 'building',
    reason: 'Natural evolution with your technical depth and mentoring skills',
    missingSkills: ['System design at scale', 'Org dynamics'],
    suggestedProject: 'Lead the architecture redesign of a legacy system',
    timeline: '3-4 months',
  },
];

function HighImpactMovesTable() {
  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
          High-impact next moves
        </h2>
        <p style={{ color: 'var(--color-muted)' }}>
          Alternative paths that leverage your unique strengths and could accelerate your growth.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-light-border)' }}>
              <th className="text-left py-4 px-4 font-semibold text-sm" style={{ color: 'var(--color-muted)' }}>
                TARGET ROLE
              </th>
              <th className="text-left py-4 px-4 font-semibold text-sm" style={{ color: 'var(--color-muted)' }}>
                MISSING SKILLS
              </th>
              <th className="text-left py-4 px-4 font-semibold text-sm" style={{ color: 'var(--color-muted)' }}>
                SUGGESTED PROJECT
              </th>
              <th className="text-left py-4 px-4 font-semibold text-sm" style={{ color: 'var(--color-muted)' }}>
                TIMELINE
              </th>
            </tr>
          </thead>
          <tbody>
            {highImpactMovesData.map((move) => (
              <tr key={move.id} style={{ borderBottom: '1px solid var(--color-light-border)' }}>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 text-purple-600">
                      {move.targetIcon === 'shield' && <ShieldIcon />}
                      {move.targetIcon === 'building' && <BuildingIcon />}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                        {move.targetRole}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        {move.reason}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {move.missingSkills.map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 rounded-full bg-cream" style={{ color: 'var(--color-foreground)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm" style={{ color: 'var(--color-foreground)' }}>
                    {move.suggestedProject}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-muted)' }}>
                    {move.timeline}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {highImpactMovesData.map((move) => (
          <div key={move.id} className="bg-card rounded-2xl p-6 shadow-sm border" style={{ borderColor: 'var(--color-light-border)' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 text-purple-600">
                {move.targetIcon === 'shield' && <ShieldIcon />}
                {move.targetIcon === 'building' && <BuildingIcon />}
              </div>
              <div>
                <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  {move.targetRole}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {move.reason}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  MISSING SKILLS
                </p>
                <div className="flex flex-wrap gap-1">
                  {move.missingSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 rounded-full bg-cream" style={{ color: 'var(--color-foreground)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-muted)' }}>
                  SUGGESTED PROJECT
                </p>
                <p className="text-sm" style={{ color: 'var(--color-foreground)' }}>
                  {move.suggestedProject}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-muted)' }}>
                  TIMELINE
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-muted)' }}>
                  {move.timeline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [expandJourney, setExpandJourney] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState('cloud-infra');

  return (
    <div className="min-h-screen bg-cream">
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <CandidateSidebar />

          {/* Right Content (Big) */}
          <div className="col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
                Your Career Compass
              </h1>
              <p style={{ color: 'var(--color-muted)' }}>Track your progress and discover your next career milestone</p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Career Path Visualization */}
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                {/* Desktop Path (Horizontal Timeline) */}
                <div className="hidden md:block">
                  <div className="mb-12">
                    <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--color-foreground)' }}>
                      Your Career Trajectory
                    </h3>
                    
                    {/* Timeline Container */}
                    <div className="relative">
                      {/* Connecting Line */}
                      <div 
                        className="absolute top-6 left-0 right-0 h-1 rounded-full"
                        style={{ 
                          background: 'linear-gradient(to right, #3b82f6, #06b6d4, #10b981, #f59e0b, #f97316, #a855f7)',
                        }}
                      />
                      
                      {/* Milestone Nodes */}
                      <div className="relative flex justify-between items-start">
                        {careerMilestones.map((milestone, idx) => {
                          const isCurrent = idx === currentMilestoneIndex;
                          const isCompleted = milestone.completed;
                          const [fromColor, toColor] = milestone.color.split(' ');
                          
                          return (
                            <div 
                              key={milestone.id}
                              className="flex flex-col items-center group cursor-pointer transition-all hover:scale-110"
                            >
                              {/* Milestone Node */}
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg mb-3 transition-all border-4 border-card ${
                                  isCurrent ? 'ring-4 ring-yellow-200 animate-pulse' : ''
                                } bg-gradient-to-br ${milestone.color}`}
                              >
                                {isCompleted ? (
                                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="2" />
                                  </svg>
                                )}
                              </div>
                              
                              {/* Labels */}
                              <div className="text-center">
                                <p className={`text-xs font-bold whitespace-nowrap mb-1 ${
                                  isCurrent ? 'text-yellow-600' : 'text-gray-600'
                                }`}>
                                  {milestone.title}
                                </p>
                                <p className="text-xs text-gray-500 whitespace-nowrap">
                                  {milestone.date}
                                </p>
                                {isCurrent && (
                                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                    You are here
                                  </span>
                                )}
                              </div>
                              
                              {/* Tooltip */}
                              <div className="absolute bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap -translate-x-1/2 left-1/2">
                                {milestone.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar Below */}
                  <div className="border-t pt-8" style={{ borderColor: 'var(--color-light-border)' }}>
                    <div className="flex justify-between mb-3">
                      <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        Progress toward {nextMilestone.title}
                      </p>
                      <p className="text-sm font-bold text-amber-600">
                        {progressPercent}%
                      </p>
                    </div>
                    <div
                      className="w-full h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--color-light-border)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-amber-400 to-amber-600"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Path (Vertical Timeline) */}
                <div className="md:hidden">
                  <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--color-foreground)' }}>
                    Your Career Trajectory
                  </h3>
                  
                  <div className="space-y-6">
                    {careerMilestones.map((milestone, idx) => {
                      const isCurrent = idx === currentMilestoneIndex;
                      const isCompleted = milestone.completed;
                      
                      return (
                        <div key={milestone.id} className="flex gap-4">
                          {/* Vertical Line and Node */}
                          <div className="flex flex-col items-center">
                            {/* Node */}
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-card bg-gradient-to-br ${milestone.color} ${
                                isCurrent ? 'ring-4 ring-yellow-200' : ''
                              }`}
                            >
                              {isCompleted ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="2" />
                                </svg>
                              )}
                            </div>
                            
                            {/* Connecting Line */}
                            {idx < careerMilestones.length - 1 && (
                              <div
                                className="w-1 h-16 mt-2"
                                style={{
                                  background: `linear-gradient(to bottom, ${milestone.color.split(' ')[0]}, ${careerMilestones[idx + 1].color.split(' ')[0]})`,
                                }}
                              />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="pt-1 flex-1">
                            <p className={`font-semibold text-sm ${
                              isCurrent ? 'text-yellow-600' : 'text-gray-700'
                            }`}>
                              {milestone.title}
                            </p>
                            <p className="text-xs text-gray-500 mb-1">
                              {milestone.date}
                            </p>
                            <p className="text-xs text-gray-600 mb-2">
                              {milestone.description}
                            </p>
                            {isCurrent && (
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                You are here
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Progress Bar */}
                  <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-light-border)' }}>
                    <div className="flex justify-between mb-3">
                      <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        Progress
                      </p>
                      <p className="text-sm font-bold text-amber-600">
                        {progressPercent}%
                      </p>
                    </div>
                    <div
                      className="w-full h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--color-light-border)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-amber-400 to-amber-600"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Milestone Detail Card */}
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
                      {nextMilestone.title}
                    </h2>
                    <span
                      className="px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: 'var(--color-accent-soft)',
                        color: 'var(--color-near-black)',
                      }}
                    >
                      {nextMilestone.timeframe}
                    </span>
                  </div>
                  <p style={{ color: 'var(--color-muted)' }}>{nextMilestone.description}</p>
                </div>

                {/* Checklist */}
                <div>
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
                    Required Actions
                  </h3>
                  <div className="space-y-3">
                    {nextMilestone.actions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all hover:bg-opacity-50"
                          style={{
                            borderColor: 'var(--color-light-border)',
                            backgroundColor: 'var(--color-light-border)',
                          }}
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span style={{ color: 'var(--color-foreground)' }} className="text-sm">
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* NEW SECTIONS BELOW */}
              <div className="pt-8">
                {/* AI Insights */}
                <div className="mb-16">
                  <AiInsightCards />
                </div>

                {/* Path Picker */}
                <div className="mb-16">
                  <PathPicker selectedPathId={selectedPathId} onSelectPath={setSelectedPathId} />
                </div>

                {/* Roadmap Panel */}
                <div className="mb-16">
                  <RoadmapPanel selectedPathId={selectedPathId} />
                </div>

                {/* High-Impact Moves */}
                <div>
                  <HighImpactMovesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
