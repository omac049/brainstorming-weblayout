"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  Headphones,
  MessageCircle,
  Phone,
  UserCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/organic/SiteHeader";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { ThankYouNextStepsSection } from "@/components/organic/ThankYouNextStepsSection";
import { ThankYouAlsoConsideredSection } from "@/components/organic/ThankYouAlsoConsideredSection";
import { ThankYouContactSection } from "@/components/organic/ThankYouContactSection";
import { AssetImage } from "@/components/shared/AssetImage";
import {
  getEnrollableStartDates,
  daysUntilStartDate,
} from "@/components/sections/UpcomingStartDates";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ============================================================
   DATA
   ============================================================ */

const JOURNEY_STEPS = [
  {
    status: "complete",
    text: "Your request has been received and confirmed",
  },
  {
    status: "active",
    text: "Your advisor is being matched based on your program interest",
  },
  {
    status: "active",
    text: "Your transfer credit eligibility is being reviewed",
  },
  {
    status: "upcoming",
    text: "Your personalized enrollment pathway is taking shape",
  },
] as const;

const ADVISOR_ROLES = [
  {
    icon: UserCheck,
    title: "Admission Specialist",
    description:
      "Your first point of contact — walks you through the application, evaluates your transcripts, and builds a transfer credit plan.",
  },
  {
    icon: GraduationCap,
    title: "Academic Advisor",
    description:
      "Stays with you from first course to cap and gown — maps your degree plan, tracks your progress, and adjusts when life shifts.",
  },
  {
    icon: DollarSign,
    title: "Financial Services Advisor",
    description:
      "Finds every dollar available to you — federal aid, scholarships, employer benefits, and military tuition assistance.",
  },
] as const;

const ADVISOR_HOURS = [
  { day: "Mon – Thu", hours: "5 a.m. – 7 p.m. PT", type: "live" as const },
  { day: "Friday", hours: "5 a.m. – 5 p.m. PT", type: "live" as const },
  { day: "Sat – Sun", hours: "Chat available", type: "chatbot" as const },
] as const;

