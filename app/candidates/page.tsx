'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileText,
  Flame,
  Layers3,
  MapPin,
  Route,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react';

import AppShell, { CandidateSidebar } from './component/AppShell';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { candidateApplications, type ApplicationStage } from '@/app/candidates/data/candidate_data';
import { candidateDetails } from '@/app/candidates/data/candidate_details';
import { companies } from '@/app/candidates/data/company_data';
import { artifactDetailData } from '@/app/candidates/data/artifact_data';
import { matchesData } from '@/app/candidates/data/matches_data';
import { cn } from '@/lib/utils';

type RecommendationCategory = 'Course' | 'Project' | 'Mentorship' | 'Skill' | 'Certification';
type ImpactLevel = 'High' | 'Medium' | 'Low';
type BadgeTone = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'amber' | 'red' | 'outline';

interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  impact: ImpactLevel;
  estimatedTime: string;
}

const userData = {
  currentMilestone: 'Mid-Level Developer',
  nextMilestone: 'Senior Developer',
  progressPercent: 40,
};

const activityData = {
  daysActive: 12,
  lastActionCompleted: "Completed 'Intro to System Design'",
};

const topRecommendations: Recommendation[] = [
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

const categoryTone: Record<RecommendationCategory, BadgeTone> = {
  Course: 'blue',
  Project: 'green',
  Mentorship: 'purple',
  Skill: 'orange',
  Certification: 'pink',
};

const impactDot: Record<ImpactLevel, string> = {
  High: 'bg-signal-red',
  Medium: 'bg-signal-amber',
  Low: 'bg-muted',
};

const stageTone: Record<ApplicationStage, BadgeTone> = {
  applied: 'blue',
  screening: 'amber',
  interview: 'purple',
  offer: 'green',
};

const stageLabels: Record<ApplicationStage, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
};

const artifacts = Object.values(artifactDetailData);
const uniqueSkills = Array.from(new Set(artifacts.flatMap((artifact) => artifact.tags.map((tag) => tag.name))));
const demandMatchCount = artifacts.reduce((total, artifact) => total + artifact.demandMatches.length, 0);
const averageApplicationFit = Math.round(
  candidateApplications.reduce((total, application) => total + application.fit, 0) / candidateApplications.length
);
const applicationStageCounts = candidateApplications.reduce(
  (counts, application) => ({ ...counts, [application.stage]: counts[application.stage] + 1 }),
  { applied: 0, screening: 0, interview: 0, offer: 0 } satisfies Record<ApplicationStage, number>
);
const bestMatch = matchesData.reduce((best, match) => (match.matchScore > best.matchScore ? match : best), matchesData[0]);
const averageMatchScore = Math.round(matchesData.reduce((total, match) => total + match.matchScore, 0) / matchesData.length);
const topMatches = [...matchesData].sort((a, b) => b.matchScore - a.matchScore).slice(0, 2);
const totalOpenJobs = companies.reduce((total, company) => total + company.open_jobs, 0);
const averageCompanyRating = (companies.reduce((total, company) => total + company.ratings, 0) / companies.length).toFixed(1);
const topSkills = uniqueSkills.slice(0, 6);
const firstName = candidateDetails.profile.name.split(' ')[0];

