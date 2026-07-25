import { pillars } from "./content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function VisionPillars() {
  return (
    <section id="vision" className="scroll-mt-24 border-t border-light-border/50 bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="The vision"
            num="01"
            title={
              <>
                Four jobs Career OS <span className="italic">actually does.</span>
              </>
            }
            lede={
              <>
                Across Asia, careers are built spontaneously, unpredictably, alone.{" "}
                <strong className="font-semibold text-accent">
                  Career OS is the layer that helps every working life make sense
                </strong>{" "}
                — at every chapter of the hiring journey.
              </>
            }
          />
        </Reveal>

        <Reveal group className="grid gap-5 md:grid-cols-2">
          {pillars.map((p) => (
            <article
              key={p.num}
              className="pillar reveal-item rounded-xl border border-light-border bg-secondary p-7 md:p-8"
            >
              <div className="mb-4 font-headings text-4xl font-bold italic text-brand">{p.num}</div>
              <h3 className="mb-2 font-headings text-2xl font-bold text-accent">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">{p.desc}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
