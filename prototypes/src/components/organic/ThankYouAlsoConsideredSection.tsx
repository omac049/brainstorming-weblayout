"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RelatedProgram {
  degreeType: string;
  name: string;
  href: string;
  reason: string;
}

type ProgramKey = string;

const ALSO_CONSIDERED: Record<ProgramKey, RelatedProgram[]> = {
  "Bachelor of Arts in Business Administration": [
    {
      degreeType: "Associate",
      name: "Business",
      href: "/organic/online-degrees",
      reason: "Fastest path to a credential — stackable into the BA",
    },
    {
      degreeType: "Bachelor of Arts",
      name: "Healthcare Administration",
      href: "/organic/online-degrees",
      reason: "Same leadership core, applied to the fastest-growing sector",
    },
    {
      degreeType: "Bachelor of Arts",
      name: "Leadership",
      href: "/organic/online-degrees",
      reason: "Broader management focus for cross-industry career flexibility",
    },
  ],
};

const DEFAULT_KEY = "Bachelor of Arts in Business Administration";

function normalizeProgram(program: string | null): ProgramKey {
  if (!program) return DEFAULT_KEY;
  const lower = program.toLowerCase();
  for (const key of Object.keys(ALSO_CONSIDERED)) {
    if (key.toLowerCase() === lower) return key;
    if (lower.includes("business") && key.includes("Business")) return key;
  }
  return DEFAULT_KEY;
}

export interface ThankYouAlsoConsideredSectionProps {
  program?: string | null;
  className?: string;
}

export function ThankYouAlsoConsideredSection({
  program,
  className,
}: ThankYouAlsoConsideredSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const key = normalizeProgram(program ?? null);
  const programs = ALSO_CONSIDERED[key];

  if (!programs) return null;

  return (
    <section
      ref={ref}
      id="also-considered"
      aria-labelledby="also-considered-heading"
      className={cn(
        "scroll-mt-32 border-t border-uagc-border bg-uagc-surface py-10 sm:py-16",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-6">
        <div
          className={cn(
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-uagc-navy/8">
              <Users className="size-4 text-uagc-navy" strokeWidth={1.75} aria-hidden />
            </span>
            <h2
              id="also-considered-heading"
              className="text-lg font-bold text-uagc-navy sm:text-xl"
            >
              Programs Other Students Also Considered
            </h2>
          </div>
          <p className="mt-2 max-w-lg text-[0.875rem] leading-relaxed text-uagc-gray sm:text-[0.9375rem]">
            Students interested in your program often explore these related
            degrees before deciding.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {programs.map((prog, index) => (
            <Link
              key={prog.name}
              href={prog.href}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-uagc-border bg-white",
                "px-5 py-5 sm:px-5 sm:py-6",
                "transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
                "reveal-section",
                `stagger-${index + 1}`,
                isVisible && "is-visible",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.75 origin-left scale-x-0 bg-uagc-gold transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-uagc-gold">
                {prog.degreeType}
              </span>
              <h3 className="mt-1.5 text-base font-bold text-uagc-navy sm:text-[1.0625rem]">
                {prog.name}
              </h3>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-uagc-gray">
                {prog.reason}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-uagc-navy/70 transition-colors duration-150 group-hover:text-uagc-navy">
                Explore
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
