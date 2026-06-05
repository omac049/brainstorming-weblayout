"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type DegreeLevel =
  | "Associate's"
  | "Bachelor's"
  | "Master's"
  | "Doctoral";

export type AreaOfInterest =
  | "Business"
  | "Criminal Justice"
  | "Education"
  | "Health Care"
  | "Information Technology"
  | "Liberal Arts"
  | "Social & Behavioral Science";

export type College =
  | "College of Integrative Learning"
  | "College of Professional Advancement";

export interface ProgramListingItem {
  name: string;
  college: College;
  description: string;
  href: string;
  level: DegreeLevel;
  area: AreaOfInterest;
}

export interface ProgramListingSectionProps {
  programs?: ProgramListingItem[];
  initialVisibleCount?: number;
  className?: string;
}

const DEGREE_LEVELS: Array<DegreeLevel | "All"> = [
  "All",
  "Associate's",
  "Bachelor's",
  "Master's",
  "Doctoral",
];

const AREAS: Array<AreaOfInterest | "All"> = [
  "All",
  "Business",
  "Criminal Justice",
  "Education",
  "Health Care",
  "Information Technology",
  "Liberal Arts",
  "Social & Behavioral Science",
];

const COLLEGES: Array<College | "All"> = [
  "All",
  "College of Integrative Learning",
  "College of Professional Advancement",
];

