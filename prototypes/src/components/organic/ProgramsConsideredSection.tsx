"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RecommendedProgram {
  name: string;
  degree: string;
  description: string;
  href: string;
  matchReason: string;
  imageSrc: string;
  imageAlt: string;
}

interface ProgramMapping {
  keywords: string[];
  programs: RecommendedProgram[];
}

const PROGRAM_RECOMMENDATIONS: ProgramMapping[] = [
  {
    keywords: [
      "business administration",
      "ba in business",
      "bachelor of arts in business",
    ],
    programs: [
      {
        name: "Associate of Arts in Business",
        degree: "AA",
        description:
          "Build core business fundamentals — a faster path that stacks into a bachelor's.",
        href: "/organic/online-degrees",
        matchReason: "68% of BA Business students explored this first",
        imageSrc:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        imageAlt:
          "Student working on business coursework at a laptop in a modern workspace",
      },
      {
        name: "Bachelor of Arts in Healthcare Administration",
        degree: "BA",
        description:
          "Apply business acumen to healthcare — manage teams, budgets, and operations.",
        href: "/organic/online-degrees",
        matchReason: "Popular with career-changers in business",
        imageSrc:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
        imageAlt:
          "Healthcare professional reviewing patient data in a modern clinic",
      },
      {
        name: "Bachelor of Arts in Leadership",
        degree: "BA",
        description:
          "Sharpen strategic thinking, team dynamics, and organizational leadership.",
        href: "/organic/online-degrees",
        matchReason: "Complements business with leadership focus",
        imageSrc:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=faces",
        imageAlt: "Team collaborating around a table in a bright office",
      },
    ],
  },
];

function getRecommendations(
  programName: string,
): RecommendedProgram[] | null {
  const normalized = programName.toLowerCase();
  const match = PROGRAM_RECOMMENDATIONS.find((mapping) =>
    mapping.keywords.some((kw) => normalized.includes(kw)),
  );
  return match?.programs ?? null;
}

const DEGREE_COLORS: Record<string, string> = {
  AA: "bg-sky-400/15 text-sky-300 ring-sky-400/25",
  BA: "bg-white/10 text-white ring-white/20",
  BS: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
  MA: "bg-violet-400/15 text-violet-300 ring-violet-400/25",
};

interface ProgramsConsideredSectionProps {
  programName: string;
  className?: string;
  id?: string;
}

export function ProgramsConsideredSection({
  programName,
  className,
  id,
}: ProgramsConsideredSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const programs = getRecommendations(programName);

  if (!programs) return null;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby="programs-considered-heading"
      className={cn("scroll-mt-32 bg-uagc-navy py-16 sm:py-20", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mb-10 sm:mb-12",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <h2
            id="programs-considered-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Programs Other Students Considered
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-uagc-navy-muted sm:text-base">
            Students interested in your program also explored these degrees
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {programs.map((program, index) => (
            <Link
              key={program.name}
              href={program.href}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl",
                "bg-[#122d54] ring-1 ring-white/10",
                "transition-all duration-300 ease-out",
                "hover:ring-uagc-gold/40 hover:shadow-lg hover:shadow-black/20",
                "reveal-section",
                `stagger-${index + 1}`,
                isVisible && "is-visible",
              )}
            >
              <div className="relative h-48 overflow-hidden sm:h-44 lg:h-48">
                <Image
                  src={program.imageSrc}
                  alt={program.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#122d54]/60 to-transparent" />

                <span
                  className={cn(
                    "absolute left-3.5 top-3.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset",
                    DEGREE_COLORS[program.degree] ??
                      "bg-white/10 text-white ring-white/20",
                  )}
                >
                  {program.degree}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <h3 className="text-[0.9375rem] font-bold leading-snug text-white sm:text-base">
                  {program.name}
                </h3>

                <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-uagc-navy-muted">
                  {program.description}
                </p>

                <p className="mt-3 text-xs font-medium text-uagc-gold">
                  {program.matchReason}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-uagc-gold transition-colors group-hover:text-white">
                  Explore Program
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
