"use client";

import {
  DEFAULT_INTEREST_AREAS,
  InterestAreaGrid,
  type InterestArea,
  type InterestAreaGridProps,
} from "@/components/organic/InterestAreaGrid";
import { HUB_AREAS_OF_STUDY } from "@/lib/organic-online-degrees-data";

export type { AreaOfStudy } from "@/lib/organic-online-degrees-data";

function normalizeAreaName(name: string): string {
  return name.replace(/\sSciences$/, " Science").toLowerCase();
}

function findHubArea(homeAreaName: string) {
  const normalizedHome = normalizeAreaName(homeAreaName);

  return HUB_AREAS_OF_STUDY.find(
    (area) => normalizeAreaName(area.label) === normalizedHome,
  );
}

/** Same 7-area grid as homepage — hub live URLs and counts only. */
const HUB_INTEREST_AREAS: InterestArea[] = DEFAULT_INTEREST_AREAS.map(
  (homeArea) => {
    const hubArea = findHubArea(homeArea.name);

    return {
      name: homeArea.name,
      programCount: hubArea?.programCount ?? homeArea.programCount,
      imageSrc: hubArea?.imageSrc ?? homeArea.imageSrc,
      imageAlt: hubArea?.imageAlt ?? homeArea.imageAlt,
      href: hubArea?.href ?? homeArea.href,
      imagePosition: hubArea?.imagePosition,
    };
  },
);

export type AreasOfStudyGridProps = Omit<
  InterestAreaGridProps,
  "areas" | "heading" | "subheading" | "id"
> &
  Partial<Pick<InterestAreaGridProps, "heading" | "subheading" | "id">>;

export function AreasOfStudyGrid({
  id = "areas",
  className,
  heading = "What Do You Want to Study?",
  subheading =
    "Whether you're advancing in your field or changing direction entirely, browse by area — then explore programs that match your goals.",
  finderHref = "#programs",
  reveal = true,
  ...props
}: AreasOfStudyGridProps) {
  return (
    <InterestAreaGrid
      id={id}
      className={className ?? "bg-uagc-surface"}
      areas={HUB_INTEREST_AREAS}
      heading={heading}
      subheading={subheading}
      finderHref={finderHref}
      reveal={reveal}
      {...props}
    />
  );
}
