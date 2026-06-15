"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface BlogBackToTopProps {
  threshold?: number;
  className?: string;
}

export function BlogBackToTop({
  threshold = 600,
  className,
}: BlogBackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-20 right-4 z-40 flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:bg-uagc-navy hover:text-white sm:bottom-24 sm:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
