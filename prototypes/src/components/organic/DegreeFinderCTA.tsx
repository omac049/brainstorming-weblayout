import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DegreeFinderCTA() {
  return (
    <section
      id="degree-finder"
      className="scroll-mt-20 bg-uagc-navy py-12 sm:py-16"
      aria-labelledby="degree-finder-heading"
    >
      <div className="mx-auto w-full max-w-[880px] px-4 text-center sm:px-6 lg:px-8">
        <h2 id="degree-finder-heading" className="type-h2 text-white">
          Not Sure What You Want to Study?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b8c5d9] sm:text-base">
          Whether you&apos;re a natural born leader or excel at educating others, our
          Degree Finder tool can help you find the path that aligns with your
          individual skills and strengths.
        </p>
        <Link
          href="https://www.uagc.edu/online-degrees/find-your-degree"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-uagc-gold px-8 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-[#f5a623]"
        >
          Take the Degree Finder Quiz
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
