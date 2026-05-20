import { z } from "zod";
import { siteConfig } from "@/lib/site";

const requiredText = (label: string, max = 120) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(2, `${label} is required.`)
    .max(max, `${label} is too long.`);

const optionalText = (max = 2000) => z.string().trim().max(max).optional();

export const bookingSchema = z.object({
  name: requiredText("Name"),
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
  phone: requiredText("Phone or WhatsApp", 40),
  country: requiredText("Country"),
  travelers: z.coerce
    .number({ error: "Please enter the number of travelers." })
    .int()
    .min(1)
    .max(80),
  budget: requiredText("Budget"),
  travelMonth: requiredText("Travel month", 80),
  destinations: z.array(z.string().trim().min(1)).min(1, "Choose at least one destination."),
  tripStyle: requiredText("Trip style", 80),
  message: optionalText(),
  referralSource: optionalText(120),
  company: z.string().trim().max(0).optional(),
});

export const contactSchema = z.object({
  name: requiredText("Name"),
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
  phone: optionalText(40),
  message: requiredText("Message", 2000),
  company: z.string().trim().max(0).optional(),
});

export type BookingLead = z.infer<typeof bookingSchema>;
export type ContactLead = z.infer<typeof contactSchema>;

type LeadPayload =
  | {
      type: "booking";
      data: BookingLead;
    }
  | {
      type: "contact";
      data: ContactLead;
    };

type DeliveryResult = {
  delivered: boolean;
  channels: string[];
};

const leadRecipients = (process.env.LEAD_TO_EMAIL ?? siteConfig.email)
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

function formatLeadForText(payload: LeadPayload) {
  if (payload.type === "booking") {
    const lead = payload.data;

    return [
      "New booking inquiry",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Country: ${lead.country}`,
      `Travelers: ${lead.travelers}`,
      `Budget: ${lead.budget}`,
      `Travel month: ${lead.travelMonth}`,
      `Destinations: ${lead.destinations.join(", ")}`,
      `Trip style: ${lead.tripStyle}`,
      `Referral source: ${lead.referralSource || "Not provided"}`,
      `Message: ${lead.message || "Not provided"}`,
    ].join("\n");
  }

  const lead = payload.data;

  return [
    "New website message",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Message: ${lead.message}`,
  ].join("\n");
}

async function sendWebhook(payload: LeadPayload) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      source: "leviva-website",
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook failed with status ${response.status}`);
  }

  return true;
}

async function sendEmail(payload: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return false;
  }

  const leadText = formatLeadForText(payload);
  const subject =
    payload.type === "booking"
      ? `New Leviva booking inquiry from ${payload.data.name}`
      : `New Leviva website message from ${payload.data.name}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "Leviva Website <onboarding@resend.dev>",
      to: leadRecipients,
      reply_to: payload.data.email,
      subject,
      text: leadText,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend delivery failed with status ${response.status}: ${body}`);
  }

  return true;
}

export async function deliverLead(payload: LeadPayload): Promise<DeliveryResult> {
  const channels: string[] = [];

  const [webhookResult, emailResult] = await Promise.allSettled([
    sendWebhook(payload),
    sendEmail(payload),
  ]);

  if (webhookResult.status === "fulfilled" && webhookResult.value) {
    channels.push("webhook");
  }

  if (emailResult.status === "fulfilled" && emailResult.value) {
    channels.push("email");
  }

  if (webhookResult.status === "rejected") {
    console.error(webhookResult.reason);
  }

  if (emailResult.status === "rejected") {
    console.error(emailResult.reason);
  }

  return {
    delivered: channels.length > 0,
    channels,
  };
}
