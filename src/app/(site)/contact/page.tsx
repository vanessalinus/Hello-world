import type { Metadata } from "next";
import { InquiryForm } from "@/components/booking/InquiryForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${SITE.email} or call ${SITE.phoneDisplay} — Leviva Travel & Tours, Tanzania.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="font-display text-4xl text-stone-900 sm:text-5xl">
            Speak with a human planner
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            For complex routings or corporate groups, jump straight to email or
            WhatsApp — the form is optional but keeps context attached.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Email
              </dt>
              <dd className="mt-1 text-base">
                <a
                  className="font-medium text-stone-900 hover:text-amber-800"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Phone / WhatsApp
              </dt>
              <dd className="mt-1 text-base">
                <a
                  className="font-medium text-stone-900 hover:text-amber-800"
                  href={`https://wa.me/${SITE.whatsappE164}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {SITE.phoneDisplay} (WhatsApp)
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Registered entity
              </dt>
              <dd className="mt-1 text-stone-700">
                {SITE.legalName} — Arusha, Tanzania. Invoices and contracts issued
                in the company name you see on your paperwork.
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl text-stone-900">Trip brief</h2>
          <p className="mt-2 text-sm text-stone-600">
            Same engine as the dedicated booking page — pre-filled context helps
            us respond with fewer clarification rounds.
          </p>
          <div className="mt-6">
            <InquiryForm compact />
          </div>
        </div>
      </div>
    </div>
  );
}
