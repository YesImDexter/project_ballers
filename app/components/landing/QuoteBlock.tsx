"use client";

import { quoteLines } from "./content";
import { useInView } from "./useInView";

export default function QuoteBlock() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`reveal-group relative mt-14 overflow-hidden bg-near-black px-8 py-10 text-left !text-white md:px-12 md:py-12 ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden="true" />
      {quoteLines.map((line, i) => (
        <p
          key={line}
          className={`vq-line font-headings text-xl font-normal leading-snug md:text-2xl ${
            i === 1 ? "italic text-accent-soft" : "!text-white"
          } ${i > 0 ? "mt-3" : ""}`}
        >
          {line}
        </p>
      ))}
      <div className="vq-line mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
        Talentbank · 2026
      </div>
    </div>
  );
}
