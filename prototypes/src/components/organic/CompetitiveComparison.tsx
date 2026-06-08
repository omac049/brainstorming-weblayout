"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  dimension: string;
  uagc: string;
  typicalOnline: string;
  communityCollege: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: "Tuition",
    uagc: "$485/credit",
    typicalOnline: "$600–$700/credit",
    communityCollege: "$150–$300/credit (limited online)",
  },
  {
    dimension: "Course Format",
    uagc: "1 class at a time, 5 weeks",
    typicalOnline: "3–4 classes simultaneously, 8–16 weeks",
    communityCollege: "Fixed semester schedule",
  },
  {
    dimension: "Transfer Credits",
    uagc: "Up to 75% accepted",
    typicalOnline: "Varies, often capped at 50%",
    communityCollege: "Limited prior learning assessment",
  },
  {
    dimension: "Entrance Exams",
    uagc: "None required",
    typicalOnline: "SAT/GRE may be required",
    communityCollege: "Placement tests common",
  },
  {
    dimension: "Accreditation",
    uagc: "WSCUC + University of Arizona",
    typicalOnline: "Varies",
    communityCollege: "Regional",
  },
];

export interface CompetitiveComparisonProps {
  id?: string;
  className?: string;
}

function MobileCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const row = COMPARISON_DATA[activeIndex];

  return (
    <div className="lg:hidden">
      <div className="relative overflow-hidden rounded-xl border border-uagc-border bg-white p-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
          {row.dimension}
        </p>

        <div key={activeIndex} className="mt-3 space-y-3 transition-opacity duration-200">
          <div className="rounded-lg border-l-4 border-uagc-gold bg-uagc-gold/[0.06] p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-uagc-gold">UAGC</p>
            <p className="mt-1 text-base font-bold text-uagc-navy">{row.uagc}</p>
          </div>
          <div className="rounded-lg bg-uagc-surface p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-uagc-gray/60">
              Typical Online School
            </p>
            <p className="mt-1 text-sm text-uagc-gray">{row.typicalOnline}</p>
          </div>
          <div className="rounded-lg bg-uagc-surface p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-uagc-gray/60">
              Community College
            </p>
            <p className="mt-1 text-sm text-uagc-gray">{row.communityCollege}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-uagc-border text-uagc-navy transition-colors duration-200 hover:bg-uagc-surface disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous comparison"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {COMPARISON_DATA.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "size-2 cursor-pointer rounded-full transition-colors duration-200",
                  i === activeIndex ? "bg-uagc-gold" : "bg-uagc-border hover:bg-uagc-gold/40",
                )}
                aria-label={`Go to comparison ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((i) => Math.min(COMPARISON_DATA.length - 1, i + 1))
            }
            disabled={activeIndex === COMPARISON_DATA.length - 1}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-uagc-border text-uagc-navy transition-colors duration-200 hover:bg-uagc-surface disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next comparison"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DesktopTable() {
  return (
    <div className="hidden lg:block">
      <div className="overflow-hidden rounded-xl border border-uagc-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-uagc-surface">
              <th className="w-[18%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
                &nbsp;
              </th>
              <th className="w-[28%] border-l-4 border-uagc-gold bg-uagc-gold/[0.06] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-navy">
                UAGC
              </th>
              <th className="w-[27%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
                Typical Online School
              </th>
              <th className="w-[27%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
                Community College
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-uagc-border bg-white">
            {COMPARISON_DATA.map((row) => (
              <tr key={row.dimension}>
                <td className="px-5 py-4 font-semibold text-uagc-navy">
                  {row.dimension}
                </td>
                <td className="border-l-4 border-uagc-gold bg-uagc-gold/[0.03] px-5 py-4 font-bold text-uagc-navy">
                  {row.uagc}
                </td>
                <td className="px-5 py-4 text-uagc-gray">
                  {row.typicalOnline}
                </td>
                <td className="px-5 py-4 text-uagc-gray">
                  {row.communityCollege}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CompetitiveComparison({
  id = "compare",
  className,
}: CompetitiveComparisonProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 section-pad bg-white lg:scroll-mt-36", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">How UAGC Compares</h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray">
            See how UAGC stacks up against other online schools and community
            colleges on the things that matter most.
          </p>
        </div>

        <MobileCards />
        <DesktopTable />

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <p className="text-center text-sm font-medium text-uagc-navy">
            Part of the University of Arizona — a top-ranked public R1 research
            university
          </p>
          <a
            href="#rfi"
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-md bg-uagc-gold px-5 py-2.5 text-sm font-bold text-uagc-navy transition-colors duration-200 hover:bg-[#d4870a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
          >
            Request Your Program Guide
          </a>
        </div>
      </div>
    </section>
  );
}
