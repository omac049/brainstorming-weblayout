import Link from "next/link";
import {
  Briefcase,
  Scale,
  Shield,
  GraduationCap,
  HeartPulse,
  Monitor,
  BookOpen,
  Users,
} from "lucide-react";

const AREAS = [
  {
    label: "Business",
    href: "https://www.uagc.edu/online-degrees/business",
    icon: Briefcase,
    programCount: "12+",
    color: "#0C234B",
  },
  {
    label: "Education",
    href: "https://www.uagc.edu/online-degrees/education",
    icon: GraduationCap,
    programCount: "8+",
    color: "#0C234B",
  },
  {
    label: "Health Care",
    href: "https://www.uagc.edu/online-degrees/health-care",
    icon: HeartPulse,
    programCount: "6+",
    color: "#0C234B",
  },
  {
    label: "Information Technology",
    href: "https://www.uagc.edu/online-degrees/information-technology",
    icon: Monitor,
    programCount: "5+",
    color: "#0C234B",
  },
  {
    label: "Criminal Justice",
    href: "https://www.uagc.edu/online-degrees/criminal-justice",
    icon: Shield,
    programCount: "4+",
    color: "#0C234B",
  },
  {
    label: "Liberal Arts",
    href: "https://www.uagc.edu/online-degrees/liberal-arts",
    icon: BookOpen,
    programCount: "5+",
    color: "#0C234B",
  },
  {
    label: "Social & Behavioral Science",
    href: "https://www.uagc.edu/online-degrees/social-behavioral-science",
    icon: Users,
    programCount: "4+",
    color: "#0C234B",
  },
  {
    label: "Accounting & Finance",
    href: "https://www.uagc.edu/online-degrees/business",
    icon: Scale,
    programCount: "3+",
    color: "#0C234B",
  },
] as const;

export function AreasOfStudyGrid() {
  return (
    <section
      id="areas"
      className="scroll-mt-20 section-pad bg-white"
      aria-labelledby="areas-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="areas-heading" className="type-h2 text-uagc-navy">
            What Do You Want to Study?
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            Whether you&apos;re advancing in your field or changing direction
            entirely, find the program that fits your goals. Associate through
            doctoral — all 100% online.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map(({ label, href, icon: Icon, programCount }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[#e8e6e3] bg-white px-5 py-7 text-center transition-all duration-200 hover:border-uagc-navy/20 hover:shadow-[0_4px_16px_rgba(12,35,75,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#f3f1ee] transition-colors duration-150 group-hover:bg-[#fdf8ef]">
                <Icon
                  className="size-6 text-uagc-navy transition-colors duration-150 group-hover:text-uagc-gold"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
              <span className="text-[0.9375rem] font-semibold text-uagc-navy">
                {label}
              </span>
              <span className="text-xs font-medium text-uagc-gray">
                {programCount} programs
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
