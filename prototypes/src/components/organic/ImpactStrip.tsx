"use client";

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

/** Scale / outcome stats — complements hero trust pills ($485, WSCUC, $0 apply). */
const STATS: StatItem[] = [
  { value: "50+", label: "Online degree", sublabel: "programs" },
  { value: "100%", label: "Online", sublabel: "coursework" },
  { value: "95,000+", label: "Alumni", sublabel: "Worldwide" },
  { value: "86%", label: "Receive", sublabel: "Financial Aid" },
  { value: "1:1", label: "Student", sublabel: "Support" },
];

function StatCell({ item }: { item: StatItem }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center bg-uagc-navy px-2 py-4 text-center sm:px-3 sm:py-5 lg:px-4 lg:py-6">
      <p className="font-heading-condensed text-[1.25rem] font-extrabold leading-none text-uagc-gold sm:text-[1.5rem] lg:text-[1.875rem]">
        {item.value}
      </p>
      <p className="mt-1.5 text-[0.5625rem] font-medium uppercase leading-snug tracking-[0.06em] text-white/70 sm:mt-2 sm:text-[0.625rem] lg:text-[0.6875rem]">
        {item.label}
        {item.sublabel && (
          <>
            <br />
            {item.sublabel}
          </>
        )}
      </p>
    </div>
  );
}

export interface ImpactStripProps {
  id?: string;
  className?: string;
}

export function ImpactStrip({ id = "impact", className }: ImpactStripProps) {
  return (
    <div
      id={id}
      className={className}
      role="region"
      aria-label="UAGC by the numbers"
    >
      <div className="border-t border-white/10 bg-uagc-navy">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid grid-cols-2 gap-px bg-white/[0.08] sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((item) => (
              <StatCell key={`${item.value}-${item.label}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
