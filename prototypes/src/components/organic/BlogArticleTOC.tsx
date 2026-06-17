"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogArticleTOCProps {
  sections: { heading: string }[];
  className?: string;
}

export function BlogArticleTOC({ sections, className }: BlogArticleTOCProps) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const tocRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
        setIsExpanded(false);
      }
    },
    [],
  );

  if (sections.length < 3) return null;

  const showExpanded = isDesktop || isExpanded;

  return (
    <nav
      ref={tocRef}
      aria-label="Table of contents"
      className={cn("mb-6 sm:mb-10", className)}
    >
      <div className="rounded-xl border border-gray-200/80 bg-gray-50/50">
        {/* Header — acts as toggle on mobile */}
        <button
          type="button"
          onClick={() => setIsExpanded((o) => !o)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left sm:cursor-default sm:px-6 sm:py-4"
          aria-expanded={showExpanded}
        >
          <div className="flex items-center gap-2">
            <List className="size-4 text-uagc-navy/40" aria-hidden />
            <h2 className="text-[0.8125rem] font-bold uppercase tracking-wider text-uagc-navy/50">
              In This Article
            </h2>
            <span className="rounded-full bg-uagc-navy/8 px-1.5 py-0.5 text-[0.625rem] font-bold tabular-nums text-uagc-navy/45 sm:hidden">
              {sections.length}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "size-4 text-uagc-navy/40 transition-transform duration-200 sm:hidden",
              isExpanded && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        {/* Section links — collapsible on mobile, always open on desktop */}
        <div
          className={cn(
            "overflow-hidden transition-[max-height] duration-300 ease-out sm:max-h-none",
            showExpanded ? "max-h-[2000px]" : "max-h-0",
          )}
        >
          <ol className="grid gap-1 px-4 pb-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0.5 sm:px-6 sm:pb-5">
            {sections.map((s, i) => (
              <li
                key={s.heading}
                className={cn(
                  "toc-item",
                  hasAppeared && showExpanded && "toc-item-visible",
                )}
                style={{
                  transitionDelay: hasAppeared ? `${i * 40}ms` : "0ms",
                }}
              >
                <a
                  href={`#section-${i}`}
                  onClick={(e) => handleClick(e, i)}
                  className={cn(
                    "group flex items-baseline gap-2.5 rounded-lg px-2.5 py-2 transition-colors sm:py-1.5",
                    "duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    activeIdx === i
                      ? "bg-uagc-navy/6 text-uagc-navy"
                      : "text-uagc-navy/65 hover:bg-uagc-navy/4 hover:text-uagc-navy active:bg-uagc-navy/6",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-bold tabular-nums transition-colors",
                      "duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      activeIdx === i
                        ? "bg-uagc-navy text-white"
                        : "bg-uagc-navy/8 text-uagc-navy/45 group-hover:bg-uagc-navy/12 group-hover:text-uagc-navy/60",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[0.8125rem] leading-snug line-clamp-2 sm:line-clamp-1">
                    {s.heading}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
