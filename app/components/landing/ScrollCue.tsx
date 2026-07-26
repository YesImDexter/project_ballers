"use client";

import { useEffect, useState } from "react";

type Props = {
  targetId?: string;
};

export default function ScrollCue({ targetId = "infrastructure" }: Props) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onScroll = () => setGone(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-cue ${gone ? "gone" : ""}`}
      aria-label="Scroll to content"
      onClick={scrollTo}
    >
      <span className="sc-label">Scroll</span>
      <span className="sc-track" aria-hidden="true" />
    </button>
  );
}
