import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email().max(180),
  country: z.string().max(80).optional().nullable()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, country } = schema.parse(json);
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { country: country || undefined },
      create: { email, country: country || undefined }
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    console.error("[newsletter] error", e);
    return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
  }
}
