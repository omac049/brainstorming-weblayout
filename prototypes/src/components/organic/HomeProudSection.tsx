import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeProudSection() {
  return (
    <section
      id="our-goal"
      className="scroll-mt-28 bg-uagc-navy py-10 sm:py-12 lg:scroll-mt-36"
      aria-labelledby="home-proud-heading"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="type-eyebrow text-uagc-gold">proud to be uagc</p>
          <h2 id="home-proud-heading" className="type-h2 mt-2 text-white">
            50+ Programs. 100% Online.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8c5d9] sm:text-base">
            Part of the University of Arizona enterprise — flexible online degrees
            for busy adults who need school to fit real life.
          </p>
        </div>
        <Link
          href="/organic/online-degrees"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-uagc-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-[#f5a623] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          View All Programs
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
