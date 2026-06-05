"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("firstName");
  const area = searchParams.get("area");
  const confirmationId = searchParams.get("confirmationId") ?? "7717243";

  const headline = firstName
    ? `Congratulations ${firstName},`
    : "Congratulations —";

  return (
    <>
      <Header variant="full" hideRequestInfo />
      <main className="flex-1 pt-16 sm:pt-[72px] lg:pt-20">
        <section className="section-pad bg-[#faf9f7]">
          <div className="mx-auto w-full max-w-[720px] px-4 text-center sm:px-6">
            <p className="type-h1 text-uagc-navy">{headline}</p>
            <p className="type-h3 mt-2 text-uagc-navy">you&apos;ve taken the first step.</p>
            <p className="mt-6 text-sm leading-relaxed text-uagc-gray sm:text-base">
              Expect a call from an advisor to discuss your goals, transfer credits,
              and next steps in the application process.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://cloud.mail.uagc.edu/apply"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-uagc-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#8a0418]"
              >
                Start Application
              </a>
              <Link
                href="/organic/online-degrees"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-uagc-navy px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy"
              >
                Program Information
              </Link>
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="mx-auto w-full max-w-[560px] rounded-2xl border border-uagc-border bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-uagc-navy">You&apos;re all set</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-uagc-border pb-3">
                <dt className="text-uagc-gray">Reference</dt>
                <dd className="font-semibold text-uagc-navy">#{confirmationId}</dd>
              </div>
              {area ? (
                <div className="flex justify-between gap-4 border-b border-uagc-border pb-3">
                  <dt className="text-uagc-gray">Area of interest</dt>
                  <dd className="font-semibold text-uagc-navy">{area}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-uagc-gray">Next step</dt>
                <dd className="mt-1 font-medium text-uagc-navy">
                  An advisor will contact you within 1 business day.
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function OrganicThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
