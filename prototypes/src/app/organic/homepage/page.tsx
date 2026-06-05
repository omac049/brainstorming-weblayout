"use client";

/**
 * Organic homepage prototype — empathy-first narrative arc
 * with competitive-informed program + cost positioning.
 *
 * Flow: relate (hero + $485 anchor) → benefit (why-uagc) → identify (testimonials) →
 * explore paths → discover programs → validate (recognition + accreditation) →
 * make achievable (ways to save) → act (RFI) → resolve objections (FAQ).
 *
 * Module stack: NAV-00 · HERO-ORG · VP-01 · TRUST-CAROUSEL · HOME-PATH ·
 * PROG-01 · HOME-NEWS · ACCR-01 · SAVE-01 · FORM-02 · FAQ-01 · FOOT-01 · FORM-05
 */

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { AccreditationBand } from "@/components/organic/AccreditationBand";
import { HomeDifferentiatorPathSection } from "@/components/organic/HomeDifferentiatorPathSection";
import { HomeNewsSection } from "@/components/organic/HomeNewsSection";
import { ImpactStrip } from "@/components/organic/ImpactStrip";
import { OrganicHomeHero } from "@/components/organic/OrganicHomeHero";
import { WaysToSaveSection } from "@/components/organic/WaysToSaveSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { VideoTestimonialSection } from "@/components/organic/VideoTestimonialSection";
import { SiteHeader } from "@/components/organic/SiteHeader";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import { HOME_VIDEO_TESTIMONIALS } from "@/lib/organic-homepage-data";

const HOME_FAQ_WITH_TUITION = [
  {
    question: "Can I transfer credits from another school?",
    answer:
      "Yes — UAGC accepts transfer credits from accredited institutions. Up to 75% of your bachelor's credits can transfer in, including community college coursework, military training, and professional certifications. Your advisor evaluates transcripts for free before you enroll, so you'll know exactly where you stand.",
  },
  {
    question: "How much does tuition cost?",
    answer:
      "Undergraduate tuition is $485 per credit; graduate is $625 per credit. A typical 3-credit course costs $1,455 for undergrad. There's no application fee, and 86% of students receive financial aid or scholarships that reduce out-of-pocket costs. For example, a student transferring 90 credits toward a 120-credit bachelor's would pay roughly $14,550 for remaining coursework — before aid.",
  },
  {
    question: "How long does it take to finish a degree?",
    answer:
      "It depends on your transfer credits and pace. Many bachelor's students finish in 2–3 years taking one course at a time. With maximum transfer credit, some finish in under 2 years. Master's programs typically take 1–2 years.",
  },
  {
    question: "Is UAGC accredited?",
    answer:
      "Yes. UAGC holds regional accreditation from WSCUC (WASC Senior College and University Commission), recognized by the U.S. Department of Education. Business programs hold IACBE accreditation and nursing programs hold CCNE accreditation. UAGC is also part of the University of Arizona — a public R1 research institution.",
  },
  {
    question: "Are online degrees respected by employers?",
    answer:
      "UAGC partners with 1,500+ employers including T-Mobile, Walgreens, and USPS. Graduates receive lifetime career services through Handshake's 98,000+ employer network. Your transcript and diploma carry full WSCUC accreditation — employers evaluate the credential and your skills, not the delivery format.",
  },
  {
    question: "What financial aid options are available?",
    answer:
      "Eligible students can access federal Pell Grants (up to $7,395/year), federal loans, UAGC scholarships, military benefits (GI Bill, TA, MyCAA), and employer tuition reimbursement programs. An advisor helps you build a personalized financial plan — no cost, no obligation.",
  },
  {
    question: "Will I feel out of place going back to school?",
    answer:
      "The average UAGC student is a working adult in their 30s. You'll be alongside people balancing the same things you are — jobs, families, career changes, and ambitions. Whether you're a first-generation student, a veteran, or someone returning after years away, the format is built specifically for non-traditional students.",
  },
  {
    question: "What specific programs does UAGC offer?",
    answer:
      "UAGC offers 54+ programs across Business, Accounting, Education, Health Care (including BSN and MSN), Information Technology, Criminal Justice, Liberal Arts, and Social & Behavioral Sciences — from associate through doctoral degrees. Many programs align with professional certifications and licensure requirements. Use the program finder on this page to search by career interest.",
  },
  {
    question: "Can I enroll if I have a criminal record?",
    answer:
      "UAGC evaluates applicants individually. A criminal record does not automatically disqualify you from admission or federal financial aid. Pell Grants are available to eligible students regardless of most conviction histories. Your enrollment advisor can walk you through your specific situation confidentially.",
  },
  {
    question: "I'm a UAGC graduate — what's available for alumni?",
    answer:
      "Alumni receive lifetime career services through Handshake, access to graduate degree programs with streamlined re-enrollment, and eligibility for alumni-specific scholarships. If you completed an undergraduate degree, your UAGC credits apply directly to master's programs. Contact an advisor to explore your options.",
  },
  {
    question: "Does UAGC work with employers and community organizations?",
    answer:
      "Yes. UAGC partners with 1,500+ employers who offer tuition assistance or reimbursement for their employees. We also maintain articulation agreements with community colleges and accept referrals from workforce development boards and nonprofit partners. An advisor can check your organization's eligibility.",
  },
];

