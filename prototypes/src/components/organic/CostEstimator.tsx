"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Info,
  Phone,
  Shield,
  Sparkles,
  TrendingDown,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal, getPrefersReducedMotion } from "@/hooks/useScrollReveal";
import { usePublishElementHeight } from "@/hooks/usePublishElementHeight";

type DegreeLevel = "associate" | "bachelor" | "master";
type AidType = "scholarships" | "employer" | "military";
type StepId = 1 | 2 | 3;
type ChangeSource = "degree" | "transfer" | "aid";

const PHONE_HREF = "tel:+18667111700";

export interface CostPlanContext {
  degreeLevel: DegreeLevel;
  degreeLabel: string;
  transferCredits: number;
  selectedAid: AidType[];
  estimatedCost: number | null;
  hasMilitary: boolean;
}

const DEGREE_CONFIG: Record<
  DegreeLevel,
  { label: string; short: string; credits: number; rate: number }
> = {
  associate: { label: "Associate's", short: "Associate", credits: 60, rate: 250 },
  bachelor: { label: "Bachelor's", short: "Bachelor", credits: 120, rate: 295 },
  master: { label: "Master's", short: "Master", credits: 36, rate: 485 },
};

interface AidOption {
  id: AidType;
  label: string;
  savings: string;
  icon: LucideIcon;
  annualReduction: number | null;
}

const AID_OPTIONS: AidOption[] = [
  {
    id: "scholarships",
    label: "Scholarships",
    savings: "Up to $2,500/yr",
    icon: GraduationCap,
    annualReduction: 2500,
  },
  {
    id: "employer",
    label: "Employer aid",
    savings: "Up to $5,250/yr",
    icon: Briefcase,
    annualReduction: 5250,
  },
  {
    id: "military",
    label: "Military",
    savings: "Up to 100%",
    icon: Shield,
    annualReduction: null,
  },
];

const STEPS: { id: StepId; label: string }[] = [
  { id: 1, label: "Degree" },
  { id: 2, label: "Transfer" },
  { id: 3, label: "Aid" },
];

export interface CostEstimatorProps {
  id?: string;
  className?: string;
  /** Called when the visitor chooses to request info after reviewing next steps. */
  onRequestPlan?: (context: CostPlanContext) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function useAnimatedNumber(target: number, duration = 400): number {
  const prefersReduced = getPrefersReducedMotion();
  const [display, setDisplay] = useState(target);
  const startRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;

    const start = startRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(start + (target - start) * eased);
      setDisplay(next);
      startRef.current = next;
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, prefersReduced]);

  return prefersReduced ? target : display;
}

function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  ariaLabel,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="relative h-11 w-full">
      <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 overflow-hidden rounded-full bg-uagc-navy/10">
        <div
          className="h-full rounded-full bg-uagc-gold transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
      />
      <span
        className="pointer-events-none absolute top-1/2 z-5 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-uagc-gold bg-white shadow-[0_1px_6px_rgba(12,35,75,0.18)] transition-[left] duration-150 ease-out"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

function StepSectionHeader({
  step,
  title,
  trailing,
}: {
  step: StepId;
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-uagc-navy/8 text-xs font-bold tabular-nums text-uagc-navy"
        >
          {step}
        </span>
        <p className="text-sm font-semibold text-uagc-navy">{title}</p>
      </div>
      {trailing}
    </div>
  );
}

