"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  GraduationCap,
  DollarSign,
  Laptop,
  Shield,
  Search,
  X,
  MessageCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data types                                                         */
/* ------------------------------------------------------------------ */

type FAQCategory =
  | "admissions"
  | "tuition"
  | "academics"
  | "credibility"
  | "format"
  | "trial"
  | "cost";

export interface FAQItem {
  question: string;
  answer: string;
  /** Rich-text highlights rendered as bold spans inside the answer. */
  highlights?: string[];
  category: FAQCategory;
}

export type SimpleFAQItem = {
  question: string;
  answer: string;
};

export interface FAQSectionProps {
  id?: string;
  heading?: string;
  subheading?: string;
  items?: FAQItem[] | SimpleFAQItem[];
  /** `accordion` = simple one-at-a-time FAQ (no search/categories). Default = full paid-landing FAQ. */
  variant?: "default" | "accordion";
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

const CATEGORIES: {
  id: FAQCategory;
  label: string;
  icon: typeof GraduationCap;
}[] = [
  { id: "admissions", label: "Admissions", icon: GraduationCap },
  { id: "tuition", label: "Tuition & Aid", icon: DollarSign },
  { id: "academics", label: "Academics", icon: Laptop },
  { id: "credibility", label: "Credibility", icon: Shield },
  { id: "format", label: "Course Format", icon: Laptop },
  { id: "trial", label: "Free Trial", icon: GraduationCap },
  { id: "cost", label: "Cost", icon: DollarSign },
];

/* ------------------------------------------------------------------ */
/*  Default FAQ content                                                */
/* ------------------------------------------------------------------ */

export const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    category: "credibility",
    question: "What is UAGC's accreditation status?",
    answer:
      "UAGC is accredited by the WASC Senior College and University Commission (WSCUC), an accrediting body recognized by the U.S. Department of Education and the Council for Higher Education Accreditation (CHEA).",
    highlights: ["WSCUC", "U.S. Department of Education", "CHEA"],
  },
  {
    category: "admissions",
    question: "Can I transfer credits to UAGC?",
    answer:
      "UAGC offers a generous transfer credit policy — up to 75% of your bachelor's credits can transfer in. This includes prior learning assessment, military credit evaluation, and professional certifications. An advisor can review your transcripts for free.",
    highlights: ["up to 75%", "free"],
  },
  {
    category: "admissions",
    question: "Can credits from 25+ years ago still transfer?",
    answer:
      "In many cases, yes. UAGC evaluates transcripts regardless of when they were earned. Credits from regionally accredited institutions are reviewed on a case-by-case basis — your advisor will walk you through exactly what counts.",
    highlights: ["regardless of when they were earned"],
  },
  {
    category: "tuition",
    question: "How much does UAGC cost per credit?",
    answer:
      "Tuition varies by degree level and program. UAGC charges a $0 application fee, so you can explore your options without any upfront cost. Contact an advisor for current per-credit rates for your specific program of interest.",
    highlights: ["$0 application fee"],
  },
  {
    category: "tuition",
    question: "What financial aid options are available?",
    answer:
      "Eligible students may qualify for federal financial aid by completing the FAFSA, plus institutional scholarships, military benefits (including GI Bill), and employer tuition partnership programs. An advisor can help you build a personalized financial plan.",
    highlights: ["FAFSA", "GI Bill", "employer tuition partnership"],
  },
  {
    category: "tuition",
    question: "Are payment plans available?",
    answer:
      "Yes. UAGC offers flexible payment options designed for working adults. You can spread costs across your enrollment period, and financial aid is applied directly to reduce out-of-pocket expenses each term.",
    highlights: ["flexible payment options"],
  },
  {
    category: "academics",
    question: "What support is available for online students?",
    answer:
      "Online students have access to academic advising, 24/7 technical support, a writing center, library resources, tutoring, and career services — all designed to support you from enrollment through graduation and beyond.",
    highlights: ["24/7 technical support", "career services"],
  },
  {
    category: "academics",
    question: "Is online learning as rigorous as in-person?",
    answer:
      "Absolutely. UAGC's online programs meet the same accreditation standards as traditional campus-based programs. Courses are taught by experienced faculty and include discussion boards, projects, and real-world application — designed for adult learners balancing work and life.",
    highlights: ["same accreditation standards"],
  },
  {
    category: "academics",
    question: "Will I feel out of place if I'm an older student?",
    answer:
      "Not at all — the average UAGC student is a working adult in their 30s. You'll be learning alongside people with similar life experience, career goals, and responsibilities. The flexible format is built specifically for non-traditional students.",
    highlights: ["working adult in their 30s", "non-traditional students"],
  },
  {
    category: "credibility",
    question: "Will employers recognize my UAGC degree?",
    answer:
      "UAGC degrees are awarded by a WSCUC-accredited institution. UAGC partners with 1,500+ employers nationwide, and graduates receive lifetime career services including access to Handshake's job network.",
    highlights: ["1,500+ employers", "lifetime career services", "Handshake"],
  },
  {
    category: "credibility",
    question: "How is UAGC connected to the University of Arizona?",
    answer:
      "UAGC is part of the University of Arizona enterprise — one of the nation's top public research universities. UAGC holds its own WSCUC regional accreditation and operates independently, but benefits from shared institutional resources and the UA commitment to accessible, quality higher education.",
    highlights: ["University of Arizona enterprise", "own WSCUC regional accreditation", "top public research universities"],
  },
  {
    category: "admissions",
    question: "What support is available for military and veteran students?",
    answer:
      "UAGC is a Yellow Ribbon school and accepts GI Bill benefits, military tuition assistance, and MyCAA funding. Military training and experience are evaluated for college credit through Prior Learning Assessment. Dedicated military advisors help you navigate benefits and enrollment.",
    highlights: ["Yellow Ribbon", "GI Bill", "military tuition assistance", "MyCAA"],
  },
  {
    category: "academics",
    question: "What disability and accessibility accommodations are available?",
    answer:
      "UAGC provides comprehensive disability support services, including flexible assignment deadlines, accessible course materials, alternative testing arrangements, and assistive technology support. Students can request accommodations confidentially through the Office of Accessibility Services.",
    highlights: ["flexible assignment deadlines", "alternative testing arrangements", "Office of Accessibility Services"],
  },
  {
    category: "tuition",
    question: "What are the actual tuition costs?",
    answer:
      "Undergraduate tuition is $485 per credit and graduate tuition is $625 per credit. Application fee is $0. A typical 3-credit course costs $1,455 for undergrad. 86% of UAGC students receive financial aid or scholarships that reduce out-of-pocket costs significantly.",
    highlights: ["$485 per credit", "$625 per credit", "$0", "86%"],
  },
  {
    category: "admissions",
    question: "Is UAGC a good fit for first-generation college students?",
    answer:
      "Absolutely. UAGC was built for non-traditional students — many are the first in their families to earn a degree. You'll have dedicated academic advising, writing support, tutoring, and a community of peers with similar backgrounds. No one expects you to navigate this alone.",
    highlights: ["first in their families", "dedicated academic advising"],
  },
  {
    category: "credibility",
    question: "Will my degree satisfy professional licensing requirements (CPA, teaching, etc.)?",
    answer:
      "Many UAGC programs are designed to align with professional licensing requirements, but requirements vary by state. For accounting, the program is designed to help you reach the 150-credit-hour CPA requirement. For teaching, state-specific endorsement requirements apply. An advisor can confirm eligibility for your state and career goal.",
    highlights: ["150-credit-hour CPA requirement", "state-specific endorsement requirements"],
  },
];

