import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    await prisma.newsletterSubscriber.upsert({
      where: { email: data.email },
      create: { email: data.email, market: data.market ?? null },
      update: { market: data.market ?? null },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
}
