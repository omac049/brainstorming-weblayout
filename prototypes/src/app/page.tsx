import Link from "next/link";

const pages = [
  {
    slug: "organic/homepage",
    title: "Homepage (Organic)",
    description:
      "Wayfinding-first homepage — hero pathing CTAs, interest grid, single mid-page RFI, sticky bar after scroll. Fixes low scroll-depth pattern from Phase 1 audit.",
    tag: "Organic · New",
  },
  {
    slug: "organic/homepage-v2",
    title: "Homepage v2 (Conversion Architecture)",
    description:
      "Reimagined homepage — micro-RFI hero, competitive comparison strip, interactive cost estimator, multi-CTA placement. ~7 sections vs 13. Targets bounce, RFI conversion, and competitive differentiation.",
    tag: "Organic · v2",
  },
  {
    slug: "organic/online-degrees",
    title: "Online Degrees Hub (Organic)",
    description:
      "Organic gold standard hub — discovery-first layout, Top 3 cards, filterable catalog (6 + Show All), consolidated hero RFI + sticky bar. Live /online-degrees/ baseline.",
    tag: "Organic · Hub",
  },
  {
    slug: "request-info-v5",
    title: "Request Info (v5)",
    description: "Primary paid landing page — form-forward, 53% bounce, 3% conv. Our #1 optimization target.",
    tag: "Primary Template",
  },
  {
    slug: "degree-programs-v7",
    title: "Degree Programs (v7)",
    description: "Best-performing template — 13.57% conv. Rich content with outcomes, testimonials, trust elements.",
    tag: "High Performer",
  },
  {
    slug: "online-college-courses-v5",
    title: "Online College Courses (v5)",
    description: "Course-focused v5 landing page — programs grid, flexible online learning narrative.",
    tag: "Course Variant",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-uagc-navy px-4 py-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 h-1 w-12 mx-auto bg-[#AB0520]" />
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            UAGC Page Prototypes
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Cloned pages with modular components — ready for optimization testing
          </p>
        </div>

        <div className="grid gap-6">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-uagc-red/50 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-uagc-red transition-colors">
                    {page.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    {page.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-uagc-red/20 px-3 py-1 text-xs font-medium text-uagc-red">
                  {page.tag}
                </span>
              </div>
              <div className="mt-4 text-sm text-white/40">
                /{page.slug} →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6 text-center">
          <h3 className="text-lg font-medium text-white/80">Modular Component Library</h3>
          <p className="mt-2 text-sm text-white/50">
            Header, Footer, RFI Form (mini/full/inline), Hero Section, Value Props,
            Tuition Section, Content Block — all shared across pages and ready to remix.
          </p>
        </div>
      </div>
    </main>
  );
}
