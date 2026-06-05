"use client";

/**
 * degree-programs-v7 — Phase 2 "10x improve" paid landing
 *
 * Shared modules (identical to request-info-v5):
 *   NAV-01 (Header reduced), NAV-UX-01 (SectionNav),
 *   START-01 (UpcomingStartDates), TRUST-02 (TrustStrip banner)
 *
 * Key difference: ProgramExplorer runs full (not compact) —
 * this is the program-discovery page.
 *
 * Messaging revised per simulation_degree-programs-v7.csv:
 *   - Hero: outcome-focused headline, proof-oriented subheadline
 *   - VP cards: transfer specificity, proof language
 *   - Testimonial: career-outcome quote (not process)
 *   - Career section: data-forward intro
 *   - FAQ: custom items addressing licensure, cost, transfer, outcomes
 *   - Mid-page RFI: reframed for program exploration intent
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
import type { FAQItem } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { SalaryGrowthSection } from "@/components/sections/SalaryGrowthSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TuitionSection } from "@/components/sections/TuitionSection";
import { UpcomingStartDates } from "@/components/sections/UpcomingStartDates";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";

/* ── NAV-UX-01 — same component, page-specific anchors ── */
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

/* ── FAQ items addressing top simulation skepticism themes ── */
const V7_FAQ_ITEMS: FAQItem[] = [
  {
    category: "credibility",
    question: "Is UAGC accredited?",
    answer:
      "Yes. UAGC holds institutional accreditation from the WASC Senior College and University Commission (WSCUC). In addition, many programs carry programmatic accreditation — business programs from IACBE, the BSN from CCNE, and the Health Information Management program from CAHIIM.",
    highlights: ["WSCUC", "IACBE", "CCNE", "CAHIIM"],
  },
  {
    category: "credibility",
    question: "Will employers recognize my UAGC degree?",
    answer:
      "UAGC graduates are employed at organizations of every size across the U.S. Our career services team connects students and alumni with 98,000+ employers on Handshake, and 1,500+ employer partners actively recruit UAGC talent. Programmatic accreditations in business, nursing, and health information management signal industry-standard rigor to hiring managers.",
    highlights: ["98,000+ employers", "1,500+ employer partners"],
  },
  {
    category: "admissions",
    question: "How do transfer credits work, especially from community colleges?",
    answer:
      "UAGC accepts transfer credits from regionally accredited institutions, including community colleges. Bachelor's students can transfer up to 75% of their required credits — meaning you may complete your degree faster and at lower cost. If you have an associate's degree, many programs offer 2+2 pathways that map directly to a bachelor's completion. Your enrollment advisor can provide a preliminary credit evaluation before you commit.",
    highlights: ["up to 75%", "2+2 pathways", "preliminary credit evaluation"],
  },
  {
    category: "admissions",
    question: "Do I need SAT, ACT, GMAT, or GRE scores to apply?",
    answer:
      "No. UAGC does not require standardized test scores for admission to any program — undergraduate or graduate. There is no application fee, and you can start the process in minutes.",
    highlights: ["does not require standardized test scores", "No application fee"],
  },
  {
    category: "tuition",
    question: "How much does a degree cost, and what financial aid is available?",
    answer:
      "Undergraduate tuition is $485 per credit and graduate tuition is $625 per credit, with no hidden fees. Many students reduce total cost through transfer credits, employer tuition benefits, military education benefits, scholarships, and federal financial aid (FAFSA). The application itself is free, and an enrollment advisor can walk you through a personalized cost estimate.",
    highlights: ["$485 per credit", "$625 per credit", "no hidden fees"],
  },
  {
    category: "tuition",
    question: "Can my employer help pay for my degree?",
    answer:
      "Many employers offer tuition reimbursement or education benefits. UAGC partners with 1,500+ employers and can work directly with your organization's HR team to simplify the process. Military tuition assistance (TA) and VA education benefits are also accepted.",
    highlights: ["1,500+ employers", "Military tuition assistance"],
  },
  {
    category: "academics",
    question: "Do UAGC education degrees lead to teacher licensure?",
    answer:
      "UAGC education programs are designed to build foundational knowledge in teaching and learning, but they do not lead to initial teacher licensure or certification on their own. If you are already a licensed teacher seeking an advanced degree or endorsement, speak with an advisor about how UAGC programs may complement your state requirements. Licensure requirements vary by state.",
    highlights: ["do not lead to initial teacher licensure", "Licensure requirements vary by state"],
  },
  {
    category: "academics",
    question: "What career outcomes can I expect with a UAGC degree?",
    answer:
      "Outcomes vary by program, but UAGC graduates enter roles such as Operations Manager, Health Services Manager, Cybersecurity Analyst, HR Manager, and more. Median salaries range from $52K to $115K depending on the field and degree level. UAGC also provides lifetime career services including resume support, interview coaching, and access to 98,000+ employers through Handshake — even after graduation.",
    highlights: ["$52K to $115K", "lifetime career services", "98,000+ employers"],
  },
  {
    category: "academics",
    question: "How do the 5- to 6-week courses work?",
    answer:
      "You take one focused course at a time in 5- to 6-week sessions. This structure is designed for working adults — you can give full attention to one subject, complete it, and move on. Most students study evenings and weekends while maintaining full-time work and family schedules.",
    highlights: ["one focused course at a time"],
  },
  {
    category: "credibility",
    question: "What is UAGC's relationship with the University of Arizona?",
    answer:
      "UAGC is a separately accredited, nonprofit institution within the University of Arizona system. It is focused exclusively on serving working adults through online education. UAGC holds its own WSCUC accreditation and operates independently while benefiting from the broader University of Arizona network.",
    highlights: ["nonprofit institution", "University of Arizona system", "own WSCUC accreditation"],
  },
];

