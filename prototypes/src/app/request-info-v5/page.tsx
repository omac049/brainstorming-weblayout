"use client";

/**
 * Layout Score Builder — paid-generic preset comparison
 *
 * Base components: HERO-01 + FORM-01 (mini RFI), TRUST-02 (banner), VP-01,
 * PROG-01 (compact explorer), CAREER-01 (career outcomes by program — salary,
 * growth, job titles, degree levels), SALARY-01 (degree-level salary
 * visualization), CRED-01 (employer-recognized credential callout),
 * TESTIMONIAL-01, EMOT-01 (Tier 3 emotional motivation), FORM-02 (full RFI),
 * FIN-01 + FIN-02 (tuition), FAQ-01, CTA-01, FORM-05 (sticky bar), FOOT-01.
 *
 * Audience-specific modules: SALARY-01 (salary growth by degree level),
 * CRED-01 (employer recognition + accreditation badges),
 * EMOT-01 (emotional narrative for career advancers).
 */

import { useRef } from "react";

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { NextStepBridge } from "@/components/shared/NextStepBridge";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionNav } from "@/components/shared/SectionNav";
import { CareerOutcomesSection } from "@/components/sections/CareerOutcomesSection";
import { EmotionalMotivationSection } from "@/components/sections/EmotionalMotivationSection";
import { EmployerCredentialSection } from "@/components/sections/EmployerCredentialSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { SalaryGrowthSection } from "@/components/sections/SalaryGrowthSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TuitionSection } from "@/components/sections/TuitionSection";
import { UpcomingStartDates } from "@/components/sections/UpcomingStartDates";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";

const PAGE_SECTIONS = [
  { id: "why-uagc", label: "Why UAGC" },
  { id: "programs", label: "Programs" },
  { id: "careers", label: "Careers" },
  { id: "tuition", label: "Tuition" },
  { id: "credentials", label: "Credentials" },
  { id: "stories", label: "Stories" },
  { id: "rfi", label: "Get Started" },
  { id: "faq", label: "FAQ" },
];

