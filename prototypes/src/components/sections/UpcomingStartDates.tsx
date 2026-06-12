"use client";

import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StartDateEntry {
  date: string;
  label?: string;
}

export interface UpcomingStartDatesProps {
  dates?: StartDateEntry[];
  className?: string;
  variant?: "inline" | "card";
}

export const DEFAULT_START_DATES: StartDateEntry[] = [
  { date: "June 16", label: "Next class" },
  { date: "July 7", label: "Following" },
];

/** @deprecated Use DEFAULT_START_DATES */
const DEFAULT_DATES = DEFAULT_START_DATES;

export function daysUntilStartDate(dateStr: string): number {
  const currentYear = new Date().getFullYear();
  const target = new Date(`${dateStr}, ${currentYear}`);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff > 0 ? diff : diff + 365;
}

export function UpcomingStartDates({
  dates = DEFAULT_DATES,
  className,
  variant = "card",
}: UpcomingStartDatesProps) {
  const nextDate = dates[0];
  // Compute during render so SSR and hydration match (avoid useEffect-only badge).
  const daysLeft = nextDate ? daysUntilStartDate(nextDate.date) : null;

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 text-sm",
          className,
        )}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping motion-reduce:animate-none rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-green-600" />
        </span>
        <span className="font-medium text-uagc-navy">
          New classes begin {nextDate?.date}
        </span>
        {daysLeft !== null && daysLeft <= 14 && (
          <span className="rounded-full bg-uagc-gold/15 px-2.5 py-0.5 text-xs font-semibold text-uagc-navy">
            {daysLeft === 0
              ? "Today"
              : daysLeft === 1
                ? "Tomorrow"
                : `${daysLeft} days`}
          </span>
        )}
      </div>
    );
  }

  return (
    <section
      className={cn(
        "w-full bg-uagc-navy",
        className,
      )}
      aria-label="Upcoming class start dates"
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-2 sm:flex">
            <CalendarDays
              className="size-5 text-uagc-gold"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="text-sm font-medium uppercase tracking-wide text-white/80">
              Upcoming starts
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {dates.map((entry, i) => (
              <div key={entry.date} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    className="hidden h-5 w-px bg-white/20 sm:block"
                    aria-hidden
                  />
                )}
                <div className="flex items-center gap-2">
                  {i === 0 && (
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping motion-reduce:animate-none rounded-full bg-green-400 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-green-400" />
                    </span>
                  )}
                  <div>
                    {entry.label && (
                      <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                        {entry.label}
                      </p>
                    )}
                    <p
                      className={cn(
                        "font-heading text-sm font-bold leading-tight",
                        i === 0 ? "text-white" : "text-white/70",
                      )}
                    >
                      {entry.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {daysLeft !== null && daysLeft <= 21 && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-uagc-gold ring-1 ring-white/10">
                {daysLeft === 0
                  ? "Starts today"
                  : daysLeft === 1
                    ? "Starts tomorrow"
                    : `Starts in ${daysLeft} days`}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
