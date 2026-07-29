"use client";

/**
 * online-college-courses-v5 — Phase 2 "10x improve" paid landing (LEAN)
 *
 * ~10 substantive modules — shortest of the three paid targets.
 * Omits: PROG-01, CAREER-01, SALARY-01, CRED-01, BRIDGE-01, EMOT-01
 * Unique: SKEPT-01 (Skepticism Buster) — only on this URL.
 *
 * Shared chrome (identical to v5/v7): NAV-01, NAV-UX-01, START-01, TRUST-02, FORM-05, FOOT-01
 */

import { useRef } from "react";

import { useRfiRedirect } from "@/hooks/useRfiRedirect";
import { useRfiSubmitted } from "@/hooks/useRfiSubmitted";
import { Footer } from "@/components/shared/Footer";
import { PageMain } from "@/components/shared/PageMain";
import { Header } from "@/components/shared/Header";
import { PostRfiPanel } from "@/components/shared/PostRfiPanel";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionNav } from "@/components/shared/SectionNav";
import { FAQSection } from "@/components/sections/FAQSection";
import type { FAQItem } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkepticismBusterSection } from "@/components/sections/SkepticismBusterSection";
import type { SkeptCard } from "@/components/sections/SkepticismBusterSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TuitionSection } from "@/components/sections/TuitionSection";
import { UpcomingStartDates } from "@/components/sections/UpcomingStartDates";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";

const PAGE_SECTIONS = [
  { id: "why-uagc", label: "Why UAGC" },
  { id: "proof", label: "Proof" },
  { id: "tuition", label: "Tuition" },
  { id: "stories", label: "Stories" },
  { id: "rfi", label: "Get Started" },
  { id: "faq", label: "FAQ" },
];

const SKEPT_CARDS: SkeptCard[] = [
  {
    id: "accreditation",
    question: "Is this a real, respected university?",
    proofStat: "WSCUC Accredited",
    answer:
      "UAGC is regionally accredited by WSCUC — the same body that accredits Stanford, UCLA, and the University of Arizona main campus. Your degree carries the same institutional accreditation weight.",
    expandedBullets: [
      "Part of the University of Arizona enterprise",
      "4 programmatic accreditations (IACBE, CCNE, CAHIIM, and more)",
      "98,000+ employers on Handshake recognize UAGC graduates",
      "1,500+ employer tuition partners",
    ],
  },
  {
    id: "cost",
    question: "What does it actually cost — before I give you my info?",
    proofStat: "$485/credit",
    proofStatSub: "undergrad · $625 grad",
    answer:
      "Undergraduate courses are $485 per credit. Graduate courses are $625 per credit. Application fee: $0. And 86% of UAGC students receive financial aid or scholarship assistance.",
    expandedBullets: [
      "FAFSA / federal grants and loans — most students qualify",
      "Military TA at $250/credit (Liberty Grant)",
      "1,500+ employer tuition partners may cover your costs",
      "Average students transfer 41.5 credits — real dollar savings",
      "Scholarships via ScholarshipUniverse platform",
    ],
  },
  {
    id: "transfer",
    question: "Will my existing credits actually count?",
    proofStat: "Up to 75%",
    answer:
      "You can transfer up to 75% of your credits from community colleges, other accredited schools, military training, and professional certifications. Average students transfer 41.5 credits. Get a free, no-obligation credit evaluation before you commit.",
    expandedBullets: [
      "2+2 pathways from community colleges to bachelor's",
      "Prior Learning Assessment — 6 pathways to earn credit",
      "Credits from 25+ years ago can count",
      "Military credit (JST, CCAF, service schools)",
      "Free transcript review before enrollment",
    ],
  },
];

