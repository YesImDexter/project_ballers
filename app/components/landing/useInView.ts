"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.18,
  once = true,
  rootMargin = "0px 0px -40px 0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, inView };
}
