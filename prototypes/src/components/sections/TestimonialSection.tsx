"use client";

import { BadgeCheck, Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface Testimonial {
  quote: string;
  name: string;
  credential: string;
  tag?: string;
}

type TestimonialSectionBaseProps = {
  id?: string;
  heading: string;
  subheading?: string;
  className?: string;
};

export type TestimonialSectionProps = TestimonialSectionBaseProps &
  (
    | {
        testimonials: Testimonial[];
        quote?: never;
        name?: never;
        credential?: never;
        tag?: never;
      }
    | {
        testimonials?: never;
        quote: string;
        name: string;
        credential: string;
        tag?: string;
      }
  );

function StarRating() {
  return (
    <div className="flex gap-0.5" role="img" aria-label="5-star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-3.5 fill-uagc-yellow text-uagc-yellow"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  credential,
  tag,
  featured = false,
}: Testimonial & { featured?: boolean }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <blockquote
      className={cn(
        "group relative flex h-full flex-col rounded-xl border bg-white p-5 transition-shadow duration-200 sm:p-6",
        featured
          ? "border-uagc-sky/40 shadow-sm"
          : "border-gray-200 hover:shadow-md",
      )}
    >
      {tag && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-uagc-sky/10 px-3 py-1 text-xs font-semibold text-uagc-navy">
          {tag}
        </span>
      )}

      <Quote
        className="mb-3 size-5 text-uagc-navy/15"
        strokeWidth={1.5}
        aria-hidden
      />

      <p
        className={cn(
          "flex-1 leading-relaxed text-uagc-dark",
          featured ? "text-[0.9375rem] sm:text-base" : "text-sm sm:text-[0.9375rem]",
        )}
      >
        {quote}
      </p>

      <footer className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-uagc-navy font-heading text-xs font-bold text-white"
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <cite className="block truncate text-sm font-semibold not-italic text-uagc-navy">
              {name}
            </cite>
            <BadgeCheck
              className="size-3.5 shrink-0 fill-uagc-navy text-white"
              aria-label="Verified student"
            />
          </div>
          <p className="mt-0.5 truncate text-xs text-uagc-gray">{credential}</p>
          <div className="mt-1.5">
            <StarRating />
          </div>
        </div>
      </footer>
    </blockquote>
  );
}

function TestimonialGrid({
  heading,
  subheading,
  testimonials,
  className,
  id,
}: TestimonialSectionBaseProps & { testimonials: Testimonial[] }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "scroll-mt-28 section-pad bg-white lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={cn("mb-8 sm:mb-10 reveal-section", isVisible && "is-visible")}>
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          {subheading && (
            <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              {subheading}
            </p>
          )}
        </div>

        <div
          className={cn(
            "grid gap-4 sm:gap-5",
            testimonials.length === 2
              ? "sm:grid-cols-2"
              : testimonials.length >= 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "",
          )}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={cn("reveal-section", `stagger-${i + 1}`, isVisible && "is-visible")}
            >
              <TestimonialCard {...t} featured={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection(props: TestimonialSectionProps) {
  if ("testimonials" in props && props.testimonials) {
    return <TestimonialGrid {...props} testimonials={props.testimonials} />;
  }

  const { id, heading, subheading, quote, name, credential, tag, className } =
    props;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 section-pad bg-uagc-surface lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          {subheading && (
            <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              {subheading}
            </p>
          )}
          <div className="mt-8 sm:mt-10">
            <TestimonialCard
              quote={quote}
              name={name}
              credential={credential}
              tag={tag}
              featured
            />
          </div>
        </div>
      </div>
    </section>
  );
}
