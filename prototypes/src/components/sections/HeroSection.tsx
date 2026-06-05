"use client";

import { AssetImage } from "@/components/shared/AssetImage";
import {
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  brandLabel?: string;
  backgroundImage: string;
  mobileBackgroundImage?: string;
  highlights?: string[];
  children?: ReactNode;
  className?: string;
}

const DEFAULT_HIGHLIGHTS = [
  "5-Week Courses",
  "One Class at a Time",
  "$0 Application Fee",
];

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection(
    {
      headline,
      subheadline,
      brandLabel = "University of Arizona Global Campus",
      backgroundImage,
      mobileBackgroundImage,
      highlights = DEFAULT_HIGHLIGHTS,
      children,
      className,
    },
    forwardedRef,
  ) {
  const mobileSrc = mobileBackgroundImage ?? backgroundImage;
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const setSectionRef = (node: HTMLElement | null) => {
    sectionRef.current = node;
    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(rect.height, 1)),
      );
      const translateY = scrollProgress * 12;
      const scale = 1 + scrollProgress * 0.02;
      imageWrap.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={setSectionRef}
      className={cn("relative w-full overflow-hidden", className)}
      aria-label="Hero"
    >
      {/* === MOBILE: app-native compact hero === */}
      <div className="lg:hidden">
        {/* Image with gradient overlay, headline + subheadline */}
        <div className="relative h-[56vw] min-h-[210px] max-h-[260px]">
          <AssetImage
            src={mobileSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 1px"
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-uagc-navy/75" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
            <p className="hero-enter-headline type-eyebrow mb-0.5 text-white/90">
              {brandLabel}
            </p>
            <h1 className="hero-enter-headline type-h1-sm text-white">
              {headline}
            </h1>
            {subheadline ? (
              <p className="mt-1.5 text-[0.75rem] leading-snug text-white/80 sm:text-[0.8125rem]">
                {subheadline}
              </p>
            ) : null}
          </div>
        </div>

        {/* Highlight pills — tight to hero */}
        <div className="flex flex-wrap gap-2 bg-uagc-navy px-5 pb-4 pt-2.5">
          {highlights.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.8125rem] font-semibold leading-tight text-white ring-1 ring-white/25"
            >
              <span className="size-1.5 rounded-full bg-uagc-gold" aria-hidden />
              {item}
            </span>
          ))}
        </div>

        {/* Pathing CTAs or RFI — directly below hero on mobile */}
        <div className="bg-uagc-surface px-4 pb-4 pt-3 sm:px-5">
          <div className="hero-enter-form mx-auto w-full max-w-[440px]">
            {children ?? (
              <div
                className="min-h-[240px] w-full rounded-lg border border-gray-100 bg-white p-4"
                aria-label="Request for information form placeholder"
              />
            )}
          </div>
        </div>
      </div>

      {/* === DESKTOP: compact 60/40 split — image with overlay text + form panel === */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">
        {/* Image column with overlaid headline */}
        <div className="relative min-h-[420px] max-h-[540px]">
          <div
            ref={imageWrapRef}
            className="absolute inset-0 will-change-transform"
            aria-hidden="true"
          >
            <AssetImage
              src={backgroundImage}
              alt=""
              fill
              priority
              sizes="65vw"
              className="object-cover object-[center_25%]"
            />
          </div>
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-uagc-navy/55" />

          {/* Headline content — vertically centered */}
          <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-center px-10 py-10 xl:px-14">
            <div className="hero-enter-headline max-w-[520px]">
              <p className="type-eyebrow mb-2 text-white/90">
                {brandLabel}
              </p>
              <h1 className="type-h1 text-white">
                {headline}
              </h1>
              {subheadline ? (
                <p className="mt-3 max-w-[440px] text-[0.9375rem] leading-relaxed text-white/95">
                  {subheadline}
                </p>
              ) : null}

              {/* Quick-scan value highlights */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25"
                  >
                    <span className="size-1.5 rounded-full bg-uagc-gold" aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pathing panel or RFI sidebar */}
        <div className="relative z-10 flex flex-col justify-center bg-uagc-surface px-7 py-8 xl:px-9">
          <div className="hero-enter-form w-full">
            {children ?? (
              <div
                className="min-h-[280px] w-full rounded-lg border border-gray-100 bg-white p-5"
                aria-label="Request for information form placeholder"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
},
);
