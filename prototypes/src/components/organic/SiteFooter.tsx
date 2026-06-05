import { Phone, MessageCircle, Mail } from "lucide-react";

const DEGREE_AREAS = [
  { label: "Business", href: "https://www.uagc.edu/online-degrees/business" },
  { label: "Education", href: "https://www.uagc.edu/online-degrees/education" },
  { label: "Information Technology", href: "https://www.uagc.edu/online-degrees/information-technology" },
  { label: "Social & Behavioral Science", href: "https://www.uagc.edu/online-degrees/social-behavioral-science" },
  { label: "Criminal Justice", href: "https://www.uagc.edu/online-degrees/criminal-justice" },
  { label: "Health Care", href: "https://www.uagc.edu/online-degrees/health-care" },
  { label: "Liberal Arts", href: "https://www.uagc.edu/online-degrees/liberal-arts" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "https://www.uagc.edu/terms-and-conditions" },
  { label: "SMS Terms", href: "https://www.uagc.edu/sms-terms-conditions" },
  { label: "Privacy Policy", href: "https://www.uagc.edu/privacy-policy" },
  { label: "Cookie Policy", href: "https://www.uagc.edu/cookie-policy" },
  { label: "State Authorization", href: "https://www.uagc.edu/about/state-authorization-disclosures" },
  { label: "Drug Free Schools", href: "https://www.uagc.edu/about/student-consumer-information/drug-free-schools-report" },
  { label: "Accessibility", href: "https://www.uagc.edu/accessibility-statement" },
] as const;

const NONDISCRIMINATION =
  "The University of Arizona Global Campus does not discriminate in its education programs and activities on the basis of race, color, creed, national or ethnic origin, religion, sex, pregnancy, childbirth and related medical conditions, marital status, medical condition, genetic information, service in the uniformed services, political activities and affiliations, age, disability, sexual orientation, gender identity, veteran status, or any other consideration made unlawful by federal, state, or local laws.";

const PHONE_DISPLAY = "+1 866 711 1700";
const PHONE_HREF = "tel:+18667111700";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold/60 focus-visible:rounded-sm";

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="bg-uagc-navy">
      {/* ── Top: Contact + affiliation ── */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-white/70">
              Part of the{" "}
              <a
                href="https://www.arizona.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block py-2 font-semibold text-white underline underline-offset-2 decoration-white/30 transition-colors hover:decoration-white ${focusRing}`}
              >
                University of Arizona
              </a>{" "}
              enterprise
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-white/45">
              Accredited by WASC Senior College and University Commission
              (WSCUC), recognized by the U.S. Department of Education.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#rfi"
              className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-uagc-gold px-6 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-colors hover:bg-[#f5a623] ${focusRing}`}
            >
              Request Info
              <Mail className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
            </a>
            <a
              href={PHONE_HREF}
              className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-4 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white ${focusRing}`}
            >
              <Phone className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-4 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white ${focusRing}`}
            >
              <MessageCircle className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
              Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* ── Degree areas — flat row ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-10">
          <nav aria-label="Degree Programs" className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <span className="mr-1 py-3 text-xs font-bold uppercase tracking-[0.12em] text-uagc-gold">
              Degrees
            </span>
            {DEGREE_AREAS.map((area, i) => (
              <span key={area.label} className="flex items-center gap-2">
                <a
                  href={area.href}
                  className={`py-3 text-[13px] text-white/70 transition-colors hover:text-white hover:underline underline-offset-2 ${focusRing}`}
                >
                  {area.label}
                </a>
                {i < DEGREE_AREAS.length - 1 && (
                  <span className="text-white/20" aria-hidden>&middot;</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Legal baseline ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-3 gap-y-0">
              {LEGAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`py-3 text-xs text-white/40 transition-colors hover:text-white/70 hover:underline underline-offset-2 ${focusRing}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="shrink-0 text-xs text-white/40">
              &copy;{new Date().getFullYear()} The University of Arizona Global
              Campus
            </p>
          </div>

          <details className="mt-4 group">
            <summary
              className={`cursor-pointer text-xs font-medium text-white/40 transition-colors hover:text-white/60 ${focusRing}`}
            >
              Nondiscrimination Policy
            </summary>
            <p className="mt-2 max-w-5xl text-xs leading-relaxed text-white/35">
              {NONDISCRIMINATION}
            </p>
          </details>

          <p className="mt-2 text-xs text-white/30">
            180 South Arizona Avenue, Suite #301, Chandler, AZ 85225
          </p>
        </div>
      </div>
    </footer>
  );
}
