import type { Metadata } from "next";
import BookingForm from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Safari | Leviva Travel & Tours",
  description:
    "Book your dream East Africa safari with Leviva Travel. Secure online booking with 25% deposit. Instant confirmation.",
};

export default function BookingPage({
  searchParams,
}: {
  searchParams: {
    tourId?: string;
    tourSlug?: string;
    tourTitle?: string;
    adults?: string;
    children?: string;
    startDate?: string;
    price?: string;
  };
}) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-gray-900 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
            Book Your Safari Adventure
          </h1>
          <p className="text-gray-400 text-lg">
            Complete the form below and our team will confirm your booking within 2 hours.
            No payment required now – 25% deposit requested after confirmation.
          </p>

          {/* Progress trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs">✓</span>
              Secure Form
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs">✓</span>
              No Payment Now
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs">✓</span>
              2-Hour Response
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <BookingForm prefilledData={searchParams} />
      </div>
    </div>
  );
}
