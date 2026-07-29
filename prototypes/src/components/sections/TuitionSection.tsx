"use client";

import { useState } from "react";
import {
  GraduationCap,
  Shield,
  Banknote,
  BookOpen,
  Briefcase,
  Medal,
  ChevronDown,
  Check,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const PRICING_TIERS = [
  { label: "Undergraduate", amount: "$485", unit: "/credit", accent: false },
  { label: "Graduate", amount: "$625", unit: "/credit", accent: false },
  { label: "Application Fee", amount: "$0", unit: null, accent: true },
];

interface SavingsOption {
  id: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  details: string[];
  qualifier?: string;
}

const SAVINGS_OPTIONS: SavingsOption[] = [
  {
    id: "fafsa",
    label: "FAFSA & Federal Aid",
    tagline: "Grants and low-interest loans — most students qualify",
    icon: Shield,
    stat: "94%",
    statLabel: "receive aid",
    details: [
      "File the FAFSA (~30 min) to unlock Pell Grants up to $7,395/year — no repayment required.",
      "31% of UAGC undergrads receive Pell Grants; 36% use federal loans at low fixed rates.",
      "Grants and scholarships are always applied before loans.",
    ],
    qualifier: "2023–2024 IPEDS Student Financial Aid Survey",
  },
  {
    id: "scholarships",
    label: "Scholarships",
    tagline: "Free money you never pay back",
    icon: GraduationCap,
    stat: "$0",
    statLabel: "to repay",
    details: [
      "Every UAGC student gets access to a platform matching you with external scholarship opportunities.",
      "Search databases like StudentAid.gov, Fastweb, and Scholarship America — thousands of awards.",
      "Legitimate scholarships never charge an application fee or guarantee awards.",
    ],
  },
  {
    id: "military",
    label: "Military Benefits",
    tagline: "Reduced tuition and waived fees for service members",
    icon: Medal,
    stat: "$250",
    statLabel: "/credit",
    details: [
      "Liberty Grant: $250/credit undergrad, $350/credit master's — plus waived tech, materials, and graduation fees.",
      "Patriot Grant: $450/credit for veterans, spouses, and dependents.",
      "Accepts GI Bill, Tuition Assistance, MyCAA, and Yellow Ribbon benefits.",
    ],
  },
  {
    id: "employer",
    label: "Employer Partners",
    tagline: "Your employer may cover tuition",
    icon: Briefcase,
    stat: "1,500+",
    statLabel: "partners",
    details: [
      "Partners include T-Mobile, Walgreens, USPS, Edward Jones, J.B. Hunt, and more.",
      "Many partners offer full tuition reimbursement — some students pay $0 out of pocket.",
      "Ask HR or a UAGC advisor if your employer participates, even if not listed.",
    ],
  },
  {
    id: "transfer",
    label: "Transfer Credits",
    tagline: "Bring credits you've already earned",
    icon: BookOpen,
    stat: "41.5",
    statLabel: "avg credits",
    details: [
      "No cap on approved bachelor's transfer credits from any regionally accredited institution.",
      "Academic partnerships (Maricopa, Dallas College, Phi Theta Kappa) offer up to $4,950/year in savings.",
      "Request a free unofficial pre-evaluation before you enroll.",
    ],
  },
  {
    id: "prior-learning",
    label: "Prior Learning Credit",
    tagline: "Turn work and military experience into credit",
    icon: Banknote,
    stat: "6",
    statLabel: "pathways",
    details: [
      "Portfolio assessments let you demonstrate college-level knowledge from jobs or volunteer work.",
      "Military transcripts (JST) are reviewed for ACE-recommended credit that transfers directly.",
      "CLEP and DSST exams let you earn credit for subjects you already know.",
    ],
  },
];

function SavingsCard({ item }: { item: SavingsOption }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "rounded-xl border bg-white transition-[border-color,box-shadow] duration-200",
        open
          ? "border-uagc-navy ring-1 ring-uagc-navy/10"
          : "border-uagc-border hover:border-uagc-navy/30",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`savings-${item.id}`}
        className="flex w-full cursor-pointer items-start gap-3 p-4 text-left sm:p-5"
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
            open ? "bg-uagc-navy" : "bg-uagc-surface",
          )}
          aria-hidden
        >
          <Icon
            className={cn(
              "size-4 transition-colors duration-200",
              open ? "text-white" : "text-uagc-navy",
            )}
            strokeWidth={1.75}
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-uagc-navy sm:text-[0.9375rem]">
            {item.label}
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
            {item.tagline}
          </p>
        </div>

        <ChevronDown
          className={cn(
            "mt-1 size-4 shrink-0 text-uagc-gray/50 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={`savings-${item.id}`}
          className="border-t border-uagc-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
        >
          <ul className="space-y-2.5">
            {item.details.map((detail, idx) => (
              <li key={idx} className="flex gap-2.5">
                <span
                  className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-uagc-navy/10"
                  aria-hidden
                >
                  <Check
                    className="size-2.5 text-uagc-navy"
                    strokeWidth={3}
                    aria-hidden
                  />
                </span>
                <span className="text-[0.8125rem] leading-relaxed text-uagc-gray">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
          {item.qualifier && (
            <p className="mt-3 text-[0.6875rem] text-uagc-gray/70 italic">
              {item.qualifier}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export interface TuitionSectionProps {
  id?: string;
  heading?: string;
  className?: string;
}

export function TuitionSection({
  id,
  heading = "Tuition & Financial Aid",
  className,
}: TuitionSectionProps) {
  return (
    <section id={id} className={cn("section-pad bg-uagc-cream", className)}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section header — centered for unified vertical flow */}
        <div className="mb-8 text-center lg:mb-10">
          <span
            aria-hidden
            className="mx-auto mb-3 accent-bar"
          />
          <h2 className="type-h2 text-uagc-navy">{heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            Transparent costs, no hidden fees — and multiple ways to reduce what
            you pay.
          </p>
        </div>

        {/* Pricing tiers — stacked rows on mobile, 3-col centered cards on sm+ */}
        <div className="space-y-2 sm:grid sm:grid-cols-3 sm:gap-3 sm:space-y-0">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.label}
              className={cn(
                "rounded-xl border",
                "flex items-center justify-between px-4 py-3.5",
                "sm:flex-col sm:items-center sm:justify-center sm:px-5 sm:py-6 sm:text-center",
                tier.accent
                  ? "border-uagc-red bg-uagc-cream-warm"
                  : "border-uagc-border bg-white",
              )}
            >
              <div className="flex items-center gap-2 sm:flex-col sm:gap-0">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-uagc-gray">
                  {tier.label}
                </p>
                {tier.accent && (
                  <p className="text-[0.625rem] font-semibold text-uagc-red sm:mt-1">
                    No cost to apply
                  </p>
                )}
              </div>
              <p className="font-heading text-[1.75rem] font-bold leading-none tracking-tight text-uagc-navy sm:mt-1 sm:text-[2.5rem]">
                {tier.amount}
                {tier.unit && (
                  <span className="text-xs font-medium text-uagc-gray sm:text-sm">
                    {tier.unit}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge stat — connects pricing to savings */}
        <div className="my-8 flex flex-col items-center gap-1 text-center lg:my-10">
          <p className="text-sm leading-relaxed text-uagc-gray sm:text-[0.9375rem]">
            <span className="font-semibold text-uagc-navy">
              86% of UAGC students
            </span>{" "}
            receive financial aid or scholarship assistance.
          </p>
          <p className="text-[0.6875rem] text-uagc-gray/60">
            2023–2024 IPEDS Student Financial Aid Survey
          </p>
        </div>

        {/* Savings grid — 1-col mobile, 2-col tablet, 3-col desktop */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SAVINGS_OPTIONS.map((item) => (
            <SavingsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
