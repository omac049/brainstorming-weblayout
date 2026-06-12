"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AssetImage } from "@/components/shared/AssetImage";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface VideoTestimonial {
  name: string;
  credential: string;
  tag: string;
  youtubeId: string;
  quote?: string;
  thumbnailUrl?: string;
}

interface VideoTestimonialSectionProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  testimonials: VideoTestimonial[];
  className?: string;
}

function VideoCard({
  testimonial,
  index,
  isVisible,
  onPlay,
}: {
  testimonial: VideoTestimonial;
  index: number;
  isVisible: boolean;
  onPlay: (youtubeId: string) => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const src =
    testimonial.thumbnailUrl ||
    `https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`;

  return (
    <div className={cn("reveal-section", `stagger-${index + 1}`, isVisible && "is-visible")}>
      <button
        type="button"
        onClick={() => onPlay(testimonial.youtubeId)}
        className="video-card group relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-uagc-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-gold"
        aria-label={`Play video testimonial from ${testimonial.name}`}
      >
        {/* Loading skeleton */}
        {!imgLoaded && (
          <span className="absolute inset-0 animate-pulse motion-reduce:animate-none bg-white/5" />
        )}

        <AssetImage
          src={src}
          alt={`Portrait of ${testimonial.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]",
            imgLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Bottom gradient — deep enough for solid text contrast */}
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Hover veil */}
        <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/15" />

        {/* Play button with hover ring */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="play-btn relative flex size-14 items-center justify-center rounded-full bg-uagc-red shadow-lg transition-transform duration-200 ease-out group-hover:scale-110 sm:size-16">
            <Play className="ml-0.5 size-6 fill-white text-white sm:size-7" strokeWidth={0} />
          </span>
        </span>

        {/* Persona tag — top-left trust signal */}
        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-white/90 sm:left-4 sm:top-4">
          {testimonial.tag}
        </span>

        {/* Student identity + quote — bottom overlay */}
        <span className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-5 text-center sm:px-5 sm:pb-6">
          <span className="text-sm font-semibold leading-tight text-white sm:text-base">
            {testimonial.name}
          </span>
          <span className="mt-0.5 text-xs leading-snug text-white/80 sm:text-[0.8125rem]">
            {testimonial.credential}
          </span>

          {/* Quote — visible on hover (desktop), always visible on mobile */}
          {testimonial.quote && (
            <span className="mt-2.5 line-clamp-2 text-[0.75rem] italic leading-relaxed text-white/60 transition-opacity duration-200 sm:text-[0.8125rem] lg:opacity-0 lg:group-hover:opacity-100">
              &ldquo;{testimonial.quote}&rdquo;
            </span>
          )}
        </span>
      </button>
    </div>
  );
}

function VideoModal({
  testimonial,
  onClose,
}: {
  testimonial: VideoTestimonial;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="video-modal-backdrop fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonial from ${testimonial.name}`}
      onClick={onClose}
    >
      <div
        className="video-modal-content relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: student name + close */}
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <p className="text-sm font-medium text-white/70 sm:text-base">
            {testimonial.name}
            <span className="ml-2 text-white/40">{testimonial.credential}</span>
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white sm:size-11"
            aria-label="Close video"
          >
            <X className="size-5 sm:size-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${testimonial.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`Video testimonial from ${testimonial.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </div>
  );
}

export function VideoTestimonialSection({
  id,
  eyebrow = "Student Experience",
  heading = "In Their Own Words",
  subheading = "Our students are tenacious and inspiring.",
  testimonials,
  className,
}: VideoTestimonialSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [activeTestimonial, setActiveTestimonial] = useState<VideoTestimonial | null>(null);

  const handlePlay = useCallback(
    (youtubeId: string) => {
      const t = testimonials.find((item) => item.youtubeId === youtubeId);
      if (t) {
        setActiveTestimonial(t as VideoTestimonial);
        document.body.style.overflow = "hidden";
      }
    },
    [testimonials],
  );

  const handleClose = useCallback(() => {
    setActiveTestimonial(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <section
        ref={ref}
        id={id}
        className={cn(
          "scroll-mt-28 overflow-hidden border-b border-white/10 bg-uagc-navy lg:scroll-mt-36",
          className,
        )}
        aria-labelledby={id ? `${id}-heading` : undefined}
      >
        <div className="mx-auto w-full max-w-[1440px] lg:flex lg:items-stretch">
          {/* Heading column */}
          <div
            className={cn(
              "flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:w-[280px] lg:shrink-0 lg:py-20 lg:pl-8 lg:pr-10 xl:w-[320px] reveal-section",
              isVisible && "is-visible",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-uagc-gold">
              {eyebrow}
            </p>
            <h2
              id={id ? `${id}-heading` : undefined}
              className="mt-2.5 font-heading text-[clamp(1.75rem,2.5vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-white"
            >
              {heading}
            </h2>
            {subheading && (
              <p className="mt-3 text-sm leading-relaxed text-uagc-navy-muted sm:text-[0.9375rem]">
                {subheading}
              </p>
            )}
          </div>

          {/* Portrait card strip */}
          <div className="grid flex-1 grid-cols-1 gap-px sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <VideoCard
                key={t.youtubeId}
                testimonial={t}
                index={i}
                isVisible={isVisible}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </section>

      {activeTestimonial && (
        <VideoModal testimonial={activeTestimonial} onClose={handleClose} />
      )}
    </>
  );
}
