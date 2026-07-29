"use client";

import { useEffect, useState, type RefObject } from "react";

interface BlogReadingProgressProps {
  contentRef: RefObject<HTMLElement | null>;
}

export function BlogReadingProgress({ contentRef }: BlogReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight;
      const visible = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(100, (scrolled / (total - visible)) * 100);
      setProgress(pct);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [contentRef]);

  if (progress <= 0) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-[3px]"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-uagc-navy transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
