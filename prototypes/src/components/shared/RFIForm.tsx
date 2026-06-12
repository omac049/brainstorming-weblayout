"use client";

import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";

import { usePublishElementHeight } from "@/hooks/usePublishElementHeight";

import {
  AREAS_OF_INTEREST,
  DEFAULT_RFI_HEADING,
  DEGREE_PROGRAMS,
  TCPA_CONSENT_TEXT,
  US_STATES,
} from "@/lib/rfi-form-data";
import { cn } from "@/lib/utils";
import type { RFIFormData } from "@/types";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FieldError {
  field: string;
  message: string;
}

function validateFormData(data: RFIFormData): FieldError[] {
  const errors: FieldError[] = [];

  if (!data.firstname.trim()) {
    errors.push({ field: "firstname", message: "First name is required" });
  }
  if (!data.lastname.trim()) {
    errors.push({ field: "lastname", message: "Last name is required" });
  }
  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Enter a valid email address" });
  }
  if (!data.state) {
    errors.push({ field: "state", message: "State is required" });
  }
  if (!data.phone.trim()) {
    errors.push({ field: "phone", message: "Phone number is required" });
  } else if (!/^\d[\d\s\-()]{8,}$/.test(data.phone.trim())) {
    errors.push({ field: "phone", message: "Enter a valid phone number" });
  }
  if (!data.college_of_interest) {
    errors.push({ field: "college_of_interest", message: "Select an area of interest" });
  }
  if (!data.tcpa_checkbox) {
    errors.push({ field: "tcpa_checkbox", message: "Consent is required to proceed" });
  }

  return errors;
}

export interface RFIFormProps {
  variant: "mini" | "full" | "inline";
  heading?: string;
  className?: string;
  onSubmit?: (data: Record<string, string>) => void;
  /** Attach to the mini form root so sticky bar visibility can track hero form in viewport. */
  heroFormRef?: RefObject<HTMLDivElement | null>;
  initialValues?: Partial<RFIFormData>;
}

export interface RFIStickyBarProps {
  /** Hero mini form element — sticky bar hides while this is intersecting the viewport. */
  heroFormRef: RefObject<Element | null>;
  className?: string;
}

const STICKY_BAR_HEIGHT_CLASS =
  "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]";

const MINI_HEADING = "Request More Information";

const INITIAL_FORM_DATA: RFIFormData = {
  firstname: "",
  lastname: "",
  state: "",
  phone: "",
  email: "",
  college_of_interest: "",
  clientdegreeid: "",
  military_status: undefined,
  tcpa_checkbox: false,
};

const labelClass = "mb-1.5 block text-xs font-semibold text-uagc-navy sm:text-sm";
const inputClass = "rfi-input";
const inputErrorClass = "rfi-input border-red-500 ring-2 ring-red-100";
const primaryButtonClass = "rfi-button-primary";
const secondaryButtonClass =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-uagc-navy bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-uagc-navy transition-[background-color,transform] hover:bg-uagc-navy/5 focus-visible:ring-2 focus-visible:ring-uagc-navy focus-visible:ring-offset-2 motion-safe:active:scale-98";

function toSubmitRecord(data: RFIFormData): Record<string, string> {
  const record: Record<string, string> = {
    firstname: data.firstname,
    lastname: data.lastname,
    state: data.state,
    phone: data.phone,
    email: data.email,
    college_of_interest: data.college_of_interest,
    clientdegreeid: data.clientdegreeid,
    tcpa_checkbox: data.tcpa_checkbox ? "true" : "false",
  };

  if (data.military_status) {
    record.military_status = data.military_status;
  }

  return record;
}

async function handleFormSubmit(
  data: RFIFormData,
  onSubmit?: (data: Record<string, string>) => void,
  setStatus?: (s: SubmitStatus) => void,
) {
  setStatus?.("submitting");
  const payload = toSubmitRecord(data);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("RFI form submission:", payload);
    onSubmit?.(payload);
    setStatus?.("success");
  } catch {
    setStatus?.("error");
  }
}

function FieldErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-600" role="alert">
      <AlertCircle className="size-3 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function SuccessState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center" role="status">
      <span className="flex size-14 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 className="size-8 text-green-600" strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="font-heading text-lg font-semibold text-uagc-navy">
          Thank You!
        </h3>
        <p className="mt-1 text-sm text-uagc-gray">
          Your request has been submitted. An enrollment advisor will reach out
          within one business day.
        </p>
      </div>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-sm font-medium text-uagc-navy underline underline-offset-2 hover:text-uagc-red"
        >
          Submit another request
        </button>
      ) : null}
    </div>
  );
}

function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
      role="alert"
    >
      <AlertCircle className="size-5 shrink-0 text-red-600" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-red-800">
          Something went wrong. Please try again.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 text-sm font-semibold text-red-700 underline underline-offset-2 hover:text-red-900"
      >
        Retry
      </button>
    </div>
  );
}

interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

function FieldLabel({ htmlFor, children, required }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      {required ? (
        <span className="text-uagc-red" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

interface AreaOfInterestFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hideLabel?: boolean;
}

function AreaOfInterestField({
  id,
  value,
  onChange,
  required = true,
  hideLabel = false,
}: AreaOfInterestFieldProps) {
  return (
    <div>
      {hideLabel ? (
        <label htmlFor={id} className="sr-only">
          Area of Interest
        </label>
      ) : (
        <FieldLabel htmlFor={id} required={required}>
          Area of Interest
        </FieldLabel>
      )}
      <select
        id={id}
        name="college_of_interest"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={inputClass}
      >
        <option value="">Select an Area of Interest</option>
        {AREAS_OF_INTEREST.map((area) => (
          <option key={area.value} value={area.value}>
            {area.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface DegreeFieldProps {
  id: string;
  areaOfInterest: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hideLabel?: boolean;
}

function DegreeField({
  id,
  areaOfInterest,
  value,
  onChange,
  required = false,
  hideLabel = false,
}: DegreeFieldProps) {
  const degrees = useMemo(
    () =>
      areaOfInterest
        ? DEGREE_PROGRAMS.filter((d) => d.areaOfInterest === areaOfInterest)
        : [],
    [areaOfInterest],
  );

  return (
    <div>
      {hideLabel ? (
        <label htmlFor={id} className="sr-only">
          Select Your Degree
        </label>
      ) : (
        <FieldLabel htmlFor={id}>Select Your Degree</FieldLabel>
      )}
      <select
        id={id}
        name="clientdegreeid"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required && degrees.length > 0}
        disabled={!areaOfInterest}
        className={cn(inputClass, !areaOfInterest && "cursor-not-allowed opacity-60")}
      >
        <option value="">
          {areaOfInterest ? "Select Your Degree" : "Select area of interest first"}
        </option>
        {degrees.map((degree) => (
          <option key={degree.value} value={degree.value}>
            {degree.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type PersonalFieldKey = "firstname" | "lastname" | "email" | "state" | "phone";

interface PersonalFieldsProps {
  formData: RFIFormData;
  onFieldChange: <K extends keyof RFIFormData>(
    key: K,
    value: RFIFormData[K],
  ) => void;
  idPrefix?: string;
  layout?: "stacked" | "grid";
  includeDegree?: boolean;
  hiddenFields?: PersonalFieldKey[];
  fieldErrors?: FieldError[];
}

function PersonalFields({
  formData,
  onFieldChange,
  idPrefix = "rfi",
  layout = "stacked",
  includeDegree = true,
  hiddenFields = [],
  fieldErrors = [],
}: PersonalFieldsProps) {
  const hidden = new Set(hiddenFields);
  const gridClass =
    layout === "grid"
      ? "grid gap-4 sm:grid-cols-2"
      : "flex flex-col gap-3";

  const getError = (field: string) =>
    fieldErrors.find((e) => e.field === field)?.message;

  return (
    <div className={gridClass}>
      {!hidden.has("firstname") ? (
        <div>
          <FieldLabel htmlFor={`${idPrefix}-firstname`} required>
            First Name
          </FieldLabel>
          <input
            id={`${idPrefix}-firstname`}
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={(e) => onFieldChange("firstname", e.target.value)}
            required
            autoComplete="given-name"
            aria-invalid={!!getError("firstname")}
            className={getError("firstname") ? inputErrorClass : inputClass}
          />
          <FieldErrorMessage message={getError("firstname")} />
        </div>
      ) : null}
      {!hidden.has("lastname") ? (
        <div>
          <FieldLabel htmlFor={`${idPrefix}-lastname`} required>
            Last Name
          </FieldLabel>
          <input
            id={`${idPrefix}-lastname`}
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={(e) => onFieldChange("lastname", e.target.value)}
            required
            autoComplete="family-name"
            aria-invalid={!!getError("lastname")}
            className={getError("lastname") ? inputErrorClass : inputClass}
          />
          <FieldErrorMessage message={getError("lastname")} />
        </div>
      ) : null}
      {!hidden.has("state") ? (
        <div>
          <FieldLabel htmlFor={`${idPrefix}-state`} required>
            State
          </FieldLabel>
          <select
            id={`${idPrefix}-state`}
            name="state"
            value={formData.state}
            onChange={(e) => onFieldChange("state", e.target.value)}
            required
            autoComplete="address-level1"
            aria-invalid={!!getError("state")}
            className={getError("state") ? inputErrorClass : inputClass}
          >
            <option value="">Select state</option>
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          <FieldErrorMessage message={getError("state")} />
        </div>
      ) : null}
      {!hidden.has("phone") ? (
        <div>
          <FieldLabel htmlFor={`${idPrefix}-phone`} required>
            Phone
          </FieldLabel>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            required
            autoComplete="tel"
            placeholder="123 123 1234"
            aria-invalid={!!getError("phone")}
            className={getError("phone") ? inputErrorClass : inputClass}
          />
          <FieldErrorMessage message={getError("phone")} />
        </div>
      ) : null}
      {!hidden.has("email") ? (
        <div className={layout === "grid" ? "sm:col-span-2" : undefined}>
          <FieldLabel htmlFor={`${idPrefix}-email`} required>
            Email
          </FieldLabel>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            required
            autoComplete="email"
            aria-invalid={!!getError("email")}
            className={getError("email") ? inputErrorClass : inputClass}
          />
          <FieldErrorMessage message={getError("email")} />
        </div>
      ) : null}
      {includeDegree ? (
        <div className={layout === "grid" ? "sm:col-span-2" : undefined}>
          <DegreeField
            id={`${idPrefix}-degree`}
            areaOfInterest={formData.college_of_interest}
            value={formData.clientdegreeid}
            onChange={(value) => onFieldChange("clientdegreeid", value)}
          />
        </div>
      ) : null}
    </div>
  );
}

interface MilitaryFieldProps {
  value: RFIFormData["military_status"];
  onChange: (value: "yes" | "no") => void;
  name?: string;
}

function MilitaryField({
  value,
  onChange,
  name = "military_status",
}: MilitaryFieldProps) {
  return (
    <fieldset>
      <legend className={labelClass}>
        Are you a member of the military?
      </legend>
      <div className="mt-2 flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-uagc-dark">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={() => onChange("yes")}
            className="size-4 accent-uagc-gold"
          />
          Yes
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-uagc-dark">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={() => onChange("no")}
            className="size-4 accent-uagc-gold"
          />
          No
        </label>
      </div>
    </fieldset>
  );
}

interface TcpaFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

function TcpaField({ checked, onChange, id = "rfi-tcpa" }: TcpaFieldProps) {
  return (
    <div className="flex gap-3">
      <input
        id={id}
        name="tcpa_checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-1 size-4 shrink-0 accent-uagc-gold"
      />
      <label htmlFor={id} className="text-xs leading-relaxed text-uagc-gray">
        {TCPA_CONSENT_TEXT}
      </label>
    </div>
  );
}

interface StepHeaderProps {
  step: 1 | 2;
}

function StepHeader({ step }: StepHeaderProps) {
  return (
    <div className="mb-3 sm:mb-5">
      <h3 className="mb-1.5 text-center font-heading text-base font-semibold leading-tight text-uagc-navy sm:mb-3 sm:text-lg">
        {MINI_HEADING}
      </h3>
      <div
        className="flex items-center justify-center gap-1.5"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={2}
        aria-label={`Step ${step} of 2`}
      >
        <span
          className={cn(
            "size-1.5 rounded-full transition-colors sm:size-2",
            step === 1 ? "bg-uagc-gold" : "bg-uagc-border",
          )}
          aria-hidden
        />
        <span
          className={cn(
            "size-1.5 rounded-full transition-colors sm:size-2",
            step === 2 ? "bg-uagc-gold" : "bg-uagc-border",
          )}
          aria-hidden
        />
      </div>
      <p className="mt-1 text-center text-xs text-uagc-gray sm:mt-2">Step {step} of 2</p>
    </div>
  );
}

function MiniRFIForm({
  className,
  onSubmit,
  heroFormRef,
}: Pick<RFIFormProps, "className" | "onSubmit" | "heroFormRef">) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RFIFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [stepOneError, setStepOneError] = useState("");

  const updateField = <K extends keyof RFIFormData>(
    key: K,
    value: RFIFormData[K],
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "college_of_interest") {
        next.clientdegreeid = "";
      }
      return next;
    });
    setErrors((prev) => prev.filter((e) => e.field !== key));
    if (key === "college_of_interest") setStepOneError("");
  };

  const handleStepOne = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.college_of_interest) {
      setStepOneError("Please select an area of interest to continue");
      return;
    }
    setStepOneError("");
    setStep(2);
  };

  const handleStepTwo = (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validateFormData(formData);
    if (fieldErrors.length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors([]);
    handleFormSubmit(formData, onSubmit, setStatus);
  };

  const getFieldError = useCallback(
    (field: string) => errors.find((e) => e.field === field)?.message,
    [errors],
  );

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setStatus("idle");
    setErrors([]);
  };

  if (status === "success") {
    return (
      <div
        ref={heroFormRef}
        data-rfi-hero-form
        className={cn("w-full rounded-lg bg-white px-3.5 py-3 shadow-sm ring-1 ring-gray-100 sm:p-5", className)}
      >
        <SuccessState onReset={handleReset} />
      </div>
    );
  }

  return (
    <div
      ref={heroFormRef}
      data-rfi-hero-form
      className={cn("w-full rounded-lg bg-white px-3.5 py-3 shadow-sm ring-1 ring-gray-100 sm:p-5", className)}
    >
      <StepHeader step={step} />

      {status === "error" ? (
        <div className="mb-4">
          <ErrorBanner onRetry={() => setStatus("idle")} />
        </div>
      ) : null}

      {step === 1 ? (
        <form onSubmit={handleStepOne} className="flex flex-col gap-3.5">
          <div>
            <AreaOfInterestField
              id="rfi-mini-area"
              value={formData.college_of_interest}
              onChange={(value) => updateField("college_of_interest", value)}
            />
            <FieldErrorMessage message={stepOneError} />
          </div>
          <DegreeField
            id="rfi-mini-degree"
            areaOfInterest={formData.college_of_interest}
            value={formData.clientdegreeid}
            onChange={(value) => updateField("clientdegreeid", value)}
          />
          <button type="submit" className={cn(primaryButtonClass, "mt-1 w-full")}>
            Get Started
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleStepTwo} className="flex flex-col gap-3">
          <PersonalFields
            formData={formData}
            onFieldChange={updateField}
            idPrefix="rfi-mini"
            includeDegree={false}
            fieldErrors={errors}
          />
          <MilitaryField
            value={formData.military_status}
            onChange={(value) => updateField("military_status", value)}
            name="rfi-mini-military"
          />
          <div>
            <TcpaField
              id="rfi-mini-tcpa"
              checked={formData.tcpa_checkbox}
              onChange={(checked) => updateField("tcpa_checkbox", checked)}
            />
            <FieldErrorMessage message={getFieldError("tcpa_checkbox")} />
          </div>
          <div className="mt-1 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={cn(secondaryButtonClass, "sm:w-auto")}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(primaryButtonClass, "flex-1")}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function FullStepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div
      className="mb-6 flex items-center justify-center gap-3"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={2}
      aria-label={`Step ${step} of 2`}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
            step === 1
              ? "bg-uagc-gold text-uagc-navy"
              : "bg-uagc-gold/20 text-uagc-navy",
          )}
        >
          1
        </span>
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            step === 1 ? "text-uagc-navy" : "text-uagc-gray",
          )}
        >
          Program
        </span>
      </div>
      <div className="h-px w-8 bg-gray-300" aria-hidden />
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
            step === 2
              ? "bg-uagc-gold text-uagc-navy"
              : "bg-gray-200 text-uagc-gray",
          )}
        >
          2
        </span>
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            step === 2 ? "text-uagc-navy" : "text-uagc-gray",
          )}
        >
          Your Info
        </span>
      </div>
    </div>
  );
}

