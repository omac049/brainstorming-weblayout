"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Info } from "lucide-react";

import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
 *  Data shapes — one for each layout variant
 * ───────────────────────────────────────────── */

interface ComparisonRow {
  label: string;
  values: string[];
}

interface FactItem {
  label: string;
  value: string;
}

interface ChecklistItem {
  text: string;
  checked?: boolean;
}

export interface QuickReferenceConfig {
  /** Card title shown in the header */
  title: string;
  /** Optional icon variant for the header */
  icon?: "graduation" | "info";
  /** Layout variant determines how data renders */
  variant: "comparison" | "facts" | "checklist";
  /** Column headers for comparison variant */
  columnHeaders?: string[];
  /** Rows for comparison variant */
  comparisonRows?: ComparisonRow[];
  /** Key-value pairs for facts variant */
  facts?: FactItem[];
  /** Items for checklist variant */
  checklist?: ChecklistItem[];
  /** Optional CTA at the bottom */
  cta?: {
    text: string;
    href: string;
    subtext?: string;
  };
}

/* ─────────────────────────────────────────────
 *  Comparison Table (generalized from ProgramComparisonCard)
 * ───────────────────────────────────────────── */

function ComparisonLayout({
  columnHeaders,
  rows,
}: {
  columnHeaders: string[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="px-4 py-3">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-2 text-left font-semibold text-uagc-navy/50" />
            {columnHeaders.map((header) => (
              <th
                key={header}
                className="pb-2 text-left font-bold text-uagc-navy"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-gray-50 last:border-0"
            >
              <td className="py-2 pr-2 font-semibold text-uagc-navy/70">
                {row.label}
              </td>
              {row.values.map((val, vi) => (
                <td
                  key={`${row.label}-${vi}`}
                  className="py-2 pr-2 text-uagc-navy/80 last:pr-0"
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
 *  Key Facts (label/value pairs)
 * ───────────────────────────────────────────── */

function FactsLayout({ facts }: { facts: FactItem[] }) {
  return (
    <div className="divide-y divide-gray-100 px-4">
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-baseline justify-between gap-3 py-2.5">
          <span className="text-xs font-semibold text-uagc-navy/60">
            {fact.label}
          </span>
          <span className="text-right text-xs font-bold text-uagc-navy">
            {fact.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
 *  Checklist
 * ───────────────────────────────────────────── */

function ChecklistLayout({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="space-y-2 px-4 py-3">
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-2">
          <CheckCircle2
            className={cn(
              "mt-0.5 size-4 shrink-0",
              item.checked !== false ? "text-green-500" : "text-gray-300",
            )}
            aria-hidden
          />
          <span
            className={cn(
              "text-xs leading-snug",
              item.checked !== false
                ? "text-uagc-navy/80"
                : "text-uagc-navy/50 line-through",
            )}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────
 *  Main Component
 * ───────────────────────────────────────────── */

interface BlogQuickReferenceProps {
  config: QuickReferenceConfig;
  className?: string;
}

export function BlogQuickReference({
  config,
  className,
}: BlogQuickReferenceProps) {
  const IconComponent = config.icon === "info" ? Info : GraduationCap;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-uagc-gold/30 bg-white",
        className,
      )}
      data-module="blog-quick-reference"
      data-variant={config.variant}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-uagc-gold/20 bg-uagc-cream-warm px-5 py-4">
        <IconComponent className="size-5 text-uagc-gold" aria-hidden />
        <h3 className="text-sm font-bold text-uagc-navy">{config.title}</h3>
      </div>

      {/* Body — variant-driven */}
      {config.variant === "comparison" &&
        config.columnHeaders &&
        config.comparisonRows && (
          <ComparisonLayout
            columnHeaders={config.columnHeaders}
            rows={config.comparisonRows}
          />
        )}

      {config.variant === "facts" && config.facts && (
        <FactsLayout facts={config.facts} />
      )}

      {config.variant === "checklist" && config.checklist && (
        <ChecklistLayout items={config.checklist} />
      )}

      {/* CTA Footer */}
      {config.cta && (
        <div className="border-t border-uagc-gold/20 bg-uagc-cream-warm px-5 py-4">
          <Link
            href={config.cta.href}
            className="flex items-center justify-center gap-2 rounded-lg bg-uagc-red px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-uagc-red/90"
            data-ga4-event="blog_sidebar_quick_ref_click"
          >
            {config.cta.text}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          {config.cta.subtext && (
            <p className="mt-2 text-center text-[0.6875rem] text-uagc-navy/50">
              {config.cta.subtext}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
