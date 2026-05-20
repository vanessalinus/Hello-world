import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Globe, MessageCircle } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Leviva Travel & Tours. Email info@levivainvestments.co.tz or call +255 758 996 047. We respond within 2 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-xl">
            Have questions? We&apos;re here to help. Reach us anytime — we
            respond within 2 hours.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
                <h3 className="text-lg font-bold text-stone-900 mb-5">
                  Get In Touch
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">Email</p>
                      <a
                        href="mailto:info@levivainvestments.co.tz"
                        className="text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        info@levivainvestments.co.tz
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">Phone</p>
                      <a
                        href="tel:+255758996047"
                        className="text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        +255 758 996 047
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">WhatsApp</p>
                      <a
                        href="https://wa.me/255758996047"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        Chat with us now
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">Office</p>
                      <p className="text-stone-600">Arusha, Tanzania</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                  Response Times
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span className="text-stone-700">
                      Email: within 2 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="text-stone-700">
                      WhatsApp: within 30 minutes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-500" />
                    <span className="text-stone-700">
                      Phone: instant (Mon-Sat, 8am-8pm EAT)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <Globe className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  We Speak Your Language
                </h3>
                <p className="text-stone-600 text-sm">
                  English · Swahili · 中文 · 한국어 · Français · Deutsch
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
                <h2 className="text-2xl font-bold text-stone-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-stone-600 mb-6">
                  Tell us about your dream trip and we&apos;ll get back to you
                  with a personalized plan.
                </p>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-stone-200 h-80 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <p className="text-stone-500 text-lg font-medium">
            Arusha, Tanzania
          </p>
          <p className="text-stone-400">
            The Safari Capital of East Africa
          </p>
        </div>
      </section>
    </>
  );
}