function PlanNextSteps({
  context,
  onRequestPlan,
  onKeepAdjusting,
}: {
  context: CostPlanContext;
  onRequestPlan: () => void;
  onKeepAdjusting: () => void;
}) {
  const aidSummary =
    context.selectedAid.length > 0
      ? context.selectedAid
          .map((id) => AID_OPTIONS.find((o) => o.id === id)?.label)
          .filter(Boolean)
          .join(", ")
      : "None selected yet";

  return (
    <div id="cost-plan-next" className="space-y-4">
      <div>
        <p className="type-micro font-bold uppercase tracking-widest text-white/45">
          Your estimate snapshot
        </p>
        <ul className="mt-2.5 space-y-1.5 text-sm text-uagc-navy-muted">
          <li className="flex items-start gap-2">
            <CheckCircle2
              className="mt-0.5 size-3.5 shrink-0 text-uagc-gold"
              aria-hidden
            />
            <span>
              <span className="font-semibold text-white">
                {context.degreeLabel}
              </span>
              {context.estimatedCost != null && !context.hasMilitary ? (
                <>
                  {" "}
                  · est.{" "}
                  <span className="font-semibold tabular-nums text-uagc-gold">
                    {formatCurrency(context.estimatedCost)}
                  </span>
                </>
              ) : null}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2
              className="mt-0.5 size-3.5 shrink-0 text-uagc-gold"
              aria-hidden
            />
            <span>
              <span className="font-semibold text-white">
                {context.transferCredits} transfer credits
              </span>{" "}
              in your estimate
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2
              className="mt-0.5 size-3.5 shrink-0 text-uagc-gold"
              aria-hidden
            />
            <span>
              Aid considered:{" "}
              <span className="font-semibold text-white">{aidSummary}</span>
            </span>
          </li>
        </ul>
      </div>

      <p className="text-xs leading-relaxed text-uagc-navy-muted">
        {context.hasMilitary
          ? "Military benefits vary — an advisor builds your personalized cost plan at no charge."
          : "An enrollment advisor confirms transfer credits, aid eligibility, and your final cost."}
      </p>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onRequestPlan}
          className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-uagc-gold px-5 py-3 text-sm font-bold text-uagc-navy transition-[transform,background-color] duration-200 hover:bg-uagc-gold-dark active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Request information
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </button>
        <a
          href={PHONE_HREF}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:border-white/35 hover:bg-white/5 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Phone className="size-4 text-uagc-gold" aria-hidden />
          {context.hasMilitary ? "Talk to an advisor" : "Call an advisor"}
        </a>
        <button
          type="button"
          onClick={onKeepAdjusting}
          className="cursor-pointer py-1 text-center text-xs font-semibold text-white/45 underline-offset-2 transition-colors duration-200 hover:text-white/70 hover:underline"
        >
          Keep adjusting my estimate
        </button>
      </div>
    </div>
  );
}

