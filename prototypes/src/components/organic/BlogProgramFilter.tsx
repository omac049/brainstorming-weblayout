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
  recommendedId?: string;
  relevantGoals?: ProgramGoal[];
}

type TypeFilter = "all" | "research" | "applied";

/* ─── Shared filter logic ───────────────────────────────────────── */

function useFilteredPrograms(
  programs: ProgramFilterItem[],
  recommendedId?: string,
) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    recommendedId ?? null,
  );

  const filtered = useMemo(() => {
    let result = programs;
    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter);
    }
    if (recommendedId) {
      result.sort((a, b) => {
        if (a.id === recommendedId) return -1;
        if (b.id === recommendedId) return 1;
        return 0;
      });
    }
    return result;
  }, [programs, typeFilter, recommendedId]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const hasActiveFilters = typeFilter !== "all";

  const clearFilters = useCallback(() => {
    setTypeFilter("all");
  }, []);

  return {
    typeFilter,
    setTypeFilter,
    expandedId,
    toggleExpand,
    filtered,
    hasActiveFilters,
    clearFilters,
  };
}

/* ─── Desktop Expanded Card (sidebar) ───────────────────────────── */

function DesktopProgramCard({
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
          ? "border-uagc-navy/40 ring-1 ring-uagc-navy/20"
          : "border-gray-100 hover:border-uagc-navy/40",
        isExpanded && "shadow-sm",
      )}
      data-ga4-event="blog_program_filter_interact"
      data-ga4-program={program.shortName}
    >
      {isRecommended && (
        <div className="flex items-center gap-1.5 rounded-t-lg bg-uagc-sky/10 px-3 py-1.5">
          <Sparkles className="size-3 text-uagc-navy" aria-hidden />
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-uagc-red">
            Relevant to this article
          </span>
        </div>
      )}

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
                "inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider",
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
          <ChevronUp className="mt-0.5 size-4 shrink-0 text-uagc-navy/40" aria-hidden />
        ) : (
          <ChevronDown className="mt-0.5 size-4 shrink-0 text-uagc-navy/40" aria-hidden />
        )}
      </button>

      {!isExpanded && (
        <div className="border-t border-gray-50 px-3.5 pb-3 pt-2">
          <div className="flex items-center gap-1.5">
            <Briefcase className="size-3 shrink-0 text-uagc-navy/40" aria-hidden />
            <span className="text-[0.6875rem] text-uagc-navy/70 line-clamp-1">
              {program.bestFor}
            </span>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="border-t border-gray-100 px-3.5 pb-4 pt-3">
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
                <DollarSign className="size-3 shrink-0 text-uagc-navy" aria-hidden />
                <span className="text-[0.6875rem] font-medium text-uagc-navy/70">
                  {program.costHint}
                </span>
              </div>
            )}
          </div>

          {program.outcomes.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-uagc-navy/50">
                What you&rsquo;ll be prepared to do
              </p>
              <ul className="space-y-1">
                {program.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-green-500" aria-hidden />
                    <span className="text-[0.6875rem] leading-snug text-uagc-navy/75">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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

/* ─── Goal Filter Pills (desktop only) ──────────────────────────── */

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
            "rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold transition-colors duration-100",
            activeGoal === goal
              ? "bg-uagc-navy text-white"
              : "bg-uagc-sky/10 text-uagc-navy/70 hover:bg-uagc-sky/15 hover:text-uagc-navy active:bg-uagc-sky/20",
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

function AdvisorHelpCTA({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("rounded-lg bg-uagc-navy/3", compact ? "px-4 py-3" : "space-y-2 px-3.5 py-3")}>
      <p className={cn("font-bold text-uagc-navy", compact ? "text-[0.8125rem]" : "text-[0.75rem]")}>
        Not sure which program fits?
      </p>
      {!compact && (
        <p className="text-[0.6875rem] leading-snug text-uagc-navy/65">
          An enrollment advisor can help you find the right doctoral program for
          your goals and background.
        </p>
      )}
      <div className={cn("flex gap-2", compact && "mt-2")}>
        <Link
          href="/organic/request-information"
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-uagc-navy font-bold text-white transition-colors hover:bg-uagc-navy-dark active:bg-uagc-navy-dark",
            compact ? "px-4 py-2.5 text-[0.8125rem]" : "px-3 py-2 text-[0.6875rem]",
          )}
          data-ga4-event="blog_program_filter_advisor_click"
          data-ga4-action="request_info"
        >
          <MessageCircle className="size-3.5" aria-hidden />
          Get Guidance
        </Link>
        <a
          href="tel:+18667115959"
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white font-bold text-uagc-navy transition-colors hover:bg-gray-50 active:bg-gray-100",
            compact ? "px-4 py-2.5 text-[0.8125rem]" : "px-3 py-2 text-[0.6875rem]",
          )}
          data-ga4-event="blog_program_filter_advisor_click"
          data-ga4-action="call"
        >
          <Phone className="size-3.5" aria-hidden />
          Call
        </a>
      </div>
    </div>
  );
}

