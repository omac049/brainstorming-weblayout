import Link from "next/link";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { RelatedArticle } from "@/lib/organic-blog-data";

interface BlogRelatedArticlesProps {
  articles: RelatedArticle[];
  className?: string;
}

function ArticleCard({ article }: { article: RelatedArticle }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category overlay */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-uagc-navy backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-uagc-navy transition-colors group-hover:text-uagc-red sm:text-lg">
          {article.title}
        </h3>
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-uagc-navy/50">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden />
            {article.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogRelatedArticles({
  articles,
  className,
}: BlogRelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className={cn("bg-uagc-cream py-14 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="mb-8 text-center font-['Fira_Sans',sans-serif] text-2xl font-bold text-uagc-navy sm:text-3xl">
            Related Articles
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 100}>
              <ArticleCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
