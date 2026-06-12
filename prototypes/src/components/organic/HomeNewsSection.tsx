"use client";

import { Award, GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface Achievement {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: Award,
    title: "Top-Ranked Programs",
    description:
      "Multiple UAGC programs ranked in the top tier by independent evaluation organizations for quality and student outcomes.",
  },
  {
    icon: GraduationCap,
    title: "Award-Winning Faculty",
    description:
      "Instructors with real-world expertise and national teaching excellence awards — 90% hold a master's degree or higher.",
  },
  {
    icon: ShieldCheck,
    title: "WSCUC Accredited",
    description:
      "Institutionally accredited by WSCUC — one of the most respected regional accrediting bodies in the United States, recognized by the U.S. Department of Education.",
  },
];

export function HomeNewsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="section-pad bg-uagc-navy"
      aria-labelledby="home-achievements-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={cn("reveal-section", isVisible && "is-visible")}>
          <span aria-hidden className="mb-3 block h-0.75 w-10 bg-uagc-gold" />
          <h2
            id="home-achievements-heading"
            className="type-h2 text-white"
          >
            Recognition & Achievements
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={cn(
                  "reveal-section group flex h-full cursor-default flex-col rounded-2xl border border-white/10 bg-white/6 p-6 transition-[border-color,background-color] duration-300 hover:border-uagc-gold/30 hover:bg-white/10",
                  `stagger-${i + 1}`,
                  isVisible && "is-visible",
                )}
              >
                <span
                  className="flex size-11 items-center justify-center rounded-xl bg-uagc-gold/15 transition-colors duration-200 group-hover:bg-uagc-gold/25"
                  aria-hidden
                >
                  <Icon className="size-5 text-uagc-gold" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
