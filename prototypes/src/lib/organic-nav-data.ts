export type NavLinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavColumn = {
  title: string;
  href?: string;
  links: NavLinkItem[];
};

export type NavMenuItem = {
  id: string;
  label: string;
  href: string;
  columns: NavColumn[];
  featured?: NavLinkItem;
};

export type UtilityIconKey =
  | "shield"
  | "handshake"
  | "user"
  | "message-circle"
  | "log-in";

export type UtilitySubLink = {
  label: string;
  href: string;
};

export type UtilityLinkItem = {
  label: string;
  href: string;
  icon: UtilityIconKey;
  group: "audience" | "student" | "support";
  children?: UtilitySubLink[];
};

/**
 * Utility nav — organized by intent:
 * audience  → people scoping UAGC for a specific background
 * student   → current students and applicants
 * support   → live help + search
 *
 * Military and Partnerships carry submenus matching the live site.
 */
export const ORGANIC_UTILITY_LINKS: UtilityLinkItem[] = [
  {
    label: "Military",
    href: "https://www.uagc.edu/military",
    icon: "shield",
    group: "audience",
    children: [
      { label: "Active-Duty", href: "https://www.uagc.edu/military/active-duty" },
      { label: "Veterans", href: "https://www.uagc.edu/military/veterans" },
      { label: "Military Spouses", href: "https://www.uagc.edu/military/spouses-dependents" },
      { label: "Tuition", href: "https://www.uagc.edu/military/tuition-financial-aid/tuition" },
      { label: "Military Alliance", href: "https://www.uagc.edu/military-alliance" },
    ],
  },
  {
    label: "Partnerships",
    href: "https://www.uagc.edu/partnerships",
    icon: "handshake",
    group: "audience",
    children: [
      { label: "Academic Partnerships", href: "https://www.uagc.edu/partnerships/academic" },
      { label: "Arizona College Partner", href: "https://www.uagc.edu/partnerships/academic/arizona" },
      { label: "Employer Savings", href: "https://www.uagc.edu/partnerships/students" },
      { label: "Corporate Partnerships", href: "https://www.uagc.edu/partnerships/organizations" },
    ],
  },
  { label: "myUAGC", href: "https://myuagc.uagc.edu/", icon: "log-in", group: "student" },
  { label: "Chat", href: "https://www.uagc.edu/?chat=default", icon: "message-circle", group: "support" },
];

/**
 * Main nav — simplified from 5-menu deep megamenu to 4 focused panels.
 *
 * Data-informed priorities:
 * - /online-degrees converts 3x better than homepage (5.82% vs 2.0%)
 * - 11.7% scroll depth on homepage — nav is the primary wayfinding tool
 * - 21,792 sessions with page-looping — clarity over completeness
 * - "What Brings You Here?" persona routing (SUNY Empire pattern) merged into Admission
 */
