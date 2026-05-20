import { NextResponse } from "next/server";

import { sendLeadNotification } from "@/lib/notifications";
import { getPrismaClient } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";

function parseAdminKey(request: Request) {
  const headerKey = request.headers.get("x-admin-key");
  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key");

  return headerKey || queryKey;
}

export async function GET(request: Request) {
  const adminKey = process.env.ADMIN_DASHBOARD_KEY;
  const prisma = getPrismaClient();

  if (!adminKey || parseAdminKey(request) !== adminKey) {
    return NextResponse.json(
      { error: "Unauthorized request." },
      { status: 401 },
    );
  }

  if (!prisma) {
    return NextResponse.json(
      { error: "Database access is not configured for this environment." },
      { status: 503 },
    );
  }

  const leads = await prisma.bookingLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = bookingSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please review the form fields and try again.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const lead = parsed.data;
    const prisma = getPrismaClient();

    if (prisma) {
      await prisma.bookingLead.create({
        data: {
          fullName: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          sourceMarket: lead.sourceMarket,
          residenceCountry: lead.residenceCountry,
          travelerCount: lead.travelerCount,
          tripLength: lead.tripLength,
          startDate: lead.startDate ? new Date(lead.startDate) : null,
          destinations: lead.destinations.join(", "),
          interests: lead.interests.join(", "),
          budgetRange: lead.budgetRange,
          accommodationStyle: lead.accommodationStyle,
          notes: lead.notes || null,
          consent: lead.consent,
        },
      });
    }

    try {
      await sendLeadNotification(lead);
    } catch (notificationError) {
      console.error(notificationError);
    }

    return NextResponse.json(
      {
        message:
          "Thanks for your inquiry. Leviva will use your details to build a tailored safari proposal.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "The booking planner could not be submitted right now." },
      { status: 500 },
    );
  }
}
