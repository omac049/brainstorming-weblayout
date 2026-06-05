import type { FAQItem } from "@/components/sections/FAQSection";

export const HUB_INTRO = {
  heading: "Flexible Online College Degrees to Fit Your Life",
  body:
    "At the University of Arizona Global Campus (UAGC), our online degrees provide a flexible way for busy adults to fit college into their lives. Mobile applications allow you to study whenever and wherever is convenient for you and on any device with internet access. Each online course is taken one at a time and lasts for just 5 or 6 weeks,* so you can continue to enjoy every aspect of your life while earning your online degree. Explore our selection of online college degrees and start your UAGC journey today.",
  footnote:
    "*5 weeks undergraduate, 6 weeks graduate, 9 weeks doctoral capstone.",
} as const;

export const HUB_TOP_DEGREES = {
  heading: "Top Three Requested Degrees",
  subheading:
    "Find many competitive and valuable educational disciplines among UAGC online bachelor's degree programs, including the three most popular degrees.",
  cards: [
    {
      title: "Bachelor of Arts in Business Administration",
      description:
        "Study the keys to a successful business and take your career to the next level.",
      href: "https://www.uagc.edu/online-degrees/bachelors/business-administration",
    },
    {
      title: "Bachelor of Arts in Organizational Management",
      description: "Examine the human side of managing organizations.",
      href: "https://www.uagc.edu/online-degrees/bachelors/organizational-management",
    },
    {
      title: "Bachelor of Arts in Early Childhood Education",
      description: "Amplify your impact and empower future learners.",
      href: "https://www.uagc.edu/online-degrees/bachelors/early-childhood-education",
    },
  ],
} as const;

export const HUB_CATALOG = {
  heading: "Do You Know Which Degree You Want?",
  subheading:
    "Choose an online degree program that aligns with your goals and gain the skills you need to open yourself up to a future full of potential.",
  programCountCopy: "50+ programs across associate, bachelor's, master's, and doctoral levels",
} as const;

export const INTEGRATIVE_LEARNING_PROGRAMS = new Set([
  "BA in Business Leadership",
  "Master of Professional Studies in Leadership",
]);

export const COLLEGE_OPTIONS = [
  { value: "all", label: "All Colleges" },
  { value: "professional-advancement", label: "College of Professional Advancement" },
  { value: "integrative-learning", label: "College of Integrative Learning" },
] as const;

export const AREA_OPTIONS = [
  { value: "all", label: "All Areas" },
  { value: "business", label: "Business" },
  { value: "accounting-finance", label: "Accounting & Finance" },
  { value: "criminal-justice", label: "Criminal Justice" },
  { value: "education", label: "Education" },
  { value: "health-care", label: "Health Care" },
  { value: "information-technology", label: "Information Technology" },
  { value: "liberal-arts", label: "Liberal Arts" },
  { value: "social-behavioral", label: "Social & Behavioral Science" },
] as const;

export const DEGREE_LEVEL_OPTIONS = [
  { value: "all", label: "All Levels" },
  { value: "Associate's", label: "Associate's Degrees" },
  { value: "Bachelor's", label: "Bachelor's Degrees" },
  { value: "Master's", label: "Master's Degrees" },
  { value: "Doctoral", label: "Doctoral Degrees" },
] as const;

export const HUB_TESTIMONIALS = [
  {
    tag: "Working Parent",
    quote:
      "My experience has been wonderful. The instructors are available and incredibly communicative whenever there are questions or clarifications needed.",
    name: "Stacey Metzler",
    credential: "Master of Arts in Psychology",
  },
  {
    tag: "Military Veteran",
    quote:
      "I had so many great instructors that provided me with meaningful feedback along the way. My student advisors were always just a phone call away.",
    name: "Timothy Cathey",
    credential: "BA in Social and Criminal Justice",
  },
  {
    tag: "Working Professional",
    quote:
      "I knew I needed to find a school that fit my schedule and would still allow me to spend time with my family. Everyone I talked to said it was very flexible.",
    name: "Tyler Barnett",
    credential: "BA in Organizational Management",
  },
] as const;

