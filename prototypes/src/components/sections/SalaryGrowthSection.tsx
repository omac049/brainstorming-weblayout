"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { getPrefersReducedMotion } from "@/hooks/useScrollReveal";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface SalaryTier {
  level: string;
  withoutDegree: number;
  withDegree: number;
  growthLabel: string;
}

interface FieldHighlight {
  field: string;
  role: string;
  salary: string;
  growth: string;
}

export interface SalaryGrowthSectionProps {
  heading?: string;
  intro?: string;
  tiers?: SalaryTier[];
  fieldHighlights?: FieldHighlight[];
  lifetimeGain?: string;
  lifetimeContext?: string;
  source?: string;
  className?: string;
}

/* ─── Defaults ──────────────────────────────────────────────────── */

const DEFAULT_TIERS: SalaryTier[] = [
  {
    level: "Associate's",
    withoutDegree: 35000,
    withDegree: 48000,
    growthLabel: "+37%",
  },
  {
    level: "Bachelor's",
    withoutDegree: 35000,
    withDegree: 65000,
    growthLabel: "+86%",
  },
  {
    level: "Master's",
    withoutDegree: 35000,
    withDegree: 78000,
    growthLabel: "+123%",
  },
];

const DEFAULT_FIELDS: FieldHighlight[] = [
  { field: "Business", role: "Operations Manager", salary: "$75K", growth: "8%" },
  { field: "Healthcare", role: "Health Services Manager", salary: "$88K", growth: "28%" },
  { field: "Technology", role: "IT Project Manager", salary: "$92K", growth: "15%" },
  { field: "Education", role: "Instructional Coordinator", salary: "$66K", growth: "7%" },
  { field: "Criminal Justice", role: "Crime Analyst", salary: "$62K", growth: "6%" },
];

const MAX_SALARY = 100000;

/* ─── Utility ───────────────────────────────────────────────────── */

function formatSalary(amount: number): string {
  return `$${(amount / 1000).toFixed(0)}K`;
}

/* ─── Sub-module: Animated Counter ──────────────────────────────── */

function AnimatedValue({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const prefersReduced = getPrefersReducedMotion();
  const [displayed, setDisplayed] = useState(() => (prefersReduced ? value : 0));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current || prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setDisplayed(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, prefersReduced]);

  const shown = prefersReduced ? value : displayed;

  return (
    <span ref={ref}>
      {prefix}{shown.toLocaleString("en-US")}{suffix}
    </span>
  );
}

/* ─── Sub-module: Swipeable Degree Cards with Pagination ────────── */

