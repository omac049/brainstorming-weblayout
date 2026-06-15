"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal, getPrefersReducedMotion } from "@/hooks/useScrollReveal";
import { AssetImage } from "@/components/shared/AssetImage";

/* ─── Types & Config ─────────────────────────────────────────────── */
/*
 * UAGC Academic Structure (verified sources: uagc.edu/admissions/faq,
 * uagc.edu/about/why-uagc/flexibility, 2025-2026 Academic Catalog):
 *
 * - Continuous (non-term) calendar, courses run back-to-back
 * - Students take 1 course at a time (this IS full-time enrollment)
 * - Undergraduate courses: 5 weeks | Graduate courses: 6 weeks
 * - Annual 2-week winter break (late Dec–early Jan)
 * - Available instructional weeks/year: 52 − 2 = 50
 * - All courses are 3 credit hours
 *
 * Pace differences come from breaks BETWEEN courses, not simultaneous
 * courses. UAGC allows up to 45-day approved breaks without withdrawal.
 */

type DegreeLevel = "associate" | "bachelor" | "master";
type EnrollmentPace = "continuous" | "steady" | "flexible";

interface DegreeConfig {
  id: DegreeLevel;
  label: string;
  credits: number;
  maxTransfer: number;
  weeksPerCourse: number;
}

const DEGREES: DegreeConfig[] = [
  { id: "associate", label: "Associate", credits: 64, maxTransfer: 46, weeksPerCourse: 5 },
  { id: "bachelor", label: "Bachelor's", credits: 120, maxTransfer: 90, weeksPerCourse: 5 },
  { id: "master", label: "Master's", credits: 36, maxTransfer: 9, weeksPerCourse: 6 },
];

const PACES: { id: EnrollmentPace; label: string; detail: string; multiplier: number }[] = [
  { id: "continuous", label: "Continuous", detail: "No breaks", multiplier: 1.0 },
  { id: "steady", label: "Steady", detail: "Some breaks", multiplier: 1.25 },
  { id: "flexible", label: "Flexible", detail: "Regular breaks", multiplier: 1.6 },
];

const INSTRUCTIONAL_WEEKS_PER_YEAR = 50;
const CREDITS_PER_COURSE = 3;

/* ─── Animated Number ────────────────────────────────────────────── */

