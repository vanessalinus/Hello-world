import type { Metadata } from "next";
import { QuickInquiryForm } from "@/components/quick-inquiry-form";
import { siteConfig } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan My Trip — Free 12-hour quote",
  description:
    "Tell us your dates, dream destinations and budget. A Leviva expert will respond within 12 hours with a tailored quote — no obligation."
};

export default function BookPage() {
  return (
    <div className="container grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div>
        <span className="section-eyebrow">Plan my trip</span>
        <h1 className="section-heading">Your custom East African journey starts here.</h1>
        <p className="mt-3 text-savanna-700">
          Share a few details below and a dedicated destination expert will craft a free,
          no-obligation itinerary within 12 hours. Prefer to talk? Reach us on{" "}
          <a
            className="font-semibold text-acacia-700 underline"
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>{" "}
          or call <a className="font-semibold text-acacia-700" href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>.
        </p>

        <ul className="mt-8 space-y-3">
          {siteConfig.guaranteeBullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-savanna-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-acacia-700" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <QuickInquiryForm />
      </div>
    </div>
  );
}
