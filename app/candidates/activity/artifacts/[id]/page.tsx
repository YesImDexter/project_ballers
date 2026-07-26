'use client';

import { useState } from 'react';
import { use } from 'react';
import { Edit2, RotateCcw, Trash2, Download } from 'lucide-react';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';
import { artifactDetailData } from '@/app/candidates/data/artifact_data';

export default function ArtifactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const artifact = artifactDetailData[id];
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [userDescription, setUserDescription] = useState(artifact?.userDescription || '');

  if (!artifact) {
    return (
      <div className="min-h-screen bg-cream">
        <AppShell />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Artifact not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-emerald-50 text-emerald-700';
      case 'processing':
        return 'bg-sky-50 text-sky-700';
      case 'needs_review':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const tagsByType = {
    technical: artifact.tags.filter((t) => t.type === 'technical'),
    tool: artifact.tags.filter((t) => t.type === 'tool'),
    domain: artifact.tags.filter((t) => t.type === 'domain'),
  };

  return (
    <div className="min-h-screen bg-cream">
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <CandidateSidebar />

          {/* Right Content (Big) */}
          <div className="col-span-3 space-y-5">
            {/* Header Section */}
            <section className="bg-white rounded-2xl p-7">
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-semibold text-gray-900">{artifact.title}</h1>
                    <span className="px-2.5 py-0.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full">
                      {artifact.type}
                    </span>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(artifact.status)}`}>
                      {artifact.status === 'processed'
                        ? 'Processed'
                        : artifact.status === 'processing'
                          ? 'Processing'
                          : 'Needs Review'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Uploaded {artifact.uploadDate} · Last updated {artifact.lastUpdatedDate} · {artifact.filename}
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex gap-2 shrink-0">
                  <button className="w-9 h-9 flex items-center justify-center bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center bg-rose-50 text-rose-500 rounded-full hover:bg-rose-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Demand Matches - Highest Priority */}
            <section className="bg-white rounded-2xl p-7">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">
                Employer Demand Matches · {artifact.demandMatches.length}
              </h2>

              <div className="space-y-3">
                {artifact.demandMatches.map((demand) => (
                  <div
                    key={demand.id}
                    className="bg-emerald-50/60 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{demand.role}</h3>
                        <p className="text-xs text-gray-500">{demand.company}</p>
                      </div>
                      <div className="text-lg font-semibold text-emerald-600">{demand.matchScore}%</div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">{demand.matchReason}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {demand.matchedTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-white text-emerald-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Description & Context */}
            <section className="bg-white rounded-2xl p-7">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Description & Context</h2>

              <div className="space-y-5">
                {/* AI Summary */}
                <div className="bg-sky-50/60 rounded-xl p-4">
                  <h3 className="text-xs font-medium text-sky-700 mb-2">AI-Generated Summary</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{artifact.aiSummary}</p>
                </div>

                {/* User Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium text-gray-500">Your Context</h3>
                    {!isEditingDescription && (
                      <button
                        onClick={() => setIsEditingDescription(true)}
                        className="text-xs text-gray-400 hover:text-gray-700 font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditingDescription ? (
                    <div className="space-y-3">
                      <textarea
                        value={userDescription}
                        onChange={(e) => setUserDescription(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 text-sm"
                        rows={4}
                        placeholder="Add context the AI might have missed..."
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditingDescription(false)}
                          className="px-4 py-1.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingDescription(false);
                            setUserDescription(artifact.userDescription);
                          }}
                          className="px-4 py-1.5 bg-gray-50 text-gray-600 font-medium rounded-full hover:bg-gray-100 transition-colors text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {userDescription || 'No additional context added yet.'}
                    </p>
                  )}
                </div>

                {/* File Preview */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Original File</h3>
                  <a
                    href={artifact.filePreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">View {artifact.filePreview.type}</span>
                    <span className="text-gray-400 ml-2">→</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Extracted Tags & Skills */}
            <section className="bg-white rounded-2xl p-7">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Extracted Skills & Tags</h2>

              <div className="space-y-5">
                {/* Technical Skills */}
                {tagsByType.technical.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {tagsByType.technical.map((tag) => (
                        <div key={tag.name} className="group relative">
                          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                            {tag.name}
                            <span className="text-blue-400 text-[10px]">
                              {tag.confidence === 'high' ? '●' : '◐'}
                            </span>
                          </div>
                          <button className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools */}
                {tagsByType.tool.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">Tools & Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {tagsByType.tool.map((tag) => (
                        <div key={tag.name} className="group relative">
                          <div className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                            {tag.name}
                            <span className="text-violet-400 text-[10px]">
                              {tag.confidence === 'high' ? '●' : '◐'}
                            </span>
                          </div>
                          <button className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domain Areas */}
                {tagsByType.domain.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">Domain Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {tagsByType.domain.map((tag) => (
                        <div key={tag.name} className="group relative">
                          <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                            {tag.name}
                            <span className="text-amber-400 text-[10px]">
                              {tag.confidence === 'high' ? '●' : '◐'}
                            </span>
                          </div>
                          <button className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Tag */}
                <button className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors text-xs font-medium">
                  + Add tag
                </button>
              </div>
            </section>

            {/* Activity History */}
            <section className="bg-white rounded-2xl p-7">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Activity History</h2>

              <div className="space-y-5">
                {artifact.activityHistory.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-violet-300 rounded-full mt-1.5"></div>
                      {index < artifact.activityHistory.length - 1 && (
                        <div className="w-px h-full bg-gray-100 my-1"></div>
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="font-medium text-gray-800 text-sm">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
