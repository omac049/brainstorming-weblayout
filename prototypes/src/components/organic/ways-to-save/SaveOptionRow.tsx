"use client";

import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SaveOption } from "./save-options-data";

export interface SaveOptionRowProps {
  items: SaveOption[];
  openCards: Set<string>;
  onToggle: (cardId: string, rowIds: string[]) => void;
}

function SaveOptionTrigger({
  item,
  isOpen,
  onToggle,
  className,
}: {
  item: SaveOption;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const Icon = item.icon;
  const panelId = `save-option-${item.id}-details`;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      className={cn(
        "flex h-full w-full cursor-pointer items-start gap-3 p-4 text-left sm:p-5",
        "transition-[transform,background-color] duration-150 ease-out active:scale-99.5",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-uagc-navy",
        isOpen && "bg-white/60",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ease-out",
          isOpen ? "bg-uagc-navy" : "bg-white",
        )}
        aria-hidden
      >
        <Icon
          className={cn(
            "size-4 transition-colors duration-200 ease-out",
            isOpen ? "text-white" : "text-uagc-navy",
          )}
          strokeWidth={1.75}
        />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-uagc-navy sm:text-[0.9375rem]">
          {item.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="font-heading text-xl font-bold leading-none text-uagc-navy sm:text-2xl">
            {item.stat}
          </span>
          <span className="text-xs text-uagc-gray">{item.statLabel}</span>
        </div>
        <p className="mt-1.5 text-xs leading-snug text-uagc-gray sm:text-[0.8125rem]">
          {item.summary}
        </p>
      </div>

      <ChevronDown
        className={cn(
          "mt-1 size-4 shrink-0 text-uagc-gray transition-transform duration-200 ease-out",
          isOpen && "rotate-180",
        )}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}

function SaveOptionDetails({
  item,
  isOpen,
  className,
}: {
  item: SaveOption;
  isOpen: boolean;
  className?: string;
}) {
  const panelId = `save-option-${item.id}-details`;

  return (
    <div
      id={panelId}
      className={cn("min-w-0", className)}
      role="region"
      aria-label={`${item.title} details`}
      aria-hidden={!isOpen}
    >
      {isOpen ? (
        <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
          <ul className="space-y-2.5">
            {item.details.map((detail) => (
              <li key={detail} className="flex gap-2.5">
                <span
                  className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-uagc-sky/10"
                  aria-hidden
                >
                  <Check className="size-2.5 text-uagc-navy" strokeWidth={3} />
                </span>
                <span className="text-[0.8125rem] leading-relaxed text-uagc-gray">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
          {item.qualifier ? (
            <p className="mt-3 text-[0.6875rem] italic text-uagc-gray">
              {item.qualifier}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function SaveOptionRow({ items, openCards, onToggle }: SaveOptionRowProps) {
  const rowIds = items.map((item) => item.id);
  const rowOpen = items.some((item) => openCards.has(item.id));
  const isSingle = items.length === 1;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-uagc-cream transition-[border-color,box-shadow] duration-200 ease-out",
        rowOpen
          ? "border-uagc-navy shadow-[0_4px_20px_rgba(12,35,75,0.06)]"
          : "border-uagc-border hover:border-uagc-navy/30",
      )}
    >
      <div
        className={cn(
          "grid items-stretch",
          isSingle ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {items.map((item, index) => (
          <SaveOptionTrigger
            key={item.id}
            item={item}
            isOpen={openCards.has(item.id)}
            onToggle={() => onToggle(item.id, rowIds)}
            className={cn(
              !isSingle &&
                index === 0 &&
                "border-b border-uagc-border sm:border-b-0 sm:border-r",
            )}
          />
        ))}
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          rowOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-uagc-border">
            <div
              className={cn(
                "grid items-start",
                isSingle ? "grid-cols-1" : "grid-cols-2",
              )}
            >
              {items.map((item, index) => (
                <SaveOptionDetails
                  key={item.id}
                  item={item}
                  isOpen={openCards.has(item.id)}
                  className={cn(
                    !isSingle && index === 0 && "sm:border-r sm:border-uagc-border",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
