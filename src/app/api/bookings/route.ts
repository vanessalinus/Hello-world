import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBookingReference } from "@/lib/utils";
import { z } from "zod";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    let estimatedTotal: number | undefined;
    if (data.tourId) {
      const tour = await prisma.tour.findUnique({ where: { id: data.tourId } });
      if (tour) {
        estimatedTotal = tour.priceFromUsd * data.travelers;
      }
    }

    const booking = await prisma.booking.create({
      data: {
        reference: generateBookingReference(),
        tourId: data.tourId || null,
        tourTitle: data.tourTitle,
        destination: data.destination,
        startDate: new Date(data.startDate),
        travelers: data.travelers,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        market: data.market,
        specialRequests: data.specialRequests ?? null,
        estimatedTotal: estimatedTotal ?? null,
        status: "pending",
      },
    });

    const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_booking",
          reference: booking.reference,
          tour: booking.tourTitle,
          email: booking.email,
          travelers: booking.travelers,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        success: true,
        reference: booking.reference,
        estimatedTotal: booking.estimatedTotal,
        message:
          "Your booking request has been received. Our safari specialists will contact you within 24 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten() },
        { status: 400 }
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Use POST to create a booking inquiry" },
    { status: 405 }
  );
}
