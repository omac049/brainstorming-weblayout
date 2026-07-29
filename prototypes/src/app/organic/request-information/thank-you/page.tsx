"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
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
import { VideoTestimonialSection } from "@/components/organic/VideoTestimonialSection";
import { ThankYouNextStepsSection } from "@/components/organic/ThankYouNextStepsSection";
import { PersonalizedEducationSection } from "@/components/organic/PersonalizedEducationSection";
import { ProgramDetailsSection } from "@/components/organic/ProgramDetailsSection";
import { ProgramsConsideredSection } from "@/components/organic/ProgramsConsideredSection";
import { TimeToGraduationCalculator } from "@/components/organic/TimeToGraduationCalculator";
import { AssetImage } from "@/components/shared/AssetImage";
import { getEnrollableStartDates } from "@/components/sections/UpcomingStartDates";
import { HOME_VIDEO_TESTIMONIALS } from "@/lib/organic-homepage-data";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import confetti from "canvas-confetti";

/* ============================================================
   DATA
   ============================================================ */

const SECTION_NAV = [
  { id: "next-steps", label: "Next Steps" },
  { id: "what-to-expect", label: "What to Expect" },
  { id: "time-to-graduation", label: "Your Timeline" },
  { id: "your-program", label: "Your Program" },
  { id: "testimonials", label: "What Students Are Saying" },
] as const;

const JOURNEY_STEPS = [
  { status: "complete", text: "Your request has been received and confirmed" },
  { status: "active", text: "Your advisor is being matched based on your program interest" },
  { status: "active", text: "Your transfer credit eligibility is being reviewed" },
  { status: "upcoming", text: "Your personalized enrollment pathway is taking shape" },
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
  { day: "Mon – Thu", hours: "5 a.m. – 7 p.m. PT" },
  { day: "Friday", hours: "5 a.m. – 5 p.m. PT" },
  { day: "Sat – Sun", hours: "7 a.m. – 4 p.m. PT" },
] as const;



/* ============================================================
   COMPONENTS
   ============================================================ */

