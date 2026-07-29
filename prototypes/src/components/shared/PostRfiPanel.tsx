"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LogIn, PartyPopper } from "lucide-react";
import type { RefObject } from "react";

import { cn } from "@/lib/utils";
import { usePublishElementHeight } from "@/hooks/usePublishElementHeight";

const LOGIN_URL = "https://apply.uagc.edu/identity/account/login";

const STEPS = [
  { number: 1, title: "An advisor will reach out", active: true },
  { number: 2, title: "Apply for free — 15 minutes", active: false },
  { number: 3, title: "Set up your student portal", active: false },
] as const;

export interface PostRfiPanelProps {
  variant: "full" | "compact";
  portalUrl: string;
  heroFormRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

function FullPanel({
  portalUrl,
  className,
}: Pick<PostRfiPanelProps, "portalUrl" | "className">) {
  return (
    <div
      className={cn(
        "@container w-full overflow-hidden rounded-2xl bg-white shadow-sm",
        className,
      )}
    >
      {/* Celebration banner */}
      <div className="bg-uagc-gold-tint px-5 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-uagc-gold/15">
            <PartyPopper className="size-5 text-uagc-gold" aria-hidden />
          </span>
          <div>
            <p className="text-base font-bold text-uagc-navy">
              Great first step!
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-uagc-gray">
              We received your request — an enrollment advisor will reach out within one business day.
            </p>
          </div>
        </div>
      </div>

      {/* Steps + CTA */}
      <div className="px-5 py-5 sm:px-8 sm:py-6">
        <p className="mb-3 text-xs font-semibold tracking-wide text-uagc-gray/70 uppercase">
          Your path forward
        </p>
        <ol className="mb-6 flex flex-col gap-2.5 @[580px]:flex-row @[580px]:gap-5">
          {STEPS.map((step) => (
            <li key={step.number} className="flex items-center gap-2.5">
              {step.active ? (
                <CheckCircle2
                  className="size-6 shrink-0 text-green-500"
                  aria-hidden
                />
              ) : (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400">
                  {step.number}
                </span>
              )}
              <span
                className={cn(
                  "text-sm",
                  step.active
                    ? "font-semibold text-uagc-navy"
                    : "text-uagc-gray",
                )}
              >
                {step.title}
              </span>
            </li>
          ))}
        </ol>

        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-uagc-cta-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-uagc-cta-blue-hover active:scale-[0.97]"
        >
          Start Your Application
          <ArrowRight className="size-4" aria-hidden />
        </a>

        <div className="mt-3 text-center">
          <a
            href={LOGIN_URL}
            className="inline-flex items-center gap-1.5 text-sm text-uagc-gray transition-colors duration-150 ease-out hover:text-uagc-navy"
          >
            <LogIn className="size-3.5" aria-hidden />
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
}

function CompactPanel({
  portalUrl,
  heroFormRef,
  className,
}: Pick<PostRfiPanelProps, "portalUrl" | "heroFormRef" | "className">) {
  const barRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  usePublishElementHeight(barRef, "--uagc-sticky-rfi-height");

  useEffect(() => {
    const heroElement = heroFormRef?.current;
    if (!heroElement) {
      queueMicrotask(() => setHeroVisible(false));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { root: null, threshold: 0.15, rootMargin: "0px 0px -8px 0px" },
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, [heroFormRef]);

  return (
    <div
      ref={barRef}
      data-rfi-sticky-bar
      aria-hidden={heroVisible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-98 border-t border-white/10 bg-uagc-navy px-4 pt-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] shadow-[0_-4px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden",
        heroVisible
          ? "pointer-events-none translate-y-full"
          : "translate-y-0",
        className,
      )}
    >
      <div className="mb-1.5 flex items-center justify-center gap-1.5">
        <CheckCircle2
          className="size-3.5 shrink-0 text-green-400"
          aria-hidden
        />
        <span className="text-xs font-semibold text-white/90">
          Info requested — you&apos;re on your way!
        </span>
      </div>
      <a
        href={portalUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={heroVisible ? -1 : 0}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-uagc-cta-blue px-6 text-center text-sm font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-uagc-cta-blue-hover active:scale-[0.97]"
      >
        Start Your Application
        <ArrowRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}

export function PostRfiPanel({
  variant,
  portalUrl,
  heroFormRef,
  className,
}: PostRfiPanelProps) {
  switch (variant) {
    case "full":
      return <FullPanel portalUrl={portalUrl} className={className} />;
    case "compact":
      return (
        <CompactPanel
          portalUrl={portalUrl}
          heroFormRef={heroFormRef}
          className={className}
        />
      );
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}
