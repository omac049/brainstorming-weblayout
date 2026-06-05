"use client";

/**
 * Organic online-degrees hub — competitor-informed navigational redesign.
 *
 * Module stack: NAV-00 · HERO-ORG · FIND-YOUR-PATH · AREAS · CTA-01 ·
 * TUITION-BAND · PROG-01 · TRUST-01 · FAQ-01 · SITE-FOOTER · FORM-05
 *
 * Design rationale (SNHU / WGU / Phoenix / Liberty competitive audit):
 * – No competitor embeds an RFI form on the degree hub; header CTA +
 *   sticky bar handle conversion. Hub is navigational, not persuasion.
 * – Category-level browse (areas of study) before individual programs.
 * – Inline tuition transparency (cost band, not a buried bullet).
 * – Shorter page: routing > convincing. ~6-7 sections, not 10+.
 */

import { useRef } from "react";

import { AreasOfStudyGrid } from "@/components/organic/AreasOfStudyGrid";
import { HomeDifferentiatorPathSection } from "@/components/organic/HomeDifferentiatorPathSection";
import { OrganicHomeHero } from "@/components/organic/OrganicHomeHero";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { SiteHeader } from "@/components/organic/SiteHeader";
import { TuitionHighlightBand } from "@/components/organic/TuitionHighlightBand";
import { FAQSection } from "@/components/sections/FAQSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { RFIStickyBar } from "@/components/shared/RFIForm";
import { ONLINE_DEGREES_CLONE } from "@/lib/clones/online-degrees-clone";
import { HUB_FAQ_ITEMS } from "@/lib/organic-online-degrees-data";

export default function OrganicOnlineDegreesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroFormRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        role="main"
        className="flex-1 pt-16 sm:pt-[72px] lg:pt-[108px]"
      >
        {/* 1 — Hero: sets the scene */}
        <OrganicHomeHero
          heroRef={heroRef}
          eyebrow="University of Arizona Global Campus"
          headline={
            <>
              Your Degree,
              <br />
              Your Schedule
            </>
          }
          subheadline="50+ programs from associate to doctoral — 100% online, one 5-week class at a time. Built for people who work, parent, serve, and can't put life on hold."
          imageSrc={ONLINE_DEGREES_CLONE.hero.images.desktop}
          imageAlt={ONLINE_DEGREES_CLONE.hero.images.alt}
          imagePosition="center 20%"
          sectionNavItems={[
            { id: "degree-path", label: "Find Your Path" },
            { id: "areas", label: "Areas of Study" },
            { id: "programs", label: "All Programs" },
            { id: "stories", label: "Student Stories" },
            { id: "faq", label: "FAQ" },
          ]}
        />

        {/* 2 — Find Your Path: immediate navigational routing */}
        <HomeDifferentiatorPathSection show="tabs" />

        {/* 3 — Areas of Study: category-level browse */}
        <AreasOfStudyGrid />

        {/* 4 — TRUST-01: persona-matched proof (simulation-informed) */}
        <TestimonialSection
          id="stories"
          heading="People Like You Are Already Here"
          subheading="Real students. Real schedules. Real results."
          testimonials={[
            {
              quote: "I juggle two kids and a full-time job. The 5-week courses meant I only focused on one subject at a time — I graduated in 18 months without ever missing a school pickup.",
              name: "Maria T.",
              credential: "B.A. in Business Administration · Now a regional operations manager",
              tag: "Working Parent",
            },
            {
              quote: "My military credits transferred on day one — no runaround. I used my GI Bill and finished my degree while transitioning out of active duty. My advisor understood military life.",
              name: "James R.",
              credential: "B.S. in Information Technology · Hired at a defense contractor within 3 months",
              tag: "Military Veteran",
            },
            {
              quote: "At 42, I was terrified to start over. My advisor helped me get credit for my work experience, and the online format let me study after the kids went to bed. I landed a promotion before I even finished.",
              name: "Priya K.",
              credential: "M.A. in Organizational Leadership · Promoted to director-level",
              tag: "Career Changer",
            },
          ]}
        />

        {/* 5 — Tuition Band: inline cost transparency */}
        <TuitionHighlightBand />

        {/* 6 — PROG-01: searchable program catalog */}
        <ProgramExplorer
          heading="Find Your Program"
          ctaTarget="#degree-path"
        />

        {/* 7 — CTA-01: Ready to Start (after program browse) */}
        <HomeDifferentiatorPathSection show="cta" />

        {/* 8 — FAQ: objection handler */}
        <div id="faq" className="scroll-mt-20">
          <FAQSection
            heading="Frequently Asked Questions About Online Degrees"
            items={HUB_FAQ_ITEMS}
          />
        </div>

      </main>
      <SiteFooter />
      <RFIStickyBar heroFormRef={heroFormRef} />
    </>
  );
}
