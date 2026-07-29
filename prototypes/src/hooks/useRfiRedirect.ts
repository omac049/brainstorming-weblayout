"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useRfiSubmitted } from "@/hooks/useRfiSubmitted";

/**
 * Returns a submit handler that:
 * 1. Sets the `RFIsubmited` + `uagc_portal_url` cookies
 * 2. Navigates to the prototype thank-you page with firstName,
 *    area-of-interest, and a mock confirmation ID as query params.
 *
 * The portal URL uses the same mock `sid` so the thank-you page CTA
 * and any subsequent Post RFI panel share the same personalized link.
 */
export function useRfiRedirect() {
  const router = useRouter();
  const [, setSubmitted] = useRfiSubmitted();

  return useCallback(
    (data: Record<string, string>) => {
      const confirmationId = String(
        Math.floor(7700000 + Math.random() * 99999),
      );

      const portalUrl = `https://cloud.mail.uagc.edu/apply?sid=${confirmationId}`;
      setSubmitted(portalUrl);

      const params = new URLSearchParams();
      if (data.firstname) params.set("firstName", data.firstname);
      if (data.college_of_interest)
        params.set("area", data.college_of_interest);
      params.set("confirmationId", confirmationId);

      router.push(
        `/organic/request-information/thank-you?${params.toString()}`,
      );
    },
    [router, setSubmitted],
  );
}
