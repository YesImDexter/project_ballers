import Link from "next/link";
import Reveal from "./Reveal";

export default function ClosingCTA() {
  return (
    <section id="cta" className="scroll-mt-24 px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-accent p-12 text-center !text-white md:p-20">
          <h2 className="mb-4 font-headings text-3xl font-bold leading-tight md:text-5xl">
            Ready to hire — or be hired — <span className="italic">on real evidence?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl !text-white/70">
            Join Career OS and start matching based on what you can actually do.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth?mode=register"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-accent transition hover:opacity-90"
            >
              Get Started Free
            </Link>
            <a
              href="#employers"
              className="rounded-full border border-white px-8 py-3 text-sm font-semibold !text-white transition hover:bg-white hover:text-accent"
            >
              Learn More
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
