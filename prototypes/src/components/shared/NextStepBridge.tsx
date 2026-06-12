import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface NextStepBridgeProps {
  label: string;
  href: string;
  variant?: "light" | "dark";
  className?: string;
}

export function NextStepBridge({
  label,
  href,
  variant = "light",
  className,
}: NextStepBridgeProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 py-6 sm:py-8",
        isDark ? "bg-uagc-navy" : "bg-uagc-surface",
        className,
      )}
    >
      <a
        href={href}
        className={cn(
          "group flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-[border-color,color] duration-200",
          isDark
            ? "border border-white/20 text-white/80 hover:border-uagc-gold/40 hover:text-white"
            : "border border-uagc-navy/10 text-uagc-gray hover:border-uagc-navy/25 hover:text-uagc-navy",
        )}
      >
        {label}
        <ArrowDown
          className={cn(
            "size-3.5 transition-transform duration-200 group-hover:translate-y-0.5",
            isDark ? "text-white/60 group-hover:text-white" : "text-uagc-red/60 group-hover:text-uagc-red",
          )}
          strokeWidth={2.5}
          aria-hidden
        />
      </a>
    </div>
  );
}
