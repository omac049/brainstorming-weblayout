import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface CareerOutcomeItem {
  area: string;
  degrees: string;
  salary: string;
  growthPct: string;
  jobTitles: string[];
}

export type CareerOutcomesVariant = "navy" | "surface";

export interface CareerOutcomesSectionProps {
  heading?: string;
  intro?: string;
  outcomes?: CareerOutcomeItem[];
  handshakeCount?: string;
  handshakeLabel?: string;
  exploreProgramsLabel?: string;
  exploreProgramsHref?: string;
  className?: string;
  id?: string;
  variant?: CareerOutcomesVariant;
}

const DEFAULT_OUTCOMES: CareerOutcomeItem[] = [
  {
    area: "Business & Management",
    degrees: "AA, BA, MBA",
    salary: "$55K – $95K",
    growthPct: "8%",
    jobTitles: ["Operations Manager", "Business Analyst", "Project Manager", "Management Consultant"],
  },
  {
    area: "Health Care Administration",
    degrees: "BA, MA",
    salary: "$60K – $110K",
    growthPct: "28%",
    jobTitles: ["Health Services Manager", "Clinical Coordinator", "Practice Administrator", "Quality Improvement Director"],
  },
  {
    area: "Information Technology",
    degrees: "BS, MISM",
    salary: "$65K – $115K",
    growthPct: "15%",
    jobTitles: ["Systems Administrator", "IT Project Manager", "Cybersecurity Analyst", "Database Administrator"],
  },
  {
    area: "Criminal Justice & Public Safety",
    degrees: "AA, BA",
    salary: "$48K – $85K",
    growthPct: "5%",
    jobTitles: ["Federal Agent", "Probation Officer", "Crime Analyst", "Emergency Management Director"],
  },
  {
    area: "Education & Teaching",
    degrees: "BA, MA",
    salary: "$45K – $72K",
    growthPct: "7%",
    jobTitles: ["K-12 Teacher", "Curriculum Specialist", "Instructional Coordinator", "School Administrator"],
  },
  {
    area: "Human Services & Social Work",
    degrees: "BA, MA",
    salary: "$40K – $68K",
    growthPct: "9%",
    jobTitles: ["Case Manager", "Community Outreach Coordinator", "Substance Abuse Counselor", "Social Services Director"],
  },
];

