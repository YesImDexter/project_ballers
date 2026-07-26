'use client';

import '@/app/globals.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
};

type ExperienceEntry = {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

const SECTIONS = [
  { id: 'about', label: 'About You' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills & Interests' },
  { id: 'links', label: 'Resume & Links' },
  { id: 'preferences', label: 'Preferences' },
];

function IconAbout() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function IconEducation() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6.18L23 9 12 3z" />
    </svg>
  );
}

function IconExperience() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6h-2.15a3 3 0 0 0-5.7 0H11V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H2.85C1.27 6 0 7.27 0 8.85v12.3C0 22.73 1.27 24 2.85 24h17.3c1.58 0 2.85-1.27 2.85-2.85V8.85C24 7.27 22.73 6 21.15 6zm-9 1h2v1h-2V7zm9 16H4V9h16v14z" />
    </svg>
  );
}

function IconSkills() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
  );
}

function IconLinks() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

function IconPreferences() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.1.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.1-.62l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
      style={{ backgroundColor: checked ? 'var(--color-accent)' : 'var(--color-light-border)' }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(4px)' }}
      />
    </button>
  );
}

export default function PageName() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  // Education
  const [educationList, setEducationList] = useState<EducationEntry[]>([
    { id: crypto.randomUUID(), school: '', degree: '', field: '', startYear: '', endYear: '' },
  ]);

  // Experience
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([
    { id: crypto.randomUUID(), company: '', title: '', startDate: '', endDate: '', description: '' },
  ]);

  // Skills & Interests
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  // Resume & Links
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');

  // Preferences
  const [jobAlerts, setJobAlerts] = useState(true);
  const [openToRelocation, setOpenToRelocation] = useState(false);
  const [discoverable, setDiscoverable] = useState(true);
  const [availability, setAvailability] = useState('immediate');

  const goToStep = (index: number) => {
    if (index >= 0 && index < SECTIONS.length) {
      setActiveIndex(index);
    }
  };

  const goNext = () => goToStep(activeIndex + 1);
  const goPrev = () => goToStep(activeIndex - 1);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeName(file.name);
  };

  const addEducation = () => {
    setEducationList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), school: '', degree: '', field: '', startYear: '', endYear: '' },
    ]);
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: string) => {
    setEducationList((prev) => prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const removeEducation = (id: string) => {
    setEducationList((prev) => prev.filter((entry) => entry.id !== id));
  };

  const addExperience = () => {
    setExperienceList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), company: '', title: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) => {
    setExperienceList((prev) => prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const removeExperience = (id: string) => {
    setExperienceList((prev) => prev.filter((entry) => entry.id !== id));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || skills.includes(value)) return;
    setSkills((prev) => [...prev, value]);
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const inputClass =
    'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors';
  const inputStyle = { borderColor: 'var(--color-light-border)' } as const;

  return (
    <div className="min-h-screen bg-cream">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Intro Section */}
      <div className="bg-secondary border-b border-light-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
            Welcome to CareerOS
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            Build your complete professional profile. This information helps us match you with the right opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-4 gap-10">
          {/* Left: sticky progress */}
          <div className="col-span-1">
            <div className="sticky top-10">
              <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--color-foreground)' }}>
                Welcome
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                Let&apos;s set up your profile
              </p>

              <ol className="relative">
                {SECTIONS.map((section, index) => {
                  const isActive = index === activeIndex;
                  const isFilled = index <= activeIndex;
                  return (
                    <li key={section.id} className="relative pb-8 last:pb-0">
                      {index < SECTIONS.length - 1 && (
                        <span
                          className="absolute left-2.75 top-6 w-px h-full"
                          style={{ backgroundColor: isFilled ? 'var(--color-accent)' : 'var(--color-light-border)' }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => goToStep(index)}
                        className="relative flex items-center gap-3 text-left"
                      >
                        <span
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
                          style={{
                            backgroundColor: isFilled ? 'var(--color-accent)' : 'var(--color-card)',
                            border: `1px solid ${isFilled ? 'var(--color-accent)' : 'var(--color-light-border)'}`,
                            color: isFilled ? '#fff' : 'var(--color-muted)',
                          }}
                        >
                          {index + 1}
                        </span>
                        <span
                          className={`text-sm ${isActive ? 'font-semibold' : ''}`}
                          style={{ color: isActive ? 'var(--color-foreground)' : 'var(--color-muted)' }}
                        >
                          {section.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Right: form content */}
          <div className="col-span-3">
            {/* About You */}
            {activeIndex === 0 && (
            <div id="about" ref={(el) => { sectionRefs.current.about = el; }} style={{
              animation: 'fadeInUp 500ms ease-out',
            }}>
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                    <IconAbout />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    About You
                  </h3>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                  Tell us a little about yourself.
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-full bg-gray-200 bg-cover bg-center shrink-0"
                    style={photoPreview ? { backgroundImage: `url(${photoPreview})` } : undefined}
                  />
                  <label
                    className="text-sm font-medium px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                  >
                    Upload photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                      Full name
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                      Phone number
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                    Location
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Kuala Lumpur, Malaysia"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                    Short bio / background
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="A short summary about your background and goals"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="px-6 py-2 rounded-lg border font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Next
                </button>
              </div>
            </div>
            )}

            {/* Education */}
            {activeIndex === 1 && (
            <div id="education" ref={(el) => { sectionRefs.current.education = el; }} style={{
              animation: 'fadeInUp 500ms ease-out',
            }}>
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                    <IconEducation />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    Education
                  </h3>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                  Add your education history.
                </p>

                <div className="space-y-6">
                  {educationList.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="relative rounded-lg border p-4"
                      style={{ borderColor: 'var(--color-light-border)' }}
                    >
                      {educationList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(entry.id)}
                          className="absolute top-3 right-3 text-xs"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          Remove
                        </button>
                      )}
                      <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
                        Entry {index + 1}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            School / University
                          </label>
                          <input
                            value={entry.school}
                            onChange={(e) => updateEducation(entry.id, 'school', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="University of Malaya"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            Degree
                          </label>
                          <input
                            value={entry.degree}
                            onChange={(e) => updateEducation(entry.id, 'degree', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Bachelor's Degree"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            Field of study
                          </label>
                          <input
                            value={entry.field}
                            onChange={(e) => updateEducation(entry.id, 'field', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            Start year
                          </label>
                          <input
                            value={entry.startYear}
                            onChange={(e) => updateEducation(entry.id, 'startYear', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="2018"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            End year
                          </label>
                          <input
                            value={entry.endYear}
                            onChange={(e) => updateEducation(entry.id, 'endYear', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="2022"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-4 text-sm font-medium px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  + Add education
                </button>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-2 rounded-lg border font-medium text-sm transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Next
                </button>
              </div>
            </div>
            )}

            {/* Experience */}
            {activeIndex === 2 && (
            <div id="experience" ref={(el) => { sectionRefs.current.experience = el; }} style={{
              animation: 'fadeInUp 500ms ease-out',
            }}>
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                    <IconExperience />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    Experience
                  </h3>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                  Add your past jobs.
                </p>

                <div className="space-y-6">
                  {experienceList.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="relative rounded-lg border p-4"
                      style={{ borderColor: 'var(--color-light-border)' }}
                    >
                      {experienceList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(entry.id)}
                          className="absolute top-3 right-3 text-xs"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          Remove
                        </button>
                      )}
                      <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
                        Entry {index + 1}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            Company
                          </label>
                          <input
                            value={entry.company}
                            onChange={(e) => updateExperience(entry.id, 'company', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Grab"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            Job title
                          </label>
                          <input
                            value={entry.title}
                            onChange={(e) => updateExperience(entry.id, 'title', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Product Analyst"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            Start date
                          </label>
                          <input
                            value={entry.startDate}
                            onChange={(e) => updateExperience(entry.id, 'startDate', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Jan 2021"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                            End date
                          </label>
                          <input
                            value={entry.endDate}
                            onChange={(e) => updateExperience(entry.id, 'endDate', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                          Description
                        </label>
                        <textarea
                          value={entry.description}
                          onChange={(e) => updateExperience(entry.id, 'description', e.target.value)}
                          rows={3}
                          className={inputClass}
                          style={inputStyle}
                          placeholder="What did you work on?"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-4 text-sm font-medium px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  + Add experience
                </button>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-2 rounded-lg border font-medium text-sm transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Next
                </button>
              </div>
            </div>
            )}

            {/* Skills & Interests */}
            {activeIndex === 3 && (
            <div id="skills" ref={(el) => { sectionRefs.current.skills = el; }} style={{
              animation: 'fadeInUp 500ms ease-out',
            }}>
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                    <IconSkills />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    Skills & Interests
                  </h3>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                  Add tags that describe your skills and interests.
                </p>

                <div className="flex gap-2 mb-4">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="e.g. React, Data Analysis, Design"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="shrink-0 text-sm font-medium px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors"
                    style={{ backgroundColor: 'var(--color-foreground)' }}
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-near-black)' }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-xs leading-none hover:opacity-70"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      No tags added yet.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-2 rounded-lg border font-medium text-sm transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Next
                </button>
              </div>
            </div>
            )}

            {/* Resume & Links */}
            {activeIndex === 4 && (
            <div id="links" ref={(el) => { sectionRefs.current.links = el; }} style={{
              animation: 'fadeInUp 500ms ease-out',
            }}>
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                    <IconLinks />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    Resume & Links
                  </h3>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                  Optional — add a resume or links to your work.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                    Resume
                  </label>
                  <div className="flex items-center gap-3">
                    <label
                      className="text-sm font-medium px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                    >
                      Upload resume
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} />
                    </label>
                    {resumeName && (
                      <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                        {resumeName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                      LinkedIn
                    </label>
                    <input
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                      Portfolio
                    </label>
                    <input
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                      GitHub
                    </label>
                    <input
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="https://github.com/yourname"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-2 rounded-lg border font-medium text-sm transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Next
                </button>
              </div>
            </div>
            )}

            {/* Preferences */}
            {activeIndex === 5 && (
            <div id="preferences" ref={(el) => { sectionRefs.current.preferences = el; }} style={{
              animation: 'fadeInUp 500ms ease-out',
            }}>
              <div className="bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                    <IconPreferences />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    Preferences
                  </h3>
                </div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                  Fine-tune how you want to be matched.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        Job match alerts
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        Get notified when a job matches your profile.
                      </p>
                    </div>
                    <Toggle checked={jobAlerts} onChange={setJobAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        Open to relocation
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        Show roles outside your current location.
                      </p>
                    </div>
                    <Toggle checked={openToRelocation} onChange={setOpenToRelocation} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                        Let employers discover me
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        Make your profile visible in employer searches.
                      </p>
                    </div>
                    <Toggle checked={discoverable} onChange={setDiscoverable} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                      Availability to start
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="immediate">Immediately</option>
                      <option value="2weeks">Within 2 weeks</option>
                      <option value="1month">Within 1 month</option>
                      <option value="3months">Within 3 months</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-2 rounded-lg border font-medium text-sm transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-foreground)' }}
                >
                  Previous
                </button>
                <Link
                  href="/candidates"
                  className="px-6 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 transition-colors inline-block"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Complete profile
                </Link>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
