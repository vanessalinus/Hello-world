import { NextRequest, NextResponse } from "next/server";
import { generateBookingRef } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tourId,
      startDate,
      adults,
      children,
      firstName,
      lastName,
      email,
      phone,
      country,
      nationality,
      dietaryRequirements,
      specialRequests,
      totalPrice,
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !tourId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingRef = generateBookingRef();

    // Try to save to database (optional – don't block if DB is unavailable)
    try {
      const { db } = await import("@/lib/db");
      await db.booking.create({
        data: {
          bookingRef,
          tourId,
          startDate: startDate ? new Date(startDate) : new Date(),
          adults: parseInt(adults) || 1,
          children: parseInt(children) || 0,
          totalPrice: parseFloat(totalPrice) || 0,
          currency: "USD",
          status: "PENDING",
          paymentStatus: "UNPAID",
          firstName,
          lastName,
          email,
          phone,
          country,
          nationality,
          dietaryRequirements,
          specialRequests,
          source: "website",
        },
      });
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail({
        bookingRef,
        firstName,
        lastName,
        email,
        tourId,
        startDate,
        adults,
        children,
        totalPrice,
      });
    } catch (emailError) {
      console.error("Email send error (non-blocking):", emailError);
    }

    return NextResponse.json({ success: true, bookingRef }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

async function sendBookingConfirmationEmail(data: {
  bookingRef: string;
  firstName: string;
  lastName: string;
  email: string;
  tourId: string;
  startDate: string;
  adults: number;
  children: number;
  totalPrice: number;
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@levivainvestments.co.tz";

  if (!RESEND_API_KEY || RESEND_API_KEY === "your_resend_api_key_here") {
    console.log("Email not configured – skipping email send");
    return;
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f08518; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Leviva Travel & Tours</h1>
        <p style="color: #fde8c8; margin: 5px 0 0;">Booking Request Received</p>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1a1a1a;">Hello ${data.firstName}!</h2>
        <p>Thank you for your booking request. We've received your details and will contact you within 2 hours to confirm availability and provide payment instructions.</p>
        
        <div style="background: #fef3e2; border: 1px solid #f08518; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #e16a0e; margin: 0 0 15px;">Booking Reference: <strong>${data.bookingRef}</strong></h3>
          <p style="margin: 5px 0;">📅 Start Date: ${data.startDate || "To be confirmed"}</p>
          <p style="margin: 5px 0;">👥 Guests: ${data.adults} adult${data.adults > 1 ? "s" : ""}${data.children > 0 ? ` + ${data.children} child${data.children > 1 ? "ren" : ""}` : ""}</p>
          <p style="margin: 5px 0;">💰 Total Estimate: $${data.totalPrice.toLocaleString()} USD</p>
        </div>
        
        <h3>What happens next?</h3>
        <ol>
          <li>Our team reviews your request and checks availability</li>
          <li>We email you a detailed booking confirmation with exact pricing</li>
          <li>You pay a 25% deposit to secure your spot</li>
          <li>Final payment due 30 days before departure</li>
        </ol>
        
        <p>Questions? Contact us anytime:</p>
        <p>📞 <a href="tel:+255758996047">+255 758 996 047</a></p>
        <p>💬 <a href="https://wa.me/255758996047">WhatsApp: +255 758 996 047</a></p>
        <p>✉️ <a href="mailto:info@levivainvestments.co.tz">info@levivainvestments.co.tz</a></p>
        
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">Leviva Travel & Tours | Arusha, Tanzania | levivainvestments.co.tz</p>
      </div>
    </body>
    </html>
  `;

  // Send to customer
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Leviva Travel <bookings@levivainvestments.co.tz>",
      to: data.email,
      subject: `Booking Confirmed – ${data.bookingRef} | Leviva Travel`,
      html: emailHtml,
    }),
  });

  // Notify internal team
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Leviva Bookings <bookings@levivainvestments.co.tz>",
      to: CONTACT_EMAIL,
      subject: `NEW BOOKING: ${data.bookingRef} – ${data.firstName} ${data.lastName}`,
      html: `<p>New booking from ${data.firstName} ${data.lastName} (${data.email})</p><p>Ref: ${data.bookingRef}</p><p>Adults: ${data.adults}, Children: ${data.children}</p><p>Total: $${data.totalPrice}</p>`,
    }),
  });
}
