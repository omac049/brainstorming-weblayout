"use client";

/**
 * Organic homepage — conversion architecture (formerly homepage-v2).
 *
 * Module stack:
 * NAV-00 · HERO-V2 · IMPACT · VP-01 · TRUST-01 · PATHS ·
 * PROG-01 · ACCREDITATION · COST-EST · INTERESTS ·
 * PERSONALIZED-ED · FORM-02+FAQ · FOOT-01 · FORM-05
 */

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { HeroV2, HeroSectionNav } from "@/components/organic/HeroV2";
import { ImpactStrip } from "@/components/organic/ImpactStrip";
import { PersonaPathSection } from "@/components/organic/PersonaPathSection";
import { WhyChooseSection } from "@/components/organic/WhyChooseSection";
import { VideoTestimonialSection } from "@/components/organic/VideoTestimonialSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { AccreditationBand } from "@/components/organic/AccreditationBand";
import { InterestAreaGrid } from "@/components/organic/InterestAreaGrid";
import {
  CostEstimator,
  type CostPlanContext,
} from "@/components/organic/CostEstimator";
import { PersonalizedEducationSection } from "@/components/organic/PersonalizedEducationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SiteHeader } from "@/components/organic/SiteHeader";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import { PageMain } from "@/components/shared/PageMain";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { HOME_VIDEO_TESTIMONIALS } from "@/lib/organic-homepage-data";
import type { RFIFormData } from "@/types";

const SECTION_NAV = [
  { id: "impact", label: "At a Glance" },
  { id: "why-uagc", label: "Why UAGC" },
  { id: "social-proof", label: "Stories" },
  { id: "paths", label: "Your Path" },
  { id: "programs", label: "Programs" },
  { id: "cost-estimator", label: "Tuition" },
  { id: "rfi", label: "Request Info" },
] as const;

const FAQ_ITEMS = [
  {
    question: "Will my previous college credits transfer to UAGC?",
    answer:
      "UAGC accepts up to 90 undergraduate transfer credits from regionally accredited institutions. Credits from military service may also qualify. Advisors complete a free transfer evaluation before you apply — no commitment required.",
  },
  {
    question: "Is Global Campus an accredited university?",
    answer:
      "UAGC is accredited by the WASC Senior College and University Commission (WSCUC), one of seven regional accreditors recognized by the U.S. Department of Education.",
  },
  {
    question: "How much will a degree cost?",
    answer:
      "Rates vary by degree level: associate programs from $250/credit, bachelor's from $295/credit, and master's from $485/credit. The application fee is $0, and 86% of students receive some form of financial assistance.",
  },
  {
    question: "How long does it take to complete a degree?",
    answer:
      "New students typically finish a bachelor's in about four years. Transfer students often finish much faster — some in as little as 18 months.",
  },
  {
    question: "Can I complete classes while working full time?",
    answer:
      "Yes. All UAGC coursework is asynchronous — no set class times. 5-week terms mean you see progress faster, and you can study whenever your schedule allows, 24/7.",
  },
];

const ADDITIONAL_FAQS = [
  {
    question: "What specific programs does UAGC offer?",
    answer:
      "UAGC offers 54+ programs across Business, Accounting, Education, Health Care, IT, Criminal Justice, Liberal Arts, and Social & Behavioral Sciences — from associate through doctoral degrees.",
  },
  {
    question: "What financial aid options are available?",
    answer:
      "Eligible students can access federal Pell Grants, federal loans, UAGC scholarships, military benefits (GI Bill, TA, MyCAA), and employer tuition reimbursement through 1,500+ partner organizations. An advisor helps you find every dollar at no cost.",
  },
  {
    question: "Will I feel out of place going back to school?",
    answer:
      "The average UAGC student is a working adult in their 30s. You'll be alongside people balancing the same things you are — jobs, families, career changes, and ambitions. The format is built specifically for non-traditional students.",
  },
  {
    question: "Does UAGC work with employers and community organizations?",
    answer:
      "Yes. UAGC partners with 1,500+ employers who offer tuition assistance. We maintain articulation agreements with community colleges and accept referrals from workforce development boards.",
  },
];

