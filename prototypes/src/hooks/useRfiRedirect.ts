"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Returns a submit handler that navigates to the prototype thank-you page
 * with firstName, area-of-interest, and a mock confirmation ID as query params.
 */
export function useRfiRedirect() {
  const router = useRouter();

  return useCallback(
    (data: Record<string, string>) => {
      const params = new URLSearchParams();
      if (data.firstname) params.set("firstName", data.firstname);
      if (data.college_of_interest)
        params.set("area", data.college_of_interest);
      params.set(
        "confirmationId",
        String(Math.floor(7700000 + Math.random() * 99999)),
      );
      router.push(
        `/organic/request-information/thank-you?${params.toString()}`,
      );
    },
    [router],
  );
}
