"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Filter,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Briefcase,
  BookOpen,
  X,
  Target,
  DollarSign,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramFilterItem, ProgramGoal } from "@/lib/organic-blog-data";
import { PROGRAM_GOAL_LABELS } from "@/lib/organic-blog-data";

/* ─── Types ─────────────────────────────────────────────────────── */

export interface BlogProgramFilterProps {
  programs: ProgramFilterItem[];
  heading?: string;
  className?: string;
  /** Highlight this program as contextually relevant to the article */
  recommendedId?: string;
  /** Goal tags relevant to this article — shown first in goal filter */
  relevantGoals?: ProgramGoal[];
}

type TypeFilter = "all" | "research" | "applied";

/* ─── Expanded Program Card ─────────────────────────────────────── */

function ProgramCard({
  program,
  isRecommended,
  isExpanded,
  onToggle,
}: {
  program: ProgramFilterItem;
  isRecommended: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "group rounded-lg border bg-white transition-all duration-150",
        isRecommended
          ? "border-uagc-gold/60 ring-1 ring-uagc-gold/20"
          : "border-gray-100 hover:border-uagc-gold/40",
        isExpanded && "shadow-sm",
      )}
      data-ga4-event="blog_program_filter_interact"
      data-ga4-program={program.shortName}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="flex items-center gap-1.5 rounded-t-lg bg-uagc-gold/10 px-3 py-1.5">
          <Sparkles className="size-3 text-uagc-gold" aria-hidden />
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-uagc-gold">
            Relevant to this article
          </span>
        </div>
      )}

      {/* Card header — always visible, acts as toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-2 p-3.5 text-left"
        aria-expanded={isExpanded}
      >
        <div className="min-w-0 flex-1">
          <p className="text-[0.8125rem] font-bold leading-snug text-uagc-navy">
            {program.shortName}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-block rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider",
                program.type === "research"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-amber-50 text-amber-700",
              )}
            >
              {program.type === "research" ? "Research" : "Applied"}
            </span>
            <span className="inline-flex items-center gap-1 text-[0.6875rem] text-uagc-navy/60">
              <Clock className="size-2.5" aria-hidden />
              {program.duration}
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp
            className="mt-0.5 size-4 shrink-0 text-uagc-navy/40"
            aria-hidden
          />
        ) : (
          <ChevronDown
            className="mt-0.5 size-4 shrink-0 text-uagc-navy/40"
            aria-hidden
          />
        )}
      </button>

      {/* Collapsed preview — quick facts row */}
      {!isExpanded && (
        <div className="border-t border-gray-50 px-3.5 pb-3 pt-2">
          <div className="flex items-center gap-1.5">
            <Briefcase
              className="size-3 shrink-0 text-uagc-navy/40"
              aria-hidden
            />
            <span className="text-[0.6875rem] text-uagc-navy/70 line-clamp-1">
              {program.bestFor}
            </span>
          </div>
        </div>
      )}

      {/* Expanded detail panel */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-3.5 pb-4 pt-3">
          {/* Quick facts grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5">
              <BookOpen className="size-3 text-uagc-navy/40" aria-hidden />
              <span className="text-[0.6875rem] text-uagc-navy/70">
                {program.credits} credits
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="size-3 text-uagc-navy/40" aria-hidden />
              <span className="text-[0.6875rem] text-uagc-navy/70">
                {program.format === "online" ? "100% online" : "Hybrid"}
              </span>
            </div>
            {program.costHint && (
              <div className="col-span-2 flex items-center gap-1.5">
                <DollarSign
                  className="size-3 shrink-0 text-uagc-gold"
                  aria-hidden
                />
                <span className="text-[0.6875rem] font-medium text-uagc-navy/70">
                  {program.costHint}
                </span>
              </div>
            )}
          </div>

          {/* Outcomes */}
          {program.outcomes.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-uagc-navy/50">
                What you&rsquo;ll be prepared to do
              </p>
              <ul className="space-y-1">
                {program.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-1.5">
                    <CheckCircle2
                      className="mt-0.5 size-3 shrink-0 text-green-500"
                      aria-hidden
                    />
                    <span className="text-[0.6875rem] leading-snug text-uagc-navy/75">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-3.5 flex gap-2">
            <Link
              href={program.href}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-uagc-navy px-3 py-2 text-[0.6875rem] font-bold text-white transition-colors hover:bg-uagc-navy/90"
              data-ga4-event="blog_program_filter_click"
              data-ga4-program={program.shortName}
              data-ga4-action="learn_more"
            >
              Learn More
              <ArrowRight className="size-3" aria-hidden />
            </Link>
            {program.nextStepHref && (
              <Link
                href={program.nextStepHref}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-uagc-red/20 bg-uagc-red/5 px-3 py-2 text-[0.6875rem] font-bold text-uagc-red transition-colors hover:bg-uagc-red/10"
                data-ga4-event="blog_program_filter_click"
                data-ga4-program={program.shortName}
                data-ga4-action="request_info"
              >
                {program.nextStepLabel ?? "Request Info"}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Goal Filter Pills ─────────────────────────────────────────── */

function GoalFilterPills({
  availableGoals,
  activeGoal,
  onSelect,
}: {
  availableGoals: ProgramGoal[];
  activeGoal: ProgramGoal | null;
  onSelect: (goal: ProgramGoal | null) => void;
}) {
  if (availableGoals.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {availableGoals.map((goal) => (
        <button
          key={goal}
          type="button"
          onClick={() => onSelect(activeGoal === goal ? null : goal)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.625rem] font-semibold transition-colors duration-100",
            activeGoal === goal
              ? "bg-uagc-gold text-white"
              : "bg-uagc-gold/10 text-uagc-navy/70 hover:bg-uagc-gold/20 hover:text-uagc-navy",
          )}
          aria-pressed={activeGoal === goal}
        >
          {PROGRAM_GOAL_LABELS[goal]}
        </button>
      ))}
    </div>
  );
}

/* ─── Advisor Help CTA ──────────────────────────────────────────── */

function AdvisorHelpCTA() {
  return (
    <div className="space-y-2 rounded-lg bg-uagc-navy/3 px-3.5 py-3">
      <p className="text-[0.75rem] font-bold text-uagc-navy">
        Not sure which program fits?
      </p>
      <p className="text-[0.6875rem] leading-snug text-uagc-navy/65">
        An enrollment advisor can help you find the right doctoral program for
        your goals and background.
      </p>
      <div className="flex gap-2">
        <Link
          href="/organic/request-information"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-uagc-red px-3 py-2 text-[0.6875rem] font-bold text-white transition-colors hover:bg-uagc-red/90"
          data-ga4-event="blog_program_filter_advisor_click"
          data-ga4-action="request_info"
        >
          <MessageCircle className="size-3" aria-hidden />
          Get Guidance
        </Link>
        <a
          href="tel:+18667115959"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[0.6875rem] font-bold text-uagc-navy transition-colors hover:bg-gray-50"
          data-ga4-event="blog_program_filter_advisor_click"
          data-ga4-action="call"
        >
          <Phone className="size-3" aria-hidden />
          Call
        </a>
      </div>
    </div>
  );
}

/* ─── Shared filter + list logic ────────────────────────────────── */

function useFilteredPrograms(
  programs: ProgramFilterItem[],
  recommendedId?: string,
  relevantGoals?: ProgramGoal[],
) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [goalFilter, setGoalFilter] = useState<ProgramGoal | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(
    recommendedId ?? null,
  );

  const availableGoals = useMemo(() => {
    const goalSet = new Set<ProgramGoal>();
    programs.forEach((p) => p.goalTags.forEach((g) => goalSet.add(g)));
    const allGoals = Array.from(goalSet);
    if (relevantGoals?.length) {
      const relevant = new Set(relevantGoals);
      allGoals.sort((a, b) => {
        const aR = relevant.has(a) ? 0 : 1;
        const bR = relevant.has(b) ? 0 : 1;
        return aR - bR;
      });
    }
    return allGoals;
  }, [programs, relevantGoals]);

  const filtered = useMemo(() => {
    let result = programs;
    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter);
    }
    if (goalFilter) {
      result = result.filter((p) => p.goalTags.includes(goalFilter));
    }
    if (recommendedId) {
      result.sort((a, b) => {
        if (a.id === recommendedId) return -1;
        if (b.id === recommendedId) return 1;
        return 0;
      });
    }
    return result;
  }, [programs, typeFilter, goalFilter, recommendedId]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const hasActiveFilters = typeFilter !== "all" || goalFilter !== null;

  const clearFilters = useCallback(() => {
    setTypeFilter("all");
    setGoalFilter(null);
  }, []);

  return {
    typeFilter,
    setTypeFilter,
    goalFilter,
    setGoalFilter,
    expandedId,
    toggleExpand,
    filtered,
    availableGoals,
    hasActiveFilters,
    clearFilters,
  };
}

/* ─── Desktop Sidebar Filter ────────────────────────────────────── */

function DesktopProgramFilter({
  programs,
  heading,
  className,
  recommendedId,
  relevantGoals,
}: BlogProgramFilterProps) {
  const {
    typeFilter,
    setTypeFilter,
    goalFilter,
    setGoalFilter,
    expandedId,
    toggleExpand,
    filtered,
    availableGoals,
    hasActiveFilters,
    clearFilters,
  } = useFilteredPrograms(programs, recommendedId, relevantGoals);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-uagc-gold/30 bg-white",
        className,
      )}
      data-module="blog-program-filter"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-uagc-gold/20 bg-uagc-cream-warm px-4 py-3.5">
        <Filter className="size-4 text-uagc-gold" aria-hidden />
        <h3 className="text-sm font-bold text-uagc-navy">
          {heading ?? "Find Your Program"}
        </h3>
      </div>

      {/* Type filter chips */}
      <div className="border-b border-gray-100 px-4 py-3">
        <div className="flex gap-1.5">
          {(
            [
              { id: "all", label: "All" },
              { id: "research", label: "Research" },
              { id: "applied", label: "Applied" },
            ] as const
          ).map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setTypeFilter(chip.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold transition-colors duration-100",
                typeFilter === chip.id
                  ? "bg-uagc-navy text-white"
                  : "bg-gray-100 text-uagc-navy/70 hover:bg-gray-200 hover:text-uagc-navy",
              )}
              aria-pressed={typeFilter === chip.id}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Goal filter */}
        {availableGoals.length > 0 && (
          <div className="mt-2.5">
            <p className="mb-1.5 text-[0.5625rem] font-bold uppercase tracking-wider text-uagc-navy/40">
              Filter by goal
            </p>
            <GoalFilterPills
              availableGoals={availableGoals}
              activeGoal={goalFilter}
              onSelect={setGoalFilter}
            />
          </div>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 text-[0.625rem] font-semibold text-uagc-red underline-offset-2 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Program list */}
      <div className="space-y-2 px-3 py-3">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              isRecommended={p.id === recommendedId}
              isExpanded={expandedId === p.id}
              onToggle={() => toggleExpand(p.id)}
            />
          ))
        ) : (
          <div className="py-4 text-center">
            <p className="text-xs text-uagc-navy/50">
              No programs match these filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-1.5 text-[0.6875rem] font-semibold text-uagc-red underline-offset-2 hover:underline"
            >
              Show all programs
            </button>
          </div>
        )}
      </div>

      {/* Advisor help CTA */}
      <div className="border-t border-gray-100 px-3 py-3">
        <AdvisorHelpCTA />
      </div>

      {/* Footer */}
      <div className="border-t border-uagc-gold/20 bg-uagc-cream-warm px-4 py-3">
        <p className="text-center text-[0.6875rem] text-uagc-navy/60">
          <span className="font-semibold text-uagc-navy/80">
            {filtered.length}
          </span>{" "}
          program{filtered.length !== 1 ? "s" : ""} &middot;{" "}
          <Link
            href="https://www.uagc.edu/online-degrees/doctoral"
            className="font-semibold text-uagc-red underline-offset-2 hover:underline"
            data-ga4-event="blog_program_filter_browse_all"
          >
            Browse all doctoral programs
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ─── Mobile Program Filter (Bottom drawer) ─────────────────────── */

