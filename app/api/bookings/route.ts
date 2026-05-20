import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { generateBookingReference, formatUsd } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const bookingSchema = z.object({
  tourSlug: z.string().optional().nullable(),
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(4).max(40),
  country: z.string().min(2).max(80),
  travelers: z.coerce.number().int().min(1).max(40),
  startDate: z.string().min(8),
  message: z.string().max(4000).optional().nullable(),
  source: z.string().max(120).optional().nullable()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bookingSchema.parse(json);

    let tourRecord = null;
    if (data.tourSlug) {
      tourRecord = await prisma.tour.findUnique({ where: { slug: data.tourSlug } });
    }

    const estimate = tourRecord ? tourRecord.priceUsd * data.travelers : 0;
    const reference = generateBookingReference();

    const booking = await prisma.booking.create({
      data: {
        reference,
        tourId: tourRecord?.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        travelers: data.travelers,
        startDate: new Date(data.startDate),
        message: data.message || undefined,
        source: data.source || undefined,
        estimateUsd: estimate
      }
    });

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#2d6635">Karibu, ${data.fullName}! 🌍</h2>
        <p>Thank you for choosing <strong>Leviva Travel &amp; Tours</strong>. We've received your booking request and your dedicated trip designer will be in touch within 12 hours.</p>
        <table style="width:100%;border-collapse:collapse;margin:18px 0">
          <tr><td><strong>Reference</strong></td><td>${reference}</td></tr>
          <tr><td><strong>Tour</strong></td><td>${tourRecord?.title || "Custom itinerary"}</td></tr>
          <tr><td><strong>Travellers</strong></td><td>${data.travelers}</td></tr>
          <tr><td><strong>Preferred start</strong></td><td>${new Date(data.startDate).toDateString()}</td></tr>
          ${estimate ? `<tr><td><strong>Estimate</strong></td><td>${formatUsd(estimate)}</td></tr>` : ""}
        </table>
        <p>While you wait, message us anytime on <a href="https://wa.me/${siteConfig.contact.whatsapp}">WhatsApp +${siteConfig.contact.whatsapp}</a> or call ${siteConfig.contact.phone}.</p>
        <p style="margin-top:24px">Asante sana,<br/>The Leviva Team</p>
      </div>
    `;

    const salesHtml = `
      <h2>New booking request — ${reference}</h2>
      <p><strong>${data.fullName}</strong> (${data.country})</p>
      <p>Email: ${data.email}<br/>Phone: ${data.phone}</p>
      <p>Tour: ${tourRecord?.title || "Custom"} (${tourRecord?.slug || "n/a"})<br/>
      Travellers: ${data.travelers}<br/>
      Start: ${new Date(data.startDate).toDateString()}<br/>
      Estimate: ${formatUsd(estimate)}<br/>
      Source: ${data.source || "direct"}</p>
      <p>${data.message || ""}</p>
    `;

    await Promise.all([
      sendMail({
        to: data.email,
        subject: `Your Leviva Travel booking ${reference}`,
        html: customerHtml
      }),
      sendMail({
        to: process.env.SALES_INBOX || siteConfig.contact.email,
        subject: `Booking ${reference} — ${tourRecord?.title || "custom"} · ${data.travelers} pax`,
        html: salesHtml,
        replyTo: data.email
      })
    ]);

    return NextResponse.json({ ok: true, reference, estimate });
  } catch (e: any) {
    if (e?.issues) {
      return NextResponse.json({ error: "Validation failed", issues: e.issues }, { status: 400 });
    }
    console.error("[bookings] error", e);
    return NextResponse.json({ error: "Unable to create booking" }, { status: 500 });
  }
}
