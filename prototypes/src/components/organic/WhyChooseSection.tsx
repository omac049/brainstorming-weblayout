"use client";

import { GraduationCap, Landmark, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { AssetImage } from "@/components/shared/AssetImage";
import { cn } from "@/lib/utils";

interface StatHighlight {
  value: ReactNode;
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
    value: (
      <>
        75<em className="not-italic text-uagc-gold">%</em>
      </>
    ),
    label: "Max transfer\ncredits accepted",
  },
  {
    value: (
      <>
        5–6<em className="ml-0.5 text-base not-italic tracking-normal text-uagc-navy"> wk</em>
      </>
    ),
    label: "Course terms —\nfaster progress",
  },
  {
    value: (
      <>
        <em className="not-italic text-uagc-gold">$</em>0
      </>
    ),
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
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 overflow-hidden bg-[#faf9f7] section-pad lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
          {/* Mobile — single hero photo (desktop keeps stacked layout) */}
          <div className="relative overflow-hidden rounded-xl lg:hidden">
            <div className="relative aspect-[4/3]">
              <AssetImage
                src="/images/why-choose-graduate.jpg"
                alt="UAGC graduate smiling in cap and gown"
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-uagc-navy/90 px-4 py-3 backdrop-blur-sm">
              <p className="text-[13px] italic leading-snug text-white/90">
                &ldquo;{QUOTE}&rdquo;
              </p>
              <p className="mt-1.5 text-[11px] font-bold tracking-wide text-uagc-gold">
                UAGC Graduate
              </p>
            </div>
          </div>

          {/* Left — photo stack + quote badge (homepage-mock pattern) */}
          <div className="relative hidden lg:block">
            <div className="relative pb-8 pr-8">
              <div className="why-quote-badge absolute left-[-20px] top-7 z-[2] max-w-[220px] rounded-lg bg-uagc-navy px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.22)]">
                <p className="text-[13px] italic leading-snug text-white/80">
                  &ldquo;{QUOTE}&rdquo;
                </p>
                <p className="mt-2 text-[11px] font-bold tracking-wide text-uagc-gold">
                  UAGC Graduate
                </p>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <AssetImage
                  src="/images/why-choose-graduate.jpg"
                  alt="UAGC graduate smiling in cap and gown"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="absolute bottom-[-28px] right-[-28px] z-[1] w-[48%] overflow-hidden rounded-lg border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
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
            <p className="text-xs font-bold uppercase tracking-widest text-uagc-gold">
              Why Choose UAGC
            </p>
            <h2 className="type-h2 mt-2 text-uagc-navy">
              Online programs designed to help you{" "}
              <em className="not-italic text-uagc-gold">move forward.</em>
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              At UAGC, you&rsquo;ll find a quality educational experience built
              around your career goals, your schedule, and your life.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-6">
              {STAT_HIGHLIGHTS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 rounded-lg border border-uagc-border bg-white px-5 py-[18px] text-center"
                >
                  <p className="font-heading-condensed text-[2.25rem] font-extrabold leading-none tracking-tight text-uagc-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-xs leading-snug text-uagc-gray">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3">
              {FEATURE_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.title}
                    className="flex items-start gap-3.5 rounded-lg border border-uagc-border bg-white px-4 py-3.5 transition-colors hover:border-uagc-navy hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:gap-4 sm:px-4 sm:py-4"
                  >
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded bg-uagc-navy/[0.07] text-uagc-navy">
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-uagc-navy">
                        {row.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-uagc-gray">
                        {row.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
