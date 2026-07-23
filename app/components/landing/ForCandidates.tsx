import Link from "next/link";
import { candidateCards } from "./content";
import FeatureCard from "./FeatureCard";
import { iconByName } from "./icons";
import Reveal from "./Reveal";

export default function ForCandidates() {
  return (
    <section id="candidates" className="scroll-mt-24 border-t border-light-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="block select-none font-headings text-8xl font-bold leading-none text-near-black/5 md:text-9xl">
            01
          </span>
          <div className="-mt-10 md:-mt-14">
            <h2 className="mb-6 font-headings text-3xl font-bold text-near-black md:text-5xl">
              For Candidates — Your work speaks first.
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-muted">
              Upload your projects, get AI-evaluated skill tags, and surface in matches for real
              challenges in your target roles.
            </p>
          </div>
        </Reveal>

        <Reveal group className="mb-10 grid gap-6 md:grid-cols-3">
          {candidateCards.map((card) => (
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
          <Link
            href="/candidates"
            className="inline-flex rounded-full bg-near-black px-8 py-3 text-sm font-semibold !text-white transition hover:opacity-90"
          >
            Continue as Candidate
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
