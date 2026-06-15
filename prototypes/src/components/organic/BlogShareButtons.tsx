"use client";

import { useState, useEffect } from "react";
import { Share2, Link2, Check, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

interface BlogShareButtonsProps {
  title: string;
  url?: string;
  variant?: "floating" | "inline";
  className?: string;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SHARE_NETWORKS = [
  {
    id: "facebook",
    label: "Share on Facebook",
    icon: FacebookIcon,
    getUrl: (url: string, _title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "Share on X",
    icon: XIcon,
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    icon: LinkedInIcon,
    getUrl: (url: string, _title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "email",
    label: "Email this article",
    icon: Mail,
    getUrl: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
  },
] as const;

export function BlogShareButtons({
  title,
  url,
  variant = "inline",
  className,
}: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [articleUrl, setArticleUrl] = useState(url ?? "");

  useEffect(() => {
    if (!url) {
      setArticleUrl(window.location.href);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API may fail in some contexts */
    }
  };

  if (variant === "floating") {
    return (
      <div
        className={cn(
          "fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 xl:flex",
          className,
        )}
        aria-label="Share this article"
      >
        <span className="mb-1 text-center text-[10px] font-bold uppercase tracking-wider text-uagc-navy/40">
          Share
        </span>
        {SHARE_NETWORKS.map(({ id, label, icon: Icon, getUrl }) => (
          <a
            key={id}
            href={getUrl(articleUrl, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white text-uagc-navy/60 shadow-sm transition-all hover:border-uagc-navy/20 hover:text-uagc-navy hover:shadow-md"
          >
            <Icon className="size-4" />
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          className={cn(
            "flex size-9 items-center justify-center rounded-full border shadow-sm transition-all",
            copied
              ? "border-green-300 bg-green-50 text-green-600"
              : "border-gray-200 bg-white text-uagc-navy/60 hover:border-uagc-navy/20 hover:text-uagc-navy hover:shadow-md",
          )}
        >
          {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label="Share this article"
    >
      <Share2 className="size-3.5 text-uagc-navy/40" aria-hidden />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-uagc-navy/40">
        Share
      </span>
      {SHARE_NETWORKS.map(({ id, label, icon: Icon, getUrl }) => (
        <a
          key={id}
          href={getUrl(articleUrl, title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-8 items-center justify-center rounded-full text-uagc-navy/50 transition-colors hover:bg-uagc-navy/5 hover:text-uagc-navy"
        >
          <Icon className="size-3.5" />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-colors",
          copied
            ? "bg-green-50 text-green-600"
            : "text-uagc-navy/50 hover:bg-uagc-navy/5 hover:text-uagc-navy",
        )}
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
      </button>
    </div>
  );
}
