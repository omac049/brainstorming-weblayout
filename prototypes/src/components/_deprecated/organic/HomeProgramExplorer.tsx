"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import { ENRICHED_PROGRAMS, type DegreeLevel } from "@/lib/program-data";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 6;

type LevelFilter = "all" | "undergraduate" | "graduate" | "doctoral";

const LEVEL_FILTERS: { value: LevelFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "doctoral", label: "Doctoral" },
];

const AREA_FILTERS = [
  { value: "all", label: "All Areas" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "health-care", label: "Health Care" },
  { value: "information-technology", label: "IT" },
  { value: "criminal-justice", label: "Criminal Justice" },
  { value: "liberal-arts", label: "Liberal Arts" },
  { value: "social-behavioral", label: "Social Sciences" },
] as const;

type AreaFilter = (typeof AREA_FILTERS)[number]["value"];

function matchesLevelFilter(level: DegreeLevel, filter: LevelFilter): boolean {
  if (filter === "all") return true;
  if (filter === "undergraduate") {
    return level === "Associate's" || level === "Bachelor's";
  }
  if (filter === "graduate") return level === "Master's";
  return level === "Doctoral";
}

function matchesAreaFilter(area: string, filter: AreaFilter): boolean {
  if (filter === "all") return true;
  if (filter === "business") {
    return area === "business" || area === "accounting-finance";
  }
  return area === filter;
}

function levelBadgeStyles(level: DegreeLevel): string {
  if (level === "Master's") {
    return "bg-uagc-red text-white";
  }
  if (level === "Doctoral") {
    return "bg-uagc-gold text-uagc-navy";
  }
  return "bg-uagc-navy text-white";
}

function levelChipStyles(filter: LevelFilter, isActive: boolean): string {
  if (!isActive) {
    return "border-gray-200 bg-white text-uagc-navy hover:border-gray-300";
  }
  switch (filter) {
    case "undergraduate":
      return "border-uagc-navy bg-uagc-navy text-white";
    case "graduate":
      return "border-uagc-red bg-uagc-red text-white";
    case "doctoral":
      return "border-uagc-gold bg-uagc-gold text-uagc-navy";
    default:
      return "border-uagc-navy bg-uagc-navy text-white";
  }
}

export function HomeProgramExplorer() {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [areaFilter, setAreaFilter] = useState<AreaFilter>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredPrograms = useMemo(() => {
    return ENRICHED_PROGRAMS.filter(
      (program) =>
        matchesLevelFilter(program.level, levelFilter) &&
        matchesAreaFilter(program.area, areaFilter),
    );
  }, [levelFilter, areaFilter]);

  const visiblePrograms = showAll
    ? filteredPrograms
    : filteredPrograms.slice(0, INITIAL_VISIBLE);

  const handleLevelChange = (value: LevelFilter) => {
    setLevelFilter(value);
    setShowAll(false);
  };

  const handleAreaChange = (value: AreaFilter) => {
    setAreaFilter(value);
    setShowAll(false);
  };

  return (
    <section
      id="programs"
      className="scroll-mt-24 section-pad"
      aria-labelledby="home-program-explorer-heading"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <h2
          id="home-program-explorer-heading"
          className="text-center font-heading-condensed text-[clamp(2rem,4vw,2.75rem)] font-extrabold uppercase leading-tight tracking-tight text-uagc-navy"
        >
          Find Your Program
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-center text-sm leading-relaxed text-uagc-gray sm:text-base">
          Filter by interest or degree level. 50+ programs, all 100% online.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-uagc-navy sm:text-left">
              Degree Level
            </p>
            <div
              className="flex flex-wrap justify-center gap-2 sm:justify-start"
              role="group"
              aria-label="Filter by degree level"
            >
              {LEVEL_FILTERS.map(({ value, label }) => {
                const isActive = levelFilter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleLevelChange(value)}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-[border-color,background-color,color] duration-200",
                      levelChipStyles(value, isActive),
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-uagc-navy sm:text-left">
              Area of Interest
            </p>

            <label className="block sm:hidden">
              <span className="sr-only">Filter by area of interest</span>
              <select
                value={areaFilter}
                onChange={(event) =>
                  handleAreaChange(event.target.value as AreaFilter)
                }
                className="min-h-11 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-uagc-navy"
              >
                {AREA_FILTERS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div
              className="hidden flex-wrap gap-2 sm:flex"
              role="group"
              aria-label="Filter by area of interest"
            >
              {AREA_FILTERS.map(({ value, label }) => {
                const isActive = areaFilter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleAreaChange(value)}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-[border-color,background-color,color] duration-200",
                      isActive
                        ? "border-uagc-navy bg-uagc-navy text-white"
                        : "border-gray-200 bg-white text-uagc-navy hover:border-gray-300",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {visiblePrograms.length > 0 ? (
            visiblePrograms.map((program) => (
              <Link
                key={program.href}
                href={`https://www.uagc.edu${program.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
              >
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-[0.9375rem] font-bold leading-snug text-uagc-navy group-hover:text-uagc-red sm:text-base">
                    {program.name}
                  </span>
                  <span
                    className={cn(
                      "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide",
                      levelBadgeStyles(program.level),
                    )}
                  >
                    {program.level}
                  </span>
                </div>
                <ArrowRight
                  className="size-4 shrink-0 text-gray-300 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-uagc-red"
                  aria-hidden
                />
              </Link>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-sm text-uagc-gray">
              No programs match your filters. Try adjusting your selections.
            </p>
          )}
        </div>

        {!showAll && filteredPrograms.length > INITIAL_VISIBLE && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border-2 border-uagc-navy px-6 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors duration-200 hover:bg-uagc-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
            >
              Show All {filteredPrograms.length} Programs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
