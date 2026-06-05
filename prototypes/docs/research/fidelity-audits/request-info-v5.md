# Fidelity Audit: request-info-v5

**Audited:** 2026-05-27  
**Original:** https://www.uagc.edu/success/request-info-v5  
**Clone:** `/request-info-v5` in uagc-prototypes  

## Critical Issues

### 1. Wrong Heading Font

**What's wrong:** All headings use Fira Sans (body font).  
**What original uses:** `UAGC-Montserrat, sans-serif` — a custom Montserrat variant self-hosted from `/themes/uagc/dist/`.  
**Fix:** Add Montserrat via `next/font/google` as a close substitute or download the actual UAGC-Montserrat woff2 files. Update `--font-heading` in `globals.css`.

### 2. Wrong Heading Weight & Size

**What's wrong:** Clone uses `font-bold` (700) across the board.  
**What original uses:** Most headings are `font-weight: 500` (medium). Hero H1 is 22.5px/500. Section H2s range 27–32px/500–600.  
**Fix:** Replace `font-bold` with `font-medium` on headings. Use exact pixel sizes via Tailwind arbitrary values: `text-[22.5px]`, `text-[27px]`.

### 3. Wrong Iconography (Lucide vs icomoon)

**What's wrong:** ValuePropsSection uses Lucide icons (`GraduationCap`, `Calendar`, `DollarSign`). Bullet checkmarks use Lucide `Check` with `strokeWidth={3}`.  
**What original uses:** The `icomoon` custom icon font renders filled, solid-weight glyphs via CSS `::before` pseudo-elements. The visual language is completely different — solid fills vs thin outlines.  
**Fix:** Either (a) download and integrate icomoon font, or (b) create custom SVG components that match the visual weight and style of the icomoon glyphs. The highlight cards on the original use specific custom SVG illustrations, not generic icon-library icons.

### 4. Missing Section: "Make an Investment in You"

**What's wrong:** This entire section is absent from the clone.  
**What original has:**
- H2: "Make an Investment in You"
- Body: "Education is an investment that can pay dividends for the rest of your life..."
- Sub-sections:
  - **Tuition** — paragraph + "View Program Cost" link
  - **Ways to Save** — 4 link buttons (Grants, Scholarships, Military Benefits, Employer Savings)
  - **UAGC Promise: 3 Week Trial** — description + 3 icon cards:
    1. "Attend for 3 Weeks Risk Free" (icon-uagc-promise.svg)
    2. "Start School with No Financial Burden" (No-Burden-Icon.svg)
    3. "Flexibility to Find Your Fit" (icon-flexible-your-own-pace_1.svg)

### 5. "Explore our accredited degree programs" — Wrong Form Variant

**What's wrong:** Clone uses a custom "inline" RFI form variant (likely just dropdowns with no full form).  
**What original has:** The section heading + description ("Choose your state, degree level and area of interest...") followed by the **same full RFI form** as the mid-page version (all fields: name, phone, email, state, area, degree, military, TCPA).  
**Fix:** Replace `<RFIForm variant="inline" />` with `<RFIForm variant="full" />` in a white background container.

### 6. Mid-page RFI Heading Mismatch

**What's wrong:** Clone has no heading text inside the mid-page RFI (navy band).  
**What original has:** H2 "Request Information About Our Degrees" above the form in the navy band.  
**Fix:** Add heading text to the RFIForm full variant or place it above the component.

### 7. Footer Missing WSCUC Logo & Layout

**What's wrong:** Footer is a simplified 3-column layout without the WSCUC accreditation logo.  
**What original has:**
- WSCUC-Logo.png on the left with accreditation text block
- UA horizontal logo + "We are affiliated with" on the right
- Footnotes below (numbered: class lengths, state availability, transfer credits, NC enrollment)
- Legal bar: address | Privacy Policy | Terms | SMS Terms | Do not sell

### 8. Header Height

**What's wrong:** Clone header is 56–64px (h-14 / sm:h-16).  
**What original uses:** 96px height.  
**Fix:** Change to `h-24` or `h-[96px]`.

### 9. Testimonial Section Differences

**What's wrong:** Clone has `TestimonialSection` with heading "Our Students are Going Places".  
**Verify:** The original has this as a simple blockquote with attribution, no heading visible, no carousel. Confirm exact treatment via browser inspection.

## Section Order (from crawled content)

1. Header (fixed, 96px)
2. Hero — H1 "Discover Online School Done Right" + hero image + mini RFI
3. "Step into Your Future" — content block + "Learn More" CTA
4. "Reasons to Choose UAGC" — 3 highlight cards + 7 bullet points
5. "Request Information About Our Degrees" — navy band + full RFI
6. "Explore our accredited degree programs" — white bg + intro text + full RFI
7. "Request More Information" — another RFI instance (may be same as #5, conditional display)
8. "The Benefits of a Global Campus Degree" — content + image
9. Testimonial blockquote (Sheena Smith)
10. "Make an Investment in You" — intro + Tuition + Ways to Save + UAGC Promise
11. Bottom RFI (in form band)
12. "Interested in Learning More About Our Degrees?" — CTA banner + "Get Started Now" button
13. Footer (WSCUC + UA + footnotes + legal)

## Priority Fix Order

1. Add UAGC-Montserrat font → update all headings
2. Replace Lucide icons with correct icomoon/SVG equivalents
3. Add "Make an Investment in You" section with all sub-sections
4. Fix "Explore our accredited degree programs" form variant
5. Fix header height (96px)
6. Fix footer (add WSCUC, correct layout)
7. Adjust all font-weight values (bold → medium where needed)
8. Adjust font-size values to exact computed pixels
9. Visual QA pass at 1440px and 390px
