"use client";

import Image from "next/image";
import { Briefcase, GraduationCap, Quote, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CareerPath {
  title: string;
  growth?: string;
}

interface FacultyMember {
  name: string;
  credential: string;
  role: string;
  college: string;
  image?: string;
}

interface StudentStory {
  name: string;
  degree: string;
  year: string;
  quote?: string;
}

interface ProgramData {
  keywords: string[];
  careers: CareerPath[];
  faculty: FacultyMember[];
  students: StudentStory[];
  highlights: string[];
}

const PROGRAM_DATA: ProgramData[] = [
  {
    keywords: ["business leadership", "business administration"],
    careers: [
      { title: "Operations Manager", growth: "+8%" },
      { title: "Team Lead / Supervisor", growth: "+6%" },
      { title: "Human Resources Manager", growth: "+5%" },
      { title: "Training & Development Manager", growth: "+6%" },
      { title: "Business Consultant", growth: "+11%" },
      { title: "Project Manager", growth: "+6%" },
    ],
    faculty: [
      {
        name: "Ronald Beach, PhD",
        credential: "PhD",
        role: "Lead Faculty — Professor",
        college: "College of Professional Advancement",
        image: "https://www.uagc.edu/sites/default/files/styles/faculty_members_layout_375x375/public/Ron_Beach.jpg?h=c35ab9d9&itok=QfpfmrTY",
      },
    ],
    students: [
      {
        name: 'Vincent "Rocco" Vargas',
        degree: "BA in Social and Criminal Justice",
        year: "2023",
        quote: "UAGC gave me the tools and confidence to take my career to the next level.",
      },
      {
        name: "Jessica Smith",
        degree: "Master of Arts in Psychology",
        year: "2023",
        quote: "The flexibility allowed me to balance school, work, and family while still excelling.",
      },
      {
        name: "Wendy Bosquez",
        degree: "BA in Communication Studies",
        year: "2024",
        quote: "My professors were invested in my success from day one.",
      },
    ],
    highlights: [
      "IACBE-accredited program",
      "Accelerated 5-week courses",
      "1 course at a time",
      "120 credits total",
    ],
  },
];

function getProgramData(programName: string): ProgramData | null {
  const normalized = programName.toLowerCase();
  return (
    PROGRAM_DATA.find((p) =>
      p.keywords.some((kw) => normalized.includes(kw)),
    ) ?? null
  );
}

interface ProgramDetailsSectionProps {
  programName: string;
  className?: string;
  id?: string;
}

export function ProgramDetailsSection({
  programName,
  className,
  id,
}: ProgramDetailsSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const data = getProgramData(programName);

  if (!data) return null;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby="program-details-heading"
      className={cn(
        "scroll-mt-32 border-t border-uagc-border bg-white py-14 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "mb-10 text-center sm:mb-12",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2
            id="program-details-heading"
            className="type-h2 text-uagc-navy"
          >
            Your Program at a Glance
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            Here&apos;s what graduates with your degree are doing — and who&apos;ll
            help you get there.
          </p>
        </div>

        {/* Three-column grid: Careers | Faculty | Students */}
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {/* Career Outcomes */}
          <div
            className={cn(
              "rounded-2xl border border-uagc-border bg-uagc-surface p-6",
              "reveal-section stagger-1",
              isVisible && "is-visible",
            )}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-uagc-navy text-white">
                <Briefcase className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-heading text-base font-bold text-uagc-navy">
                Career Paths
              </h3>
            </div>
            <ul className="space-y-3">
              {data.careers.map((career) => (
                <li
                  key={career.title}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm font-medium text-uagc-navy">
                    {career.title}
                  </span>
                  {career.growth && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                      <TrendingUp className="size-3" aria-hidden />
                      {career.growth}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-uagc-gray">
              Growth projections from U.S. Bureau of Labor Statistics (2022–2032). 
              National data; does not guarantee specific outcomes.
            </p>
          </div>

          {/* Faculty */}
          <div
            className={cn(
              "rounded-2xl border border-uagc-border bg-uagc-surface p-6",
              "reveal-section stagger-2",
              isVisible && "is-visible",
            )}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-uagc-navy text-white">
                <GraduationCap className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-heading text-base font-bold text-uagc-navy">
                Meet Your Faculty
              </h3>
            </div>
            <div className="space-y-4">
              {data.faculty.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl border border-uagc-border bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="size-12 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-uagc-navy/10 font-heading text-lg font-bold text-uagc-navy">
                        {member.name.charAt(0)}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-bold text-uagc-navy">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-uagc-navy">
                        {member.role}
                      </p>
                      <p className="mt-1 text-xs text-uagc-gray">
                        {member.college}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Program highlights */}
            <div className="mt-5 border-t border-uagc-border pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-uagc-gray">
                Program Highlights
              </p>
              <ul className="space-y-2">
                {data.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-uagc-navy"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-uagc-navy" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Stories */}
          <div
            className={cn(
              "rounded-2xl border border-uagc-border bg-uagc-surface p-6",
              "reveal-section stagger-3",
              isVisible && "is-visible",
            )}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-uagc-navy text-white">
                <Users className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-heading text-base font-bold text-uagc-navy">
                Student Stories
              </h3>
            </div>
            <div className="space-y-4">
              {data.students.map((student) => (
                <div
                  key={student.name}
                  className="rounded-xl border border-uagc-border bg-white p-4"
                >
                  {student.quote && (
                    <div className="mb-3 flex items-start gap-2">
                      <Quote
                        className="mt-0.5 size-3.5 shrink-0 text-uagc-navy"
                        aria-hidden
                      />
                      <p className="text-[13px] italic leading-relaxed text-uagc-gray">
                        &ldquo;{student.quote}&rdquo;
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-uagc-navy/10 text-xs font-bold text-uagc-navy">
                      {student.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-uagc-navy">
                        {student.name}
                      </p>
                      <p className="text-xs text-uagc-gray">
                        {student.degree}, {student.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
