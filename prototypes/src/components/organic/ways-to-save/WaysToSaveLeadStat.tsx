import { cn } from "@/lib/utils";

export interface WaysToSaveLeadStatProps {
  value: string;
  headline: string;
  qualifier: string;
  className?: string;
}

export function WaysToSaveLeadStat({
  value,
  headline,
  qualifier,
  className,
}: WaysToSaveLeadStatProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-uagc-navy/40 bg-uagc-cream px-5 py-4 sm:px-6 sm:py-5",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="font-heading text-[2rem] font-bold leading-none text-uagc-navy sm:text-[2.5rem]">
          {value}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-uagc-navy sm:text-[0.9375rem]">
            {headline}
          </p>
          <p className="mt-1 text-[0.6875rem] text-uagc-gray">{qualifier}</p>
        </div>
      </div>
    </div>
  );
}
