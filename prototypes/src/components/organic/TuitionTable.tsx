"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  GraduationCap,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FINANCIAL_AID_URL = "https://www.uagc.edu/tuition-financial-aid";

interface TuitionRow {
  level: string;
  perCredit: string;
  estTotal: string;
  highlight?: boolean;
  militaryRate?: boolean;
}

interface AidOption {
  icon: LucideIcon;
  title: string;
  description: string;
}

const TUITION_DATA: TuitionRow[] = [
  { level: "Associate Degree", perCredit: "$250", estTotal: "~$30,000" },
  { level: "Bachelor's Degree", perCredit: "$295", estTotal: "~$35,400" },
  {
    level: "Military (all levels)",
    perCredit: "$250",
    estTotal: "TA eligible",
    highlight: true,
    militaryRate: true,
  },
  { level: "Master's Degree", perCredit: "$485", estTotal: "~$17,460" },
  {
    level: "Doctor of Professional Studies",
    perCredit: "$700",
    estTotal: "~$42,000",
  },
];

const AID_OPTIONS: AidOption[] = [
  {
    icon: Briefcase,
    title: "Employer Tuition Benefits",
    description:
      "Many employers cover full or partial tuition. We'll help you use every dollar available.",
  },
  {
    icon: Shield,
    title: "Military Education Benefits",
    description:
      "TA eligible, MyCAA approved, and dedicated support for military-connected students.",
  },
  {
    icon: GraduationCap,
    title: "Scholarships & Federal Aid",
    description:
      "Federal Pell Grants, institutional scholarships, and state aid programs available.",
  },
];

export interface TuitionTableProps {
  id?: string;
  className?: string;
  exploreAidHref?: string;
  /** When set, "Explore All Aid Options" scrolls on-page instead of opening a URL. */
  onExploreAid?: () => void;
}

function ApplyFeeBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold text-uagc-navy",
        compact ? "text-xs" : "text-sm",
      )}
    >
      <Check className={compact ? "size-3" : "size-4"} aria-hidden />
      $0
    </span>
  );
}

export function TuitionTable({
  id = "tuition",
  className,
  exploreAidHref = FINANCIAL_AID_URL,
  onExploreAid,
}: TuitionTableProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 section-pad bg-uagc-surface lg:scroll-mt-36",
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
          {/* Left — headline + tuition table */}
          <div>
            <span aria-hidden className="mb-3 accent-bar" />
            <h2
              id={`${id}-heading`}
              className="type-h2 text-uagc-navy"
            >
              An Affordable Path Forward
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-sm">
              We&rsquo;re committed to making your degree achievable with
              support every step of the way.
            </p>

            {/* Desktop / tablet table */}
            <div className="mt-6 hidden overflow-hidden rounded-lg border border-uagc-border sm:block">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-uagc-navy">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.06em] text-white">
                      Program Level
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.06em] text-white">
                      Per Credit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.06em] text-white">
                      Est. Total
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.06em] text-white">
                      Apply
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {TUITION_DATA.map((row) => (
                    <tr
                      key={row.level}
                      className={cn(
                        "border-b border-uagc-border last:border-b-0 transition-colors duration-200",
                        row.highlight
                          ? "bg-uagc-sky/10"
                          : "hover:bg-uagc-navy/3",
                      )}
                    >
                      <td className="px-4 py-3 font-semibold text-uagc-navy">
                        {row.level}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 font-heading text-[17px] font-bold tracking-tight",
                          row.militaryRate
                            ? "text-uagc-navy"
                            : "text-uagc-navy",
                        )}
                      >
                        {row.perCredit}
                      </td>
                      <td className="px-4 py-3 text-uagc-gray">
                        {row.estTotal}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ApplyFeeBadge />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile tuition cards */}
            <div className="mt-6 space-y-3 sm:hidden">
              {TUITION_DATA.map((row) => (
                <div
                  key={row.level}
                  className={cn(
                    "rounded-lg border border-uagc-border bg-white px-4 py-3.5",
                    row.highlight && "border-uagc-navy/40 bg-uagc-sky/10",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-uagc-navy">
                        {row.level}
                      </p>
                      <p className="mt-1 text-xs text-uagc-gray">
                        <span
                          className={cn(
                            "font-bold",
                            row.                            militaryRate
                              ? "text-uagc-navy"
                              : "text-uagc-navy",
                          )}
                        >
                          {row.perCredit}
                        </span>
                        <span className="text-uagc-gray/60"> / credit</span>
                        <span className="mx-1.5 text-uagc-gray/40">·</span>
                        {row.estTotal}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-uagc-sky/10 px-2.5 py-1">
                      <ApplyFeeBadge compact />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-uagc-gray/70">
              * Totals reflect standard credit hours without transfer credits.
              Technology and materials fees not included. Military rate requires
              TA verification.
            </p>
          </div>

          {/* Right — 86% anchor + aid options */}
          <div className="lg:pt-1">
            <p
              className="type-stat text-[clamp(4rem,12vw,5rem)] text-uagc-navy"
              aria-label="86 percent"
            >
              86<span className="text-uagc-navy">%</span>
            </p>
            <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-uagc-gray">
              of UAGC students receive some form of financial assistance —
              grants, scholarships, employer benefits, or military aid.
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              {AID_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.title}
                    className="group flex items-start gap-3 rounded-2xl border border-uagc-border bg-white p-3.5 transition-[border-color,box-shadow] duration-200 hover:border-uagc-navy/40 hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-uagc-surface text-uagc-navy transition-colors duration-200 group-hover:bg-uagc-navy/10 group-hover:text-uagc-sky">
                      <Icon className="size-[15px]" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-uagc-navy">
                        {option.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-uagc-gray">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {onExploreAid ? (
              <button
                type="button"
                onClick={onExploreAid}
                className="mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-uagc-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-uagc-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
              >
                Estimate Your Cost
                <ArrowRight className="size-4" aria-hidden />
              </button>
            ) : (
              <Link
                href={exploreAidHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-uagc-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-uagc-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
              >
                Explore All Aid Options
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
