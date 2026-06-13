"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
  cta: string;
  href: string;
  active?: boolean;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Talk to an Advisor",
    description:
      "An Admission Specialist will reach out to help you find the program and schedule that fits your life.",
    cta: "Learn About Advising",
    href: "https://www.uagc.edu/admission",
    active: true,
  },
  {
    number: 2,
    title: "Apply for Free",
    description:
      "Our streamlined online application takes about 15 minutes — no application fee, no standardized tests.",
    cta: "Start Your Application",
    href: "https://cloud.mail.uagc.edu/apply",
  },
  {
    number: 3,
    title: "Get Ready for Class",
    description:
      "Set up your student portal, meet your support team, and prepare to start strong on day one.",
    cta: "Explore Your Portal",
    href: "https://www.uagc.edu/student-experience",
  },
];

export interface ThankYouNextStepsSectionProps {
  className?: string;
}

function StepCard({ step, isVisible }: { step: Step; isVisible: boolean }) {
  return (
    <div
      className={cn(
        "group relative flex flex-1 flex-col",
        "transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "opacity-100" : "opacity-0 translate-y-6",
      )}
      style={{
        transitionDelay: isVisible ? `${(step.number - 1) * 100}ms` : "0ms",
        transitionProperty: "opacity, transform",
      }}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "mb-6 h-0.5 w-full rounded-full transition-colors duration-300",
          step.active ? "bg-uagc-gold" : "bg-gray-200",
        )}
        aria-hidden
      />

      {/* Step number */}
      <span
        className={cn(
          "font-heading text-sm font-bold tracking-wide",
          step.active ? "text-uagc-gold" : "text-gray-400",
        )}
      >
        Step {step.number}
      </span>

      {/* Title */}
      <h3 className="mt-2 text-xl font-bold text-uagc-navy">
        {step.title}
      </h3>

      {/* Description */}
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-uagc-gray">
        {step.description}
      </p>

      {/* CTA */}
      <a
        href={step.href}
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200",
          step.active
            ? "text-uagc-navy hover:text-uagc-navy/70"
            : "text-uagc-navy/60 hover:text-uagc-navy",
        )}
      >
        {step.cta}
        <ArrowRight
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </a>
    </div>
  );
}

function MobileStep({ step, isVisible }: { step: Step; isVisible: boolean }) {
  return (
    <div
      className={cn(
        "relative",
        "transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "opacity-100" : "opacity-0 translate-y-6",
      )}
      style={{
        transitionDelay: isVisible ? `${(step.number - 1) * 100}ms` : "0ms",
        transitionProperty: "opacity, transform",
      }}
    >
      <div className="flex items-start gap-3.5">
        {/* Indicator column */}
        <div className="flex flex-col items-center pt-0.5">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
              step.active
                ? "bg-uagc-gold text-uagc-navy"
                : "bg-gray-100 text-gray-500",
            )}
          >
            {step.number}
          </div>
          {step.number < 3 && (
            <div className="mt-2 w-px flex-1 bg-gray-200" aria-hidden />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-6 last:pb-0">
          <h3 className="pt-1 text-[0.9375rem] font-bold text-uagc-navy">{step.title}</h3>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-uagc-gray">
            {step.description}
          </p>
          <a
            href={step.href}
            className={cn(
              "group/link mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold transition-colors duration-200",
              step.active
                ? "text-uagc-navy hover:text-uagc-navy/70"
                : "text-uagc-navy/60 hover:text-uagc-navy",
            )}
          >
            {step.cta}
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ThankYouNextStepsSection({
  className,
}: ThankYouNextStepsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="next-steps"
      className={cn("scroll-mt-20 bg-white py-10 sm:py-20", className)}
      aria-labelledby="next-steps-heading"
    >
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-6">
        {/* Section header */}
        <div className="mb-8 sm:mb-12">
          <span className="accent-bar" />
          <h2
            id="next-steps-heading"
            className="type-h2 mt-4 text-uagc-navy"
          >
            Your Path Forward
          </h2>
          <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-uagc-gray sm:mt-3 sm:text-base">
            Three clear steps from here to your first class. Your advisor
            will guide you through each one.
          </p>
        </div>

        {/* ── Desktop: three columns with top accent lines ── */}
        <div className="hidden md:block" role="list" aria-label="Admissions steps">
          <div className="grid grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} role="listitem">
                <StepCard step={step} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: compact vertical list ── */}
        <div className="md:hidden" role="list" aria-label="Admissions steps">
          {STEPS.map((step) => (
            <div key={step.number} role="listitem">
              <MobileStep step={step} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