export default function OrganicHomepage() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const [rfiPreFill, setRfiPreFill] = useState<Partial<RFIFormData>>({});
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [costPlanContext, setCostPlanContext] = useState<CostPlanContext | null>(
    null,
  );

  const handleRequestCostPlan = useCallback((context: CostPlanContext) => {
    setCostPlanContext(context);
    setRfiPreFill((prev) => ({
      ...prev,
      ...(context.hasMilitary ? { military_status: "yes" as const } : {}),
    }));

    const rfiSection = document.getElementById("rfi");
    rfiSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const firstField = rfiSection?.querySelector<HTMLElement>(
        "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled])",
      );
      firstField?.focus({ preventScroll: true });
    }, 700);
  }, []);

  const handleShowAllFaq = useCallback(() => {
    setShowAllFaq(true);
  }, []);

  const handleRfiSubmit = useCallback(
    (data: Record<string, string>) => {
      const params = new URLSearchParams();
      if (data.firstname) params.set("firstName", data.firstname);
      if (data.college_of_interest) params.set("area", data.college_of_interest);
      params.set(
        "confirmationId",
        String(Math.floor(7700000 + Math.random() * 99999)),
      );
      router.push(
        `/organic/request-information/thank-you?${params.toString()}`,
      );
    },
    [router],
  );

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <PageMain>
        <HeroV2 heroRef={heroRef} showSectionNav={false} />

        <ImpactStrip />

        <HeroSectionNav items={[...SECTION_NAV]} variant="light" />

        <ScrollReveal>
          <WhyChooseSection id="why-uagc" />
        </ScrollReveal>

        <VideoTestimonialSection
          id="social-proof"
          testimonials={[...HOME_VIDEO_TESTIMONIALS]}
        />

        <ScrollReveal delay={60}>
          <PersonaPathSection />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <AccreditationBand />
        </ScrollReveal>

        <ScrollReveal>
          <ProgramExplorer
            heading="Find the Right Program"
            ctaTarget="#rfi"
          />
        </ScrollReveal>

        <ScrollReveal>
          <CostEstimator
            className="border-t border-uagc-navy/10 bg-uagc-surface"
            onRequestPlan={handleRequestCostPlan}
          />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <InterestAreaGrid />
        </ScrollReveal>

        <ScrollReveal>
          <PersonalizedEducationSection />
        </ScrollReveal>

        <section
          id="rfi"
          className="scroll-mt-24 section-pad bg-uagc-navy lg:scroll-mt-36"
          aria-labelledby="home-rfi-heading"
        >
          <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-10">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              <h2 id="home-rfi-heading" className="type-h2 text-white">
                {costPlanContext ? (
                  <>
                    Confirm Your{" "}
                    <span className="text-uagc-gold">Cost Plan</span>
                  </>
                ) : (
                  <>
                    Ready to Take the{" "}
                    <span className="text-uagc-gold">Next Step?</span>
                  </>
                )}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-uagc-navy-muted sm:text-base">
                {costPlanContext
                  ? `Based on your ${costPlanContext.degreeLabel.toLowerCase()} estimate — share your details and an advisor will verify transfer credits, aid, and final cost.`
                  : "Request information today and get paired with an enrollment advisor."}
              </p>
              {costPlanContext ? (
                <div
                  className="mx-auto mt-5 max-w-lg rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-uagc-navy-muted"
                  role="status"
                >
                  <p className="font-semibold text-white">Estimate snapshot</p>
                  <p className="mt-1.5 leading-relaxed">
                    {costPlanContext.degreeLabel}
                    {costPlanContext.transferCredits > 0
                      ? ` · ${costPlanContext.transferCredits} transfer credits`
                      : ""}
                    {costPlanContext.estimatedCost != null &&
                    !costPlanContext.hasMilitary
                      ? ` · ~${new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(costPlanContext.estimatedCost)} estimated`
                      : costPlanContext.hasMilitary
                        ? " · military benefits review"
                        : ""}
                  </p>
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-uagc-navy-muted">
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 rounded-full bg-uagc-gold"
                    aria-hidden
                  />
                  No obligation
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 rounded-full bg-uagc-gold"
                    aria-hidden
                  />
                  Response within 1 business day
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 rounded-full bg-uagc-gold"
                    aria-hidden
                  />
                  $0 application fee
                </span>
              </div>
            </div>

            <RFIForm
              variant="full"
              heading={
                costPlanContext
                  ? "Request Your Cost Plan Review"
                  : "Get Your Personalized Program Guide"
              }
              className="shadow-[0_16px_48px_rgba(0,0,0,0.28)] ring-1 ring-white/10"
              onSubmit={handleRfiSubmit}
              initialValues={rfiPreFill}
            />
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 section-pad bg-uagc-surface">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              <h2 className="type-h2 text-uagc-navy">UAGC FAQs</h2>
            </div>
            <div className="mx-auto max-w-3xl">
              <FAQSection
                variant="accordion"
                heading=""
                items={showAllFaq ? [...FAQ_ITEMS, ...ADDITIONAL_FAQS] : FAQ_ITEMS}
                className="bg-transparent! py-0! [&>div]:px-0!"
              />
              {!showAllFaq && ADDITIONAL_FAQS.length > 0 && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleShowAllFaq}
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center px-2 text-sm font-semibold text-uagc-red underline underline-offset-2 transition-colors duration-200 hover:text-uagc-navy"
                  >
                    See all frequently asked questions
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </PageMain>
      <SiteFooter />
      <RFIStickyBar heroFormRef={heroRef} />
    </>
  );
}
