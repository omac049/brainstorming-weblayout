import {
  Award,
  Users,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface QualityPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PILLARS: QualityPillar[] = [
  {
    icon: Award,
    title: "Academic Quality",
    description:
      "Faculty expertise and academic standards supported by a respected university family.",
  },
  {
    icon: Users,
    title: "Student Support",
    description:
      "Dedicated advisors and resources with you from day one through graduation.",
  },
  {
    icon: ShieldCheck,
    title: "Regional Accreditation",
    description:
      "Accredited by WSCUC and recognized by employers, graduate schools, and licensing boards.",
  },
];

const ACCREDITATION_BADGES = [
  "WSCUC",
  "CAHIIM",
  "ABET",
  "CCNE",
  "IACBE",
];

export interface AccreditationSectionProps {
  id?: string;
  className?: string;
}

export function AccreditationSection({
  id = "accreditation",
  className,
}: AccreditationSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 section-pad bg-uagc-navy lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="lg:max-w-[480px] lg:shrink-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-uagc-gold">
              A Degree Built for Real Life
            </p>
            <h2 className="type-h2 text-white">
              The confidence of a respected{" "}
              <em className="not-italic text-uagc-gold">university family.</em>
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80">
              Adult learners choose UAGC because they need:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Flexible online learning that fits your schedule",
                "Support from enrollment through graduation",
                "A respected, regionally accredited degree",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-white/90"
                >
                  <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-uagc-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-3 lg:gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-5"
                >
                  <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-uagc-gold/20 text-uagc-gold">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-heading text-[0.9375rem] font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-5">
          <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-white/50">
            Accredited &amp; Recognized
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {ACCREDITATION_BADGES.map((badge) => (
              <div
                key={badge}
                className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[0.6875rem] font-bold tracking-wide text-white/80 sm:size-16 sm:text-xs"
              >
                {badge}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-white/50">
            UAGC maintains institutional accreditation and several programmatic
            accreditations that reflect a commitment to academic quality and
            continuous improvement.
          </p>
        </div>
      </div>
    </section>
  );
}
