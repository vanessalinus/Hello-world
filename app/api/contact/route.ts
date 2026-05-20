import { NextResponse } from "next/server";
import { contactSchema, deliverLead } from "@/lib/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please check the highlighted fields and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    const result = await deliverLead({
      type: "contact",
      data: parsed.data,
    });

    if (!result.delivered) {
      return NextResponse.json(
        {
          message:
            "Lead delivery is not configured yet. Please email info@levivainvestments.co.tz or call +255758996047.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      channels: result.channels,
      message: "Thank you. Leviva will respond as soon as possible.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "We could not send your message right now. Please contact Leviva directly.",
      },
      { status: 500 },
    );
  }
}
