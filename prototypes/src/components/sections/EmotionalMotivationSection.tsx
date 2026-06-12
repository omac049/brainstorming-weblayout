import { ArrowRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";

const DEFAULT_HEADING =
  "You've Been Thinking About This for a Reason";

export interface EmotionalMotivationSectionProps {
  heading?: string;
  body?: string;
  pullQuote?: string;
  pullQuoteAttribution?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
  className?: string;
}

export function EmotionalMotivationSection({
  heading = DEFAULT_HEADING,
  body = "Maybe it's the promotion that went to someone with a degree. Maybe it's the example you want to set for your kids. Or maybe you just know you're capable of more. Whatever brought you here — that instinct is worth following. UAGC was built for people exactly like you: working adults who are ready to move forward without putting life on hold.",
  pullQuote = "I kept telling myself 'someday.' Then I realized someday was never going to show up on the calendar. I had to choose a date and start.",
  pullQuoteAttribution = "UAGC Graduate",
  ctaLabel = "Take the First Step",
  ctaHref = "#rfi",
  className,
}: EmotionalMotivationSectionProps) {
  const showGoldReason = heading === DEFAULT_HEADING;

  return (
    <section
      className={cn(
        "bg-uagc-navy py-14 sm:py-16 lg:py-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 xl:gap-16">
          <div>
            <span aria-hidden className="accent-bar mb-3" />
            <h2 className="font-heading text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.75rem] lg:text-[2.25rem]">
              {showGoldReason ? (
                <>
                  You&apos;ve Been Thinking About This for a{" "}
                  <span className="text-uagc-gold">Reason</span>
                </>
              ) : (
                heading
              )}
            </h2>
            <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-navy-muted sm:text-base">
              {body}
            </p>
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-uagc-gold px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-uagc-navy transition-colors duration-200 hover:bg-uagc-gold-dark sm:mt-8"
              >
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            )}
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="rounded-2xl border border-uagc-navy-card-border bg-uagc-navy-card p-6 sm:p-8">
              <Quote
                className="mb-4 size-8 text-uagc-gold"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="font-heading text-lg leading-relaxed text-white sm:text-xl lg:text-[1.375rem]">
                &ldquo;{pullQuote}&rdquo;
              </blockquote>
              {pullQuoteAttribution && (
                <p className="mt-4 text-sm font-medium text-uagc-navy-card-muted">
                  — {pullQuoteAttribution}
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { stat: "87%", label: "Pursued a degree for career growth" },
                { stat: "73%", label: "Earn more within 2 years of graduating" },
                { stat: "92%", label: "Would recommend UAGC to others" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative overflow-hidden rounded-xl border border-uagc-navy-card-border bg-uagc-navy-card px-3 py-4 text-center sm:px-4"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.75 bg-uagc-gold"
                  />
                  <p className="type-stat pt-1 text-lg text-uagc-gold sm:text-xl lg:text-2xl">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-[0.625rem] leading-snug text-uagc-navy-card-muted sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
