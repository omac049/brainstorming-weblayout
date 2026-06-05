/**
 * Live homepage clone source — synced from uagc.edu/
 * Re-run: node .cursor/skills/clone/scripts/extract-clone.mjs \
 *   "https://www.uagc.edu/" --slug homepage \
 *   --out design-system/clones/homepage-clone.json
 */

/** Live organic homepage hero — "proud to be uagc" block on uagc.edu/ */
export const HOME_HERO = {
  /** Hero eyebrow */
  eyebrow: "proud to be uagc",
  /** Hero h1 */
  headline: "50+ Programs. 100% Online.",
  /** Hero subhead */
  subheadline:
    "The University of Arizona Global Campus is proud to offer over 50 associate, bachelor's, master's, and doctoral degree programs with accelerated online classes designed to help you gain the skills you need.",
  images: {
    /** Live homepage hero — graduation ceremony crowd shot */
    desktop: "/images/homepage-hero-proud.webp",
    mobile: "/images/homepage-hero-proud.webp",
    alt: "UAGC graduates at commencement ceremony",
  },
} as const;

export const HOMEPAGE_CLONE = {
  sourceUrl: "https://www.uagc.edu/",
  slug: "homepage",
  extractedAt: "2026-06-02T23:23:00.000Z",
  title: "Accredited Online College | UAGC",
  hero: HOME_HERO,
  sectionNav: [
    { id: "why-uagc", label: "Why UAGC" },
    { id: "stories", label: "Stories" },
    { id: "degree-path", label: "How We're Different" },
    { id: "programs", label: "Programs" },
    { id: "ways-to-save", label: "Ways to Save" },
    { id: "faq", label: "FAQ" },
    { id: "rfi", label: "Request Info" },
  ],
} as const;
