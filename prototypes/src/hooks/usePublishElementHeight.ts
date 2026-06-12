"use client";

import { useEffect, type RefObject } from "react";

/**
 * Publishes a measured element height to a CSS custom property on :root.
 * Used for fixed sticky chrome (RFI bar, module bars) so offsets stay accurate.
 */
export function usePublishElementHeight(
  ref: RefObject<HTMLElement | null>,
  cssVar: string,
  enabled = true,
) {
  useEffect(() => {
    const root = document.documentElement;

    if (!enabled) {
      root.style.setProperty(cssVar, "0px");
      return;
    }

    const el = ref.current;
    if (!el) return;

    const update = () => {
      root.style.setProperty(cssVar, `${el.getBoundingClientRect().height}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      observer.disconnect();
      root.style.setProperty(cssVar, "0px");
    };
  }, [ref, cssVar, enabled]);
}
