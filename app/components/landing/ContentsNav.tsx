import { contents } from "./content";
import Reveal from "./Reveal";

export default function ContentsNav() {
  return (
    <section id="contents" className="scroll-mt-24 border-t border-light-border/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
            Contents
          </div>
          <h2 className="mb-10 font-headings text-3xl font-bold text-accent md:text-4xl">
            Five <span className="italic">sections.</span>
          </h2>
        </Reveal>

        <Reveal group>
          <nav aria-label="Page sections" className="divide-y divide-light-border/70 border-y border-light-border/70">
            {contents.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="reveal-item group flex items-center gap-4 py-5 transition hover:bg-secondary/60"
              >
                <span className="w-12 shrink-0 font-headings text-sm italic text-muted">
                  / {item.num}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-headings text-lg font-bold text-accent group-hover:text-brand">
                    {item.name}
                  </span>
                  <span className="block text-sm text-muted">{item.desc}</span>
                </span>
                <span className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
