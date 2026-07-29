"use client";

import { Phone, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ADMISSION_SPECIALIST_IMAGE } from "@/lib/organic-blog-data";

interface BlogAdmissionCTAProps {
  className?: string;
}

export function BlogAdmissionCTA({ className }: BlogAdmissionCTAProps) {
  return (
    <section className={cn("bg-white py-14 sm:py-20", className)}>
      <ScrollReveal>
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl bg-uagc-teal">
            <div className="flex flex-col items-center lg:flex-row lg:items-center">
              {/* Portrait — shown first on mobile (image on top), right side on desktop */}
              <div className="flex shrink-0 items-center justify-center px-8 pt-8 sm:px-10 lg:order-2 lg:px-0 lg:pb-0 lg:pr-12 lg:pt-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ADMISSION_SPECIALIST_IMAGE}
                  alt="UAGC Admission Specialist"
                  width={200}
                  height={200}
                  className="size-40 rounded-2xl object-cover sm:size-44 lg:size-[200px]"
                />
              </div>

              {/* Content */}
              <div className="flex-1 px-8 py-8 sm:px-10 sm:py-12 lg:order-1 lg:py-14">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/50">
                  Personalized Admission Support
                </p>

                <h2
                  className="mt-2.5 font-['Fira_Sans',sans-serif] text-xl font-bold leading-snug text-white sm:text-[1.625rem]"
                  style={{ textWrap: "balance" }}
                >
                  Partner with Your Admission Specialist
                </h2>

                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/75">
                  The same dedicated advisor from your first question through
                  your first class — financial aid, course planning, and
                  everything in between. Evenings and weekends included.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+18667111700"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full bg-uagc-navy px-6 py-3 text-sm font-bold text-white",
                      "transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      "hover:bg-uagc-navy-dark active:scale-[0.97]",
                    )}
                    data-ga4-event="blog_admission_cta_click"
                    data-ga4-action="call"
                  >
                    <Phone className="size-4" aria-hidden />
                    Talk to a Specialist
                  </a>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white",
                      "transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      "hover:bg-white/10 active:scale-[0.97]",
                    )}
                    data-ga4-event="blog_admission_cta_click"
                    data-ga4-action="chat"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
