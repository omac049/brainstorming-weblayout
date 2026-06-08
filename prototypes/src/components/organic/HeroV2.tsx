"use client";

import { AssetImage } from "@/components/shared/AssetImage";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { HOMEPAGE_CLONE } from "@/lib/clones/homepage-clone";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";

interface TrustPill {
  label: string;
  accent?: boolean;
}

interface SectionNavItem {
  id: string;
  label: string;
}

export interface HeroV2Props {
  heroRef?: RefObject<HTMLElement | null>;
  className?: string;
  eyebrow?: string;
  headline?: ReactNode;
  subheadline?: string;
  videoSrc?: string;
  imageSrc?: string;
  mobileImageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  mobileImagePosition?: string;
  trustPills?: TrustPill[];
  sectionNavItems?: SectionNavItem[];
  showSectionNav?: boolean;
}

const DEFAULT_TRUST_PILLS: TrustPill[] = [
  { label: "$485/credit", accent: true },
  { label: "5-Week Courses" },
  { label: "WSCUC Accredited" },
  { label: "$0 to Apply" },
];

function HeroTrustPills({
  trustPills,
  className,
}: {
  trustPills: TrustPill[];
  className?: string;
}) {
  if (trustPills.length === 0) return null;

  return (
    <div className={cn("hero-enter-pills flex flex-wrap items-center gap-2", className)}>
      {trustPills.map((pill) => (
        <span
          key={pill.label}
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1.5 text-[0.75rem] font-medium tracking-wide sm:px-4 sm:text-[0.8125rem]",
            pill.accent
              ? "trust-pill-accent border border-uagc-gold/50 bg-uagc-gold/20 font-semibold text-white"
              : "border border-white/25 bg-white/10 text-white/95 sm:font-medium sm:hover:bg-white/15",
          )}
        >
          {pill.label}
        </span>
      ))}
    </div>
  );
}

