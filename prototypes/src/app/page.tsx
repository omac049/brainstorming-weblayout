import Link from "next/link";

import { assetPath } from "@/lib/asset-path";

/* ─── Prototype pages (Next.js routes) ─── */
const prototypes = [
  {
    slug: "organic/homepage",
    title: "Homepage (Organic)",
    description:
      "Conversion architecture homepage — hero trust pills, cost estimator, program explorer with start dates, interest grid, closing RFI + FAQ. Sticky bar after scroll.",
    tag: "Organic · Primary",
  },
  {
    slug: "organic/online-degrees",
    title: "Online Degrees Hub (Organic)",
    description:
      "Organic gold standard hub — discovery-first layout, Top 3 cards, filterable catalog (6 + Show All), consolidated hero RFI + sticky bar. Live /online-degrees/ baseline.",
    tag: "Organic · Hub",
  },
  {
    slug: "organic/blog/what-difference-between-phd-and-doctorate",
    title: "Blog Article Template (Organic)",
    description:
      "Top blog post — PhD vs DPS comparison sidebar (replaces aggressive RFI), FAQ accordion, contextual in-content DPS CTA. Research-stage conversion strategy.",
    tag: "Organic · Blog",
  },
  {
    slug: "organic/request-information/thank-you",
    title: "Thank You (Organic)",
    description:
      "Post-RFI confirmation page — confetti celebration, advisor team intro, countdown to next start, tuition info, and testimonials.",
    tag: "Organic · Thank You",
  },
  {
    slug: "request-info-v5",
    title: "Request Info (v5)",
    description:
      "Primary paid landing page — form-forward, 53% bounce, 3% conv. Our #1 optimization target.",
    tag: "Paid · Primary",
  },
  {
    slug: "degree-programs-v7",
    title: "Degree Programs (v7)",
    description:
      "Best-performing template — 13.57% conv. Rich content with outcomes, testimonials, trust elements.",
    tag: "Paid · High Performer",
  },
  {
    slug: "online-college-courses-v5",
    title: "Online College Courses (v5)",
    description:
      "Lean OCC landing page (~10 modules) — skepticism buster, programs grid, flexible online learning narrative.",
    tag: "Paid · Course Variant",
  },
];

/* ─── Presentation decks (static HTML, copied into /decks/ at build) ─── */
const decks = [
  {
    path: "/decks/index-v2.html",
    title: "ELT Deck (v2)",
    description:
      "Executive leadership cut — visual audit findings, layout-score comparisons, and optimization roadmap.",
    tag: "Executive",
  },
  {
    path: "/decks/index.html",
    title: "Full Deck (~20 slides)",
    description:
      "Long-form presentation with detailed pulls from audit data, competitor patterns, and module catalog.",
    tag: "Deep Dive",
  },
  {
    path: "/decks/presenter.html",
    title: "Presenter Notes",
    description:
      "Keyboard-synced speaker companion — talking points aligned to the v2 deck slide order.",
    tag: "Speaker Aid",
  },
  {
    path: "/decks/project-plan.html",
    title: "Project Plan",
    description:
      "Phase timeline, milestones, and deliverable tracker for the Groundwork initiative.",
    tag: "Planning",
  },
];

