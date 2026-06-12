import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  GraduationCap,
  HeartPulse,
  Monitor,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface ProgramCategory {
  title: string;
  description: string;
  href: string;
}

const COMPACT_CATEGORY_LIMIT = 6;
const EXPLORE_ALL_PROGRAMS_HREF = "/online-degrees";

export interface ProgramCategoryCardsProps {
  heading?: string;
  categories?: ProgramCategory[];
  compact?: boolean;
  exploreAllHref?: string;
  className?: string;
}

export const DEFAULT_PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    title: "Accounting & Finance Degrees",
    description:
      "Explore relevant, rigorous, and real-world accounting curriculum.",
    href: "/success/programs/accounting-finance-v6",
  },
  {
    title: "Business Degrees",
    description:
      "Study the keys to successful business and take your career to the next level.",
    href: "/success/programs/business-v6",
  },
  {
    title: "Criminal Justice Degrees",
    description: "Develop your skills in victimology and cybercrime.",
    href: "/success/programs/criminal-justice-v6",
  },
  {
    title: "Education Degrees",
    description: "Amplify your impact and empower future learners.",
    href: "/success/programs/education-v6",
  },
  {
    title: "Health Care Degrees",
    description: "Break into the field and enhance the well-being of others.",
    href: "/success/programs/health-care-v6",
  },
  {
    title: "Information Technology Degrees",
    description:
      "Become an indispensable asset and learn the fundamentals of modern tech.",
    href: "/success/programs/information-technology-v6",
  },
  {
    title: "Liberal Arts Degrees",
    description: "Challenge the status quo and expand your thinking into the unknown.",
    href: "/success/programs/liberal-arts-v6",
  },
  {
    title: "Social & Behavioral Science",
    description: "Explore the sources of human behavior.",
    href: "/success/programs/social-behavioral-science-v6",
  },
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  accounting: Calculator,
  business: Briefcase,
  criminal: Scale,
  education: GraduationCap,
  health: HeartPulse,
  information: Monitor,
  liberal: BookOpen,
  social: Users,
};

function pickCategoryIcon(title: string): LucideIcon {
  const normalized = title.toLowerCase();
  if (normalized.includes("accounting") || normalized.includes("finance")) {
    return CATEGORY_ICONS.accounting;
  }
  if (normalized.includes("business")) return CATEGORY_ICONS.business;
  if (normalized.includes("criminal")) return CATEGORY_ICONS.criminal;
  if (normalized.includes("education")) return CATEGORY_ICONS.education;
  if (normalized.includes("health")) return CATEGORY_ICONS.health;
  if (normalized.includes("information") || normalized.includes("technology")) {
    return CATEGORY_ICONS.information;
  }
  if (normalized.includes("liberal")) return CATEGORY_ICONS.liberal;
  if (normalized.includes("social") || normalized.includes("behavioral")) {
    return CATEGORY_ICONS.social;
  }
  return GraduationCap;
}

export function ProgramCategoryCards({
  heading = "Discover the Program That\u2019s Right for You",
  categories = DEFAULT_PROGRAM_CATEGORIES,
  compact = false,
  exploreAllHref = EXPLORE_ALL_PROGRAMS_HREF,
  className,
}: ProgramCategoryCardsProps) {
  const visibleCategories = compact
    ? categories.slice(0, COMPACT_CATEGORY_LIMIT)
    : categories;
  const tileHref = compact ? "#rfi" : undefined;

  return (
    <section className={cn("section-pad bg-white", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              aria-hidden
              className="mb-3 accent-bar"
            />
            <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          </div>
          {compact ? (
            <Link
              href={exploreAllHref}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-uagc-navy transition-colors hover:text-uagc-red"
            >
              Explore All Programs
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ) : null}
        </div>

        <div
          className={cn(
            "grid gap-3 sm:gap-4",
            compact
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {visibleCategories.map((category) => {
            const Icon = pickCategoryIcon(category.title);
            const cardContent = (
              <>
                <div className="flex items-start gap-4">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-uagc-navy/4 text-uagc-navy ring-1 ring-uagc-navy/8 transition-colors group-hover:bg-uagc-red/6 group-hover:text-uagc-red group-hover:ring-uagc-red/20"
                    aria-hidden
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={cn(
                        "font-heading font-semibold leading-snug text-uagc-navy transition-colors group-hover:text-uagc-red",
                        compact ? "text-[0.9375rem] sm:text-base" : "text-base lg:text-lg",
                      )}
                    >
                      {category.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-sm leading-relaxed text-uagc-gray",
                        compact && "line-clamp-2",
                      )}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="mt-3 ml-[3.75rem] inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-uagc-red opacity-0 transition-opacity group-hover:opacity-100">
                  {compact ? "Request Info" : "Learn More"}
                  <ArrowRight className="size-3" aria-hidden />
                </span>
              </>
            );

            const cardClassName = cn(
              "group relative flex cursor-pointer flex-col rounded-xl border border-transparent bg-white p-4 transition-[border-color,box-shadow] duration-200 sm:p-5",
              "hover:border-uagc-red/20 hover:shadow-[0_2px_12px_rgba(171,5,32,0.06)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy",
            );

            if (tileHref) {
              return (
                <Link
                  key={category.title}
                  href={tileHref}
                  className={cardClassName}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <Link
                key={category.title}
                href={category.href}
                className={cardClassName}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