export function CostEstimator({
  id = "cost-estimator",
  className,
  onRequestPlan,
}: CostEstimatorProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const stepRefs = useRef<Record<StepId, HTMLDivElement | null>>({
    1: null,
    2: null,
    3: null,
  });
  const resultRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>("bachelor");
  const [transferCredits, setTransferCredits] = useState(30);
  const [selectedAid, setSelectedAid] = useState<Set<AidType>>(new Set());
  const [hasAdjustedTransfer, setHasAdjustedTransfer] = useState(false);
  const [hasTouchedAid, setHasTouchedAid] = useState(false);
  const [transferNudgeDismissed, setTransferNudgeDismissed] = useState(false);
  const [focusStep, setFocusStep] = useState<StepId>(1);
  const transferNudgeEligible =
    isVisible &&
    !hasAdjustedTransfer &&
    !transferNudgeDismissed &&
    focusStep === 2;
  const [transferNudgeRevealed, setTransferNudgeRevealed] = useState(false);
  const [prevTransferNudgeEligible, setPrevTransferNudgeEligible] = useState(
    transferNudgeEligible,
  );
  if (transferNudgeEligible !== prevTransferNudgeEligible) {
    setPrevTransferNudgeEligible(transferNudgeEligible);
    if (!transferNudgeEligible) {
      setTransferNudgeRevealed(false);
    }
  }
  const showTransferNudge = transferNudgeEligible && transferNudgeRevealed;
  const [highlightSource, setHighlightSource] = useState<ChangeSource | null>(
    null,
  );
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const [costTick, setCostTick] = useState(false);
  const [planReadyState, setPlanReadyState] = useState(false);
  const [planReadyForKey, setPlanReadyForKey] = useState<string | null>(null);

  const mobileBarActive = showMobileBar && sectionInView;
  usePublishElementHeight(
    mobileBarRef,
    "--uagc-sticky-secondary-height",
    mobileBarActive,
  );

  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const pulseHighlight = useCallback((source: ChangeSource) => {
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    setHighlightSource(source);
    highlightTimeoutRef.current = setTimeout(() => setHighlightSource(null), 700);
  }, []);

  useEffect(
    () => () => {
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!transferNudgeEligible) return;
    const timer = window.setTimeout(() => setTransferNudgeRevealed(true), 1600);
    return () => window.clearTimeout(timer);
  }, [transferNudgeEligible]);

  useEffect(() => {
    const section = ref.current;
    const panel = resultRef.current;
    if (!section || !panel) return;

    const media = window.matchMedia("(min-width: 1024px)");
    const sectionObserver = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    sectionObserver.observe(section);

    let resultCleanup: (() => void) | undefined;
    const syncResultObserver = () => {
      resultCleanup?.();
      if (media.matches) {
        setShowMobileBar(false);
        return;
      }
      const resultObserver = new IntersectionObserver(
        ([entry]) => setShowMobileBar(!entry.isIntersecting),
        { threshold: 0.15, rootMargin: "0px 0px -100px 0px" },
      );
      resultObserver.observe(panel);
      resultCleanup = () => resultObserver.disconnect();
    };

    syncResultObserver();
    media.addEventListener("change", syncResultObserver);
    return () => {
      sectionObserver.disconnect();
      resultCleanup?.();
      media.removeEventListener("change", syncResultObserver);
    };
  }, [ref]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    if (media.matches) return;

    const sections = (STEPS.map((s) => s.id) as StepId[])
      .map((id) => stepRefs.current[id])
      .filter((node): node is HTMLDivElement => node != null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const best = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        const step = Number(best.target.getAttribute("data-step")) as StepId;
        if (step === 1 || step === 2 || step === 3) setFocusStep(step);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-12% 0px -35% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToStep = useCallback((step: StepId) => {
    setFocusStep(step);
    stepRefs.current[step]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  const toggleAid = useCallback(
    (aid: AidType) => {
      setHasTouchedAid(true);
      setFocusStep(3);
      pulseHighlight("aid");
      setSelectedAid((prev) => {
        const next = new Set(prev);
        if (next.has(aid)) next.delete(aid);
        else next.add(aid);
        return next;
      });
    },
    [pulseHighlight],
  );

  const config = DEGREE_CONFIG[degreeLevel];
  const maxTransfer = degreeLevel === "master" ? 12 : 90;
  const clampedTransfer = Math.min(transferCredits, maxTransfer);

  const calc = useMemo(() => {
    const transfer = Math.min(transferCredits, config.credits - 1);
    const remaining = config.credits - transfer;
    const fullPrice = config.credits * config.rate;
    const tuition = remaining * config.rate;
    const transferSavings = transfer * config.rate;

    const totalTerms = Math.ceil(remaining / 6);
    const totalMonths = Math.max(totalTerms * 1.25, 1);
    const years = totalMonths / 12;

    const hasMilitary = selectedAid.has("military");
    let aidReduction = 0;
    for (const aid of selectedAid) {
      const opt = AID_OPTIONS.find((o) => o.id === aid);
      if (opt?.annualReduction) {
        aidReduction += opt.annualReduction * Math.max(years, 1);
      }
    }
    aidReduction = Math.min(aidReduction, tuition);

    const estimated = hasMilitary ? null : tuition - aidReduction;
    const monthly = estimated
      ? Math.round(estimated / Math.max(totalMonths, 1))
      : null;

    const savingsPct =
      fullPrice > 0
        ? Math.round(((transferSavings + aidReduction) / fullPrice) * 100)
        : 0;

    return {
      totalCredits: config.credits,
      transfer,
      remaining,
      fullPrice,
      tuition,
      transferSavings,
      aidReduction,
      totalSavings: transferSavings + aidReduction,
      estimated,
      monthly,
      totalMonths,
      hasMilitary,
      savingsPct,
    };
  }, [transferCredits, selectedAid, config]);

  const animatedCost = useAnimatedNumber(calc.estimated ?? 0);
  const animatedMonthly = useAnimatedNumber(calc.monthly ?? 0);
  const animatedSavings = useAnimatedNumber(calc.totalSavings);
  const costSignature = `${calc.estimated}-${calc.hasMilitary}-${calc.monthly}`;
  const planInputsKey = `${degreeLevel}-${transferCredits}-${[...selectedAid].sort().join(",")}`;
  const planReady =
    planReadyState && planReadyForKey === planInputsKey;

  useEffect(() => {
    if (getPrefersReducedMotion()) return;

    let timer: number | undefined;
    const frame = requestAnimationFrame(() => {
      setCostTick(true);
      timer = window.setTimeout(() => setCostTick(false), 400);
    });

    return () => {
      cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
    };
  }, [costSignature]);

  const planContext = useMemo<CostPlanContext>(
    () => ({
      degreeLevel,
      degreeLabel: config.label,
      transferCredits: calc.transfer,
      selectedAid: [...selectedAid],
      estimatedCost: calc.estimated,
      hasMilitary: calc.hasMilitary,
    }),
    [
      degreeLevel,
      config.label,
      calc.transfer,
      calc.estimated,
      calc.hasMilitary,
      selectedAid,
    ],
  );

  const openNextSteps = useCallback(() => {
    setPlanReadyState(true);
    setPlanReadyForKey(planInputsKey);
    window.setTimeout(() => {
      document
        .getElementById("cost-plan-next")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }, [planInputsKey]);

  const handleRequestPlan = useCallback(() => {
    onRequestPlan?.(planContext);
  }, [onRequestPlan, planContext]);

  const timeLabel = useMemo(() => {
    const months = Math.round(calc.totalMonths);
    if (months < 12) return `~${months} mo`;
    const y = Math.floor(months / 12);
    const m = months % 12;
    return m === 0 ? `~${y} yr` : `~${y} yr ${m} mo`;
  }, [calc.totalMonths]);

  const stepProgress = useMemo(
    () =>
      STEPS.map((step) => {
        let complete = false;
        switch (step.id) {
          case 1:
            complete = true;
            break;
          case 2:
            complete = hasAdjustedTransfer;
            break;
          case 3:
            complete = hasTouchedAid;
            break;
          default: {
            const _exhaustive: never = step.id;
            return _exhaustive;
          }
        }
        return { ...step, complete };
      }),
    [hasAdjustedTransfer, hasTouchedAid],
  );

  const progressPct = useMemo(() => {
    if (hasTouchedAid) return 100;
    if (hasAdjustedTransfer) return 66;
    if (focusStep >= 2) return 45;
    return 33;
  }, [focusStep, hasAdjustedTransfer, hasTouchedAid]);

  const breakdownHighlight = (source: ChangeSource) =>
    highlightSource === source
      ? "rounded bg-white/10 ring-1 ring-uagc-gold/35 transition-[background-color,box-shadow] duration-200"
      : "transition-[background-color,box-shadow] duration-200";

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 section-pad lg:scroll-mt-36",
        mobileBarActive &&
          "pb-[calc(var(--uagc-sticky-rfi-height)+var(--uagc-sticky-secondary-height)+1rem)] lg:pb-0",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "reveal-section mb-8 lg:mb-10",
            isVisible && "is-visible",
          )}
        >
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
            <div className="text-center lg:text-left">
              <span
                aria-hidden
                className="mx-auto mb-3 accent-bar lg:mx-0"
              />
              <h2 id={`${id}-heading`} className="type-h2 text-uagc-navy">
                What Could Your Degree Cost?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-uagc-gray sm:text-base lg:mx-0">
                Three inputs. One live estimate. An advisor confirms your final
                plan at no cost.
              </p>
            </div>
            <div className="mt-6 hidden shrink-0 border-l-2 border-uagc-gold pl-6 lg:block">
              <p className="font-heading text-5xl font-bold leading-none tabular-nums text-uagc-gold">
                86%
              </p>
              <p className="mt-1 max-w-40 text-sm leading-snug text-uagc-gray">
                of students receive financial help
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {["$0 to apply", "86% get aid", "Live estimate", "Advisor review"].map(
              (pill) => (
              <span
                key={pill}
                className={cn(
                  "inline-flex items-center rounded-full border border-uagc-border bg-white px-3 py-1 text-xs font-semibold text-uagc-navy",
                  pill === "86% get aid" && "lg:hidden",
                )}
              >
                {pill}
              </span>
            ),
            )}
          </div>
        </div>

        <div
          className={cn(
            "reveal-section stagger-2 overflow-hidden rounded-2xl border border-uagc-border border-t-4 border-t-uagc-gold bg-white shadow-[0_24px_64px_rgba(12,35,75,0.09)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,400px)] lg:items-stretch",
            isVisible && "is-visible",
          )}
        >
          {/* ─── Configurator (left / top on mobile) ─── */}
          <div className="flex min-w-0 flex-col">
            <nav
              aria-label="Cost estimator steps"
              className="border-b border-uagc-border bg-uagc-surface px-4 py-4 sm:px-6"
            >
              <div
                className="mb-4 h-1 w-full overflow-hidden rounded-full bg-uagc-navy/8"
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Estimator progress"
              >
                <div
                  className="h-full rounded-full bg-uagc-gold transition-[width] duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <ol className="grid grid-cols-3 gap-2 sm:gap-3">
                {stepProgress.map((step) => {
                  const isFocus = focusStep === step.id;
                  const isUpcoming = !step.complete && !isFocus;

                  return (
                    <li key={step.id} className="min-w-0">
                      <button
                        type="button"
                        onClick={() => scrollToStep(step.id)}
                        aria-current={isFocus ? "step" : undefined}
                        className={cn(
                          "flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl px-2 py-2 transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:flex-row sm:justify-center sm:gap-2.5 sm:px-3 sm:py-2.5",
                          isFocus
                            ? "bg-white text-uagc-navy shadow-[0_2px_12px_rgba(12,35,75,0.08)] ring-1 ring-uagc-navy/10"
                            : "text-uagc-gray hover:bg-white/70 hover:text-uagc-navy",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200",
                            step.complete && "bg-uagc-gold text-uagc-navy",
                            isFocus &&
                              !step.complete &&
                              "bg-uagc-navy text-white",
                            isUpcoming && "bg-uagc-navy/10 text-uagc-navy/45",
                          )}
                        >
                          {step.complete ? (
                            <CheckCircle2
                              className="size-4"
                              strokeWidth={2.5}
                              aria-hidden
                            />
                          ) : (
                            step.id
                          )}
                        </span>
                        <span
                          className={cn(
                            "truncate text-xs font-semibold uppercase tracking-wide sm:normal-case sm:tracking-normal",
                            isFocus ? "text-uagc-navy" : "text-uagc-gray",
                          )}
                        >
                          {step.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Step 1 — full width */}
            <div
              ref={(node) => {
                stepRefs.current[1] = node;
              }}
              data-step={1}
              className={cn(
                "scroll-mt-4 border-b border-uagc-border px-4 py-5 transition-colors duration-200 sm:px-6 sm:py-6",
                focusStep === 1 && "bg-uagc-navy/2",
              )}
            >
              <StepSectionHeader
                step={1}
                title="Degree level"
                trailing={
                  <p className="hidden text-xs text-uagc-gray sm:block">
                    Per-credit rate sets your baseline
                  </p>
                }
              />
              <div
                className="rounded-xl bg-uagc-surface p-1"
                role="radiogroup"
                aria-label="Degree level"
              >
                <div className="grid grid-cols-3 gap-1">
                {(
                  Object.entries(DEGREE_CONFIG) as [
                    DegreeLevel,
                    typeof config,
                  ][]
                ).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={degreeLevel === key}
                    onClick={() => {
                      setDegreeLevel(key);
                      setFocusStep(1);
                      pulseHighlight("degree");
                      setTransferCredits((prev) =>
                        key === "master" ? Math.min(prev, 12) : prev,
                      );
                    }}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-3.5 text-center transition-[transform,background-color,color,box-shadow] duration-200 active:scale-97 sm:py-4",
                      degreeLevel === key
                        ? "bg-uagc-navy text-white shadow-[0_4px_16px_rgba(12,35,75,0.2)]"
                        : "bg-white text-uagc-navy motion-hover-lift hover:bg-white",
                    )}
                  >
                    <span className="block text-sm font-bold">{val.label}</span>
                    <span
                      className={cn(
                        "mt-1 block text-xs tabular-nums",
                        degreeLevel === key ? "text-uagc-gold" : "text-uagc-gray",
                      )}
                    >
                      ${val.rate}/cr
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
                        degreeLevel === key
                          ? "bg-white/15 text-white/80"
                          : "bg-uagc-navy/5 text-uagc-navy/50",
                      )}
                    >
                      {val.credits} credits
                    </span>
                  </button>
                ))}
                </div>
              </div>
            </div>

            {/* Steps 2 + 3 — side by side on large screens */}
            <div className="grid lg:grid-cols-2">
              {/* Step 2 — Transfer */}
              <div
                ref={(node) => {
                  stepRefs.current[2] = node;
                }}
                data-step={2}
                className={cn(
                  "scroll-mt-4 border-b border-uagc-border px-4 py-5 transition-colors duration-200 sm:px-6 sm:py-6 lg:border-b-0 lg:border-r lg:border-uagc-border",
                  focusStep === 2 && "bg-uagc-navy/2",
                )}
              >
                <StepSectionHeader
                  step={2}
                  title="Transfer credits"
                  trailing={
                    <span className="rounded-md bg-uagc-navy px-2.5 py-1 text-sm font-bold tabular-nums text-white">
                      {clampedTransfer}
                    </span>
                  }
                />

                {showTransferNudge ? (
                  <div
                    role="status"
                    className="mb-4 flex items-center gap-2 rounded-lg border border-uagc-gold/30 bg-uagc-gold/10 px-3 py-2"
                  >
                    <Sparkles className="size-3.5 shrink-0 text-uagc-gold" aria-hidden />
                    <p className="flex-1 text-xs leading-snug text-uagc-navy">
                      Drag the slider — prior learning and certs count.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTransferNudgeDismissed(true)}
                      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-uagc-navy/40 hover:bg-uagc-navy/8 hover:text-uagc-navy"
                      aria-label="Dismiss tip"
                    >
                      <X className="size-3.5" aria-hidden />
                    </button>
                  </div>
                ) : null}

                <RangeSlider
                  min={0}
                  max={maxTransfer}
                  step={5}
                  value={clampedTransfer}
                  onChange={(value) => {
                    setHasAdjustedTransfer(true);
                    setTransferNudgeDismissed(true);
                    setFocusStep(2);
                    pulseHighlight("transfer");
                    setTransferCredits(value);
                  }}
                  ariaLabel="Transfer credits"
                />

                <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="text-uagc-gray">0 – {maxTransfer} credits</span>
                  {calc.transferSavings > 0 ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                      <TrendingDown className="size-3.5" aria-hidden />
                      {formatCurrency(calc.transferSavings)} saved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-uagc-gray">
                      <Info className="size-3.5 text-uagc-gold" aria-hidden />
                      PLA eligible
                    </span>
                  )}
                </div>
              </div>

              {/* Step 3 — Aid */}
              <div
                ref={(node) => {
                  stepRefs.current[3] = node;
                }}
                data-step={3}
                className={cn(
                  "scroll-mt-4 px-4 py-5 transition-colors duration-200 sm:px-6 sm:py-6",
                  focusStep === 3 && "bg-uagc-navy/2",
                )}
              >
                <StepSectionHeader
                  step={3}
                  title="Financial aid"
                  trailing={
                    <span className="type-micro font-bold uppercase tracking-wide text-uagc-navy/45">
                      Optional
                    </span>
                  }
                />
                <div className="flex flex-col gap-2">
                  {AID_OPTIONS.map((option) => {
                    const active = selectedAid.has(option.id);
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleAid(option.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left transition-[transform,border-color,background-color,box-shadow] duration-200 active:scale-98",
                          active
                            ? "border-uagc-navy bg-uagc-navy text-white shadow-[0_4px_14px_rgba(12,35,75,0.15)]"
                            : "border-uagc-border bg-white text-uagc-navy motion-hover-lift hover:border-uagc-navy/25",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-lg",
                            active ? "bg-white/15" : "bg-uagc-surface",
                          )}
                        >
                          <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">
                            {option.label}
                          </span>
                          <span
                            className={cn(
                              "block text-xs tabular-nums",
                              active ? "text-uagc-gold" : "text-uagc-gray",
                            )}
                          >
                            {option.savings}
                          </span>
                        </span>
                        {active ? (
                          <CheckCircle2 className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Result panel (right / below on mobile) ─── */}
          <div
            ref={resultRef}
            className="relative flex flex-col overflow-hidden bg-uagc-navy text-white lg:sticky lg:top-28 lg:self-start"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50">
                <span className="relative flex size-2">
                  <span className="live-dot absolute inset-0 rounded-full bg-uagc-gold" />
                  <span className="relative m-auto size-1.5 rounded-full bg-uagc-gold" />
                </span>
                Live estimate
              </p>
              {!calc.hasMilitary && calc.totalSavings > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-bold text-green-300">
                  <TrendingDown className="size-3.5" aria-hidden />
                  {formatCurrency(animatedSavings)} off
                </span>
              )}
            </div>

            <div className="relative flex flex-1 flex-col justify-center px-5 py-6 text-center sm:px-6 sm:py-8">
              {calc.hasMilitary ? (
                <>
                  <p className="text-xl font-bold text-uagc-gold">
                    Contact an Advisor
                  </p>
                  <p className="mt-2 text-sm text-uagc-navy-muted">
                    Military benefits vary — your advisor builds a free
                    personalized estimate.
                  </p>
                </>
              ) : (
                <>
                  <p
                    className={cn(
                      "font-heading text-[2.75rem] font-bold leading-none tabular-nums text-uagc-gold sm:text-[3.25rem]",
                      costTick && "cost-tick",
                    )}
                  >
                    {formatCurrency(animatedCost)}
                  </p>
                  {calc.monthly != null && (
                    <p className="mt-3 text-sm tabular-nums text-uagc-navy-muted">
                      ~{formatCurrency(animatedMonthly)}
                      <span className="mx-2 text-white/25" aria-hidden>
                        ·
                      </span>
                      {timeLabel}
                    </p>
                  )}
                </>
              )}
            </div>

            {!calc.hasMilitary && calc.savingsPct > 0 && (
              <div className="relative mx-5 mb-4 sm:mx-6">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-uagc-gold transition-[width] duration-500 ease-out"
                    style={{ width: `${Math.min(calc.savingsPct, 100)}%` }}
                  />
                </div>
                <p className="mt-2 flex items-center justify-between text-xs text-uagc-navy-muted">
                  <span className="flex items-center gap-1 font-semibold text-uagc-gold">
                    <Sparkles className="size-3.5" aria-hidden />
                    {calc.savingsPct}% savings applied
                  </span>
                  <span>vs. {formatCurrency(calc.fullPrice)}</span>
                </p>
              </div>
            )}

            <div className="relative space-y-1.5 border-t border-white/10 px-5 py-4 text-sm sm:px-6">
                <div
                  className={cn(
                    "flex justify-between gap-3 px-1 py-0.5",
                    breakdownHighlight("degree"),
                  )}
                >
                  <span className="text-white/55">{config.label}</span>
                  <span className="tabular-nums text-white/35 line-through">
                    {formatCurrency(calc.fullPrice)}
                  </span>
                </div>
                {calc.transfer > 0 && (
                  <div
                    className={cn(
                      "flex justify-between gap-3 px-1 py-0.5",
                      breakdownHighlight("transfer"),
                    )}
                  >
                    <span className="text-white/55">Transfer ({calc.transfer} cr)</span>
                    <span className="font-semibold tabular-nums text-uagc-gold">
                      −{formatCurrency(calc.transferSavings)}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    "flex justify-between gap-3 px-1 py-0.5",
                    breakdownHighlight("degree"),
                  )}
                >
                  <span className="text-white/55">
                    {calc.remaining} cr × {formatCurrency(config.rate)}
                  </span>
                  <span className="font-semibold tabular-nums text-white">
                    {formatCurrency(calc.tuition)}
                  </span>
                </div>
                {calc.aidReduction > 0 && (
                  <div
                    className={cn(
                      "flex justify-between gap-3 px-1 py-0.5",
                      breakdownHighlight("aid"),
                    )}
                  >
                    <span className="text-white/55">Est. aid</span>
                    <span className="font-semibold tabular-nums text-uagc-gold">
                      −{formatCurrency(calc.aidReduction)}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative border-t border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                {planReady ? (
                  <PlanNextSteps
                    context={planContext}
                    onRequestPlan={handleRequestPlan}
                    onKeepAdjusting={() => setPlanReadyState(false)}
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={openNextSteps}
                      className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-uagc-gold px-5 py-3 text-sm font-bold text-uagc-navy transition-[transform,background-color] duration-200 hover:bg-uagc-gold-dark active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      See your next steps
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </button>
                    <p className="mt-2 text-center text-xs text-white/40">
                      Review your estimate, then choose how to connect with an
                      advisor.
                    </p>
                  </>
                )}
              </div>
          </div>
        </div>

        {/* Mobile sticky estimate */}
        <div
          ref={mobileBarRef}
          className={cn(
            "pointer-events-none fixed inset-x-0 z-90 border-t border-uagc-navy/20 bg-uagc-navy px-4 py-2.5 shadow-[0_-6px_24px_rgba(12,35,75,0.25)] transition-[transform,opacity] duration-200 ease-out lg:hidden",
            "bottom-[calc(var(--uagc-sticky-rfi-height)+env(safe-area-inset-bottom,0px))] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]",
            mobileBarActive
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "translate-y-full opacity-0",
          )}
          aria-hidden={!mobileBarActive}
        >
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="min-w-0 flex-1">
              {calc.hasMilitary ? (
                <p className="truncate text-sm font-bold text-uagc-gold">
                  Contact an advisor
                </p>
              ) : (
                <p className="font-heading text-lg font-bold tabular-nums text-uagc-gold">
                  {formatCurrency(animatedCost)}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={planReady ? handleRequestPlan : openNextSteps}
              className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg bg-uagc-gold px-3.5 py-2 text-sm font-bold text-uagc-navy transition-[transform,background-color] duration-200 active:scale-97"
            >
              {planReady ? "Request info" : "Next steps"}
              <ArrowRight className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
