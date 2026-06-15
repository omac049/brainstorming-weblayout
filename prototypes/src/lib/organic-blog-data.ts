export interface BlogAuthor {
  name: string;
  slug: string;
  role?: string;
  organization?: string;
  photo?: string;
  profileHref?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  author: BlogAuthor;
  publishedDate: string;
  lastUpdatedDate: string;
  readingTime: string;
  featuredImage: string;
  featuredImageAlt: string;
  keyTakeaways: string[];
  tags: string[];
  sections: BlogSection[];
  /** FAQ items rendered as disclosure accordions after the body */
  faqs?: BlogFAQ[];
  /** Closing paragraph after FAQs */
  closingSection?: BlogSection;
  /** Optional sidebar quick-reference card configuration */
  quickReference?: BlogQuickReferenceData;
}

export interface BlogQuickReferenceData {
  title: string;
  icon?: "graduation" | "info";
  variant: "comparison" | "facts" | "checklist";
  columnHeaders?: string[];
  comparisonRows?: { label: string; values: string[] }[];
  facts?: { label: string; value: string }[];
  checklist?: { text: string; checked?: boolean }[];
  cta?: {
    text: string;
    href: string;
    subtext?: string;
  };
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list inside a section */
  bullets?: string[];
  /** Optional pull-quote highlight to surface between paragraphs */
  pullQuote?: BlogPullQuote;
}

