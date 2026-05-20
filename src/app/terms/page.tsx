import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Leviva Travel & Tours",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-gray-500 mb-10">Last updated: January 2025</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 prose prose-gray max-w-none">
          <section>
            <h2 className="text-xl font-bold text-gray-900">1. Booking & Confirmation</h2>
            <p className="text-gray-600">A booking is confirmed upon receipt of a 25% deposit and our written confirmation. The remaining balance is due 30 days prior to the tour start date. Bookings made within 30 days of departure require full payment.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">2. Cancellation Policy</h2>
            <p className="text-gray-600">Cancellations must be received in writing:</p>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li>60+ days before departure: Full refund minus 10% admin fee</li>
              <li>30-59 days before departure: 50% refund</li>
              <li>15-29 days before departure: 25% refund</li>
              <li>0-14 days before departure: No refund</li>
            </ul>
            <p className="text-gray-600 mt-2">We strongly recommend purchasing comprehensive travel insurance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">3. Inclusions & Exclusions</h2>
            <p className="text-gray-600">Tour prices include items listed in the inclusions section of each tour. International airfares, visa fees, travel insurance, personal expenses, and gratuities are excluded unless explicitly stated.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">4. Itinerary Changes</h2>
            <p className="text-gray-600">Leviva Travel & Tours reserves the right to alter itineraries due to weather, road conditions, wildlife movements, or force majeure events. Equivalent or superior alternatives will be provided where possible.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">5. Responsibility</h2>
            <p className="text-gray-600">Leviva Travel & Tours acts as a tour organizer and cannot be held responsible for accidents, illness, loss or damage of property, or any claim arising from tour activities. Participation is at your own risk. Flying Doctors emergency evacuation insurance is included on all safari tours.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">6. Contact</h2>
            <p className="text-gray-600">For questions about these terms, contact us at <a href="mailto:info@levivainvestments.co.tz" className="text-brand-600">info@levivainvestments.co.tz</a> or +255 758 996 047.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
