"use client";

import Link from "next/link";
import { Clock, ArrowRight, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import { RFIForm } from "@/components/shared/RFIForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BlogNewsletterSignup } from "@/components/organic/BlogNewsletterSignup";
import { BlogQuickReference } from "@/components/organic/BlogQuickReference";
import type {
  BlogArticle,
  RelatedArticle,
  ProgramQuickFact,
} from "@/lib/organic-blog-data";

interface BlogSidebarProps {
  article: BlogArticle;
  relatedArticles: RelatedArticle[];
  className?: string;
  middleContent?: React.ReactNode;
  onRfiSubmit?: (data: Record<string, string>) => void;
}

/* ─── Key Takeaways (sidebar-sized) ─── */

function SidebarKeyTakeaways({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-uagc-navy/40 bg-uagc-cream-warm px-4 py-4">
      <h3 className="mb-2 text-[0.8125rem] font-bold uppercase tracking-wider text-uagc-navy/60">
        Key Takeaways
      </h3>
      <ul className="space-y-2">
        {items.map((item) => {
          const dotIdx = item.indexOf(". ");
          const lead = dotIdx > 0 ? item.slice(0, dotIdx + 1) : item;
          return (
            <li
              key={item.slice(0, 40)}
              className="flex gap-2 text-[0.8125rem] leading-snug text-uagc-navy/80"
            >
              <span className="mt-[0.35rem] block size-1 shrink-0 rounded-full bg-uagc-navy" />
              <strong className="font-semibold text-uagc-navy">{lead}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Author Card (compact — no share links) ─── */

function AuthorCard({ article }: { article: BlogArticle }) {
  const { author } = article;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        {author.photo && (
          <a
            href={author.profileHref ?? "#"}
            className="block shrink-0 overflow-hidden rounded-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.photo}
              alt={author.name}
              className="size-10 rounded-full object-cover"
            />
          </a>
        )}
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-uagc-navy/45">
            Author
          </p>
          {author.profileHref ? (
            <a
              href={author.profileHref}
              className="text-sm font-bold text-uagc-navy underline-offset-2 hover:underline"
            >
              {author.name}
            </a>
          ) : (
            <p className="text-sm font-bold text-uagc-navy">{author.name}</p>
          )}
        </div>
      </div>

      {article.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-uagc-navy/5 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-uagc-navy/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Related Articles ─── */

function SidebarRelatedArticles({
  articles,
}: {
  articles: RelatedArticle[];
}) {
  if (articles.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold text-uagc-navy">
        Related Articles
      </h3>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.title}
            href={article.href}
            className="group flex gap-3 rounded-lg p-1.5 -mx-1.5 transition-colors active:bg-gray-50"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.imageAlt}
                className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="flex-1">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-uagc-red">
                {article.category}
              </span>
              <p className="mt-0.5 line-clamp-2 text-[0.8125rem] font-semibold leading-snug text-uagc-navy transition-colors group-hover:text-uagc-red">
                {article.title}
              </p>
              <div className="mt-1 flex items-center gap-2 text-[0.75rem] text-uagc-navy/55">
                <span>{article.date}</span>
                <span className="flex items-center gap-0.5">
                  <Clock className="size-2.5" aria-hidden />
                  {article.readingTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Program Comparison Card ─── */

interface ProgramComparisonCardProps {
  comparison: ProgramQuickFact[];
  programHref: string;
  programName: string;
}

export function ProgramComparisonCard({
  comparison,
  programHref,
  programName,
}: ProgramComparisonCardProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-uagc-navy/40 bg-white"
      data-module="blog-program-comparison"
    >
      <div className="flex items-center gap-2 border-b border-uagc-navy/20 bg-uagc-cream-warm px-5 py-4">
        <GraduationCap className="size-5 text-uagc-navy" aria-hidden />
        <h3 className="text-sm font-bold text-uagc-navy">
          PhD vs. DPS at a Glance
        </h3>
      </div>

      <div className="px-4 py-3">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-2 text-left font-semibold text-uagc-navy/50" />
              <th className="pb-2 text-left font-bold text-uagc-navy">PhD</th>
              <th className="pb-2 text-left font-bold text-uagc-navy">DPS</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.label} className="border-b border-gray-50 last:border-0">
                <td className="py-2 pr-2 font-semibold text-uagc-navy/70">
                  {row.label}
                </td>
                <td className="py-2 pr-2 text-uagc-navy/80">{row.phd}</td>
                <td className="py-2 text-uagc-navy/80">{row.dps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-uagc-navy/20 bg-uagc-cream-warm px-5 py-4">
        <Link
          href={programHref}
          className="flex items-center justify-center gap-2 rounded-lg bg-uagc-red px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-uagc-red/90"
          data-ga4-event="blog_sidebar_program_click"
          data-ga4-program={programName}
        >
          Explore UAGC&apos;s {programName}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <p className="mt-2 text-center text-[0.6875rem] text-uagc-navy/50">
          100% online &middot; Designed for working professionals
        </p>
      </div>
    </div>
  );
}

/* ─── Main Sidebar ─── */

export function BlogSidebar({
  article,
  relatedArticles,
  className,
  middleContent,
  onRfiSubmit,
}: BlogSidebarProps) {
  return (
    <aside className={cn("space-y-4", className)}>
      {/* Author + category tags first */}
      <AuthorCard article={article} />

      {/* Key Takeaways */}
      <SidebarKeyTakeaways items={article.keyTakeaways} />

      {/* Quick Reference card — data-driven from article or custom override */}
      <ScrollReveal delay={60}>
        {middleContent ?? (
          article.quickReference ? (
            <BlogQuickReference config={article.quickReference} />
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white">
              <RFIForm
                heading="Questions? Request More Information"
                variant="mini"
                onSubmit={onRfiSubmit}
              />
            </div>
          )
        )}
      </ScrollReveal>

      {/* Newsletter Signup */}
      <ScrollReveal delay={90}>
        <BlogNewsletterSignup variant="sidebar" />
      </ScrollReveal>

      {/* Related Articles */}
      <ScrollReveal delay={120}>
        <SidebarRelatedArticles articles={relatedArticles} />
      </ScrollReveal>
    </aside>
  );
}