function HeroSectionNav({
  items,
  className,
  variant = "dark",
}: {
  items: SectionNavItem[];
  className?: string;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "w-full border-b",
        isLight
          ? "border-uagc-border bg-white"
          : "border-white/15 bg-uagc-navy/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-1 overflow-x-auto px-5 py-2.5 sm:justify-center sm:gap-1.5 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 min-w-[44px] rounded-full px-3.5 py-2 text-center text-xs font-medium tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-w-0 sm:px-4 sm:text-[0.8125rem]",
              isLight
                ? "text-uagc-navy/70 hover:bg-uagc-navy/[0.06] hover:text-uagc-navy focus-visible:outline-uagc-navy"
                : "text-white/75 hover:bg-white/10 hover:text-white focus-visible:outline-white",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function HeroVideoBackground({
  videoSrc,
  imageSrc,
  imageAlt,
  imagePosition,
  mediaRef,
}: {
  videoSrc: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
  mediaRef?: RefObject<HTMLDivElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setUseVideo(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const activateVideo = () => setVideoReady(true);

    video.addEventListener("canplaythrough", activateVideo, { once: true });

    const fallbackTimer = window.setTimeout(() => {
      if (video.readyState >= 3) activateVideo();
    }, 4000);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <div ref={mediaRef} className="absolute inset-0 will-change-transform">
      {useVideo && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          >
            <source src={assetPath(videoSrc)} type="video/mp4" />
          </video>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 z-[1] transition-opacity duration-[1200ms] ease-out",
          useVideo && videoReady && "pointer-events-none opacity-0",
        )}
        aria-hidden={useVideo && videoReady}
      >
        <AssetImage
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </div>
    </div>
  );
}

function HeroCopyBlock({
  eyebrow,
  headline,
  subheadline,
  size = "mobile",
}: {
  eyebrow: string;
  headline: ReactNode;
  subheadline: string;
  size?: "mobile" | "desktop";
}) {
  if (size === "desktop") {
    return (
      <div className="max-w-[560px]">
        <div className="hero-enter-headline">
          {eyebrow ? (
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-uagc-gold">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-heading-condensed text-[clamp(2.75rem,4vw,4.25rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-white",
              eyebrow ? "mt-3" : "",
            )}
          >
            {headline}
          </h1>
        </div>
        <p className="hero-enter-sub mt-5 max-w-[480px] text-[1.0625rem] leading-relaxed text-white/90">
          {subheadline}
        </p>
      </div>
    );
  }

  return (
    <div className="hero-enter-headline">
      {eyebrow ? (
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-uagc-gold">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "font-heading-condensed text-[clamp(2rem,9vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.01em] text-white",
          eyebrow ? "mt-2" : "",
        )}
      >
        {headline}
      </h1>
      <p className="hero-enter-sub mt-3 max-w-[340px] text-[0.875rem] leading-relaxed text-white/90">
        {subheadline}
      </p>
    </div>
  );
}

export { HeroSectionNav };

export function HeroV2({
  heroRef,
  className,
  eyebrow = "",
  headline,
  subheadline,
  videoSrc = "/images/homepage-mock-hero.mp4",
  imageSrc = "/images/homepage-mock-hero-desktop.jpg",
  mobileImageSrc = "/images/homepage-mock-hero-mobile.jpg",
  imageAlt = "UAGC graduates celebrating at commencement",
  imagePosition = "35% 12%",
  mobileImagePosition = "center 25%",
  trustPills = DEFAULT_TRUST_PILLS,
  sectionNavItems = HOMEPAGE_CLONE.sectionNav as unknown as SectionNavItem[],
  showSectionNav = true,
}: HeroV2Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const defaultHeadline = (
    <>
      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-uagc-gold sm:text-[0.8125rem] sm:tracking-[0.2em] lg:text-[0.875rem]">
        University of Arizona Global Campus
      </span>
      <span className="mt-2 block sm:mt-3">
        Finish Your Degree
        <br />
        <span className="italic text-uagc-gold">On Your Schedule</span>
      </span>
    </>
  );
  const resolvedHeadline = headline ?? defaultHeadline;
  const resolvedSubheadline =
    subheadline ??
    "Online programs built for working adults — flexible courses, generous transfer credit, and dedicated support from enrollment through graduation.";

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

  const desktopOverlay = (
    <>
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(7,21,41,0.96)_0%,rgba(7,21,41,0.75)_28%,rgba(7,21,41,0.35)_55%,rgba(7,21,41,0.08)_80%,transparent_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(7,21,41,0.65)_0%,rgba(7,21,41,0.2)_45%,transparent_70%)]" />
    </>
  );

  const mobileOverlay = (
    <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(12,35,75,0.97)_0%,rgba(12,35,75,0.65)_45%,rgba(12,35,75,0.15)_70%,transparent_100%)]" />
  );

  return (
    <div className={cn("w-full", className)}>
      <section
        ref={setSectionRef}
        className="relative flex w-full flex-col overflow-hidden bg-uagc-navy"
        aria-label="Hero"
      >
        {/* Mobile: photo only (mock hides video ≤768px) */}
        <div className="relative flex flex-col lg:hidden">
          <div className="relative h-[320px] sm:h-[360px]">
            <AssetImage
              src={mobileImageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: mobileImagePosition }}
            />
            {mobileOverlay}
            <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-5 sm:px-8">
              <HeroCopyBlock
                eyebrow={eyebrow}
                headline={resolvedHeadline}
                subheadline={resolvedSubheadline}
                size="mobile"
              />
              <HeroTrustPills trustPills={trustPills} className="mt-4" />
            </div>
          </div>

          {showSectionNav && sectionNavItems.length > 0 && (
            <HeroSectionNav items={sectionNavItems} className="hero-enter-nav relative z-10" />
          )}
        </div>

        {/* Desktop: full-bleed video + photo fallback (homepage-mock pattern) */}
        <div className="relative hidden min-h-[640px] lg:flex lg:flex-col xl:min-h-[700px]">
          <HeroVideoBackground
            mediaRef={imageWrapRef}
            videoSrc={videoSrc}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            imagePosition={imagePosition}
          />
          {desktopOverlay}

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center px-10 xl:px-14">
            <div>
              <HeroCopyBlock
                eyebrow={eyebrow}
                headline={resolvedHeadline}
                subheadline={resolvedSubheadline}
                size="desktop"
              />
              <HeroTrustPills trustPills={trustPills} className="mt-8 gap-2.5" />
            </div>
          </div>

          {showSectionNav && sectionNavItems.length > 0 && (
            <HeroSectionNav items={sectionNavItems} className="hero-enter-nav relative z-10" />
          )}
        </div>
      </section>
    </div>
  );
}
