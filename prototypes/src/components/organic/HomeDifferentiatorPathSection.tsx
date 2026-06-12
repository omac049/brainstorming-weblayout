"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ClipboardList,
  DollarSign,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Shield,
  Award,
  Briefcase,
  CreditCard,
  Handshake,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TABS = [
  { id: "degrees", label: "Online Degrees", icon: GraduationCap },
  { id: "admission", label: "Admission", icon: ClipboardList },
  { id: "financial-aid", label: "Financial Aid", icon: DollarSign },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface PathCardProps {
  icon: typeof BookOpen;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function PathCard({ icon: Icon, title, description, href, linkLabel, index }: PathCardProps & { index: number }) {
  return (
    <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible">
      <Link
        href={href}
        className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-uagc-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-[transform,border-color,box-shadow] duration-200 hover:border-uagc-border-light-hover hover:shadow-[0_4px_12px_rgba(12,35,75,0.08)] active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:p-7"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-uagc-cream-warm transition-[transform,background-color] duration-150 group-hover:bg-uagc-gold-tint-hover group-hover:scale-105">
          <Icon className="size-5 text-uagc-gold" strokeWidth={1.75} aria-hidden />
        </span>
        <h4 className="mt-4 font-heading text-[1.0625rem] font-semibold leading-snug text-uagc-navy">
          {title}
        </h4>
        <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-uagc-gray">
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-uagc-navy transition-colors duration-150 group-hover:text-uagc-gold">
          {linkLabel}
          <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
        </span>
      </Link>
    </motion.div>
  );
}

const TAB_CONTENT: Record<TabId, PathCardProps[]> = {
  degrees: [
    {
      icon: BookOpen,
      title: "54+ Accredited Programs",
      description: "Business, Nursing, Education, Health Care, IT, Criminal Justice, and more — associate through doctoral. Many align with professional certifications.",
      href: "/organic/online-degrees",
      linkLabel: "View Online Degrees",
    },
    {
      icon: MessageCircle,
      title: "Not Sure Where to Start?",
      description: "An advisor helps you match your career goals to a program and evaluates your transfer credits — no obligation.",
      href: "#rfi",
      linkLabel: "Request Information",
    },
    {
      icon: GraduationCap,
      title: "One Class, Full Focus",
      description: "5–6 week sessions, one course at a time — real progress without the burnout of juggling multiple classes.",
      href: "/organic/online-degrees",
      linkLabel: "Explore Programs",
    },
  ],
  admission: [
    {
      icon: ClipboardList,
      title: "Simple Application",
      description: "No fee, no entrance exams. Submit online and an advisor walks you through every step — most students hear back within a day.",
      href: "https://www.uagc.edu/admission",
      linkLabel: "Learn More",
    },
    {
      icon: Award,
      title: "Transfer Your Credits",
      description: "Credits from community colleges, military training, and professional certifications count. Free transcript evaluation before you commit.",
      href: "https://www.uagc.edu/admission/transfer-credits",
      linkLabel: "Transfer Credits",
    },
    {
      icon: Briefcase,
      title: "Prior Learning Assessment",
      description: "Turn work experience, military service, and certifications into real college credit — even from 25+ years ago.",
      href: "https://www.uagc.edu/admission/transfer-credits/non-traditional",
      linkLabel: "See How PLA Works",
    },
  ],
  "financial-aid": [
    {
      icon: CreditCard,
      title: "86% Receive Aid",
      description: "Scholarships, Pell Grants, and employer partnerships — most students pay less than the $485/credit sticker price.",
      href: "https://www.uagc.edu/tuition-financial-aid",
      linkLabel: "Get Details",
    },
    {
      icon: Shield,
      title: "Military Benefits",
      description: "GI Bill, Tuition Assistance, MyCAA, and the Liberty Grant ($250/credit undergrad) for service members, veterans, and spouses.",
      href: "https://www.uagc.edu/military",
      linkLabel: "Military Resources",
    },
    {
      icon: Handshake,
      title: "Employer & Community Partners",
      description: "1,500+ employer and community college partnerships offer tuition assistance — your advisor can check your eligibility.",
      href: "https://www.uagc.edu/tuition-financial-aid/partnerships",
      linkLabel: "See Partnerships",
    },
  ],
};

interface HomeDifferentiatorPathSectionProps {
  show?: "all" | "tabs" | "cta";
}

export function HomeDifferentiatorPathSection({ show = "all" }: HomeDifferentiatorPathSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("degrees");
  const tablistRef = useRef<HTMLDivElement>(null);
  const { ref: tabsRevealRef, isVisible: tabsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: ctaRevealRef, isVisible: ctaVisible } = useScrollReveal<HTMLDivElement>();

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const tabIds = TABS.map((t) => t.id);
      const currentIndex = tabIds.indexOf(activeTab);
      let nextIndex = currentIndex;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabIds.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = tabIds.length - 1;
      }

      if (nextIndex !== currentIndex) {
        setActiveTab(tabIds[nextIndex]);
        const nextButton = tablistRef.current?.querySelector<HTMLButtonElement>(
          `#tab-${tabIds[nextIndex]}`
        );
        nextButton?.focus();
      }
    },
    [activeTab]
  );

  return (
    <section
      id="degree-path"
      className="scroll-mt-28 lg:scroll-mt-36"
      aria-labelledby="home-path-heading"
    >
      {/* ── Find Your Path (tabbed) ── */}
      {(show === "all" || show === "tabs") && <div ref={tabsRevealRef} className="section-pad bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className={cn("mx-auto max-w-2xl text-center reveal-section", tabsVisible && "is-visible")}>
            <span aria-hidden className="mx-auto mb-3 accent-bar" />
            <h2 id="home-path-heading" className="type-h2 text-uagc-navy">Find Your Path</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
              Degrees, admission, and financial aid — explore what fits your goals.
            </p>
          </div>

          {/* Tab bar — pill design with keyboard navigation */}
          <div className="mt-10 flex justify-center">
            <div
              ref={tablistRef}
              className="relative inline-flex w-full max-w-lg gap-1 rounded-full border border-uagc-border-light bg-uagc-tab-track p-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] sm:w-auto"
              role="tablist"
              aria-label="Explore your path"
            >
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    type="button"
                    key={id}
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(id)}
                    onKeyDown={handleTabKeyDown}
                    className="relative z-10 flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-150 sm:flex-initial sm:gap-2 sm:px-7 sm:text-[0.9375rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-tab-pill"
                        className="absolute inset-0 rounded-full bg-uagc-navy shadow-[0_2px_8px_rgba(12,35,75,0.2)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon
                        className={`size-4 sm:size-[1.125rem] transition-colors duration-150 ${isActive ? "text-uagc-gold" : "text-uagc-gray"}`}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className={isActive ? "text-white" : "text-uagc-gray hover:text-uagc-navy"}>
                        {label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated panel content in a framed container */}
          <div className="mx-auto mt-10 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {TAB_CONTENT[activeTab].map((card, i) => (
                    <PathCard key={card.title} {...card} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>}

      {/* ── CTA-01: Ready to Start Your Degree? ── */}
      {(show === "all" || show === "cta") &&
      <div ref={ctaRevealRef} className="bg-uagc-navy py-12 sm:py-16" id="next-steps">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className={cn("mx-auto max-w-3xl text-center reveal-section", ctaVisible && "is-visible")}>
            <h3 className="type-h3 text-white">Ready to Start Your Degree?</h3>
            <p className="mt-3 text-sm leading-relaxed text-uagc-navy-muted sm:text-base">
              Connect with an advisor, explore programs, or take the next step toward enrollment.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="?chat=default"
              className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-gold/40 hover:bg-white/10 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold sm:py-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/15 text-uagc-gold transition-[transform,background-color] duration-150 group-hover:bg-uagc-gold/25 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">Chat with an Advisor</span>
              <span className="text-xs leading-relaxed text-uagc-navy-muted">Get instant answers online</span>
            </a>

            <a
              href="tel:+18667111700"
              className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-gold/40 hover:bg-white/10 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold sm:py-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/15 text-uagc-gold transition-[transform,background-color] duration-150 group-hover:bg-uagc-gold/25 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">Call an Advisor</span>
              <span className="text-xs leading-relaxed text-uagc-navy-muted">+1 866 711 1700</span>
            </a>

            <a
              href="#rfi"
              className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-uagc-gold/30 bg-uagc-gold/8 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-gold/50 hover:bg-uagc-gold/14 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold sm:py-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/20 text-uagc-gold transition-[transform,background-color] duration-150 group-hover:bg-uagc-gold/30 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">Request Information</span>
              <span className="text-xs leading-relaxed text-uagc-navy-muted">We&apos;ll reach out to you</span>
            </a>

            <a
              href="https://cloud.mail.uagc.edu/apply"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-uagc-red/30 bg-uagc-red/8 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-red/50 hover:bg-uagc-red/14 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-red sm:py-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-uagc-red/15 text-uagc-red transition-[transform,background-color] duration-150 group-hover:bg-uagc-red/25 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">Apply Now</span>
              <span className="text-xs leading-relaxed text-uagc-navy-muted">$0 application fee</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-uagc-navy-muted">
            <span>No obligation</span>
            <span aria-hidden className="size-1 rounded-full bg-uagc-accent" />
            <span>WSCUC Accredited</span>
            <span aria-hidden className="size-1 rounded-full bg-uagc-accent" />
            <span>Classes start every few weeks</span>
          </div>
        </div>
      </div>}
    </section>
  );
}
