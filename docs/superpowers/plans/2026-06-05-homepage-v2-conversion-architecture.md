# Homepage v2 — Conversion Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversion-optimized homepage v2 at `/organic/homepage-v2` with micro-RFI hero, competitive comparison, interactive cost estimator, Quick View panels, and consolidated social proof — cutting from 13 modules to 7.

**Architecture:** New components live in `prototypes/src/components/organic/`. The page file at `prototypes/src/app/organic/homepage-v2/page.tsx` composes them. Existing shared components (`RFIForm`, `FAQSection`, `ProgramExplorer`) receive minor prop additions for pre-fill and expandable behavior. All state is client-side React; no API integration.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React

**Design Spec:** `docs/superpowers/specs/2026-06-05-homepage-v2-conversion-architecture-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `prototypes/src/components/organic/HeroV2.tsx` | Create | Hero with embedded micro-RFI form |
| `prototypes/src/components/organic/CompetitiveComparison.tsx` | Create | UAGC vs competitors comparison table/cards |
| `prototypes/src/components/organic/ProgramQuickView.tsx` | Create | Slide-in program detail panel |
| `prototypes/src/components/organic/CostEstimator.tsx` | Create | Interactive tuition calculator |
| `prototypes/src/components/organic/SocialProofLayer.tsx` | Create | Consolidated video + badges + outcomes |
| `prototypes/src/components/shared/RFIForm.tsx` | Modify | Add `initialValues` prop to `FullRFIForm` |
| `prototypes/src/components/sections/ProgramExplorer.tsx` | Modify | Add `onProgramSelect` callback prop |
| `prototypes/src/app/organic/homepage-v2/page.tsx` | Modify | Wire all v2 components together |

---

## Task 1: Add `initialValues` prop to RFIForm

**Files:**
- Modify: `prototypes/src/components/shared/RFIForm.tsx`

The hero micro-form and cost estimator need to pre-fill the closing RFI form. Add an `initialValues` prop so the page can pass values down.

- [ ] **Step 1: Add `initialValues` to `RFIFormProps`**

In `prototypes/src/components/shared/RFIForm.tsx`, update the `RFIFormProps` interface:

```typescript
export interface RFIFormProps {
  variant: "mini" | "full" | "inline";
  heading?: string;
  className?: string;
  onSubmit?: (data: Record<string, string>) => void;
  heroFormRef?: RefObject<HTMLDivElement | null>;
  /** Pre-fill form fields (e.g., from hero micro-form or cost estimator). */
  initialValues?: Partial<RFIFormData>;
}
```

- [ ] **Step 2: Wire `initialValues` into `FullRFIForm`**

Update the `FullRFIForm` function to accept and use `initialValues`:

```typescript
function FullRFIForm({
  heading = DEFAULT_RFI_HEADING,
  className,
  onSubmit,
  initialValues,
}: Pick<RFIFormProps, "heading" | "className" | "onSubmit" | "initialValues">) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RFIFormData>({
    ...INITIAL_FORM_DATA,
    ...initialValues,
  });
```

- [ ] **Step 3: Pass `initialValues` through `RFIForm` switch**

Update the `full` case in the `RFIForm` export:

```typescript
case "full":
  return (
    <FullRFIForm
      heading={heading}
      className={className}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  );
