import { NextResponse } from "next/server";
import { contact } from "@/lib/data";
import { leadSchema } from "@/lib/lead-schema";
import type { LeadInput } from "@/lib/lead-schema";

export const runtime = "nodejs";

type WebhookPayload = {
  leadId: string;
  submittedAt: string;
  source: string;
  contactEmail: string;
  lead: Omit<LeadInput, "honeypot">;
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please review the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
  }

  const lead = leadSchema.omit({ honeypot: true }).parse(parsed.data);
  const payload: WebhookPayload = {
    leadId: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    source: "leviva-travel-website",
    contactEmail: contact.email,
    lead,
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Lead webhook failed", {
          status: response.status,
          statusText: response.statusText,
          leadId: payload.leadId,
        });

        return NextResponse.json(
          {
            ok: false,
            message:
              "Your inquiry was received but could not be routed. Please WhatsApp or email Leviva directly.",
            contact: contact.email,
          },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("Lead webhook error", { error, leadId: payload.leadId });

      return NextResponse.json(
        {
          ok: false,
          message:
            "Your inquiry was received but could not be routed. Please WhatsApp or email Leviva directly.",
          contact: contact.email,
        },
        { status: 502 },
      );
    }
  } else {
    console.info("New Leviva lead", payload);
  }

  return NextResponse.json({
    ok: true,
    leadId: payload.leadId,
    message: "Thank you. Leviva will contact you shortly.",
  });
}
