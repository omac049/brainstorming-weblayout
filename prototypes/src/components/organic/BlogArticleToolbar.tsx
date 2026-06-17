"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Printer, Minus, Plus, Volume2, Pause, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { BlogShareButtons } from "@/components/organic/BlogShareButtons";

interface BlogArticleToolbarProps {
  title: string;
  className?: string;
}

const FONT_SCALE_STEPS = [100, 112, 125, 137] as const;
type FontStep = 0 | 1 | 2 | 3;

type ListenState = "idle" | "loading" | "playing" | "paused";

export function BlogArticleToolbar({
  title,
  className,
}: BlogArticleToolbarProps) {
  const [fontStep, setFontStep] = useState<FontStep>(0);
  const [listenState, setListenState] = useState<ListenState>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [hasSpeech, setHasSpeech] = useState(false);

  useEffect(() => {
    setHasSpeech("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleListen = () => {
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;

    switch (listenState) {
      case "idle": {
        const article = document.querySelector("article");
        if (!article) return;

        const text = article.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.onend = () => setListenState("idle");
        utterance.onerror = () => setListenState("idle");
        utteranceRef.current = utterance;
        setListenState("playing");
        synth.speak(utterance);
        break;
      }
      case "playing":
        synth.pause();
        setListenState("paused");
        break;
      case "paused":
        synth.resume();
        setListenState("playing");
        break;
      case "loading":
        break;
      default: {
        const _exhaustive: never = listenState;
        return _exhaustive;
      }
    }
  };

  const handleStopListen = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setListenState("idle");
  };

  const applyFontScale = useCallback((step: FontStep) => {
    const article = document.querySelector("article");
    if (!article) return;
    const scale = FONT_SCALE_STEPS[step];
    if (scale === 100) {
      article.style.removeProperty("font-size");
      article.removeAttribute("data-font-scaled");
    } else {
      article.style.fontSize = `${scale}%`;
      article.setAttribute("data-font-scaled", String(scale));
    }
  }, []);

  const handleFontIncrease = () => {
    const next = Math.min(fontStep + 1, FONT_SCALE_STEPS.length - 1) as FontStep;
    setFontStep(next);
    applyFontScale(next);
  };

  const handleFontDecrease = () => {
    const next = Math.max(fontStep - 1, 0) as FontStep;
    setFontStep(next);
    applyFontScale(next);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={cn(
        "border-b border-gray-100 pb-4",
        className,
      )}
    >
      {/* Desktop: single row — utilities left, share right */}
      <div className="hidden items-center justify-between gap-2 sm:flex">
        <div className="flex items-center gap-2">
          {hasSpeech && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleListen}
                aria-label={
                  listenState === "playing"
                    ? "Pause listening"
                    : listenState === "paused"
                      ? "Resume listening"
                      : "Listen to this article"
                }
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors",
                  listenState === "playing" || listenState === "paused"
                    ? "bg-uagc-navy/10 text-uagc-navy"
                    : "bg-gray-50 text-uagc-navy/60 hover:bg-uagc-navy/5 hover:text-uagc-navy active:bg-uagc-navy/8",
                )}
              >
                {listenState === "loading" && <Loader2 className="size-4 animate-spin" />}
                {listenState === "playing" && <Pause className="size-4" />}
                {(listenState === "idle" || listenState === "paused") && <Volume2 className="size-4" />}
                <span>
                  {listenState === "idle" && "Listen"}
                  {listenState === "loading" && "Loading…"}
                  {listenState === "playing" && "Pause"}
                  {listenState === "paused" && "Resume"}
                </span>
              </button>
              {(listenState === "playing" || listenState === "paused") && (
                <button
                  type="button"
                  onClick={handleStopListen}
                  aria-label="Stop listening"
                  className="ml-1 rounded-full px-2.5 py-2 text-xs font-semibold text-uagc-navy/50 hover:bg-uagc-navy/5 hover:text-uagc-navy active:bg-uagc-navy/8"
                >
                  Stop
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-0.5 rounded-full border border-gray-200 px-1.5 py-1">
            <button
              type="button"
              onClick={handleFontDecrease}
              disabled={fontStep === 0}
              aria-label="Decrease font size"
              className="flex size-7 items-center justify-center rounded-full text-uagc-navy/60 transition-colors hover:bg-uagc-navy/5 hover:text-uagc-navy active:bg-uagc-navy/8 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Minus className="size-3" />
            </button>
            <span
              className="min-w-8 text-center text-[11px] font-semibold tabular-nums text-uagc-navy/70"
              aria-live="polite"
              aria-label={`Font size ${FONT_SCALE_STEPS[fontStep]}%`}
            >
              {FONT_SCALE_STEPS[fontStep]}%
            </span>
            <button
              type="button"
              onClick={handleFontIncrease}
              disabled={fontStep === (FONT_SCALE_STEPS.length - 1) as FontStep}
              aria-label="Increase font size"
              className="flex size-7 items-center justify-center rounded-full text-uagc-navy/60 transition-colors hover:bg-uagc-navy/5 hover:text-uagc-navy active:bg-uagc-navy/8 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Plus className="size-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print article"
            className="flex size-9 items-center justify-center rounded-full text-uagc-navy/50 transition-colors hover:bg-uagc-navy/5 hover:text-uagc-navy active:bg-uagc-navy/8"
          >
            <Printer className="size-4" />
          </button>
        </div>

        <BlogShareButtons title={title} variant="inline" />
      </div>

      {/* Mobile: two rows for breathing room and proper touch targets */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Row 1: Listen + Font size */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasSpeech && (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleListen}
                  aria-label={
                    listenState === "playing"
                      ? "Pause listening"
                      : listenState === "paused"
                        ? "Resume listening"
                        : "Listen to this article"
                  }
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[0.8125rem] font-semibold transition-colors",
                    listenState === "playing" || listenState === "paused"
                      ? "bg-uagc-navy/10 text-uagc-navy"
                      : "bg-gray-50 text-uagc-navy/60 active:bg-uagc-navy/8",
                  )}
                >
                  {listenState === "loading" && <Loader2 className="size-[18px] animate-spin" />}
                  {listenState === "playing" && <Pause className="size-[18px]" />}
                  {(listenState === "idle" || listenState === "paused") && <Volume2 className="size-[18px]" />}
                  <span>
                    {listenState === "idle" && "Listen"}
                    {listenState === "loading" && "Loading…"}
                    {listenState === "playing" && "Pause"}
                    {listenState === "paused" && "Resume"}
                  </span>
                </button>
                {(listenState === "playing" || listenState === "paused") && (
                  <button
                    type="button"
                    onClick={handleStopListen}
                    aria-label="Stop listening"
                    className="ml-1.5 rounded-full px-3 py-2.5 text-[0.8125rem] font-semibold text-uagc-navy/50 active:bg-uagc-navy/8"
                  >
                    Stop
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Font size stepper — right-aligned on mobile row 1 */}
          <div className="flex items-center gap-0.5 rounded-full border border-gray-200 px-2 py-1.5">
            <button
              type="button"
              onClick={handleFontDecrease}
              disabled={fontStep === 0}
              aria-label="Decrease font size"
              className="flex size-8 items-center justify-center rounded-full text-uagc-navy/60 transition-colors active:bg-uagc-navy/8 disabled:opacity-30"
            >
              <Minus className="size-3.5" />
            </button>
            <span
              className="min-w-9 text-center text-xs font-semibold tabular-nums text-uagc-navy/70"
              aria-live="polite"
              aria-label={`Font size ${FONT_SCALE_STEPS[fontStep]}%`}
            >
              {FONT_SCALE_STEPS[fontStep]}%
            </span>
            <button
              type="button"
              onClick={handleFontIncrease}
              disabled={fontStep === (FONT_SCALE_STEPS.length - 1) as FontStep}
              aria-label="Increase font size"
              className="flex size-8 items-center justify-center rounded-full text-uagc-navy/60 transition-colors active:bg-uagc-navy/8 disabled:opacity-30"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Row 2: Share icons — full width, evenly spaced */}
        <BlogShareButtons title={title} variant="inline" />
      </div>
    </div>
  );
}
