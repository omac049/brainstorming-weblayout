"use client";

import Link from "next/link";
import { useRef } from "react";
import { Calendar, Clock, ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/organic/SiteHeader";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { OrganicHomeHero } from "@/components/organic/OrganicHomeHero";
import { BlogBody } from "@/components/organic/BlogBody";
import { BlogArticleTOC } from "@/components/organic/BlogArticleTOC";
import { BlogSidebar } from "@/components/organic/BlogSidebar";
import { BlogAdmissionCTA } from "@/components/organic/BlogAdmissionCTA";
import { BlogReadingProgress } from "@/components/organic/BlogReadingProgress";
import { BlogShareButtons } from "@/components/organic/BlogShareButtons";
import { BlogArticleToolbar } from "@/components/organic/BlogArticleToolbar";
import { BlogBackToTop } from "@/components/organic/BlogBackToTop";
import { BlogNewsletterSignup } from "@/components/organic/BlogNewsletterSignup";
import { RFIStickyBar } from "@/components/shared/RFIForm";
import { PageMain } from "@/components/shared/PageMain";

import type { BlogArticle, RelatedArticle } from "@/lib/organic-blog-data";

interface BlogArticlePageProps {
  article: BlogArticle;
  relatedArticles: RelatedArticle[];
  sidebarContent?: React.ReactNode;
  contextualCTA?: React.ReactNode;
}

function Breadcrumb({ article }: { article: BlogArticle }) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/organic/blog" },
    { label: article.title, href: null },
  ];

  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-10">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-uagc-navy/60">
        {crumbs.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden />}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="underline-offset-2 hover:text-uagc-navy hover:underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="line-clamp-1 font-medium text-uagc-navy/80">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ArticleMeta({ article }: { article: BlogArticle }) {
  const hasBeenUpdated = article.lastUpdatedDate !== article.publishedDate;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 py-4 text-sm text-uagc-navy/70">
        <span className="font-semibold text-uagc-navy">
          {article.author.name}
        </span>
        <span className="size-1 rounded-full bg-uagc-navy/20" aria-hidden />
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5" aria-hidden />
          {article.publishedDate}
        </span>
        {hasBeenUpdated && (
          <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-green-700">
            Updated {article.lastUpdatedDate}
          </span>
        )}
        <span className="size-1 rounded-full bg-uagc-navy/20" aria-hidden />
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden />
          {article.readingTime}
        </span>
      </div>
    </div>
  );
}

export function BlogArticlePage({
  article,
  relatedArticles,
  sidebarContent,
  contextualCTA,
}: BlogArticlePageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <BlogReadingProgress contentRef={contentRef} />
      <SiteHeader />
      <PageMain variant="organic">
        <Breadcrumb article={article} />

        <OrganicHomeHero
          variant="editorial"
          eyebrow={article.category}
          headline={article.title}
          subheadline={`${article.readingTime} · Updated ${article.lastUpdatedDate}`}
          imageSrc={article.featuredImage}
          imageAlt={article.featuredImageAlt}
          imagePosition="center 30%"
          trustPills={[]}
          sectionNavItems={[]}
        />

        <div className="bg-white">
          <ArticleMeta article={article} />
        </div>

        <div className="bg-white" ref={contentRef}>
          <div
            ref={sidebarRef}
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:flex lg:gap-10 lg:px-10 lg:py-12"
          >
            <div className="min-w-0 flex-1">
              <BlogArticleToolbar title={article.title} />
              <BlogArticleTOC sections={article.sections} />
              <BlogBody
                article={article}
                contextualCTA={contextualCTA}
                midArticleSlot={
                  <BlogNewsletterSignup variant="inline" />
                }
              />
            </div>

            <div className="mt-10 lg:mt-0 lg:w-[360px] lg:shrink-0">
              <div className="lg:sticky lg:top-28">
                <BlogSidebar
                  article={article}
                  relatedArticles={relatedArticles}
                  middleContent={sidebarContent}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating share buttons — visible on wide screens */}
        <BlogShareButtons title={article.title} variant="floating" />

        <BlogAdmissionCTA />
      </PageMain>

      <SiteFooter />
      <BlogBackToTop />
      <RFIStickyBar heroFormRef={sidebarRef} />
    </>
  );
}
