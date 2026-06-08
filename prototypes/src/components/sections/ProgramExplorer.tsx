"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Briefcase,
  Calculator,
  ChevronDown,
  Clock,
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Monitor,
  Scale,
  Search,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ENRICHED_PROGRAMS,
  type DegreeLevel,
  type ProgramDetail,
} from "@/lib/program-data";

/* ------------------------------------------------------------------ */
/*  Re-exports for backward compatibility                              */
/* ------------------------------------------------------------------ */

export type ExplorerProgram = ProgramDetail;

export interface ProgramExplorerProps {
  heading?: string;
  programs?: ProgramDetail[];
  compact?: boolean;
  showTransferCallout?: boolean;
  ctaTarget?: string;
  className?: string;
  onProgramSelect?: (program: ProgramDetail) => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DEGREE_LEVELS: DegreeLevel[] = [
  "Associate's",
  "Bachelor's",
  "Master's",
  "Doctoral",
];

const LEVEL_COLORS: Record<string, string> = {
  "Associate's": "bg-uagc-navy/8 text-uagc-navy",
  "Bachelor's": "bg-uagc-gold/15 text-uagc-navy",
  "Master's": "bg-uagc-red/10 text-uagc-red",
  Doctoral: "bg-uagc-red/10 text-uagc-red",
};

function levelAbbr(level: string): string {
  switch (level) {
    case "Associate's":
      return "AA";
    case "Bachelor's":
      return "BA/BS";
    case "Master's":
      return "MA/MS";
    case "Doctoral":
      return "PhD";
    default:
      return level;
  }
}

interface AreaMeta {
  id: string;
  label: string;
  icon: LucideIcon;
}

const AREAS: AreaMeta[] = [
  { id: "business", label: "Business", icon: Briefcase },
  { id: "accounting-finance", label: "Accounting & Finance", icon: Calculator },
  { id: "criminal-justice", label: "Criminal Justice", icon: Scale },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "health-care", label: "Health Care", icon: HeartPulse },
  { id: "information-technology", label: "Information Technology", icon: Monitor },
  { id: "liberal-arts", label: "Liberal Arts", icon: BookOpen },
  { id: "social-behavioral", label: "Social & Behavioral Science", icon: Users },
];

/* ------------------------------------------------------------------ */
/*  Expanded Detail Panel                                              */
/* ------------------------------------------------------------------ */

