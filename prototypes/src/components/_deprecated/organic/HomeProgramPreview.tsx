"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ENRICHED_PROGRAMS,
  type DegreeLevel,
  type ProgramDetail,
} from "@/lib/program-data";
import { cn } from "@/lib/utils";

const FEATURED_NAMES = [
  "BA in Business Administration",
  "BA in Organizational Management",
  "BA in Early Childhood Education",
  "MS in Data Analytics",
  "BA in Criminal Justice",
  "MA in Education",
] as const;

/** Programs not yet in ENRICHED_PROGRAMS — aligned to live hub favorites */
const FEATURED_FALLBACK: ProgramDetail[] = [
  {
    name: "BA in Organizational Management",
    level: "Bachelor's",
    area: "business",
    description:
      "Examine the human side of managing organizations and build leadership skills for today's workplaces.",
    href: "https://www.uagc.edu/online-degrees/bachelors/organizational-management",
    credits: 120,
    duration: "As few as 3 years",
    format: "100% Online · 5- or 6-week courses",
    careerPaths: [],
    sampleCourses: [],
  },
  {
    name: "BA in Early Childhood Education",
    level: "Bachelor's",
    area: "education",
    description:
      "Amplify your impact in early learning with curriculum design and child development foundations.",
    href: "https://www.uagc.edu/online-degrees/bachelors/early-childhood-education",
    credits: 120,
    duration: "As few as 3 years",
    format: "100% Online · 5- or 6-week courses",
    careerPaths: [],
    sampleCourses: [],
  },
  {
    name: "MS in Data Analytics",
    level: "Master's",
    area: "information-technology",
    description:
      "Turn data into decisions with graduate training in analytics, visualization, and business intelligence.",
    href: "https://www.uagc.edu/online-degrees/masters/data-analytics",
    credits: 36,
    duration: "As few as 15 months",
    format: "100% Online · 6-week courses",
    careerPaths: [],
    sampleCourses: [],
  },
];

const AREA_OPTIONS = [
  { value: "all", label: "All Areas" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "information-technology", label: "Information Technology" },
  { value: "criminal-justice", label: "Criminal Justice" },
] as const;

type AreaFilter = (typeof AREA_OPTIONS)[number]["value"];

function resolveFeaturedPrograms(): ProgramDetail[] {
  const byName = new Map(
    [...ENRICHED_PROGRAMS, ...FEATURED_FALLBACK].map((p) => [p.name, p]),
  );
  return FEATURED_NAMES.map((name) => byName.get(name)).filter(
    (p): p is ProgramDetail => p !== undefined,
  );
}

const FEATURED_PROGRAMS = resolveFeaturedPrograms();

function levelLabel(level: DegreeLevel): string {
  switch (level) {
    case "Associate's":
      return "Associate";
    case "Bachelor's":
      return "Bachelor's";
    case "Master's":
      return "Master's";
    case "Doctoral":
      return "Doctoral";
    default:
      return level;
  }
}

function levelBadgeStyles(level: DegreeLevel): string {
  if (level === "Master's") {
    return "bg-uagc-red/10 text-uagc-red";
  }
  if (level === "Doctoral") {
    return "bg-uagc-gold/15 text-uagc-navy";
  }
  return "bg-uagc-navy/8 text-uagc-navy";
}

function matchesArea(program: ProgramDetail, filter: AreaFilter): boolean {
  if (filter === "all") return true;
  if (filter === "business") {
    return program.area === "business" || program.area === "accounting-finance";
  }
  return program.area === filter;
}

export function HomeProgramPreview() {
  const [areaFilter, setAreaFilter] = useState<AreaFilter>("all");

  const visiblePrograms = useMemo(
    () => FEATURED_PROGRAMS.filter((p) => matchesArea(p, areaFilter)),
    [areaFilter],
  );

  return (
    <section
      id="programs"
      className="scroll-mt-24 section-pad"
      aria-labelledby="home-program-preview-heading"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <h2
          id="home-program-preview-heading"
          className="text-center font-heading-condensed text-[clamp(2rem,4vw,2.75rem)] font-extrabold uppercase leading-tight tracking-tight text-uagc-navy"
        >
          Popular Programs
        </h2>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="home-program-area-filter" className="sr-only">
            Filter by area of interest
          </label>
          <select
            id="home-program-area-filter"
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value as AreaFilter)}
            className="min-h-11 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-uagc-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:max-w-xs"
          >
            {AREA_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePrograms.map((program) => (
            <li
              key={program.name}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start gap-2">
                <h3 className="flex-1 text-[0.9375rem] font-bold leading-snug text-uagc-navy sm:text-base">
                  {program.name}
                </h3>
                <span
                  className={cn(
                    "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                    levelBadgeStyles(program.level),
                  )}
                >
                  {levelLabel(program.level)}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-uagc-gray">
                {program.description}
              </p>
              <Link
                href={program.href}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-uagc-navy underline-offset-2 hover:text-uagc-red hover:underline"
              >
                Learn More
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        {visiblePrograms.length === 0 && (
          <p className="mt-6 text-center text-sm text-uagc-gray">
            No programs in this area. Try another filter or view the full catalog.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/organic/online-degrees"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-uagc-navy px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors duration-200 hover:bg-uagc-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
          >
            View All 50+ Programs
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
