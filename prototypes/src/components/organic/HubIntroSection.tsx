import { HUB_INTRO } from "@/lib/organic-online-degrees-data";

export function HubIntroSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="hub-intro-heading">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="hub-intro-heading" className="type-h2 text-uagc-navy">
            {HUB_INTRO.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-uagc-gray sm:text-base">
            {HUB_INTRO.body}
          </p>
          <p className="mt-3 text-xs text-uagc-gray">{HUB_INTRO.footnote}</p>
        </div>
      </div>
    </section>
  );
}
