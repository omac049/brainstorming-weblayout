"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HUB_TOP_DEGREES } from "@/lib/organic-online-degrees-data";

export type HubPopularProgramsVariant = "light" | "inverted";

export interface HubPopularProgramsProps {
  variant?: HubPopularProgramsVariant;
  className?: string;
}

function hubPopularShellClass(variant: HubPopularProgramsVariant): string {
  switch (variant) {
    case "light":
      return "border-b border-uagc-border bg-white py-5 sm:py-6";
    case "inverted":
      return "border-b border-white/10 bg-uagc-navy py-3 sm:py-3.5";
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function hubPopularTextClass(variant: HubPopularProgramsVariant): {
  body: string;
  label: string;
  link: string;
  separator: string;
  viewAll: string;
} {
  switch (variant) {
    case "light":
      return {
        body: "text-uagc-gray",
        label: "font-semibold text-uagc-navy",
        link: "font-medium text-uagc-navy underline-offset-2 transition-colors duration-150 hover:text-uagc-red hover:underline active:scale-99",
        separator: "text-uagc-border",
        viewAll:
          "font-semibold text-uagc-red underline-offset-2 transition-colors duration-150 hover:underline",
      };
    case "inverted":
      return {
        body: "text-uagc-navy-muted",
        label: "font-semibold text-white",
        link: "font-medium text-white underline-offset-2 transition-colors duration-150 hover:text-uagc-gold hover:underline active:scale-99",
        separator: "text-white/25",
        viewAll:
          "font-semibold text-uagc-gold underline-offset-2 transition-colors duration-150 hover:text-white hover:underline",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function HubPopularPrograms({
  variant = "light",
  className,
}: HubPopularProgramsProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const textClass = hubPopularTextClass(variant);

  return (
    <section
      ref={ref}
      className={cn(hubPopularShellClass(variant), className)}
      aria-label="Popular degree programs"
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 reveal-section",
          isVisible && "is-visible",
        )}
      >
        <p
          className={cn(
            "text-center text-sm leading-relaxed sm:text-[0.9375rem]",
            textClass.body,
          )}
        >
          <span className={textClass.label}>Popular programs:</span>{" "}
          {HUB_TOP_DEGREES.cards.map((card, index) => (
            <span key={card.href}>
              {index > 0 ? (
                <span
                  className={cn("mx-1.5", textClass.separator)}
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <Link
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={textClass.link}
              >
                {card.title.replace(/^Bachelor of Arts in /, "BA ")}
              </Link>
            </span>
          ))}
          <span className={cn("mx-1.5", textClass.separator)} aria-hidden>
            ·
          </span>
          <a href="#programs" className={textClass.viewAll}>
            View all 50+
          </a>
        </p>
      </div>
    </section>
  );
}
