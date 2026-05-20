import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { siteConfig } from "@/lib/site";

const inquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(4).max(40).optional().nullable(),
  country: z.string().max(80).optional().nullable(),
  subject: z.string().min(2).max(200),
  message: z.string().min(2).max(4000)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = inquirySchema.parse(json);

    const created = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        country: data.country || undefined,
        subject: data.subject,
        message: data.message
      }
    });

    const html = `
      <h2>New Trip Inquiry — Leviva Travel</h2>
      <p><strong>${data.name}</strong> (${data.country || "—"})</p>
      <p>Email: <a href="mailto:${data.email}">${data.email}</a><br/>Phone: ${data.phone || "—"}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>
      <hr/><small>ID: ${created.id}</small>
    `;

    await sendMail({
      to: process.env.SALES_INBOX || siteConfig.contact.email,
      subject: `New inquiry: ${data.subject}`,
      html,
      replyTo: data.email
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e: any) {
    if (e?.issues) {
      return NextResponse.json(
        { error: "Validation failed", issues: e.issues },
        { status: 400 }
      );
    }
    console.error("[inquiries] error", e);
    return NextResponse.json({ error: "Unable to submit inquiry" }, { status: 500 });
  }
}
