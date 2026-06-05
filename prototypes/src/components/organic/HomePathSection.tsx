import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, Phone } from "lucide-react";

const PATH_LINKS = [
  {
    icon: GraduationCap,
    label: "Online Degrees",
    href: "/organic/online-degrees",
    description: "Browse 50+ programs by area and level.",
  },
  {
    icon: Compass,
    label: "Admission Process",
    href: "https://www.uagc.edu/admission",
    description: "See requirements and how to get started.",
  },
  {
    icon: Phone,
    label: "Financial Aid",
    href: "https://www.uagc.edu/tuition-financial-aid",
    description: "Explore scholarships, grants, and savings.",
  },
] as const;

export function HomePathSection() {
  return (
    <section
      id="degree-path"
      className="scroll-mt-28 section-pad bg-uagc-navy lg:scroll-mt-36"
      aria-labelledby="home-path-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="home-path-heading" className="type-h2 text-white">
            Find Your Path
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8c5d9] sm:text-base">
            Whether you are advancing in your career or changing fields entirely,
            UAGC online degrees are designed to meet you where you are.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {PATH_LINKS.map(({ icon: Icon, label, href, description }) => (
            <Link
              key={label}
              href={href}
              className="group rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:border-uagc-gold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon className="size-6 text-uagc-gold" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-3 font-heading text-lg font-semibold text-white">{label}</h3>
              <p className="mt-2 text-sm text-[#b8c5d9]">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-uagc-gold">
                Explore
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/organic/online-degrees"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-uagc-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy hover:bg-[#f5a623]"
          >
            View Online Degrees
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a
            href="https://cloud.mail.uagc.edu/apply"
            className="inline-flex min-h-11 items-center rounded-full bg-uagc-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#8a0418]"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
