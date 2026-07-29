"use client";

import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { BlogArticle, BlogFAQ, BlogPullQuote } from "@/lib/organic-blog-data";

interface BlogBodyProps {
  article: BlogArticle;
  className?: string;
  contextualCTA?: React.ReactNode;
  /** Optional mid-article engagement block inserted after ~60% of sections */
  midArticleSlot?: React.ReactNode;
}

function PullQuoteBlock({ pullQuote }: { pullQuote: BlogPullQuote }) {
  return (
    <blockquote className="relative my-8 border-l-4 border-uagc-navy/40 bg-uagc-cream-warm/50 py-5 pl-4 pr-4 sm:pl-6 sm:pr-5">
      <Quote
        className="absolute -left-0.5 -top-3 size-6 text-uagc-navy/40"
        aria-hidden
      />
      <p className="text-[1em] font-medium italic leading-relaxed text-uagc-navy sm:text-[1.125em]">
        &ldquo;{pullQuote.text}&rdquo;
      </p>
      {pullQuote.attribution && (
        <footer className="mt-3 text-[0.875em] text-uagc-navy/60">
          <span className="font-semibold text-uagc-navy/80">
            &mdash; {pullQuote.attribution}
          </span>
          {pullQuote.attributionRole && (
            <span className="ml-1 text-uagc-navy/50">
              , {pullQuote.attributionRole}
            </span>
          )}
        </footer>
      )}
    </blockquote>
  );
}

function FAQAccordion({ faqs }: { faqs: BlogFAQ[] }) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <h2
        className="mb-3 font-['Fira_Sans',sans-serif] text-[1.25em] font-bold leading-tight text-uagc-navy sm:text-[1.5em]"
        style={{ textWrap: "balance" }}
      >
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
              aria-expanded={isOpen}
            >
              <span className="text-[0.9375em] font-semibold leading-snug text-uagc-navy">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-uagc-navy/50 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-[0.875em] leading-relaxed text-uagc-navy/80">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function BlogBody({ article, className, contextualCTA, midArticleSlot }: BlogBodyProps) {
  const midInsertIdx = Math.floor(article.sections.length * 0.6);

  return (
    <article className={cn("max-w-prose text-[1em]", className)}>
      {/* Article Body Sections — starts immediately, no preamble */}
      <div className="space-y-10 pb-8 pt-5 sm:space-y-14 sm:pb-10 sm:pt-6">
        {article.sections.map((section, i) => (
          <ScrollReveal key={section.heading} delay={i * 40}>
            {/* Mid-article engagement slot */}
            {i === midInsertIdx && midArticleSlot && (
              <div className="mb-10 sm:mb-14">{midArticleSlot}</div>
            )}
            <section id={`section-${i}`} className="scroll-mt-28">
              <h2
                className="mb-5 font-['Fira_Sans',sans-serif] text-[1.25em] font-bold leading-tight text-uagc-navy sm:mb-6 sm:text-[1.5em]"
                style={{ textWrap: "balance" }}
              >
                {section.heading}
              </h2>
              {section.paragraphs.map((para, pi) => (
                <p
                  key={`${section.heading}-p${pi}`}
                  className="mb-4 text-[0.9375em] leading-relaxed text-uagc-navy/85 last:mb-0 sm:mb-5 sm:text-[1em]"
                  style={{ textWrap: "pretty" }}
                >
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[0.9375em] leading-relaxed text-uagc-navy/85 marker:text-uagc-navy sm:ml-6 sm:text-[1em]">
                  {section.bullets.map((b) => (
                    <li key={b.slice(0, 30)}>{b}</li>
                  ))}
                </ul>
              )}
              {section.pullQuote && (
                <PullQuoteBlock pullQuote={section.pullQuote} />
              )}
            </section>
          </ScrollReveal>
        ))}
      </div>

      {/* Contextual CTA */}
      {contextualCTA && (
        <ScrollReveal>
          <div className="pb-8">{contextualCTA}</div>
        </ScrollReveal>
      )}

      {/* FAQs */}
      {article.faqs && article.faqs.length > 0 && (
        <ScrollReveal>
          <div className="border-t border-gray-200 py-8 sm:py-10">
            <FAQAccordion faqs={article.faqs} />
          </div>
        </ScrollReveal>
      )}

      {/* Closing Section */}
      {article.closingSection && (
        <ScrollReveal>
          <section className="border-t border-gray-200 py-8 sm:py-10">
            <h2
              className="mb-5 font-['Fira_Sans',sans-serif] text-[1.25em] font-bold leading-tight text-uagc-navy sm:mb-6 sm:text-[1.5em]"
              style={{ textWrap: "balance" }}
            >
              {article.closingSection.heading}
            </h2>
            {article.closingSection.paragraphs.map((para, pi) => (
              <p
                key={`closing-p${pi}`}
                className="mb-4 text-[0.9375em] leading-relaxed text-uagc-navy/85 last:mb-0 sm:mb-5 sm:text-[1em]"
                style={{ textWrap: "pretty" }}
              >
                {para}
              </p>
            ))}
          </section>
        </ScrollReveal>
      )}
    </article>
  );
}
