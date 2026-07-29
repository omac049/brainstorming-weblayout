"use client";

import {
  ArrowRight,
  ArrowRightLeft,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  Check,
  Clock,
  DollarSign,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface HighlightCard {
  title: string;
  description: string;
  /** Large stat shown above the title (e.g. "$0", "5 wk") */
  stat?: string;
}

export interface ExperienceCallout {
  heading: string;
  description: string;
  outcomes: Array<{ stat: string; label: string }>;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ValuePropsSectionProps {
  heading: string;
  subheading?: string;
  highlightCards?: HighlightCard[];
  experienceCallout?: ExperienceCallout;
  bulletPoints?: Array<{ title: string; description: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  id?: string;
  className?: string;
}

const ICON_MAP: Array<{ pattern: RegExp; icon: LucideIcon }> = [
  { pattern: /(transfer|credit.*toward|generous)/i, icon: ArrowRightLeft },
  { pattern: /(sat|gmat|gre|act|required|test)/i, icon: ShieldCheck },
  { pattern: /(week|class|schedule|time|calendar|start)/i, icon: Calendar },
  { pattern: /(\$|fee|cost|price|tuition|application)/i, icon: DollarSign },
  { pattern: /(accredit|wscuc|quality)/i, icon: Award },
  { pattern: /(work.life|prior.*learning|experience)/i, icon: BriefcaseBusiness },
  { pattern: /(flexible|convenient|balance)/i, icon: Clock },
  { pattern: /(promise|risk.free|3.*week)/i, icon: ShieldCheck },
  { pattern: /(tech|platform|24.7|online.*classroom)/i, icon: Laptop },
  { pattern: /(faculty|instructor|learn.*from|best)/i, icon: GraduationCap },
];

const FALLBACK_ICONS: LucideIcon[] = [GraduationCap, Calendar, DollarSign, BookOpen];

function pickIcon(text: string, index: number): LucideIcon {
  for (const { pattern, icon } of ICON_MAP) {
    if (pattern.test(text)) return icon;
  }
  return FALLBACK_ICONS[index % FALLBACK_ICONS.length] ?? BookOpen;
}

export function ValuePropsSection({
  heading,
  subheading,
  highlightCards,
  experienceCallout,
  bulletPoints,
  ctaLabel,
  ctaHref,
  id,
  className,
}: ValuePropsSectionProps) {
  const cards = highlightCards ?? [];
  const bullets = bulletPoints ?? [];
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id={id} className={cn("section-pad bg-uagc-surface", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={cn("mb-8 sm:mb-10 lg:mb-12 reveal-section", isVisible && "is-visible")}>
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          {subheading && (
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              {subheading}
            </p>
          )}
        </div>

        {cards.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-2 gap-3 sm:gap-4",
              cards.length === 1 && "grid-cols-1 max-w-md",
              cards.length === 2 && "sm:grid-cols-2",
              cards.length === 3 && "lg:grid-cols-3",
              cards.length >= 4 && "lg:grid-cols-4",
            )}
          >
            {cards.map((card, index) => {
              const Icon = pickIcon(card.title, index);
              return (
                <article
                  key={card.title}
                  className={cn(
                    "reveal-section group relative flex flex-col overflow-hidden rounded-2xl border border-uagc-border bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-uagc-navy/40 hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)] sm:p-6",
                    `stagger-${index + 1}`,
                    isVisible && "is-visible",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.75 origin-left scale-x-0 bg-uagc-red transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <span
                    className="mb-3 flex size-9 shrink-0 items-center justify-center rounded-xl bg-uagc-surface text-uagc-navy transition-colors duration-200 group-hover:bg-uagc-sky/15 group-hover:text-uagc-navy sm:mb-4 sm:size-11"
                    aria-hidden
                  >
                    <Icon className="size-4 sm:size-5" strokeWidth={1.75} />
                  </span>
                  {card.stat && (
                    <p className="type-stat mb-1 text-[1.75rem] text-uagc-navy sm:mb-2 sm:text-[2.5rem]">
                      {card.stat}
                    </p>
                  )}
                  <h3 className="font-heading text-sm font-semibold leading-snug text-uagc-navy sm:text-base">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-uagc-gray sm:mt-2 sm:text-sm">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {experienceCallout && (
          <div className="group/callout mt-6 rounded-2xl bg-uagc-navy sm:mt-8">
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 sm:size-12"
                  aria-hidden
                >
                  <Sparkles className="size-4 text-white sm:size-5" strokeWidth={1.75} />
                </span>
                <h3 className="type-h5 text-white">
                  {experienceCallout.heading}
                </h3>
              </div>
              <p className="mt-3 max-w-2xl text-[0.8125rem] leading-relaxed text-white/80 sm:mt-4 sm:text-[0.9375rem]">
                {experienceCallout.description}
              </p>
              {experienceCallout.ctaLabel && experienceCallout.ctaHref && (
                <a
                  href={experienceCallout.ctaHref}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-uagc-navy px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-uagc-navy-dark sm:mt-6"
                >
                  {experienceCallout.ctaLabel}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/callout:translate-x-0.5" strokeWidth={2.5} aria-hidden />
                </a>
              )}

              <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
                {experienceCallout.outcomes.map((outcome) => (
                  <div
                    key={outcome.label}
                    className="rounded-xl border border-white/15 bg-white/10 px-3 py-4 text-center sm:px-6 sm:py-6 sm:text-left"
                  >
                    <p className="type-stat text-lg text-uagc-sky sm:text-xl lg:text-2xl">
                      {outcome.stat}
                    </p>
                    <p className="mt-1 text-xs font-medium leading-snug text-white/80 sm:mt-2 sm:text-sm">
                      {outcome.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {bullets.length > 0 && (
          <div className={cn((cards.length > 0 || experienceCallout) && "mt-8 border-t border-uagc-border pt-8 sm:mt-10 sm:pt-10")}>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {bullets.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span
                    className="mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug text-uagc-navy">
                      {point.title}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-uagc-gray sm:text-sm">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {ctaLabel && ctaHref && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <a href={ctaHref} className="cta-primary">
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
