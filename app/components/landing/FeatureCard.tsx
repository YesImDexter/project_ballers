import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export default function FeatureCard({ icon, title, desc }: Props) {
  return (
    <div className="rounded-xl border border-light-border/50 bg-card p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-near-black !text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-near-black">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}
