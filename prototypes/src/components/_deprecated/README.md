# Deprecated Prototype Components

**Purpose:** Archived prototype components no longer imported by any active page route.

These are preserved for reference. **Do not import from this directory.**

## Moved Files

| Filename | Original Location | Reason Deprecated | Replaced By |
|----------|-------------------|-------------------|-------------|
| `HomeDifferentiatorSection.tsx` | `organic/` | Legacy homepage v1 module; superseded by consolidated path section | `HomeDifferentiatorPathSection.tsx` |
| `HomeMultiPathCTA.tsx` | `organic/` | Legacy homepage v1 closing CTA; folded into path section | `HomeDifferentiatorPathSection.tsx` (CTA-01 grid) |
| `HomeInterestGrid.tsx` | `organic/` | Legacy homepage v1 interest discovery | `InterestAreaGrid.tsx` (homepage-v2) |
| `HomeProgramPreview.tsx` | `organic/` | Legacy homepage v1 program preview cards | `ProgramExplorer` (PROG-01) |
| `HomeProgramExplorer.tsx` | `organic/` | Organic-specific explorer duplicate | `sections/ProgramExplorer.tsx` (PROG-01) |
| `HomeProgramFinderSection.tsx` | `organic/` | Legacy homepage v1 program finder | `ProgramExplorer` (PROG-01) |
| `HomeProgramsSection.tsx` | `organic/` | Legacy homepage v1 programs list | `ProgramExplorer` (PROG-01) |
| `HomePathSection.tsx` | `organic/` | Legacy homepage v1 path cards | `HomeDifferentiatorPathSection.tsx` |
| `HomeProudSection.tsx` | `organic/` | Legacy homepage v1 pride/affiliation band | `AccreditationBand.tsx` |
| `TopDegreesSection.tsx` | `organic/` | Deprecated hub module | Hub manifest stack (Areas of Study + PROG-01) |
| `ProgramCatalogSection.tsx` | `organic/` | Deprecated hub catalog | `ProgramExplorer` (PROG-01) |
| `DegreeFinderCTA.tsx` | `organic/` | Deprecated hub CTA | `HomeDifferentiatorPathSection.tsx` (show="cta") |
| `HubIntroSection.tsx` | `organic/` | Deprecated hub intro | `OrganicHomeHero` + `HomeDifferentiatorPathSection` |
| `HubClosingBand.tsx` | `organic/` | Deprecated hub closing RFI band | Header Request Info + FORM-05 sticky bar |
| `HubSecondaryPaths.tsx` | `organic/` | Deprecated hub secondary paths | `HomeDifferentiatorPathSection.tsx` |
| `HubTestimonialCarousel.tsx` | `organic/` | Deprecated hub testimonial carousel | `VideoTestimonialSection.tsx` (TRUST-01) |
| `OrganicHeroSection.tsx` | `organic/` | Superseded organic hero | `OrganicHomeHero.tsx` |
| `AccreditationSection.tsx` | `organic/` | Superseded accreditation block | `AccreditationBand.tsx` |
| `CompetitiveComparison.tsx` | `organic/` | Removed from homepage-v2 per spec | — (intentionally dropped) |
| `SocialProofLayer.tsx` | `organic/` | Orphaned; never wired to a route | `VideoTestimonialSection.tsx` + `FAQSection` |
| `BlogRelatedArticles.tsx` | `organic/` | Orphaned blog sidebar module | Inline related-articles in `BlogArticlePage.tsx` |
| `BenefitsSection.tsx` | `sections/` | Paid orphan; never imported by any page | `TuitionSection` / FIN-01 disclosure cards |
| `ContentBlock.tsx` | `sections/` | Paid orphan; never imported by any page | — |
| `ProgramCategoryCards.tsx` | `sections/` | Paid orphan; never imported by any page | `ProgramExplorer` (PROG-01) |
| `ProgramListingSection.tsx` | `sections/` | Paid orphan; never imported by any page | `ProgramExplorer` (PROG-01) |
