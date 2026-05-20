import type { Metadata } from "next";
import { InquiryForm } from "@/components/booking/InquiryForm";
import { BookSidebar } from "@/components/booking/BookSidebar";

export const metadata: Metadata = {
  title: "Plan a trip",
  description:
    "Send a structured trip brief — faster quotes for Tanzania, Zanzibar, Botswana, and East Africa multi-country itineraries.",
};

export default function BookPage() {
  return (
    <div className="border-b border-stone-200 bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:flex lg:gap-16 lg:px-8 lg:py-16">
        <BookSidebar />
        <div className="mt-10 flex-1 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:mt-0">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
