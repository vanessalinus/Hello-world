import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, country, tour, travelers, date, message } =
      body;

    if (!name || !email || !phone || !country || !tour || !travelers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const booking = {
      id: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name,
      email,
      phone,
      country,
      tour,
      travelers,
      date: date || "Flexible",
      message: message || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // In production, integrate with:
    // - Database (PostgreSQL/MongoDB) to store booking records
    // - Email service (SendGrid/Resend) to send confirmation & notify team
    // - CRM (HubSpot/Salesforce) to track leads
    // - Payment gateway (Stripe) for deposits
    console.log("New booking received:", JSON.stringify(booking, null, 2));

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        message: `Thank you ${name}! Your booking request has been received. Our team will contact you at ${email} within 2 hours with a personalized quote.`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An error occurred processing your request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Leviva Travel & Tours Booking API",
    status: "operational",
    contact: "info@levivainvestments.co.tz",
    phone: "+255758996047",
  });
}
