import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (!prisma) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Database is not configured yet. Add DATABASE_URL to enable enquiry capture in production.",
        },
        { status: 503 },
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        ...parsed.data,
        phone: parsed.data.phone || null,
        travelMonth: parsed.data.travelMonth || null,
        travelers: parsed.data.travelers ?? null,
        budget: parsed.data.budget || null,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        inquiryId: inquiry.id,
        message:
          "Your travel request has been received. Leviva Travel & Tours will contact you shortly.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create inquiry", error);

    return NextResponse.json(
      {
        ok: false,
        message: "We could not submit your request. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