function StickyNav() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    SECTION_NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-16 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm sm:top-[72px] lg:top-[108px]"
    >
      <div className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6">
        <ul className="flex min-w-max items-center gap-1 py-2">
          {SECTION_NAV.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm",
                  id === activeId
                    ? "bg-uagc-navy text-white"
                    : "text-uagc-gray hover:bg-gray-100 hover:text-uagc-navy",
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function getNextEnrollableDateDisplay(): string {
  const enrollable = getEnrollableStartDates();
  if (enrollable.length === 0) return "Coming Soon";
  const dateStr = enrollable[0].date;
  const year = new Date().getFullYear();
  const target = new Date(`${dateStr}, ${year}`);
  if (target.getTime() <= Date.now()) {
    return `${dateStr}, ${year + 1}`;
  }
  return `${dateStr}, ${year}`;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function calcNext() {
      const now = new Date();
      const enrollable = getEnrollableStartDates();
      if (enrollable.length === 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      const dateStr = enrollable[0].date;
      const year = now.getFullYear();
      let target = new Date(`${dateStr}, ${year}`);
      if (target.getTime() <= now.getTime()) {
        target = new Date(`${dateStr}, ${year + 1}`);
      }
      const diff = Math.max(0, target.getTime() - now.getTime());
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    }
    setTimeLeft(calcNext());
    setMounted(true);
    const interval = setInterval(() => setTimeLeft(calcNext()), 1000);
    return () => clearInterval(interval);
  }, []);

  const segments: { value: number; label: string; highlight?: boolean }[] = [
    { value: timeLeft.days, label: "days" },
    { value: timeLeft.hours, label: "hrs" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "sec", highlight: true },
  ];

  return (
    <div
      className={cn(
        "mt-5 flex items-center justify-center gap-2 sm:gap-3 transition-opacity duration-500",
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      {segments.map(({ value, label, highlight }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <span className={cn(
              "flex size-12 items-center justify-center rounded-xl font-heading text-xl font-bold tabular-nums sm:size-14 sm:text-2xl",
              highlight
                ? "bg-uagc-sky/15 text-uagc-navy ring-2 ring-uagc-navy/40"
                : "bg-white/10 text-white ring-1 ring-white/10",
            )}>
              {String(value).padStart(2, "0")}
            </span>
            <span className={cn(
              "mt-2 text-[10px] font-bold uppercase tracking-wider",
              highlight ? "text-uagc-sky" : "text-white/60",
            )}>
              {label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span className="mb-5 text-lg font-bold text-white/25">:</span>
          )}
        </div>
      ))}
    </div>
  );
}


function AdvisorSupportTeam() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="what-to-expect"
      aria-labelledby="advisor-team-heading"
      className="scroll-mt-32 border-t border-uagc-border bg-white py-14 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "mb-10 text-center sm:mb-12",
            "reveal-section",
            isVisible && "is-visible",
          )}
        >
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2
            id="advisor-team-heading"
            className="type-h2 text-uagc-navy"
          >
            Your Advisor Support Team
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            From enrollment to graduation, you&apos;ll have dedicated advisors
            for academic, financial, and personal guidance.
          </p>
        </div>

        {/* Advisor role cards */}
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {ADVISOR_ROLES.map((role, index) => {
            const Icon = role.icon;
            return (
              <article
                key={role.title}
                className={cn(
                  "group relative cursor-default overflow-hidden rounded-2xl border border-uagc-border bg-uagc-surface px-5 pb-6 pt-7",
                  "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  "hover:border-uagc-navy/40 hover:shadow-[0_4px_20px_rgba(12,35,75,0.08)]",
                  "reveal-section",
                  `stagger-${index + 1}`,
                  isVisible && "is-visible",
                )}
              >
                {/* Gold top accent — reveals on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.75 origin-left scale-x-0 bg-uagc-navy transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                />
                <span className="flex size-11 items-center justify-center rounded-xl bg-uagc-navy text-white transition-[background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-uagc-navy sm:size-12">
                  <Icon className="size-5 sm:size-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold leading-snug text-uagc-navy sm:text-[1.0625rem]">
                  {role.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-uagc-gray sm:text-sm">
                  {role.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Hours band — availability at a glance */}
        <div
          className={cn(
            "mx-auto mt-8 max-w-5xl sm:mt-10",
            "reveal-section stagger-4",
            isVisible && "is-visible",
          )}
        >
          <div className="relative overflow-hidden rounded-2xl border border-uagc-border bg-uagc-navy">
            <div className="px-5 py-5 sm:px-8 sm:py-5">
              {/* Header row */}
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-uagc-sky/10">
                  <Headphones className="size-[18px] text-uagc-sky" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white sm:text-[0.9375rem]">
                    Available 7 days a week
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">
                    Phone, chat, and email
                  </p>
                </div>
              </div>

              {/* Schedule slots — stacked on mobile, inline on desktop */}
              <div className="mt-4 grid grid-cols-1 gap-1.5 sm:mt-3 sm:grid-cols-3 sm:gap-2.5">
                {ADVISOR_HOURS.map((slot) => (
                  <span
                    key={slot.day}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white/8 px-3.5 py-2.5 text-[0.8125rem] ring-1 ring-white/10 sm:justify-center sm:gap-2 sm:py-2 sm:text-sm"
                  >
                    <span className="font-semibold text-uagc-sky">
                      {slot.day}
                    </span>
                    <span className="text-white/80">{slot.hours}</span>
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
  const program = searchParams.get("program") ?? "Bachelor of Arts in Business Administration";
  const confirmationId = searchParams.get("confirmationId") ?? "7717243";
  const email = searchParams.get("email");

  const headline = "Congratulations";

  const maskedEmail = email
    ? `${email.slice(0, 2)}${"*".repeat(Math.max(email.indexOf("@") - 2, 2))}${email.slice(email.indexOf("@"))}`
    : null;

  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const gold = "#EF9600";
    const navy = "#0C234B";
    const white = "#FFFFFF";

    function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: [gold, navy, white],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: [gold, navy, white],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    }

    const timeout = setTimeout(frame, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <SiteHeader hideRequestInfo />
      <main className="flex-1 pt-16 sm:pt-[72px] lg:pt-[108px]">
        {/* ─── HERO: Split layout — content left, celebration image right ─────── */}
        <section id="confirmation" className="scroll-mt-32 relative overflow-hidden bg-uagc-navy">
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-14 xl:grid-cols-[1fr_480px]">
              {/* Left column — content */}
              <div>
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8">
                  <ol className="flex flex-wrap items-center gap-1 text-xs text-white/60 sm:text-sm">
                    <li>
                      <Link href="/organic/homepage" className="hover:text-white hover:underline">
                        Home
                      </Link>
                    </li>
                    <li aria-hidden><ChevronRight className="size-3" /></li>
                    <li><span>Request Information</span></li>
                    <li aria-hidden><ChevronRight className="size-3" /></li>
                    <li aria-current="page"><span className="font-medium text-white">Thank You</span></li>
                  </ol>
                </nav>

                {/* Success badge */}
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-green-500/15 px-4 py-2">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-sm font-semibold text-green-300">Step 1 Complete</span>
                </div>

                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
                  {headline}{" "}
                  <span className="text-uagc-sky">{firstName}</span>,
                </h1>
                <p className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-[2.25rem]">
                  <span className="relative inline-block">
                    Your future starts now.
                    <span aria-hidden className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-uagc-navy" />
                  </span>
                </p>

                {program && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-uagc-navy/40 bg-uagc-sky/10 px-4 py-2.5">
                    <GraduationCap className="size-4 text-uagc-sky" aria-hidden />
                    <span className="text-sm font-semibold text-uagc-sky sm:text-base">
                      {program}
                    </span>
                  </div>
                )}

                <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
                  You just took the most important step — choosing to invest in yourself.
                  Things are already in motion behind the scenes.
                </p>

                {/* Active journey — what's happening NOW */}
                <div className="mt-8">
                  <p className="text-sm font-semibold text-white sm:text-base">
                    What&apos;s happening right now:
                  </p>
                  <ul className="mt-3 space-y-3">
                    {JOURNEY_STEPS.map((step) => (
                      <li key={step.text} className="flex items-start gap-2.5 text-sm sm:text-[0.9375rem]">
                        {step.status === "complete" ? (
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-400" aria-hidden />
                        ) : step.status === "active" ? (
                          <span className="mt-1 flex size-4 shrink-0 items-center justify-center">
                            <span className="absolute size-3 animate-ping rounded-full bg-uagc-sky/20" />
                            <span className="relative size-2 rounded-full bg-uagc-navy" />
                          </span>
                        ) : (
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-white/25" aria-hidden />
                        )}
                        <span className={cn(
                          step.status === "complete" && "text-green-300 line-through decoration-green-400/40",
                          step.status === "active" && "text-white font-medium",
                          step.status === "upcoming" && "text-white/50",
                        )}>
                          {step.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://cloud.mail.uagc.edu/apply"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-uagc-red px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-150 ease-out hover:bg-uagc-red-hover active:scale-[0.97]"
                  >
                    Start Your Application →
                  </a>
                  <Link
                    href="/organic/online-degrees"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-150 ease-out active:scale-[0.97] hover:border-white hover:bg-white/10"
                  >
                    Explore Programs
                  </Link>
                </div>

                {/* Badges */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-uagc-navy/40 bg-uagc-sky/10 px-4 py-1.5 text-xs font-bold text-uagc-navy">
                    $0 Application Fee
                  </span>
                  <span className="rounded-full border border-uagc-navy/40 bg-uagc-sky/10 px-4 py-1.5 text-xs font-bold text-uagc-navy">
                    No Standardized Test Required
                  </span>
                </div>
              </div>

              {/* Right column — two-card stack: image + countdown */}
              <div className="hidden lg:flex lg:flex-col lg:gap-3">
                {/* Card 1: Image with centered logo */}
                <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                  <AssetImage
                    src="/images/graduation-celebration.png"
                    alt="UAGC graduates celebrating at commencement"
                    width={1024}
                    height={682}
                    className="block w-full"
                    sizes="(min-width: 1280px) 480px, 420px"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-6">
                    <AssetImage
                      src="/images/UAGC_Main_Horizontal_RGB_Reversed-451x140.webp"
                      alt="University of Arizona Global Campus"
                      width={451}
                      height={140}
                      className="h-16 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Card 2: Start date countdown */}
                <div className="rounded-xl border border-white/10 bg-uagc-navy/80 px-6 py-6 text-center backdrop-blur-md">
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping motion-reduce:animate-none rounded-full bg-uagc-navy opacity-60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-uagc-navy" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-widest text-uagc-sky">
                      Next Start
                    </p>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">{getNextEnrollableDateDisplay()}</p>
                  <CountdownTimer />
                </div>
              </div>

              {/* Mobile — two-card stack: image + countdown */}
              <div className="flex flex-col gap-3 lg:hidden">
                {/* Card 1: Image with centered logo */}
                <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                  <AssetImage
                    src="/images/graduation-celebration.png"
                    alt="UAGC graduates celebrating at commencement"
                    width={1024}
                    height={682}
                    className="block w-full"
                    sizes="(min-width: 640px) 85vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5">
                    <AssetImage
                      src="/images/UAGC_Main_Horizontal_RGB_Reversed-451x140.webp"
                      alt="University of Arizona Global Campus"
                      width={451}
                      height={140}
                      className="h-14 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Card 2: Start date countdown */}
                <div className="rounded-xl border border-white/10 bg-uagc-navy/80 px-5 py-5 text-center backdrop-blur-md">
                  <div className="flex items-center justify-center gap-2">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping motion-reduce:animate-none rounded-full bg-uagc-navy opacity-60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-uagc-navy" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-widest text-uagc-sky">
                      Next Start
                    </p>
                  </div>
                  <p className="mt-2 text-base font-semibold text-white">{getNextEnrollableDateDisplay()}</p>
                  <CountdownTimer />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Receipt Band: Confirmation details ─────── */}
        <div className="border-b border-white/5 bg-[#081a3a]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle2 className="size-4 text-green-400" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Request submitted</p>
                <p className="text-xs text-white/60">Ref #{confirmationId}{maskedEmail ? ` · Sent to ${maskedEmail}` : ""}</p>
              </div>
            </div>
            {program && (
              <div className="flex items-center gap-2">
                <BookOpen className="size-3.5 text-white/40" aria-hidden />
                <span className="text-xs font-medium text-white/80">{program}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-white/40" aria-hidden />
              <span className="text-xs text-white/70">Advisor contact within 1 business day</span>
            </div>
          </div>
        </div>

        {/* Section Nav */}
        <StickyNav />

        {/* ─── NEXT STEPS: The Admissions Process ─────────────── */}
        <ThankYouNextStepsSection className="scroll-mt-32" />

        {/* ─── CONTACT: Have Questions? ───────────────────────── */}
        <section className="bg-uagc-navy py-10 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="type-h2 text-white">
              Have Questions that Can&apos;t Wait?
            </h2>
            <p className="mt-2 text-base text-uagc-navy-muted">
              Your support team is available around the clock.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+18667111700"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-uagc-navy transition-all duration-150 ease-out hover:bg-gray-100 active:scale-[0.97]"
              >
                <Phone className="size-4" aria-hidden />
                +1 866 711 1700
              </a>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition-all duration-150 ease-out hover:bg-white/10 active:scale-[0.97]"
              >
                <MessageCircle className="size-4" aria-hidden />
                Let&apos;s Chat
              </button>
            </div>
          </div>
        </section>

        {/* ─── ADVISOR SUPPORT TEAM ───────────────────────────── */}
        <AdvisorSupportTeam />

        {/* ─── TIME TO GRADUATION CALCULATOR ──────────────────── */}
        <TimeToGraduationCalculator className="bg-uagc-surface" />

        {/* ─── YOUR PROGRAM: Careers, Faculty, Student Stories ── */}
        <ProgramDetailsSection
          programName={program}
          id="your-program"
          className="scroll-mt-32"
        />

        {/* ─── PROGRAMS OTHER STUDENTS CONSIDERED ──────────────── */}
        <ProgramsConsideredSection programName={program} />


        {/* ─── READY TO START CTA ─────────────────────────────── */}
        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="type-h2 text-uagc-navy">
              Ready to Take the Next Step?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              Your application is free and takes about 15 minutes. No obligation — your advisor
              is here to help along the way.
            </p>
            <a
              href="https://cloud.mail.uagc.edu/apply"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-uagc-red px-10 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-all duration-150 ease-out hover:bg-uagc-red-hover active:scale-[0.97]"
            >
              Apply Now — It&apos;s Free
            </a>
          </div>
        </section>

        {/* ─── TESTIMONIALS: Student Experience ──────────── */}
        <VideoTestimonialSection
          id="testimonials"
          eyebrow="Student Experience"
          heading="In Their Own Words"
          subheading="Our students are tenacious and inspiring."
          testimonials={[...HOME_VIDEO_TESTIMONIALS]}
        />

        {/* ─── ARTICLES ───────────────────────────────────────── */}
        <PersonalizedEducationSection
          id="explore"
          heading="Explore While You Wait"
          subheading="Get a head start with articles chosen for incoming students."
        />

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