const OCC_FAQ_ITEMS: FAQItem[] = [
  {
    category: "format",
    question: "How do the 5-6 week courses work?",
    answer:
      "Each course runs for 5 to 6 weeks and is fully online. You take one focused class at a time, which means you give your full attention to a single subject before moving on. Coursework is asynchronous — log in and complete assignments on your own schedule, with weekly deadlines to keep you on track.",
    highlights: ["5 to 6 weeks", "one focused class at a time", "asynchronous"],
  },
  {
    category: "format",
    question: "How much time per week should I plan for?",
    answer:
      "Most students study 15–20 hours per week while maintaining full-time work and family responsibilities. Because you take one course at a time, all your study time goes toward a single subject. Many students split their hours across evenings and weekends.",
    highlights: ["15–20 hours per week", "one course at a time"],
  },
  {
    category: "format",
    question: "What technology do I need for online courses?",
    answer:
      "You need a computer (Windows or Mac) with a reliable internet connection and a modern web browser. Courses run through UAGC's online learning platform — no special software to install. A webcam and microphone are recommended for occasional live sessions or group work.",
    highlights: ["computer", "internet connection", "modern web browser"],
  },
  {
    category: "trial",
    question: "How does the 3-week free trial work?",
    answer:
      "You can try your first course for 3 weeks at no cost. If the format works for you, continue into the full session. If not, withdraw within the trial window — no charge, no obligation. It is designed to let you experience the actual coursework, instructors, and platform before committing financially.",
    highlights: ["3 weeks", "no cost", "no obligation"],
  },
  {
    category: "trial",
    question: "What happens after the free trial ends?",
    answer:
      "If you continue past the 3-week window, standard tuition applies ($485/credit undergrad, $625/credit grad). Financial aid, scholarships, and employer benefits can offset costs. If you decide not to continue, you simply withdraw — there are no cancellation fees or penalties.",
    highlights: ["$485/credit", "$625/credit", "no cancellation fees"],
  },
  {
    category: "cost",
    question: "How much does tuition cost per credit?",
    answer:
      "Undergraduate tuition is $485 per credit and graduate tuition is $625 per credit. There are no hidden fees — no application fee, no technology fee surprises. 86% of UAGC students receive financial aid or scholarship assistance.",
    highlights: ["$485 per credit", "$625 per credit", "no hidden fees", "86%"],
  },
  {
    category: "cost",
    question: "What financial aid is available?",
    answer:
      "UAGC students can access FAFSA/federal aid (Pell Grants up to $7,395/year), military benefits (Liberty Grant at $250/credit), employer tuition reimbursement through 1,500+ partners, and external scholarships. Your enrollment advisor can walk you through a personalized cost estimate.",
    highlights: ["Pell Grants", "$250/credit", "1,500+ partners"],
  },
  {
    category: "credibility",
    question: "Is UAGC accredited?",
    answer:
      "Yes. UAGC holds institutional accreditation from the WASC Senior College and University Commission (WSCUC) — the same body that accredits Stanford, UCLA, and the University of Arizona main campus. Many programs carry additional accreditation from IACBE, CCNE, and CAHIIM.",
    highlights: ["WSCUC", "IACBE", "CCNE", "CAHIIM"],
  },
  {
    category: "credibility",
    question: "What is UAGC's relationship with the University of Arizona?",
    answer:
      "UAGC is a separately accredited, nonprofit institution within the University of Arizona enterprise. It is focused exclusively on serving working adults through online education. UAGC holds its own WSCUC accreditation and operates independently while benefiting from the broader University of Arizona network and research infrastructure.",
    highlights: ["nonprofit institution", "University of Arizona enterprise", "own WSCUC accreditation"],
  },
  {
    category: "admissions",
    question: "Can I transfer credits from another school?",
    answer:
      "Yes. UAGC accepts transfer credits from regionally accredited institutions, including community colleges. Bachelor's students can transfer up to 75% of their required credits. Military training, professional certifications, and prior learning also count — even credits from 25+ years ago. You get a free preliminary credit evaluation before you commit.",
    highlights: ["up to 75%", "community colleges", "free preliminary credit evaluation"],
  },
];