function ProgramDetailPanel({ program }: { program: ProgramDetail }) {
  return (
    <div className="border-t border-uagc-border bg-white px-5 pb-5 pt-4 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-3">
        {/* Quick Facts */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
            <Clock className="size-3.5" aria-hidden />
            Quick Facts
          </h4>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-xs font-medium text-uagc-gray/60">Credits</dt>
              <dd className="font-semibold text-uagc-navy">{program.credits}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-uagc-gray/60">Duration</dt>
              <dd className="font-semibold text-uagc-navy">{program.duration}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-uagc-gray/60">Format</dt>
              <dd className="font-semibold text-uagc-navy">{program.format}</dd>
            </div>
            {program.accreditations && program.accreditations.length > 0 && (
              <div>
                <dt className="text-xs font-medium text-uagc-gray/60">Accreditation</dt>
                <dd className="space-y-0.5">
                  {program.accreditations.map((a) => (
                    <span
                      key={a}
                      className="block text-xs font-semibold text-uagc-navy"
                    >
                      {a}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {program.certPrep && (
              <div>
                <dt className="text-xs font-medium text-uagc-gray/60">
                  Certification Prep
                </dt>
                <dd className="text-xs font-semibold text-uagc-navy">
                  {program.certPrep}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Career Paths */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
            <TrendingUp className="size-3.5" aria-hidden />
            Career Paths
          </h4>
          <ul className="space-y-2">
            {program.careerPaths.map((career) => (
              <li key={career.title} className="text-sm">
                <span className="font-semibold text-uagc-navy">
                  {career.title}
                </span>
                <span className="ml-1.5 text-xs font-medium text-uagc-gray/70">
                  {career.salaryRange}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[10px] leading-tight text-uagc-gray/50">
            Salary ranges are national medians and vary by location and experience.
          </p>
        </div>

        {/* Sample Courses */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
            <BookOpen className="size-3.5" aria-hidden />
            Sample Courses
          </h4>
          <ul className="space-y-1.5">
            {program.sampleCourses.map((course) => (
              <li
                key={course}
                className="flex items-start gap-2 text-sm text-uagc-navy"
              >
                <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-uagc-red/40" />
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom action row */}
      <div className="mt-5 flex flex-col gap-3 border-t border-uagc-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`https://www.uagc.edu${program.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-uagc-red transition-colors hover:text-uagc-navy"
        >
          View Full Program Details
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
        <div className="flex items-center gap-2 text-xs text-uagc-gray">
          <span>$0 application fee</span>
          <span aria-hidden>·</span>
          <span>No obligation to enroll</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Program Row                                                        */
/* ------------------------------------------------------------------ */

function ProgramRow({
  program,
  areaFilter,
  compact,
  isExpanded,
  onToggle,
}: {
  program: ProgramDetail;
  areaFilter: string;
  compact: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const areaMeta = AREAS.find((a) => a.id === program.area);

  return (
    <div className={cn("transition-colors", isExpanded && "bg-white")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full cursor-pointer flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-white sm:flex-row sm:items-start sm:gap-6 sm:py-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-[0.9375rem] font-semibold leading-snug text-uagc-navy sm:text-base">
              {program.name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold leading-none",
                LEVEL_COLORS[program.level] ?? "bg-gray-100 text-gray-600",
              )}
            >
              {levelAbbr(program.level)}
            </span>
            {areaFilter === "all" && areaMeta && (
              <span className="hidden text-[11px] font-medium text-uagc-gray/60 sm:inline">
                {areaMeta.label}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-uagc-gray">
            {program.description}
          </p>
          {!compact && program.focusAreas && program.focusAreas.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {program.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-md bg-uagc-navy/[0.04] px-2 py-0.5 text-[11px] font-medium text-uagc-navy/70"
                >
                  {area}
                </span>
              ))}
            </div>
          )}

          {/* Inline quick stats when collapsed */}
          {!isExpanded && (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-uagc-gray/60">
              <span>{program.credits} credits</span>
              <span aria-hidden>·</span>
              <span>{program.duration}</span>
              <span aria-hidden>·</span>
              <span>
                {program.careerPaths.length} career path
                {program.careerPaths.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:self-center">
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              isExpanded ? "text-uagc-navy" : "text-uagc-red",
            )}
          >
            {isExpanded ? "Less" : "Details"}
          </span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              isExpanded ? "rotate-180 text-uagc-navy" : "text-uagc-red",
            )}
            aria-hidden
          />
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && <ProgramDetailPanel program={program} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ProgramExplorer({
  heading = "Discover the Program That\u2019s Right for You",
  programs = ENRICHED_PROGRAMS,
  compact = false,
  showTransferCallout: _showTransferCallout = false,
  ctaTarget: _ctaTarget = "#rfi",
  className,
  onProgramSelect,
}: ProgramExplorerProps) {
  const MOBILE_INITIAL_COUNT = 6;
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const resetScroll = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setShowAllMobile(false);
  }, [areaFilter, levelFilter, query]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return programs.filter((p) => {
      if (areaFilter !== "all" && p.area !== areaFilter) return false;
      if (levelFilter !== "all" && p.level !== levelFilter) return false;
      if (q) {
        const haystack =
          `${p.name} ${p.description} ${(p.focusAreas ?? []).join(" ")} ${p.careerPaths.map((c) => c.title).join(" ")} ${p.sampleCourses.join(" ")}`.toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [programs, query, areaFilter, levelFilter]);

  const levelCounts = useMemo(() => {
    const base = programs.filter(
      (p) => areaFilter === "all" || p.area === areaFilter,
    );
    const counts: Record<string, number> = {};
    for (const level of DEGREE_LEVELS) {
      counts[level] = base.filter((p) => p.level === level).length;
    }
    return counts;
  }, [programs, areaFilter]);

  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of AREAS) {
      counts[a.id] = programs.filter((p) => p.area === a.id).length;
    }
    return counts;
  }, [programs]);

  const handleToggle = useCallback((program: ProgramDetail) => {
    if (onProgramSelect) {
      onProgramSelect(program);
    } else {
      setExpandedProgram((prev) => (prev === program.name ? null : program.name));
    }
  }, [onProgramSelect]);

  return (
    <section
      id="programs"
      className={cn("section-pad bg-white", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-5 sm:mb-6">
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          <p className="mt-2 text-base text-uagc-gray sm:text-lg">
            {programs.length}+ programs across {AREAS.length} areas of study
            &mdash; click any program for career paths, courses, and details.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-uagc-gray/50"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search by program name, career, course, or topic\u2026"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpandedProgram(null);
              resetScroll();
            }}
            className="w-full rounded-lg border border-uagc-border bg-white py-3 pr-4 pl-10 text-sm text-uagc-navy outline-none placeholder:text-uagc-gray/50 focus:border-uagc-gold focus:ring-1 focus:ring-uagc-gold"
          />
        </div>

        {/* Area filter — dropdown on mobile, pills on desktop */}
        <div className="sm:hidden">
          <label htmlFor="area-filter-mobile" className="sr-only">
            Filter by area of interest
          </label>
          <select
            id="area-filter-mobile"
            value={areaFilter}
            onChange={(e) => {
              setAreaFilter(e.target.value);
              setExpandedProgram(null);
              setShowAllMobile(false);
            }}
            className="w-full min-h-[44px] rounded-lg border border-uagc-border bg-white px-3 py-2.5 text-sm font-semibold text-uagc-navy focus:border-uagc-gold focus:outline-none focus:ring-1 focus:ring-uagc-gold"
          >
            <option value="all">All Areas ({programs.length})</option>
            {AREAS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label} ({areaCounts[a.id] ?? 0})
              </option>
            ))}
          </select>
        </div>

        <div
          role="radiogroup"
          aria-label="Filter by area of interest"
          className="hidden sm:flex sm:flex-wrap sm:gap-2"
        >
          <button
            type="button"
            role="radio"
            aria-checked={areaFilter === "all"}
            onClick={() => {
              setAreaFilter("all");
              setExpandedProgram(null);
            }}
            className={cn(
              "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200",
              areaFilter === "all"
                ? "bg-uagc-navy text-white shadow-sm"
                : "bg-white text-uagc-navy ring-1 ring-inset ring-uagc-navy/10 hover:bg-uagc-red/[0.04] hover:text-uagc-red hover:ring-uagc-red/20",
            )}
          >
            All Areas
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-[11px] font-bold leading-none",
                areaFilter === "all"
                  ? "bg-white/20 text-white"
                  : "bg-uagc-navy/[0.06] text-uagc-navy/60",
              )}
            >
              {programs.length}
            </span>
          </button>
          {AREAS.map((a) => {
            const Icon = a.icon;
            const isActive = areaFilter === a.id;
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => {
                  setAreaFilter(a.id);
                  setExpandedProgram(null);
                }}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-uagc-navy text-white shadow-sm"
                    : "bg-white text-uagc-navy ring-1 ring-inset ring-uagc-navy/10 hover:bg-uagc-red/[0.04] hover:text-uagc-red hover:ring-uagc-red/20",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                {a.label}
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-[11px] font-bold leading-none",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-uagc-navy/[0.06] text-uagc-navy/60",
                  )}
                >
                  {areaCounts[a.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Degree-level chips (hidden in compact) */}
        {!compact && (
          <div
            role="radiogroup"
            aria-label="Filter by degree level"
            className="mt-3 flex flex-wrap gap-2"
          >
            <button
              type="button"
              role="radio"
              aria-checked={levelFilter === "all"}
              onClick={() => {
                setLevelFilter("all");
                setExpandedProgram(null);
                resetScroll();
              }}
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-2.5 text-xs font-semibold transition-all duration-200",
                levelFilter === "all"
                  ? "bg-uagc-gold text-uagc-navy"
                  : "bg-white text-uagc-navy ring-1 ring-inset ring-uagc-navy/10 hover:ring-uagc-red/20 hover:text-uagc-red",
              )}
            >
              All Levels
            </button>
            {DEGREE_LEVELS.map((level) => {
              const isActive = levelFilter === level;
              const count = levelCounts[level] ?? 0;
              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => {
                    setLevelFilter(level);
                    setExpandedProgram(null);
                    resetScroll();
                  }}
                  className={cn(
                    "cursor-pointer rounded-full px-3.5 py-2.5 text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-uagc-gold text-uagc-navy"
                      : "bg-white text-uagc-navy ring-1 ring-inset ring-uagc-navy/10 hover:ring-uagc-red/20 hover:text-uagc-red",
                  )}
                >
                  {level}
                  <span className="ml-1 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        <p className="mt-4 text-sm text-uagc-gray" aria-live="polite">
          Showing {filtered.length} program{filtered.length === 1 ? "" : "s"}
          {areaFilter !== "all" &&
            ` in ${AREAS.find((a) => a.id === areaFilter)?.label}`}
          {levelFilter !== "all" && ` · ${levelFilter}`}
          {query && ` · matching "${query}"`}
        </p>

        {/* Program list — desktop: scrollable container; mobile: flat list with "Show more" */}
        <div
          ref={contentRef}
          className={cn(
            "mt-3 divide-y divide-uagc-border rounded-xl border border-uagc-border bg-white",
            "sm:overflow-y-auto",
            compact ? "sm:max-h-[500px]" : "sm:max-h-[640px]",
          )}
        >
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-base font-medium text-uagc-navy">
                No programs match your search.
              </p>
              <p className="mt-1 text-sm text-uagc-gray">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}

          {filtered.map((program, idx) => {
            const hiddenOnMobile = !showAllMobile && idx >= MOBILE_INITIAL_COUNT;
            return (
              <div
                key={program.name}
                className={cn(hiddenOnMobile && "hidden sm:block")}
              >
                <ProgramRow
                  program={program}
                  areaFilter={areaFilter}
                  compact={compact}
                  isExpanded={!onProgramSelect && expandedProgram === program.name}
                  onToggle={() => handleToggle(program)}
                />
              </div>
            );
          })}
        </div>

        {/* "Show more" button — mobile only */}
        {!showAllMobile && filtered.length > MOBILE_INITIAL_COUNT && (
          <button
            type="button"
            onClick={() => setShowAllMobile(true)}
            className="mt-3 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-uagc-border bg-white py-3 text-sm font-semibold text-uagc-navy transition-colors hover:bg-uagc-navy/5 sm:hidden"
          >
            Show All {filtered.length} Programs
            <ChevronDown className="size-4" aria-hidden />
          </button>
        )}

        {/* Bottom info bar */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm font-medium text-uagc-navy">
            {programs.length}+ programs &middot; All WSCUC accredited &middot; $0
            application fee &middot; No obligation
          </p>
          <p className="text-xs text-uagc-gray">
            Click any program above for career paths, salary data, and course
            details.
          </p>
        </div>
      </div>
    </section>
  );
}

export { ENRICHED_PROGRAMS as DEFAULT_PROGRAMS };
