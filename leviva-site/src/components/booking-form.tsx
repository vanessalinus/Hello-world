"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { bookingFieldOptions } from "@/lib/validation";

type FieldErrors = Partial<Record<string, string[]>>;

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  sourceMarket: string;
  residenceCountry: string;
  travelerCount: string;
  tripLength: string;
  startDate: string;
  destinations: string[];
  interests: string[];
  budgetRange: string;
  accommodationStyle: string;
  notes: string;
  consent: boolean;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  sourceMarket: "USA",
  residenceCountry: "",
  travelerCount: "2",
  tripLength: "7 to 10 nights",
  startDate: "",
  destinations: ["Zanzibar", "Serengeti and Ngorongoro"],
  interests: ["Safari", "Beach"],
  budgetRange: "USD 3,000 to USD 5,000 per person",
  accommodationStyle: "Premium",
  notes: "",
  consent: true,
};

type BookingFormProps = {
  compact?: boolean;
};

export function BookingForm({ compact = false }: BookingFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({
    type: "idle",
  });

  const destinationOptions = bookingFieldOptions.destinationOptions;
  const interestOptions = bookingFieldOptions.interestOptions;

  const destinationLabel = useMemo(
    () =>
      values.destinations.length > 0
        ? `${values.destinations.length} destination${values.destinations.length > 1 ? "s" : ""} selected`
        : "Choose your destinations",
    [values.destinations],
  );

  function toggleArrayValue(
    field: "destinations" | "interests",
    option: string,
  ) {
    setValues((current) => {
      const exists = current[field].includes(option);

      return {
        ...current,
        [field]: exists
          ? current[field].filter((item) => item !== option)
          : [...current[field], option],
      };
    });
  }

  function updateValue(field: keyof FormValues, value: string | boolean) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });
    setFieldErrors({});

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          travelerCount: Number(values.travelerCount),
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setStatus({
          type: "error",
          message:
            result.error ??
            "Your request could not be sent. Please try again or contact Leviva directly.",
        });
        return;
      }

      setValues(initialValues);
      setStatus({
        type: "success",
        message:
          result.message ??
          "Your trip request has been sent. Leviva will follow up with a tailored itinerary.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Your request could not be sent. Please try again or contact Leviva directly.",
      });
    }
  }

  const wrapperClasses = compact
    ? "rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl shadow-slate-950/10"
    : "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-950/10 lg:p-10";

  return (
    <form className={wrapperClasses} onSubmit={handleSubmit}>
      <div className={compact ? "mb-6" : "mb-8"}>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
          Tailor-made booking planner
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Tell Leviva what you want to book
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Better trip details produce better first replies and faster conversion.
          Fill out the planner and Leviva can respond with the right safari, beach,
          or multi-country itinerary.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Full name
          </span>
          <input
            value={values.fullName}
            onChange={(event) => updateValue("fullName", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            placeholder="Jane Smith"
            name="fullName"
          />
          {fieldErrors.fullName?.[0] && (
            <p className="mt-2 text-xs text-rose-600">{fieldErrors.fullName[0]}</p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Email address
          </span>
          <input
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            placeholder="you@example.com"
            type="email"
            name="email"
          />
          {fieldErrors.email?.[0] && (
            <p className="mt-2 text-xs text-rose-600">{fieldErrors.email[0]}</p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Phone or WhatsApp
          </span>
          <input
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            placeholder="+1 555 123 456"
            name="phone"
          />
          {fieldErrors.phone?.[0] && (
            <p className="mt-2 text-xs text-rose-600">{fieldErrors.phone[0]}</p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Source market
          </span>
          <select
            value={values.sourceMarket}
            onChange={(event) => updateValue("sourceMarket", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            name="sourceMarket"
          >
            {bookingFieldOptions.marketOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.sourceMarket?.[0] && (
            <p className="mt-2 text-xs text-rose-600">
              {fieldErrors.sourceMarket[0]}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Country of residence
          </span>
          <input
            value={values.residenceCountry}
            onChange={(event) =>
              updateValue("residenceCountry", event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            placeholder="United States"
            name="residenceCountry"
          />
          {fieldErrors.residenceCountry?.[0] && (
            <p className="mt-2 text-xs text-rose-600">
              {fieldErrors.residenceCountry[0]}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Travelers
          </span>
          <input
            value={values.travelerCount}
            onChange={(event) => updateValue("travelerCount", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            type="number"
            min="1"
            max="20"
            name="travelerCount"
          />
          {fieldErrors.travelerCount?.[0] && (
            <p className="mt-2 text-xs text-rose-600">
              {fieldErrors.travelerCount[0]}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Trip length
          </span>
          <input
            value={values.tripLength}
            onChange={(event) => updateValue("tripLength", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            placeholder="7 to 10 nights"
            name="tripLength"
          />
          {fieldErrors.tripLength?.[0] && (
            <p className="mt-2 text-xs text-rose-600">
              {fieldErrors.tripLength[0]}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Preferred start date
          </span>
          <input
            value={values.startDate}
            onChange={(event) => updateValue("startDate", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            type="date"
            name="startDate"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <fieldset className="rounded-3xl border border-slate-200 p-5">
          <legend className="px-2 text-sm font-medium text-slate-800">
            Destinations
          </legend>
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500">
            {destinationLabel}
          </p>
          <div className="grid gap-3">
            {destinationOptions.map((option) => {
              const checked = values.destinations.includes(option);

              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                    checked
                      ? "border-teal-500 bg-teal-50 text-teal-900"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{option}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArrayValue("destinations", option)}
                    className="h-4 w-4"
                  />
                </label>
              );
            })}
          </div>
          {fieldErrors.destinations?.[0] && (
            <p className="mt-3 text-xs text-rose-600">
              {fieldErrors.destinations[0]}
            </p>
          )}
        </fieldset>

        <fieldset className="rounded-3xl border border-slate-200 p-5">
          <legend className="px-2 text-sm font-medium text-slate-800">
            Travel interests
          </legend>
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500">
            Helps Leviva recommend the right itinerary
          </p>
          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map((option) => {
              const checked = values.interests.includes(option);

              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                    checked
                      ? "border-teal-500 bg-teal-50 text-teal-900"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{option}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArrayValue("interests", option)}
                    className="h-4 w-4"
                  />
                </label>
              );
            })}
          </div>
          {fieldErrors.interests?.[0] && (
            <p className="mt-3 text-xs text-rose-600">
              {fieldErrors.interests[0]}
            </p>
          )}
        </fieldset>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Budget range
          </span>
          <select
            value={values.budgetRange}
            onChange={(event) => updateValue("budgetRange", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            name="budgetRange"
          >
            <option>Under USD 1,500 per person</option>
            <option>USD 1,500 to USD 3,000 per person</option>
            <option>USD 3,000 to USD 5,000 per person</option>
            <option>USD 5,000 to USD 8,000 per person</option>
            <option>Above USD 8,000 per person</option>
          </select>
          {fieldErrors.budgetRange?.[0] && (
            <p className="mt-2 text-xs text-rose-600">
              {fieldErrors.budgetRange[0]}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-800">
            Accommodation style
          </span>
          <select
            value={values.accommodationStyle}
            onChange={(event) =>
              updateValue("accommodationStyle", event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
            name="accommodationStyle"
          >
            {bookingFieldOptions.accommodationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.accommodationStyle?.[0] && (
            <p className="mt-2 text-xs text-rose-600">
              {fieldErrors.accommodationStyle[0]}
            </p>
          )}
        </label>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-slate-800">
          Notes for the Leviva team
        </span>
        <textarea
          value={values.notes}
          onChange={(event) => updateValue("notes", event.target.value)}
          className="min-h-32 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500"
          placeholder="Share anything important about your dates, interests, celebration, or room setup."
          name="notes"
        />
      </label>

      <label className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(event) => updateValue("consent", event.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>
          I consent to Leviva Travel & Tours using my details to prepare and send
          a travel proposal.
        </span>
      </label>
      {fieldErrors.consent?.[0] && (
        <p className="mt-2 text-xs text-rose-600">{fieldErrors.consent[0]}</p>
      )}

      {status.message && (
        <div
          className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            High-intent leads close faster
          </p>
          <p className="text-sm text-slate-600">
            Leviva gets the essentials upfront so every reply can move toward a
            confirmed booking.
          </p>
        </div>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {status.type === "loading" ? "Sending your request..." : "Send my trip request"}
        </button>
      </div>
    </form>
  );
}
