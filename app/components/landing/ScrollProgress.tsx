"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ScrollProgress() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!reduced) {
      document.documentElement.classList.add("sr-on");
    } else {
      document.documentElement.classList.remove("sr-on");
    }

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      doc.style.setProperty("--scroll-progress", String(p));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      document.documentElement.classList.remove("sr-on");
    };
  }, [reduced]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
