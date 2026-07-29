"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_NAME = "RFIsubmited";
const PORTAL_COOKIE = "uagc_portal_url";
const DEFAULT_PORTAL = "https://cloud.mail.uagc.edu/apply";
const MAX_AGE = 31536000; // 1 year

export interface RfiState {
  submitted: boolean;
  portalUrl: string;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

/**
 * Reads/writes the `RFIsubmited=true` cookie (live-site spelling) and
 * the `uagc_portal_url` cookie that stores the personalized portal link.
 *
 * Returns `[state, setSubmitted]` where `state.portalUrl` falls back to
 * the generic apply URL when no personalized link is stored.
 *
 * Append `?resetRfi=true` to any URL to clear both cookies (demo use).
 */
export function useRfiSubmitted(): [RfiState, (portalUrl?: string) => void] {
  const searchParams = useSearchParams();
  const [state, setState] = useState<RfiState>({
    submitted: false,
    portalUrl: DEFAULT_PORTAL,
  });

  useEffect(() => {
    if (searchParams.get("resetRfi") === "true") {
      clearCookie(COOKIE_NAME);
      clearCookie(PORTAL_COOKIE);
      setState({ submitted: false, portalUrl: DEFAULT_PORTAL });
      return;
    }

    const submitted = getCookie(COOKIE_NAME) === "true";
    const portalUrl = getCookie(PORTAL_COOKIE) || DEFAULT_PORTAL;
    setState({ submitted, portalUrl });
  }, [searchParams]);

  const setSubmitted = useCallback((portalUrl?: string) => {
    setCookie(COOKIE_NAME, "true");
    if (portalUrl) setCookie(PORTAL_COOKIE, portalUrl);
    setState({
      submitted: true,
      portalUrl: portalUrl || DEFAULT_PORTAL,
    });
  }, []);

  return [state, setSubmitted];
}
