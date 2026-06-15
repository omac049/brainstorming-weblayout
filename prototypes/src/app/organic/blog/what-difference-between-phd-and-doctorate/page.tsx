import { BlogArticlePage } from "@/components/organic/BlogArticlePage";
import { BlogContextualCTA } from "@/components/organic/BlogContextualCTA";
import { BlogProgramFilter } from "@/components/organic/BlogProgramFilter";
import {
  PHD_VS_DOCTORATE_ARTICLE,
  PHD_BLOG_RELATED,
  DOCTORAL_PROGRAMS,
} from "@/lib/organic-blog-data";

export const metadata = {
  title:
    "What is the Difference Between a PhD and a Doctorate? | UAGC",
  description:
    "PhD vs. doctorate: understand the key differences between research-focused and practice-focused doctoral degrees, including the DPS, and find the right path for your career goals.",
};

export default function PhdVsDoctorateBlogPage() {
  return (
    <BlogArticlePage
      article={PHD_VS_DOCTORATE_ARTICLE}
      relatedArticles={PHD_BLOG_RELATED}
      sidebarContent={
        <BlogProgramFilter
          programs={DOCTORAL_PROGRAMS}
          heading="Find Your Doctoral Program"
          recommendedId="dps-org-leadership"
          relevantGoals={["career-advancement", "leadership", "academic-research"]}
        />
      }
      contextualCTA={
        <BlogContextualCTA
          headline="Ready to Lead, Not Just Research?"
          description="UAGC's Doctor of Professional Studies in Organizational Leadership is designed for experienced professionals who want to apply advanced research to real-world challenges — 100% online, in as few as 2.5 years."
          ctaText="Explore the DPS Program"
          ctaHref="https://www.uagc.edu/online-degrees/doctoral/dps-organizational-leadership"
          variant="business"
        />
      }
    />
  );
}