export default function Page() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-primary">
      <AppShell />

      <div className="mx-auto max-w-7xl px-6 py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <CandidateSidebar />

          <div className="space-y-5 lg:col-span-3">
            <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-headings text-3xl font-bold leading-tight text-accent">Welcome back, {firstName}</h1>
                <p className="mt-1 text-sm text-muted">
                  {candidateDetails.profile.title} · {candidateDetails.profile.location} · {today}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="purple">{userData.progressPercent}% to Senior</Badge>
                <Badge variant="amber">{candidateApplications.length} applications</Badge>
                <Badge variant="green">{topRecommendations.length} top actions</Badge>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Card className="p-4">
                <CardContent className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted">Applications</p>
                    <p className="mt-2 text-2xl font-bold text-accent">{candidateApplications.length}</p>
                    <p className="mt-1 text-xs text-muted">{averageApplicationFit}% average fit</p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-pastel-blue text-signal-blue">
                    <BriefcaseBusiness size={18} />
                  </span>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted">Best match</p>
                    <p className="mt-2 text-2xl font-bold text-accent">{bestMatch.matchScore}%</p>
                    <p className="mt-1 truncate text-xs text-muted">{bestMatch.company}</p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-pastel-purple text-signal-purple">
                    <Star size={18} />
                  </span>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted">Open roles</p>
                    <p className="mt-2 text-2xl font-bold text-accent">{totalOpenJobs}</p>
                    <p className="mt-1 text-xs text-muted">{companies.length} companies · {averageCompanyRating}★ avg</p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-pastel-green text-signal-green">
                    <Building2 size={18} />
                  </span>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted">Skill signals</p>
                    <p className="mt-2 text-2xl font-bold text-accent">{uniqueSkills.length}</p>
                    <p className="mt-1 text-xs text-muted">{demandMatchCount} demand matches</p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-pastel-pink text-signal-pink">
                    <Layers3 size={18} />
                  </span>
                </CardContent>
              </Card>
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              <Card className="overflow-hidden p-5 xl:col-span-2">
                <CardHeader>
                  <div>
                    <CardTitle>Your career runway</CardTitle>
                    <CardDescription>Signal, momentum, and the next milestone in one view.</CardDescription>
                  </div>
                  <Badge variant="outline">{userData.progressPercent}% complete</Badge>
                </CardHeader>

                <CardContent className="mt-6">
                  <div className="rounded-2xl bg-primary p-4">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                      <div className="flex min-w-42 items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-full bg-accent text-secondary">
                          <CheckCircle2 size={18} />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Current</p>
                          <p className="text-sm font-semibold text-accent">{userData.currentMilestone}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between text-xs text-muted">
                          <span>Foundation</span>
                          <span>Leadership-ready</span>
                        </div>
                        <Progress value={userData.progressPercent} indicatorClassName="bg-brand" />
                      </div>

                      <div className="flex min-w-42 items-center gap-3 md:justify-end">
                        <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-accent">
                          <Target size={18} />
                        </span>
                        <div className="md:text-right">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Next</p>
                          <p className="text-sm font-semibold text-accent">{userData.nextMilestone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="mt-5 justify-between border-t border-soft-row-border pt-4">
                  <p className="text-sm text-muted">
                    Close the architecture gap, then ship one leadership-level project.
                  </p>
                  <Button render={<Link href="/candidates/compass" />} nativeButton={false} className="!px-4 !py-2">
                    View journey <ArrowRight size={14} />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="p-5">
                <CardHeader>
                  <div>
                    <CardTitle className="text-base">Momentum</CardTitle>
                    <CardDescription>This week</CardDescription>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-pastel-blue text-signal-blue">
                    <Flame size={18} />
                  </span>
                </CardHeader>

                <CardContent className="mt-6 space-y-5">
                  <div className="rounded-2xl bg-pastel-blue p-4">
                    <p className="text-4xl font-bold text-accent">{activityData.daysActive}</p>
                    <p className="text-xs font-medium text-muted">days active</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Last completed</p>
                    <p className="text-sm font-medium text-accent">{activityData.lastActionCompleted}</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              <Card className="p-5 xl:col-span-2">
                <CardHeader>
                  <div>
                    <CardTitle className="text-base">Applications pipeline</CardTitle>
                    <CardDescription>
                      {applicationStageCounts.offer} offer · {applicationStageCounts.interview} interview · {applicationStageCounts.screening} screening
                    </CardDescription>
                  </div>
                  <Link href="/candidates/activity/applications" className="text-sm font-semibold text-accent hover:text-brand">
                    See all →
                  </Link>
                </CardHeader>

                <CardContent className="mt-4 divide-y divide-soft-row-border">
                  {candidateApplications.map((application) => (
                    <div key={application.id} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 md:flex-row md:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <img src={application.logo} alt={application.company} className="w-10 h-10 rounded-xl shrink-0 object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-accent">{application.jobTitle}</p>
                          <p className="truncate text-xs text-muted">{application.company} · {application.location}</p>
                        </div>
                      </div>
                      <Badge variant={stageTone[application.stage]}>{stageLabels[application.stage]}</Badge>
                      <div className="min-w-32 md:w-32">
                        <div className="mb-1 flex justify-between text-[11px] text-muted">
                          <span>Fit</span>
                          <span>{application.fit}%</span>
                        </div>
                        <Progress value={application.fit} indicatorClassName={application.fit >= 85 ? 'bg-signal-green' : 'bg-brand'} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="p-5">
                <CardHeader>
                  <div>
                    <CardTitle className="text-base">Matches + skills</CardTitle>
                    <CardDescription>{averageMatchScore}% average match</CardDescription>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-pastel-purple text-signal-purple">
                    <Sparkles size={18} />
                  </span>
                </CardHeader>

                <CardContent className="mt-4 space-y-4">
                  <div className="space-y-3">
                    {topMatches.map((match) => (
                      <Link key={match.id} href="/candidates/matches" className="block rounded-2xl bg-primary p-3 transition-colors hover:bg-soft-hover">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-accent">{match.role}</p>
                            <p className="truncate text-xs text-muted">{match.company} · {match.type}</p>
                          </div>
                          <Badge variant="purple">{match.matchScore}%</Badge>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-soft-row-border pt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Top skill signals</p>
                      <Link href="/candidates/activity/artifacts" className="text-xs font-semibold text-accent hover:text-brand">
                        Artifacts →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topSkills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-2xl bg-pastel-amber p-3 text-signal-amber">
                      <FileText className="mb-2" size={16} />
                      {artifacts.length} artifacts
                    </div>
                    <div className="rounded-2xl bg-pastel-green p-3 text-signal-green">
                      <MapPin className="mb-2" size={16} />
                      {candidateDetails.preferences.workStyle} ready
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-headings text-xl font-bold text-accent">Next best actions</h2>
                  <p className="text-sm text-muted">Highest leverage moves for the next milestone.</p>
                </div>
                <Link href="/candidates/recommendations" className="text-sm font-semibold text-accent hover:text-brand">
                  See all →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {topRecommendations.map((rec) => (
                  <Card key={rec.id} className="pillar p-4">
                    <CardContent className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <Badge variant={categoryTone[rec.category]}>{rec.category}</Badge>
                        <span className={cn('mt-1 size-2.5 rounded-full', impactDot[rec.impact])} aria-label={`${rec.impact} impact`} />
                      </div>

                      <div>
                        <h3 className="line-clamp-2 text-sm font-semibold text-accent">{rec.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                          <Route size={13} />
                          <span>{rec.estimatedTime}</span>
                          <span>·</span>
                          <TrendingUp size={13} />
                          <span>{rec.impact} impact</span>
                        </div>
                      </div>

                      <Button className="w-full !py-2">
                        Start <Sparkles size={14} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
