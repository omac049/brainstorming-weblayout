import Link from "next/link";

const PATHS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z" />
      </svg>
    ),
    title: "Chat with an Advisor",
    description: "Get answers in real time",
    href: "#rfi",
    label: "Start chat",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Call Us",
    description: "+1 866 711 1700",
    href: "tel:+18667111700",
    label: "Call now",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Request Information",
    description: "Takes under a minute",
    href: "#rfi",
    label: "Request info",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    ),
    title: "Apply Now",
    description: "$0 application fee",
    href: "https://cloud.mail.uagc.edu/apply",
    label: "Apply now",
  },
] as const;

export function HomeMultiPathCTA() {
  return (
    <section
      id="next-steps"
      className="scroll-mt-28 section-pad bg-uagc-navy lg:scroll-mt-36"
      aria-labelledby="home-next-steps-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto mb-3 accent-bar" />
          <h2 id="home-next-steps-heading" className="type-h2 text-white">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#b8c5d9] sm:text-base">
            Choose the path that works best for you.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map(({ icon, title, description, href, label }) => (
            <Link
              key={title}
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-white/25 p-5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="text-uagc-gold">{icon}</span>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm text-[#b8c5d9]">{description}</p>
              <span className="mt-4 text-xs font-bold uppercase tracking-wide text-uagc-gold group-hover:underline">
                {label} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
