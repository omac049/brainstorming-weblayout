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
}: CareerOutcomesSectionProps) {
  return (
    <section className={cn("section-pad bg-uagc-navy", className)} id={id}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span
            aria-hidden
            className="mb-3 block h-[3px] w-10 bg-[#b8c5d9]"
          />
          <h2 className="type-h2 text-white">{heading}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {intro}
          </p>
        </div>

        {/* Desktop: table grid */}
        <div className="mt-10 hidden lg:block">
          <div className="grid grid-cols-[1.3fr_0.5fr_1.6fr_0.7fr_0.5fr] items-center gap-x-4 border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
            <span>Program Area</span>
            <span>Degrees</span>
            <span>Common Job Titles</span>
            <span>Salary Range</span>
            <span className="text-right">Growth</span>
          </div>
          {outcomes.map((outcome) => (
            <div
              key={outcome.area}
              className="grid grid-cols-[1.3fr_0.5fr_1.6fr_0.7fr_0.5fr] items-center gap-x-4 border-b border-white/[0.06] py-5 transition-colors hover:bg-white/[0.03]"
            >
              <h3 className="font-heading text-[0.9375rem] font-semibold text-white">
                {outcome.area}
              </h3>
              <span className="text-sm text-white/80">{outcome.degrees}</span>
              <div className="flex flex-wrap gap-1.5">
                {outcome.jobTitles.map((title) => (
                  <span
                    key={title}
                    className="rounded-full bg-white/[0.07] px-2.5 py-0.5 text-xs text-white/80"
                  >
                    {title}
                  </span>
                ))}
              </div>
              <span className="type-stat text-base text-white">
                {outcome.salary}
              </span>
              <span className="flex items-center justify-end gap-1 text-sm font-semibold text-white">
                <TrendingUp
                  className="size-3.5 text-white"
                  strokeWidth={2}
                  aria-hidden
                />
                {outcome.growthPct}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-10 space-y-3 lg:hidden">
          {outcomes.map((outcome) => (
            <article
              key={outcome.area}
              className="rounded-xl border border-white/15 bg-uagc-navy"
            >
              <div className="flex items-start justify-between gap-2 border-b border-white/15 px-5 py-4">
                <div>
                  <h3 className="font-heading text-[0.9375rem] font-semibold text-white">
                    {outcome.area}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#8a9bb5]">{outcome.degrees}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
                  <TrendingUp className="size-3" strokeWidth={2.5} aria-hidden />
                  {outcome.growthPct}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                  Median Salary Range
                </p>
                <p className="type-stat mt-1.5 text-[1.75rem] text-white sm:text-[2rem]">
                  {outcome.salary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {outcome.jobTitles.map((title) => (
                    <span
                      key={title}
                      className="rounded-full bg-white/10 px-2.5 py-0.5 text-[0.6875rem] text-white/80"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Handshake callout */}
        <div className="mt-10 rounded-xl border border-white/15 bg-uagc-navy p-5 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <div className="flex items-center gap-4">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 sm:size-12"
              aria-hidden
            >
              <Handshake className="size-5 text-white sm:size-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="type-stat text-2xl text-white sm:text-3xl">
                {handshakeCount}
              </p>
              <p className="text-sm text-white/80">{handshakeLabel}</p>
            </div>
          </div>

          <Link
            href={exploreProgramsHref}
            className="cta-primary mt-5 shrink-0 gap-2 px-6 py-2.5 text-sm sm:mt-0"
          >
            {exploreProgramsLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
