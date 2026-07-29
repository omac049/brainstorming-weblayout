import Link from "next/link";
import { ArrowRight, ClipboardList, CreditCard, RefreshCw } from "lucide-react";

import { HUB_JOURNEY } from "@/lib/organic-online-degrees-data";

const STEP_ICONS = [RefreshCw, ClipboardList, CreditCard] as const;

export function EnrollmentJourneySection() {
  return (
    <section
      id="journey"
      className="scroll-mt-20 section-pad bg-white"
      aria-labelledby="hub-journey-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="hub-journey-heading" className="type-h2 text-uagc-navy">
            {HUB_JOURNEY.heading}
          </h2>
          <p className="mt-3 text-sm text-uagc-gray sm:text-base">
            {HUB_JOURNEY.subheading}
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {HUB_JOURNEY.steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? RefreshCw;
            return (
              <li
                key={step.title}
                className="flex flex-col rounded-2xl border border-uagc-border bg-uagc-cream p-6"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-uagc-navy text-uagc-sky">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="type-h4 mt-4 text-uagc-navy">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-uagc-gray">
                  {step.description}
                </p>
                <Link
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-uagc-navy underline-offset-2 hover:text-uagc-red hover:underline"
                >
                  Learn More
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
