import { journey } from "./content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function CareerJourney() {
  return (
    <section id="journey" className="scroll-mt-24 border-t border-light-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="The journey"
            num="02"
            title={
              <>
                From first proof to <span className="italic">hire.</span>
              </>
            }
            lede={
              <>
                Most career platforms are designed for one moment —{" "}
                <strong className="font-semibold text-near-black">the job hunt.</strong> Career OS is
                designed for every chapter of evidence-based hiring.
              </>
            }
          />
        </Reveal>

        <Reveal group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((step, i) => (
            <article
              key={step.title}
              className="reveal-item rounded-xl border border-light-border bg-card p-6"
            >
              <div className="mb-3 font-headings text-sm font-bold tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 font-headings text-xl font-bold text-near-black">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
