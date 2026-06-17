"use client";

import { ArrowRight, BookOpen, DollarSign, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SecondaryPath {
  icon: LucideIcon;
  title: string;
  detail: string;
  href: string;
}

const PATHS: SecondaryPath[] = [
  {
    icon: BookOpen,
    title: "Browse by area of study",
    detail: "Business, Education, Health Care, IT, Criminal Justice, and more",
    href: "#areas",
  },
  {
    icon: DollarSign,
    title: "Understand tuition and aid",
    detail: "$485/credit · 86% receive aid · GI Bill and payment plans accepted",
    href: "#tuition",
  },
  {
    icon: Route,
    title: "Plan your enrollment",
    detail: "Transfer credits, application steps, and funding options",
    href: "#journey",
  },
];

export function HubSecondaryPaths() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="border-y border-uagc-border bg-uagc-cream"
      aria-labelledby="hub-secondary-paths-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <p
          id="hub-secondary-paths-heading"
          className={cn(
            "pt-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-uagc-gray reveal-section",
            isVisible && "is-visible",
          )}
        >
          Still exploring?
        </p>

        <ul className="divide-y divide-uagc-border/80">
          {PATHS.map((path, index) => {
            const Icon = path.icon;
            return (
              <li
                key={path.href}
                className={cn(
                  "reveal-section",
                  `stagger-${index + 1}`,
                  isVisible && "is-visible",
                )}
              >
                <a
                  href={path.href}
                  className="group flex min-h-11 items-center gap-4 py-5 transition-colors duration-150 hover:bg-white/60 active:scale-99.5 sm:gap-5 sm:py-6"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-uagc-navy ring-1 ring-uagc-border transition-[transform,background-color] duration-150 group-hover:bg-uagc-navy group-hover:text-white group-hover:ring-uagc-navy">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-[0.9375rem] font-semibold text-uagc-navy sm:text-base">
                      {path.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-uagc-gray">
                      {path.detail}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-uagc-navy/30 transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-uagc-navy"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
