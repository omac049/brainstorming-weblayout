"use client";

import { GraduationCap, Landmark, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AssetImage } from "@/components/shared/AssetImage";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StatHighlight {
  value: string;
  label: string;
}

interface FeatureRow {
  icon: LucideIcon;
  title: string;
  description: string;
}

const QUOTE =
  "I needed a university that understood my life outside the classroom and helped me keep moving forward.";

const STAT_HIGHLIGHTS: StatHighlight[] = [
  {
    value: "75%",
    label: "Max transfer\ncredits accepted",
  },
  {
    value: "5–6 wk",
    label: "Course terms —\nfaster progress",
  },
  {
    value: "$0",
    label: "Application\nfee",
  },
];

const FEATURE_ROWS: FeatureRow[] = [
  {
    icon: GraduationCap,
    title: "No Standardized Testing Required",
    description:
      "No GRE, GMAT, SAT, or ACT for undergraduate or graduate programs. Your experience matters more.",
  },
  {
    icon: Landmark,
    title: "Generous Transfer Credit Policy",
    description:
      "Up to 90 undergraduate credits accepted from regionally accredited schools. Your previous work counts.",
  },
  {
    icon: Users,
    title: "Dedicated 1:1 Student Support",
    description:
      "From enrollment through graduation, your advisor stays with you. The experience is online — the support is personal.",
  },
];

export interface WhyChooseSectionProps {
  id?: string;
  className?: string;
}

export function WhyChooseSection({
  id = "why-choose",
  className,
}: WhyChooseSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 overflow-hidden border-t border-uagc-border bg-uagc-surface section-pad lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-[72px]",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          {/* Mobile — single hero photo */}
          <div className="relative overflow-hidden rounded-2xl border border-uagc-border lg:hidden">
            <div className="relative aspect-[4/3]">
              <AssetImage
                src="/images/why-choose-graduate.jpg"
                alt="UAGC graduate smiling in cap and gown"
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-uagc-navy px-4 py-3">
              <p className="text-[13px] leading-snug text-white/90">
                &ldquo;{QUOTE}&rdquo;
              </p>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wide text-uagc-gold">
                UAGC Graduate
              </p>
            </div>
          </div>

          {/* Left — photo stack + quote badge */}
          <div className="relative hidden lg:block">
            <div className="relative pb-8 pr-8">
              <div className="absolute left-[-20px] top-7 z-[2] max-w-[220px] rounded-2xl border border-uagc-border bg-uagc-navy px-5 py-4">
                <p className="text-[13px] leading-snug text-white/90">
                  &ldquo;{QUOTE}&rdquo;
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-uagc-gold">
                  UAGC Graduate
                </p>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-uagc-border">
                <AssetImage
                  src="/images/why-choose-graduate.jpg"
                  alt="UAGC graduate smiling in cap and gown"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="absolute bottom-[-28px] right-[-28px] z-[1] w-[48%] overflow-hidden rounded-2xl border-2 border-white">
                <div className="relative aspect-[4/3]">
                  <AssetImage
                    src="/images/why-choose-studying.jpg"
                    alt="UAGC student studying online"
                    fill
                    sizes="(min-width: 1024px) 260px, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right — copy, stats, feature rows */}
          <div className="min-w-0 lg:pl-2">
            <span aria-hidden className="mb-3 accent-bar" />
            <h2 id={`${id}-heading`} className="type-h2 text-uagc-navy">
              Online Programs Designed to Help You Move Forward
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              At UAGC, you&rsquo;ll find a quality educational experience built
              around your career goals, your schedule, and your life.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {STAT_HIGHLIGHTS.map((stat, index) => (
                <article
                  key={stat.label}
                  className={cn(
                    "group relative flex-1 overflow-hidden rounded-2xl border border-uagc-border bg-white px-5 py-[18px] text-center transition-all duration-200 hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
                    `stagger-${index + 1}`,
                    isVisible && "is-visible",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-uagc-gold transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <p className="type-stat text-[1.75rem] text-uagc-navy sm:text-[2rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-xs leading-snug text-uagc-gray">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3">
              {FEATURE_ROWS.map((row, index) => {
                const Icon = row.icon;
                return (
                  <article
                    key={row.title}
                    className={cn(
                      "group relative flex items-start gap-3.5 overflow-hidden rounded-2xl border border-uagc-border bg-white px-4 py-3.5 transition-all duration-200 hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)] sm:gap-4 sm:px-4 sm:py-4",
                      `stagger-${index + 1}`,
                      isVisible && "is-visible",
                    )}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-uagc-gold transition-transform duration-300 group-hover:scale-x-100"
                    />
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-uagc-surface text-uagc-navy transition-colors duration-200 group-hover:bg-[#fdf3e0] group-hover:text-uagc-gold sm:size-10">
                      <Icon className="size-[18px] sm:size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-sm font-semibold leading-snug text-uagc-navy sm:text-base">
                        {row.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-uagc-gray sm:text-sm">
                        {row.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
