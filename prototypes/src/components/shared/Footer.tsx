import { AssetImage } from "@/components/shared/AssetImage";
import Link from "next/link";

const WSCUC_ACCREDITATION =
  "The University of Arizona Global Campus is accredited by WASC Senior College and University Commission (WSCUC), 1080 Marina Village Parkway, Suite 500, Alameda, CA 94501, 510.748.9001, www.wscuc.org. WSCUC is an institutional accrediting body recognized by the U.S. Department of Education (ED) and the Council on Higher Education Accreditation (CHEA).";

const FOOTNOTES = [
  "Classes last 5 weeks for undergraduate programs, 6 weeks for graduate programs, and 9 weeks for doctoral capstone, planning and project classes.",
  "Certain degree programs may not be available in all states.",
  "The transferability of credits is subject to the University of Arizona Global Campus transfer credit policies and requires the submission of official transcripts.",
  "We are currently not accepting new enrollments in the state of North Carolina.",
] as const;

const LEGAL_LINKS = [
  { href: "https://www.uagc.edu/privacy-policy", label: "Privacy Policy" },
  { href: "https://www.uagc.edu/terms-and-conditions", label: "Terms and Conditions" },
  { href: "https://www.uagc.edu/sms-terms-conditions", label: "SMS Terms and Conditions" },
  { href: "https://www.uagc.edu/do-not-sell", label: "Do not sell my information." },
] as const;

const legalLinkClass =
  "text-(--color-uagc-navy) underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-uagc-navy)";

const bodyLinkClass =
  "font-medium text-(--color-uagc-navy) underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-uagc-navy)";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="mobile-sticky-offset bg-white text-(--color-uagc-gray) md:pb-0"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 py-8 sm:px-6 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10">
          <Link
            href="/"
            className="flex shrink-0 items-center justify-self-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-uagc-navy)"
            aria-label="University of Arizona Global Campus home"
          >
            <AssetImage
              src="/images/UAGC_logo.svg"
              alt="University of Arizona Global Campus"
              width={181}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          <div className="space-y-4 text-xs leading-relaxed sm:text-sm">
            <p>{WSCUC_ACCREDITATION}</p>

            <ul className="list-disc space-y-1.5 pl-4 marker:text-(--color-uagc-gray)/60">
              {FOOTNOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end md:text-right">
            <AssetImage
              src="/images/ua_horiz_rgb_4.svg"
              alt="The University of Arizona"
              width={160}
              height={38}
              style={{ width: "auto" }}
              className="h-9"
            />
            <p className="text-xs leading-relaxed sm:text-sm">
              We are affiliated with the{" "}
              <a
                href="https://www.arizona.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className={bodyLinkClass}
              >
                University of Arizona
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-100">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-2 px-4 py-4 text-xs leading-relaxed text-(--color-uagc-gray) sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            The University of Arizona Global Campus, 180 South Arizona Avenue,
            Suite #301 Chandler, AZ 85225
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {LEGAL_LINKS.map((item, index) => (
              <span key={item.href} className="inline-flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-(--color-uagc-gray)/40" aria-hidden>
                    |
                  </span>
                )}
                <a href={item.href} className={legalLinkClass}>
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
