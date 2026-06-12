"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { AssetImage } from "@/components/shared/AssetImage";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface InterestArea {
  name: string;
  programCount: number;
  imageSrc: string;
  imageAlt: string;
  href: string;
  imagePosition?: string;
}

/** Homepage grid — 7 areas + discovery card in row 2, column 4. */
export const DEFAULT_INTEREST_AREAS: InterestArea[] = [
  {
    name: "Business",
    programCount: 19,
    imageSrc: "/images/interest-business.jpg",
    imageAlt: "Business programs at UAGC",
    href: "#programs",
  },
  {
    name: "Criminal Justice",
    programCount: 3,
    imageSrc: "/images/interest-criminal-justice.jpg",
    imageAlt: "Criminal justice programs at UAGC",
    href: "#programs",
  },
  {
    name: "Education",
    programCount: 13,
    imageSrc: "/images/interest-education.jpg",
    imageAlt: "Education programs at UAGC",
    href: "#programs",
  },
  {
    name: "Health Care",
    programCount: 7,
    imageSrc: "/images/interest-health-care.jpg",
    imageAlt: "Health care programs at UAGC",
    href: "#programs",
  },
  {
    name: "Information Technology",
    programCount: 6,
    imageSrc: "/images/interest-information-technology.jpg",
    imageAlt: "Information technology programs at UAGC",
    href: "#programs",
  },
  {
    name: "Liberal Arts",
    programCount: 4,
    imageSrc: "/images/interest-liberal-arts.jpg",
    imageAlt: "Liberal arts programs at UAGC",
    href: "#programs",
  },
  {
    name: "Social & Behavioral Sciences",
    programCount: 6,
    imageSrc: "/images/interest-social-behavioral.jpg",
    imageAlt: "Social and behavioral sciences programs at UAGC",
    href: "#programs",
  },
];

function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("//");
}

/** Matches homepage InterestAreaGrid placement for 7 areas + discovery. */
function areaGridItemClass(index: number, areaCount: number): string | undefined {
  if (areaCount !== 7) return undefined;

  switch (index) {
    case 4:
      return "lg:col-start-1";
    case 5:
      return "lg:col-start-2";
    case 6:
      return "lg:col-start-3";
    default:
      return undefined;
  }
}

export interface InterestAreaGridProps {
  id?: string;
  className?: string;
  finderHref?: string;
  areas?: readonly InterestArea[];
  heading?: string;
  subheading?: string;
  showDiscovery?: boolean;
  discoveryEyebrow?: string;
  discoveryHeading?: string;
  discoveryCta?: string;
  programCountLabel?: string;
  learnMoreLabel?: string;
  reveal?: boolean;
}

export function InterestAreaGrid({
  id = "interests",
  className,
  finderHref = "#programs",
  areas = DEFAULT_INTEREST_AREAS,
  heading = "What Interests You?",
  subheading = "Browse by area of study, then explore programs that match your goals.",
  showDiscovery = true,
  discoveryEyebrow = "Program Discovery",
  discoveryHeading = "Not sure where\nto start?",
  discoveryCta = "Find Your Degree",
  programCountLabel = "Degree Programs",
  learnMoreLabel = "Learn More",
  reveal = false,
}: InterestAreaGridProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const areaCount = areas.length;

  return (
    <section
      ref={reveal ? ref : undefined}
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-uagc-border bg-white section-pad lg:scroll-mt-36",
        className,
      )}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mb-8 text-center sm:mb-10",
            reveal && "reveal-section",
            reveal && isVisible && "is-visible",
          )}
        >
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id={`${id}-heading`} className="type-h2 text-uagc-navy">
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => {
            const external = isExternalHref(area.href);

            return (
              <Link
                key={area.name}
                href={area.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(
                  "group block cursor-pointer overflow-hidden rounded-2xl border border-uagc-border bg-white no-underline transition-[border-color,box-shadow] duration-200",
                  "hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy",
                  areaGridItemClass(index, areaCount),
                  reveal && "reveal-section",
                  reveal && isVisible && "is-visible",
                  reveal && `stagger-${Math.min(index + 1, 8)}`,
                )}
              >
                <div className="relative h-40 overflow-hidden sm:h-[160px]">
                  <AssetImage
                    src={area.imageSrc}
                    alt={area.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                    style={
                      area.imagePosition
                        ? { objectPosition: area.imagePosition }
                        : undefined
                    }
                  />
                </div>

                <div className="px-4.5 pb-4.5 pt-4">
                  <p className="type-h5 text-uagc-navy">{area.name}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="text-[13px] text-uagc-gray">
                      {area.programCount} {programCountLabel}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-uagc-red transition-[gap] duration-200 group-hover:gap-1.5">
                      {learnMoreLabel}
                      <ArrowRight
                        className="size-3"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {showDiscovery ? (
            <Link
              href={finderHref}
              className={cn(
                "group relative col-span-1 flex cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-uagc-navy no-underline transition-[border-color,box-shadow] duration-200 sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-2",
                "hover:border-uagc-gold/40 hover:shadow-[0_4px_20px_rgba(12,35,75,0.2)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold",
                reveal && "reveal-section stagger-8",
                reveal && isVisible && "is-visible",
              )}
            >
              <div className="relative z-1 flex min-h-[230px] w-full flex-col justify-between p-6 sm:p-7">
                <div>
                  <span className="mb-4 flex size-[52px] items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white">
                    <Search className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <p className="type-eyebrow text-white/80">{discoveryEyebrow}</p>
                  <p className="mt-2 type-h5 whitespace-pre-line text-white">
                    {discoveryHeading}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-uagc-gold px-4.5 py-2.5 text-[13px] font-semibold text-uagc-navy transition-colors duration-200 group-hover:bg-uagc-gold-dark">
                  {discoveryCta}
                  <ArrowRight className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
