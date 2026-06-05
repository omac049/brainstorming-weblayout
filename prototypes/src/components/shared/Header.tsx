"use client";

import { AssetImage } from "@/components/shared/AssetImage";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const PHONE_DISPLAY = "+1 866 347 7781";
const PHONE_HREF = "tel:+18663477781";

export interface HeaderProps {
  variant?: "default" | "full" | "reduced" | "hero-overlay";
  /** Suppress Request Info CTA (e.g. post-submit thank-you page). */
  hideRequestInfo?: boolean;
}

const FULL_NAV_LINKS = [
  { href: "/organic/online-degrees", label: "Online Degrees" },
  { href: "https://www.uagc.edu/admission", label: "Admission" },
  { href: "https://www.uagc.edu/tuition-financial-aid", label: "Tuition & Aid" },
  { href: "https://www.uagc.edu/about", label: "About UAGC" },
] as const;

export function Header({ variant = "default", hideRequestInfo = false }: HeaderProps) {
  const showFullNav = variant === "default" || variant === "full";
  const showRequestInfo =
    !hideRequestInfo && (variant === "full" || variant === "hero-overlay");
  const isHeroOverlay = variant === "hero-overlay";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHeroOverlay) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroOverlay]);

  const useLightChrome = isHeroOverlay && !scrolled;

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 right-0 left-0 z-[100] transition-[background-color,box-shadow,border-color] duration-300",
        isHeroOverlay
          ? scrolled
            ? "border-b border-uagc-red/80 bg-white/92 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
          : "border-b-2 border-[var(--color-uagc-red)] bg-white shadow-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:gap-4 sm:px-6 lg:h-20 lg:px-10">
        <Link
          href="/"
          className={cn(
            "flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2",
            useLightChrome
              ? "focus-visible:outline-white"
              : "focus-visible:outline-[var(--color-uagc-navy)]",
          )}
          aria-label="University of Arizona Global Campus home"
        >
          <AssetImage
            src="/images/UAGC_logo.svg"
            alt="University of Arizona Global Campus"
            width={181}
            height={32}
            priority
            className={cn(
              "h-7 w-auto sm:h-8",
              useLightChrome && "brightness-0 invert drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
            )}
          />
        </Link>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4">
          {showFullNav ? (
            <nav
              aria-label="Primary"
              className="hidden items-center gap-4 xl:flex"
            >
              {FULL_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-uagc-navy)] transition-colors hover:text-[var(--color-uagc-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-uagc-navy)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}

          {showFullNav ? (
            <a
              href="https://cloud.mail.uagc.edu/apply"
              className="hidden min-h-9 items-center rounded-full bg-uagc-red px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#8a0418] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-red lg:inline-flex lg:text-sm"
            >
              Apply Now
            </a>
          ) : null}

          {showRequestInfo && !isHeroOverlay ? (
            <a
              href="#rfi"
              className="hidden min-h-9 items-center rounded-full bg-uagc-gold px-3.5 text-xs font-bold uppercase tracking-[0.06em] text-uagc-navy transition-colors hover:bg-[#f5a623] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:inline-flex sm:px-4 sm:text-sm"
            >
              Request Info
            </a>
          ) : null}

          {isHeroOverlay ? (
            <a
              href="#hero-rfi"
              className={cn(
                "hidden min-h-9 items-center rounded-full px-3.5 text-xs font-bold uppercase tracking-[0.06em] transition-[background-color,transform,box-shadow] sm:inline-flex sm:px-4 sm:text-sm",
                useLightChrome
                  ? "bg-uagc-gold text-uagc-navy hover:bg-[#f5a623]"
                  : "bg-uagc-gold text-uagc-navy hover:bg-[#f5a623]",
              )}
            >
              Request Info
            </a>
          ) : null}

          <a
            href={PHONE_HREF}
            aria-label={`Call UAGC at ${PHONE_DISPLAY}`}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-w-0 sm:justify-start sm:rounded-none sm:px-0",
              useLightChrome
                ? "text-white hover:text-uagc-gold focus-visible:outline-white"
                : "text-[var(--color-uagc-navy)] hover:text-[var(--color-uagc-red)] focus-visible:outline-[var(--color-uagc-navy)]",
              isHeroOverlay &&
                !useLightChrome &&
                "hover:text-[var(--color-uagc-red)]",
            )}
          >
            <Phone className="size-5 shrink-0 sm:hidden" strokeWidth={2} aria-hidden />
            <span className="hidden text-xs font-normal tracking-wide whitespace-nowrap sm:inline sm:text-sm md:text-base">
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
