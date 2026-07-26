'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, X, Check, Loader } from 'lucide-react';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';
import { artifactDetailData } from '@/app/candidates/data/artifact_data';

const tagColors = {
  aws: 'bg-orange-100 text-orange-800',
  terraform: 'bg-purple-100 text-purple-800',
  cicd: 'bg-blue-100 text-blue-800',
  react: 'bg-cyan-100 text-cyan-800',
  nodejs: 'bg-green-100 text-green-800',
  typescript: 'bg-indigo-100 text-indigo-800',
  kubernetes: 'bg-pink-100 text-pink-800',
  python: 'bg-yellow-100 text-yellow-800',
  docker: 'bg-blue-100 text-blue-800',
  graphql: 'bg-red-100 text-red-800',
};

interface UploadedArtifact {
  id: string;
  title: string;
  filename: string;
  status: 'processing' | 'processed';
  tags: string[];
  description: string;
  matchedDemands: number;
  uploadDate: string;
}

export default function ArtifactsPage() {
  // Combine data artifacts with uploaded ones
  const dataArtifacts = Object.entries(artifactDetailData).map(([id, data]) => ({
    id,
    title: data.title,
    filename: data.filename,
    status: data.status as 'processing' | 'processed',
    tags: data.tags.map((t) => t.name),
    description: data.aiSummary,
    matchedDemands: data.demandMatches.length,
    uploadDate: data.uploadDate,
  }));

  const [artifacts, setArtifacts] = useState<UploadedArtifact[]>(dataArtifacts);

  const [isDragActive, setIsDragActive] = useState(false);

  // Artifacts handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      simulateArtifactUpload(files[0]);
    }
  };

  const handleArtifactFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      simulateArtifactUpload(files[0]);
    }
  };

  const simulateArtifactUpload = (file: File) => {
    const newArtifact: UploadedArtifact = {
      id: String(Date.now()),
      title: file.name.replace(/\.[^/.]+$/, ''),
      filename: file.name,
      status: 'processing',
      tags: [],
      description: '',
      matchedDemands: 0,
      uploadDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setArtifacts([newArtifact, ...artifacts]);

    setTimeout(() => {
      const dummyTags = [
        ['React', 'Node.js', 'TypeScript', 'AWS'],
        ['Python', 'Kubernetes', 'CI/CD', 'Docker'],
        ['GraphQL', 'PostgreSQL', 'AWS', 'Terraform'],
        ['Go', 'gRPC', 'Kubernetes', 'Docker'],
      ];

      const randomTags = dummyTags[Math.floor(Math.random() * dummyTags.length)];
      const dummyMatches = Math.floor(Math.random() * 7) + 1;

      setArtifacts((prev) =>
        prev.map((a) =>
          a.id === newArtifact.id
            ? {
                ...a,
                status: 'processed',
                tags: randomTags,
                description: 'Auto-generated description from artifact analysis',
                matchedDemands: dummyMatches,
              }
            : a
        )
      );
    }, 2500);
  };

  const handleRemoveArtifact = (id: string) => {
    setArtifacts(artifacts.filter((a) => a.id !== id));
  };

  const handleRemoveTag = (artifactId: string, tag: string) => {
    setArtifacts((prev) =>
      prev.map((a) =>
        a.id === artifactId
          ? { ...a, tags: a.tags.filter((t) => t !== tag) }
          : a
      )
    );
  };

  const getTagColor = (tag: string): string => {
    const normalized = tag.toLowerCase().replace(/[.\s]/g, '');
    return (
      Object.values(tagColors).find((_, i) => i % Object.keys(tagColors).length === tag.charCodeAt(0) % Object.keys(tagColors).length) ||
      'bg-gray-100 text-gray-800'
    );
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
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Artifacts</h1>
              <p className="text-gray-600">
                Manage your uploaded projects, assignments, and tasks. Watch as your skills are automatically extracted and matched against employer demands.
              </p>
            </div>

            {/* Main Content */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`p-8 border-2 border-dashed rounded-xl text-center transition-colors mb-8 ${
                  isDragActive
                    ? 'border-gray-700 bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleArtifactFileSelect}
                    className="sr-only"
                    id="artifact-upload"
                  />
                  <label htmlFor="artifact-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      ZIP, TAR.GZ, PDF, MD, or common file formats
                    </p>
                  </label>
                </div>
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
                            <Loader className="w-4 h-4 text-gray-700 animate-spin" />
                            <span className="text-xs font-medium text-gray-700">
                              Processing...
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-green-600">
                              Processed
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveArtifact(artifact.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-semibold text-gray-900 text-sm mb-2 truncate">
                        {artifact.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {artifact.description ||
                          'Awaiting processing... This will show skill extraction results.'}
                      </p>

                      {/* Tags */}
                      {artifact.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {artifact.tags.map((tag) => (
                            <div key={tag} className="relative group">
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                                {tag}
                              </div>
                              <button
                                onClick={() => handleRemoveTag(artifact.id, tag)}
                                className="absolute -top-1 -right-1 bg-gray-900 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="space-y-2 pt-3 border-t border-gray-100">
                        {artifact.matchedDemands > 0 && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-600">Matched demands:</span>
                            <span className="font-semibold text-gray-700">
                              {artifact.matchedDemands} open
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Uploaded:</span>
                          <span className="text-gray-700">{artifact.uploadDate}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      {artifact.status === 'processed' && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                          <Link
                            href={`/candidates/activity/artifacts/${artifact.id}`}
                            className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
                          >
                            View details
                          </Link>
                          <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Edit tags
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    No artifacts yet
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload your first project to get started
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
