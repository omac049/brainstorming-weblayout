"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { SaveOptionCard } from "./SaveOptionCard";
import { SaveOptionRow } from "./SaveOptionRow";
import { WaysToSaveAdvisorCta } from "./WaysToSaveAdvisorCta";
import { WaysToSaveHeader } from "./WaysToSaveHeader";
import { WaysToSaveLeadStat } from "./WaysToSaveLeadStat";
import {
  WAYS_TO_SAVE,
  WAYS_TO_SAVE_LEAD_STAT,
  type SaveOption,
} from "./save-options-data";

export interface WaysToSaveSectionProps {
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  options?: SaveOption[];
  defaultOpenIds?: string[];
  advisorHref?: string;
}

export function WaysToSaveSection({
  id = "ways-to-save",
  className,
  heading = "Ways to Make It Affordable",
  subheading = "Most students pay less than the $485/credit sticker price. Here's how.",
  options = WAYS_TO_SAVE,
  defaultOpenIds = [],
  advisorHref = "#rfi",
}: WaysToSaveSectionProps) {
  const [openCards, setOpenCards] = useState<Set<string>>(
    () => new Set(defaultOpenIds),
  );
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  function toggleCard(cardId: string, exclusiveRowIds?: string[]) {
    setOpenCards((prev) => {
      const next = new Set(prev);

      if (exclusiveRowIds) {
        if (next.has(cardId)) {
          next.delete(cardId);
        } else {
          exclusiveRowIds.forEach((id) => next.delete(id));
          next.add(cardId);
        }
        return next;
      }

      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  }

  const optionRows: SaveOption[][] = [];
  for (let i = 0; i < options.length; i += 2) {
    optionRows.push(options.slice(i, i + 2));
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "scroll-mt-28 section-pad bg-white lg:scroll-mt-36",
        className,
      )}
      aria-labelledby="ways-to-save-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <aside className="flex flex-col gap-5 lg:gap-6">
            <WaysToSaveHeader heading={heading} subheading={subheading} />
            <WaysToSaveLeadStat
              value={WAYS_TO_SAVE_LEAD_STAT.value}
              headline={WAYS_TO_SAVE_LEAD_STAT.headline}
              qualifier={WAYS_TO_SAVE_LEAD_STAT.qualifier}
            />
            <WaysToSaveAdvisorCta
              href={advisorHref}
              className="hidden lg:block"
            />
          </aside>

          <div className="flex flex-col gap-3">
            {optionRows.map((rowItems, rowIndex) => (
              <div
                key={rowItems.map((item) => item.id).join("-")}
                className={cn(
                  "reveal-section min-w-0",
                  `stagger-${Math.min(rowIndex + 1, 8)}`,
                  isVisible && "is-visible",
                )}
              >
                {/* Mobile: independent stacked cards */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {rowItems.map((item) => (
                    <SaveOptionCard
                      key={item.id}
                      item={item}
                      isOpen={openCards.has(item.id)}
                      onToggle={() => toggleCard(item.id)}
                    />
                  ))}
                </div>

                {/* Desktop: paired row with shared pull-down panel */}
                <div className="hidden sm:block" data-save-layout="desktop-row">
                  <SaveOptionRow
                    items={rowItems}
                    openCards={openCards}
                    onToggle={toggleCard}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <WaysToSaveAdvisorCta
          href={advisorHref}
          className={cn(
            "mt-8 lg:hidden reveal-section stagger-8",
            isVisible && "is-visible",
          )}
        />
      </div>
    </section>
  );
}
