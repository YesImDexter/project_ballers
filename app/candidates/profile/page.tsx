'use client';

import { ExternalLink, Check, Loader } from 'lucide-react';
import Link from 'next/link';
import AppShell from '@/app/candidates/component/AppShell';
import { candidateDetails } from '@/app/candidates/data/candidate_details';
import { artifactDetailData } from '@/app/candidates/data/artifact_data';

const GithubIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface DisplayArtifact {
  id: string;
  title: string;
  filename: string;
  status: 'processing' | 'processed';
  tags: string[];
  description: string;
  matchedDemands: number;
  uploadDate: string;
}

export default function ProfilePage() {
  // Get data from source of truth
  const { profile, resume, preferences } = candidateDetails;

  // Convert artifact data to display format
  const artifacts: DisplayArtifact[] = Object.entries(artifactDetailData).map(([id, data]) => ({
    id,
    title: data.title,
    filename: data.filename,
    status: data.status as 'processing' | 'processed',
    tags: data.tags.map((t) => t.name),
    description: data.aiSummary,
    matchedDemands: data.demandMatches.length,
    uploadDate: data.uploadDate,
  }));

  const getTagColor = (tag: string): string => {
    const tagColorMap: { [key: string]: string } = {
      react: 'bg-cyan-100 text-cyan-800',
      nodejs: 'bg-green-100 text-green-800',
      typescript: 'bg-indigo-100 text-indigo-800',
      postgresql: 'bg-blue-100 text-blue-800',
      aws: 'bg-orange-100 text-orange-800',
      terraform: 'bg-purple-100 text-purple-800',
      cicd: 'bg-blue-100 text-blue-800',
      docker: 'bg-blue-100 text-blue-800',
      kubernetes: 'bg-pink-100 text-pink-800',
      python: 'bg-yellow-100 text-yellow-800',
      graphql: 'bg-red-100 text-red-800',
      rest: 'bg-green-100 text-green-800',
    };

    const normalized = tag.toLowerCase().replace(/[.\s]/g, '');
    return tagColorMap[normalized] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <AppShell />
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-8">
          {/* PROFILE HEADER SECTION */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

            <div className="space-y-6">
              {/* Avatar + Header Info */}
              <div className="flex gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Title / Role</p>
                      <p className="text-gray-700">{profile.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-gray-700">{profile.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Bio</p>
                <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-xs text-gray-500 mb-3">Links</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://${profile.links.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                    LinkedIn
                  </a>
                  <a
                    href={`https://${profile.links.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    <GithubIcon className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href={`https://${profile.links.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* RESUME SECTION */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resume</h2>

            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{resume.filename}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Uploaded {resume.uploadDate} · {resume.size}
                </p>
              </div>
              <a
                href="#"
                className="inline-flex px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium transition-colors"
              >
                View Resume
              </a>
            </div>
          </section>

          {/* PREFERENCES SECTION */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Preferences</h2>

            <div className="space-y-6">
              {/* Target Roles */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Target Roles</p>
                <div className="flex flex-wrap gap-2">
                  {preferences.targetRoles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Style */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Work Style</p>
                <p className="text-gray-700 capitalize">{preferences.workStyle}</p>
              </div>

              {/* Relocation */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Relocation</p>
                <p className="text-gray-700">
                  {preferences.relocate ? 'Open to relocation' : 'Not open to relocation'}
                </p>
              </div>

              {/* Notifications */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Notifications</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {preferences.notifications.demandMatches && <Check className="w-4 h-4 text-green-600" />}
                    <span className="text-sm text-gray-700">
                      {preferences.notifications.demandMatches ? '✓' : '○'} New demand matches
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {preferences.notifications.mentorFeedback && <Check className="w-4 h-4 text-green-600" />}
                    <span className="text-sm text-gray-700">
                      {preferences.notifications.mentorFeedback ? '✓' : '○'} Mentor feedback
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {preferences.notifications.weeklyDigest && <Check className="w-4 h-4 text-green-600" />}
                    <span className="text-sm text-gray-700">
                      {preferences.notifications.weeklyDigest ? '✓' : '○'} Weekly digest
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ARTIFACTS SECTION */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Your Artifacts</h2>
              <p className="text-sm text-gray-600">
                Your uploaded projects, assignments, and tasks that showcase your skills.
              </p>
            </div>

            {/* Artifacts Grid */}
            {artifacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      {artifact.status === 'processing' ? (
                        <div className="flex items-center gap-2">
                          <Loader className="w-4 h-4 text-sky-600 animate-spin" />
                          <span className="text-xs font-medium text-sky-600">Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-600">Processed</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 truncate">
                      {artifact.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {artifact.description}
                    </p>

                    {/* Tags */}
                    {artifact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {artifact.tags.map((tag) => (
                          <div key={tag} className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="space-y-1 pt-3 border-t border-gray-100 text-xs">
                      {artifact.matchedDemands > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Matched demands:</span>
                          <span className="font-semibold text-emerald-600">{artifact.matchedDemands}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="text-gray-700">{artifact.uploadDate}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    {artifact.status === 'processed' && (
                      <Link
                        href={`/candidates/activity/artifacts/${artifact.id}`}
                        className="block mt-4 pt-4 border-t border-gray-100 px-3 py-2 text-xs font-medium text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No artifacts yet</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
