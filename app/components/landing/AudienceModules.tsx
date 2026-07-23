"use client";

import { useId, useState } from "react";
import { audienceModules, type AudienceKey } from "./content";
import { useInView } from "./useInView";

const keys = Object.keys(audienceModules) as AudienceKey[];

export default function AudienceModules() {
  const [aud, setAud] = useState<AudienceKey>("candidates");
  const baseId = useId();
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });
  const panel = audienceModules[aud];

  return (
    <section
      id="matching"
      ref={ref}
      className={`scroll-mt-24 border-t border-light-border/50 bg-card/40 py-20 md:py-28 ${
        inView ? "reveal-target is-in" : "reveal-target"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
          <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
          <span>Smart matching</span>
          <span className="font-headings text-[13px] font-normal normal-case italic tracking-normal text-muted">
            / 05
          </span>
        </div>
        <h2 className="mb-6 max-w-3xl font-headings text-3xl font-bold leading-tight text-near-black md:text-5xl">
          One marketplace. <span className="italic">Three audiences.</span>
        </h2>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          AI-powered matching that understands skills, context, and potential — not keywords. See
          what each side gets.
        </p>

        <div
          role="tablist"
          aria-label="Audience modules"
          className="mb-8 flex flex-wrap gap-2"
        >
          {keys.map((key) => {
            const selected = aud === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`${baseId}-tab-${key}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setAud(key)}
                onKeyDown={(e) => {
                  const i = keys.indexOf(key);
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    setAud(keys[(i + 1) % keys.length]);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    setAud(keys[(i - 1 + keys.length) % keys.length]);
                  }
                }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-near-black ${
                  selected
                    ? "bg-near-black !text-white"
                    : "border border-light-border bg-card text-near-black hover:border-near-black"
                }`}
              >
                {audienceModules[key].label}
              </button>
            );
          })}
        </div>

        {keys.map((key) => {
          const data = audienceModules[key];
          const hidden = key !== aud;
          return (
            <div
              key={key}
              role="tabpanel"
              id={`${baseId}-panel-${key}`}
              aria-labelledby={`${baseId}-tab-${key}`}
              hidden={hidden}
              className="grid gap-4 md:grid-cols-2"
            >
              {data.rows.map((row, idx) => (
                <div
                  key={row.title}
                  className="rounded-xl border border-light-border bg-card p-6"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-headings text-sm italic text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-near-black">{row.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{row.desc}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