export const ORGANIC_NAV_MENUS: NavMenuItem[] = [
  {
    id: "online-degrees",
    label: "Online Degrees",
    href: "/organic/online-degrees",
    featured: {
      label: "Degree Finder",
      href: "https://www.uagc.edu/degree-finder",
      description: "Answer a few questions to find programs that fit your goals.",
    },
    columns: [
      {
        title: "By Level",
        href: "/organic/online-degrees",
        links: [
          { label: "Associate", href: "https://www.uagc.edu/online-degrees/associates" },
          { label: "Bachelor's", href: "https://www.uagc.edu/online-degrees/bachelors" },
          { label: "Master's", href: "https://www.uagc.edu/online-degrees/masters" },
          { label: "Doctoral", href: "https://www.uagc.edu/online-degrees/doctoral" },
        ],
      },
      {
        title: "By Interest",
        links: [
          { label: "Business", href: "https://www.uagc.edu/online-degrees/business" },
          { label: "Education", href: "https://www.uagc.edu/online-degrees/education" },
          { label: "Health Care", href: "https://www.uagc.edu/online-degrees/health-care" },
          { label: "Criminal Justice", href: "https://www.uagc.edu/online-degrees/criminal-justice" },
          { label: "Information Technology", href: "https://www.uagc.edu/online-degrees/information-technology" },
          { label: "Liberal Arts", href: "https://www.uagc.edu/online-degrees/liberal-arts" },
          { label: "Social & Behavioral Science", href: "https://www.uagc.edu/online-degrees/social-behavioral-science" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Compare Degrees", href: "https://www.uagc.edu/degree-comparison" },
          { label: "All Online Degrees", href: "/organic/online-degrees" },
        ],
      },
    ],
  },
  {
    id: "admissions-aid",
    label: "Admissions & Aid",
    href: "https://www.uagc.edu/admission",
    featured: {
      label: "A Week in the Life",
      href: "https://www.uagc.edu/student-experience/week-in-the-life",
      description: "See what online learning at UAGC really looks like, day by day.",
    },
    columns: [
      {
        title: "What Brings You Here?",
        links: [
          { label: "New Student", href: "https://www.uagc.edu/admission/new-students" },
          { label: "Returning Student", href: "https://www.uagc.edu/admission/returning-students" },
          { label: "Transfer Student", href: "https://www.uagc.edu/admission/transfer-credits" },
          { label: "Military & Veteran", href: "https://www.uagc.edu/military" },
          { label: "International", href: "https://www.uagc.edu/admission/international" },
        ],
      },
      {
        title: "Transfer & Credits",
        links: [
          { label: "Traditional Credits", href: "https://www.uagc.edu/admission/transfer-credits" },
          { label: "Non-Traditional Credits", href: "https://www.uagc.edu/admission/non-traditional-credits" },
          { label: "Military Experience", href: "https://www.uagc.edu/military/credits" },
        ],
      },
      {
        title: "Tuition & Financial Aid",
        links: [
          { label: "Tuition & Fees", href: "https://www.uagc.edu/tuition-financial-aid/tuition" },
          { label: "Scholarships", href: "https://www.uagc.edu/tuition-financial-aid/scholarships" },
          { label: "Grants", href: "https://www.uagc.edu/tuition-financial-aid/grants" },
          { label: "Employer Savings", href: "https://www.uagc.edu/partnerships/employer-savings" },
          { label: "Payment Options", href: "https://www.uagc.edu/tuition-financial-aid/payment-options" },
        ],
      },
    ],
  },
  {
    id: "student-experience",
    label: "Student Experience",
    href: "https://www.uagc.edu/student-experience",
    columns: [
      {
        title: "Support & Resources",
        links: [
          { label: "Student Resources", href: "https://www.uagc.edu/student-experience/student-resources" },
          { label: "Career Services", href: "https://www.uagc.edu/student-experience/career-services" },
          { label: "Writing Center", href: "https://www.uagc.edu/student-experience/writing-center" },
          { label: "Office of Student Affairs", href: "https://www.uagc.edu/student-experience/student-affairs" },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Student Success Stories", href: "https://www.uagc.edu/student-experience/success-stories" },
          { label: "Alumni", href: "https://www.uagc.edu/student-experience/alumni" },
          { label: "Graduation", href: "https://www.uagc.edu/student-experience/graduation" },
          { label: "Clubs & Organizations", href: "https://www.uagc.edu/student-experience/clubs" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About UAGC",
    href: "https://www.uagc.edu/about",
    columns: [
      {
        title: "About",
        links: [
          { label: "Why UAGC", href: "https://www.uagc.edu/about/why-uagc" },
          { label: "Accreditations", href: "https://www.uagc.edu/about/accreditations" },
          { label: "UA Affiliation", href: "https://www.uagc.edu/about/uagc-affiliation-with-uofarizona" },
        ],
      },
      {
        title: "News & Leadership",
        links: [
          { label: "Blog", href: "https://www.uagc.edu/blog" },
          { label: "Faculty", href: "https://www.uagc.edu/about/faculty" },
          { label: "Contact UAGC", href: "https://www.uagc.edu/contact" },
        ],
      },
    ],
  },
];

export const HOME_SECTION_NAV = [
  { id: "our-goal", label: "Our Goal" },
  { id: "interests", label: "Interests" },
  { id: "why-uagc", label: "Why UAGC" },
  { id: "stories", label: "Testimonials" },
  { id: "degree-path", label: "Degree Path" },
  { id: "rfi", label: "Request Info" },
] as const;
