"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

function shouldRevealImmediately(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
}

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(() => shouldRevealImmediately());

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldRevealImmediately()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    const initiallyVisible =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;
    if (initiallyVisible) {
      requestAnimationFrame(() => {
        setIsVisible(true);
        if (once) observer.unobserve(el);
      });
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

export function useAnimatedCounter(
  end: number,
  isVisible: boolean,
  duration = 1800,
) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);
  const prefersReduced = getPrefersReducedMotion();

  useEffect(() => {
    if (!isVisible || hasRun.current || prefersReduced) return;
    hasRun.current = true;

    const start = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutQuart(progress) * end));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isVisible, end, duration, prefersReduced]);

  if (!isVisible) return 0;
  if (prefersReduced) return end;
  return count;
}
