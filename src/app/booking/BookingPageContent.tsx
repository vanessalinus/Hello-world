"use client";

import { useSearchParams } from "next/navigation";
import { tours } from "@/data/tours";
import BookingForm from "@/components/BookingForm";

export default function BookingPageContent() {
  const searchParams = useSearchParams();
  const tourSlug = searchParams.get("tour");
  const selectedTour = tourSlug ? tours.find((t) => t.slug === tourSlug) : null;

  return (
    <BookingForm
      tourSlug={selectedTour?.slug}
      tourTitle={selectedTour?.title}
    />
  );
}
