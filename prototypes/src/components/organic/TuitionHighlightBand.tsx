import { DollarSign, Award, Shield, CreditCard } from "lucide-react";

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

export function TuitionHighlightBand() {
  return (
    <section
      className="bg-uagc-navy py-10 sm:py-12"
      aria-label="Tuition highlights"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, stat, label, detail }) => (
            <div
              key={stat}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-5"
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
                <p className="mt-0.5 text-sm font-semibold text-white/80">
                  {label}
                </p>
                <p className="mt-1 text-xs text-white/50">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