function DegreeCardCarousel({ tiers }: { tiers: SalaryTier[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.82));
    setActiveIndex(Math.min(index, tiers.length - 1));
  }, [tiers.length]);

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.82;
    scrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }, []);

  return (
    <div className="sm:contents">
      {/* Mobile: full-bleed swipeable carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"
        style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
      >
        {tiers.map((tier, i) => (
          <DegreeCard key={tier.level} tier={tier} index={i} isActive={i === activeIndex} />
        ))}
      </div>

      {/* Pagination dots — mobile only */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden" role="tablist" aria-label="Degree level cards">
        {tiers.map((tier, i) => (
          <button
            type="button"
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`${tier.level} degree`}
            onClick={() => scrollTo(i)}
            className={cn(
              "flex items-center justify-center rounded-full transition-[background-color] duration-300 ease-out",
              "min-h-11 min-w-11",
              i === activeIndex ? "bg-uagc-navy/5" : "bg-transparent"
            )}
            style={{ touchAction: "manipulation" }}
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out",
                i === activeIndex ? "w-6 bg-uagc-navy" : "w-1.5 bg-uagc-navy/20"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function DegreeCard({ tier, index, isActive }: { tier: SalaryTier; index: number; isActive: boolean }) {
  const gap = tier.withDegree - tier.withoutDegree;
  const barPct = Math.min((tier.withDegree / MAX_SALARY) * 100, 100);
  const basePct = Math.min((tier.withoutDegree / MAX_SALARY) * 100, 100);

  return (
    <div
      className={cn(
        "w-[82vw] min-w-[82vw] snap-center rounded-2xl border bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "sm:w-auto sm:min-w-0",
        "active:scale-97 active:transition-none",
        isActive ? "border-uagc-navy/15 shadow-sm" : "border-uagc-border"
      )}
      style={{ touchAction: "manipulation" }}
    >
      {/* Step indicator + growth badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-uagc-navy text-xs font-bold text-white">
            {index + 1}
          </span>
          <h3 className="type-stat text-base text-uagc-navy sm:text-lg">
            {tier.level}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-uagc-gold/15 px-2.5 py-1 text-xs font-bold text-uagc-navy">
          <TrendingUp className="size-3" strokeWidth={2.5} aria-hidden />
          {tier.growthLabel}
        </span>
      </div>

      {/* Salary comparison — stacked for scanability */}
      <div className="space-y-3">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-xs text-uagc-gray">Without degree</span>
            <span className="text-sm tabular-nums text-uagc-gray">{formatSalary(tier.withoutDegree)}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-uagc-border">
            <div
              className="h-full rounded-full bg-uagc-gray/25"
              style={{ width: `${basePct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-xs font-medium text-uagc-navy">With degree</span>
            <span className="text-sm font-bold tabular-nums text-uagc-navy">{formatSalary(tier.withDegree)}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-uagc-gold/15">
            <div
              className="h-full rounded-full bg-uagc-navy"
              style={{ width: `${barPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Impact callout — the "payoff" of each card */}
      <div className="mt-5 rounded-xl bg-uagc-surface p-4 text-center">
        <p className="text-xs uppercase tracking-wide text-uagc-gray">You could earn</p>
        <p className="type-stat mt-0.5 text-2xl text-uagc-navy">
          +<AnimatedValue value={gap} prefix="$" suffix="" />
          <span className="ml-0.5 text-base font-normal text-uagc-gray">/yr</span>
        </p>
      </div>
    </div>
  );
}

/* ─── Sub-module: Field Explorer (native tab-bar style) ─────────── */

function FieldSelector({ fields }: { fields: FieldHighlight[] }) {
  const [active, setActive] = useState(0);
  const current = fields[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-uagc-border bg-white">
      {/* Section label */}
      <div className="border-b border-uagc-border px-5 pb-3 pt-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-uagc-gray">
          What could you earn in your field?
        </p>
      </div>

      {/* Tab bar — full-bleed, scrollable, 44px targets */}
      <div
        className="flex gap-0 overflow-x-auto border-b border-uagc-border scrollbar-hide"
        role="tablist"
        aria-label="Career fields"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {fields.map((f, i) => (
          <button
            type="button"
            key={f.field}
            role="tab"
            aria-selected={i === active}
            aria-controls={`field-panel-${i}`}
            id={`field-tab-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative min-h-11 shrink-0 cursor-pointer whitespace-nowrap px-4 text-sm font-medium transition-colors duration-200",
              "active:bg-uagc-navy/5 active:transition-none",
              i === active
                ? "text-uagc-navy"
                : "text-uagc-gray hover:text-uagc-navy/70"
            )}
            style={{ touchAction: "manipulation" }}
          >
            {f.field}
            {i === active && (
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-uagc-navy" aria-hidden />
            )}
          </button>
        ))}
      </div>

      {/* Content area — mobile: salary hero with supporting stats */}
      <div
        className="p-5 sm:p-6"
        role="tabpanel"
        id={`field-panel-${active}`}
        aria-labelledby={`field-tab-${active}`}
      >
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          {/* Big salary number — primary visual anchor */}
          <div className="mb-4 sm:mb-0 sm:mr-6 sm:border-r sm:border-uagc-border sm:pr-6">
            <p className="type-stat text-[2.5rem] text-uagc-navy sm:text-[2rem]">
              {current.salary}
            </p>
            <p className="mt-1 text-xs text-uagc-gray">median salary</p>
          </div>

          {/* Supporting data */}
          <div className="flex w-full gap-4 sm:flex-col sm:gap-3">
            <div className="flex-1 rounded-xl bg-uagc-surface p-3 sm:rounded-lg">
              <p className="text-xs font-medium uppercase tracking-wide text-uagc-gray">Role</p>
              <p className="mt-0.5 text-sm font-semibold text-uagc-navy">{current.role}</p>
            </div>
            <div className="flex-1 rounded-xl bg-uagc-surface p-3 sm:rounded-lg">
              <p className="text-xs font-medium uppercase tracking-wide text-uagc-gray">Job Growth</p>
              <p className="mt-0.5 text-sm font-semibold text-uagc-navy">{current.growth} projected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-module: Lifetime Impact ───────────────────────────────── */

function LifetimeImpact({ gain, context }: { gain: string; context: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-uagc-navy p-6 sm:p-8">
      <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-white/3" aria-hidden />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
          Potential lifetime earnings increase
        </p>
        <p className="type-stat mt-2 text-[2.75rem] text-white sm:text-[3.25rem]">
          {gain}
        </p>
        <p className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-white/80">
          {context}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Section (Composed) ───────────────────────────────────── */

export function SalaryGrowthSection({
  heading = "How a Degree Can Impact Your Earnings",
  intro = "Higher education is linked to higher lifetime earnings. See what a degree could mean for your career — and your paycheck.",
  tiers = DEFAULT_TIERS,
  fieldHighlights = DEFAULT_FIELDS,
  lifetimeGain = "$1.2M+",
  lifetimeContext = "Bachelor's degree holders earn over $1.2 million more than high school diploma holders over a 40-year career.",
  source = "Source: U.S. Bureau of Labor Statistics, 2024 median earnings by educational attainment.",
  className,
}: SalaryGrowthSectionProps) {
  return (
    <section className={cn("section-pad bg-uagc-surface", className)}>
      <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-uagc-gray sm:mt-3 sm:max-w-2xl sm:text-base">
            {intro}
          </p>
        </div>

        {/* Module 1: Degree Cards — native horizontal swipe with pagination */}
        <div className="mb-6 sm:mb-8">
          <DegreeCardCarousel tiers={tiers} />
        </div>

        {/* Module 2: Field Explorer — native tab-bar interaction */}
        <div className="mb-6 sm:mb-8">
          <FieldSelector fields={fieldHighlights} />
        </div>

        {/* Module 3: Lifetime Impact */}
        <LifetimeImpact gain={lifetimeGain} context={lifetimeContext} />

        {/* CTA — full-width, thumb-zone, 48px tall, always visible */}
        <a
          href="#rfi"
          className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-uagc-gold px-5 py-3.5 text-[0.9375rem] font-semibold text-uagc-navy transition-colors duration-200 hover:bg-uagc-gold-hover active:scale-98 active:transition-none sm:mt-6 sm:inline-flex sm:w-auto sm:rounded-lg"
          style={{ touchAction: "manipulation" }}
        >
          Take the Next Step
          <ArrowRight className="size-4" aria-hidden />
        </a>

        {/* Source */}
        {source && (
          <p className="mt-5 text-xs leading-relaxed text-uagc-gray">
            {source}
          </p>
        )}
      </div>
    </section>
  );
}