function MobileProgramFilter({
  programs,
  heading,
  recommendedId,
  relevantGoals,
}: BlogProgramFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    typeFilter,
    setTypeFilter,
    goalFilter,
    setGoalFilter,
    expandedId,
    toggleExpand,
    filtered,
    availableGoals,
    hasActiveFilters,
    clearFilters,
  } = useFilteredPrograms(programs, recommendedId, relevantGoals);

  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <>
      {/* Trigger bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-[60px] z-40 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-sm shadow-[0_-4px_12px_rgba(0,0,0,0.06)] transition-transform duration-200 md:bottom-0 lg:hidden",
          isOpen && "translate-y-full",
        )}
      >
        <button
          type="button"
          onClick={toggle}
          className="flex w-full items-center justify-between rounded-xl bg-uagc-cream-warm px-4 py-3 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="size-5 text-uagc-gold" aria-hidden />
            <span className="text-sm font-bold text-uagc-navy">
              {heading ?? "Find Your Program"}
            </span>
            <span className="rounded-full bg-uagc-navy px-1.5 py-0.5 text-[0.5625rem] font-bold tabular-nums text-white">
              {programs.length}
            </span>
          </div>
          <ChevronDown className="size-4 text-uagc-navy/50" aria-hidden />
        </button>
      </div>

      {/* Drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={toggle}
          aria-hidden
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 lg:hidden",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Program filter"
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 bg-white pb-2 pt-3">
          <div className="mx-auto h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-uagc-gold" aria-hidden />
            <h3 className="text-base font-bold text-uagc-navy">
              {heading ?? "Find Your Program"}
            </h3>
          </div>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full p-2 text-uagc-navy/50 hover:bg-gray-100 hover:text-uagc-navy"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Filter section */}
        <div className="border-b border-gray-100 px-5 py-4">
          {/* Type chips */}
          <div className="flex gap-2">
            {(
              [
                { id: "all", label: "All" },
                { id: "research", label: "Research" },
                { id: "applied", label: "Applied" },
              ] as const
            ).map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setTypeFilter(chip.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-100",
                  typeFilter === chip.id
                    ? "bg-uagc-navy text-white"
                    : "bg-gray-100 text-uagc-navy/70 hover:bg-gray-200",
                )}
                aria-pressed={typeFilter === chip.id}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Goal filter */}
          {availableGoals.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-uagc-navy/40">
                By goal
              </p>
              <GoalFilterPills
                availableGoals={availableGoals}
                activeGoal={goalFilter}
                onSelect={setGoalFilter}
              />
            </div>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2.5 text-xs font-semibold text-uagc-red underline-offset-2 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Program list */}
        <div className="space-y-2.5 px-5 py-4">
          {filtered.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              isRecommended={p.id === recommendedId}
              isExpanded={expandedId === p.id}
              onToggle={() => toggleExpand(p.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="py-6 text-center">
              <p className="text-sm text-uagc-navy/50">
                No programs match these filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 text-sm font-semibold text-uagc-red underline-offset-2 hover:underline"
              >
                Show all programs
              </button>
            </div>
          )}
        </div>

        {/* Advisor CTA */}
        <div className="border-t border-gray-100 px-5 py-4">
          <AdvisorHelpCTA />
        </div>

        {/* Browse all link */}
        <div className="border-t border-uagc-gold/20 bg-uagc-cream-warm px-5 py-4 text-center">
          <Link
            href="https://www.uagc.edu/online-degrees/doctoral"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-uagc-red transition-colors hover:text-uagc-red/80"
            onClick={toggle}
            data-ga4-event="blog_program_filter_browse_all"
          >
            Browse all doctoral programs
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed bar */}
      <div className="h-[72px] lg:hidden" aria-hidden />
    </>
  );
}

/* ─── Composite Export ──────────────────────────────────────────── */

export function BlogProgramFilter(props: BlogProgramFilterProps) {
  return (
    <>
      {/* Desktop: inline sidebar card */}
      <div className="hidden lg:block">
        <DesktopProgramFilter {...props} />
      </div>

      {/* Mobile: bottom-anchored drawer */}
      <MobileProgramFilter {...props} />
    </>
  );
}
