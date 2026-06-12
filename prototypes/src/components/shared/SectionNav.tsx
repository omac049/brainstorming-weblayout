"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface SectionNavItem {
  id: string;
  label: string;
}

export interface SectionNavProps {
  sections: SectionNavItem[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-end xl:gap-3"
    >
      {sections.map(({ id, label }) => {
        const isActive = id === activeId;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex min-h-11 min-w-11 items-center justify-end gap-2.5"
            aria-current={isActive ? "true" : undefined}
            aria-label={label}
          >
            <span
              className={cn(
                "pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-uagc-navy px-0 py-1 text-xs font-medium text-white opacity-0 transition-[max-width,padding,opacity] duration-200 group-hover:max-w-[160px] group-hover:px-3 group-hover:opacity-100",
                isActive && "max-w-[160px] px-3 opacity-100",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "flex size-2.5 shrink-0 items-center justify-center rounded-full border-2 transition-[border-color,transform,background-color] duration-200",
                isActive
                  ? "scale-125 border-uagc-gold bg-uagc-gold"
                  : "border-uagc-navy/30 bg-transparent group-hover:border-uagc-navy/60",
              )}
            />
          </a>
        );
      })}
    </nav>
  );
}
