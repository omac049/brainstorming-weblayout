import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ContentBlockProps {
  heading: string;
  body: string | ReactNode;
  image?: string;
  mobileImage?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  reversed?: boolean;
  backgroundColor?: "white" | "beige" | "navy";
  className?: string;
}

const backgroundStyles = {
  white: "bg-white text-uagc-gray",
  beige: "bg-uagc-beige text-uagc-gray",
  navy: "bg-uagc-navy text-white",
} as const;

const headingStyles = {
  white: "text-uagc-gold",
  beige: "text-uagc-gold",
  navy: "text-white",
} as const;

export function ContentBlock({
  heading,
  body,
  image,
  mobileImage,
  imageAlt = "",
  ctaText,
  ctaHref,
  reversed = false,
  backgroundColor = "white",
  className,
}: ContentBlockProps) {
  const isNavy = backgroundColor === "navy";
  const ctaVariant = isNavy ? "gold" : "navy";
  const hasImage = Boolean(image);

  return (
    <section className={cn(backgroundStyles[backgroundColor], "py-12 sm:py-16", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-8",
            hasImage ? "lg:grid-cols-2 lg:gap-12" : "max-w-3xl"
          )}
        >
          <div
            className={cn(
              "flex flex-col justify-center",
              hasImage && (reversed ? "lg:order-2" : "lg:order-1")
            )}
          >
            <div
              className={cn(
                "mb-3 h-[3px] w-10",
                isNavy ? "bg-white/60" : "bg-uagc-navy"
              )}
              aria-hidden
            />
            <h2
              className={cn(
                "font-heading text-2xl font-bold sm:text-3xl",
                headingStyles[backgroundColor]
              )}
            >
              {heading}
            </h2>
            <div
              className={cn(
                "mt-4 text-base leading-relaxed sm:text-lg",
                isNavy ? "text-white/90" : "text-uagc-gray"
              )}
            >
              {typeof body === "string" ? <p>{body}</p> : body}
            </div>
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className={cn(
                  "mt-6 inline-flex w-fit items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity",
                  ctaVariant === "gold"
                    ? "cta-primary px-6 py-2.5 text-sm"
                    : "cta-primary px-6 py-2.5 text-sm"
                )}
              >
                {ctaText}
              </Link>
            )}
          </div>

          {hasImage && image && (
            <div className={cn("relative", reversed ? "lg:order-1" : "lg:order-2")}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn(
                    "object-cover",
                    mobileImage && "hidden lg:block"
                  )}
                />
                {mobileImage ? (
                  <Image
                    src={mobileImage}
                    alt={imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover lg:hidden"
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
