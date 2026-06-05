import { Check } from "lucide-react";

const DIFFERENTIATORS = [
  {
    title: "University of Arizona Affiliation",
    description:
      "Part of Arizona's flagship public university system — R1 research institution with 150+ years of academic excellence.",
  },
  {
    title: "One Class at a Time",
    description:
      "Focus on one subject per 5-6 week block instead of juggling 4-5 courses simultaneously.",
  },
  {
    title: "Built for Working Adults",
    description:
      "Asynchronous coursework you complete on your schedule — no mandatory login times or campus visits.",
  },
  {
    title: "Career-Connected Curriculum",
    description:
      "Programs designed with employer input so your degree translates directly to workplace skills.",
  },
] as const;

const COMPARISON_ROWS = [
  { feature: "Class length", uagc: "5-6 weeks", traditional: "16 weeks" },
  { feature: "Classes at once", uagc: "1", traditional: "4-5" },
  { feature: "Transfer credits", uagc: "Up to 75%", traditional: "Varies" },
  { feature: "Test required", uagc: "No", traditional: "Often" },
] as const;

export function HomeDifferentiatorSection() {
  return (
    <section
      id="differentiators"
      className="scroll-mt-28 section-pad bg-[#faf9f7] lg:scroll-mt-36"
      aria-labelledby="home-differentiators-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="home-differentiators-heading" className="type-h2 text-uagc-navy">
            How UAGC Is Different
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-uagc-gray sm:text-base">
            Not all online programs are created equal.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <ul className="flex flex-col gap-6">
            {DIFFERENTIATORS.map(({ title, description }) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-uagc-navy text-white"
                >
                  <Check className="size-4" strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-uagc-navy sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-uagc-gray sm:text-[0.9375rem]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="overflow-hidden rounded-2xl border border-uagc-border bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of UAGC online format versus traditional online programs
              </caption>
              <thead>
                <tr className="border-b border-uagc-border bg-uagc-navy text-white">
                  <th scope="col" className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide sm:px-5 sm:text-sm">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide sm:px-5 sm:text-sm">
                    UAGC
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide sm:px-5 sm:text-sm">
                    Traditional Online
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(({ feature, uagc, traditional }, index) => (
                  <tr
                    key={feature}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#faf9f7]"}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3.5 font-semibold text-uagc-navy sm:px-5"
                    >
                      {feature}
                    </th>
                    <td className="px-4 py-3.5 font-semibold text-uagc-navy sm:px-5">
                      {uagc}
                    </td>
                    <td className="px-4 py-3.5 text-uagc-gray sm:px-5">{traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
