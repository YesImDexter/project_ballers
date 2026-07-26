import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';

export default function Page() {
  return (
    <div className="min-h-screen bg-cream">
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <CandidateSidebar />

          {/* Right Content (Big) */}
          <div className="col-span-3 bg-card rounded-lg border p-8 shadow-sm" style={{ borderColor: 'var(--color-light-border)' }}>
          </div>
        </div>
      </div>
    </div>
  );
}
