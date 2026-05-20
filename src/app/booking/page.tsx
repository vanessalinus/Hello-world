import { Metadata } from "next";
import { Suspense } from "react";
import BookingPageContent from "./BookingPageContent";

export const metadata: Metadata = {
  title: "Book Your Safari",
  description:
    "Book your dream East African safari with Leviva Travel & Tours. Free consultation, no booking fees, and 24/7 support. Start your adventure today!",
};

export default function BookingPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="heading-1 text-white mb-4">Book Your Adventure</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your dream trip and we&apos;ll craft the perfect East
            African experience for you. No payment required — just fill out the
            form and we&apos;ll handle the rest.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-2xl h-96" />}>
                <BookingPageContent />
              </Suspense>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Book With Leviva?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Free personalized trip planning",
                    "No hidden fees or surcharges",
                    "Flexible cancellation policy",
                    "Best price guarantee",
                    "24/7 WhatsApp support",
                    "Licensed Tanzania tour operator",
                    "Expert local guides",
                    "Secure payments",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">
                  Prefer to Talk?
                </h3>
                <p className="text-primary-100 text-sm mb-4">
                  Our safari experts are available 24/7 to help plan your
                  perfect trip.
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/255758996047`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.47,14.38c-.29-.15-1.7-.84-1.97-.94s-.45-.15-.64.15-.74.94-.91,1.13-.33.22-.62.07a7.82,7.82,0,0,1-2.3-1.42,8.6,8.6,0,0,1-1.59-1.98c-.17-.29,0-.44.13-.59s.29-.33.44-.5a2,2,0,0,0,.29-.49.54.54,0,0,0,0-.5c-.07-.15-.64-1.54-.88-2.11s-.46-.48-.64-.49h-.54a1.05,1.05,0,0,0-.76.35,3.18,3.18,0,0,0-1,2.36,5.52,5.52,0,0,0,1.16,2.93,12.63,12.63,0,0,0,4.86,4.29,16.26,16.26,0,0,0,1.62.6,3.89,3.89,0,0,0,1.79.11,2.93,2.93,0,0,0,1.92-1.35,2.37,2.37,0,0,0,.17-1.35C17.94,14.6,17.76,14.53,17.47,14.38Z" />
                    </svg>
                    WhatsApp: +255 758 996 047
                  </a>
                  <a
                    href="mailto:info@levivainvestments.co.tz"
                    className="flex items-center gap-3 bg-white/20 text-white px-4 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@levivainvestments.co.tz
                  </a>
                  <a
                    href="tel:+255758996047"
                    className="flex items-center gap-3 bg-white/20 text-white px-4 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +255 758 996 047
                  </a>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">
                      How it Works
                    </h4>
                    <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                      <li>Submit your inquiry (no payment needed)</li>
                      <li>We create a personalized itinerary</li>
                      <li>Review and customize your trip</li>
                      <li>Confirm with a 30% deposit</li>
                      <li>Pack your bags and fly to Africa!</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
