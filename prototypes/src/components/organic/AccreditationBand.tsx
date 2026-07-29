"use client";

import { AssetImage } from "@/components/shared/AssetImage";
import Link from "next/link";

import {
  Building2,
  GraduationCap,
  Handshake,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WSCUC_HIGHLIGHTS = [
  "Rigorous Academic Standards",
  "Student Learning Outcomes",
  "Institutional Integrity",
  "Continuous Improvement",
  "Quality Assurance",
];

const PROGRAMMATIC_ACCREDITATIONS = [
  {
    name: "IACBE",
    fullName: "International Accreditation Council for Business Education",
    label: "Business Programs",
    src: "/images/iacbe_logo.jpg",
    programs: ["MBA", "Business Administration", "Accounting", "Management"],
  },
  {
    name: "CCNE",
    fullName: "Commission on Collegiate Nursing Education",
    label: "Nursing Programs",
    src: "/images/CCNE-accredited-square_0.jpg",
    programs: ["BSN", "MSN", "RN-to-BSN"],
  },
  {
    name: "CAHIIM",
    fullName:
      "Commission on Accreditation for Health Informatics and Information Management Education",
    label: "Health Informatics",
    src: "/images/cahiim-accredited-logo-square.jpg",
    programs: ["MS Health Informatics"],
  },
];

export function AccreditationBand() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="section-pad bg-uagc-surface"
      aria-labelledby="home-accr-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={cn("mb-8 sm:mb-10 lg:mb-12 reveal-section", isVisible && "is-visible")}>
          <span aria-hidden className="mb-3 accent-bar" />
          <h2 id="home-accr-heading" className="type-h2 text-uagc-navy">
            Accreditation That
            <br className="hidden sm:block" /> Employers Trust
          </h2>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            UAGC holds regional accreditation from WSCUC — one of the most
            respected accrediting bodies in the United States. Your degree
            meets the same rigorous standards that employers evaluate when
            hiring, promoting, and approving tuition reimbursement.
          </p>
        </div>

        {/* ── WSCUC Showcase — navy panel with gold-framed badge ── */}
        <div className="rounded-2xl bg-uagc-navy p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
            <div className="mb-6 shrink-0 sm:mb-0">
              <div className="rounded-xl border-2 border-uagc-navy/40 p-1.5">
                <AssetImage
                  src="/images/WSCUC-Logo-Square.jpg"
                  alt="WSCUC — Institutional Accreditation"
                  width={112}
                  height={112}
                  className="size-24 rounded-lg sm:size-28"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Shield
                  className="size-4 text-uagc-sky"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-xs font-bold uppercase tracking-widest text-uagc-red">
                  Institutional Accreditation
                </span>
              </div>
              <p className="mt-3 text-xl font-bold text-white sm:text-2xl">
                WASC Senior College and University Commission
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white">
                WSCUC is one of the most respected regional accrediting bodies
                in the United States, ensuring rigorous standards for academic
                quality, student learning, and institutional integrity.
              </p>

              <div className="mt-6 border-t border-white/20 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-uagc-beige">
                  WSCUC Standards of Excellence
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:justify-start">
                  {WSCUC_HIGHLIGHTS.map((item, i) => (
                    <span key={item} className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {item}
                      </span>
                      {i < WSCUC_HIGHLIGHTS.length - 1 && (
                        <span className="text-white/40" aria-hidden>
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Programmatic Accreditations — substantial cards ── */}
        <div className="mt-6 sm:mt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-uagc-gray">
            Programmatic Accreditations
          </p>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {PROGRAMMATIC_ACCREDITATIONS.map((accr) => (
              <div
                key={accr.name}
                className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <AssetImage
                    src={accr.src}
                    alt={`${accr.name} — ${accr.label}`}
                    width={72}
                    height={72}
                    className="size-16 shrink-0 rounded-lg sm:size-[72px]"
                  />
                  <div>
                    <p className="text-lg font-bold text-uagc-navy">
                      {accr.name}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-uagc-gray">
                      {accr.label}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-uagc-gray">
                  {accr.fullName}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {accr.programs.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-gray-200 bg-uagc-surface px-2.5 py-0.5 text-xs font-medium text-uagc-navy"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats Strip — compact horizontal bar ── */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-2.5">
            <Handshake
              className="size-5 shrink-0 text-uagc-navy"
              strokeWidth={1.75}
              aria-hidden
            />
            <p className="text-sm text-uagc-navy">
              <span className="font-bold">98,000+</span> employers on Handshake
            </p>
          </div>
          <span
            className="hidden h-4 w-px bg-gray-200 sm:block"
            aria-hidden
          />
          <div className="flex items-center gap-2.5">
            <Building2
              className="size-5 shrink-0 text-uagc-navy"
              strokeWidth={1.75}
              aria-hidden
            />
            <p className="text-sm text-uagc-navy">
              <span className="font-bold">1,500+</span> employer partners
            </p>
          </div>
          <span
            className="hidden h-4 w-px bg-gray-200 sm:block"
            aria-hidden
          />
          <div className="flex items-center gap-2.5">
            <GraduationCap
              className="size-5 shrink-0 text-uagc-navy"
              strokeWidth={1.75}
              aria-hidden
            />
            <p className="text-sm text-uagc-navy">
              Lifetime career services for all graduates and alumni
            </p>
          </div>
        </div>

        {/* ── UA Enterprise Callout ── */}
        <div className="mt-6 flex items-start gap-4 rounded-lg border border-uagc-navy/40 bg-uagc-sky/10 px-5 py-5 sm:mt-8 sm:items-center sm:gap-5 sm:px-6">
          <AssetImage
            src="/images/ua_horiz_rgb_4.svg"
            alt="University of Arizona"
            width={160}
            height={48}
            style={{ width: "auto" }}
            className="mt-0.5 h-10 shrink-0 sm:mt-0 sm:h-12"
          />
          <p className="text-[0.8125rem] leading-relaxed text-uagc-navy sm:text-sm">
            <span className="font-semibold">
              Part of the University of Arizona
            </span>{" "}
            — a public R1 research institution with 150+ years of academic
            excellence. Same commitment to quality, built for online learners.
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="https://www.uagc.edu/about/accreditations"
            className="inline-block py-3 text-sm font-semibold text-uagc-navy underline-offset-2 hover:underline"
          >
            Learn more about our accreditations →
          </Link>
        </div>
      </div>
    </section>
  );
}
