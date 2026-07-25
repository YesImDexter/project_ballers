import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  num?: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  num,
  title,
  lede,
  className = "",
}: Props) {
  return (
    <div className={className}>
      {(eyebrow || num) && (
        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
          <span className="inline-block h-px w-6 bg-brand" aria-hidden="true" />
          {eyebrow && <span>{eyebrow}</span>}
          {num && (
            <span className="font-headings text-[13px] font-normal normal-case italic tracking-normal text-muted">
              / {num}
            </span>
          )}
        </div>
      )}
      <h2 className="mb-6 max-w-3xl font-headings text-3xl font-bold leading-tight text-accent md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {lede}
        </p>
      )}
    </div>
  );
}
