const UAGC_ORIGIN = "https://www.uagc.edu";

export interface UagcBlogPost {
  title: string;
  description: string;
  category: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

/** Latest featured posts from https://www.uagc.edu/blog (Jun 2026 capture). */
export const LATEST_UAGC_BLOG_POSTS: UagcBlogPost[] = [
  {
    title: "How to Use AI Without Letting It Do the Thinking for You",
    description:
      "Faculty member Nathan Pritts on using AI as a tool while keeping learning rooted in your own thinking.",
    category: "Industry Insights",
    date: "Jun 4, 2026",
    imageSrc: `${UAGC_ORIGIN}/sites/default/files/styles/featured_article_590x330/public/GettyImages-1300579577_UseAIwithoutItThining_Pitts_TLBlog2Hero.jpg?h=b1a91ebe&itok=9lrwdb0L`,
    imageAlt: "How to Use AI Without Letting It Do the Thinking for You",
    href: `${UAGC_ORIGIN}/blog/how-use-ai-without-letting-it-do-thinking-you`,
  },
  {
    title: "Celebrating the United States Army's Birthday",
    description:
      "Honoring Army heritage and the service members pursuing their degrees at UAGC.",
    category: "Military",
    date: "Jun 2, 2026",
    imageSrc: `${UAGC_ORIGIN}/sites/default/files/styles/featured_article_590x330/public/GettyImages-1656843579_armyBdayBlogHero_0.jpg?h=199d8c1f&itok=TN5ygMG9`,
    imageAlt: "Celebrating the United States Army's Birthday",
    href: `${UAGC_ORIGIN}/blog/celebrating-united-states-armys-birthday`,
  },
  {
    title: "UAGC Student Simona Thomas Redefines What It Means to Live Simply",
    description:
      "How one UAGC student balances education, family, and a commitment to living with purpose.",
    category: "Student Lifestyle and Success",
    date: "May 29, 2026",
    imageSrc: `${UAGC_ORIGIN}/sites/default/files/styles/featured_article_590x330/public/Simona%20Thomas%20blog%20hero.jpg?h=eca34813&itok=EBZ4ZRe8`,
    imageAlt: "UAGC Student Simona Thomas Redefines What It Means to Live Simply",
    href: `${UAGC_ORIGIN}/student-experience/success-stories/Simona-Thomas`,
  },
];

export const UAGC_BLOG_URL = `${UAGC_ORIGIN}/blog`;
