"use client";

import { useState } from "react";
import { ChevronDown, Check, MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

export type SkeptCard = {
  id: string;
  question: string;
  proofStat: string;
  proofStatSub?: string;
  answer: string;
  expandedBullets: string[];
};

export type SkepticismBusterSectionProps = {
  id?: string;
  className?: string;
  heading: string;
  subheading: string;
  cards: SkeptCard[];
  softCta: {
    text: string;
    chatHref: string;
    phoneHref: string;
  };
};

function SkeptCardItem({ card }: { card: SkeptCard }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border p-6 transition-colors sm:p-8",
        expanded
          ? "border-uagc-navy ring-1 ring-uagc-navy/10"
          : "border-uagc-navy/10 hover:border-uagc-navy/30"
      )}
    >
      <h3 className="text-lg font-bold leading-snug text-uagc-navy sm:text-xl">
        {card.question}
      </h3>

      <p className="font-heading text-[2rem] font-extrabold leading-none tracking-tight text-uagc-red sm:text-[2.5rem]">
        {card.proofStat}
        {card.proofStatSub && (
          <span className="ml-2 text-base font-semibold tracking-normal text-uagc-gray sm:text-lg">
            {card.proofStatSub}
          </span>
        )}
      </p>

      <p className="text-[0.9375rem] leading-relaxed text-uagc-gray-700">
        {card.answer}
      </p>

      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-uagc-navy transition-colors hover:text-uagc-red"
        >
          {expanded ? "Show less" : "See the evidence"}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>

        {expanded && (
          <ul className="mt-3 flex flex-col gap-2.5">
            {card.expandedBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-uagc-gray-700">
                <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function SkepticismBusterSection({
  id,
  className,
  heading,
  subheading,
  cards,
  softCta,
}: SkepticismBusterSectionProps) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16 lg:py-20", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 className="font-heading text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] text-uagc-navy sm:text-[1.75rem] lg:text-[2.25rem]">
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <SkeptCardItem key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12">
          <p className="text-[0.9375rem] text-uagc-gray">
            {softCta.text}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={softCta.chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-uagc-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-uagc-navy transition-colors hover:border-uagc-navy/30 hover:bg-uagc-navy/[0.03]"
            >
              <MessageCircle className="size-4" />
              Chat with an Advisor
            </a>
            <a
              href={softCta.phoneHref}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-uagc-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-uagc-navy transition-colors hover:border-uagc-navy/30 hover:bg-uagc-navy/[0.03]"
            >
              <Phone className="size-4" />
              Call (855) 210-4959
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
