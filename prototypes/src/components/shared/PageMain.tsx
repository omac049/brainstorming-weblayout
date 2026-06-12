import { cn } from "@/lib/utils";

export interface PageMainProps {
  children: React.ReactNode;
  className?: string;
  /** Paid landing headers use a shorter offset scale than organic SiteHeader. */
  variant?: "organic" | "paid" | "hub";
}

/**
 * Standard page main landmark with safe-area-aware header clearance.
 * Pair with `RFIStickyBar` + footer `mobile-sticky-offset` on conversion pages.
 */
export function PageMain({
  children,
  className,
  variant = "organic",
}: PageMainProps) {
  return (
    <main
      id="main-content"
      role="main"
      className={cn(
        "page-main flex-1",
        variant === "paid" && "page-main--paid",
        variant === "hub" && "page-main--hub",
        className,
      )}
    >
      {children}
    </main>
  );
}
