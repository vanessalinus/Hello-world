import nodemailer from "nodemailer";

let cached: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (cached) return cached;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
  return cached;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[mailer] SMTP not configured – skipping send", opts.subject);
    return { skipped: true };
  }
  const from = process.env.SMTP_FROM || "Leviva Travel <info@levivainvestments.co.tz>";
  await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo
  });
  return { skipped: false };
}
