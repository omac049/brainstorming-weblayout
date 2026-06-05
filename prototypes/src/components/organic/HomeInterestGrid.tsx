import Link from "next/link";
import { ArrowRight } from "lucide-react";

const INTEREST_AREAS = [
  { title: "Business", programCount: "19", href: "/organic/online-degrees" },
  { title: "Criminal Justice", programCount: "3", href: "/organic/online-degrees" },
  { title: "Education", programCount: "13", href: "/organic/online-degrees" },
  { title: "Health Care", programCount: "7", href: "/organic/online-degrees" },
  { title: "IT", programCount: "6", href: "/organic/online-degrees" },
  { title: "Liberal Arts", programCount: "4", href: "/organic/online-degrees" },
  {
    title: "Social & Behavioral Sciences",
    programCount: "6",
    href: "/organic/online-degrees",
  },
] as const;

export function HomeInterestGrid() {
  return (
    <section
      id="interests"
      className="scroll-mt-28 section-pad lg:scroll-mt-36"
      aria-labelledby="home-interest-heading"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <h2
          id="home-interest-heading"
          className="text-center font-heading-condensed text-[clamp(2rem,4vw,2.75rem)] font-extrabold uppercase leading-tight tracking-tight text-uagc-navy"
        >
          What Interests You?
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-center text-sm leading-relaxed text-uagc-gray sm:text-base">
          Pick a field to explore programs, career outcomes, and next steps.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INTEREST_AREAS.map((area) => (
            <Link
              key={area.title}
              href={area.href}
              className="group flex min-h-[88px] cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white px-4 py-4 transition-colors duration-200 hover:border-uagc-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:min-h-[96px] sm:px-5 sm:py-5"
            >
              <div>
                <h3 className="text-sm font-bold leading-snug text-uagc-navy transition-colors duration-200 group-hover:text-uagc-gold sm:text-[0.9375rem]">
                  {area.title}
                </h3>
                <p className="mt-1 text-xs text-uagc-gray">
                  {area.programCount} programs
                </p>
              </div>
              <ArrowRight
                className="mt-3 size-4 shrink-0 text-gray-300 transition-colors duration-200 group-hover:text-uagc-gold"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
