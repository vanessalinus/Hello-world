import type { Metadata } from "next";
import { Shield, Clock, Star, CheckCircle } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Safari",
  description:
    "Book your dream African safari with Leviva Travel & Tours. Free personalized quote within 2 hours. No payment required upfront.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Book Your Adventure</h1>
          <p className="text-xl text-white/90 max-w-xl">
            Fill in the form below and receive a free, personalized quote within
            2 hours.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  Request Your Free Quote
                </h2>
                <BookingForm />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                  How It Works
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Submit Your Request",
                      desc: "Tell us about your dream trip — destinations, dates, and preferences.",
                    },
                    {
                      step: "2",
                      title: "Get Your Quote",
                      desc: "Our experts craft a personalized itinerary and quote within 2 hours.",
                    },
                    {
                      step: "3",
                      title: "Refine & Confirm",
                      desc: "We adjust everything until it's perfect. No pressure, no obligation.",
                    },
                    {
                      step: "4",
                      title: "Adventure Begins!",
                      desc: "Secure your spot with a small deposit. Pay the rest closer to departure.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-900">
                          {item.title}
                        </h4>
                        <p className="text-sm text-stone-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                  Our Guarantee
                </h3>
                <ul className="space-y-3">
                  {[
                    "Free cancellation up to 30 days before departure",
                    "Best price guarantee — we match any lower quote",
                    "24/7 support throughout your trip",
                    "Licensed by the Tanzania Tourist Board",
                    "Fully insured with emergency evacuation cover",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-center">
                <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-stone-900">4.9/5</p>
                <p className="text-sm text-stone-600">
                  from 15,000+ verified reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
