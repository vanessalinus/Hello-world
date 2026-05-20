import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country, tourInterest, travelDates, groupSize, budget, message } = body;

    if (!email || !name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Try to save to database
    try {
      const { db } = await import("@/lib/db");
      await db.inquiry.create({
        data: {
          name,
          email,
          phone,
          country,
          tourInterest,
          travelDates,
          groupSize,
          budget,
          message,
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    // Send notification email
    try {
      await sendInquiryEmail({ name, email, phone, country, tourInterest, travelDates, groupSize, budget, message });
    } catch (emailError) {
      console.error("Email send error (non-blocking):", emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

async function sendInquiryEmail(data: Record<string, string>) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@levivainvestments.co.tz";

  if (!RESEND_API_KEY || RESEND_API_KEY === "your_resend_api_key_here") return;

  // Auto-reply to customer
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Leviva Travel <info@levivainvestments.co.tz>",
      to: data.email,
      subject: "Thank you for your enquiry – Leviva Travel & Tours",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f08518; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0;">Leviva Travel & Tours</h1>
          </div>
          <h2>Hello ${data.name}!</h2>
          <p>Thank you for reaching out to Leviva Travel & Tours. We've received your enquiry about <strong>${data.tourInterest || "East Africa safaris"}</strong>.</p>
          <p>Our specialist team will review your requirements and send you a personalized itinerary and quote within <strong>2 hours</strong> during business hours.</p>
          <p>In the meantime, feel free to WhatsApp us at <a href="https://wa.me/255758996047">+255 758 996 047</a> for immediate assistance.</p>
          <p>Warm regards,<br>The Leviva Travel Team</p>
        </div>
      `,
    }),
  });

  // Notify team
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Leviva Website <info@levivainvestments.co.tz>",
      to: CONTACT_EMAIL,
      subject: `NEW ENQUIRY from ${data.name} – ${data.country || "Unknown"} – ${data.tourInterest || "General"}`,
      html: `
        <h2>New Safari Enquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Country:</strong> ${data.country || "N/A"}</p>
        <p><strong>Tour Interest:</strong> ${data.tourInterest || "N/A"}</p>
        <p><strong>Travel Dates:</strong> ${data.travelDates || "N/A"}</p>
        <p><strong>Group Size:</strong> ${data.groupSize || "N/A"}</p>
        <p><strong>Budget:</strong> ${data.budget || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    }),
  });
}
