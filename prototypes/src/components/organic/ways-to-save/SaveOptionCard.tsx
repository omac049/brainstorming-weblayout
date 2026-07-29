"use client";

import { useId } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SaveOption } from "./save-options-data";

export interface SaveOptionCardProps {
  item: SaveOption;
  isOpen: boolean;
  onToggle: () => void;
}

export function SaveOptionCard({ item, isOpen, onToggle }: SaveOptionCardProps) {
  const Icon = item.icon;
  const panelId = useId();

  return (
    <div
      className={cn(
        "rounded-2xl border bg-uagc-cream transition-[border-color,box-shadow] duration-200 ease-out",
        isOpen
          ? "border-uagc-navy shadow-[0_4px_20px_rgba(12,35,75,0.06)]"
          : "border-uagc-border hover:border-uagc-navy/30",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "flex w-full cursor-pointer items-start gap-3 p-4 text-left sm:p-5",
          "transition-transform duration-150 ease-out active:scale-99.5",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy",
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

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        role="region"
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="border-t border-uagc-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
            <ul className="space-y-2.5">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-2.5">
                  <span
                    className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-uagc-sky/10"
                    aria-hidden
                  >
                    <Check
                      className="size-2.5 text-uagc-navy"
                      strokeWidth={3}
                    />
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
        </div>
      </div>
    </div>
  );
}
