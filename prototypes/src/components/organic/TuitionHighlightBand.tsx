"use client";

import { DollarSign, Award, Shield, CreditCard } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HIGHLIGHTS = [
  {
    icon: DollarSign,
    stat: "$485",
    label: "per credit hour",
    detail: "Undergraduate · payment plans available",
  },
  {
    icon: Award,
    stat: "86%",
    label: "receive financial aid",
    detail: "Grants, scholarships & employer tuition programs",
  },
  {
    icon: Shield,
    stat: "GI Bill",
    label: "& military benefits accepted",
    detail: "TA, MyCAA, and military spouse support",
  },
  {
    icon: CreditCard,
    stat: "$0",
    label: "application fee",
    detail: "Apply free — no obligation to enroll",
  },
] as const;

interface TuitionHighlightBandProps {
  id?: string;
}

export function TuitionHighlightBand({ id = "tuition" }: TuitionHighlightBandProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className="scroll-mt-20 bg-uagc-navy py-10 sm:py-12"
      aria-label="Tuition highlights"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, stat, label, detail }, i) => (
            <div
              key={stat}
              className={cn(
                "flex items-start gap-4 rounded-xl border border-white/10 bg-white/4 px-5 py-5 reveal-section",
                `stagger-${i + 1}`,
                isVisible && "is-visible",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-uagc-gold/15">
                <Icon
                  className="size-5 text-uagc-gold"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <div>
                <p className="font-heading text-2xl font-bold leading-none text-white">
                  {stat}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white/90">
                  {label}
                </p>
                <p className="mt-1 text-xs text-uagc-navy-muted">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
