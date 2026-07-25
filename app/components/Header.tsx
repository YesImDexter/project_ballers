import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-light-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-near-black">
            Career<span className="text-accent">OS</span>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
              <Link
                href="/#candidates"
                className="text-sm font-medium text-muted transition hover:text-near-black"
              >
                For talent
              </Link>
              <Link
                href="/#employers"
                className="text-sm font-medium text-muted transition hover:text-near-black"
              >
                For employers
              </Link>
              <Link
                href="/#matching"
                className="text-sm font-medium text-muted transition hover:text-near-black"
              >
                Matching
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/candidates"
                className="px-4 py-2 text-sm font-medium text-muted transition hover:text-near-black"
              >
                Log in
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-near-black px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
