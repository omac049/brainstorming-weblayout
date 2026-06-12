"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_VIDEO_TESTIMONIALS } from "@/lib/organic-homepage-data";
import { FAQSection, type SimpleFAQItem } from "@/components/sections/FAQSection";

const CURATED_VIDEOS = HOME_VIDEO_TESTIMONIALS.slice(0, 3);

const PROOF_FAQS: SimpleFAQItem[] = [
  {
    question: "Are online degrees respected by employers?",
    answer:
      "UAGC partners with 1,500+ employers including T-Mobile, Walgreens, and USPS. Graduates receive lifetime career services through Handshake's 98,000+ employer network. Your transcript and diploma carry full WSCUC accreditation — employers evaluate the credential and your skills, not the delivery format.",
  },
  {
    question: "Is UAGC accredited?",
    answer:
      "Yes. UAGC holds regional accreditation from WSCUC (WASC Senior College and University Commission), recognized by the U.S. Department of Education. Business programs hold IACBE accreditation and nursing programs hold CCNE accreditation. UAGC is also part of the University of Arizona — a public R1 research institution.",
  },
];

const BADGES = [
  { name: "WSCUC", label: "WSCUC Accredited" },
  { name: "UA", label: "University of Arizona" },
  { name: "IACBE", label: "IACBE Accredited" },
  { name: "CCNE", label: "CCNE Accredited" },
];

const NEWS_ITEMS = [
  {
    tag: "Rankings",
    date: "May 6, 2024",
    title: "UAGC Achieves Top 3 Ranking for Online Bachelor of Arts in Business Information Systems",
  },
  {
    tag: "Faculty",
    date: "April 15, 2024",
    title: "College of Professional Advancement Professor Wins International Teaching Excellence Award",
  },
  {
    tag: "Excellence",
    date: "March 18, 2024",
    title: "UAGC Celebrates Four Constellation Textbooks at 2024 Academic Authors Association Awards",
  },
];

const OUTCOMES = [
  { stat: "1,500+", label: "Employer Partners" },
  { stat: "98,000+", label: "Employers on Handshake" },
  { stat: "Lifetime", label: "Career Services" },
];

function VideoLightbox({
  videoUrl,
  onClose,
}: {
  videoUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-3xl px-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-4 text-white hover:text-uagc-gold"
          aria-label="Close video"
        >
          <X className="size-6" />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={videoUrl}
            className="size-full"
            allow="autoplay; fullscreen"
            title="Student testimonial video"
          />
        </div>
      </div>
    </div>
  );
}

export interface SocialProofLayerProps {
  id?: string;
  className?: string;
}

export function SocialProofLayer({
  id = "social-proof",
  className,
}: SocialProofLayerProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div id={id} className={cn("scroll-mt-28 lg:scroll-mt-36", className)}>
      <section className="section-pad bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span aria-hidden className="mb-3 accent-bar" />
            <h2 className="type-h2 text-uagc-navy">Hear From Students Like You</h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-none lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {CURATED_VIDEOS.map((video) => (
              <button
                key={video.name}
                type="button"
                onClick={() => setActiveVideo(`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`)}
                className="motion-hover-lift group relative min-w-[280px] cursor-pointer overflow-hidden rounded-xl bg-uagc-surface lg:min-w-0"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnailUrl}
                    alt={`${video.name} testimonial`}
                    fill
                    sizes="(max-width: 1024px) 280px, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-uagc-navy shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-1 size-6" fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="p-4 text-left">
                  <p className="font-heading text-sm font-semibold text-uagc-navy">
                    {video.name}
                  </p>
                  <p className="text-xs text-uagc-gray">{video.credential}</p>
                  {video.quote && (
                    <p className="mt-2 line-clamp-2 text-xs italic leading-relaxed text-uagc-gray/80">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {BADGES.map((badge) => (
              <div
                key={badge.name}
                className="flex size-16 items-center justify-center rounded-full bg-uagc-surface text-xs font-bold text-uagc-navy sm:size-20"
                aria-label={badge.label}
                title={badge.label}
              >
                {badge.name}
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-medium text-uagc-navy">
            Part of the University of Arizona — a top-ranked public R1 research
            university
          </p>
        </div>
      </section>

      <section className="border-t border-uagc-border bg-white py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-uagc-gray/50">
            UAGC in the News
          </h3>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {NEWS_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-lg border border-uagc-border p-4 transition-colors hover:border-uagc-navy/15"
              >
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="rounded-full bg-uagc-red/10 px-2 py-0.5 font-bold uppercase tracking-wide text-uagc-red">
                    {item.tag}
                  </span>
                  <span className="text-uagc-gray/50">{item.date}</span>
                </div>
                <p className="mt-2 flex-1 text-sm font-medium leading-snug text-uagc-navy line-clamp-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-uagc-navy py-8 sm:py-10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:gap-10 sm:px-6 lg:gap-16 lg:px-8">
          {OUTCOMES.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 sm:gap-3">
              {i > 0 && (
                <div className="hidden h-10 w-px bg-white/15 sm:block" aria-hidden />
              )}
              <div className={cn("text-center", i > 0 && "sm:ml-4 lg:ml-8")}>
                <p className="text-2xl font-bold text-uagc-gold sm:text-3xl">
                  {item.stat}
                </p>
                <p className="mt-0.5 text-sm text-white/70">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
        <FAQSection
          variant="accordion"
          heading=""
          items={PROOF_FAQS}
          className="bg-transparent! py-0! [&>div]:px-0!"
        />
      </div>

      {activeVideo && (
        <VideoLightbox
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