export const DEFAULT_PROGRAM_LISTINGS: ProgramListingItem[] = [
  {
    name: "AA in Business",
    college: "College of Professional Advancement",
    description:
      "Prepare to launch a career in today's fast-paced and ever-evolving business world.",
    href: "/online-degrees/associate/business",
    level: "Associate's",
    area: "Business",
  },
  {
    name: "AA in Early Childhood Education",
    college: "College of Professional Advancement",
    description:
      "Prepare to work in the field of childcare as you learn the basics of childhood development.",
    href: "/online-degrees/associate/early-childhood-education",
    level: "Associate's",
    area: "Education",
  },
  {
    name: "AA in Military Studies",
    college: "College of Professional Advancement",
    description:
      "Explore global security challenges, military affairs, and leadership principles.",
    href: "/online-degrees/associate/military-studies",
    level: "Associate's",
    area: "Liberal Arts",
  },
  {
    name: "AA in Organizational Management",
    college: "College of Professional Advancement",
    description:
      "Dive into the fundamentals, skills, and competencies of organizational management.",
    href: "/online-degrees/associate/organizational-management",
    level: "Associate's",
    area: "Business",
  },
  {
    name: "BA in Accounting",
    college: "College of Professional Advancement",
    description:
      "Explore relevant, rigorous, and real-world accounting curriculum.",
    href: "/online-degrees/bachelors/accounting",
    level: "Bachelor's",
    area: "Business",
  },
  {
    name: "BA in Applied Behavioral Science",
    college: "College of Professional Advancement",
    description:
      "Use your knowledge of human behavior to solve problems facing organizations and society.",
    href: "/online-degrees/bachelors/applied-behavioral-science",
    level: "Bachelor's",
    area: "Social & Behavioral Science",
  },
  {
    name: "BA in Business Administration",
    college: "College of Professional Advancement",
    description:
      "Prepare you for a variety of careers where core business fundamentals and problem-solving skills are a must.",
    href: "/online-degrees/bachelors/business-administration",
    level: "Bachelor's",
    area: "Business",
  },
  {
    name: "BA in Business Economics",
    college: "College of Professional Advancement",
    description:
      "Earn your BA in Business Economics online at UAGC. Build skills in data analytics, applied economics, and business strategy for in-demand careers.",
    href: "/online-degrees/bachelors/business-economics",
    level: "Bachelor's",
    area: "Business",
  },
  {
    name: "BA in Business Information Systems",
    college: "College of Professional Advancement",
    description: "Build a repository of skills in the modern business environment.",
    href: "/online-degrees/bachelors/business-information-systems",
    level: "Bachelor's",
    area: "Information Technology",
  },
  {
    name: "BA in Business Leadership",
    college: "College of Integrative Learning",
    description: "Develop your gift for guiding others and inspire them to excel.",
    href: "/online-degrees/bachelors/business-leadership",
    level: "Bachelor's",
    area: "Business",
  },
  {
    name: "BA in Finance",
    college: "College of Professional Advancement",
    description:
      "Invest in your career with courses in markets, investments, risk management, and micro and macroeconomics.",
    href: "/online-degrees/bachelors/finance",
    level: "Bachelor's",
    area: "Business",
  },
  {
    name: "BA in Health Care Administration",
    college: "College of Professional Advancement",
    description:
      "Prepare for leadership roles in health care organizations and administration.",
    href: "/online-degrees/bachelors/health-care-administration",
    level: "Bachelor's",
    area: "Health Care",
  },
  {
    name: "BA in Criminal Justice",
    college: "College of Professional Advancement",
    description:
      "Develop skills in law enforcement, corrections, and homeland security.",
    href: "/online-degrees/bachelors/criminal-justice",
    level: "Bachelor's",
    area: "Criminal Justice",
  },
  {
    name: "Master of Business Administration",
    college: "College of Professional Advancement",
    description:
      "Advance your business career with an online MBA designed for working professionals.",
    href: "/online-degrees/masters/mba",
    level: "Master's",
    area: "Business",
  },
  {
    name: "Doctor of Philosophy in Organizational Leadership",
    college: "College of Integrative Learning",
    description:
      "Achieve the pinnacle of education and expertise with a doctoral degree in organizational leadership.",
    href: "/online-degrees/doctoral/organizational-leadership",
    level: "Doctoral",
    area: "Business",
  },
];

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="min-w-0 flex-1 sm:max-w-[220px]">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-uagc-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-md border border-uagc-border bg-white px-3 py-2.5 text-sm text-uagc-gray outline-none focus:border-uagc-gold focus:ring-1 focus:ring-uagc-gold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? `All ${label.replace("Choose Your ", "").replace("Choose ", "")}` : option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ProgramListingSection({
  programs = DEFAULT_PROGRAM_LISTINGS,
  initialVisibleCount = 10,
  className,
}: ProgramListingSectionProps) {
  const [levelFilter, setLevelFilter] = useState<(typeof DEGREE_LEVELS)[number]>("All");
  const [areaFilter, setAreaFilter] = useState<(typeof AREAS)[number]>("All");
  const [collegeFilter, setCollegeFilter] = useState<(typeof COLLEGES)[number]>("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [levelFilter, areaFilter, collegeFilter]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      if (levelFilter !== "All" && program.level !== levelFilter) {
        return false;
      }
      if (areaFilter !== "All" && program.area !== areaFilter) {
        return false;
      }
      if (collegeFilter !== "All" && program.college !== collegeFilter) {
        return false;
      }
      return true;
    });
  }, [programs, levelFilter, areaFilter, collegeFilter]);

  const visiblePrograms = showAll
    ? filteredPrograms
    : filteredPrograms.slice(0, initialVisibleCount);

  const hasMore = filteredPrograms.length > initialVisibleCount && !showAll;

  return (
    <section
      id="programs"
      className={cn("bg-white py-12 sm:py-16", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <span
          aria-hidden
          className="mb-3 accent-bar"
        />
        <h2 className="font-heading text-2xl font-bold text-uagc-navy sm:text-3xl">
          Discover The Program That&apos;s Right For You
        </h2>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <FilterSelect
            label="Degree Level"
            value={levelFilter}
            options={DEGREE_LEVELS}
            onChange={setLevelFilter}
          />
          <FilterSelect
            label="Area of Interest"
            value={areaFilter}
            options={AREAS}
            onChange={setAreaFilter}
          />
          <FilterSelect
            label="College"
            value={collegeFilter}
            options={COLLEGES}
            onChange={setCollegeFilter}
          />
        </div>

        <p className="mt-6 text-sm text-uagc-gray">
          {filteredPrograms.length} program{filteredPrograms.length === 1 ? "" : "s"} found
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePrograms.map((program) => (
            <article
              key={program.name}
              className="flex flex-col border border-uagc-border bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-bold text-uagc-navy">
                {program.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-uagc-red">
                {program.college}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-uagc-gray">
                {program.description}
              </p>
              <Link
                href={program.href}
                className="mt-4 inline-flex w-fit items-center text-sm font-semibold text-uagc-navy underline-offset-2 transition-opacity hover:opacity-80 hover:underline"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <p className="mt-8 text-center text-base text-uagc-gray">
            No programs match your filters. Try adjusting your selections.
          </p>
        )}

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center rounded-full bg-uagc-navy px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
