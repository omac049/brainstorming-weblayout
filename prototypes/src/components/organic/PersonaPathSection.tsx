"use client";

import { ArrowRight } from "lucide-react";

import { AssetImage } from "@/components/shared/AssetImage";
import { cn } from "@/lib/utils";

export interface PersonaPath {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const DEFAULT_PATHS: PersonaPath[] = [
  {
    title: "Working Adults",
    description:
      "In-demand skills on a schedule that works around your life.",
    imageSrc: "/images/path-working-adults.jpg",
    imageAlt: "Working adult student",
    href: "#programs",
  },
  {
    title: "Military & Veterans",
    description:
      "Education benefits and flexible scheduling for those who serve.",
    imageSrc: "/images/path-military.jpg",
    imageAlt: "Military student",
    href: "#programs",
  },
  {
    title: "Transfer Students",
    description:
      "Your credits count — free evaluation before you apply.",
    imageSrc: "/images/path-transfer.jpg",
    imageAlt: "Transfer student",
    href: "#programs",
  },
  {
    title: "Career Advancement",
    description:
      "Programs aligned with professional growth employers value.",
    imageSrc: "/images/path-career.jpg",
    imageAlt: "Career advancement student",
    href: "#programs",
  },
];

export type PersonaPathSectionVariant = "light" | "surface" | "inverted";

export interface PersonaPathSectionProps {
  id?: string;
  className?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  paths?: readonly PersonaPath[];
  heading?: string;
  subheading?: string;
  variant?: PersonaPathSectionVariant;
  /** Removes top border/padding when stacked directly under inverted HUB-POPULAR. */
  joinedTop?: boolean;
}

function personaPathSectionShellClass(variant: PersonaPathSectionVariant): string {
  switch (variant) {
    case "light":
      return "border-t border-uagc-border bg-white";
    case "surface":
      return "border-t border-uagc-border bg-uagc-surface";
    case "inverted":
      return "border-t border-white/10 bg-uagc-navy";
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function personaPathHeaderClass(variant: PersonaPathSectionVariant): {
  heading: string;
  subheading: string;
  viewAll: string;
} {
  switch (variant) {
    case "light":
    case "surface":
      return {
        heading: "text-uagc-navy",
        subheading: "text-uagc-gray",
        viewAll:
          "text-uagc-red transition-colors hover:underline focus-visible:outline-uagc-navy",
      };
    case "inverted":
      return {
        heading: "text-white",
        subheading: "text-uagc-navy-muted",
        viewAll:
          "text-uagc-sky transition-colors hover:text-white hover:underline focus-visible:outline-uagc-sky",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function PersonaPathSection({
  id = "paths",
  className,
  viewAllHref = "#programs",
  viewAllLabel = "View All Paths",
  paths = DEFAULT_PATHS,
  heading = "Find the Path That Fits You",
  subheading = "Explore paths built for where you are now.",
  variant = "light",
  joinedTop = false,
}: PersonaPathSectionProps) {
  const headerClass = personaPathHeaderClass(variant);

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 py-14 sm:py-16 lg:scroll-mt-36 lg:py-20",
        personaPathSectionShellClass(variant),
        joinedTop && variant === "inverted" && "border-t-0 pt-0!",
        className,
      )}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <span aria-hidden className="mb-3 accent-bar" />
            <h2 id={`${id}-heading`} className={cn("type-h2", headerClass.heading)}>
              {heading}
            </h2>
            <p
              className={cn(
                "mt-2 max-w-lg text-[0.875rem] leading-relaxed sm:text-[0.9375rem]",
                headerClass.subheading,
              )}
            >
              {subheading}
            </p>
          </div>
          <a
            href={viewAllHref}
            className={cn(
              "hidden shrink-0 items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex",
              headerClass.viewAll,
            )}
          >
            {viewAllLabel}
            <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((path) => (
            <a
              key={path.title}
              href={path.href}
              className={cn(
                "group relative block cursor-pointer overflow-hidden rounded-xl border bg-white no-underline",
                "transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "hover:border-uagc-navy/40/60 hover:shadow-[0_2px_12px_rgba(12,35,75,0.06)] active:scale-[0.98]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy",
                variant === "inverted" && "border-white/15",
                (variant === "light" || variant === "surface") && "border-uagc-border",
              )}
            >
              <div className="relative h-28 overflow-hidden sm:h-32">
                <AssetImage
                  src={path.imageSrc}
                  alt={path.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 75vw"
                  className="object-cover object-[center_20%] transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-semibold leading-tight text-uagc-navy">
                    {path.title}
                  </h3>
                  <p className="mt-1 truncate text-[0.8125rem] leading-snug text-uagc-gray">
                    {path.description}
                  </p>
                </div>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-uagc-navy/5 transition-[background-color,transform] duration-200 group-hover:bg-uagc-navy/15 group-hover:translate-x-0.5">
                  <ArrowRight className="size-3.5 text-uagc-navy transition-colors duration-200 group-hover:text-uagc-sky" strokeWidth={2} aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          href={viewAllHref}
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:hidden",
            headerClass.viewAll,
          )}
        >
          {viewAllLabel}
          <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
        </a>
      </div>
    </section>
  );
}
