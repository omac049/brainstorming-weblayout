"use client";

/**
 * Organic homepage v2 — "Conversion Architecture" redesign
 *
 * Integrates Brandy's mock structure (brandyblack13.github.io/homepage-mock/)
 * with v2 Brandy modules and live homepage audience paths.
 *
 * Module stack (Brandy-aligned):
 * NAV-00 · HERO-V2 · IMPACT · VP-01 · TRUST-01 · PATHS ·
 * PROG-01 · ACCREDITATION · INTERESTS · TUITION ·
 * PERSONALIZED-ED · NEWS · FORM-02+FAQ · FOOT-01 · FORM-05
 */

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { HeroV2, HeroSectionNav } from "@/components/organic/HeroV2";
import { ImpactStrip } from "@/components/organic/ImpactStrip";
import { PersonaPathSection } from "@/components/organic/PersonaPathSection";
import { WhyChooseSection } from "@/components/organic/WhyChooseSection";
import { VideoTestimonialSection } from "@/components/organic/VideoTestimonialSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { ProgramQuickView } from "@/components/organic/ProgramQuickView";
import { AccreditationBand } from "@/components/organic/AccreditationBand";
import { InterestAreaGrid } from "@/components/organic/InterestAreaGrid";
import { TuitionTable } from "@/components/organic/TuitionTable";
import { CostEstimator } from "@/components/organic/CostEstimator";
import { PersonalizedEducationSection } from "@/components/organic/PersonalizedEducationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SiteHeader } from "@/components/organic/SiteHeader";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { HOME_VIDEO_TESTIMONIALS } from "@/lib/organic-homepage-data";
import type { ProgramDetail } from "@/lib/program-data";
import type { RFIFormData } from "@/types";

const V2_SECTION_NAV = [
  { id: "impact", label: "At a Glance" },
  { id: "why-uagc", label: "Why UAGC" },
  { id: "social-proof", label: "Stories" },
  { id: "paths", label: "Your Path" },
  { id: "programs", label: "Programs" },
  { id: "tuition", label: "Tuition" },
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
      "Undergraduate programs start at $295/credit. Master's programs start at $485/credit. The application fee is $0. 86% of students receive some form of financial assistance.",
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
      "Eligible students can access federal Pell Grants (up to $7,395/year), federal loans, UAGC scholarships, military benefits (GI Bill, TA, MyCAA), and employer tuition reimbursement programs.",
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

export default function OrganicHomepageV2() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const [rfiPreFill, setRfiPreFill] = useState<Partial<RFIFormData>>({});
  const [quickViewProgram, setQuickViewProgram] = useState<ProgramDetail | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const scrollToRfi = useCallback(() => {
    document.getElementById("rfi")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToCostEstimator = useCallback(() => {
    document.getElementById("cost-estimator")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleProgramSelect = useCallback((program: ProgramDetail) => {
    setQuickViewProgram(program);
  }, []);

  const handleProgramRfi = useCallback(
    (areaOfInterest: string) => {
      setRfiPreFill((prev) => ({ ...prev, college_of_interest: areaOfInterest }));
      setQuickViewProgram(null);
      scrollToRfi();
    },
    [scrollToRfi],
  );

  const handleQuickViewClose = useCallback(() => {
    setQuickViewProgram(null);
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
      <main
        id="main-content"
        role="main"
        className="flex-1 pt-14 sm:pt-16 lg:pt-24"
      >
        {/* ── HERO ── */}
        <HeroV2
          heroRef={heroRef}
          showSectionNav={false}
        />

        {/* ── IMPACT STRIP — scale/outcome stats (hero pills cover cost, format, accreditation) ── */}
        <ImpactStrip />

        <HeroSectionNav items={[...V2_SECTION_NAV]} variant="light" />

        {/* ── Why Choose UAGC (Brandy homepage-mock VP pattern) ── */}
        <ScrollReveal>
          <WhyChooseSection id="why-uagc" />
        </ScrollReveal>

        {/* ── TRUST-01 — Student Experience (from organic homepage v1) ── */}
        <VideoTestimonialSection
          id="social-proof"
          testimonials={[...HOME_VIDEO_TESTIMONIALS]}
        />

        {/* ── FIND THE PATH THAT FITS YOU (Brandy: persona cards) ── */}
        <ScrollReveal delay={60}>
          <PersonaPathSection />
        </ScrollReveal>

        {/* ── ACCR-01 — Accreditation That Employers Trust (from organic homepage v1) ── */}
        <ScrollReveal delay={80}>
          <AccreditationBand />
        </ScrollReveal>

        {/* ── FIND THE RIGHT PROGRAM (Brandy: program explorer) ── */}
        <ScrollReveal>
          <ProgramExplorer
            heading="Find the Right Program"
            ctaTarget="#rfi"
            onProgramSelect={handleProgramSelect}
          />
        </ScrollReveal>

        {/* ── WHAT INTERESTS YOU? (Brandy: area-of-study grid) ── */}
        <ScrollReveal>
          <InterestAreaGrid className="bg-uagc-surface" />
        </ScrollReveal>

        {/* ── AN AFFORDABLE PATH FORWARD (Brandy: tuition table) ── */}
        <ScrollReveal>
          <TuitionTable className="bg-white" onExploreAid={scrollToCostEstimator} />
        </ScrollReveal>

        {/* ── COST-EST — interactive tuition preview ── */}
        <ScrollReveal delay={60}>
          <CostEstimator className="bg-uagc-surface" onGetPlan={scrollToRfi} />
        </ScrollReveal>

        {/* ── LATEST STORIES (live blog feed) ── */}
        <ScrollReveal>
          <PersonalizedEducationSection />
        </ScrollReveal>

        {/* ── READY TO TAKE THE NEXT STEP? (navy CTA band + white form card) ── */}
        <section
          id="rfi"
          className="scroll-mt-24 section-pad bg-uagc-navy lg:scroll-mt-36"
          aria-labelledby="home-rfi-heading"
        >
          <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-10">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              <h2 id="home-rfi-heading" className="type-h2 text-white">
                Ready to Take the{" "}
                <span className="text-uagc-gold">Next Step?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#b8c5d9] sm:text-base">
                Request information today and get paired with an enrollment
                advisor.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#b8c5d9]">
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
              heading="Get Your Personalized Program Guide"
              className="shadow-[0_16px_48px_rgba(0,0,0,0.28)] ring-1 ring-white/10"
              onSubmit={handleRfiSubmit}
              initialValues={rfiPreFill}
            />
          </div>
        </section>

        {/* ── UAGC FAQs (Brandy: FAQ accordion) ── */}
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
                className="!bg-transparent !py-0 [&>div]:!px-0"
              />
              {!showAllFaq && ADDITIONAL_FAQS.length > 0 && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleShowAllFaq}
                    className="cursor-pointer text-sm font-semibold text-uagc-red underline underline-offset-2 transition-colors duration-200 hover:text-uagc-navy"
                  >
                    See all frequently asked questions
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <RFIStickyBar heroFormRef={heroRef} />

      <ProgramQuickView
        program={quickViewProgram}
        onClose={handleQuickViewClose}
        onRequestInfo={handleProgramRfi}
      />
    </>
  );
}
