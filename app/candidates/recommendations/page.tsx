'use client';

import { useState, useMemo } from 'react';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';

type RecommendationCategory = 'Course' | 'Project' | 'Mentorship' | 'Skill' | 'Certification';
type ImpactLevel = 'High' | 'Medium' | 'Low';
type RecommendationStatus = 'Not started' | 'In progress' | 'Completed';

interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  reason: string;
  impact: ImpactLevel;
  estimatedTime: string;
  status: RecommendationStatus;
  link: string;
  image: string;
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    category: 'Course',
    title: 'Advanced System Design',
    reason: 'Closes your architecture skill gap for senior roles',
    impact: 'High',
    estimatedTime: '8 weeks',
    status: 'Not started',
    link: '#',
    image: '/images/recommendations/system-architecture.jpeg',
  },
  {
    id: '2',
    category: 'Project',
    title: 'Lead Migration Project',
    reason: 'Demonstrates end-to-end project ownership',
    impact: 'High',
    estimatedTime: '4 weeks',
    status: 'In progress',
    link: '#',
    image: '/images/recommendations/project-management.jpeg',
  },
  {
    id: '3',
    category: 'Mentorship',
    title: 'Mentor Junior Developer',
    reason: 'Essential for senior engineers, builds leadership skills',
    impact: 'High',
    estimatedTime: '5 hrs/week',
    status: 'In progress',
    link: '#',
    image: '/images/recommendations/junior-developer.jpg',
  },
  {
    id: '4',
    category: 'Skill',
    title: 'Master Kubernetes Orchestration',
    reason: 'Critical infrastructure skill for your tech stack',
    impact: 'Medium',
    estimatedTime: '6 weeks',
    status: 'Not started',
    link: '#',
    image: '/images/recommendations/kubernetes.jpeg',
  },
  {
    id: '5',
    category: 'Certification',
    title: 'AWS Solutions Architect',
    reason: 'Validates cloud architecture expertise',
    impact: 'Medium',
    estimatedTime: '10 weeks',
    status: 'Completed',
    link: '#',
    image: '/images/recommendations/aws.png',
  },
  {
    id: '6',
    category: 'Skill',
    title: 'Technical Writing & Documentation',
    reason: 'Improve communication for senior leadership roles',
    impact: 'Medium',
    estimatedTime: '4 weeks',
    status: 'Not started',
    link: '#',
    image: '/images/recommendations/technical-writing.jpeg',
  },
];

const categories: RecommendationCategory[] = ['Course', 'Project', 'Mentorship', 'Skill', 'Certification'];

const categoryColors: Record<RecommendationCategory, { bg: string; text: string }> = {
  Course: { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--color-accent)' },
  Project: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
  Mentorship: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' },
  Skill: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' },
  Certification: { bg: 'rgba(236, 72, 153, 0.1)', text: '#ec4899' },
};

const impactColors: Record<ImpactLevel, string> = {
  High: '#dc2626',
  Medium: '#f59e0b',
  Low: '#6b7280',
};

const statusColors: Record<RecommendationStatus, { bg: string; text: string }> = {
  'Not started': { bg: 'var(--color-light-border)', text: 'var(--color-muted)' },
  'In progress': { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--color-accent)' },
  Completed: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<RecommendationCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'impact' | 'time'>('impact');

  const filteredRecommendations = useMemo(() => {
    let filtered = recommendations;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    // Sort by impact or time
    if (sortBy === 'impact') {
      const impactOrder = { High: 0, Medium: 1, Low: 2 };
      filtered = [...filtered].sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]);
    } else if (sortBy === 'time') {
      filtered = [...filtered].sort((a, b) => {
        const timeA = parseInt(a.estimatedTime);
        const timeB = parseInt(b.estimatedTime);
        return timeA - timeB;
      });
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const getButtonText = (status: RecommendationStatus) => {
    switch (status) {
      case 'Not started':
        return 'Start';
      case 'In progress':
        return 'Continue';
      case 'Completed':
        return 'View';
      default:
        return 'Explore';
    }
  };

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
                Recommended for you
              </h1>
              <p style={{ color: 'var(--color-muted)' }}>
                Based on your goal: <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Senior Developer</span>
              </p>
            </div>

            {/* Controls */}
            <div className="bg-card rounded-lg border p-6 mb-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
              {/* Category Tabs */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)' }}>Filter by category</p>
                <div className="flex flex-wrap gap-2">
                  {['All', ...categories].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category as RecommendationCategory | 'All')}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream"
                      style={{
                        backgroundColor: selectedCategory === category ? 'var(--color-accent)' : 'var(--color-light-border)',
                        color: selectedCategory === category ? 'white' : 'var(--color-foreground)',
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'impact' | 'time')}
                  className="px-4 py-2 rounded-lg border focus:outline-none"
                  style={{
                    borderColor: 'var(--color-light-border)',
                    color: 'var(--color-foreground)',
                    backgroundColor: 'var(--color-cream)',
                  }}
                >
                  <option value="impact">Impact (High to Low)</option>
                  <option value="time">Estimated Time (Shortest First)</option>
                </select>
              </div>
            </div>

            {/* Recommendations Grid */}
            {filteredRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredRecommendations.map((rec) => (
                  <a
                    key={rec.id}
                    href={rec.link}
                    className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-(-1) group overflow-hidden flex flex-col h-full"
                    style={{ borderColor: 'var(--color-light-border)' }}
                  >
                    {/* Image Container - Top Half */}
                    <div className="relative h-32 bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-50"
                      />
                      {/* Overlay with Title Only */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/30 to-transparent">
                        <h3
                          className="text-lg font-semibold group-hover:opacity-90 transition-opacity line-clamp-2 text-white drop-shadow-lg"
                        >
                          {rec.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content Container - Bottom Half */}
                    <div className="p-6 flex flex-col grow">
                      {/* Category and Impact Badges */}
                      <div className="mb-4 flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: categoryColors[rec.category].bg,
                            color: categoryColors[rec.category].text,
                          }}
                        >
                          {rec.category}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: impactColors[rec.impact] }}
                          title={`${rec.impact} impact`}
                        />
                        <span className="text-xs font-semibold" style={{ color: impactColors[rec.impact] }}>
                          {rec.impact} impact
                        </span>
                      </div>

                      {/* Reason */}
                      <p className="text-sm mb-4 grow" style={{ color: 'var(--color-muted)' }}>
                        {rec.reason}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs mb-4 pb-4 border-t" style={{ borderColor: 'var(--color-light-border)' }}>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            style={{ color: 'var(--color-muted)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span style={{ color: 'var(--color-muted)' }}>{rec.estimatedTime}</span>
                        </div>
                        <span
                          className="px-2 py-1 rounded font-medium"
                          style={{
                            backgroundColor: statusColors[rec.status].bg,
                            color: statusColors[rec.status].text,
                          }}
                        >
                          {rec.status}
                        </span>
                      </div>

                      {/* CTA Button - Always at Bottom */}
                      <button
                        className="w-full py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream text-white hover:opacity-90 mt-auto"
                        style={{
                          backgroundColor: 'var(--color-accent)',
                        }}
                      >
                        {getButtonText(rec.status)}
                      </button>
                    </div>
                  </a>
                ))}
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p style={{ color: 'var(--color-muted)' }}>
                  No recommendations in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