export const HUB_JOURNEY = {
  heading: "Start Your Journey",
  subheading:
    "Prepare yourself to begin your enrollment process by reviewing some basic information before you get started.",
  steps: [
    {
      title: "Transfer Credits",
      description:
        "Decrease your time to completion by transferring your past credits.",
      href: "https://www.uagc.edu/admissions/traditional",
    },
    {
      title: "Application",
      description:
        "Gather any documents you'll need and keep them handy. Your Admission Specialist will be prepared to answer any questions you have through the application process.",
      href: "https://www.uagc.edu/request-information",
    },
    {
      title: "Funding Options",
      description:
        "As a UAGC student, you'll have access to flexible tuition options and a range of payment plans designed to fit your unique circumstances.",
      href: "https://www.uagc.edu/tuition-financial-aid",
    },
  ],
} as const;

export const HUB_FAQ_ITEMS: FAQItem[] = [
  {
    category: "credibility",
    question: "Will employers respect a UAGC degree?",
    answer:
      "UAGC is part of the University of Arizona enterprise and accredited by WSCUC — the same regional accreditor that accredits Stanford, USC, and UCLA. Your diploma comes from an accredited, nonprofit university. Our career services team provides résumé support, interview coaching, and access to Handshake's employer network to help graduates connect with hiring managers who value online credentials.",
  },
  {
    category: "cost",
    question: "How much does it actually cost — and can I afford it?",
    answer:
      "Undergraduate tuition is $485 per credit hour, and 86% of our students receive financial aid through scholarships, grants, or employer tuition programs. There's no application fee, and flexible payment plans are available. Military students can use GI Bill, Tuition Assistance, and MyCAA benefits. Your enrollment advisor can walk you through a personalized cost estimate before you commit.",
  },
  {
    category: "admissions",
    question: "Will my existing credits or experience count?",
    answer:
      "UAGC has a generous transfer policy — you can transfer eligible credits from previous colleges, military training, and professional certifications. Many students save significant time and money by getting credit for what they've already learned. Your admissions advisor will evaluate your transcripts and provide a credit estimate early in the process.",
  },
  {
    category: "format",
    question: "How do 5-week courses actually work?",
    answer:
      "You take one course at a time, each lasting 5 weeks (6 weeks for graduate, 9 weeks for doctoral capstone). Coursework is asynchronous — no set class times — so you log in and study when it fits your schedule. Each course has clear weekly milestones, and your instructor is available throughout. Most students spend 15–20 hours per week on coursework.",
  },
  {
    category: "tuition",
    question: "What support is available for military students and spouses?",
    answer:
      "UAGC accepts GI Bill, Tuition Assistance, and MyCAA benefits. Military credits and training transfer seamlessly, and our military-experienced advisors understand PCS moves, deployment schedules, and the transition to civilian careers. Military spouses receive dedicated support to maintain enrollment continuity across relocations.",
  },
  {
    category: "academics",
    question: "Do you offer master's and doctoral programs?",
    answer:
      "Yes. UAGC offers programs from associate through doctoral level — all 100% online. Graduate programs include master's degrees in organizational leadership, education, and more. Our doctoral programs feature dedicated dissertation support and faculty mentorship. Every degree level follows the same flexible, one-course-at-a-time format.",
  },
  {
    category: "academics",
    question: "What kind of support will I get as an online student?",
    answer:
      "Every student is assigned a dedicated enrollment advisor and has access to academic tutoring, a 24/7 online library, career services, and technical support. If you have a disability or need accommodations, our accessibility team will work with you to ensure you have what you need. You're never navigating this alone.",
  },
];

export function getCollegeForProgram(programName: string): string {
  return INTEGRATIVE_LEARNING_PROGRAMS.has(programName)
    ? "integrative-learning"
    : "professional-advancement";
}

export function getCollegeLabel(collegeKey: string): string {
  if (collegeKey === "integrative-learning") {
    return "College of Integrative Learning";
  }
  return "College of Professional Advancement";
}