```

- [ ] **Step 4: Add `useEffect` to update when `initialValues` changes**

Inside `FullRFIForm`, add an effect so that when hero micro-form data flows in, the form updates:

```typescript
useEffect(() => {
  if (initialValues) {
    setFormData((prev) => ({ ...prev, ...initialValues }));
  }
}, [initialValues]);
```

- [ ] **Step 5: Verify in browser**

Run `npm run dev`, navigate to `/organic/homepage-v2`. The RFI form should still render and work normally. No visual change yet.

- [ ] **Step 6: Commit**

```bash
git add prototypes/src/components/shared/RFIForm.tsx
git commit -m "feat(rfi): add initialValues prop for pre-fill from hero/cost estimator"
```

---

## Task 2: Add `onProgramSelect` callback to ProgramExplorer

**Files:**
- Modify: `prototypes/src/components/sections/ProgramExplorer.tsx`

The v2 homepage needs to open a Quick View panel when a program is clicked, instead of (or in addition to) expanding inline. Add an optional callback.

- [ ] **Step 1: Add `onProgramSelect` to `ProgramExplorerProps`**

```typescript
export interface ProgramExplorerProps {
  heading?: string;
  programs?: ProgramDetail[];
  compact?: boolean;
  showTransferCallout?: boolean;
  ctaTarget?: string;
  className?: string;
  /** Called when user clicks a program card. If provided, replaces inline expand behavior. */
  onProgramSelect?: (program: ProgramDetail) => void;
}
```

- [ ] **Step 2: Use callback in `ProgramExplorer`**

Destructure the new prop and modify the toggle handler:

```typescript
export function ProgramExplorer({
  heading = "Discover the Program That\u2019s Right for You",
  programs = ENRICHED_PROGRAMS,
  compact = false,
  showTransferCallout: _showTransferCallout = false,
  ctaTarget: _ctaTarget = "#rfi",
  className,
  onProgramSelect,
}: ProgramExplorerProps) {
```

Update the `handleToggle` callback:

```typescript
const handleToggle = useCallback((program: ProgramDetail) => {
  if (onProgramSelect) {
    onProgramSelect(program);
  } else {
    setExpandedProgram((prev) => (prev === program.name ? null : program.name));
  }
}, [onProgramSelect]);
```

- [ ] **Step 3: Update ProgramRow call site**

Change the `onToggle` prop passed to `ProgramRow` from `() => handleToggle(program.name)` to `() => handleToggle(program)`:

```typescript
<ProgramRow
  program={program}
  areaFilter={areaFilter}
  compact={compact}
  isExpanded={!onProgramSelect && expandedProgram === program.name}
  onToggle={() => handleToggle(program)}
/>
```

- [ ] **Step 4: Verify existing behavior unchanged**

Navigate to `/organic/homepage` (v1). Programs should still expand inline on click since no `onProgramSelect` is passed.

- [ ] **Step 5: Commit**

```bash
git add prototypes/src/components/sections/ProgramExplorer.tsx
git commit -m "feat(program-explorer): add onProgramSelect callback for Quick View integration"
```

---

## Task 3: Build HeroV2 component

**Files:**
- Create: `prototypes/src/components/organic/HeroV2.tsx`

Hero with parallax background image (reusing v1 pattern), headline, trust pills, section nav bar, and a 3-field micro-RFI form card.

- [ ] **Step 1: Create the HeroV2 component file**

Create `prototypes/src/components/organic/HeroV2.tsx` with the full component:

```tsx
"use client";

import { AssetImage } from "@/components/shared/AssetImage";
import {
  type FormEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";

import { HOMEPAGE_CLONE } from "@/lib/clones/homepage-clone";
import { AREAS_OF_INTEREST } from "@/lib/rfi-form-data";
import { cn } from "@/lib/utils";

interface TrustPill {
  label: string;
  accent?: boolean;
}

interface SectionNavItem {
  id: string;
  label: string;
}

export interface HeroMicroFormData {
  firstname: string;
  email: string;
  college_of_interest: string;
}

export interface HeroV2Props {
  heroRef?: RefObject<HTMLElement | null>;
  className?: string;
  eyebrow?: string;
  headline?: ReactNode;
  subheadline?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  trustPills?: TrustPill[];
  sectionNavItems?: SectionNavItem[];
  onMicroFormSubmit?: (data: HeroMicroFormData) => void;
}

const DEFAULT_TRUST_PILLS: TrustPill[] = [
  { label: "$485/credit", accent: true },
  { label: "5-Week Courses" },
  { label: "WSCUC Accredited" },
  { label: "$0 to Apply" },
];

function MicroRFICard({
  onSubmit,
  className,
}: {
  onSubmit?: (data: HeroMicroFormData) => void;
  className?: string;
}) {
  const [formData, setFormData] = useState<HeroMicroFormData>({
    firstname: "",
    email: "",
    college_of_interest: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-white/15 bg-uagc-navy/85 p-5 backdrop-blur-md sm:p-6",
        className,
      )}
    >
      <h2 className="mb-4 font-heading text-lg font-semibold text-white">
        Get Your Free Program Guide
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="hero-firstname" className="mb-1 block text-xs font-medium text-white/80">
            First Name
          </label>
          <input
            id="hero-firstname"
            type="text"
            required
            value={formData.firstname}
            onChange={(e) => setFormData((p) => ({ ...p, firstname: e.target.value }))}
            autoComplete="given-name"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-uagc-gold focus:outline-none focus:ring-1 focus:ring-uagc-gold"
            placeholder="Your first name"
          />
        </div>
        <div>
          <label htmlFor="hero-email" className="mb-1 block text-xs font-medium text-white/80">
            Email
          </label>
          <input
            id="hero-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            autoComplete="email"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-uagc-gold focus:outline-none focus:ring-1 focus:ring-uagc-gold"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="hero-area" className="mb-1 block text-xs font-medium text-white/80">
            Area of Interest
          </label>
          <select
            id="hero-area"
            required
            value={formData.college_of_interest}
            onChange={(e) => setFormData((p) => ({ ...p, college_of_interest: e.target.value }))}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-uagc-gold focus:outline-none focus:ring-1 focus:ring-uagc-gold [&>option]:text-uagc-navy"
          >
            <option value="">Select an area</option>
            {AREAS_OF_INTEREST.map((area) => (
              <option key={area.value} value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-1 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-uagc-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-uagc-gold/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-uagc-navy"
        >
          Get My Program Guide
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </form>
      <p className="mt-3 text-center text-[11px] leading-tight text-white/50">
        No obligation · An advisor will reach out within one business day
      </p>
    </div>
  );
}

function HeroSectionNav({
  items,
  className,
}: {
  items: SectionNavItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "w-full border-t border-white/15 bg-uagc-navy/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-1 overflow-x-auto px-5 py-2 sm:justify-center sm:gap-1.5 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 min-w-[44px] rounded-full px-3.5 py-2 text-center text-xs font-medium tracking-wide text-white/75 transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-0 sm:px-4 sm:text-[0.8125rem]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function HeroV2({
  heroRef,
  className,
  eyebrow = "University of Arizona Global Campus",
  headline,
  subheadline = "54+ accredited programs — one class at a time, in 5-week courses that fit around your job, your family, and your life.",
  imageSrc = "/images/homepage-hero-proud.webp",
  imageAlt = "UAGC graduates celebrating at commencement",
  imagePosition = "center 35%",
  trustPills = DEFAULT_TRUST_PILLS,
  sectionNavItems = HOMEPAGE_CLONE.sectionNav as unknown as SectionNavItem[],
  onMicroFormSubmit,
}: HeroV2Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const defaultHeadline = (
    <>
      Your Degree. Your Pace.
      <br />
      <span className="text-uagc-gold">Starting at $485/Credit.</span>
    </>
  );
  const resolvedHeadline = headline ?? defaultHeadline;

  const setSectionRef = (node: HTMLElement | null) => {
    sectionRef.current = node;
    if (heroRef && "current" in heroRef) {
      heroRef.current = node;
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(rect.height, 1)),
      );
      const translateY = scrollProgress * 24;
      const scale = 1 + scrollProgress * 0.04;
      imageWrap.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <section
        ref={setSectionRef}
        className="relative flex w-full flex-col overflow-hidden"
        aria-label="Hero"
      >
        {/* === MOBILE === */}
        <div className="relative flex flex-col lg:hidden">
          <div className="relative h-[320px] sm:h-[360px]">
            <AssetImage
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,35,75,0.97)_0%,rgba(12,35,75,0.65)_45%,rgba(12,35,75,0.15)_70%,transparent_100%)]" />
            <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-5 sm:px-8">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-uagc-gold">
                {eyebrow}
              </p>
              <h1 className="mt-2 font-heading-condensed text-[clamp(2rem,9vw,3rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-white">
                {resolvedHeadline}
              </h1>
              <p className="mt-3 max-w-[340px] text-[0.875rem] leading-relaxed text-white/90">
                {subheadline}
              </p>
            </div>
          </div>

          {trustPills.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 bg-uagc-navy px-5 py-3 sm:px-8">
              {trustPills.map((pill) => (
                <span
                  key={pill.label}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1.5 text-[0.75rem] font-medium tracking-wide",
                    pill.accent
                      ? "border border-uagc-gold/50 bg-uagc-gold/20 font-semibold text-white"
                      : "border border-white/25 bg-white/10 text-white/95",
                  )}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          )}

          <div className="bg-uagc-navy px-5 pb-5 sm:px-8">
            <MicroRFICard onSubmit={onMicroFormSubmit} />
          </div>

          {sectionNavItems.length > 0 && (
            <HeroSectionNav items={sectionNavItems} className="relative z-10" />
          )}
        </div>

        {/* === DESKTOP === */}
        <div className="relative hidden min-h-[640px] lg:flex lg:flex-col xl:min-h-[700px]">
          <div
            ref={imageWrapRef}
            className="absolute inset-0 will-change-transform"
            aria-hidden="true"
          >
            <AssetImage
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,35,75,0.92)_0%,rgba(12,35,75,0.65)_32%,rgba(12,35,75,0.12)_55%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,35,75,0.55)_0%,transparent_30%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center px-10 xl:px-14">
            <div className="flex w-full items-start justify-between gap-10">
              {/* Left column — headline */}
              <div className="max-w-[560px] flex-1">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-uagc-gold">
                  {eyebrow}
                </p>
                <h1 className="mt-3 font-heading-condensed text-[clamp(3rem,4.2vw,4.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
                  {resolvedHeadline}
                </h1>
                <p className="mt-5 max-w-[480px] text-[1.0625rem] leading-relaxed text-white/90">
                  {subheadline}
                </p>

                {trustPills.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2.5">
                    {trustPills.map((pill) => (
                      <span
                        key={pill.label}
                        className={cn(
                          "inline-flex items-center rounded-full px-4 py-1.5 text-[0.8125rem] tracking-wide transition-colors duration-200",
                          pill.accent
                            ? "border border-uagc-gold/50 bg-uagc-gold/20 font-semibold text-white"
                            : "border border-white/25 bg-white/10 font-medium text-white hover:bg-white/15",
                        )}
                      >
                        {pill.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right column — micro-form */}
              <div className="w-[380px] shrink-0 xl:w-[420px]">
                <MicroRFICard onSubmit={onMicroFormSubmit} />
              </div>
            </div>
          </div>

          {sectionNavItems.length > 0 && (
            <HeroSectionNav items={sectionNavItems} className="relative z-10" />
          )}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify the component compiles**

Navigate to `/organic/homepage-v2` in the browser. The component isn't wired up yet, but there should be no build errors. Check the terminal running `npm run dev` for TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add prototypes/src/components/organic/HeroV2.tsx
git commit -m "feat: add HeroV2 component with embedded micro-RFI form"
```

---

## Task 4: Build CompetitiveComparison component

**Files:**
- Create: `prototypes/src/components/organic/CompetitiveComparison.tsx`

- [ ] **Step 1: Create the component file**

Create `prototypes/src/components/organic/CompetitiveComparison.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AssetImage } from "@/components/shared/AssetImage";

interface ComparisonRow {
  dimension: string;
  uagc: string;
  typicalOnline: string;
  communityCollege: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: "Tuition",
    uagc: "$485/credit",
    typicalOnline: "$600–$700/credit",
    communityCollege: "$150–$300/credit (limited online)",
  },
  {
    dimension: "Course Format",
    uagc: "1 class at a time, 5 weeks",
    typicalOnline: "3–4 classes simultaneously, 8–16 weeks",
    communityCollege: "Fixed semester schedule",
  },
  {
    dimension: "Transfer Credits",
    uagc: "Up to 75% accepted",
    typicalOnline: "Varies, often capped at 50%",
    communityCollege: "Limited prior learning assessment",
  },
  {
    dimension: "Entrance Exams",
    uagc: "None required",
    typicalOnline: "SAT/GRE may be required",
    communityCollege: "Placement tests common",
  },
  {
    dimension: "Accreditation",
    uagc: "WSCUC + University of Arizona",
    typicalOnline: "Varies",
    communityCollege: "Regional",
  },
];

export interface CompetitiveComparisonProps {
  id?: string;
  className?: string;
}

function MobileCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const row = COMPARISON_DATA[activeIndex];

  return (
    <div className="lg:hidden">
      <div className="relative overflow-hidden rounded-xl border border-uagc-border bg-white p-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
          {row.dimension}
        </p>

        <div className="mt-3 space-y-3">
          <div className="rounded-lg border-l-4 border-uagc-gold bg-uagc-gold/[0.06] p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-uagc-gold">UAGC</p>
            <p className="mt-1 text-base font-bold text-uagc-navy">{row.uagc}</p>
          </div>
          <div className="rounded-lg bg-uagc-surface p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-uagc-gray/60">
              Typical Online School
            </p>
            <p className="mt-1 text-sm text-uagc-gray">{row.typicalOnline}</p>
          </div>
          <div className="rounded-lg bg-uagc-surface p-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-uagc-gray/60">
              Community College
            </p>
            <p className="mt-1 text-sm text-uagc-gray">{row.communityCollege}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            className="flex size-9 items-center justify-center rounded-full border border-uagc-border text-uagc-navy transition-colors hover:bg-uagc-surface disabled:opacity-30"
            aria-label="Previous comparison"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {COMPARISON_DATA.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  i === activeIndex ? "bg-uagc-gold" : "bg-uagc-border",
                )}
                aria-label={`Go to comparison ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((i) => Math.min(COMPARISON_DATA.length - 1, i + 1))
            }
            disabled={activeIndex === COMPARISON_DATA.length - 1}
            className="flex size-9 items-center justify-center rounded-full border border-uagc-border text-uagc-navy transition-colors hover:bg-uagc-surface disabled:opacity-30"
            aria-label="Next comparison"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DesktopTable() {
  return (
    <div className="hidden lg:block">
      <div className="overflow-hidden rounded-xl border border-uagc-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-uagc-surface">
              <th className="w-[18%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
                &nbsp;
              </th>
              <th className="w-[28%] border-l-4 border-uagc-gold bg-uagc-gold/[0.06] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-navy">
                UAGC
              </th>
              <th className="w-[27%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
                Typical Online School
              </th>
              <th className="w-[27%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-uagc-gray/60">
                Community College
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-uagc-border bg-white">
            {COMPARISON_DATA.map((row) => (
              <tr key={row.dimension}>
                <td className="px-5 py-4 font-semibold text-uagc-navy">
                  {row.dimension}
                </td>
                <td className="border-l-4 border-uagc-gold bg-uagc-gold/[0.03] px-5 py-4 font-bold text-uagc-navy">
                  {row.uagc}
                </td>
                <td className="px-5 py-4 text-uagc-gray">
                  {row.typicalOnline}
                </td>
                <td className="px-5 py-4 text-uagc-gray">
                  {row.communityCollege}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CompetitiveComparison({
  id = "compare",
  className,
}: CompetitiveComparisonProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 section-pad bg-white lg:scroll-mt-36", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">How UAGC Compares</h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray">
            See how UAGC stacks up against other online schools and community
            colleges on the things that matter most.
          </p>
        </div>

        <MobileCards />
        <DesktopTable />

        <p className="mt-6 text-center text-sm font-medium text-uagc-navy">
          Part of the University of Arizona — a top-ranked public R1 research
          university
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify no build errors**

Check the dev server terminal for TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add prototypes/src/components/organic/CompetitiveComparison.tsx
git commit -m "feat: add CompetitiveComparison component with desktop table and mobile cards"
```

---

## Task 5: Build ProgramQuickView component

**Files:**
- Create: `prototypes/src/components/organic/ProgramQuickView.tsx`

Slide-in panel (desktop) / bottom sheet (mobile) showing program details with RFI CTA.

- [ ] **Step 1: Create the component file**

Create `prototypes/src/components/organic/ProgramQuickView.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { X, ArrowRight, Clock, TrendingUp, BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramDetail } from "@/lib/program-data";

export interface ProgramQuickViewProps {
  program: ProgramDetail | null;
  onClose: () => void;
  onRequestInfo?: (areaOfInterest: string) => void;
}

export function ProgramQuickView({
  program,
  onClose,
  onRequestInfo,
}: ProgramQuickViewProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!program) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [program, onClose]);

  if (!program) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={program.name}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Desktop: slide from right */}
      <div
        ref={panelRef}
        className={cn(
          "absolute bg-white shadow-2xl overflow-y-auto",
          "inset-x-0 bottom-0 top-[15vh] rounded-t-2xl",
          "lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[480px] lg:rounded-none xl:w-[520px]",
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-uagc-border bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-uagc-gold">
              {program.level}
            </p>
            <h2 className="mt-1 font-heading text-lg font-semibold leading-snug text-uagc-navy sm:text-xl">
              {program.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 flex size-9 shrink-0 items-center justify-center rounded-full text-uagc-gray transition-colors hover:bg-uagc-surface hover:text-uagc-navy"
            aria-label="Close program details"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-uagc-gray">
            {program.description}
          </p>

          {/* Quick facts */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-uagc-surface p-3 text-center">
              <Clock className="mx-auto size-4 text-uagc-navy/60" aria-hidden />
              <p className="mt-1.5 text-lg font-bold text-uagc-navy">{program.credits}</p>
              <p className="text-[11px] text-uagc-gray">Credits</p>
            </div>
            <div className="rounded-lg bg-uagc-surface p-3 text-center">
              <BookOpen className="mx-auto size-4 text-uagc-navy/60" aria-hidden />
              <p className="mt-1.5 text-sm font-bold text-uagc-navy">{program.duration}</p>
              <p className="text-[11px] text-uagc-gray">Est. Time</p>
            </div>
            <div className="rounded-lg bg-uagc-surface p-3 text-center">
              <TrendingUp className="mx-auto size-4 text-uagc-navy/60" aria-hidden />
              <p className="mt-1.5 text-lg font-bold text-uagc-navy">
                {program.level.includes("Master") || program.level.includes("Doctoral") ? "$625" : "$485"}
              </p>
              <p className="text-[11px] text-uagc-gray">Per Credit</p>
            </div>
          </div>

          {/* Career paths */}
          <div className="mt-6">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
              <TrendingUp className="size-3.5" aria-hidden />
              Top Career Paths
            </h3>
            <ul className="mt-3 space-y-2.5">
              {program.careerPaths.slice(0, 3).map((career) => (
                <li
                  key={career.title}
                  className="flex items-center justify-between rounded-lg border border-uagc-border px-3.5 py-2.5"
                >
                  <span className="text-sm font-semibold text-uagc-navy">
                    {career.title}
                  </span>
                  <span className="text-xs font-medium text-uagc-gray">
                    {career.salaryRange}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-uagc-gray/50">
              Salary ranges are national medians from BLS and vary by location.
            </p>
          </div>

          {/* Sample courses */}
          {program.sampleCourses.length > 0 && (
            <div className="mt-6">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-uagc-navy/60">
                <BookOpen className="size-3.5" aria-hidden />
                Sample Courses
              </h3>
              <ul className="mt-3 space-y-1.5">
                {program.sampleCourses.slice(0, 4).map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 text-sm text-uagc-navy"
                  >
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-uagc-red/40" />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sticky CTA footer */}
        <div className="sticky bottom-0 border-t border-uagc-border bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => onRequestInfo?.(program.area)}
            className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-uagc-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-uagc-gold/90 focus-visible:ring-2 focus-visible:ring-uagc-gold focus-visible:ring-offset-2"
          >
            Request Info for This Program
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <a
            href={`https://www.uagc.edu${program.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-uagc-red transition-colors hover:text-uagc-navy"
          >
            View Full Program Details
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify no build errors**

- [ ] **Step 3: Commit**

```bash
git add prototypes/src/components/organic/ProgramQuickView.tsx
git commit -m "feat: add ProgramQuickView slide panel with career paths and RFI CTA"
```

---

## Task 6: Build CostEstimator component

**Files:**
- Create: `prototypes/src/components/organic/CostEstimator.tsx`

Interactive calculator with degree level toggle, transfer credit slider, aid selection, and live cost panel.

- [ ] **Step 1: Create the component file**

Create `prototypes/src/components/organic/CostEstimator.tsx`:

```tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQSection, type SimpleFAQItem } from "@/components/sections/FAQSection";

type DegreeLevel = "associate" | "bachelor" | "master";
type AidType = "scholarships" | "employer" | "military";

const DEGREE_CONFIG: Record<DegreeLevel, { label: string; credits: number; rate: number }> = {
  associate: { label: "Associate's", credits: 60, rate: 485 },
  bachelor: { label: "Bachelor's", credits: 120, rate: 485 },
  master: { label: "Master's", credits: 36, rate: 625 },
};

const AID_OPTIONS: { id: AidType; label: string; annualReduction: number | null }[] = [
  { id: "scholarships", label: "Scholarships", annualReduction: 2500 },
  { id: "employer", label: "Employer Reimbursement", annualReduction: 5250 },
  { id: "military", label: "Military Benefits", annualReduction: null },
];

const COST_FAQS: SimpleFAQItem[] = [
  {
    question: "What financial aid options are available?",
    answer:
      "Eligible students can access federal Pell Grants (up to $7,395/year), federal loans, UAGC scholarships, military benefits (GI Bill, TA, MyCAA), and employer tuition reimbursement programs. An advisor helps you build a personalized financial plan — no cost, no obligation.",
  },
  {
    question: "How much does tuition cost?",
    answer:
      "Undergraduate tuition is $485 per credit; graduate is $625 per credit. A typical 3-credit course costs $1,455 for undergrad. There's no application fee, and 86% of students receive financial aid or scholarships that reduce out-of-pocket costs.",
  },
];

export interface CostEstimatorProps {
  id?: string;
  className?: string;
  onGetPlan?: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CostEstimator({
  id = "cost-estimator",
  className,
  onGetPlan,
}: CostEstimatorProps) {
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>("bachelor");
  const [transferCredits, setTransferCredits] = useState(30);
  const [selectedAid, setSelectedAid] = useState<Set<AidType>>(new Set());

  const toggleAid = useCallback((aid: AidType) => {
    setSelectedAid((prev) => {
      const next = new Set(prev);
      if (next.has(aid)) next.delete(aid);
      else next.add(aid);
      return next;
    });
  }, []);

  const config = DEGREE_CONFIG[degreeLevel];
  const maxTransfer = degreeLevel === "master" ? 12 : 90;

  const calculation = useMemo(() => {
    const clampedTransfer = Math.min(transferCredits, config.credits - 1);
    const remaining = config.credits - clampedTransfer;
    const tuition = remaining * config.rate;

    const creditsPerTerm = 6;
    const monthsPerTerm = 1.25;
    const totalTerms = Math.ceil(remaining / creditsPerTerm);
    const totalMonths = Math.max(totalTerms * monthsPerTerm, 1);
    const estimatedYears = totalMonths / 12;

    const hasMilitary = selectedAid.has("military");
    let totalAidReduction = 0;
    for (const aid of selectedAid) {
      const option = AID_OPTIONS.find((o) => o.id === aid);
      if (option?.annualReduction) {
        totalAidReduction += option.annualReduction * Math.max(estimatedYears, 1);
      }
    }
    totalAidReduction = Math.min(totalAidReduction, tuition);

    const estimatedCost = hasMilitary ? null : tuition - totalAidReduction;
    const monthly = estimatedCost ? Math.round(estimatedCost / Math.max(totalMonths, 1)) : null;

    return {
      totalCredits: config.credits,
      transferCredits: clampedTransfer,
      remaining,
      tuition,
      aidReduction: totalAidReduction,
      estimatedCost,
      monthly,
      hasMilitary,
    };
  }, [degreeLevel, transferCredits, selectedAid, config]);

  return (
    <section
      id={id}
      className={cn("scroll-mt-28 section-pad bg-uagc-surface lg:scroll-mt-36", className)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 className="type-h2 text-uagc-navy">See What Your Degree Could Cost</h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-uagc-gray">
            Adjust the inputs below to get a rough estimate — then talk to an
            advisor for a personalized financial plan.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Left — inputs */}
          <div className="flex-1 space-y-6 lg:max-w-[580px]">
            {/* Degree level */}
            <div>
              <p className="mb-2 text-sm font-semibold text-uagc-navy">Degree Level</p>
              <div className="flex gap-2" role="radiogroup" aria-label="Degree level">
                {(Object.entries(DEGREE_CONFIG) as [DegreeLevel, typeof config][]).map(
                  ([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={degreeLevel === key}
                      onClick={() => {
                        setDegreeLevel(key);
                        setTransferCredits((prev) =>
                          key === "master" ? Math.min(prev, 12) : prev,
                        );
                      }}
                      className={cn(
                        "flex-1 cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-all",
                        degreeLevel === key
                          ? "border-uagc-navy bg-uagc-navy text-white"
                          : "border-uagc-border bg-white text-uagc-navy hover:border-uagc-navy/20",
                      )}
                    >
                      {val.label}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Transfer credits slider */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-uagc-navy">
                  Credits You Might Transfer
                </p>
                <span className="rounded-md bg-uagc-navy/[0.06] px-2 py-0.5 text-sm font-bold text-uagc-navy">
                  {transferCredits}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={maxTransfer}
                step={5}
                value={Math.min(transferCredits, maxTransfer)}
                onChange={(e) => setTransferCredits(Number(e.target.value))}
                className="w-full accent-uagc-gold"
                aria-label="Transfer credits"
                aria-valuemin={0}
                aria-valuemax={maxTransfer}
                aria-valuenow={Math.min(transferCredits, maxTransfer)}
              />
              <div className="mt-1 flex justify-between text-[11px] text-uagc-gray/60">
                <span>0</span>
                <span>{maxTransfer}</span>
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-uagc-gold/20 bg-uagc-gold/[0.05] px-3.5 py-2.5">
                <Info className="mt-0.5 size-4 shrink-0 text-uagc-gold" aria-hidden />
                <p className="text-xs leading-relaxed text-uagc-navy/80">
                  Work experience, military training, and certifications can count as
                  transfer credits through Prior Learning Assessment.
                </p>
              </div>
            </div>

            {/* Financial aid chips */}
            <div>
              <p className="mb-2 text-sm font-semibold text-uagc-navy">
                Financial Aid You May Qualify For
              </p>
              <div className="flex flex-wrap gap-2">
                {AID_OPTIONS.map((option) => {
                  const isActive = selectedAid.has(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleAid(option.id)}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                        isActive
                          ? "border-uagc-navy bg-uagc-navy text-white"
                          : "border-uagc-border bg-white text-uagc-navy hover:border-uagc-navy/20",
                      )}
                      aria-pressed={isActive}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — live cost panel */}
          <div className="w-full lg:w-[380px] lg:shrink-0">
            <div className="rounded-xl bg-uagc-navy p-6 text-white shadow-lg lg:sticky lg:top-28">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">
                Your Estimated Cost
              </h3>

              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Total program credits</span>
                  <span className="font-semibold">{calculation.totalCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Your transfer credits</span>
                  <span className="font-semibold text-uagc-gold">
                    −{calculation.transferCredits}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/70">Credits remaining</span>
                  <span className="font-semibold">{calculation.remaining}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">
                    Tuition at {formatCurrency(config.rate)}/credit
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(calculation.tuition)}
                  </span>
                </div>
                {calculation.aidReduction > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Est. aid reduction</span>
                    <span className="font-semibold text-green-400">
                      −{formatCurrency(calculation.aidReduction)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-white/15 pt-5">
                {calculation.hasMilitary ? (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-uagc-gold">
                      Contact an Advisor
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      Military benefits vary — your advisor will build a personalized estimate
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-uagc-gold">
                      {formatCurrency(calculation.estimatedCost ?? 0)}
                    </p>
                    {calculation.monthly && (
                      <p className="mt-1 text-sm text-white/60">
                        ~{formatCurrency(calculation.monthly)}/month
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onGetPlan}
                className="mt-5 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-uagc-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-uagc-gold/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-uagc-navy"
              >
                Get Your Personalized Financial Plan
                <ArrowRight className="size-4" aria-hidden />
              </button>

              <p className="mt-3 text-center text-[11px] leading-tight text-white/40">
                86% of students receive financial aid. An advisor helps you find
                every dollar — no cost, no obligation.
              </p>
            </div>
          </div>
        </div>

        {/* Inline FAQs */}
        <div className="mt-10">
          <FAQSection
            variant="accordion"
            heading=""
            items={COST_FAQS}
            className="!bg-transparent !py-0 [&>div]:!px-0"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify no build errors**

- [ ] **Step 3: Commit**

```bash
git add prototypes/src/components/organic/CostEstimator.tsx
git commit -m "feat: add CostEstimator with interactive slider, aid chips, and live cost panel"
```

---

## Task 7: Build SocialProofLayer component

**Files:**
- Create: `prototypes/src/components/organic/SocialProofLayer.tsx`

Consolidated trust section: curated video strip + badge row + employer outcomes bar.

- [ ] **Step 1: Create the component file**

Create `prototypes/src/components/organic/SocialProofLayer.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_VIDEO_TESTIMONIALS } from "@/lib/organic-homepage-data";
import { FAQSection, type SimpleFAQItem } from "@/components/sections/FAQSection";

const CURATED_VIDEOS = HOME_VIDEO_TESTIMONIALS.slice(0, 3);

const PROOF_FAQS: SimpleFAQItem[] = [
  {
    question: "Are online degrees respected by employers?",
    answer:
      "UAGC partners with 1,500+ employers including T-Mobile, Walgreens, and USPS. Graduates receive lifetime career services through Handshake's 98,000+ employer network. Your transcript and diploma carry full WSCUC accreditation — employers evaluate the credential and your skills, not the delivery format.",
  },
  {
    question: "Is UAGC accredited?",
    answer:
      "Yes. UAGC holds regional accreditation from WSCUC (WASC Senior College and University Commission), recognized by the U.S. Department of Education. Business programs hold IACBE accreditation and nursing programs hold CCNE accreditation. UAGC is also part of the University of Arizona — a public R1 research institution.",
  },
];

const BADGES = [
  { name: "WSCUC", label: "WSCUC Accredited" },
  { name: "UA", label: "University of Arizona" },
  { name: "IACBE", label: "IACBE Accredited" },
  { name: "CCNE", label: "CCNE Accredited" },
];

const OUTCOMES = [
  { stat: "1,500+", label: "Employer Partners" },
  { stat: "98,000+", label: "Employers on Handshake" },
  { stat: "Lifetime", label: "Career Services" },
];

function VideoLightbox({
  videoUrl,
  onClose,
}: {
  videoUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-3xl px-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-4 text-white hover:text-uagc-gold"
          aria-label="Close video"
        >
          <X className="size-6" />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={videoUrl}
            className="size-full"
            allow="autoplay; fullscreen"
            title="Student testimonial video"
          />
        </div>
      </div>
    </div>
  );
}

export interface SocialProofLayerProps {
  id?: string;
  className?: string;
}

export function SocialProofLayer({
  id = "social-proof",
  className,
}: SocialProofLayerProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div id={id} className={cn("scroll-mt-28 lg:scroll-mt-36", className)}>
      {/* 6a — Video testimonials */}
      <section className="section-pad bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span aria-hidden className="mb-3 accent-bar" />
            <h2 className="type-h2 text-uagc-navy">Hear From Students Like You</h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {CURATED_VIDEOS.map((video) => (
              <button
                key={video.name}
                type="button"
                onClick={() => setActiveVideo(`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`)}
                className="group relative min-w-[280px] cursor-pointer overflow-hidden rounded-xl bg-uagc-surface lg:min-w-0"
              >
                <div className="relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnailUrl}
                    alt={`${video.name} testimonial`}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-uagc-navy shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-1 size-6" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="p-4 text-left">
                  <p className="font-heading text-sm font-semibold text-uagc-navy">
                    {video.name}
                  </p>
                  <p className="text-xs text-uagc-gray">{video.credential}</p>
                  {video.quote && (
                    <p className="mt-2 line-clamp-2 text-xs italic leading-relaxed text-uagc-gray/80">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6b — Trust badges */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {BADGES.map((badge) => (
              <div
                key={badge.name}
                className="flex size-16 items-center justify-center rounded-full bg-uagc-surface text-xs font-bold text-uagc-navy sm:size-20"
                aria-label={badge.label}
                title={badge.label}
              >
                {badge.name}
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-medium text-uagc-navy">
            Part of the University of Arizona — a top-ranked public R1 research
            university
          </p>
        </div>
      </section>

      {/* 6c — Employer & outcomes bar */}
      <section className="bg-uagc-navy py-8 sm:py-10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:gap-10 sm:px-6 lg:gap-16 lg:px-8">
          {OUTCOMES.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 sm:gap-3">
              {i > 0 && (
                <div className="hidden h-10 w-px bg-white/15 sm:block" aria-hidden />
              )}
              <div className={cn("text-center", i > 0 && "sm:ml-4 lg:ml-8")}>
                <p className="text-2xl font-bold text-uagc-gold sm:text-3xl">
                  {item.stat}
                </p>
                <p className="mt-0.5 text-sm text-white/70">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inline FAQs */}
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
        <FAQSection
          variant="accordion"
          heading=""
          items={PROOF_FAQS}
          className="!bg-transparent !py-0 [&>div]:!px-0"
        />
      </div>

      {activeVideo && (
        <VideoLightbox
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify no build errors**

- [ ] **Step 3: Commit**

```bash
git add prototypes/src/components/organic/SocialProofLayer.tsx
git commit -m "feat: add SocialProofLayer with video strip, trust badges, and outcomes bar"
```

---

## Task 8: Wire up homepage-v2 page

**Files:**
- Modify: `prototypes/src/app/organic/homepage-v2/page.tsx`

Replace the v1 copy with the v2 module stack. This is the final assembly task.

- [ ] **Step 1: Rewrite the page file**

Replace the full contents of `prototypes/src/app/organic/homepage-v2/page.tsx` with the v2 composition. The page manages shared state (RFI pre-fill values, Quick View selection) and passes it to child components.

```tsx
"use client";

/**
 * Organic homepage v2 — "Conversion Architecture" redesign
 *
 * Goals: reduce bounce, increase RFI conversions, differentiate vs SNHU/WGU/Purdue Global.
 * Strategy: shorter page (~7 sections vs 13), micro-RFI in hero, interactive cost estimator,
 * competitive comparison strip, contextual social proof, multi-CTA placement.
 *
 * Module stack: NAV-00 · HERO-V2 · IMPACT · COMPARE · PROG-02 ·
 * COST-EST · PROOF · FORM-02+FAQ · FOOT-01 · FORM-05
 */

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { HeroV2, type HeroMicroFormData } from "@/components/organic/HeroV2";
import { ImpactStrip } from "@/components/organic/ImpactStrip";
import { CompetitiveComparison } from "@/components/organic/CompetitiveComparison";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { ProgramQuickView } from "@/components/organic/ProgramQuickView";
import { CostEstimator } from "@/components/organic/CostEstimator";
import { SocialProofLayer } from "@/components/organic/SocialProofLayer";
import { FAQSection } from "@/components/sections/FAQSection";
import { SiteHeader } from "@/components/organic/SiteHeader";
import { SiteFooter } from "@/components/organic/SiteFooter";
import { RFIForm, RFIStickyBar } from "@/components/shared/RFIForm";
import type { ProgramDetail } from "@/lib/program-data";
import type { RFIFormData } from "@/types";

const CLOSING_FAQ_TOP5 = [
  {
    question: "How much does tuition cost?",
    answer:
      "Undergraduate tuition is $485 per credit; graduate is $625 per credit. A typical 3-credit course costs $1,455 for undergrad. There's no application fee, and 86% of students receive financial aid or scholarships that reduce out-of-pocket costs.",
  },
  {
    question: "Can I transfer credits from another school?",
    answer:
      "Yes — UAGC accepts transfer credits from accredited institutions. Up to 75% of your bachelor's credits can transfer in, including community college coursework, military training, and professional certifications. Your advisor evaluates transcripts for free before you enroll.",
  },
  {
    question: "How long does it take to finish a degree?",
    answer:
      "It depends on your transfer credits and pace. Many bachelor's students finish in 2–3 years taking one course at a time. With maximum transfer credit, some finish in under 2 years. Master's programs typically take 1–2 years.",
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
];

const CLOSING_FAQ_REMAINING = [
  {
    question: "What specific programs does UAGC offer?",
    answer:
      "UAGC offers 54+ programs across Business, Accounting, Education, Health Care, IT, Criminal Justice, Liberal Arts, and Social & Behavioral Sciences — from associate through doctoral degrees.",
  },
  {
    question: "Can I enroll if I have a criminal record?",
    answer:
      "UAGC evaluates applicants individually. A criminal record does not automatically disqualify you from admission or federal financial aid.",
  },
  {
    question: "I'm a UAGC graduate — what's available for alumni?",
    answer:
      "Alumni receive lifetime career services, access to graduate programs with streamlined re-enrollment, and eligibility for alumni-specific scholarships.",
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

  const handleMicroFormSubmit = useCallback(
    (data: HeroMicroFormData) => {
      setRfiPreFill({
        firstname: data.firstname,
        email: data.email,
        college_of_interest: data.college_of_interest,
      });
      scrollToRfi();
    },
    [scrollToRfi],
  );

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

  const handleRfiSubmit = (data: Record<string, string>) => {
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
        {/* 1 — HERO-V2: micro-RFI + competitive headline */}
        <HeroV2
          heroRef={heroRef}
          onMicroFormSubmit={handleMicroFormSubmit}
        />

        {/* 2 — IMPACT: bold stat anchors */}
        <ImpactStrip />

        {/* 3 — COMPARE: UAGC vs competitors */}
        <CompetitiveComparison />

        {/* 4 — PROG-02: program explorer + Quick View */}
        <ProgramExplorer
          heading="Find Your Program"
          ctaTarget="#rfi"
          onProgramSelect={handleProgramSelect}
        />

        {/* 5 — COST-EST: interactive calculator */}
        <CostEstimator onGetPlan={scrollToRfi} />

        {/* 6 — PROOF: video + badges + outcomes */}
        <SocialProofLayer />

        {/* 7 — FORM-02+FAQ: closing RFI + inline FAQ side-by-side */}
        <section
          id="rfi"
          className="scroll-mt-24 section-pad bg-[#faf9f7]"
          aria-labelledby="home-rfi-heading"
        >
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span aria-hidden className="mx-auto mb-3 accent-bar" />
              <h2 id="home-rfi-heading" className="type-h2 text-uagc-navy">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-3 text-sm text-uagc-gray sm:text-base">
                Takes under a minute — no obligation. An advisor will reach out
                with program options that match your goals.
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
              {/* FAQ — shows first on mobile */}
              <div className="order-1 flex-1 lg:order-2">
                <h3 className="mb-4 font-heading text-base font-semibold text-uagc-navy lg:text-lg">
                  Common Questions
                </h3>
                <FAQSection
                  variant="accordion"
                  heading=""
                  items={showAllFaq ? [...CLOSING_FAQ_TOP5, ...CLOSING_FAQ_REMAINING] : CLOSING_FAQ_TOP5}
                  className="!bg-transparent !py-0 [&>div]:!px-0"
                />
                {!showAllFaq && CLOSING_FAQ_REMAINING.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllFaq(true)}
                    className="mt-4 text-sm font-semibold text-uagc-red underline underline-offset-2 hover:text-uagc-navy"
                  >
                    See all frequently asked questions
                  </button>
                )}
              </div>

              {/* Form */}
              <div className="order-2 w-full lg:order-1 lg:max-w-[520px]">
                <RFIForm
                  variant="full"
                  heading="Get Your Personalized Program Guide"
                  onSubmit={handleRfiSubmit}
                  initialValues={rfiPreFill}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <RFIStickyBar heroFormRef={heroRef} />

      {/* Quick View overlay */}
      <ProgramQuickView
        program={quickViewProgram}
        onClose={() => setQuickViewProgram(null)}
        onRequestInfo={handleProgramRfi}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/organic/homepage-v2`. Verify:
1. Hero renders with micro-form on desktop and mobile
2. Impact strip appears below hero
3. Competitive comparison shows table (desktop) / cards (mobile)
4. Program explorer shows — clicking a program opens Quick View panel
5. Cost estimator responds to input changes with live cost updates
6. Social proof section shows video thumbnails, badges, outcomes bar
7. Closing section has RFI form + FAQ side by side
8. Sticky bar appears on mobile after scrolling past hero

- [ ] **Step 3: Commit**

```bash
git add prototypes/src/app/organic/homepage-v2/page.tsx
git commit -m "feat: wire homepage-v2 with all v2 components — conversion architecture complete"
```

---

## Task 9: Polish and verify

- [ ] **Step 1: Run TypeScript type check**

```bash
cd prototypes && npx tsc --noEmit
```

Fix any type errors.

- [ ] **Step 2: Check mobile responsiveness**

Open browser DevTools, toggle device toolbar, test at:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (laptop)
- 1440px (desktop)

Verify no horizontal overflow, all touch targets are minimum 44px, and content is readable.

- [ ] **Step 3: Test conversion flow**

1. Fill out hero micro-form → verify it scrolls to #rfi and pre-fills name + area
2. Open a program Quick View → click "Request Info for This Program" → verify it closes panel, scrolls to #rfi, pre-fills area
3. Use cost estimator → click "Get Your Personalized Financial Plan" → verify it scrolls to #rfi
4. Submit the closing RFI form → verify redirect to thank-you page

- [ ] **Step 4: Fix any issues found in steps 1–3**

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: polish homepage-v2 — responsive fixes and conversion flow verification"
```
