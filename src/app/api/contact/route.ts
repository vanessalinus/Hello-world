import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject,
        message: data.message,
        market: data.market ?? null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: inquiry.id,
        message: "Thank you! We will respond within 24 hours.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
}
