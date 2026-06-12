"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AssetImage } from "@/components/shared/AssetImage";
import {
  LATEST_UAGC_BLOG_POSTS,
  UAGC_BLOG_URL,
  type UagcBlogPost,
} from "@/lib/uagc-blog-posts";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface PersonalizedEducationSectionProps {
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  posts?: UagcBlogPost[];
  viewAllHref?: string;
}

export function PersonalizedEducationSection({
  id = "personalized-education",
  className,
  heading = "Latest Stories & Insights",
  subheading = "Student success stories, faculty perspectives, and practical tips for online learners — from the Forward Thinking Blog.",
  posts = LATEST_UAGC_BLOG_POSTS,
  viewAllHref = UAGC_BLOG_URL,
}: PersonalizedEducationSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 border-t border-uagc-border bg-white section-pad lg:scroll-mt-36",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-6",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <div className="max-w-2xl">
            <span aria-hidden className="mb-3 accent-bar" />
            <h2 id={`${id}-heading`} className="type-h2 text-uagc-navy">
              {heading}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-sm">
              {subheading}
            </p>
          </div>
          <Link
            href={viewAllHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-uagc-red transition-colors hover:underline"
          >
            View All Articles
            <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
          </Link>
        </div>

        <div
          className={cn(
            "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
            "reveal-section reveal-delay-1",
            isVisible && "is-visible",
          )}
        >
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-uagc-border bg-white no-underline transition-[border-color,box-shadow] duration-200",
                "hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
              )}
            >
              <div className="relative aspect-[590/330] overflow-hidden bg-uagc-surface">
                <AssetImage
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, 78vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-uagc-gold">
                    {post.category}
                  </span>
                  <span className="text-xs text-uagc-gray/70" aria-hidden>
                    ·
                  </span>
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium text-uagc-gray"
                  >
                    {post.date}
                  </time>
                </div>
                <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-uagc-navy sm:text-[1.3125rem]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-uagc-gray">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-uagc-red transition-[gap] duration-200 group-hover:gap-2.5">
                  Read Article
                  <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