export interface BlogPullQuote {
  text: string;
  attribution?: string;
  attributionRole?: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface RelatedArticle {
  title: string;
  category: string;
  date: string;
  readingTime: string;
  href: string;
  image: string;
  imageAlt: string;
}

/** Quick-reference facts for the program explorer sidebar */
export interface ProgramQuickFact {
  label: string;
  phd: string;
  dps: string;
}

/** Program filter data for the sidebar program discovery tool */
export interface ProgramFilterItem {
  id: string;
  name: string;
  shortName: string;
  type: "research" | "applied";
  format: "online" | "hybrid";
  duration: string;
  credits: number;
  focus: string;
  bestFor: string;
  href: string;
  goalTags: ProgramGoal[];
  outcomes: string[];
  costHint?: string;
  nextStepLabel?: string;
  nextStepHref?: string;
}

export type ProgramGoal =
  | "career-advancement"
  | "academic-research"
  | "leadership"
  | "teaching"
  | "career-change";

export const PROGRAM_GOAL_LABELS: Record<ProgramGoal, string> = {
  "career-advancement": "Career Advancement",
  "academic-research": "Academic Research",
  leadership: "Leadership",
  teaching: "Teaching",
  "career-change": "Career Change",
};

export const DOCTORAL_PROGRAMS: ProgramFilterItem[] = [
  {
    id: "dps-org-leadership",
    name: "Doctor of Professional Studies in Organizational Leadership",
    shortName: "DPS — Organizational Leadership",
    type: "applied",
    format: "online",
    duration: "2.5–3 years",
    credits: 60,
    focus: "Applied research & organizational impact",
    bestFor: "Experienced professionals & executives",
    href: "https://www.uagc.edu/online-degrees/doctoral/dps-organizational-leadership",
    goalTags: ["career-advancement", "leadership"],
    outcomes: [
      "Lead organizational change initiatives",
      "Apply research to executive-level decisions",
      "Earn the title of Doctor while working full-time",
    ],
    costHint: "$485/credit · Financial aid available",
    nextStepLabel: "Request DPS Info",
    nextStepHref: "/organic/request-information?program=dps-org-leadership",
  },
  {
    id: "edd-curriculum",
    name: "Doctor of Education (EdD) in Curriculum & Instruction",
    shortName: "EdD — Curriculum & Instruction",
    type: "applied",
    format: "online",
    duration: "3–4 years",
    credits: 60,
    focus: "Educational leadership & curriculum design",
    bestFor: "Educators & school administrators",
    href: "https://www.uagc.edu/online-degrees/doctoral/education-curriculum-instruction",
    goalTags: ["teaching", "leadership", "career-advancement"],
    outcomes: [
      "Design and evaluate K-12 and higher ed curricula",
      "Lead instructional improvement initiatives",
      "Qualify for superintendent or dean-level roles",
    ],
    costHint: "$485/credit · Financial aid available",
    nextStepLabel: "Request EdD Info",
    nextStepHref: "/organic/request-information?program=edd-curriculum",
  },
  {
    id: "edd-org-leadership-innovation",
    name: "Doctor of Education (EdD) in Organizational Leadership",
    shortName: "EdD — Organizational Leadership",
    type: "applied",
    format: "online",
    duration: "3–4 years",
    credits: 60,
    focus: "Organizational innovation & change management",
    bestFor: "Leaders in education & nonprofit sectors",
    href: "https://www.uagc.edu/online-degrees/doctoral/education-organizational-leadership-innovation",
    goalTags: ["leadership", "career-change", "career-advancement"],
    outcomes: [
      "Drive innovation in education and nonprofit orgs",
      "Build change-management frameworks",
      "Advance to C-suite or senior leadership",
    ],
    costHint: "$485/credit · Financial aid available",
    nextStepLabel: "Request EdD Info",
    nextStepHref: "/organic/request-information?program=edd-org-leadership",
  },
  {
    id: "phd-general",
    name: "PhD Programs (Research-Focused)",
    shortName: "PhD — Research Track",
    type: "research",
    format: "hybrid",
    duration: "4–7 years",
    credits: 72,
    focus: "Original research & theory development",
    bestFor: "Aspiring academics & researchers",
    href: "https://www.uagc.edu/online-degrees/doctoral",
    goalTags: ["academic-research", "teaching"],
    outcomes: [
      "Conduct original, publishable research",
      "Qualify for tenure-track faculty positions",
      "Contribute new knowledge to your discipline",
    ],
    costHint: "Varies by program · Assistantships may be available",
    nextStepLabel: "Explore PhD Options",
    nextStepHref: "https://www.uagc.edu/online-degrees/doctoral",
  },
];

/* ------------------------------------------------------------------
 *  PhD vs Doctorate blog — top-performing organic blog post
 * ------------------------------------------------------------------ */

export const PHD_VS_DOCTORATE_ARTICLE: BlogArticle = {
  slug: "what-difference-between-phd-and-doctorate",
  title: "What is the Difference Between a PhD and a Doctorate?",
  category: "Doctoral Program",
  author: {
    name: "UAGC Staff Member",
    slug: "admin",
    photo:
      "https://www.uagc.edu/sites/default/files/pictures/2021-11/uagc-logo-small.png",
  },
  publishedDate: "Jun 4, 2021",
  lastUpdatedDate: "Apr 13, 2026",
  readingTime: "8 min read",
  featuredImage:
    "https://www.uagc.edu/sites/default/files/styles/paid_hero_header_899x600/public/2021-06/PhD%20versus%20Doctorate%20Blog%20Hero.png.webp?h=c4fa20ab&itok=J3fyrQJp",
  featuredImageAlt:
    "PhD versus Doctorate comparison illustration",
  keyTakeaways: [
    "All PhDs are doctorates, but not all doctorates are PhDs. Doctorate is an umbrella term for the highest level of academic achievement.",
    "The PhD is built for researchers. It\u2019s designed for those interested in generating new knowledge through scientific research.",
    "The DPS is built for practitioners. The Doctor of Professional Studies is a terminal degree for experienced professionals who want to apply advanced research to real-world challenges.",
    "Neither degree outranks the other. Both the PhD and the DPS are terminal degrees. The difference is purpose, not prestige.",
    "Doctoral degrees are rare and in demand. Doctoral degree holders represent a small fraction of the educated workforce, making any doctoral credential distinguished.",
    "The right degree depends on your goals. If you\u2019re drawn to scholarship, the PhD is your path. If you\u2019re a seasoned professional looking to lead and drive change, the DPS may be better.",
  ],
  tags: ["Doctoral Program", "Degree Programs"],
  sections: [
    {
      heading:
        "What\u2019s the Difference Between a PhD and Doctorate? (DPS Explained)",
      paragraphs: [
        "At first glance, it\u2019s easy to confuse the terms PhD and doctorate. After all, they both represent the pinnacle of the academic experience \u2013 often the result of a lifelong pursuit \u2013 and those who hold the distinction are often referred to as \u201cdoctor.\u201d Yet the differences, subtle as they may be, are noteworthy and require much thought when putting together a plan for your future.",
      ],
    },
    {
      heading: "Is a PhD the Same as a Doctorate?",
      paragraphs: [
        "While the terms are closely related, they are not interchangeable. All PhDs are doctorates, but not all doctorates are PhDs. The PhD, also known as the Doctor of Philosophy, is a research degree, one of the most common types of doctoral degrees, awarded to graduates in many different fields.",
        'According to the American Psychological Association, the PhD is "intended for students interested in generating new knowledge through scientific research and/or gaining teaching experience."',
        "The PhD is built around the pursuit of original research, producing knowledge that advances a field rather than applying it. PhD candidates typically spend years developing a specialized research question, conducting studies, and contributing findings to academic literature. For those drawn to university faculty positions, think tanks, or research institutions, the PhD remains the gold standard.",
      ],
    },
    {
      heading: "Research-Focused vs. Practice-Focused Doctoral Programs",
      paragraphs: [
        "Not all doctoral degrees are designed with the same goal in mind. While both research-focused and practice-focused programs sit at the highest level of education, they differ significantly in how knowledge is created, applied, and evaluated.",
        "Research-focused doctorates, most notably the PhD, are built around generating new knowledge. Students conduct independent, original research and produce a dissertation that contributes new theory or insights.",
        "Practice-focused doctorates\u2014such as the Doctor of Professional Studies (DPS)\u2014are designed for experienced professionals who want to apply advanced knowledge directly to real-world challenges. Students complete applied research projects focused on leadership, strategy, and innovation.",
      ],
    },
    {
      heading: "So, Where Does DPS Fit in the PhD vs. Doctorate Debate?",
      paragraphs: [
        "The Doctor of Professional Studies (DPS) occupies a unique space. While a PhD focuses on generating new knowledge through original research, a DPS is designed for professionals who want to apply advanced knowledge directly to real-world challenges. It bridges the gap between theory and practice, emphasizing leadership, problem-solving, and measurable impact.",
        "The DPS stands out as an applied, practice-oriented option offering the credibility of a terminal degree while focusing on results and professional advancement.",
      ],
    },
    {
      heading: "What Does a DPS Student Study?",
      paragraphs: [
        "The Doctor of Professional Studies is designed for experienced practitioners who want to apply advanced research and theory directly to challenges in their field. DPS programs typically emphasize applied research methods, organizational effectiveness, executive leadership, and ethical decision-making.",
        "Students bring years of professional experience into the classroom and leave with the analytical tools and scholarly foundation to act on that experience at the highest level.",
      ],
    },
    {
      heading: "What Is a Doctorate?",
      paragraphs: [
        "A doctorate, or doctoral degree, is an umbrella term for many degrees at the height of the academic ladder. Doctoral degrees fall under two categories:",
        "Research (Academic) includes: Doctor of Philosophy (PhD), Doctor of Business Administration (DBA), Doctor of Education (EdD), Doctor of Theology (ThD).",
        "Applied (Professional) includes: Doctor of Medicine (MD), Doctor of Optometry (OD), Doctor of Psychology (PsyD), Juris Doctor (JD).",
        "As the PhD is more academic, research-focused, and heavy on theory, an applied doctoral degree is intended for you to master a subject in both theory and practice.",
      ],
    },
    {
      heading: "Can a PhD Be Called a Doctor?",
      paragraphs: [
        'Yes. Anyone who has earned a doctoral degree can accurately refer to themselves as "doctor." The word reflects completion of a doctorate, whether that degree is a PhD, EdD, DBA, DPA, PsyD, DMA, or another credential.',
        "In everyday life, context matters. In a hospital, \u201cdoctor\u201d means a physician. In a university or professional setting, \u201cdoctor\u201d may refer to someone with a doctorate in education, psychology, business, or another discipline. The title is valid in both cases.",
      ],
    },
    {
      heading: "Doctoral Degrees Are in Demand",
      paragraphs: [
        "Whether you are pursuing a PhD, PsyD, MD, or JD, your decision to take your education to the next level puts you in elite company. As reported in Forbes, a 2024 survey indicates U.S. colleges and universities conferring doctoral degrees is at an all-time high, with a 3.1% increase year over year since 2020.",
        "What\u2019s pushing these high achievers? It\u2019s a love of lifelong learning and a passion for their chosen profession, plus all the benefits that come with advanced degrees.",
      ],
      pullQuote: {
        text: "The decision to pursue a doctoral degree puts you in elite company — conferrals are at an all-time high with 3.1% year-over-year growth.",
        attribution: "Forbes",
        attributionRole: "2024 Survey Report",
      },
    },
  ],
  faqs: [
    {
      question: "Is a Doctor of Professional Studies the Same as a PhD?",
      answer:
        'No. Though both are terminal doctoral degrees that earn you the title of "Doctor," they serve different purposes. A PhD is designed for original academic research, while a DPS is designed for experienced professionals applying advanced knowledge to real-world challenges.',
    },
    {
      question: "Is a Doctor of Professional Studies a Real Doctorate?",
      answer:
        "Yes. A DPS is a legitimate, accredited terminal degree recognized by the U.S. Department of Education. It requires the same level of academic rigor as a PhD.",
    },
    {
      question:
        'Can I Be Called "Doctor" with a Doctor of Professional Studies?',
      answer:
        'Yes. Graduates of a DPS program have earned a doctoral-level degree and may use the title "Dr."',
    },
    {
      question: "Is a PhD Higher than a Doctor of Professional Studies?",
      answer:
        "No. Both degrees sit at the same level\u2014the terminal degree. One is not superior to the other; they prepare graduates for different career paths.",
    },
    {
      question:
        "Who Should Pursue a Doctor of Professional Studies Instead of a PhD?",
      answer:
        "The DPS is best suited for experienced professionals who want to deepen their expertise, strengthen leadership capabilities, and apply research directly to organizational challenges. If your goal is to publish original theory or pursue a university research position, a PhD may be the better fit.",
    },
    {
      question:
        "How Long Does It Take to Earn a Doctor of Professional Studies?",
      answer:
        "Most DPS programs are designed to be completed in 2.5 to 3 years. Because they are built for working professionals, many programs offer flexible or hybrid formats.",
    },
  ],
  closingSection: {
    heading: "Your Path to the Pinnacle of Education",
    paragraphs: [
      "You know that a college education serves as the foundation for your professional future, but a doctoral degree is a big commitment. Before you make the decision, arm yourself with as much information as possible and ask yourself if you have the time and the passion to pursue what will be a life-changing degree.",
      "Choosing between a PhD and other doctoral degrees depends on your career goals\u2014research, leadership, or professional practice. If you\u2019re ready for that change, put together your questions and contact an advisor at UAGC today.",
    ],
  },
  /* quickReference removed — replaced by BlogProgramFilter sidebar tool */
};

/** PhD vs DPS quick-reference comparison for sidebar */
export const PHD_VS_DPS_COMPARISON: ProgramQuickFact[] = [
  { label: "Focus", phd: "Original research & theory", dps: "Applied research & practice" },
  { label: "Best for", phd: "Aspiring academics & researchers", dps: "Experienced professionals & leaders" },
  { label: "Culminates in", phd: "Traditional dissertation", dps: "Applied research project" },
  { label: "Career path", phd: "Academia, research institutions", dps: "Executive leadership, consulting" },
  { label: "Typical duration", phd: "4\u20137 years", dps: "2.5\u20133 years" },
  { label: "Work while studying?", phd: "Difficult", dps: "Designed for it" },
];

export const PHD_BLOG_RELATED: RelatedArticle[] = [
  {
    title: "How to Use AI Without Letting It Do the Thinking for You",
    category: "Industry Insights",
    date: "Jun 8, 2026",
    readingTime: "6 min read",
    href: "/organic/blog/how-to-use-ai-without-letting-it-do-the-thinking-for-you",
    image:
      "https://www.uagc.edu/sites/default/files/styles/floating_image_520x440/public/GettyImages-1300579577_UseAIwithoutItThining_Pitts_TLBlog2Hero.jpg.webp?h=b1a91ebe&itok=Zcm8LRfc",
    imageAlt:
      "How to Use AI Without Letting It Do the Thinking for You (Getty Image)",
  },
  {
    title: "Celebrating the United States Army\u2019s Birthday",
    category: "Military",
    date: "Jun 2, 2026",
    readingTime: "5 min read",
    href: "/organic/blog/celebrating-united-states-armys-birthday",
    image:
      "https://www.uagc.edu/sites/default/files/styles/floating_image_520x440/public/GettyImages-1656843579_armyBdayBlogHero_0.jpg.webp?h=199d8c1f&itok=wP4it1z_",
    imageAlt:
      "Celebrating the United States Army\u2019s Birthday (Getty Image)",
  },
  {
    title:
      "UAGC Student Simona Thomas Redefines What It Means to Live Simply",
    category: "Student Lifestyle and Success",
    date: "Jun 2, 2026",
    readingTime: "9 min read",
    href: "/organic/blog/uagc-student-simona-thomas-redefines-what-it-means-to-live-simply",
    image:
      "https://www.uagc.edu/sites/default/files/styles/floating_image_520x440/public/Simona%20Thomas%20blog%20hero.jpg.webp?h=eca34813&itok=CroV_fLa",
    imageAlt:
      "UAGC Student Simona Thomas Redefines What It Means to Live Simply",
  },
];

export const ADMISSION_SPECIALIST_IMAGE =
  "https://www.uagc.edu/sites/default/files/admission-specialist.png";

export const ADMISSION_SPECIALIST_IMAGE_HD =
  "https://www.uagc.edu/sites/default/files/styles/wide/public/2024-01/Gina_Putnam-9020.jpg";

export const MILITARY_CTA_LINK = {
  text: "Learn more about how UAGC supports the military-connected community.",
  href: "https://www.uagc.edu/military",
};
