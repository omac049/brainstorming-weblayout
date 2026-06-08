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
            <p className="text-xs font-bold uppercase tracking-widest text-uagc-gold">
              Built for Your Journey
            </p>
            <h2 className="type-h2 mt-2 text-uagc-navy">
              Find the Path That Fits You
            </h2>
          </div>
          <a
            href={viewAllHref}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-uagc-gold transition-colors hover:text-uagc-navy"
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
                "group block cursor-pointer overflow-hidden rounded-xl border border-uagc-border bg-white no-underline transition-all duration-200",
                "hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]",
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
                <div
                  className="absolute inset-0 bg-gradient-to-t from-uagc-navy/35 via-transparent to-transparent"
                  aria-hidden
                />
              </div>

              <div className="px-[18px] pb-[18px] pt-[26px]">
                <h3 className="font-heading text-[1.3125rem] font-bold leading-tight text-uagc-navy">
                  {path.title}
                </h3>
                <p className="mb-3.5 mt-1.5 text-[13px] leading-relaxed text-uagc-gray">
                  {path.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[13px] font-bold text-uagc-gold transition-all duration-200 group-hover:gap-2">
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
