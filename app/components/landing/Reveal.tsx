"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  group?: boolean;
};

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  group = false,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const motionClass = group
    ? `reveal-group ${inView ? "in-view" : ""}`
    : `reveal-target ${inView ? "is-in" : ""}`;

  return (
    <Tag ref={ref as never} className={`${motionClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
