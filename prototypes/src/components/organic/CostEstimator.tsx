"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type DegreeLevel = "associate" | "bachelor" | "master";
type AidType = "scholarships" | "employer" | "military";

const DEGREE_CONFIG: Record<DegreeLevel, { label: string; credits: number; rate: number }> = {
  associate: { label: "Associate's", credits: 60, rate: 250 },
  bachelor: { label: "Bachelor's", credits: 120, rate: 295 },
  master: { label: "Master's", credits: 36, rate: 485 },
};

const AID_OPTIONS: { id: AidType; label: string; annualReduction: number | null }[] = [
  { id: "scholarships", label: "Scholarships", annualReduction: 2500 },
  { id: "employer", label: "Employer Reimbursement", annualReduction: 5250 },
  { id: "military", label: "Military Benefits", annualReduction: null },
];

export interface CostEstimatorProps {
  id?: string;
  className?: string;
  onGetPlan?: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function useAnimatedNumber(target: number, duration = 400): number {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(target);
      return;
    }

    const start = display;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (target - start) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return display;
}

function FieldLabel({
  children,
  hint,
}: {
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <p className="text-sm font-semibold text-uagc-navy">{children}</p>
      {hint}
    </div>
  );
}

export function CostEstimator({
  id = "cost-estimator",
  className,
  onGetPlan,
}: CostEstimatorProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>("bachelor");
  const [transferCredits, setTransferCredits] = useState(30);
  const [selectedAid, setSelectedAid] = useState<Set<AidType>>(new Set());

  const toggleAid = useCallback((aid: AidType) => {
    setSelectedAid((prev) => {
      const next = new Set(prev);
      if (next.has(aid)) next.delete(aid);
      else next.add(aid);
      return next;
    });
  }, []);

  const config = DEGREE_CONFIG[degreeLevel];
  const maxTransfer = degreeLevel === "master" ? 12 : 90;
  const clampedTransfer = Math.min(transferCredits, maxTransfer);

  const calculation = useMemo(() => {
    const transfer = Math.min(transferCredits, config.credits - 1);
    const remaining = config.credits - transfer;
    const tuition = remaining * config.rate;

    const creditsPerTerm = 6;
    const monthsPerTerm = 1.25;
    const totalTerms = Math.ceil(remaining / creditsPerTerm);
    const totalMonths = Math.max(totalTerms * monthsPerTerm, 1);
    const estimatedYears = totalMonths / 12;

    const hasMilitary = selectedAid.has("military");
    let totalAidReduction = 0;
    for (const aid of selectedAid) {
      const option = AID_OPTIONS.find((o) => o.id === aid);
      if (option?.annualReduction) {
        totalAidReduction += option.annualReduction * Math.max(estimatedYears, 1);
      }
    }
    totalAidReduction = Math.min(totalAidReduction, tuition);

    const estimatedCost = hasMilitary ? null : tuition - totalAidReduction;
    const monthly = estimatedCost ? Math.round(estimatedCost / Math.max(totalMonths, 1)) : null;

    return {
      totalCredits: config.credits,
      transferCredits: transfer,
      remaining,
      tuition,
      aidReduction: totalAidReduction,
      estimatedCost,
      monthly,
      hasMilitary,
    };
  }, [degreeLevel, transferCredits, selectedAid, config]);

  const animatedCost = useAnimatedNumber(calculation.estimatedCost ?? 0);
  const animatedMonthly = useAnimatedNumber(calculation.monthly ?? 0);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 border-t border-uagc-border bg-white section-pad lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-start gap-10 lg:grid-cols-2 lg:gap-[72px]",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          {/* Left — headline + inputs (aligned with TuitionTable rhythm) */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-uagc-gold">
              Tuition &amp; Financial Aid
            </p>
            <h2 id={`${id}-heading`} className="type-h2 mt-2 text-uagc-navy">
              What Could{" "}
              <em className="not-italic text-uagc-gold">Your Degree</em> Cost?
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-sm">
              Set your path, transfer credits, and aid options to preview tuition.
              86% of students receive financial help—your advisor confirms the
              final plan, free and with no obligation.
            </p>

            <div className="mt-8 space-y-8 border-t border-uagc-border pt-8">
              <div>
                <FieldLabel>Degree level</FieldLabel>
                <div
                  className="grid grid-cols-3 gap-2"
                  role="radiogroup"
                  aria-label="Degree level"
                >
                  {(Object.entries(DEGREE_CONFIG) as [DegreeLevel, typeof config][]).map(
                    ([key, val]) => (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={degreeLevel === key}
                        onClick={() => {
                          setDegreeLevel(key);
                          setTransferCredits((prev) =>
                            key === "master" ? Math.min(prev, 12) : prev,
                          );
                        }}
                        className={cn(
                          "min-h-11 cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-colors duration-200",
                          degreeLevel === key
                            ? "border-uagc-navy bg-uagc-navy text-white"
                            : "border-uagc-border bg-[#faf9f7] text-uagc-navy hover:border-uagc-navy/25",
                        )}
                      >
                        {val.label}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div>
                <FieldLabel
                  hint={
                    <span className="rounded-md bg-uagc-navy/[0.06] px-2 py-0.5 text-sm font-bold tabular-nums text-uagc-navy">
                      {clampedTransfer} credits
                    </span>
                  }
                >
                  Transfer credits
                </FieldLabel>
                <input
                  type="range"
                  min={0}
                  max={maxTransfer}
                  step={5}
                  value={clampedTransfer}
                  onChange={(e) => setTransferCredits(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-uagc-gold"
                  aria-label="Transfer credits"
                  aria-valuemin={0}
                  aria-valuemax={maxTransfer}
                  aria-valuenow={clampedTransfer}
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-uagc-gray">
                  <span>0</span>
                  <span>Up to {maxTransfer}</span>
                </div>
                <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-uagc-gray">
                  <Info className="mt-0.5 size-3.5 shrink-0 text-uagc-gold" aria-hidden />
                  Prior learning, military training, and certifications may count
                  toward transfer credits.
                </p>
              </div>

              <div>
                <FieldLabel>Ways to lower your cost</FieldLabel>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {AID_OPTIONS.map((option) => {
                    const isActive = selectedAid.has(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleAid(option.id)}
                        className={cn(
                          "min-h-11 cursor-pointer rounded-lg border px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-200 sm:text-center",
                          isActive
                            ? "border-uagc-navy bg-uagc-navy text-white"
                            : "border-uagc-border bg-[#faf9f7] text-uagc-navy hover:border-uagc-navy/25",
                        )}
                        aria-pressed={isActive}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right — live estimate panel */}
          <div className="lg:pt-[3.25rem]">
            <div className="rounded-xl border border-uagc-navy bg-uagc-navy p-6 text-white lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/55">
                Live estimate
              </p>

              <div className="mt-5 space-y-2.5 border-b border-white/10 pb-5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-white/70">Program credits</span>
                  <span className="font-semibold tabular-nums">{calculation.totalCredits}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-white/70">Transfer credits</span>
                  <span className="font-semibold tabular-nums text-uagc-gold">
                    −{calculation.transferCredits}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-white/70">Credits remaining</span>
                  <span className="font-semibold tabular-nums">{calculation.remaining}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-white/70">
                    Tuition at {formatCurrency(config.rate)}/credit
                  </span>
                  <span className="font-semibold tabular-nums">
                    {formatCurrency(calculation.tuition)}
                  </span>
                </div>
                {calculation.aidReduction > 0 && (
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-white/70">Est. aid reduction</span>
                    <span className="font-semibold tabular-nums text-[#7dcea0]">
                      −{formatCurrency(calculation.aidReduction)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5">
                {calculation.hasMilitary ? (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-uagc-gold">
                      Contact an Advisor
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                      Military benefits vary—your advisor builds a personalized
                      estimate.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-[2rem] font-bold leading-none tabular-nums text-uagc-gold sm:text-5xl">
                      {formatCurrency(animatedCost)}
                    </p>
                    {calculation.monthly != null && (
                      <p className="mt-2 text-sm tabular-nums text-white/60">
                        ~{formatCurrency(animatedMonthly)}/month
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onGetPlan}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-uagc-gold px-5 py-3 text-sm font-bold text-uagc-navy transition-colors duration-200 hover:bg-[#d4870a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Your Personalized Plan
                <ArrowRight className="size-4" aria-hidden />
              </button>

              <p className="mt-3 text-center text-[11px] leading-relaxed text-white/45">
                Estimate only. Your advisor confirms eligibility and final cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