/* ─── Audit & research pages (static HTML in /output/playwright/screenshots/) ─── */
const auditPages = [
  {
    path: "/output/playwright/screenshots/index.html",
    title: "Audit Hub",
    description:
      "Master dashboard — desktop/mobile screenshot pairs, layout scores, and page metrics across the full URL set.",
    tag: "Hub",
  },
  {
    path: "/output/playwright/screenshots/1-1-screenshots.html",
    title: "1.1 — Full-Page Screenshots",
    description:
      "Side-by-side desktop (1440) and mobile (375) captures of every audited page with component labels.",
    tag: "Task 1.1",
  },
  {
    path: "/output/playwright/screenshots/1-2-rfi-audit.html",
    title: "1.2 — RFI Form Audit",
    description:
      "Request-for-information form placement, field count, sticky behavior, and mobile ergonomics across paid + organic.",
    tag: "Task 1.2",
  },
  {
    path: "/output/playwright/screenshots/1-3-chat-widget.html",
    title: "1.3 — Chat Widget Review",
    description:
      "Chat and live-support widget positioning, overlap issues, and mobile viewport analysis.",
    tag: "Task 1.3",
  },
  {
    path: "/output/playwright/screenshots/1-4-comparison.html",
    title: "1.4 — Competitive Comparison",
    description:
      "Layout patterns benchmarked against SNHU, WGU, Purdue Global, and other online-degree competitors.",
    tag: "Task 1.4",
  },
  {
    path: "/output/playwright/screenshots/1-5-contentsquare.html",
    title: "1.5 — Contentsquare Heatmaps",
    description:
      "Heatmap, scroll-depth, and attention data from Contentsquare — desktop and mobile visual evidence.",
    tag: "Task 1.5",
  },
  {
    path: "/output/playwright/screenshots/1-6-external-validation.html",
    title: "1.6 — External Validation",
    description:
      "Third-party benchmark data, industry citations, and supporting evidence for audit claims.",
    tag: "Task 1.6",
  },
  {
    path: "/output/playwright/screenshots/layout-builder.html",
    title: "Layout Score Builder",
    description:
      "Interactive scoring tool — rate pages against the 26-module UI catalog with mobile-first weighting.",
    tag: "Tool",
  },
];

/* ─── Section component ─── */
function Section({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16 last:mb-0">
      <div className="mb-6">
        <div className={`mb-3 h-0.5 w-8 ${accent}`} />
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-white/50">{subtitle}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

/* ─── Card for Next.js prototype routes ─── */
function PrototypeCard({
  slug,
  title,
  description,
  tag,
}: (typeof prototypes)[number]) {
  return (
    <Link
      href={`/${slug}`}
      className="group rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition-[border-color,background-color] hover:border-uagc-navy/40 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white transition-colors group-hover:text-uagc-sky sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            {description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-uagc-sky/10 px-2.5 py-0.5 text-[11px] font-medium text-uagc-navy">
          {tag}
        </span>
      </div>
      <div className="mt-3 text-xs text-white/30 font-mono">/{slug}</div>
    </Link>
  );
}

/* ─── Card for static HTML pages (decks, audit) ─── */
function StaticCard({
  path,
  title,
  description,
  tag,
}: {
  path: string;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <a
      href={assetPath(path)}
      className="group rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition-[border-color,background-color] hover:border-uagc-navy/40 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white transition-colors group-hover:text-uagc-sky sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            {description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
          {tag}
        </span>
      </div>
    </a>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-uagc-navy px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl">
        {/* ── Header ── */}
        <header className="mb-14 text-center">
          <div className="mb-4 mx-auto h-1 w-12 bg-uagc-navy" />
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Project Groundwork
          </h1>
          <p className="mt-3 text-base text-white/60 max-w-xl mx-auto">
            UAGC page prototypes, audit research, and presentation decks —
            layout and UX redesign for paid + organic templates.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs text-white/40">
            <span className="rounded-full border border-white/10 px-3 py-1">
              {prototypes.length} Prototypes
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              {decks.length} Decks
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              {auditPages.length} Audit Pages
            </span>
          </div>
        </header>

        {/* ── Prototypes ── */}
        <Section
          title="Page Prototypes"
          subtitle="Interactive Next.js pages — organic and paid landing templates with modular components"
          accent="bg-uagc-navy"
        >
          {prototypes.map((p) => (
            <PrototypeCard key={p.slug} {...p} />
          ))}
        </Section>

        {/* ── Decks ── */}
        <Section
          title="Presentations"
          subtitle="Slide decks and speaker notes for stakeholder reviews"
          accent="bg-uagc-red"
        >
          {decks.map((d) => (
            <StaticCard key={d.path} {...d} />
          ))}
        </Section>

        {/* ── Audit Pages ── */}
        <Section
          title="Audit & Research"
          subtitle="Phase 1 screenshot audits, heatmaps, competitive analysis, and the layout scoring tool"
          accent="bg-sky-400"
        >
          {auditPages.map((a) => (
            <StaticCard key={a.path} {...a} />
          ))}
        </Section>

        {/* ── Footer note ── */}
        <footer className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/30">
            Auto-deploys on push to main &middot; GitHub Pages &middot;{" "}
            <a
              href="https://github.com/omac049/brainstorming-weblayout"
              className="underline decoration-white/20 hover:text-white/50 transition-colors"
            >
              omac049/brainstorming-weblayout
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
