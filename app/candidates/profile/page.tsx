'use client';

import { ExternalLink, Check, Loader } from 'lucide-react';
import Link from 'next/link';
import AppShell from '@/app/candidates/component/AppShell';
import { candidateDetails } from '@/app/candidates/data/candidate_details';
import { artifactDetailData } from '@/app/candidates/data/artifact_data';

const GithubIcon = (props: any) => (
<svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
</svg>
);

const LinkedinIcon = (props: any) => (
<svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
  <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
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
                <img
                src="/images/profile_pic/profile_picture.png"
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />

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