export default function OnlineCollegeCoursesV5() {
  const heroFormRef = useRef<HTMLDivElement>(null);
  const handleRfiSubmit = useRfiRedirect();
  const [rfiState] = useRfiSubmitted();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* NAV-01 — SHARED */}
      <Header variant="reduced" />

      {/* NAV-UX-01 — SHARED (6 pills) */}
      <SectionNav sections={PAGE_SECTIONS} />

      <PageMain variant="paid">
        {/* HERO-01 + FORM-01 */}
        <HeroSection
          headline="Explore Flexible Online Courses at UAGC"
          subheadline="5- to 6-week courses, one at a time. Built for working adults who need real flexibility — not just a marketing promise. Try your first course free for 3 weeks."
          backgroundImage="https://www.uagc.edu/sites/default/files/styles/paid_hero_header_899x600/public/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_9.jpg.webp?h=06ac0d8c&itok=T2WRkjnO"
          mobileBackgroundImage="https://www.uagc.edu/sites/default/files/styles/paid_hero_mobile_image_768x512/public/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_9.jpg.webp?h=06ac0d8c&itok=_2_X4kE8"
          highlights={[
            "Try a Course Free",
            "5-Week Classes",
            "$0 to Apply",
          ]}
        >
          <div id="hero-rfi" className="flex w-full scroll-mt-24 flex-col gap-2">
            {rfiState.submitted ? (
              <PostRfiPanel variant="full" portalUrl={rfiState.portalUrl} />
            ) : (
              <>
                <p className="text-center text-sm font-semibold text-uagc-navy">
                  See Programs Matched to Your Goals
                </p>
                <p className="text-center text-xs leading-relaxed text-uagc-gray">
                  Get a personalized guide with programs, costs, and transfer credit options — no commitment required.
                </p>
                <RFIForm variant="mini" heroFormRef={heroFormRef} onSubmit={handleRfiSubmit} />
                <p className="text-center text-[0.6875rem] text-uagc-gray/80">
                  It only takes a minute. No obligation.
                </p>
              </>
            )}
          </div>
        </HeroSection>

        {/* START-01 — SHARED */}
        <UpcomingStartDates />

        {/* TRUST-02 — SHARED */}
        <div className="border-b border-uagc-border bg-white py-3 sm:py-4">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <TrustStrip variant="banner" />
          </div>
        </div>

        {/* VP-01 — Reasons to Choose UAGC (course-format cards) */}
        <ScrollReveal>
          <ValuePropsSection
            className="scroll-mt-20"
            id="why-uagc"
            heading="Reasons to Choose UAGC"
            subheading="Focused courses, real support, and a format built around your life — not the other way around."
            highlightCards={[
              {
                title: "One Focused Class at a Time",
                stat: "5–6 wk",
                description:
                  "Take one course in 5- to 6-week blocks. No juggling four classes. 92% of students study while working full time.",
              },
              {
                title: "Try Your First Course Free",
                stat: "3 wk",
                description:
                  "Test the format for 3 weeks with no financial commitment. If it's not right, walk away — no cost, no obligation.",
              },
              {
                title: "Transfer Up to 75% of Your Credits",
                stat: "Up to 75%",
                description:
                  "Bring credits from community colleges, military training, and professional certs. Average students transfer 41.5 credits.",
              },
              {
                title: "Transparent Costs, $0 to Start",
                stat: "$0",
                description:
                  "No application fee. No enrollment deposit. See actual per-credit costs before you commit.",
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

        {/* SKEPT-01 — Skepticism Buster (EXCLUSIVE to this page) */}
        <ScrollReveal delay={40}>
          <SkepticismBusterSection
            id="proof"
            className="scroll-mt-20 bg-white"
            heading="Straight Answers to Real Questions"
            subheading="We know what you're wondering. Here's the truth."
            cards={SKEPT_CARDS}
            softCta={{
              text: "Still have questions? Talk to an advisor — no strings.",
              chatHref: "https://www.uagc.edu/chat",
              phoneHref: "tel:+18552104959",
            }}
          />
        </ScrollReveal>

        {/* FIN-01 — Tuition & Ways to Save */}
        <ScrollReveal delay={40}>
          <div id="tuition" className="scroll-mt-20">
            <TuitionSection />
          </div>
        </ScrollReveal>

        {/* TRUST-01 — Testimonial (format-confidence focused) */}
        <ScrollReveal delay={60}>
          <div id="stories" className="scroll-mt-20">
            <TestimonialSection
              className="bg-white"
              heading="Students Like You Are Already Here"
              subheading="See how real students fit UAGC courses into their lives."
              testimonials={[
                {
                  tag: "Working Parent",
                  quote:
                    "I was terrified online school would feel like another full-time job. But one class at a time in 5-week blocks? I could actually do it around my kids' schedules.",
                  name: "Maria Delgado",
                  credential: "BS in Health Care Administration, 2024",
                },
                {
                  tag: "Exploring Options",
                  quote:
                    "I wasn't sure I was ready for a full degree. Starting with a single course let me test the format with zero pressure. By week three I knew I was staying.",
                  name: "Angela Torres",
                  credential: "Currently enrolled, Business Administration",
                },
                {
                  tag: "Returning to School",
                  quote:
                    "It had been 12 years since I was in a classroom. The instructors made me feel like I belonged from day one. Now I'm three courses in and actually enjoying it.",
                  name: "Dwayne Mitchell",
                  credential: "Currently enrolled, Criminal Justice",
                },
              ]}
            />
          </div>
        </ScrollReveal>

        {/* FORM-02 — Mid-page RFI (emotional wrapper — absorbs EMOT-01) */}
        <ScrollReveal>
          <section id="rfi" className="scroll-mt-20 bg-uagc-surface py-12 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:max-w-[880px] lg:px-8">
              {rfiState.submitted ? (
                <PostRfiPanel variant="full" portalUrl={rfiState.portalUrl} />
              ) : (
                <>
                  <div className="mb-8 text-center sm:mb-10">
                    <span aria-hidden className="mx-auto mb-3 accent-bar" />
                    <h2 className="font-heading text-[1.375rem] font-semibold leading-tight text-uagc-navy sm:text-[1.75rem]">
                      Your Future Starts with One Course
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-uagc-gray">
                      Share a few details and we&apos;ll send you everything you need to get started — program options, financial aid details, and how to claim your free trial course.
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
                  <RFIForm variant="full" onSubmit={handleRfiSubmit} />
                </>
              )}
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ-01 — Course-format scope (10 items) */}
        <ScrollReveal delay={40}>
          <div id="faq" className="scroll-mt-20">
            <FAQSection
              heading="Questions About Online Courses at UAGC"
              subheading="Straight answers on how courses work, the free trial, cost, and accreditation."
              items={OCC_FAQ_ITEMS}
            />
          </div>
        </ScrollReveal>

        {/* CTA-01 — Bottom multi-path CTA */}
        <ScrollReveal>
          <section className="bg-uagc-navy py-14 sm:py-16 lg:py-20">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 text-center sm:gap-10 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center gap-3">
                <h2 className="max-w-xl font-heading text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.75rem] lg:text-[2.25rem]">
                  Ready to Start Your{" "}
                  <span className="text-uagc-sky">Degree?</span>
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
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-5 py-6 transition-[border-color,background-color] hover:border-uagc-sky/40 hover:bg-white/10 sm:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-uagc-sky/15 text-uagc-sky transition-colors group-hover:bg-uagc-sky/25">
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
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-5 py-6 transition-[border-color,background-color] hover:border-uagc-sky/40 hover:bg-white/10 sm:py-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-uagc-sky/15 text-uagc-sky transition-colors group-hover:bg-uagc-sky/25">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-white">Call an Advisor</span>
                  <span className="text-xs leading-relaxed text-[#8a9bb5]">
                    (855) 210-4959
                  </span>
                </a>

                {rfiState.submitted ? (
                  <a
                    href={rfiState.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-uagc-sky/30 bg-uagc-sky/8 px-5 py-6 transition-[border-color,background-color] hover:border-uagc-sky/50 hover:bg-uagc-sky/14 sm:py-8"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-uagc-sky/20 text-uagc-sky transition-colors group-hover:bg-uagc-sky/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white">Start Your Application</span>
                    <span className="text-xs leading-relaxed text-[#8a9bb5]">
                      $0 application fee
                    </span>
                  </a>
                ) : (
                  <a
                    href="#rfi"
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-uagc-sky/30 bg-uagc-sky/8 px-5 py-6 transition-[border-color,background-color] hover:border-uagc-sky/50 hover:bg-uagc-sky/14 sm:py-8"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-uagc-sky/20 text-uagc-sky transition-colors group-hover:bg-uagc-sky/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white">Request Information</span>
                    <span className="text-xs leading-relaxed text-[#8a9bb5]">
                      We&apos;ll reach out to you
                    </span>
                  </a>
                )}

                <a
                  href="https://cloud.mail.uagc.edu/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-uagc-red/30 bg-uagc-red/8 px-5 py-6 transition-[border-color,background-color] hover:border-uagc-red/50 hover:bg-uagc-red/14 sm:py-8"
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
      </PageMain>

      {/* FOOT-01 */}
      <Footer />

      {/* FORM-05 — Sticky RFI (mobile) / Post RFI compact */}
      {rfiState.submitted ? (
        <PostRfiPanel variant="compact" portalUrl={rfiState.portalUrl} heroFormRef={heroFormRef} />
      ) : (
        <RFIStickyBar heroFormRef={heroFormRef} />
      )}
    </>
  );
}
