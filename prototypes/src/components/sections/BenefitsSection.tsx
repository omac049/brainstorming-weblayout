import { AssetImage } from "@/components/shared/AssetImage";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  type LucideIcon,
  Monitor,
  Target,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface BenefitItem {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface BenefitsSectionProps {
  heading: string;
  subtitle?: string;
  benefits: BenefitItem[];
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundColor?: "white" | "beige" | "navy";
  className?: string;
}

const FALLBACK_ICONS: LucideIcon[] = [
  GraduationCap,
  Clock,
  Calendar,
  Monitor,
  Users,
  BookOpen,
  Target,
];

function resolveIcon(item: BenefitItem, index: number): LucideIcon {
  if (item.icon) return item.icon;

  const t = item.title.toLowerCase();
  if (/(accelerat|fast|week|pace|quick|speed)/.test(t)) return Clock;
  if (/(flex|balance|schedule|time)/.test(t)) return Calendar;
  if (/(online|digital|platform|technology|24\/7)/.test(t)) return Monitor;
  if (/(degree|bachelor|master|program|course)/.test(t)) return GraduationCap;
  if (/(career|job|outcome|goal|future)/.test(t)) return Target;
  if (/(faculty|instructor|learn|teach)/.test(t)) return Users;
  if (/(study|education|knowledge)/.test(t)) return BookOpen;

  return FALLBACK_ICONS[index % FALLBACK_ICONS.length]!;
}

const bgStyles = {
  white: "bg-white",
  beige: "bg-uagc-surface",
  navy: "bg-uagc-navy",
} as const;

const headingColor = {
  white: "text-uagc-gold",
  beige: "text-uagc-gold",
  navy: "text-white",
} as const;

const subtitleColor = {
  white: "text-uagc-gray",
  beige: "text-uagc-gray",
  navy: "text-white/90",
} as const;

const accentBar = {
  white: "bg-uagc-gold",
  beige: "bg-uagc-gold",
  navy: "bg-white/80",
} as const;

const cardBg = {
  white: "bg-uagc-surface",
  beige: "bg-white",
  navy: "bg-white/10",
} as const;

const cardBorder = {
  white: "border-gray-100",
  beige: "border-gray-100",
  navy: "border-white/10",
} as const;

const titleColor = {
  white: "text-uagc-gold",
  beige: "text-uagc-gold",
  navy: "text-white",
} as const;

const descColor = {
  white: "text-uagc-gray",
  beige: "text-uagc-gray",
  navy: "text-white/85",
} as const;

const iconColor = {
  white: "text-uagc-red",
  beige: "text-uagc-red",
  navy: "text-white",
} as const;

export function BenefitsSection({
  heading,
  subtitle,
  benefits,
  image,
  imageAlt = "",
  ctaText,
  ctaHref,
  backgroundColor = "white",
  className,
}: BenefitsSectionProps) {
  const bg = backgroundColor;
  const isNavy = bg === "navy";
  const hasImage = Boolean(image);

  return (
    <section className={cn(bgStyles[bg], "section-pad", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <span
            aria-hidden
            className={cn("mb-3 block h-0.75 w-10", accentBar[bg])}
          />
          <h2 className={cn("type-h2", headingColor[bg])}>
            {heading}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "mt-3 max-w-2xl text-base leading-relaxed sm:text-lg",
                subtitleColor[bg]
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Content: cards + optional image */}
        <div
          className={cn(
            "grid items-start gap-8",
            hasImage && "lg:grid-cols-[1fr_auto] lg:gap-12"
          )}
        >
          {/* Benefit cards grid */}
          <div
            className={cn(
              "grid gap-4",
              benefits.length <= 3
                ? "sm:grid-cols-1"
                : "sm:grid-cols-2 lg:grid-cols-2"
            )}
          >
            {benefits.map((item, i) => {
              const Icon = resolveIcon(item, i);
              return (
                <article
                  key={item.title}
                  className={cn(
                    "flex gap-4 rounded-xl border p-4 sm:p-5",
                    "transition-colors duration-200",
                    cardBg[bg],
                    cardBorder[bg]
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg sm:size-11",
                      isNavy ? "bg-white/10" : "bg-uagc-red/8"
                    )}
                    aria-hidden
                  >
                    <Icon
                      className={cn("size-5 sm:size-6", iconColor[bg])}
                      strokeWidth={1.75}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={cn(
                        "font-heading text-base font-semibold leading-snug sm:text-lg",
                        titleColor[bg]
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-sm leading-relaxed sm:text-base",
                        descColor[bg]
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Optional image */}
          {hasImage && image && (
            <div className="relative hidden w-full max-w-md lg:block">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <AssetImage
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {ctaText && ctaHref && (
          <div className="mt-8 sm:mt-10">
            <a
              href={ctaHref}
              className={cn(
                "cta-primary"
              )}
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
