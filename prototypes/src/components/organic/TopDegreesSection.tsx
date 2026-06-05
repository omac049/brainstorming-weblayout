import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HUB_TOP_DEGREES } from "@/lib/organic-online-degrees-data";

export function TopDegreesSection() {
  return (
    <section
      id="top-degrees"
      className="scroll-mt-20 section-pad bg-[#faf9f7]"
      aria-labelledby="top-degrees-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="top-degrees-heading" className="type-h2 text-uagc-navy">
            {HUB_TOP_DEGREES.heading}
          </h2>
          <p className="mt-3 text-sm text-uagc-gray sm:text-base">
            {HUB_TOP_DEGREES.subheading}
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {HUB_TOP_DEGREES.cards.map((card) => (
            <li
              key={card.href}
              className="flex flex-col rounded-2xl border border-uagc-border bg-white p-6"
            >
              <h3 className="type-h4 text-uagc-navy">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-uagc-gray">
                {card.description}
              </p>
              <Link
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-uagc-navy underline-offset-2 hover:text-uagc-red hover:underline"
              >
                Learn More
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