function useAnimatedNumber(target: number, duration = 400): number {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(0);
  const prevRef = useRef(target);

  useEffect(() => {
    if (getPrefersReducedMotion()) {
      setDisplay(target);
      prevRef.current = target;
      return;
    }
    const start = prevRef.current;
    prevRef.current = target;
    if (start === target) return;

    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(start + (target - start) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

/* ─── Progress Arc ───────────────────────────────────────────────── */

function ProgressArc({
  percentage,
  size = 120,
  strokeWidth = 6,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 -rotate-90"
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-uagc-gold transition-[stroke-dashoffset] duration-700"
        style={{
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
    </svg>
  );
}

/* ─── Pill Selector ──────────────────────────────────────────────── */

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; detail?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="text-sm font-semibold text-uagc-navy">{label}</legend>
      <div className="flex gap-2" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.id)}
              className={cn(
                "flex-1 rounded-xl px-3 py-3 text-center text-sm font-medium min-h-12",
                "transition-[transform,background-color,color,box-shadow] duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uagc-gold/50 focus-visible:ring-offset-2",
                "active:scale-[0.97]",
                active
                  ? "bg-uagc-navy text-white shadow-[0_2px_8px_rgba(12,35,75,0.2)]"
                  : "bg-uagc-surface text-uagc-gray hover:bg-gray-100 hover:text-uagc-navy",
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {opt.label}
              {opt.detail && (
                <span
                  className={cn(
                    "block text-xs mt-0.5",
                    active ? "text-white/80" : "text-uagc-gray/70",
                  )}
                >
                  {opt.detail}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export interface TimeToGraduationCalculatorProps {
  id?: string;
  className?: string;
  onExplorePrograms?: () => void;
}

export function TimeToGraduationCalculator({
  id = "time-to-graduation",
  className,
}: TimeToGraduationCalculatorProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const [degree, setDegree] = useState<DegreeLevel>("bachelor");
  const [transferCredits, setTransferCredits] = useState(30);
  const [pace, setPace] = useState<EnrollmentPace>("continuous");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const degreeConfig = DEGREES.find((d) => d.id === degree)!;
  const maxTransfer = degreeConfig.maxTransfer;
  const clamped = Math.min(transferCredits, maxTransfer);

  const { months, remaining } = useMemo(() => {
    const rem = degreeConfig.credits - clamped;
    const coursesNeeded = Math.ceil(rem / CREDITS_PER_COURSE);
    const paceConfig = PACES.find((p) => p.id === pace)!;

    // Base formula: (courses × weeksPerCourse) / (50 weeks/year) × 12 months/year
    // Then multiply by pace factor for students taking breaks between courses
    const baseMonths =
      (coursesNeeded * degreeConfig.weeksPerCourse * 12) /
      INSTRUCTIONAL_WEEKS_PER_YEAR;
    const adjustedMonths = Math.ceil(baseMonths * paceConfig.multiplier);

    return {
      months: Math.max(adjustedMonths, 1),
      remaining: rem,
    };
  }, [degreeConfig, clamped, pace]);

  const triggerTransition = useCallback(() => {
    if (getPrefersReducedMotion()) return;
    setIsTransitioning(true);
    clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const handleDegreeChange = useCallback(
    (v: DegreeLevel) => {
      setDegree(v);
      triggerTransition();
    },
    [triggerTransition],
  );

  const handlePaceChange = useCallback(
    (v: EnrollmentPace) => {
      setPace(v);
      triggerTransition();
    },
    [triggerTransition],
  );

  const animatedMonths = useAnimatedNumber(months);
  const sliderPct = maxTransfer > 0 ? (clamped / maxTransfer) * 100 : 0;
  const coursesLeft = Math.ceil(remaining / CREDITS_PER_COURSE);
  const progressPct = Math.round(
    ((degreeConfig.credits - remaining) / degreeConfig.credits) * 100,
  );

  const graduationDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [months]);

  useEffect(() => {
    if (transferCredits > maxTransfer) setTransferCredits(maxTransfer);
  }, [maxTransfer, transferCredits]);

  useEffect(() => {
    return () => clearTimeout(transitionTimer.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "reveal-section scroll-mt-28 lg:scroll-mt-36",
        isVisible && "is-visible",
        className,
      )}
    >
      {/* ─── Hero Band: immersive image + headline overlay ─── */}
      <div className="relative overflow-hidden bg-uagc-navy">
        {/* Background image with creative diagonal clip */}
        <div className="absolute inset-0" aria-hidden>
          <AssetImage
            src="/images/graduation-celebration.png"
            alt=""
            width={1024}
            height={682}
            className="h-full w-full object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-br from-uagc-navy/90 via-uagc-navy/75 to-uagc-navy/60" />
          <div className="absolute inset-0 bg-linear-to-t from-uagc-navy via-transparent to-transparent" />
        </div>

        {/* Decorative geometric accent */}
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-uagc-gold/5 blur-3xl" aria-hidden />
        <div className="absolute -left-10 bottom-0 size-56 rounded-full bg-uagc-gold/5 blur-3xl" aria-hidden />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-14 text-center sm:px-6 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-uagc-gold/30 bg-uagc-gold/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="size-3.5 text-uagc-gold" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-wider text-uagc-gold">
              Interactive Timeline Tool
            </span>
          </div>

          <h2
            className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ textWrap: "balance" }}
          >
            How Quickly Could You{" "}
            <span className="relative inline-block text-uagc-gold">
              Graduate?
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-uagc-gold/40"
              />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            See your personalized finish line — adjust your degree, credits,
            and pace below.
          </p>
        </div>
      </div>

      {/* ─── Calculator Card: elevated, overlapping the hero ─── */}
      <div className="relative z-20 mx-auto -mt-16 max-w-2xl px-4 sm:-mt-20 sm:px-6 lg:-mt-24">
        <div className="rounded-2xl border border-uagc-border bg-white shadow-[0_4px_6px_rgba(12,35,75,0.03),0_24px_64px_rgba(12,35,75,0.1)] overflow-hidden ring-1 ring-black/2">
          {/* Controls */}
          <div className="p-5 sm:p-7 space-y-6">
            <PillGroup
              label="Degree Level"
              options={DEGREES.map((d) => ({
                id: d.id,
                label: d.label,
                detail: `${d.credits} cr · ${d.weeksPerCourse}-wk courses`,
              }))}
              value={degree}
              onChange={handleDegreeChange}
            />

            {/* Transfer credit slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="transfer-slider"
                  className="text-sm font-semibold text-uagc-navy"
                >
                  Transfer Credits
                </label>
                <output className="tabular-nums text-sm font-bold text-uagc-navy">
                  {clamped}{" "}
                  <span className="font-normal text-uagc-gray">
                    / {degreeConfig.credits}
                  </span>
                </output>
              </div>
              <div className="relative">
                <input
                  id="transfer-slider"
                  type="range"
                  min={0}
                  max={maxTransfer}
                  step={3}
                  value={clamped}
                  onChange={(e) => {
                    setTransferCredits(Number(e.target.value));
                    triggerTransition();
                  }}
                  className="w-full h-2 appearance-none rounded-full bg-gray-200 cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-uagc-gold [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.2)]
                    [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing
                    [&::-webkit-slider-thumb]:active:scale-110 [&::-webkit-slider-thumb]:transition-transform
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-uagc-gold
                    [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
                    [&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.2)] [&::-moz-range-thumb]:cursor-grab
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uagc-gold/40 focus-visible:ring-offset-2"
                  aria-label="Transfer credits"
                  aria-valuetext={`${clamped} of ${degreeConfig.credits} credits`}
                />
                <div
                  className="absolute left-0 top-0 h-2 rounded-full bg-uagc-gold pointer-events-none transition-[width] duration-100"
                  style={{ width: `${sliderPct}%` }}
                />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 transition-opacity duration-200",
                  clamped > 0 ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite"
              >
                <span className="inline-flex size-4 items-center justify-center rounded-full bg-uagc-gold/15">
                  <svg
                    viewBox="0 0 12 12"
                    className="size-2.5 text-uagc-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M2 6.5L5 9.5L10 3" />
                  </svg>
                </span>
                <p className="text-xs font-semibold text-uagc-gold">
                  {progressPct}% of your degree — already done
                </p>
              </div>
            </div>

            <PillGroup
              label="Enrollment Pace"
              options={PACES.map((p) => ({
                id: p.id,
                label: p.label,
                detail: `${p.detail} · ~${Math.round(INSTRUCTIONAL_WEEKS_PER_YEAR / degreeConfig.weeksPerCourse / p.multiplier)}/yr`,
              }))}
              value={pace}
              onChange={handlePaceChange}
            />
          </div>

          {/* Result band */}
          <div className="border-t border-white/5 bg-uagc-navy px-5 py-8 sm:px-7 sm:py-10">
            <div
              className={cn(
                "transition-[filter,opacity] duration-300",
                isTransitioning && "blur-[2px] opacity-70",
              )}
              style={{
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {/* Graduation headline */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-3 mb-2">
                  <GraduationCap
                    className="size-7 text-uagc-gold shrink-0 sm:size-8"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                    Your projected graduation
                  </p>
                </div>
                <p
                  className="text-[1.75rem] font-extrabold text-uagc-gold leading-none sm:text-4xl"
                  aria-live="polite"
                >
                  {graduationDate}
                </p>
              </div>

              <div className="mx-auto mb-6 h-px w-16 bg-white/10" aria-hidden />

              {/* Stats trio */}
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                <div className="text-center">
                  <div className="relative inline-block">
                    <ProgressArc
                      percentage={progressPct}
                      size={72}
                      strokeWidth={4}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-white tabular-nums sm:text-2xl">
                      {animatedMonths}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mt-1.5">
                    Months
                  </p>
                </div>

                <span className="h-12 w-px bg-white/10" aria-hidden />

                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white tabular-nums sm:text-3xl">
                    {coursesLeft}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mt-1.5">
                    Courses
                  </p>
                </div>

                <span className="h-12 w-px bg-white/10" aria-hidden />

                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white tabular-nums sm:text-3xl">
                    {remaining}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mt-1.5">
                    Credits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-uagc-gray leading-relaxed">
          Estimates based on UAGC&apos;s continuous calendar (5-week undergrad /
          6-week graduate courses, 3 credits each, ~50 instructional weeks/year).
          Actual timelines depend on program, transfer evaluation, and course
          availability. Transfer credit evaluation is free.
        </p>
      </div>

      {/* Bottom spacing to account for negative margin pull */}
      <div className="h-8 sm:h-12" aria-hidden />
    </section>
  );
}
