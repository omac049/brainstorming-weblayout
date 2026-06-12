import { cn } from "@/lib/utils";

export interface WaysToSaveAdvisorCtaProps {
  href: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  className?: string;
}

export function WaysToSaveAdvisorCta({
  href,
  heading = "Not sure what you qualify for?",
  subheading = "An advisor can build a personalized financial plan — no obligation, no cost.",
  ctaLabel = "Talk to an Advisor",
  className,
}: WaysToSaveAdvisorCtaProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-uagc-gold/30 bg-uagc-cream p-5 sm:p-6",
        "text-center lg:text-left",
        className,
      )}
    >
      <p className="text-sm font-semibold text-uagc-navy sm:text-[0.9375rem]">
        {heading}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-uagc-gray">{subheading}</p>
      <a
        href={href}
        className={cn(
          "cta-primary mt-4 inline-flex text-sm",
          "transition-transform duration-150 ease-out active:scale-98",
        )}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
