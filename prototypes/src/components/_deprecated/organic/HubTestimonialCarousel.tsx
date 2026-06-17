"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useState } from "react";

import { HUB_TESTIMONIALS } from "@/lib/organic-online-degrees-data";
import { cn } from "@/lib/utils";

export interface HubTestimonialCarouselProps {
  id?: string;
  className?: string;
}

export function HubTestimonialCarousel({
  id = "stories",
  className,
}: HubTestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = HUB_TESTIMONIALS.length;
  const active = HUB_TESTIMONIALS[activeIndex];

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index === 0 ? total - 1 : index - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index === total - 1 ? 0 : index + 1));
  }, [total]);

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 section-pad bg-uagc-cream", className)}
      aria-labelledby="hub-testimonials-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="hub-testimonials-heading" className="type-h2 text-uagc-navy">
            What Our Students Think
          </h2>
        </div>

        <div className="relative mx-auto mt-10 max-w-3xl">
          <blockquote className="rounded-2xl border border-uagc-border bg-white p-6 sm:p-8">
            <p className="text-[1.0625rem] leading-[1.7] text-uagc-dark sm:text-lg">
              &ldquo;{active.quote}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-4 border-t border-uagc-beige pt-6">
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-uagc-navy font-heading text-sm font-bold text-white"
              >
                {active.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <cite className="block font-heading text-base font-semibold not-italic text-uagc-navy">
                  {active.name}
                </cite>
                <p className="mt-0.5 text-sm text-uagc-gray">{active.credential}</p>
                <div className="mt-1.5 flex gap-0.5" role="img" aria-label="5-star rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-3.5 fill-uagc-gold text-white"
                      strokeWidth={0}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </footer>
          </blockquote>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-uagc-border bg-white text-uagc-navy hover:border-uagc-navy"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {HUB_TESTIMONIALS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "size-2.5 rounded-full transition-colors",
                    index === activeIndex ? "bg-uagc-navy" : "bg-uagc-border",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-uagc-border bg-white text-uagc-navy hover:border-uagc-navy"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