export default function DegreeProgramsV7() {
  const heroFormRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ── NAV-01 — SHARED ── */}
      <Header variant="reduced" />

      {/* ── NAV-UX-01 — SHARED ── */}
      <SectionNav sections={PAGE_SECTIONS} />

      <main id="main-content" role="main" className="flex-1 pt-16 sm:pt-[72px] lg:pt-20">
        {/* ── HERO-01 + FORM-01 ── */}
        <HeroSection
          headline="Find the Right Degree for Your Career"
          subheadline="50+ accredited online programs in business, healthcare, education, IT, and more — built for working adults who need flexibility without sacrificing quality."
          backgroundImage="/images/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_6.jpg.webp"
          mobileBackgroundImage="/images/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_6.jpg.webp"
          highlights={[
            "WSCUC Accredited",
            "50+ Programs",
            "$0 to Apply",
          ]}
        >
          <div id="hero-rfi" className="flex w-full scroll-mt-24 flex-col gap-2">
            <RFIForm variant="mini" heroFormRef={heroFormRef} />
            <p className="text-center text-[0.6875rem] text-uagc-gray/80">
              It only takes a minute. No obligation.
            </p>
          </div>
        </HeroSection>

        {/* ── START-01 — SHARED ── */}
        <UpcomingStartDates />

        {/* ── TRUST-02 — SHARED ── */}
        <div className="border-b border-uagc-border bg-white py-3 sm:py-4">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <TrustStrip variant="banner" />
          </div>
        </div>

        {/* ── VP-01 — Why Students Choose UAGC ── */}
        <ScrollReveal>
          <ValuePropsSection
            className="scroll-mt-20"
            id="why-uagc"
            heading="Why Students Choose UAGC"
            subheading="Accredited programs, transparent costs, and real support — not just marketing promises."
            highlightCards={[
              {
                title: "Transfer Up to 75% of Your Credits",
                stat: "Up to 75%",
                description:
                  "Bring credits from community colleges and other accredited institutions. Many associate's degree holders use 2+2 pathways to finish a bachelor's faster and at lower cost. Get a free credit evaluation before you commit.",
              },
              {
                title: "No Standardized Tests Required",
                stat: "None",
                description:
                  "No SAT, ACT, GMAT, or GRE — for any program, undergraduate or graduate. Your professional experience and academic record are what matter.",
              },
              {
                title: "One Focused Class at a Time",
                stat: "5–6 wk",
                description:
                  "Take one course per session in 5- to 6-week blocks. Designed for adults balancing work, family, and education — 92% of students study while working.",
              },
              {
                title: "Start with Zero Cost",
                stat: "$0",
                description:
                  "No application fee. No enrollment deposit. Explore financial aid, employer benefits, and military education benefits before paying a dollar.",
              },
            ]}
            experienceCallout={{
              heading: "Your Experience Already Counts",
              description:
                "UAGC's Prior Learning Assessment turns your professional experience, military training, industry certifications, and on-the-job skills into real college credit — reducing time, tuition, and redundant coursework.",
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

        {/* ── BRIDGE-01 → Programs ── */}
        <NextStepBridge label="Explore Programs" href="#programs" />

        {/* ── PROG-01 — Full (not compact) — centerpiece ── */}
        <ScrollReveal delay={40}>
          <ProgramExplorer />
        </ScrollReveal>

        {/* ── BRIDGE-01 → Careers (dark) ── */}
        <NextStepBridge label="See Career Outcomes" href="#careers" variant="dark" />

        {/* ── CAREER-01 — Career Outcomes by Program ── */}
        <ScrollReveal delay={60}>
          <CareerOutcomesSection
            id="careers"
            className="scroll-mt-20"
            heading="Career Outcomes by Program Area"
            intro="What can you do with a UAGC degree? These salary ranges and growth rates are drawn from BLS and labor market data for roles commonly held by graduates in each field."
          />
        </ScrollReveal>

        {/* ── SALARY-01 — Salary Growth by Degree ── */}
        <ScrollReveal>
          <SalaryGrowthSection className="bg-white" />
        </ScrollReveal>

        {/* ── FIN-01 — Tuition & Ways to Save ── */}
        <ScrollReveal delay={40}>
          <div id="tuition" className="scroll-mt-20">
            <TuitionSection />
          </div>
        </ScrollReveal>

        {/* ── CRED-01 — Employer Credentials ── */}
        <ScrollReveal delay={60}>
          <div id="credentials" className="scroll-mt-20">
            <EmployerCredentialSection />
          </div>
        </ScrollReveal>

        {/* ── TRUST-01 — Testimonial (career-outcome focused) ── */}
        <ScrollReveal delay={80}>
          <div id="stories" className="scroll-mt-20">
            <TestimonialSection
              className="bg-white"
              heading="Students Like You Are Already Here"
              subheading="Real outcomes from people who chose UAGC for the same reasons you're considering it."
              testimonials={[
                {
                  tag: "Career Changer",
                  quote:
                    "After 15 years as an LPN, I finished my bachelor's in under two years. Six months after graduating — promoted to clinical coordinator with a $22K salary increase.",
                  name: "Priya Navarro",
                  credential: "BS in Health Care Administration, 2023",
                },
                {
                  tag: "Military Veteran",
                  quote:
                    "The transfer credit process was seamless. I applied my military training and community college work — saved over a year. UAGC understood what I brought to the table.",
                  name: "Timothy Cruz",
                  credential: "BS in Information Technology, 2023",
                },
                {
                  tag: "Working Professional",
                  quote:
                    "I work 12-hour hospital shifts three days a week. One class at a time in 5-week blocks meant I could actually finish what I started. The format is what made this possible.",
                  name: "Maria Delgado",
                  credential: "BS in Health Care Administration, 2024",
                },
              ]}
            />
          </div>
        </ScrollReveal>

        {/* ── EMOT-01 — Emotional Motivation (Tier 3) ── */}
        <ScrollReveal>
          <EmotionalMotivationSection />
        </ScrollReveal>

        {/* ── FORM-02 — Mid-page RFI (full) ── */}
        <ScrollReveal>
          <section id="rfi" className="scroll-mt-20 bg-uagc-surface py-12 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:max-w-[880px] lg:px-8">
              <div className="mb-8 text-center sm:mb-10">
                <span aria-hidden className="mx-auto mb-3 accent-bar" />
                <h2 className="font-heading text-[1.375rem] font-semibold leading-tight text-uagc-navy sm:text-[1.75rem]">
                  Get Program Details Tailored to Your Goals
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray">
                  Tell us what you&apos;re interested in and an enrollment advisor will send you program-specific details — costs, transfer credit options, and next steps — within one business day.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-uagc-gray">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-600" aria-hidden />
                    No obligation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-600" aria-hidden />
                    Takes ~2 minutes
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

        {/* ── FAQ-01 — Custom items for program-discovery skepticism ── */}
        <ScrollReveal delay={40}>
          <div id="faq" className="scroll-mt-20">
            <FAQSection
              heading="Common Questions About UAGC Programs"
              subheading="Straight answers on accreditation, cost, transfer credits, and what to expect."
              items={V7_FAQ_ITEMS}
            />
          </div>
        </ScrollReveal>

        {/* ── CTA-01 — Bottom multi-path CTA ── */}
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

      {/* ── FOOT-01 ── */}
      <Footer />

      {/* ── FORM-05 — Sticky RFI (mobile) ── */}
      <RFIStickyBar heroFormRef={heroFormRef} />
    </>
  );
}
