"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal, getPrefersReducedMotion } from "@/hooks/useScrollReveal";

/* ─── Types & Config ─────────────────────────────────────────────── */

type DegreeLevel = "associate" | "bachelor" | "master";
type EnrollmentPace = "accelerated" | "full-time" | "part-time";

const DEGREES: { id: DegreeLevel; label: string; credits: number }[] = [
  { id: "associate", label: "Associate", credits: 60 },
  { id: "bachelor", label: "Bachelor's", credits: 120 },
  { id: "master", label: "Master's", credits: 36 },
];

const PACES: { id: EnrollmentPace; label: string; courses: number }[] = [
  { id: "part-time", label: "Part-Time", courses: 1 },
  { id: "full-time", label: "Full-Time", courses: 2 },
  { id: "accelerated", label: "Accelerated", courses: 3 },
];

const BLOCKS_PER_YEAR = 10;
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
  const [pace, setPace] = useState<EnrollmentPace>("full-time");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();

  const degreeConfig = DEGREES.find((d) => d.id === degree)!;
  const maxTransfer = Math.floor(degreeConfig.credits * 0.75);
  const clamped = Math.min(transferCredits, maxTransfer);

  const { months, remaining } = useMemo(() => {
    const rem = degreeConfig.credits - clamped;
    const paceConfig = PACES.find((p) => p.id === pace)!;
    const perYear = paceConfig.courses * CREDITS_PER_COURSE * BLOCKS_PER_YEAR;
    return {
      months: Math.max(Math.ceil((rem / perYear) * 12), 1),
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
  const progressPct = Math.round((clamped / degreeConfig.credits) * 100);

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
        "reveal-section scroll-mt-28 lg:scroll-mt-36 py-14 sm:py-20",
        isVisible && "is-visible",
        className,
      )}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span aria-hidden className="accent-bar mx-auto" />
          <h2
            className="type-h2 text-uagc-navy mt-4"
            style={{ textWrap: "balance" }}
          >
            How Quickly Could You Graduate?
          </h2>
          <p className="mt-2 text-[0.9375rem] text-uagc-gray max-w-md mx-auto">
            Adjust the options below — your timeline updates instantly.
          </p>
        </div>

        {/* Calculator card */}
        <div className="rounded-2xl border border-uagc-border bg-white shadow-[0_1px_3px_rgba(12,35,75,0.04),0_16px_48px_rgba(12,35,75,0.06)] overflow-hidden">
          {/* Controls */}
          <div className="p-5 sm:p-7 space-y-6">
            <PillGroup
              label="Degree Level"
              options={DEGREES.map((d) => ({
                id: d.id,
                label: d.label,
                detail: `${d.credits} credits`,
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
              label="Course Load"
              options={PACES.map((p) => ({
                id: p.id,
                label: p.label,
                detail: `${p.courses} course${p.courses > 1 ? "s" : ""}/block`,
              }))}
              value={pace}
              onChange={handlePaceChange}
            />
          </div>

          {/* Result band */}
          <div className="border-t border-uagc-border bg-uagc-navy px-5 py-7 sm:px-7 sm:py-8">
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Progress arc with months inside */}
              <div className="relative shrink-0">
                <ProgressArc
                  percentage={progressPct}
                  size={112}
                  strokeWidth={5}
                />
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center",
                    "transition-[filter,opacity] duration-200",
                    isTransitioning && "blur-[2px] opacity-70",
                  )}
                  style={{
                    transitionTimingFunction:
                      "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <span className="text-3xl font-extrabold text-white tabular-nums tracking-tight leading-none sm:text-4xl">
                    {animatedMonths}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70 mt-0.5">
                    months
                  </span>
                </div>
              </div>

              {/* Details column */}
              <div
                className={cn(
                  "flex-1 min-w-0 space-y-3",
                  "transition-[filter,opacity] duration-200",
                  isTransitioning && "blur-[2px] opacity-70",
                )}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                {/* Graduation projection */}
                <div className="flex items-center gap-2">
                  <GraduationCap
                    className="size-4 text-uagc-gold shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="text-sm font-bold text-white">
                    Graduate by{" "}
                    <span className="text-uagc-gold">{graduationDate}</span>
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div>
                    <p className="text-lg font-bold text-white tabular-nums sm:text-xl">
                      {coursesLeft}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                      Courses left
                    </p>
                  </div>
                  <span className="h-8 w-px bg-white/15" aria-hidden />
                  <div>
                    <p className="text-lg font-bold text-white tabular-nums sm:text-xl">
                      {remaining}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                      Credits left
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-uagc-gray leading-relaxed">
          Estimates based on UAGC&apos;s 5-week course blocks (10 blocks/year, 3
          credits/course). Actual time may vary. Transfer credit evaluation is
          free.
        </p>
      </div>
    </section>
  );
}
