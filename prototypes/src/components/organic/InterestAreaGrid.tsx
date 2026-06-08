"use client";

import { ArrowRight, Search } from "lucide-react";

import { AssetImage } from "@/components/shared/AssetImage";
import { cn } from "@/lib/utils";

interface InterestArea {
  name: string;
  programCount: number;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const AREAS: InterestArea[] = [
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

export interface InterestAreaGridProps {
  id?: string;
  className?: string;
  finderHref?: string;
}

export function InterestAreaGrid({
  id = "interests",
  className,
  finderHref = "#programs",
}: InterestAreaGridProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-uagc-border bg-white section-pad lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-2 text-center sm:mb-2.5">
          <h2 className="type-h2 text-uagc-navy">
            What Interests{" "}
            <em className="not-italic text-uagc-gold">You?</em>
          </h2>
          <span
            aria-hidden
            className="mx-auto mt-2.5 block h-[3px] w-10 rounded-sm bg-uagc-gold"
          />
        </div>

        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area, index) => (
            <a
              key={area.name}
              href={area.href}
              className={cn(
                "group block cursor-pointer overflow-hidden rounded-xl border border-uagc-border bg-white no-underline transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
                index === 4 && "lg:col-start-1",
                index === 5 && "lg:col-start-2",
                index === 6 && "lg:col-start-3",
              )}
            >
              <div className="relative h-40 overflow-hidden sm:h-[160px]">
                <AssetImage
                  src={area.imageSrc}
                  alt={area.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-[18px] pb-[18px] pt-4">
                <p className="font-heading text-2xl font-bold leading-tight text-uagc-navy">
                  {area.name}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <span className="text-[13px] text-uagc-gray">
                    {area.programCount} Degree Programs
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-bold text-uagc-gold transition-all duration-200 group-hover:gap-1.5">
                    Learn More
                    <ArrowRight className="size-3" strokeWidth={2.5} aria-hidden />
                  </span>
                </div>
              </div>
            </a>
          ))}

          {/* Program Discovery — navy finder card (mock pattern, gold CTA) */}
          <a
            href={finderHref}
            className={cn(
              "group relative col-span-1 flex cursor-pointer overflow-hidden rounded-xl border border-white/15 no-underline transition-all duration-200 sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-2",
              "bg-[linear-gradient(145deg,#0C234B_0%,#1a3a6b_60%,#0f2d5a_100%)]",
              "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,150,0,0.15)_0%,transparent_65%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 -right-8 size-[120px] rounded-full border border-white/10"
              aria-hidden
            />

            <div className="relative z-[1] flex min-h-[230px] w-full flex-col justify-between p-6 sm:p-7">
              <div>
                <span className="mb-4 flex size-[52px] items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white/90">
                  <Search className="size-6" strokeWidth={1.6} aria-hidden />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/65">
                  Program Discovery
                </p>
                <p className="mt-2 font-heading text-xl font-extrabold leading-tight text-white">
                  Not sure where
                  <br />
                  to start?
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-uagc-gold px-[18px] py-2.5 text-[13px] font-bold text-uagc-navy transition-all duration-200 group-hover:gap-2.5 group-hover:bg-[#d4870a]">
                Find Your Degree
                <ArrowRight className="size-3" strokeWidth={2.5} aria-hidden />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
