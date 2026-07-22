export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-light-border sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-near-black">
            Career<span className="text-amber-600">OS</span>
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden sm:flex items-center gap-6">
              {/* <a href="#candidates" className="text-sm font-medium text-muted hover:text-near-black transition">
                For talent
              </a>
              <a href="#employers" className="text-sm font-medium text-muted hover:text-near-black transition">
                For employers
              </a> */}
              {/* <a href="#universities" className="text-sm font-medium text-muted hover:text-near-black transition">
                For universities
              </a> */}
            </nav>

            <div className="flex items-center gap-3">
              <a href="/candidates" className="text-sm font-medium text-muted hover:text-near-black px-4 py-2 transition">
                Log in
              </a>
              <a
                href="/candidates"
                className="inline-flex items-center justify-center rounded-full bg-near-black px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
