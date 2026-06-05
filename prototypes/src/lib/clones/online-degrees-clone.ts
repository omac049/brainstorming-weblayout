/**
 * Live online-degrees hub clone source — synced from
 * brainstorming-weblayout/design-system/clones/online-degrees-clone.json
 * via `.cursor/skills/clone` (extract-clone.mjs).
 *
 * Re-run: node .cursor/skills/clone/scripts/extract-clone.mjs \
 *   "https://www.uagc.edu/online-degrees/" --slug online-degrees \
 *   --out design-system/clones/online-degrees-clone.json
 */

export const ONLINE_DEGREES_CLONE = {
  sourceUrl: "https://www.uagc.edu/online-degrees/",
  slug: "online-degrees",
  extractedAt: "2026-06-02T23:21:19.336Z",
  title: "Online Degrees: Accredited & Flexible Programs | UAGC",
  hero: {
    eyebrow: "Find the Program That's Right for You",
    headline: "Online Degrees",
    subheadline:
      "Study something you love in an environment designed for busy adults.",
    hasEmbeddedRfi: true,
    images: {
      desktop:
        "https://www.uagc.edu/sites/default/files/styles/paid_hero_header_899x600/public/Aaron-Adkins-Pic_crop.jpg.webp?h=b69e0e0e&itok=YyZZjxAE",
      mobile:
        "https://www.uagc.edu/sites/default/files/styles/paid_hero_mobile_image_768x512/public/Aaron-Adkins-Pic_crop.jpg.webp?h=b69e0e0e&itok=sdpSAz6F",
      alt: "UAGC graduate posing",
    },
  },
  breadcrumb: [
    { label: "Home", href: "https://www.uagc.edu/" },
    { label: "Online Degrees", href: "https://www.uagc.edu/online-degrees/" },
  ],
  sectionNav: [
    { id: "top-degrees", label: "Top Degrees" },
    { id: "programs", label: "Programs" },
    { id: "degree-finder", label: "Degree Finder" },
    { id: "stories", label: "Stories" },
    { id: "journey", label: "Journey" },
    { id: "faq", label: "FAQ" },
  ],
} as const;
