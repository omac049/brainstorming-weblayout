"use client";

import { useScrollReveal, useAnimatedCounter } from "@/hooks/useScrollReveal";

interface StatItem {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  { end: 54, suffix: "+", label: "Accredited Programs" },
  { end: 86, suffix: "%", label: "Receive Financial Aid" },
  { end: 485, prefix: "$", label: "Per Credit" },
  { end: 98000, suffix: "+", label: "Employers on Handshake" },
];

function formatNumber(n: number): string {
  return n >= 1000 ? n.toLocaleString("en-US") : String(n);
}

function AnimatedStat({ item, isVisible }: { item: StatItem; isVisible: boolean }) {
  const count = useAnimatedCounter(item.end, isVisible, item.end > 1000 ? 2200 : 1600);
  return (
    <div className="flex flex-col items-center gap-1 px-2 py-3 sm:gap-1.5">
      <p className="type-stat text-[1.5rem] text-uagc-gold sm:text-[2.25rem] lg:text-[3rem]">
        {item.prefix ?? ""}
        {formatNumber(count)}
        {item.suffix ?? ""}
      </p>
      <p className="text-[0.625rem] font-medium uppercase tracking-wider text-white/80 sm:text-xs lg:text-sm">
        {item.label}
      </p>
    </div>
  );
}

export function ImpactStrip() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="bg-uagc-navy py-10 sm:py-14 lg:py-16"
      role="region"
      aria-label="UAGC by the numbers"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-y-6 px-4 sm:px-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/15 lg:px-8">
        {STATS.map((item) => (
          <AnimatedStat key={item.label} item={item} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
}
