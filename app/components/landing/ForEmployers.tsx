import { employerCards } from "./content";
import FeatureCard from "./FeatureCard";
import { iconByName } from "./icons";
import Reveal from "./Reveal";

export default function ForEmployers() {
  return (
    <section id="employers" className="scroll-mt-24 border-t border-light-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="block select-none font-headings text-8xl font-bold leading-none text-accent/5 md:text-9xl">
            02
          </span>
          <div className="-mt-10 md:-mt-14">
            <h2 className="mb-6 font-headings text-3xl font-bold text-accent md:text-5xl">
              For Employers — Hire from proof, not promises.
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-muted">
              Describe the real challenge you need solved. We match you with candidates whose
              proof-of-work fits.
            </p>
          </div>
        </Reveal>

        <Reveal group className="mb-10 grid gap-6 md:grid-cols-3">
          {employerCards.map((card) => (
            <div key={card.title} className="reveal-item">
              <FeatureCard
                icon={iconByName(card.icon)}
                title={card.title}
                desc={card.desc}
              />
            </div>
          ))}
        </Reveal>

        <Reveal>
          <a
            href="#matching"
            className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold !text-white transition hover:opacity-90"
          >
            See how matching works
          </a>
        </Reveal>
      </div>
    </section>
  );
}
