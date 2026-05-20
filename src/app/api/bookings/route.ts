import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tourId,
      firstName,
      lastName,
      email,
      phone,
      country,
      travelers,
      preferredDate,
      message,
    } = body;

    if (!firstName || !lastName || !email || !phone || !country || !preferredDate) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        tourId: tourId || "custom",
        firstName,
        lastName,
        email,
        phone,
        country,
        travelers: travelers || 1,
        preferredDate,
        message: message || "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your booking inquiry has been received! Our team will contact you within 24 hours.",
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