function getNextStartDate(): { label: string; daysLeft: number } | null {
  const enrollable = getEnrollableStartDates();
  if (enrollable.length === 0) return null;
  const next = enrollable[0];
  const days = daysUntilStartDate(next.date);
  return { label: next.date, daysLeft: days };
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function AdvisorSupportTeam() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="what-to-expect"
      aria-labelledby="advisor-team-heading"
      className="scroll-mt-32 border-t border-uagc-border bg-white py-10 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mb-8 sm:mb-12 sm:text-center",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <span aria-hidden className="sm:mx-auto mb-3 accent-bar" />
          <h2
            id="advisor-team-heading"
            className="type-h2 text-uagc-navy"
          >
            Your Advisor Support Team
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray sm:mt-3 sm:text-base">
            From enrollment to graduation, you&apos;ll have dedicated advisors
            for academic, financial, and personal guidance.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {ADVISOR_ROLES.map((role, index) => {
            const Icon = role.icon;
            return (
              <article
                key={role.title}
                className={cn(
                  "group relative cursor-default overflow-hidden rounded-2xl border border-uagc-border bg-uagc-surface",
                  "px-5 pb-5 pt-5 sm:pb-6 sm:pt-7",
                  "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  "hover:border-uagc-gold hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
                  "reveal-section",
                  `stagger-${index + 1}`,
                  isVisible && "is-visible",
                )}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.75 origin-left scale-x-0 bg-uagc-gold transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                />
                {/* Mobile: horizontal icon+title, Desktop: stacked */}
                <div className="flex items-center gap-3 sm:block">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-uagc-navy text-white transition-[background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-uagc-gold sm:size-12">
                    <Icon
                      className="size-5 sm:size-[22px]"
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className="font-heading text-base font-bold leading-snug text-uagc-navy sm:mt-4 sm:text-[1.0625rem]">
                    {role.title}
                  </h3>
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-uagc-gray sm:text-sm">
                  {role.description}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className={cn(
            "mx-auto mt-6 max-w-5xl sm:mt-10",
            "reveal-section stagger-4",
            isVisible && "is-visible",
          )}
        >
          <div className="relative overflow-hidden rounded-2xl border border-uagc-border bg-uagc-navy">
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-uagc-gold/15">
                  <Headphones
                    className="size-[18px] text-uagc-gold"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">
                    Advisors Mon – Fri, Chat on weekends
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">
                    Phone &amp; email weekdays · Chatbot Sat – Sun
                  </p>
                </div>
              </div>

              <span
                aria-hidden
                className="hidden h-8 w-px bg-white/10 sm:block"
              />

              <div className="flex w-full flex-col gap-1.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5">
                {ADVISOR_HOURS.map((slot) => (
                  <span
                    key={slot.day}
                    className="inline-flex min-h-[44px] items-center justify-between gap-2 rounded-lg bg-white/8 px-3.5 py-2.5 text-[0.8125rem] ring-1 ring-white/10 sm:min-h-0 sm:justify-start sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    <span className="font-semibold text-uagc-gold">
                      {slot.day}
                    </span>
                    <span className="inline-flex items-center gap-1 text-white/80">
                      {slot.type === "chatbot" && (
                        <MessageCircle className="size-3 text-uagc-gold/70" aria-hidden />
                      )}
                      {slot.hours}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE CONTENT
   ============================================================ */

function ThankYouContent() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("firstName") ?? "Becky";
  const program = searchParams.get("program");
  const confirmationId = searchParams.get("confirmationId") ?? "7717243";
  const email = searchParams.get("email");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maskedEmail = email
    ? `${email.slice(0, 2)}${"*".repeat(Math.max(email.indexOf("@") - 2, 2))}${email.slice(email.indexOf("@"))}`
    : null;

  const startDate = getNextStartDate();

  return (
    <>
      <SiteHeader hideRequestInfo />
      <main className="flex-1 pt-16 sm:pt-[72px] lg:pt-[108px]">
        {/* ─── HERO: Celebration with journey steps ─────── */}
        <section
          id="confirmation"
          className="scroll-mt-32 relative overflow-hidden bg-uagc-navy"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_420px] lg:gap-14 xl:grid-cols-[1fr_480px]">
              {/* Left column — content */}
              <div>
                <nav aria-label="Breadcrumb" className="mb-5 sm:mb-8">
                  <ol className="flex flex-wrap items-center gap-1 text-xs text-white/60 sm:text-sm">
                    <li>
                      <Link
                        href="/organic/homepage"
                        className="hover:text-white hover:underline"
                      >
                        Home
                      </Link>
                    </li>
                    <li aria-hidden>
                      <ChevronRight className="size-3" />
                    </li>
                    <li>
                      <span>Request Information</span>
                    </li>
                    <li aria-hidden>
                      <ChevronRight className="size-3" />
                    </li>
                    <li aria-current="page">
                      <span className="font-medium text-white">Thank You</span>
                    </li>
                  </ol>
                </nav>

                {/* Animated success badge */}
                <div
                  className={cn(
                    "mb-4 sm:mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-green-500/15 px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all duration-700 ease-out",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0",
                  )}
                >
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-green-300 sm:text-sm">
                    Step 1 Complete
                  </span>
                </div>

                <h1
                  className={cn(
                    "font-heading text-[1.75rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl",
                    "transition-all duration-700 ease-out delay-100",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                  style={{ textWrap: "balance" }}
                >
                  Congratulations{" "}
                  <span className="text-uagc-gold">{firstName}</span>,
                </h1>
                <p
                  className={cn(
                    "mt-2 text-lg font-light text-uagc-gold sm:mt-3 sm:text-2xl",
                    "transition-all duration-700 ease-out delay-200",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  Your future starts now.
                </p>
                <p
                  className={cn(
                    "mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/80 sm:mt-4 sm:text-base",
                    "transition-all duration-700 ease-out delay-300",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  You just took the most important step — choosing to invest in
                  yourself. Things are already in motion behind the scenes.
                </p>

                {/* Mobile: inline start date chip */}
                {startDate && (
                  <div
                    className={cn(
                      "mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 lg:hidden",
                      "transition-all duration-700 ease-out delay-[350ms]",
                      mounted
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0",
                    )}
                  >
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-uagc-gold opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex size-2 rounded-full bg-uagc-gold" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-widest text-uagc-gold">
                      Next Start
                    </p>
                    <span className="text-sm font-semibold text-white">
                      {startDate.label}
                    </span>
                    {startDate.daysLeft > 0 && (
                      <span className="text-xs text-white/50">
                        {startDate.daysLeft === 1
                          ? "Tomorrow"
                          : `${startDate.daysLeft} days`}
                      </span>
                    )}
                  </div>
                )}

                {/* Journey steps */}
                <div
                  className={cn(
                    "mt-6 sm:mt-8 transition-all duration-700 ease-out delay-[400ms]",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  <p className="text-sm font-semibold text-white sm:text-base">
                    What&apos;s happening right now:
                  </p>
                  <ul className="mt-3 space-y-2.5 sm:space-y-3">
                    {JOURNEY_STEPS.map((step) => (
                      <li
                        key={step.text}
                        className="flex items-start gap-2.5 text-[0.8125rem] leading-snug sm:text-[0.9375rem] sm:leading-relaxed"
                      >
                        {step.status === "complete" ? (
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-green-400"
                            aria-hidden
                          />
                        ) : step.status === "active" ? (
                          <span className="mt-1 flex size-4 shrink-0 items-center justify-center">
                            <span className="absolute size-3 animate-ping rounded-full bg-uagc-gold/40" />
                            <span className="relative size-2 rounded-full bg-uagc-gold" />
                          </span>
                        ) : (
                          <span
                            className="mt-1.5 size-2 shrink-0 rounded-full bg-white/25"
                            aria-hidden
                          />
                        )}
                        <span
                          className={cn(
                            step.status === "complete" &&
                              "text-green-300 line-through decoration-green-400/40",
                            step.status === "active" &&
                              "font-medium text-white",
                            step.status === "upcoming" && "text-white/50",
                          )}
                        >
                          {step.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs — full-width on mobile */}
                <div
                  className={cn(
                    "mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row",
                    "transition-all duration-700 ease-out delay-500",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  <a
                    href="https://cloud.mail.uagc.edu/apply"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-uagc-red px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-150 ease-out hover:bg-uagc-red-hover active:scale-[0.97] sm:min-h-11 sm:py-3"
                  >
                    Start Your Application →
                  </a>
                  <Link
                    href="/organic/online-degrees"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-white/30 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-all duration-150 ease-out hover:border-white hover:bg-white/10 active:scale-[0.97] sm:min-h-11 sm:py-3"
                  >
                    Explore Programs
                  </Link>
                </div>

                {/* Badges */}
                <div
                  className={cn(
                    "mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3",
                    "transition-all duration-700 ease-out delay-[600ms]",
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                >
                  <span className="rounded-full border border-uagc-gold/30 bg-uagc-gold/10 px-3.5 py-1.5 text-xs font-bold text-uagc-gold sm:px-4">
                    $0 Application Fee
                  </span>
                  <span className="rounded-full border border-uagc-gold/30 bg-uagc-gold/10 px-3.5 py-1.5 text-xs font-bold text-uagc-gold sm:px-4">
                    No Standardized Test Required
                  </span>
                </div>
              </div>

              {/* Right column — image + start date (desktop only for image) */}
              <div
                className={cn(
                  "hidden flex-col gap-3 lg:flex",
                  "transition-all duration-700 ease-out delay-300",
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
              >
                <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                  <AssetImage
                    src="/images/graduation-celebration.png"
                    alt="UAGC graduates celebrating at commencement"
                    width={1024}
                    height={682}
                    className="block w-full"
                    sizes="(min-width: 1280px) 480px, (min-width: 1024px) 420px, 0px"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5 lg:pb-6">
                    <AssetImage
                      src="/images/UAGC_Main_Horizontal_RGB_Reversed-451x140.webp"
                      alt="University of Arizona Global Campus"
                      width={451}
                      height={140}
                      className="h-14 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] lg:h-16"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent lg:h-28" />
                </div>

                {/* Start date — desktop only (mobile uses inline chip above) */}
                {startDate && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-5 text-center lg:px-6 lg:py-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-uagc-gold opacity-60 motion-reduce:animate-none" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-uagc-gold" />
                      </span>
                      <p className="text-xs font-bold uppercase tracking-widest text-uagc-gold">
                        Next Start
                      </p>
                    </div>
                    <p className="mt-2 text-base font-semibold text-white lg:text-lg">
                      {startDate.label}
                    </p>
                    {startDate.daysLeft > 0 && (
                      <p className="mt-1 text-sm text-white/60">
                        {startDate.daysLeft === 1
                          ? "Starts tomorrow"
                          : `${startDate.daysLeft} days away`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Receipt Band ─────── */}
        <div className="border-b border-white/5 bg-[#081a3a]">
          <div className="mx-auto max-w-6xl px-5 py-4 sm:px-10">
            {/* Desktop: single row */}
            <div className="hidden items-center justify-between gap-6 sm:flex">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle2
                    className="size-4 text-green-400"
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Request submitted
                  </p>
                  <p className="text-xs text-white/60">
                    Ref #{confirmationId}
                    {maskedEmail ? ` · Sent to ${maskedEmail}` : ""}
                  </p>
                </div>
              </div>
              {program && (
                <div className="flex items-center gap-2">
                  <BookOpen
                    className="size-3.5 text-white/40"
                    aria-hidden
                  />
                  <span className="text-xs font-medium text-white/80">
                    {program}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-white/40" aria-hidden />
                <span className="text-xs text-white/70">
                  Advisor contact within 1 business day
                </span>
              </div>
            </div>

            {/* Mobile: clean stacked layout */}
            <div className="flex flex-col gap-3 sm:hidden">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle2
                    className="size-4 text-green-400"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">
                    Request submitted
                  </p>
                  <p className="truncate text-xs text-white/60">
                    Ref #{confirmationId}
                    {maskedEmail ? ` · ${maskedEmail}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-11">
                {program && (
                  <div className="flex items-center gap-1.5">
                    <BookOpen
                      className="size-3.5 text-white/40"
                      aria-hidden
                    />
                    <span className="text-xs font-medium text-white/80">
                      {program}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-white/40" aria-hidden />
                  <span className="text-xs text-white/70">
                    Advisor within 1 business day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Next Steps ─────── */}
        <ThankYouNextStepsSection className="scroll-mt-32" />

        {/* ─── Also Considered ─────── */}
        <ThankYouAlsoConsideredSection program={program} />

        {/* ─── Advisor Support Team ─────── */}
        <AdvisorSupportTeam />

        {/* ─── Contact ─────── */}
        <ThankYouContactSection />
      </main>
      <SiteFooter hideRequestInfo />
    </>
  );
}

export default function OrganicThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
