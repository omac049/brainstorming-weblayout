"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface BlogNewsletterSignupProps {
  className?: string;
  variant?: "sidebar" | "inline";
}

export function BlogNewsletterSignup({
  className,
  variant = "sidebar",
}: BlogNewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-2xl bg-uagc-navy px-6 py-10 text-center animate-in fade-in zoom-in-95 duration-300",
          className,
        )}
      >
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-500/15">
          <Check className="size-5 text-green-400" />
        </div>
        <p className="text-[0.9375rem] font-semibold text-white">
          You&apos;re subscribed!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          Look for our next newsletter in your inbox.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <aside
        className={cn(
          "overflow-hidden rounded-2xl bg-uagc-navy px-6 py-8 sm:px-10 sm:py-10",
          className,
        )}
        data-module="blog-newsletter-inline"
      >
        <div className="mx-auto max-w-md text-center">
          <h3 className="border-l-[3px] border-uagc-gold pl-3.5 text-left font-['Fira_Sans',sans-serif] text-lg font-bold tracking-tight text-white sm:text-xl">
            Get Career &amp; Education Insights
          </h3>
          <p className="mt-3 text-left text-sm leading-relaxed text-white/55">
            Weekly tips on degrees, careers, and financial aid — straight to
            your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div
              className={cn(
                "flex rounded-xl border transition-[border-color,box-shadow] duration-200 ease-out",
                focused
                  ? "border-uagc-gold/50 ring-2 ring-uagc-gold/20"
                  : "border-white/15",
              )}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Email address"
                required
                className="min-w-0 flex-1 rounded-l-xl bg-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="group flex shrink-0 items-center gap-1.5 rounded-r-xl bg-uagc-gold px-5 py-3 text-sm font-bold text-uagc-navy transition-[background-color,transform] duration-160 ease-out hover:bg-uagc-gold-hover active:scale-[0.97]"
              >
                Subscribe
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-active:translate-x-1"
                  aria-hidden
                />
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-white/40">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </aside>
    );
  }

  return (
    <div
      className={cn("overflow-hidden rounded-2xl bg-uagc-navy p-5", className)}
      data-module="blog-newsletter-sidebar"
    >
      <div className="mb-5 h-0.5 w-8 rounded-full bg-uagc-gold" />

      <h3 className="text-sm font-bold tracking-tight text-white">
        Stay Informed
      </h3>
      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/50">
        Weekly insights on degrees, careers, and financial aid.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-[border-color,box-shadow] duration-200 ease-out focus:border-uagc-gold/50 focus:outline-none focus:ring-2 focus:ring-uagc-gold/20"
        />
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-uagc-gold px-4 py-3 text-sm font-bold text-uagc-navy transition-[background-color,transform] duration-160 ease-out hover:bg-uagc-gold-hover active:scale-[0.97]"
        >
          Subscribe
          <ArrowRight
            className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-active:translate-x-1"
            aria-hidden
          />
        </button>
      </form>
      <p className="mt-3.5 text-center text-[0.6875rem] text-white/30">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
