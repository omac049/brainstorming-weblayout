import {
  BadgePercent,
  Briefcase,
  DollarSign,
  GraduationCap,
  Heart,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface SaveOption {
  id: string;
  icon: LucideIcon;
  title: string;
  stat: string;
  statLabel: string;
  summary: string;
  details: string[];
  qualifier?: string;
}

export const WAYS_TO_SAVE: SaveOption[] = [
  {
    id: "fafsa",
    icon: Shield,
    title: "Federal Financial Aid & Grants",
    stat: "94%",
    statLabel: "of students qualify",
    summary:
      "Pell Grants, federal loans, and need-based aid can cover most or all of your tuition.",
    details: [
      "Complete the FAFSA (~30 min) to see what you qualify for — no cost to apply",
      "Pell Grants up to $7,395/year don't need to be repaid — that covers roughly 5 courses",
      "Federal student loans with fixed rates and income-driven repayment options",
    ],
    qualifier: "2023–2024 IPEDS Student Financial Aid Survey",
  },
  {
    id: "military",
    icon: GraduationCap,
    title: "Military & Veteran Benefits",
    stat: "$250",
    statLabel: "/credit",
    summary:
      "GI Bill, tuition assistance, and Yellow Ribbon — we help you use every benefit you've earned.",
    details: [
      "Liberty Grant: $250/credit undergrad, $350/credit master's — plus waived fees",
      "Post-9/11 GI Bill, Montgomery GI Bill, and Yellow Ribbon accepted",
      "Military training and experience evaluated for college credit",
    ],
  },
  {
    id: "employer",
    icon: Briefcase,
    title: "Employer Tuition Programs",
    stat: "1,500+",
    statLabel: "partners",
    summary:
      "Many employers will pay part or all of your tuition — we'll help you find out.",
    details: [
      "Partners include T-Mobile, Walgreens, USPS, Edward Jones, J.B. Hunt, and more",
      "Many partners offer full tuition reimbursement — some students pay $0 out of pocket",
      "Your advisor can check eligibility with your employer, even if they're not on the list",
      "Community organizations and workforce boards can also connect their participants to these benefits",
    ],
  },
  {
    id: "scholarships",
    icon: BadgePercent,
    title: "UAGC Scholarships",
    stat: "$0",
    statLabel: "to repay",
    summary:
      "Merit-based and need-based scholarships for new and returning students.",
    details: [
      "First-generation, transfer, community service, and leadership awards available",
      "Access to external scholarship matching platforms at no cost",
      "No separate application — your advisor helps identify the best options",
    ],
  },
  {
    id: "transfer",
    icon: DollarSign,
    title: "Transfer Credits Save Money",
    stat: "41.5",
    statLabel: "avg credits accepted",
    summary:
      "Every credit that transfers is a credit you don't pay for again.",
    details: [
      "No cap on approved bachelor's transfer credits from regionally accredited institutions",
      "Prior Learning Assessment turns work experience into credit",
      "Free transcript evaluation before you enroll — know exactly where you stand",
    ],
  },
  {
    id: "zero-start",
    icon: Heart,
    title: "$0 to Get Started",
    stat: "$0",
    statLabel: "application fee",
    summary:
      "No application fee, no entrance exams, no surprise costs upfront.",
    details: [
      "$0 application fee — explore your options without financial risk",
      "No SAT, ACT, GRE, or GMAT required",
      "Flexible payment plans available for any out-of-pocket costs",
    ],
  },
];

export const WAYS_TO_SAVE_LEAD_STAT = {
  value: "86%",
  headline: "of UAGC students receive financial aid",
  qualifier: "2023–2024 IPEDS Student Financial Aid Survey",
} as const;
