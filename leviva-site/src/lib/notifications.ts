import type { BookingInput } from "@/lib/validation";

const resendApiUrl = "https://api.resend.com/emails";

function buildLeadSummary(lead: BookingInput) {
  return [
    `New Leviva website inquiry`,
    ``,
    `Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Source market: ${lead.sourceMarket}`,
    `Residence country: ${lead.residenceCountry}`,
    `Travelers: ${lead.travelerCount}`,
    `Trip length: ${lead.tripLength}`,
    `Preferred start: ${lead.startDate || "Flexible"}`,
    `Destinations: ${lead.destinations.join(", ")}`,
    `Interests: ${lead.interests.join(", ")}`,
    `Budget: ${lead.budgetRange}`,
    `Accommodation: ${lead.accommodationStyle}`,
    `Notes: ${lead.notes || "None provided"}`,
  ].join("\n");
}

export async function sendLeadNotification(lead: BookingInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return;
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New booking lead from ${lead.fullName}`,
      text: buildLeadSummary(lead),
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to send lead notification email.");
  }
}
