"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogArticleTOCProps {
  sections: { heading: string }[];
  className?: string;
}

export function BlogArticleTOC({ sections, className }: BlogArticleTOCProps) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [hasAppeared, setHasAppeared] = useState(false);
  const tocRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setHasAppeared(true);
      return;
    }

    const raf = requestAnimationFrame(() => setHasAppeared(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const ids = sections.map((_, i) => `section-${i}`);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          const idx = ids.indexOf(id);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
      e.preventDefault();
      const el = document.getElementById(`section-${idx}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveIdx(idx);
      }
    },
    [],
  );

  if (sections.length < 3) return null;

  return (
    <nav
      ref={tocRef}
      aria-label="Table of contents"
      className={cn("mb-8 sm:mb-10", className)}
    >
      <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 px-5 py-4 sm:px-6 sm:py-5">
        {/* Header */}
        <div className="mb-3 flex items-center gap-2">
          <List className="size-4 text-uagc-navy/40" aria-hidden />
          <h2 className="text-[0.8125rem] font-bold uppercase tracking-wider text-uagc-navy/50">
            In This Article
          </h2>
        </div>

        {/* Section links */}
        <ol className="grid gap-0.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0.5">
          {sections.map((s, i) => (
            <li
              key={s.heading}
              className={cn(
                "toc-item",
                hasAppeared && "toc-item-visible",
              )}
              style={{
                transitionDelay: hasAppeared ? `${i * 40}ms` : "0ms",
              }}
            >
              <a
                href={`#section-${i}`}
                onClick={(e) => handleClick(e, i)}
                className={cn(
                  "group flex items-baseline gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors",
                  "duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  activeIdx === i
                    ? "bg-uagc-navy/6 text-uagc-navy"
                    : "text-uagc-navy/65 hover:bg-uagc-navy/4 hover:text-uagc-navy",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold tabular-nums transition-colors",
                    "duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    activeIdx === i
                      ? "bg-uagc-navy text-white"
                      : "bg-uagc-navy/8 text-uagc-navy/45 group-hover:bg-uagc-navy/12 group-hover:text-uagc-navy/60",
                  )}
                >
                  {i + 1}
                </span>
                <span className="text-[0.8125rem] leading-snug line-clamp-1">
                  {s.heading}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
