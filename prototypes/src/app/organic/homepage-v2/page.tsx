"use client";

import { useEffect } from "react";

import { assetPath } from "@/lib/asset-path";

/** Legacy route — redirects to `/organic/homepage`. */
export default function HomepageV2Redirect() {
  useEffect(() => {
    window.location.replace(
      `${assetPath("/organic/homepage")}${window.location.search}${window.location.hash}`,
    );
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-uagc-navy px-4 text-center text-white">
      <p className="text-sm text-white/80">Redirecting to homepage…</p>
    </main>
  );
}