export default function RequestInfoV5() {
  const heroFormRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header variant="reduced" />
      <SectionNav sections={PAGE_SECTIONS} />
      <main id="main-content" role="main" className="flex-1 pt-16 sm:pt-[72px] lg:pt-20">
        <HeroSection
          headline="Earn Your Degree 100% Online at UAGC"
          subheadline="Part of the University of Arizona enterprise. Flexible 5-week courses built for working adults — no SAT or GRE required, and your transfer credits count from day one."
          backgroundImage="/images/hero-v5-desktop.jpg"
          mobileBackgroundImage="/images/hero-v5-mobile.jpg"
          highlights={[
            "5-Week Courses",
            "Transfer Up to 75% of Credits",
            "$0 to Apply",
          ]}
        >
          <div id="hero-rfi" className="flex w-full scroll-mt-24 flex-col gap-2">
            <p className="text-center text-sm font-semibold text-uagc-navy">
              Get a Personalized Program Guide
            </p>
            <p className="text-center text-xs leading-relaxed text-uagc-gray">
              See programs, costs, and transfer credit options tailored to you — no commitment required.
            </p>
            <RFIForm variant="mini" heroFormRef={heroFormRef} />
            <p className="text-center text-[0.6875rem] text-uagc-gray/80">
              Takes under 60 seconds. No obligation. No spam.
            </p>
          </div>
        </HeroSection>

        <UpcomingStartDates />

        <div className="border-b border-uagc-border bg-white py-3 sm:py-4">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <TrustStrip variant="banner" />
          </div>
        </div>

        <ScrollReveal>
          <ValuePropsSection
            className="scroll-mt-20"
            id="why-uagc"
            heading="Why Students Choose UAGC"
            subheading="Everything you need to start strong, stay on track, and finish with a degree employers respect."
            highlightCards={[
              {
                title: "Generous Transfer Credit Policy",
                stat: "Up to 75%",
                description:
                  "Transfer approved college credits — including military training, certifications, and prior learning — toward your bachelor's. An advisor reviews your transcripts for free.",
              },
              {
                title: "No Standardized Tests Required",
                stat: "None",
                description:
                  "No SAT, ACT, GMAT, or GRE. Your work experience and motivation matter more than a test score from years ago.",
              },
              {
                title: "One Focused Class at a Time",
                stat: "5–6 wk",
                description:
                  "Take a single course in 5- to 6-week sessions. Built for working adults who need to balance jobs, family, and school without burnout.",
              },
              {
                title: "Transparent Costs, $0 to Start",
                stat: "$0",
                description:
                  "No application fee. Undergrad tuition starts at $485/credit. 86% of students receive financial aid or scholarships.",
              },
            ]}
            experienceCallout={{
              heading: "Your Experience Already Counts",
              description:
                "Whether you're a veteran with military training, a professional with certifications, or someone with decades of on-the-job learning — UAGC's Prior Learning Assessment converts what you already know into real college credit. Even credits from 25+ years ago may transfer.",
              outcomes: [
                { stat: "Save $$$", label: "Fewer credits to pay for" },
                { stat: "Finish Sooner", label: "Less time to your degree" },
                { stat: "6+ Ways", label: "To earn credit for what you know" },
              ],
              ctaLabel: "See How PLA Works",
              ctaHref: "/prior-learning",
            }}
          />
        </ScrollReveal>

        <NextStepBridge label="Explore Programs" href="#programs" />

        <ScrollReveal delay={40}>
          <ProgramExplorer compact />
        </ScrollReveal>

        <NextStepBridge label="See Career Outcomes" href="#careers" variant="dark" />

        <ScrollReveal delay={60}>
          <CareerOutcomesSection id="careers" className="scroll-mt-20" />
        </ScrollReveal>

        <ScrollReveal>
          <SalaryGrowthSection className="bg-white" />
        </ScrollReveal>

        <ScrollReveal delay={40}>
          <div id="tuition" className="scroll-mt-20">
            <TuitionSection />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <div id="credentials" className="scroll-mt-20">
            <EmployerCredentialSection />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div id="stories" className="scroll-mt-20">
            <TestimonialSection
              className="bg-white"
              heading="Students Like You Are Already Here"
              subheading="Real experiences from people who started where you are now."
              testimonials={[
                {
                  tag: "Working Parent",
                  quote:
                    "I study on my days off and during nap time. Taking one class at a time in 5-week blocks made this possible while raising two kids and working full time.",
                  name: "Sheena Smith",
                  credential: "AA in Early Childhood Education, 2022",
                },
                {
                  tag: "Career Changer",
                  quote:
                    "After 15 years as an LPN, I needed a degree to move into management. UAGC let me transfer my credits and finish in under two years. Six months later — promoted with a $22K raise.",
                  name: "Priya Navarro",
                  credential: "BS in Health Care Administration, 2023",
                },
                {
                  tag: "First-Generation Student",
                  quote:
                    "Nobody in my family had gone to college. My advisor walked with me start to finish — enrollment, financial aid, everything. I never felt alone in this.",
                  name: "Marcus Johnson",
                  credential: "BA in Business Administration, 2024",
                },
              ]}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <EmotionalMotivationSection />
        </ScrollReveal>

        <ScrollReveal>
          <section id="rfi" className="scroll-mt-20 bg-uagc-surface py-12 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:max-w-[880px] lg:px-8">
              <div className="mb-8 text-center sm:mb-10">
                <span aria-hidden className="mx-auto mb-3 accent-bar" />
                <h2 className="font-heading text-[1.375rem] font-semibold leading-tight text-uagc-navy sm:text-[1.75rem]">
                  Get Your Personalized Degree Plan
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray">
                  Share a few details and an advisor will send you a personalized guide — including transfer credit estimates, financial aid options, and program recommendations based on your goals.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-uagc-gray">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-600" aria-hidden />
                    No obligation — just information
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-600" aria-hidden />
                    Response within 1 business day
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-600" aria-hidden />
                    $0 application fee
                  </span>
                </div>
              </div>
              <RFIForm variant="full" />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={40}>
          <div id="faq" className="scroll-mt-20">
            <FAQSection />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section className="bg-uagc-navy py-14 sm:py-16 lg:py-20">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 text-center sm:gap-10 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center gap-3">
                <h2 className="max-w-xl font-heading text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.75rem] lg:text-[2.25rem]">
                  Ready to Start Your{" "}
                  <span className="text-uagc-gold">Degree?</span>
                </h2>
                <p className="max-w-lg text-[0.9375rem] leading-relaxed text-[#b8c5d9]">
                  Choose the path that works best for you — every option connects you with the support you need to get started.
                </p>
              </div>

              <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Chat with an Advisor */}
                <a
                  href="https://www.uagc.edu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-6 transition-all hover:border-uagc-gold/40 hover:bg-white/[0.1] sm:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/15 text-uagc-gold transition-colors group-hover:bg-uagc-gold/25">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-white">Chat with an Advisor</span>
                  <span className="text-xs leading-relaxed text-[#8a9bb5]">
                    Get instant answers online
                  </span>
                </a>

                {/* Call an Advisor */}
                <a
                  href="tel:+18552104959"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-6 transition-all hover:border-uagc-gold/40 hover:bg-white/[0.1] sm:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/15 text-uagc-gold transition-colors group-hover:bg-uagc-gold/25">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-white">Call an Advisor</span>
                  <span className="text-xs leading-relaxed text-[#8a9bb5]">
                    (855) 210-4959
                  </span>
                </a>

                {/* Request Information */}
                <a
                  href="#rfi"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-uagc-gold/30 bg-uagc-gold/[0.08] px-5 py-6 transition-all hover:border-uagc-gold/50 hover:bg-uagc-gold/[0.14] sm:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/20 text-uagc-gold transition-colors group-hover:bg-uagc-gold/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-white">Request Information</span>
                  <span className="text-xs leading-relaxed text-[#8a9bb5]">
                    We&apos;ll reach out to you
                  </span>
                </a>

                {/* Apply Now */}
                <a
                  href="https://cloud.mail.uagc.edu/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-uagc-red/30 bg-uagc-red/[0.08] px-5 py-6 transition-all hover:border-uagc-red/50 hover:bg-uagc-red/[0.14] sm:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-uagc-red/15 text-uagc-red transition-colors group-hover:bg-uagc-red/25">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-white">Apply Now</span>
                  <span className="text-xs leading-relaxed text-[#8a9bb5]">
                    $0 application fee
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#8a9bb5]">
                <span>No obligation</span>
                <span aria-hidden className="size-1 rounded-full bg-[#2a4a7b]" />
                <span>WSCUC Accredited</span>
                <span aria-hidden className="size-1 rounded-full bg-[#2a4a7b]" />
                <span>Classes start every few weeks</span>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
      <RFIStickyBar heroFormRef={heroFormRef} />
    </>
  );
}
