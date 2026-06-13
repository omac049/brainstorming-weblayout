"use client";

import { Phone, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const ADVISOR_HOURS = [
  "Monday – Thursday: 5 a.m. – 7 p.m. PT",
  "Friday: 5 a.m. – 5 p.m. PT",
  "Saturday – Sunday: 7 a.m. – 4 p.m. PT",
] as const;

const PHONE_DISPLAY = "+1 866 711 1700";
const PHONE_HREF = "tel:+18667111700";

export interface ThankYouContactSectionProps {
  className?: string;
}

export function ThankYouContactSection({
  className,
}: ThankYouContactSectionProps) {
  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-20 bg-uagc-navy py-10 sm:py-16",
        className,
      )}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-6">
        <h2
          id="contact-heading"
          className="type-h2 text-white"
        >
          Have Questions that Can&apos;t Wait?
        </h2>
        <p className="mt-2 text-[0.9375rem] text-white/80 sm:text-base">
          You&apos;ve got help when you need it
        </p>

        {/* Contact actions — full-width on mobile for easy tapping */}
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-uagc-navy shadow-sm transition-colors hover:bg-gray-100 active:scale-[0.97] sm:min-h-11 sm:w-auto sm:py-3"
          >
            <Phone className="size-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 active:scale-[0.97] sm:min-h-11 sm:w-auto sm:py-3"
          >
            <MessageCircle className="size-4" aria-hidden />
            Let&apos;s Chat
          </button>
        </div>

        {/* Advisor hours */}
        <div className="mt-6 rounded-xl bg-white/10 px-5 py-4 sm:mt-8 sm:p-5">
          <p className="text-sm font-semibold text-white">
            Advisor Support Team Hours
          </p>
          <ul className="mt-2.5 space-y-1 sm:mt-3">
            {ADVISOR_HOURS.map((line) => (
              <li key={line} className="text-[0.8125rem] text-white/80 sm:text-sm">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
