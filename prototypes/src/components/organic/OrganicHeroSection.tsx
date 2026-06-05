"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";

import { ONLINE_DEGREES_CLONE } from "@/lib/clones/online-degrees-clone";
import { cn } from "@/lib/utils";

const { hero: HERO, breadcrumb: BREADCRUMB, sectionNav: SECTION_NAV } =
  ONLINE_DEGREES_CLONE;

export interface OrganicHeroSectionProps {
  heroRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export function OrganicHeroSection({ heroRef, className }: OrganicHeroSectionProps) {
  return (
    <section
      ref={heroRef}
      className={cn("relative w-full overflow-hidden bg-uagc-navy", className)}
      aria-label="Online Degrees"
    >
      <div className="relative mx-auto w-full max-w-[1440px]">
        <nav
          aria-label="Breadcrumb"
          className="absolute left-0 right-0 top-0 z-20 px-4 py-3 sm:px-6 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/80 sm:text-sm">
            {BREADCRUMB.map((item, index) => (
              <li key={item.label} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span aria-hidden className="text-white/50">
                    /
                  </span>
                )}
                {index === BREADCRUMB.length - 1 ? (
                  <span className="font-semibold text-white">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-uagc-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="relative lg:grid lg:min-h-[480px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-end bg-uagc-navy px-4 py-8 sm:px-6 sm:py-10 lg:justify-center lg:px-12 lg:py-16">
            <p className="type-eyebrow text-uagc-gold">{HERO.eyebrow}</p>
            <h1 className="type-h1 mt-2 text-white">{HERO.headline}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#e8edf5] sm:text-lg">
              {HERO.subheadline}
            </p>
          </div>

          <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-full">
            <Image
              src={HERO.images.mobile}
              alt={HERO.images.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-[center_20%] lg:hidden"
            />
            <Image
              src={HERO.images.desktop}
              alt={HERO.images.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="hidden object-cover object-center lg:block"
            />
          </div>
        </div>
      </div>

      <HubSectionNav />
    </section>
  );
}

function HubSectionNav() {
  return (
    <nav
      aria-label="Page sections"
      className="border-t border-[#2a4068] bg-[#132a52]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SECTION_NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-[#2a4068] bg-uagc-navy px-4 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-uagc-gold hover:text-uagc-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
