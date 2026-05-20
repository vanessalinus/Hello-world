import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Leviva Travel & Tours. We're available 24/7 via email, phone, and WhatsApp to help plan your perfect East African adventure.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="heading-1 text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? Want to plan a trip? We&apos;re here to help — reach
            out anytime and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="heading-3 text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                      <a
                        href="mailto:info@levivainvestments.co.tz"
                        className="text-primary-600 hover:underline text-sm"
                      >
                        info@levivainvestments.co.tz
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.47,14.38c-.29-.15-1.7-.84-1.97-.94s-.45-.15-.64.15-.74.94-.91,1.13-.33.22-.62.07a7.82,7.82,0,0,1-2.3-1.42,8.6,8.6,0,0,1-1.59-1.98c-.17-.29,0-.44.13-.59s.29-.33.44-.5a2,2,0,0,0,.29-.49.54.54,0,0,0,0-.5c-.07-.15-.64-1.54-.88-2.11s-.46-.48-.64-.49h-.54a1.05,1.05,0,0,0-.76.35,3.18,3.18,0,0,0-1,2.36,5.52,5.52,0,0,0,1.16,2.93,12.63,12.63,0,0,0,4.86,4.29,16.26,16.26,0,0,0,1.62.6,3.89,3.89,0,0,0,1.79.11,2.93,2.93,0,0,0,1.92-1.35,2.37,2.37,0,0,0,.17-1.35C17.94,14.6,17.76,14.53,17.47,14.38Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">WhatsApp</h4>
                      <a
                        href="https://wa.me/255758996047"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        +255 758 996 047
                      </a>
                      <p className="text-xs text-gray-400 mt-1">
                        Fastest way to reach us!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                      <a
                        href="tel:+255758996047"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        +255 758 996 047
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Office</h4>
                      <p className="text-sm text-gray-600">
                        Dar es Salaam, Tanzania
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <h4 className="font-bold text-gray-900 mb-3">
                  Office Hours
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM (EAT)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 4:00 PM (EAT)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  WhatsApp inquiries are answered 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
