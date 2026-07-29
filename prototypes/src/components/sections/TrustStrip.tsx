import type { LucideIcon } from "lucide-react";
import { DollarSign, GraduationCap, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TrustBadgeItem {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  accent?: boolean;
}

export interface TrustStripProps {
  className?: string;
  /** "sidebar" keeps badges stacked for narrow containers (hero panel);
   *  "banner" lays them out in a horizontal row for full-width sections. */
  variant?: "sidebar" | "banner";
  /** Override the default badge set. */
  items?: TrustBadgeItem[];
  /** Use transparent/glass styling for dark background panels. */
  onDark?: boolean;
}

const DEFAULT_ITEMS: TrustBadgeItem[] = [
  {
    icon: ShieldCheck,
    label: "WSCUC Accredited",
    sublabel: "Recognized by ED & CHEA",
  },
  {
    icon: GraduationCap,
    label: "50+ Online Programs",
  },
  {
    icon: DollarSign,
    label: "Financial Aid Available",
    sublabel: "Grants, scholarships & military benefits",
  },
];

function Badge({
  item,
  onDark,
  compact,
}: {
  item: TrustBadgeItem;
  onDark: boolean;
  compact: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        compact ? "px-0 py-1" : "px-3 py-3 sm:justify-center sm:px-4 sm:py-3.5",
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg",
          compact ? "size-8" : "size-9 sm:size-10",
          onDark
            ? "bg-white/10 text-white ring-1 ring-white/20"
            : "bg-uagc-navy/6 text-uagc-navy",
        )}
        aria-hidden
      >
        <Icon className={cn(compact ? "size-4" : "size-[18px] sm:size-5")} strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        {item.sublabel && item.accent ? (
          <p
            className={cn(
              "text-[0.6875rem] font-bold uppercase tracking-[0.08em]",
              onDark ? "text-white" : "text-uagc-red",
            )}
          >
            {item.sublabel}
          </p>
        ) : null}
        <p
          className={cn(
            "font-heading text-sm font-bold leading-tight",
            onDark ? "text-white" : "text-uagc-navy",
          )}
        >
          {item.label}
        </p>
        {item.sublabel && !item.accent ? (
          <p
            className={cn(
              "mt-0.5 text-xs leading-snug",
              onDark ? "text-white/85" : "text-uagc-gray",
            )}
          >
            {item.sublabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function TrustStrip({
  className,
  variant = "sidebar",
  items = DEFAULT_ITEMS,
  onDark = false,
}: TrustStripProps) {
  const isBanner = variant === "banner";

  return (
    <aside
      className={cn(
        "w-full shrink-0",
        onDark
          ? "rounded-lg bg-white/10 ring-1 ring-white/15"
          : isBanner
            ? ""
            : "rounded-lg bg-uagc-surface/90",
        className,
      )}
      aria-label="Accreditation and program highlights"
    >
      <div
        className={cn(
          "flex",
          isBanner
            ? "flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0 sm:divide-x sm:divide-uagc-beige/40"
            : "flex-col gap-1 py-1.5 px-2",
        )}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(isBanner && "sm:flex-1")}
          >
            <Badge item={item} onDark={onDark} compact={!isBanner} />
          </div>
        ))}
      </div>
    </aside>
  );
}
