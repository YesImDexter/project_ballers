import { marqueeRows } from "./content";
import MarqueeRow from "./MarqueeRow";
import QuoteBlock from "./QuoteBlock";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function TrustInfrastructure() {
  return (
    <section id="infrastructure" className="scroll-mt-24 border-t border-light-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Infrastructure"
            title={
              <>
                Career OS isn&apos;t starting <span className="italic">from zero.</span>
              </>
            }
            lede={
              <>
                Talentbank has spent <strong className="font-semibold text-near-black">15 years</strong>{" "}
                building career-market infrastructure across Asia — relationships, trust, and institutional
                weight. Career OS is what gets built on top.
              </>
            }
          />
        </Reveal>

        <Reveal className="space-y-8" group>
          {marqueeRows.map((row) => (
            <div key={row.name} className="reveal-item">
              <MarqueeRow
                name={row.name}
                sub={row.sub}
                items={row.items}
                reverse={"reverse" in row ? row.reverse : false}
                slow={"slow" in row ? row.slow : false}
              />
            </div>
          ))}
        </Reveal>

        <QuoteBlock />
      </div>
    </section>
  );
}