/* ─── Desktop Sidebar Filter ────────────────────────────────────── */

function DesktopProgramFilter({
  programs,
  heading,
  className,
  recommendedId,
  relevantGoals,
}: BlogProgramFilterProps) {
  const [goalFilter, setGoalFilter] = useState<ProgramGoal | null>(null);
  const {
    typeFilter,
    setTypeFilter,
    expandedId,
    toggleExpand,
    filtered: typeFiltered,
    hasActiveFilters: hasTypeFilter,
    clearFilters: clearTypeFilter,
  } = useFilteredPrograms(programs, recommendedId);

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
    if (!goalFilter) return typeFiltered;
    return typeFiltered.filter((p) => p.goalTags.includes(goalFilter));
  }, [typeFiltered, goalFilter]);

  const hasActiveFilters = hasTypeFilter || goalFilter !== null;
  const clearAll = useCallback(() => {
    clearTypeFilter();
    setGoalFilter(null);
  }, [clearTypeFilter]);

  return (
    <div
      className={cn("overflow-hidden rounded-xl border border-uagc-navy/40 bg-white", className)}
      data-module="blog-program-filter"
    >
      <div className="flex items-center gap-2 border-b border-uagc-navy/20 bg-uagc-cream-warm px-4 py-3.5">
        <Filter className="size-4 text-uagc-navy" aria-hidden />
        <h3 className="text-sm font-bold text-uagc-navy">
          {heading ?? "Find Your Program"}
        </h3>
      </div>

      <div className="border-b border-gray-100 px-4 py-3">
        <div className="flex gap-1.5">
          {([
            { id: "all", label: "All" },
            { id: "research", label: "Research" },
            { id: "applied", label: "Applied" },
          ] as const).map((chip) => (
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

        {availableGoals.length > 0 && (
          <div className="mt-2.5">
            <p className="mb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-uagc-navy/40">
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
            onClick={clearAll}
            className="mt-2 text-[0.6875rem] font-semibold text-uagc-red underline-offset-2 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="space-y-2 px-3 py-3">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <DesktopProgramCard
              key={p.id}
              program={p}
              isRecommended={p.id === recommendedId}
              isExpanded={expandedId === p.id}
              onToggle={() => toggleExpand(p.id)}
            />
          ))
        ) : (
          <div className="py-4 text-center">
            <p className="text-xs text-uagc-navy/50">No programs match.</p>
            <button type="button" onClick={clearAll} className="mt-1.5 text-[0.6875rem] font-semibold text-uagc-red underline-offset-2 hover:underline">
              Show all programs
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-3 py-3">
        <AdvisorHelpCTA />
      </div>

      <div className="border-t border-uagc-navy/20 bg-uagc-cream-warm px-4 py-3">
        <p className="text-center text-[0.6875rem] text-uagc-navy/60">
          <span className="font-semibold text-uagc-navy/80">{filtered.length}</span>{" "}
          program{filtered.length !== 1 ? "s" : ""} &middot;{" "}
          <Link href="https://www.uagc.edu/online-degrees/doctoral" className="font-semibold text-uagc-red underline-offset-2 hover:underline" data-ga4-event="blog_program_filter_browse_all">
            Browse all doctoral programs
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ─── Mobile: Flat program row (single-tap navigation) ──────────── */

function MobileProgramRow({
  program,
  isRecommended,
}: {
  program: ProgramFilterItem;
  isRecommended: boolean;
}) {
  return (
    <Link
      href={program.href}
      className={cn(
        "group flex items-center gap-3.5 rounded-xl border p-4 transition-colors active:bg-gray-50",
        isRecommended
          ? "border-uagc-navy/40 bg-uagc-cream-warm/50"
          : "border-gray-150 bg-white",
      )}
      data-ga4-event="blog_program_filter_click"
      data-ga4-program={program.shortName}
      data-ga4-action="learn_more"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {isRecommended && (
            <Sparkles className="size-3.5 shrink-0 text-uagc-navy" aria-hidden />
          )}
          <p className="text-[0.9375rem] font-bold leading-snug text-uagc-navy">
            {program.shortName}
          </p>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span
            className={cn(
              "inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider",
              program.type === "research"
                ? "bg-blue-50 text-blue-700"
                : "bg-amber-50 text-amber-700",
            )}
          >
            {program.type === "research" ? "Research" : "Applied"}
          </span>
          <span className="flex items-center gap-1 text-[0.75rem] text-uagc-navy/55">
            <Clock className="size-3" aria-hidden />
            {program.duration}
          </span>
        </div>
        <p className="mt-1.5 text-[0.8125rem] leading-snug text-uagc-navy/60 line-clamp-1">
          {program.bestFor}
        </p>
      </div>
      <ArrowRight
        className="size-5 shrink-0 text-uagc-navy/30 transition-transform group-active:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

/* ─── Mobile: Inline program list (no drawer, no fixed bar) ────── */

function MobileProgramFilter({
  programs,
  heading,
  recommendedId,
}: BlogProgramFilterProps) {
  const {
    typeFilter,
    setTypeFilter,
    filtered,
  } = useFilteredPrograms(programs, recommendedId);

  return (
    <div
      className="overflow-hidden rounded-xl border border-uagc-navy/40 bg-white lg:hidden"
      data-module="blog-program-filter-mobile"
    >
      {/* Header + inline filter */}
      <div className="flex items-center justify-between gap-3 border-b border-uagc-navy/20 bg-uagc-cream-warm px-4 py-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="size-5 text-uagc-navy" aria-hidden />
          <h3 className="text-[0.9375rem] font-bold text-uagc-navy">
            {heading ?? "Find Your Program"}
          </h3>
        </div>
        {/* Native select for filter — avoids chip clutter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-[0.8125rem] font-semibold text-uagc-navy focus:border-uagc-navy focus:outline-none focus:ring-2 focus:ring-uagc-navy/20"
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="research">Research</option>
            <option value="applied">Applied</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-uagc-navy/40"
            aria-hidden
          />
        </div>
      </div>

      {/* Program list — flat, single-tap rows */}
      <div className="space-y-2.5 px-3 py-3">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <MobileProgramRow
              key={p.id}
              program={p}
              isRecommended={p.id === recommendedId}
            />
          ))
        ) : (
          <div className="py-6 text-center">
            <p className="text-sm text-uagc-navy/50">No programs match this filter.</p>
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className="mt-2 text-sm font-semibold text-uagc-red underline-offset-2 hover:underline"
            >
              Show all programs
            </button>
          </div>
        )}
      </div>

      {/* Advisor CTA — compact for mobile */}
      <div className="border-t border-gray-100 px-3 py-3">
        <AdvisorHelpCTA compact />
      </div>

      {/* Footer */}
      <div className="border-t border-uagc-navy/20 bg-uagc-cream-warm px-4 py-3.5">
        <Link
          href="https://www.uagc.edu/online-degrees/doctoral"
          className="flex items-center justify-center gap-1.5 text-[0.8125rem] font-bold text-uagc-red transition-colors active:text-uagc-red/70"
          data-ga4-event="blog_program_filter_browse_all"
        >
          Browse all doctoral programs
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

/* ─── Composite Export ──────────────────────────────────────────── */

export function BlogProgramFilter(props: BlogProgramFilterProps) {
  return (
    <>
      {/* Desktop: sidebar card with expandable program details */}
      <div className="hidden lg:block">
        <DesktopProgramFilter {...props} />
      </div>

      {/* Mobile: inline flat list — no drawer, no fixed bars */}
      <MobileProgramFilter {...props} />
    </>
  );
}
