"use client";

/**
 * Organic online-degrees hub — data-optimized discovery stack.
 *
 * Module stack: NAV-00 · HERO-ORG · PERSONA-PATHS · PROG-01 ·
 * TUITION-BAND · WAYS-TO-SAVE · AREAS · TRUST-01 · CAREER-01 · HUB-JOURNEY ·
 * CTA-01 · ACCR-01 · FORM-02 · FAQ-01 · FOOT-01 · FORM-05
 *
 * Simulation-informed adds: persona routing, cost disclosures, outcomes proof.
 */

import { useRef } from "react";

import { useRfiRedirect } from "@/hooks/useRfiRedirect";
import { AccreditationBand } from "@/components/organic/AccreditationBand";
import { AreasOfStudyGrid } from "@/components/organic/AreasOfStudyGrid";
import { EnrollmentJourneySection } from "@/components/organic/EnrollmentJourneySection";
import { HubBottomCTA } from "@/components/organic/HubBottomCTA";
import { HeroSectionNav } from "@/components/organic/HeroV2";
import { OrganicHomeHero } from "@/components/organic/OrganicHomeHero";
import { PersonaPathSection } from "@/components/organic/PersonaPathSection";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { SiteHeader } from "@/components/organic/SiteHeader";
import { TuitionHighlightBand } from "@/components/organic/TuitionHighlightBand";
import { VideoTestimonialSection } from "@/components/organic/VideoTestimonialSection";
import { WaysToSaveSection } from "@/components/organic/WaysToSaveSection";
import { CareerOutcomesSection } from "@/components/sections/CareerOutcomesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { PageMain } from "@/components/shared/PageMain";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ONLINE_DEGREES_CLONE } from "@/lib/clones/online-degrees-clone";
import {
  HUB_CAREER_OUTCOMES,
  HUB_FAQ_ITEMS,
  HUB_PERSONA_PATHS,
  HUB_VIDEO_TESTIMONIALS,
} from "@/lib/organic-online-degrees-data";

const HUB_SECTION_NAV = [
  { id: "paths", label: "Your Path" },
  { id: "programs", label: "Programs" },
  { id: "tuition", label: "Tuition" },
  { id: "areas", label: "Areas" },
  { id: "stories", label: "Stories" },
  { id: "outcomes", label: "Careers" },
  { id: "journey", label: "Get Started" },
  { id: "faq", label: "FAQ" },
] as const;

export default function OrganicOnlineDegreesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const rfiRef = useRef<HTMLDivElement>(null);
  const handleRfiSubmit = useRfiRedirect();
  const { ref: progRevealRef, isVisible: progVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: faqRevealRef, isVisible: faqVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <PageMain variant="hub">
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
          sectionNavItems={[]}
        />

        <HeroSectionNav items={[...HUB_SECTION_NAV]} variant="light" />

        <PersonaPathSection
          paths={HUB_PERSONA_PATHS}
          heading="Start With Your Situation"
          subheading="Transfer credits, military benefits, graduate programs, or a new career field — pick the path that matches why you're here."
          viewAllHref="#areas"
          variant="surface"
        />

        <div
          ref={progRevealRef}
          className={`reveal-section ${progVisible ? "is-visible" : ""}`}
        >
          <ProgramExplorer heading="Search Online Degree Programs" />
        </div>

        <TuitionHighlightBand />

        <WaysToSaveSection />

        <AreasOfStudyGrid />

        <VideoTestimonialSection
          id="stories"
          testimonials={[...HUB_VIDEO_TESTIMONIALS]}
        />

        <CareerOutcomesSection
          id="outcomes"
          variant="surface"
          className="scroll-mt-20"
          heading="Where UAGC Graduates Go"
          intro="Salary ranges and common job titles by field — plus lifetime career services and Handshake employer access from day one."
          outcomes={[...HUB_CAREER_OUTCOMES]}
          exploreProgramsLabel="Browse Programs"
          exploreProgramsHref="#programs"
        />

        <EnrollmentJourneySection />

        <HubBottomCTA />

        <AccreditationBand />

        <section
          id="rfi"
          className="scroll-mt-24 section-pad bg-uagc-navy lg:scroll-mt-36"
          aria-labelledby="hub-rfi-heading"
        >
          <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-10">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              <h2 id="hub-rfi-heading" className="type-h2 text-white">
                Or Request Information{" "}
                <span className="text-uagc-gold">Here</span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#b8c5d9] sm:text-base">
                Get paired with an enrollment advisor who can help you find the
                right program, transfer credits, and understand your cost.
              </p>
            </div>
            <RFIForm variant="full" heroFormRef={rfiRef} onSubmit={handleRfiSubmit} />
            <p className="mt-3 text-center text-sm text-[#b8c5d9]">
              It only takes a minute. No obligation.
            </p>
          </div>
        </section>

        <div
          ref={faqRevealRef}
          id="faq"
          className={`scroll-mt-20 reveal-section ${faqVisible ? "is-visible" : ""}`}
        >
          <FAQSection
            heading="Frequently Asked Questions About Online Degrees"
            items={HUB_FAQ_ITEMS}
          />
        </div>
      </PageMain>
      <SiteFooter />
      <RFIStickyBar heroFormRef={heroRef} />
    </>
  );
}