function careerOutcomesShellClass(variant: CareerOutcomesVariant): string {
  switch (variant) {
    case "navy":
      return "section-pad bg-uagc-navy";
    case "surface":
      return "section-pad border-t border-uagc-border bg-uagc-surface";
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function careerOutcomesHeaderClass(variant: CareerOutcomesVariant): {
  accentBar: string;
  heading: string;
  intro: string;
} {
  switch (variant) {
    case "navy":
      return {
        accentBar: "mb-3 block h-0.75 w-10 bg-uagc-navy-muted",
        heading: "type-h2 text-white",
        intro: "mt-4 max-w-xl text-base leading-relaxed text-uagc-navy-muted sm:text-lg",
      };
    case "surface":
      return {
        accentBar: "mb-3 accent-bar",
        heading: "type-h2 text-uagc-navy",
        intro:
          "mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function careerOutcomesTableClass(variant: CareerOutcomesVariant): {
  headerRow: string;
  dataRow: string;
  areaTitle: string;
  degrees: string;
  pill: string;
  salary: string;
  growth: string;
  growthIcon: string;
} {
  switch (variant) {
    case "navy":
      return {
        headerRow:
          "border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-uagc-navy-muted",
        dataRow:
          "border-b border-white/6 py-5 transition-colors duration-200 hover:bg-white/3",
        areaTitle: "font-heading text-[0.9375rem] font-semibold text-white",
        degrees: "text-sm text-uagc-navy-muted",
        pill: "rounded-full bg-white/7 px-2.5 py-0.5 text-xs text-uagc-navy-muted",
        salary: "type-stat text-base text-white",
        growth: "flex items-center justify-end gap-1 text-sm font-semibold text-white",
        growthIcon: "size-3.5 text-white",
      };
    case "surface":
      return {
        headerRow:
          "border-b border-uagc-border pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-uagc-gray",
        dataRow:
          "border-b border-uagc-border py-5 transition-colors duration-200 hover:bg-white/80",
        areaTitle: "font-heading text-[0.9375rem] font-semibold text-uagc-navy",
        degrees: "text-sm text-uagc-gray",
        pill:
          "rounded-full border border-uagc-border bg-white px-2.5 py-0.5 text-xs text-uagc-gray",
        salary: "type-stat text-base text-uagc-navy",
        growth:
          "flex items-center justify-end gap-1 text-sm font-semibold text-uagc-navy",
        growthIcon: "size-3.5 text-uagc-red",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function careerOutcomesMobileCardClass(variant: CareerOutcomesVariant): {
  card: string;
  headerBorder: string;
  title: string;
  degrees: string;
  growthBadge: string;
  label: string;
  salary: string;
  pill: string;
} {
  switch (variant) {
    case "navy":
      return {
        card: "rounded-xl border border-white/15 bg-uagc-navy",
        headerBorder: "border-b border-white/15",
        title: "font-heading text-[0.9375rem] font-semibold text-white",
        degrees: "mt-0.5 text-xs text-uagc-navy-muted",
        growthBadge:
          "flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-white",
        label: "text-xs font-semibold uppercase tracking-[0.12em] text-uagc-navy-muted",
        salary: "type-stat mt-1.5 text-[1.75rem] text-white sm:text-[2rem]",
        pill: "rounded-full bg-white/10 px-2.5 py-0.5 text-[0.6875rem] text-uagc-navy-muted",
      };
    case "surface":
      return {
        card: "rounded-xl border border-uagc-border bg-white",
        headerBorder: "border-b border-uagc-border",
        title: "font-heading text-[0.9375rem] font-semibold text-uagc-navy",
        degrees: "mt-0.5 text-xs text-uagc-gray",
        growthBadge:
          "flex shrink-0 items-center gap-1 rounded-full bg-uagc-surface px-2.5 py-1 text-[0.6875rem] font-semibold text-uagc-navy",
        label: "text-xs font-semibold uppercase tracking-[0.12em] text-uagc-gray",
        salary: "type-stat mt-1.5 text-[1.75rem] text-uagc-navy sm:text-[2rem]",
        pill:
          "rounded-full border border-uagc-border bg-uagc-surface px-2.5 py-0.5 text-[0.6875rem] text-uagc-gray",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function careerOutcomesCalloutClass(variant: CareerOutcomesVariant): {
  shell: string;
  iconWrap: string;
  icon: string;
  stat: string;
  label: string;
} {
  switch (variant) {
    case "navy":
      return {
        shell: "rounded-xl border border-white/15 bg-uagc-navy p-5 sm:p-6",
        iconWrap:
          "flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 sm:size-12",
        icon: "size-5 text-white sm:size-6",
        stat: "type-stat text-2xl text-white sm:text-3xl",
        label: "text-sm text-uagc-navy-muted",
      };
    case "surface":
      return {
        shell:
          "rounded-2xl border border-uagc-border bg-white p-5 sm:p-6",
        iconWrap:
          "flex size-11 shrink-0 items-center justify-center rounded-full bg-uagc-surface sm:size-12",
        icon: "size-5 text-uagc-navy sm:size-6",
        stat: "type-stat text-2xl text-uagc-navy sm:text-3xl",
        label: "text-sm text-uagc-gray",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function CareerOutcomesSection({
  heading = "Career Outcomes by Program",
  intro = "Compare program areas by the careers they lead to — salary ranges, growth outlook, and the job titles graduates pursue. Lifetime career services from day one.",
  outcomes = DEFAULT_OUTCOMES,
  handshakeCount = "98,000+",
  handshakeLabel = "employers on Handshake — access for life",
  exploreProgramsLabel = "Explore Programs",
  exploreProgramsHref = "#programs",
  className,
  id,
  variant = "navy",
}: CareerOutcomesSectionProps) {
  const headerClass = careerOutcomesHeaderClass(variant);
  const tableClass = careerOutcomesTableClass(variant);
  const mobileClass = careerOutcomesMobileCardClass(variant);
  const calloutClass = careerOutcomesCalloutClass(variant);

  return (
    <section
      className={cn(careerOutcomesShellClass(variant), className)}
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span aria-hidden className={headerClass.accentBar} />
          <h2 id={id ? `${id}-heading` : undefined} className={headerClass.heading}>
            {heading}
          </h2>
          <p className={headerClass.intro}>{intro}</p>
        </div>

        <div className="mt-10 hidden lg:block">
          <div
            className={cn(
              "grid grid-cols-[1.3fr_0.5fr_1.6fr_0.7fr_0.5fr] items-center gap-x-4",
              tableClass.headerRow,
            )}
          >
            <span>Program Area</span>
            <span>Degrees</span>
            <span>Common Job Titles</span>
            <span>Salary Range</span>
            <span className="text-right">Growth</span>
          </div>
          {outcomes.map((outcome) => (
            <div
              key={outcome.area}
              className={cn(
                "grid grid-cols-[1.3fr_0.5fr_1.6fr_0.7fr_0.5fr] items-center gap-x-4",
                tableClass.dataRow,
              )}
            >
              <h3 className={tableClass.areaTitle}>{outcome.area}</h3>
              <span className={tableClass.degrees}>{outcome.degrees}</span>
              <div className="flex flex-wrap gap-1.5">
                {outcome.jobTitles.map((title) => (
                  <span key={title} className={tableClass.pill}>
                    {title}
                  </span>
                ))}
              </div>
              <span className={tableClass.salary}>{outcome.salary}</span>
              <span className={tableClass.growth}>
                <TrendingUp
                  className={tableClass.growthIcon}
                  strokeWidth={2}
                  aria-hidden
                />
                {outcome.growthPct}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          {outcomes.map((outcome) => (
            <article key={outcome.area} className={mobileClass.card}>
              <div
                className={cn(
                  "flex items-start justify-between gap-2 px-5 py-4",
                  mobileClass.headerBorder,
                )}
              >
                <div>
                  <h3 className={mobileClass.title}>{outcome.area}</h3>
                  <p className={mobileClass.degrees}>{outcome.degrees}</p>
                </div>
                <span className={mobileClass.growthBadge}>
                  <TrendingUp className="size-3" strokeWidth={2.5} aria-hidden />
                  {outcome.growthPct}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className={mobileClass.label}>Median Salary Range</p>
                <p className={mobileClass.salary}>{outcome.salary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {outcome.jobTitles.map((title) => (
                    <span key={title} className={mobileClass.pill}>
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={cn(
            "mt-10 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-8",
            calloutClass.shell,
          )}
        >
          <div className="flex items-center gap-4">
            <span className={calloutClass.iconWrap} aria-hidden>
              <Handshake className={calloutClass.icon} strokeWidth={1.75} />
            </span>
            <div>
              <p className={calloutClass.stat}>{handshakeCount}</p>
              <p className={calloutClass.label}>{handshakeLabel}</p>
            </div>
          </div>

          <Link
            href={exploreProgramsHref}
            className="cta-primary mt-5 shrink-0 gap-2 px-6 py-2.5 text-sm transition-transform duration-150 ease-out active:scale-98 sm:mt-0"
          >
            {exploreProgramsLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
