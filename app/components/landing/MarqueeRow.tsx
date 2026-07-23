type Props = {
  name: string;
  sub: string;
  items: readonly string[];
  reverse?: boolean;
  slow?: boolean;
};

export default function MarqueeRow({ name, sub, items, reverse, slow }: Props) {
  const doubled = [...items, ...items];
  const trackClass = [
    "marquee-track",
    reverse ? "reverse" : "",
    slow ? "slow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr] md:items-center">
      <div>
        <div className="font-headings text-base font-bold text-near-black">{name}</div>
        <div className="mt-1 text-xs leading-snug text-muted">{sub}</div>
      </div>
      <div className="overflow-hidden">
        <div className={trackClass} aria-hidden="true">
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="shrink-0 rounded-full border border-light-border bg-card px-4 py-2 text-sm text-near-black"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="sr-only">{items.join(", ")}</span>
      </div>
    </div>
  );
}
