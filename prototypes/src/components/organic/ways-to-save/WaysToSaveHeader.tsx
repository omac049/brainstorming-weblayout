import { cn } from "@/lib/utils";

export interface WaysToSaveHeaderProps {
  heading: string;
  subheading: string;
  className?: string;
}

export function WaysToSaveHeader({
  heading,
  subheading,
  className,
}: WaysToSaveHeaderProps) {
  return (
    <div className={cn("text-center lg:text-left", className)}>
      <span aria-hidden className="mx-auto mb-3 accent-bar lg:mx-0" />
      <h2 id="ways-to-save-heading" className="type-h2 text-uagc-navy text-balance">
        {heading}
      </h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
        {subheading}
      </p>
    </div>
  );
}
