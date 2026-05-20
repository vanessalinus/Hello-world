import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Leviva Travel & Tours",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: January 2025</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
            <p className="text-gray-600">We collect information you provide when making bookings or enquiries, including name, email, phone number, country, and travel preferences.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
            <p className="text-gray-600">Your information is used to process bookings, respond to enquiries, send booking confirmations, and provide tour-related communications. We do not sell or share your personal data with third parties except as required to deliver your tour (accommodation providers, airlines).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Data Security</h2>
            <p className="text-gray-600">We use industry-standard SSL encryption for all form submissions. Your payment card details are never stored on our servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Marketing</h2>
            <p className="text-gray-600">With your consent, we may send safari tips and exclusive offers. You can unsubscribe at any time by clicking the unsubscribe link in any email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Contact</h2>
            <p className="text-gray-600">For privacy queries, contact <a href="mailto:info@levivainvestments.co.tz" className="text-brand-600">info@levivainvestments.co.tz</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
