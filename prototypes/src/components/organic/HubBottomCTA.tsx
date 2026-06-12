"use client";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HubBottomCTA() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="next-steps"
      className="scroll-mt-20 bg-uagc-navy py-12 sm:py-16"
      aria-labelledby="hub-bottom-cta-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center reveal-section",
            isVisible && "is-visible",
          )}
        >
          <h2 id="hub-bottom-cta-heading" className="type-h3 text-white">
            Ready to Start Your Degree?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-uagc-navy-muted sm:text-base">
            Connect with an advisor, explore programs, or take the next step
            toward enrollment.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="?chat=default"
            className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-gold/40 hover:bg-white/10 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold sm:py-8"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/15 text-uagc-gold transition-[transform,background-color] duration-150 group-hover:scale-105 group-hover:bg-uagc-gold/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Chat with an Advisor
            </span>
            <span className="text-xs leading-relaxed text-uagc-navy-muted">
              Get instant answers online
            </span>
          </a>

          <a
            href="tel:+18667111700"
            className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-gold/40 hover:bg-white/10 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold sm:py-8"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/15 text-uagc-gold transition-[transform,background-color] duration-150 group-hover:scale-105 group-hover:bg-uagc-gold/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Call an Advisor
            </span>
            <span className="text-xs leading-relaxed text-uagc-navy-muted">
              +1 866 711 1700
            </span>
          </a>

          <a
            href="#rfi"
            className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-uagc-gold/30 bg-uagc-gold/8 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-gold/50 hover:bg-uagc-gold/14 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold sm:py-8"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-uagc-gold/20 text-uagc-gold transition-[transform,background-color] duration-150 group-hover:scale-105 group-hover:bg-uagc-gold/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Request Information
            </span>
            <span className="text-xs leading-relaxed text-uagc-navy-muted">
              We&apos;ll reach out to you
            </span>
          </a>

          <a
            href="https://cloud.mail.uagc.edu/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-11 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-uagc-red/30 bg-uagc-red/8 px-5 py-6 transition-[transform,border-color,background-color] duration-200 hover:border-uagc-red/50 hover:bg-uagc-red/14 active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-red sm:py-8"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-uagc-red/15 text-uagc-red transition-[transform,background-color] duration-150 group-hover:scale-105 group-hover:bg-uagc-red/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Apply Now
            </span>
            <span className="text-xs leading-relaxed text-uagc-navy-muted">
              $0 application fee
            </span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-uagc-navy-muted">
          <span>No obligation</span>
          <span aria-hidden className="size-1 rounded-full bg-uagc-accent" />
          <span>WSCUC Accredited</span>
          <span aria-hidden className="size-1 rounded-full bg-uagc-accent" />
          <span>Classes start every few weeks</span>
        </div>
      </div>
    </section>
  );
}
