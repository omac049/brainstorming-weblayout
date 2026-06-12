"use client";

import { CheckCircle2, Mail, FileText, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SubmissionReceiptSectionProps {
  confirmationId?: string;
  email?: string | null;
  programName?: string | null;
  className?: string;
}

export function SubmissionReceiptSection({
  confirmationId = "7717243",
  email,
  programName,
  className,
}: SubmissionReceiptSectionProps) {
  const maskedEmail = email
    ? `${email.slice(0, 2)}${"*".repeat(Math.max(email.indexOf("@") - 2, 2))}${email.slice(email.indexOf("@"))}`
    : null;

  return (
    <section
      className={cn("bg-white py-10 sm:py-12", className)}
      aria-label="Submission receipt"
    >
      <div className="mx-auto w-full max-w-[560px] px-4 sm:px-6">
        <div className="rounded-2xl border border-uagc-border bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-5 text-green-600" aria-hidden />
            </div>
            <div>
              <p className="text-base font-bold text-uagc-navy">
                You&apos;re all set
              </p>
              <p className="text-xs text-uagc-gray">
                Request submitted successfully
              </p>
            </div>
          </div>

          {/* Receipt rows */}
          <dl className="mt-6 divide-y divide-uagc-border">
            <div className="flex items-center gap-3 py-3">
              <FileText className="size-4 shrink-0 text-uagc-gray" aria-hidden />
              <dt className="text-sm text-uagc-gray">Reference</dt>
              <dd className="ml-auto text-sm font-semibold text-uagc-navy">
                #{confirmationId}
              </dd>
            </div>

            {maskedEmail && (
              <div className="flex items-center gap-3 py-3">
                <Mail className="size-4 shrink-0 text-uagc-gray" aria-hidden />
                <dt className="text-sm text-uagc-gray">Confirmation sent to</dt>
                <dd className="ml-auto text-sm font-semibold text-uagc-navy">
                  {maskedEmail}
                </dd>
              </div>
            )}

            {programName && (
              <div className="flex items-center gap-3 py-3">
                <FileText className="size-4 shrink-0 text-uagc-gray" aria-hidden />
                <dt className="text-sm text-uagc-gray">Program</dt>
                <dd className="ml-auto text-right text-sm font-semibold text-uagc-navy">
                  {programName}
                </dd>
              </div>
            )}

            <div className="flex items-center gap-3 py-3">
              <Clock className="size-4 shrink-0 text-uagc-gray" aria-hidden />
              <dt className="text-sm text-uagc-gray">Response time</dt>
              <dd className="ml-auto text-sm font-medium text-uagc-navy">
                Within 1 business day
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
