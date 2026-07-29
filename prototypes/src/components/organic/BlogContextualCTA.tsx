import Link from "next/link";
import { ArrowRight, GraduationCap, Shield, Briefcase, BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

type CTAVariant = "default" | "military" | "business" | "education";

interface BlogContextualCTAProps {
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  variant?: CTAVariant;
  className?: string;
}

const VARIANT_CONFIG: Record<
  CTAVariant,
  { gradient: string; iconBg: string; btn: string; icon: typeof GraduationCap }
> = {
  default: {
    gradient: "from-uagc-navy via-uagc-navy to-[#162d5a]",
    iconBg: "bg-uagc-sky/10",
    btn: "bg-uagc-red hover:bg-uagc-red/90 text-white",
    icon: GraduationCap,
  },
  military: {
    gradient: "from-uagc-navy via-[#0e2a52] to-[#14365f]",
    iconBg: "bg-white/10",
    btn: "bg-white hover:bg-white/90 text-uagc-navy",
    icon: Shield,
  },
  business: {
    gradient: "from-uagc-navy via-uagc-navy to-[#162d5a]",
    iconBg: "bg-uagc-sky/10",
    btn: "bg-uagc-red hover:bg-uagc-red/90 text-white",
    icon: Briefcase,
  },
  education: {
    gradient: "from-uagc-navy via-[#0e2a52] to-[#14365f]",
    iconBg: "bg-emerald-400/15",
    btn: "bg-uagc-red hover:bg-uagc-red/90 text-white",
    icon: BookOpen,
  },
};

export function BlogContextualCTA({
  headline,
  description,
  ctaText,
  ctaHref,
  variant = "default",
  className,
}: BlogContextualCTAProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <aside
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        className,
      )}
      data-module="blog-contextual-cta"
      data-variant={variant}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          config.gradient,
        )}
      />

      {/* Subtle decorative accent */}
      <div className="absolute -right-8 -top-8 size-40 rounded-full bg-uagc-sky/10" />
      <div className="absolute -bottom-6 -left-6 size-32 rounded-full bg-white/[0.03]" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Icon accent */}
          <div
            className={cn(
              "hidden shrink-0 items-center justify-center rounded-xl p-3 sm:flex",
              config.iconBg,
            )}
          >
            <Icon className="size-5 text-uagc-navy" aria-hidden />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className="font-['Fira_Sans',sans-serif] text-[1.125rem] font-bold leading-snug text-white sm:text-[1.25rem]"
              style={{ textWrap: "balance" }}
            >
              {headline}
            </h3>
            <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/75 sm:text-[0.9375rem]">
              {description}
            </p>

            <Link
              href={ctaHref}
              className={cn(
                "mt-5 inline-flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-[0.8125rem] font-bold tracking-wide transition-all duration-200",
                config.btn,
              )}
              data-ga4-event="blog_contextual_cta_click"
              data-ga4-cta-variant={variant}
            >
              {ctaText}
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Top accent bar */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-uagc-red via-uagc-red/60 to-transparent" />
    </aside>
  );
}
