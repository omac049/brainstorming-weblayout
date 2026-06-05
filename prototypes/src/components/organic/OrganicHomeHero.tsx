"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, type RefObject } from "react";

import { HOMEPAGE_CLONE } from "@/lib/clones/homepage-clone";
import { cn } from "@/lib/utils";

interface TrustPill {
  label: string;
  accent?: boolean;
}

interface SectionNavItem {
  id: string;
  label: string;
}

const DEFAULT_TRUST_PILLS: TrustPill[] = [
  { label: "$485/credit", accent: true },
  { label: "5-Week Courses" },
  { label: "WSCUC Accredited" },
  { label: "$0 to Apply" },
];

export interface OrganicHomeHeroProps {
  heroRef?: RefObject<HTMLElement | null>;
  className?: string;
  eyebrow?: string;
  headline?: ReactNode;
  subheadline?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  trustPills?: TrustPill[];
  sectionNavItems?: SectionNavItem[];
}

export function OrganicHomeHero({
  heroRef,
  className,
  eyebrow = "University of Arizona Global Campus",
  headline,
  subheadline = "54+ accredited programs — one class at a time, in 5-week courses that fit around your job, your family, and your life.",
  imageSrc = "/images/homepage-hero-proud.webp",
  imageAlt = "UAGC graduates celebrating at commencement",
  imagePosition = "center 35%",
  trustPills = DEFAULT_TRUST_PILLS,
  sectionNavItems = HOMEPAGE_CLONE.sectionNav as unknown as SectionNavItem[],
}: OrganicHomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const defaultHeadline = (
    <>
      Finish Your Degree
      <br />
      On Your Schedule
    </>
  );
  const resolvedHeadline = headline ?? defaultHeadline;

  const setSectionRef = (node: HTMLElement | null) => {
    sectionRef.current = node;
    if (heroRef && "current" in heroRef) {
      heroRef.current = node;
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
      const translateY = scrollProgress * 24;
      const scale = 1 + scrollProgress * 0.04;
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
    <div className={cn("w-full", className)}>
      <section
        ref={setSectionRef}
        className="relative flex w-full flex-col overflow-hidden"
        aria-label="Hero"
      >
        {/* === MOBILE === */}
        <div className="relative flex h-[480px] flex-col justify-end sm:h-[520px] lg:hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,35,75,0.97)_0%,rgba(12,35,75,0.65)_45%,rgba(12,35,75,0.15)_70%,transparent_100%)]" />

          <div className="relative z-10 px-5 pb-5 sm:px-8">
            <div className="hero-enter-headline">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-uagc-gold">
                {eyebrow}
              </p>
              <h1 className="mt-2 font-heading-condensed text-[clamp(2.25rem,10vw,3.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-white">
                {resolvedHeadline}
              </h1>
            </div>
            <p className="hero-enter-sub mt-3 max-w-[340px] text-[0.9375rem] leading-relaxed text-white/90">
              {subheadline}
            </p>

            {trustPills.length > 0 && (
              <div className="hero-enter-pills mt-6 flex flex-wrap items-center gap-2">
                {trustPills.map((pill) => (
                  <span
                    key={pill.label}
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1.5 text-[0.75rem] font-medium tracking-wide",
                      pill.accent
                        ? "trust-pill-accent border border-uagc-gold/50 bg-uagc-gold/20 font-semibold text-white"
                        : "border border-white/25 bg-white/10 text-white/95",
                    )}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {sectionNavItems.length > 0 && (
            <HeroSectionNav items={sectionNavItems} className="hero-enter-nav relative z-10" />
          )}
        </div>

        {/* === DESKTOP === */}
        <div className="relative hidden h-[600px] lg:flex lg:flex-col xl:h-[660px]">
          <div
            ref={imageWrapRef}
            className="absolute inset-0 will-change-transform"
            aria-hidden="true"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,35,75,0.92)_0%,rgba(12,35,75,0.65)_32%,rgba(12,35,75,0.12)_55%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,35,75,0.55)_0%,transparent_30%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-10 xl:px-14">
            <div className="max-w-[560px]">
              <div className="hero-enter-headline">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-uagc-gold">
                  {eyebrow}
                </p>
                <h1 className="mt-3 font-heading-condensed text-[clamp(3.25rem,4.5vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
                  {resolvedHeadline}
                </h1>
              </div>
              <p className="hero-enter-sub mt-5 max-w-[480px] text-[1.0625rem] leading-relaxed text-white/90">
                {subheadline}
              </p>

              {trustPills.length > 0 && (
                <div className="hero-enter-pills mt-8 flex flex-wrap items-center gap-2.5">
                  {trustPills.map((pill) => (
                    <span
                      key={pill.label}
                      className={cn(
                        "inline-flex items-center rounded-full px-4 py-1.5 text-[0.8125rem] tracking-wide transition-colors duration-200",
                        pill.accent
                          ? "trust-pill-accent border border-uagc-gold/50 bg-uagc-gold/20 font-semibold text-white"
                          : "border border-white/25 bg-white/10 font-medium text-white hover:bg-white/15",
                      )}
                    >
                      {pill.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {sectionNavItems.length > 0 && (
            <HeroSectionNav items={sectionNavItems} className="hero-enter-nav relative z-10" />
          )}
        </div>
      </section>
    </div>
  );
}

function HeroSectionNav({
  items,
  className,
}: {
  items: SectionNavItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "w-full border-t border-white/15 bg-uagc-navy/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-1 overflow-x-auto px-5 py-2 sm:justify-center sm:gap-1.5 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 min-w-[44px] rounded-full px-3.5 py-2 text-center text-xs font-medium tracking-wide text-white/75 transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-0 sm:px-4 sm:text-[0.8125rem]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
