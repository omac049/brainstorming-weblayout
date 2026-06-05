"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