export default function OrganicHomepage() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);

  const handleRfiSubmit = (data: Record<string, string>) => {
    const params = new URLSearchParams();
    if (data.firstname) params.set("firstName", data.firstname);
    if (data.college_of_interest) params.set("area", data.college_of_interest);
    params.set("confirmationId", String(Math.floor(7700000 + Math.random() * 99999)));
    router.push(`/organic/request-information/thank-you?${params.toString()}`);
  };

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
        {/* 1 — Hero: relate to the visitor's situation */}
        <OrganicHomeHero heroRef={heroRef} />

        {/* 1b — Impact strip: bold numbers that anchor credibility immediately */}
        <ImpactStrip />

        {/* 2 — Why students choose UAGC: visitor benefits, not features */}
        <ValuePropsSection
          id="why-uagc"
          heading="Why Students Choose UAGC"
          subheading="Real benefits that matter when you're balancing work, family, and the decision to go back to school."
          highlightCards={[
            {
              title: "Your Credits Count Here",
              stat: "Up to 75%",
              description:
                "Transfer credits from other colleges, military training, and professional certifications — up to 75% of your bachelor's could already be done. We evaluate your transcripts for free, before you commit.",
            },
            {
              title: "No Tests Standing in Your Way",
              stat: "None",
              description:
                "No SAT, ACT, GMAT, or GRE required at any level — associate through doctoral. We evaluate your readiness, not a test score from years ago.",
            },
            {
              title: "One Class, Full Focus",
              stat: "5–6 wk",
              description:
                "Take one course at a time in short sessions. You can make real progress without the burnout of juggling four classes at once — and your advisor helps you stay on track.",
            },
            {
              title: "Know the Cost Upfront",
              stat: "$485",
              description:
                "Per-credit tuition you can plan around — a typical 3-credit course is $1,455. No application fee, and 86% of students receive financial aid or scholarships.",
            },
          ]}
          experienceCallout={{
            heading: "Your Experience Already Counts",
            description:
              "Whether you're a veteran, a working professional, a first-generation student, or someone who's been putting off finishing — UAGC's Prior Learning Assessment turns what you already know into real college credit. Even credits from 25+ years ago may transfer.",
            outcomes: [
              { stat: "Save $$$", label: "Fewer credits to pay for" },
              { stat: "Finish Sooner", label: "Less time to your degree" },
              { stat: "6+ Ways", label: "To earn credit for what you know" },
            ],
            ctaLabel: "See How PLA Works",
            ctaHref: "/prior-learning",
          }}
        />

        {/* 3 — In their own words: video peer voice creates identification early */}
        <VideoTestimonialSection
          id="stories"
          testimonials={[...HOME_VIDEO_TESTIMONIALS]}
        />

        {/* 4 — Find Your Path + Ready to Start */}
        <HomeDifferentiatorPathSection />

        {/* 5 — Program discovery: visitor is engaged, let them explore */}
        <ProgramExplorer
          heading="Find Your Program"
          ctaTarget="#rfi"
        />

        {/* 5 — Recognition & achievements: third-party validation */}
        <HomeNewsSection />

        {/* 6 — Accreditation that employers trust */}
        <AccreditationBand />

        {/* 7 — Ways to save: answer the money question while they're deciding */}
        <WaysToSaveSection />

        {/* 8 — FORM-02: RFI form — final conversion point */}
        <section
          id="rfi"
          className="scroll-mt-24 section-pad bg-[#faf9f7]"
          aria-labelledby="home-rfi-heading"
        >
          <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              <h2 id="home-rfi-heading" className="type-h2 text-uagc-navy">
                Get Personalized Program Details
              </h2>
              <p className="mt-3 text-sm text-uagc-gray sm:text-base">
                Takes under a minute — no obligation. An advisor will reach out
                with program options that match your goals.
              </p>
            </div>
            <RFIForm
              variant="full"
              heading="Request Information"
              onSubmit={handleRfiSubmit}
            />
          </div>
        </section>

        {/* 9 — FAQ-01: remaining objections, just above the footer */}
        <FAQSection
          id="faq"
          variant="accordion"
          heading="Questions? We've Got Answers."
          subheading="Cost, credits, programs, financial aid, and what to expect — the things you really want to know."
          items={HOME_FAQ_WITH_TUITION}
        />
      </main>
      <SiteFooter />
      <RFIStickyBar heroFormRef={heroRef} />
    </>
  );
}
