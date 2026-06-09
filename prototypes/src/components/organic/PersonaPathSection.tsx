"use client";

import { ArrowRight } from "lucide-react";

import { AssetImage } from "@/components/shared/AssetImage";
import { cn } from "@/lib/utils";

interface PersonaPath {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const PATHS: PersonaPath[] = [
  {
    title: "Working Adults",
    description:
      "Advance your career with in-demand skills and a schedule that works around your life.",
    imageSrc: "/images/path-working-adults.jpg",
    imageAlt: "Working adult student",
    href: "#programs",
  },
  {
    title: "Military & Veterans",
    description:
      "We proudly support those who serve and their families — with education benefits and flexible scheduling.",
    imageSrc: "/images/path-military.jpg",
    imageAlt: "Military student",
    href: "#programs",
  },
  {
    title: "Transfer Students",
    description:
      "Transfer credits that count — get closer to your degree, faster. Free evaluation before you apply.",
    imageSrc: "/images/path-transfer.jpg",
    imageAlt: "Transfer student",
    href: "#programs",
  },
  {
    title: "Career Advancement",
    description:
      "Choose programs aligned with professional growth and in-demand skills employers value.",
    imageSrc: "/images/path-career.jpg",
    imageAlt: "Career advancement student",
    href: "#programs",
  },
];

export interface PersonaPathSectionProps {
  id?: string;
  className?: string;
  viewAllHref?: string;
}

export function PersonaPathSection({
  id = "paths",
  className,
  viewAllHref = "#programs",
}: PersonaPathSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-uagc-border bg-white section-pad lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div>
            <span aria-hidden className="mb-3 accent-bar" />
            <h2 className="type-h2 text-uagc-navy">Find the Path That Fits You</h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              Whether you&rsquo;re balancing work, military service, or transfer credits — explore paths built for where you are now.
            </p>
          </div>
          <a
            href={viewAllHref}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-uagc-red transition-colors hover:underline"
          >
            View All Paths
            <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
          </a>
        </div>

        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((path) => (
            <a
              key={path.title}
              href={path.href}
              className={cn(
                "group relative block cursor-pointer overflow-hidden rounded-2xl border border-uagc-border bg-white no-underline transition-all duration-200",
                "hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
              )}
            >
              <div className="relative h-40 overflow-hidden sm:h-[175px]">
                <AssetImage
                  src={path.imageSrc}
                  alt={path.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 75vw"
                  className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-[18px] pb-[18px] pt-5">
                <h3 className="type-h5 text-uagc-navy">
                  {path.title}
                </h3>
                <p className="mb-3.5 mt-1.5 text-[13px] leading-relaxed text-uagc-gray">
                  {path.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-uagc-red transition-all duration-200 group-hover:gap-2">
                  Explore Your Path
                  <ArrowRight className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
