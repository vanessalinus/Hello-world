import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { getTours } from "@/lib/tours";
import { SITE } from "@/lib/utils";
import { MessageCircle, Shield } from "lucide-react";

export const metadata = {
  title: "Book Your Safari",
  description: "Request a free, no-obligation safari quote. Response within 24 hours.",
};

export default async function BookPage() {
  const tours = await getTours();
  const tourOptions = tours.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    destination: t.destination,
    priceFromUsd: t.priceFromUsd,
  }));

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello Leviva! I would like to book a safari."
  )}`;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h1 className="font-display text-4xl font-bold text-safari-950">
              Book Your Safari
            </h1>
            <p className="mt-4 text-lg text-safari-600">
              Complete this 3-step form for a personalized quote. No credit card required —
              our team responds within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-forest-800/5 p-4">
                <Shield className="h-6 w-6 shrink-0 text-forest-700" />
                <div>
                  <p className="font-semibold text-safari-950">Risk-free inquiry</p>
                  <p className="text-sm text-safari-600">
                    No deposit until you approve your custom itinerary.
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-4 transition hover:bg-[#25D366]/10"
              >
                <MessageCircle className="h-6 w-6 text-[#25D366]" />
                <div>
                  <p className="font-semibold text-safari-950">Prefer WhatsApp?</p>
                  <p className="text-sm text-safari-600">{SITE.phone}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-safari-200 bg-white p-6 shadow-sm lg:col-span-3 sm:p-8">
            <Suspense fallback={<p className="text-safari-600">Loading booking form...</p>}>
              <BookingForm tours={tourOptions} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
