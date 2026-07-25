'use client';

import { useState, useMemo } from 'react';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';
import { companies, sectors, locations, ratings, tenures, programs, type Company } from '@/app/candidates/data/company_data';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedTenure, setSelectedTenure] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = !selectedSector || company.sector === selectedSector;
      const matchesLocation = !selectedLocation || company.location === selectedLocation;
      const matchesRating = !selectedRating || company.ratings >= parseFloat(selectedRating);
      const matchesTenure = !selectedTenure || company.tenure === selectedTenure;
      const matchesProgram = !selectedProgram || company.programs.includes(selectedProgram);

      return matchesSearch && matchesSector && matchesLocation && matchesRating && matchesTenure && matchesProgram;
    });
  }, [searchQuery, selectedSector, selectedLocation, selectedRating, selectedTenure, selectedProgram]);

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
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>Discover Companies</h1>
              <p style={{ color: 'var(--color-muted)' }}>Explore job opportunities from leading companies</p>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-lg border p-6 mb-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Search Companies</label>
                <input
                  type="text"
                  placeholder="Search by company name or sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: 'var(--color-light-border)',
                    color: 'var(--color-foreground)',
                    backgroundColor: 'var(--color-cream)',
                  }}
                />
              </div>

              {/* Filter Comboboxes */}
              <div className="grid grid-cols-5 gap-4">
                {/* Sector */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Sector</label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-cream)',
                    }}
                  >
                    <option value="">All Sectors</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-cream)',
                    }}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ratings */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Ratings</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-cream)',
                    }}
                  >
                    <option value="">All Ratings</option>
                    {ratings.map((r) => (
                      <option key={r.value} value={r.value.toString()}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Tenure</label>
                  <select
                    value={selectedTenure}
                    onChange={(e) => setSelectedTenure(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-cream)',
                    }}
                  >
                    <option value="">All Tenures</option>
                    {tenures.map((tenure) => (
                      <option key={tenure} value={tenure}>
                        {tenure}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Programs */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Programs</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                    style={{
                      borderColor: 'var(--color-light-border)',
                      color: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-cream)',
                    }}
                  >
                    <option value="">All Programs</option>
                    {programs.map((program) => (
                      <option key={program} value={program}>
                        {program.charAt(0).toUpperCase() + program.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Company Grid */}
            <div className="grid grid-cols-2 gap-6">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company: Company) => (
                  <div
                    key={company.id}
                    className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    style={{ borderColor: 'var(--color-light-border)' }}
                  >
                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={company.company_image}
                          alt={company.company_name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
                            {company.company_name}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                            {company.sector}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-lg font-semibold" style={{ color: 'var(--color-accent)' }}>
                            {company.ratings}
                          </span>
                          <span style={{ color: 'var(--color-accent)' }}>★</span>
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="space-y-3 mb-4 pb-4 border-b" style={{ borderColor: 'var(--color-light-border)' }}>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-muted)' }}>Location</span>
                        <span style={{ color: 'var(--color-foreground)' }}>{company.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-muted)' }}>Tenure</span>
                        <span style={{ color: 'var(--color-foreground)' }}>{company.tenure}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--color-muted)' }}>Followers</span>
                        <span style={{ color: 'var(--color-foreground)' }}>{company.followers.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Open Jobs */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm" style={{ color: 'var(--color-muted)' }}>Open Positions</span>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: 'var(--color-accent)',
                          color: 'white',
                        }}
                      >
                        {company.open_jobs}
                      </span>
                    </div>

                    {/* Verifications */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {company.verifications.map((verification) => (
                        <span
                          key={verification}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--color-light-border)',
                            color: 'var(--color-muted)',
                          }}
                        >
                          {verification}
                        </span>
                      ))}
                    </div>

                    {/* Programs */}
                    <div className="flex flex-wrap gap-2">
                      {company.programs.map((program) => (
                        <span
                          key={program}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: 'var(--color-cream)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p style={{ color: 'var(--color-muted)' }}>No companies found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
