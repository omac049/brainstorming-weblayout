"use client";

import { useState, useId } from "react";
import {
  ChevronDown,
  DollarSign,
  GraduationCap,
  Shield,
  Briefcase,
  Heart,
  BadgePercent,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SaveOption {
  id: string;
  icon: LucideIcon;
  title: string;
  stat: string;
  statLabel: string;
  summary: string;
  details: string[];
  qualifier?: string;
}

const WAYS_TO_SAVE: SaveOption[] = [
  {
    id: "fafsa",
    icon: Shield,
    title: "Federal Financial Aid & Grants",
    stat: "94%",
    statLabel: "of students qualify",
    summary:
      "Pell Grants, federal loans, and need-based aid can cover most or all of your tuition.",
    details: [
      "Complete the FAFSA (~30 min) to see what you qualify for — no cost to apply",
      "Pell Grants up to $7,395/year don't need to be repaid — that covers roughly 5 courses",
      "Federal student loans with fixed rates and income-driven repayment options",
    ],
    qualifier: "2023–2024 IPEDS Student Financial Aid Survey",
  },
  {
    id: "military",
    icon: GraduationCap,
    title: "Military & Veteran Benefits",
    stat: "$250",
    statLabel: "/credit",
    summary:
      "GI Bill, tuition assistance, and Yellow Ribbon — we help you use every benefit you've earned.",
    details: [
      "Liberty Grant: $250/credit undergrad, $350/credit master's — plus waived fees",
      "Post-9/11 GI Bill, Montgomery GI Bill, and Yellow Ribbon accepted",
      "Military training and experience evaluated for college credit",
    ],
  },
  {
    id: "employer",
    icon: Briefcase,
    title: "Employer Tuition Programs",
    stat: "1,500+",
    statLabel: "partners",
    summary:
      "Many employers will pay part or all of your tuition — we'll help you find out.",
    details: [
      "Partners include T-Mobile, Walgreens, USPS, Edward Jones, J.B. Hunt, and more",
      "Many partners offer full tuition reimbursement — some students pay $0 out of pocket",
      "Your advisor can check eligibility with your employer, even if they're not on the list",
      "Community organizations and workforce boards can also connect their participants to these benefits",
    ],
  },
  {
    id: "scholarships",
    icon: BadgePercent,
    title: "UAGC Scholarships",
    stat: "$0",
    statLabel: "to repay",
    summary:
      "Merit-based and need-based scholarships for new and returning students.",
    details: [
      "First-generation, transfer, community service, and leadership awards available",
      "Access to external scholarship matching platforms at no cost",
      "No separate application — your advisor helps identify the best options",
    ],
  },
  {
    id: "transfer",
    icon: DollarSign,
    title: "Transfer Credits Save Money",
    stat: "41.5",
    statLabel: "avg credits accepted",
    summary:
      "Every credit that transfers is a credit you don't pay for again.",
    details: [
      "No cap on approved bachelor's transfer credits from regionally accredited institutions",
      "Prior Learning Assessment turns work experience into credit",
      "Free transcript evaluation before you enroll — know exactly where you stand",
    ],
  },
  {
    id: "zero-start",
    icon: Heart,
    title: "$0 to Get Started",
    stat: "$0",
    statLabel: "application fee",
    summary:
      "No application fee, no entrance exams, no surprise costs upfront.",
    details: [
      "$0 application fee — explore your options without financial risk",
      "No SAT, ACT, GRE, or GMAT required",
      "Flexible payment plans available for any out-of-pocket costs",
    ],
  },
];

function SaveCard({
  item,
  isOpen,
  onToggle,
}: {
  item: SaveOption;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const panelId = useId();

  return (
    <div
      className={cn(
        "rounded-xl border bg-[#faf9f7] transition-all duration-200",
        isOpen
          ? "border-uagc-navy ring-1 ring-uagc-navy/10"
          : "border-uagc-border hover:border-uagc-navy/30",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start gap-3 p-4 text-left sm:p-5"
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
            isOpen ? "bg-uagc-navy" : "bg-uagc-surface",
          )}
          aria-hidden
        >
          <Icon
            className={cn(
              "size-4 transition-colors duration-200",
              isOpen ? "text-white" : "text-uagc-navy",
            )}
            strokeWidth={1.75}
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-uagc-navy sm:text-[0.9375rem]">
            {item.title}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-heading text-xl font-bold leading-none text-uagc-navy sm:text-2xl">
              {item.stat}
            </span>
            <span className="text-[0.6875rem] text-uagc-gray sm:text-xs">
              {item.statLabel}
            </span>
          </div>
          <p className="mt-1 text-xs leading-snug text-uagc-gray">
            {item.summary}
          </p>
        </div>

        <ChevronDown
          className={cn(
            "mt-1 size-4 shrink-0 text-uagc-gray/50 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none",
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
                    className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-uagc-gold/15"
                    aria-hidden
                  >
                    <Check
                      className="size-2.5 text-uagc-gold"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-[0.8125rem] leading-relaxed text-uagc-gray">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
            {item.qualifier && (
              <p className="mt-3 text-[0.6875rem] italic text-uagc-gray/70">
                {item.qualifier}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WaysToSaveSection() {
  const [openCards, setOpenCards] = useState<Set<string>>(
    () => new Set([WAYS_TO_SAVE[0].id]),
  );
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  function toggleCard(id: string) {
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section
      ref={ref}
      id="ways-to-save"
      className="scroll-mt-28 section-pad bg-white lg:scroll-mt-36"
      aria-labelledby="ways-to-save-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={cn("mx-auto max-w-3xl text-center reveal-section", isVisible && "is-visible")}>
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="ways-to-save-heading" className="type-h2 text-uagc-navy">
            Ways to Make It Affordable
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            Most students pay less than the $485/credit sticker price. Here&apos;s how.
          </p>
        </div>

        {/* Lead stat — trust anchor */}
        <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-3 rounded-xl border border-uagc-gold/30 bg-[#faf9f7] px-5 py-4 sm:gap-4 sm:px-6 sm:py-5">
          <span className="font-heading text-[2rem] font-bold leading-none text-uagc-navy sm:text-[2.5rem]">
            86%
          </span>
          <div>
            <p className="text-sm font-semibold text-uagc-navy sm:text-[0.9375rem]">
              of UAGC students receive financial aid
            </p>
            <p className="text-[0.6875rem] text-uagc-gray/60">
              2023–2024 IPEDS Student Financial Aid Survey
            </p>
          </div>
        </div>

        {/* Savings cards — independent multi-open */}
        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {WAYS_TO_SAVE.map((item) => (
            <SaveCard
              key={item.id}
              item={item}
              isOpen={openCards.has(item.id)}
              onToggle={() => toggleCard(item.id)}
            />
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-uagc-gold/30 bg-[#faf9f7] p-5 text-center sm:p-6">
          <p className="text-sm font-semibold text-uagc-navy sm:text-[0.9375rem]">
            Not sure what you qualify for?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-uagc-gray">
            An advisor can build a personalized financial plan — no obligation,
            no cost.
          </p>
          <a href="#rfi" className="cta-primary mt-4 inline-flex text-sm">
            Talk to an Advisor
          </a>
        </div>
      </div>
    </section>
  );
}