function FullRFIForm({
  heading = DEFAULT_RFI_HEADING,
  className,
  onSubmit,
  initialValues,
}: Pick<RFIFormProps, "heading" | "className" | "onSubmit" | "initialValues">) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RFIFormData>({
    ...INITIAL_FORM_DATA,
    ...initialValues,
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [stepOneError, setStepOneError] = useState("");
  const [prevInitialValues, setPrevInitialValues] = useState(initialValues);

  if (initialValues !== prevInitialValues) {
    setPrevInitialValues(initialValues);
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }

  const updateField = <K extends keyof RFIFormData>(
    key: K,
    value: RFIFormData[K],
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "college_of_interest") {
        next.clientdegreeid = "";
      }
      return next;
    });
    setErrors((prev) => prev.filter((e) => e.field !== key));
    if (key === "college_of_interest") setStepOneError("");
  };

  const getFieldError = useCallback(
    (field: string) => errors.find((e) => e.field === field)?.message,
    [errors],
  );

  const handleStepOne = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.college_of_interest) {
      setStepOneError("Please select an area of interest to continue");
      return;
    }
    setStepOneError("");
    setStep(2);
  };

  const handleStepTwo = (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validateFormData(formData);
    if (fieldErrors.length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors([]);
    handleFormSubmit(formData, onSubmit, setStatus);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setStatus("idle");
    setErrors([]);
  };

  if (status === "success") {
    return (
      <div className={cn("rounded-xl bg-white p-6 shadow-lg sm:p-10", className)}>
        <SuccessState onReset={handleReset} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl bg-white p-6 shadow-lg sm:p-10",
        className,
      )}
    >
      <h2 className="type-h2 mb-2 text-center text-uagc-navy">
        {heading}
      </h2>

      <FullStepIndicator step={step} />

      {status === "error" ? (
        <div className="mb-6">
          <ErrorBanner onRetry={() => setStatus("idle")} />
        </div>
      ) : null}

      {step === 1 ? (
        <form onSubmit={handleStepOne} className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AreaOfInterestField
                id="rfi-full-area"
                value={formData.college_of_interest}
                onChange={(value) => updateField("college_of_interest", value)}
              />
              <FieldErrorMessage message={stepOneError} />
            </div>
            <DegreeField
              id="rfi-full-degree"
              areaOfInterest={formData.college_of_interest}
              value={formData.clientdegreeid}
              onChange={(value) => updateField("clientdegreeid", value)}
            />
          </div>
          <button
            type="submit"
            className={cn(primaryButtonClass, "w-full sm:w-auto sm:min-w-[260px] sm:self-center")}
          >
            Get Started
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleStepTwo} className="flex flex-col gap-5">
          <PersonalFields
            formData={formData}
            onFieldChange={updateField}
            idPrefix="rfi-full"
            layout="grid"
            includeDegree={false}
            fieldErrors={errors}
          />
          <MilitaryField
            value={formData.military_status}
            onChange={(value) => updateField("military_status", value)}
            name="rfi-full-military"
          />
          <div>
            <TcpaField
              id="rfi-full-tcpa"
              checked={formData.tcpa_checkbox}
              onChange={(checked) => updateField("tcpa_checkbox", checked)}
            />
            <FieldErrorMessage message={getFieldError("tcpa_checkbox")} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={cn(secondaryButtonClass, "sm:min-w-[140px]")}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(primaryButtonClass, "sm:min-w-[260px]")}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
                  Submitting...
                </>
              ) : (
                <>
                  Request Information
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function InlineRFIForm({
  className,
  onSubmit,
}: Pick<RFIFormProps, "className" | "onSubmit">) {
  const [formData, setFormData] = useState<RFIFormData>(INITIAL_FORM_DATA);

  const updateField = <K extends keyof RFIFormData>(
    key: K,
    value: RFIFormData[K],
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "college_of_interest") {
        next.clientdegreeid = "";
      }
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: Record<string, string> = {
      college_of_interest: formData.college_of_interest,
      clientdegreeid: formData.clientdegreeid,
    };
    console.log("RFI form submission:", payload);
    onSubmit?.(payload);
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-white p-5 shadow-lg sm:p-6",
        className,
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4"
      >
        <div className="min-w-0 flex-1">
          <FieldLabel htmlFor="rfi-inline-area" required>
            Area of Interest
          </FieldLabel>
          <AreaOfInterestField
            id="rfi-inline-area"
            value={formData.college_of_interest}
            onChange={(value) => updateField("college_of_interest", value)}
            hideLabel
          />
        </div>
        <div className="min-w-0 flex-1">
          <FieldLabel htmlFor="rfi-inline-degree">Select Your Degree</FieldLabel>
          <DegreeField
            id="rfi-inline-degree"
            areaOfInterest={formData.college_of_interest}
            value={formData.clientdegreeid}
            onChange={(value) => updateField("clientdegreeid", value)}
            hideLabel
          />
        </div>
        <button
          type="submit"
          className={cn(
            primaryButtonClass,
            "w-full shrink-0 md:w-auto md:whitespace-nowrap",
          )}
        >
          Get Started
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

export function RFIStickyBar({
  heroFormRef,
  className,
}: RFIStickyBarProps) {
  const [heroFormVisible, setHeroFormVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  usePublishElementHeight(barRef, "--uagc-sticky-rfi-height");

  useEffect(() => {
    const heroElement = heroFormRef.current;
    if (!heroElement) {
      queueMicrotask(() => setHeroFormVisible(false));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroFormVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -8px 0px",
      },
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, [heroFormRef]);

  return (
    <div
      ref={barRef}
      data-rfi-sticky-bar
      aria-hidden={heroFormVisible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-98 border-t border-white/10 bg-uagc-navy px-4 pt-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out md:hidden",
        STICKY_BAR_HEIGHT_CLASS,
        heroFormVisible
          ? "pointer-events-none translate-y-full"
          : "translate-y-0",
        className,
      )}
    >
      <p className="mb-1.5 text-center text-xs text-white/90">
        New classes start every few weeks — No obligation, $0 to apply
      </p>
      <a
        href="#rfi"
        tabIndex={heroFormVisible ? -1 : 0}
        className="rfi-button-primary flex min-h-11 w-full items-center justify-center gap-2 text-center"
      >
        Request More Information
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export function RFIForm({
  variant,
  heading,
  className,
  onSubmit,
  heroFormRef,
  initialValues,
}: RFIFormProps) {
  switch (variant) {
    case "mini":
      return (
        <MiniRFIForm
          className={className}
          onSubmit={onSubmit}
          heroFormRef={heroFormRef}
        />
      );
    case "full":
      return (
        <FullRFIForm
          heading={heading}
          className={className}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      );
    case "inline":
      return <InlineRFIForm className={className} onSubmit={onSubmit} />;
  }
}