/* ------------------------------------------------------------------ */
/*  Highlight renderer                                                 */
/* ------------------------------------------------------------------ */

function renderAnswer(text: string, highlights?: string[]) {
  if (!highlights?.length) return text;

  const escaped = highlights.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const isHL = highlights.some(
      (h) => h.toLowerCase() === part.toLowerCase(),
    );
    return isHL ? (
      <span
        key={i}
        className="inline-block rounded bg-uagc-gold/15 px-1 font-semibold text-uagc-navy"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

/* ------------------------------------------------------------------ */
/*  Single accordion item                                              */
/* ------------------------------------------------------------------ */

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={cn(
        "group/item rounded-xl border transition-[border-color,box-shadow] duration-300",
        isOpen
          ? "border-uagc-navy/15 bg-white shadow-[0_2px_12px_rgba(12,35,75,0.06)]"
          : "border-uagc-border bg-white hover:border-uagc-navy/10 hover:shadow-[0_1px_6px_rgba(12,35,75,0.04)]",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-uagc-navy sm:px-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span
            className={cn(
              "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-[background-color,color] duration-300",
              isOpen
                ? "bg-uagc-gold text-uagc-navy"
                : "bg-uagc-surface text-uagc-gray group-hover/item:bg-uagc-gold/15 group-hover/item:text-uagc-navy",
            )}
          >
            {isOpen ? (
              <ChevronDown
                className="size-3.5 rotate-180 transition-transform duration-300"
                strokeWidth={2.5}
                aria-hidden
              />
            ) : (
              <span className="leading-none">Q</span>
            )}
          </span>
          <span
            className={cn(
              "flex-1 text-[0.9375rem] font-semibold leading-snug transition-colors sm:text-base",
              isOpen ? "text-uagc-navy" : "text-uagc-navy/80",
            )}
          >
            {item.question}
          </span>
          <ChevronDown
            className={cn(
              "mt-1 size-4 shrink-0 text-uagc-gray/50 transition-transform duration-300",
              isOpen && "rotate-180 text-uagc-navy",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="ml-11 border-l-2 border-uagc-navy/20 pl-4">
              <p className="text-sm leading-relaxed text-uagc-gray sm:text-[0.9375rem]">
                {renderAnswer(item.answer, item.highlights)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Structured data (injected client-side to avoid hydration mismatch) */
/* ------------------------------------------------------------------ */

function FAQStructuredData({ items }: { items: FAQItem[] }) {
  useEffect(() => {
    const id = "faq-jsonld";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [items]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Simple accordion (organic homepage, etc.)                          */
/* ------------------------------------------------------------------ */

function SimpleAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: SimpleFAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-simple-panel-${index}`;
  const buttonId = `faq-simple-button-${index}`;

  return (
    <div
      className={cn(
        "rounded-xl border transition-colors duration-300",
        isOpen
          ? "border-uagc-navy/15 bg-white"
          : "border-uagc-border bg-white hover:border-uagc-navy/10",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          role="button"
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-uagc-navy sm:px-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span
            className={cn(
              "flex-1 text-[0.9375rem] font-semibold leading-snug sm:text-base",
              isOpen ? "text-uagc-navy" : "text-uagc-navy/80",
            )}
          >
            {item.question}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-uagc-gray/50 transition-transform duration-300",
              isOpen && "rotate-180 text-uagc-navy",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-uagc-border/60 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <p className="text-sm leading-relaxed text-uagc-gray sm:text-[0.9375rem]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSectionAccordion({
  id,
  heading,
  subheading,
  items,
  className,
}: {
  id?: string;
  heading: string;
  subheading?: string;
  items: SimpleFAQItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id={id}
      className={cn("scroll-mt-28 section-pad bg-uagc-surface lg:scroll-mt-36", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {heading.trim() || subheading?.trim() ? (
            <div className="mb-8 text-center sm:mb-10">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              {heading.trim() ? (
                <h2 className="type-h2 text-uagc-navy">{heading}</h2>
              ) : null}
              {subheading?.trim() ? (
                <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray">
                  {subheading}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <SimpleAccordionItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <FAQStructuredData
        items={items.map((item) => ({
          ...item,
          category: "credibility" as FAQCategory,
        }))}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Full paid-landing FAQ (search + categories)                          */
/* ------------------------------------------------------------------ */

function FAQSectionDefault({
  id,
  heading,
  subheading,
  items,
  className,
}: {
  id?: string;
  heading: string;
  subheading: string;
  items: FAQItem[];
  className?: string;
}) {
  const fullItems = items;
  const [activeCategory, setActiveCategory] = useState<
    FAQCategory | "all"
  >("all");
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleItem = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const filteredItems = useMemo(() => {
    let result = fullItems;

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q),
      );
    }

    return result;
  }, [fullItems, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: fullItems.length };
    for (const cat of CATEGORIES) {
      counts[cat.id] = fullItems.filter((i) => i.category === cat.id).length;
    }
    return counts;
  }, [fullItems]);

  const clearSearch = () => {
    setSearchQuery("");
    searchRef.current?.focus();
  };

  return (
    <section id={id} className={cn("section-pad bg-uagc-surface", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center sm:mb-10">
            <span
              aria-hidden
              className="mx-auto mb-3 accent-bar"
            />
            <h2 className="type-h2 text-uagc-navy">{heading}</h2>
            <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray">
              {subheading}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-uagc-gray/50"
              aria-hidden
            />
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type a keyword — tuition, transfer, aid…"
              className="w-full rounded-xl border border-uagc-border bg-white py-3.5 pl-11 pr-10 text-sm text-uagc-navy placeholder:text-uagc-gray/50 focus:border-uagc-gold focus:outline-none focus:ring-2 focus:ring-uagc-gold/20 sm:text-[0.9375rem]"
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-uagc-surface text-uagc-gray transition-colors hover:bg-uagc-gold/15 hover:text-uagc-navy"
                aria-label="Clear search"
              >
                <X className="size-3.5" strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div
            className="mb-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter questions by category"
          >
            <button
              role="tab"
              type="button"
              aria-selected={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-[background-color,color,border-color] duration-200 sm:text-sm",
                activeCategory === "all"
                  ? "border-uagc-navy bg-uagc-navy text-white"
                  : "border-uagc-border bg-white text-uagc-gray hover:border-uagc-navy/20 hover:text-uagc-navy",
              )}
            >
              All
              <span
                className={cn(
                  "ml-0.5 inline-flex size-5 items-center justify-center rounded-full text-xs font-bold",
                  activeCategory === "all"
                    ? "bg-white/20 text-white"
                    : "bg-uagc-surface text-uagc-gray",
                )}
              >
                {categoryCounts.all}
              </span>
            </button>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-[background-color,color,border-color] duration-200 sm:text-sm",
                    isActive
                      ? "border-uagc-navy bg-uagc-navy text-white"
                      : "border-uagc-border bg-white text-uagc-gray hover:border-uagc-navy/20 hover:text-uagc-navy",
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                  {cat.label}
                  <span
                    className={cn(
                      "ml-0.5 inline-flex size-5 items-center justify-center rounded-full text-xs font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-uagc-surface text-uagc-gray",
                    )}
                  >
                    {categoryCounts[cat.id]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count when searching */}
          {searchQuery && (
            <p className="mb-4 text-xs text-uagc-gray">
              {filteredItems.length === 0
                ? "No results found — try a different keyword or "
                : `Showing ${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""} for "${searchQuery}"`}
              {filteredItems.length === 0 && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="font-semibold text-uagc-red underline underline-offset-2"
                >
                  clear your search
                </button>
              )}
            </p>
          )}

          {/* Accordion list */}
          <div className="flex flex-col gap-3">
            {filteredItems.map((item) => {
              const globalIndex = fullItems.indexOf(item);
              return (
                <AccordionItem
                  key={item.question}
                  item={item}
                  index={globalIndex}
                  isOpen={openIndices.has(globalIndex)}
                  onToggle={() => toggleItem(globalIndex)}
                />
              );
            })}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && !searchQuery && (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <span className="text-3xl">🤔</span>
              <p className="text-sm text-uagc-gray">
                No questions in this category yet.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-8 overflow-hidden rounded-xl border border-uagc-border bg-white sm:mt-10">
            <div className="flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:gap-6 sm:px-8 sm:text-left">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-uagc-navy/6">
                <MessageCircle
                  className="size-5 text-uagc-navy"
                  strokeWidth={1.5}
                />
              </span>
              <div className="flex-1">
                <p className="text-[0.9375rem] font-semibold text-uagc-navy">
                  Don&apos;t see your question?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-uagc-gray">
                  An enrollment advisor can give you personalized answers about
                  programs, costs, transfer credits, and more — no obligation.
                </p>
              </div>
              <a
                href="#rfi"
                className="cta-primary shrink-0 whitespace-nowrap text-sm"
              >
                Ask an Advisor
              </a>
            </div>
          </div>
        </div>
      </div>

      <FAQStructuredData items={fullItems} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export function FAQSection({
  id,
  heading = "Frequently Asked Questions",
  subheading = "Find quick answers to the most common questions about UAGC — or reach out to an advisor for personalized help.",
  items = DEFAULT_FAQ_ITEMS,
  variant = "default",
  className,
}: FAQSectionProps) {
  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7772/ingest/24b5b1ff-078e-4328-bf26-1b7274349e2e", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "dda533",
      },
      body: JSON.stringify({
        sessionId: "dda533",
        runId: "pre-fix",
        hypothesisId: "A",
        location: "FAQSection.tsx:dispatch",
        message: "FAQSection variant dispatch",
        data: { variant, itemCount: items.length },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, [variant, items.length]);

  if (variant === "accordion") {
    const simpleItems = items as SimpleFAQItem[];
    const accordionSubheading = heading === "" ? "" : subheading;
    return (
      <FAQSectionAccordion
        id={id}
        heading={heading}
        subheading={accordionSubheading}
        items={simpleItems}
        className={className}
      />
    );
  }

  return (
    <FAQSectionDefault
      id={id}
      heading={heading}
      subheading={subheading}
      items={items as FAQItem[]}
      className={className}
    />
  );
}
