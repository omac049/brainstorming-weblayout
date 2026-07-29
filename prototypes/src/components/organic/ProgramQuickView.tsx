"use client";

import { useEffect, useRef } from "react";
import { X, ArrowRight, Clock, TrendingUp, BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramDetail } from "@/lib/program-data";

export interface ProgramQuickViewProps {
  program: ProgramDetail | null;
  onClose: () => void;
  onRequestInfo?: (areaOfInterest: string) => void;
}

export function ProgramQuickView({
  program,
  onClose,
  onRequestInfo,
}: ProgramQuickViewProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!program) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [program, onClose]);

  if (!program) return null;

  return (
    <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label={program.name}>
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cn(
          "absolute bg-white shadow-2xl overflow-y-auto",
          "inset-x-0 bottom-0 top-[12svh] max-h-[88svh] rounded-t-2xl",
          "lg:inset-y-0 lg:top-0 lg:max-h-none lg:left-auto lg:right-0 lg:w-[480px] lg:rounded-none xl:w-[520px]",
        )}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-uagc-border bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-uagc-red">
              {program.level}
            </p>
            <h2 className="mt-1 font-heading text-lg font-semibold leading-snug text-uagc-navy sm:text-xl">
              {program.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-uagc-gray transition-colors hover:bg-uagc-surface hover:text-uagc-navy"
            aria-label="Close program details"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-uagc-gray">
            {program.description}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-uagc-surface p-3 text-center">
              <Clock className="mx-auto size-4 text-uagc-navy/60" aria-hidden />
              <p className="mt-1.5 text-lg font-bold text-uagc-navy">{program.credits}</p>
              <p className="type-micro text-uagc-gray">Credits</p>
            </div>
            <div className="rounded-lg bg-uagc-surface p-3 text-center">
              <BookOpen className="mx-auto size-4 text-uagc-navy/60" aria-hidden />
              <p className="mt-1.5 text-sm font-bold text-uagc-navy">{program.duration}</p>
              <p className="type-micro text-uagc-gray">Est. Time</p>
            </div>
            <div className="rounded-lg bg-uagc-surface p-3 text-center">
              <TrendingUp className="mx-auto size-4 text-uagc-navy/60" aria-hidden />
              <p className="mt-1.5 text-lg font-bold text-uagc-navy">
                {program.level.includes("Master") || program.level.includes("Doctoral") ? "$625" : "$485"}
              </p>
              <p className="type-micro text-uagc-gray">Per Credit</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
              <TrendingUp className="size-3.5" aria-hidden />
              Top Career Paths
            </h3>
            <ul className="mt-3 space-y-2.5">
              {program.careerPaths.slice(0, 3).map((career) => (
                <li
                  key={career.title}
                  className="flex items-center justify-between rounded-lg border border-uagc-border px-3.5 py-2.5"
                >
                  <span className="text-sm font-semibold text-uagc-navy">
                    {career.title}
                  </span>
                  <span className="text-xs font-medium text-uagc-gray">
                    {career.salaryRange}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-uagc-gray/50">
              Salary ranges are national medians from BLS and vary by location.
            </p>
          </div>

          {program.sampleCourses.length > 0 && (
            <div className="mt-6">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
                <BookOpen className="size-3.5" aria-hidden />
                Sample Courses
              </h3>
              <ul className="mt-3 space-y-1.5">
                {program.sampleCourses.slice(0, 4).map((course) => (
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
          )}
        </div>

        <div className="sticky bottom-0 border-t border-uagc-border bg-white px-5 py-4 safe-area-bottom sm:px-6">
          <button
            type="button"
            onClick={() => onRequestInfo?.(program.area)}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-uagc-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-uagc-red/90 focus-visible:ring-2 focus-visible:ring-uagc-navy focus-visible:ring-offset-2"
          >
            Request Info for This Program
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <a
            href={`https://www.uagc.edu${program.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-uagc-red transition-colors hover:text-uagc-navy"
          >
            View Full Program Details
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
