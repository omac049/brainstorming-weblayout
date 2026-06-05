"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AREA_OPTIONS,
  COLLEGE_OPTIONS,
  DEGREE_LEVEL_OPTIONS,
  HUB_CATALOG,
  getCollegeForProgram,
  getCollegeLabel,
} from "@/lib/organic-online-degrees-data";
import { ENRICHED_PROGRAMS } from "@/lib/program-data";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 6;

export interface ProgramCatalogSectionProps {
  className?: string;
}

export function ProgramCatalogSection({ className }: ProgramCatalogSectionProps) {
  const [degreeLevel, setDegreeLevel] = useState("all");
  const [area, setArea] = useState("all");
  const [college, setCollege] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredPrograms = useMemo(() => {
    return ENRICHED_PROGRAMS.filter((program) => {
      if (degreeLevel !== "all" && program.level !== degreeLevel) return false;
      if (area !== "all" && program.area !== area) return false;
      if (college !== "all" && getCollegeForProgram(program.name) !== college) {
        return false;
      }
      return true;
    });
  }, [degreeLevel, area, college]);

  const visiblePrograms = showAll
    ? filteredPrograms
    : filteredPrograms.slice(0, INITIAL_VISIBLE);

  const handleFilterChange = () => {
    setShowAll(false);
  };

  return (
    <section
      id="programs"
      className={cn("scroll-mt-20 section-pad bg-white", className)}
      aria-labelledby="hub-catalog-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="hub-catalog-heading" className="type-h2 text-uagc-navy">
            {HUB_CATALOG.heading}
          </h2>
          <p className="mt-3 text-sm text-uagc-gray sm:text-base">
            {HUB_CATALOG.subheading}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-uagc-navy">
            {HUB_CATALOG.programCountCopy}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-uagc-navy">
              Degree Level
            </span>
            <select
              value={degreeLevel}
              onChange={(event) => {
                setDegreeLevel(event.target.value);
                handleFilterChange();
              }}
              className="min-h-11 rounded-lg border border-uagc-border bg-white px-3 text-sm text-uagc-dark"
            >
              {DEGREE_LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-uagc-navy">
              Area of Interest
            </span>
            <select
              value={area}
              onChange={(event) => {
                setArea(event.target.value);
                handleFilterChange();
              }}
              className="min-h-11 rounded-lg border border-uagc-border bg-white px-3 text-sm text-uagc-dark"
            >
              {AREA_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-uagc-navy">
              College
            </span>
            <select
              value={college}
              onChange={(event) => {
                setCollege(event.target.value);
                handleFilterChange();
              }}
              className="min-h-11 rounded-lg border border-uagc-border bg-white px-3 text-sm text-uagc-dark"
            >
              {COLLEGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-sm text-uagc-gray">
          Showing {visiblePrograms.length} of {filteredPrograms.length} programs
        </p>

        <ul className="mt-6 divide-y divide-uagc-border border-y border-uagc-border">
          {visiblePrograms.map((program) => (
            <li key={program.href} className="py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-uagc-navy">{program.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-uagc-gray">
                    {getCollegeLabel(getCollegeForProgram(program.name))}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-uagc-gray">
                    {program.description}
                  </p>
                </div>
                <Link
                  href={`https://www.uagc.edu${program.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-uagc-navy underline-offset-2 hover:text-uagc-red hover:underline"
                >
                  View Details
                  <ExternalLink className="size-4" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {filteredPrograms.length === 0 && (
          <p className="mt-6 text-center text-sm text-uagc-gray">
            No programs match your filters. Try adjusting your selections.
          </p>
        )}

        {!showAll && filteredPrograms.length > INITIAL_VISIBLE && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-uagc-navy px-6 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-uagc-navy hover:text-white"
            >
              Show all programs ({filteredPrograms.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
