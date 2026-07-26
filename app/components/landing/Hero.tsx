import Link from "next/link";
import { stats } from "./content";
import ScrollCue from "./ScrollCue";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[86vh] flex-col items-center justify-center px-6 pb-16 pt-24 text-center"
    >
      <span className="hero-rise hero-rise-1 mb-6 rounded-full bg-accent px-4 py-1.5 text-xs uppercase tracking-wider !text-white">
        Proof-of-Work Marketplace
      </span>

      <h1 className="hero-rise hero-rise-2 mb-6 max-w-4xl font-headings text-4xl font-bold leading-tight text-accent md:text-6xl">
        Hiring based on real evidence, <span className="italic">not resumes.</span>
      </h1>

      <p className="hero-rise hero-rise-3 mb-10 max-w-2xl text-base text-muted md:text-lg">
        Career OS matches candidates and hiring teams on portfolio artifacts and real business
        challenges. Both sides swipe right before the conversation begins.
      </p>

      <div className="hero-rise hero-rise-4 mb-16 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/auth?mode=login&role=candidate"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold !text-white transition hover:opacity-90"
        >
          I&apos;m a Candidate
        </Link>
        <Link
          href="/auth?mode=login&role=employer"
          className="rounded-full border border-accent px-8 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:!text-white"
        >
          I&apos;m an Employer
        </Link>
      </div>

      <div className="hero-rise hero-rise-5 mx-auto grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-headings text-3xl font-bold text-accent md:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <ScrollCue />
      </div>
    </section>
  );
}
