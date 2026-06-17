"use client";

import { GraduationCap, Clock, DollarSign, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

const TRUST_ITEMS = [
  {
    icon: <GraduationCap className="size-5 text-uagc-gold" />,
    value: "100%",
    label: "Online",
    detail: "Study from anywhere",
  },
  {
    icon: <Clock className="size-5 text-uagc-gold" />,
    value: "5-Week",
    label: "Courses",
    detail: "One class at a time",
  },
  {
    icon: <DollarSign className="size-5 text-uagc-gold" />,
    value: "$0",
    label: "To Apply",
    detail: "No application fee",
  },
  {
    icon: <ShieldCheck className="size-5 text-uagc-gold" />,
    value: "WSCUC",
    label: "Accredited",
    detail: "Recognized quality",
  },
] as const;

export function HomeProgramFinderSection() {
  return (
    <section
      id="find-program"
      className="relative scroll-mt-24 bg-white"
      aria-labelledby="program-finder-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* Two-column layout: messaging + CTAs on left, trust metrics on right */}
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          {/* Left: headline + description + CTAs */}
          <div>
            <span className="accent-bar mb-4" aria-hidden="true" />
            <h2
              id="program-finder-heading"
              className="type-h2 text-uagc-navy"
            >
              Find Your Program
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-uagc-gray sm:text-lg">
              Explore 50+ online degrees designed for working adults — associate
              through doctoral level. No obligation to browse.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#interests"
                className="cta-primary text-center sm:w-auto"
              >
                Explore Programs
              </a>
              <a
                href="#rfi"
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-uagc-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors duration-200 hover:bg-uagc-gold-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
              >
                Request Info
              </a>
            </div>
          </div>

          {/* Right: trust metrics grid */}
          <div className="mt-10 lg:mt-0">
            <div className="grid grid-cols-2 gap-4">
              {TRUST_ITEMS.map((item) => (
                <TrustCard key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-uagc-border to-transparent" />
    </section>
  );
}

function TrustCard({
  icon,
  value,
  label,
  detail,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="group flex flex-col items-center rounded-xl border border-gray-100 bg-sidebar px-4 py-5 text-center transition-[border-color,box-shadow] duration-200 hover:border-uagc-gold/30 hover:shadow-md sm:px-5 sm:py-6">
      <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-uagc-gold/10">
        {icon}
      </div>
      <p className="type-stat text-2xl text-uagc-navy sm:text-3xl">{value}</p>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-uagc-navy/70">
        {label}
      </p>
      <p className="mt-1.5 text-[0.6875rem] leading-tight text-uagc-gray sm:text-xs">
        {detail}
      </p>
    </div>
  );
}
