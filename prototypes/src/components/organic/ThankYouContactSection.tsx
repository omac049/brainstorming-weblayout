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
        "scroll-mt-20 bg-uagc-navy py-12 sm:py-16",
        className,
      )}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <h2
          id="contact-heading"
          className="type-h2 text-white"
        >
          Have Questions that Can&apos;t Wait?
        </h2>
        <p className="mt-2 text-base text-white/80">
          You&apos;ve got help when you need it
        </p>

        {/* Contact actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-uagc-navy shadow-sm transition-colors hover:bg-gray-100"
          >
            <Phone className="size-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle className="size-4" aria-hidden />
            Let&apos;s Chat
          </button>
        </div>

        {/* Advisor hours */}
        <div className="mt-8 rounded-xl bg-white/10 p-5">
          <p className="text-sm font-semibold text-white">
            Advisor Support Team Hours
          </p>
          <ul className="mt-3 space-y-1">
            {ADVISOR_HOURS.map((line) => (
              <li key={line} className="text-sm text-white/80">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
