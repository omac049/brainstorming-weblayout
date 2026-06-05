import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROGRAM_LEVELS = [
  {
    count: "30+",
    title: "Undergraduate",
    description: "Associate & bachelor's degrees. Transfer up to 75% of your credits.",
    href: "/organic/online-degrees?level=undergraduate",
    accent: "text-uagc-navy",
    bar: "bg-uagc-navy",
    label: "Most Popular",
  },
  {
    count: "15+",
    title: "Graduate",
    description: "Master's programs built for working professionals.",
    href: "/organic/online-degrees?level=graduate",
    accent: "text-uagc-red",
    bar: "bg-uagc-red",
    label: null,
  },
  {
    count: "5+",
    title: "Doctoral",
    description: "EdD & DBA for experienced leaders ready to advance.",
    href: "/organic/online-degrees?level=doctoral",
    accent: "text-uagc-gold",
    bar: "bg-uagc-gold",
    label: null,
  },
];

export function HomeProgramsSection() {
  return (
    <section id="programs" className="scroll-mt-24 section-pad">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading-condensed text-[clamp(2rem,4vw,2.75rem)] font-extrabold uppercase leading-tight tracking-tight text-uagc-navy">
          Choose Your Path
        </h2>
        <p className="mx-auto mt-3 max-w-[440px] text-center text-sm leading-relaxed text-uagc-gray sm:text-base">
          50+ programs, all 100% online. Pick your level to get started.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PROGRAM_LEVELS.map((level, i) => (
            <Link
              key={level.title}
              href={level.href}
              className="group relative flex cursor-pointer flex-col rounded-xl border border-gray-100 bg-white px-6 py-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:px-8 sm:py-10 motion-safe:animate-[fadeSlideUp_0.5s_ease_both]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span
                aria-hidden
                className={`absolute inset-y-4 left-0 w-1 rounded-r-full ${level.bar} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
              />

              {level.label && (
                <span className="mb-4 inline-block w-fit rounded-full bg-uagc-navy/5 px-3 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-uagc-navy">
                  {level.label}
                </span>
              )}

              <span
                className={`font-heading-condensed text-[3rem] font-extrabold leading-none ${level.accent} sm:text-[3.5rem]`}
              >
                {level.count}
              </span>
              <h3 className="mt-2 text-xl font-bold text-uagc-navy">
                {level.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-uagc-gray">
                {level.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-uagc-navy transition-colors duration-200 group-hover:text-uagc-red">
                Explore Programs
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
