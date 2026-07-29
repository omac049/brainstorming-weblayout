"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ThankYouHeroSectionProps {
  firstName?: string | null;
  programName?: string | null;
  applicationPortalUrl?: string;
  className?: string;
}

const EXPECTATIONS = [
  "Discuss your goals and answer questions",
  "Review your education and career background for potential transfer or earned credits and discounts",
  "Answer questions about your degree of interest and the application process",
  "Request your transcripts for you",
] as const;

const BADGES = ["$0 Application Fee", "No Standardized Test Required"] as const;

export function ThankYouHeroSection({
  firstName,
  programName,
  applicationPortalUrl = "https://cloud.mail.uagc.edu/apply",
  className,
}: ThankYouHeroSectionProps) {
  const headline = firstName
    ? `Congratulations ${firstName},`
    : "Congratulations —";

  return (
    <section
      id="confirmation"
      className={cn("scroll-mt-20 bg-uagc-cream pb-12 pt-8 sm:pb-16 sm:pt-10", className)}
      aria-label="Submission confirmation"
    >
      <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-uagc-gray sm:text-sm">
            <li>
              <Link
                href="/organic/homepage"
                className="hover:text-uagc-navy hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden><ChevronRight className="size-3" /></li>
            <li>
              <span className="text-uagc-gray">Request Information</span>
            </li>
            <li aria-hidden><ChevronRight className="size-3" /></li>
            <li aria-current="page">
              <span className="font-medium text-uagc-navy">Thank You</span>
            </li>
          </ol>
        </nav>

        {/* Headline */}
        <div className="text-center">
          <h1 className="type-h1 text-uagc-navy">{headline}</h1>
          <p className="type-h3 mt-2 text-uagc-navy">
            you&apos;ve taken the first step.
          </p>
        </div>

        {/* Expectations */}
        <div className="mx-auto mt-8 max-w-md text-left">
          <p className="text-sm font-semibold text-uagc-navy sm:text-base">
            Expect a call from an advisor to:
          </p>
          <ul className="mt-3 space-y-2.5">
            {EXPECTATIONS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-uagc-gray sm:text-base">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-green-600"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-uagc-sky/10 px-3 py-1.5 text-xs font-semibold text-uagc-navy sm:text-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={applicationPortalUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-uagc-navy px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#d68500]"
          >
            Start Application
          </a>
          <Link
            href={programName ? "/organic/online-degrees" : "/organic/online-degrees"}
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-uagc-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-uagc-navy hover:text-white"
          >
            Program Information
          </Link>
        </div>
      </div>
    </section>
  );
}
