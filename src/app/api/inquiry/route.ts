import { NextResponse } from "next/server";
import { z } from "zod";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const marketValues = [
  "china",
  "usa",
  "europe",
  "south_korea",
  "australia",
  "new_zealand",
  "other",
] as const;

const inquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(80).optional(),
  homeRegion: z.enum(marketValues),
  destinations: z.array(z.string()).min(1).max(20),
  travelMonth: z.string().min(4).max(12),
  adults: z.coerce.number().int().min(1).max(40),
  children: z.coerce.number().int().min(0).max(30),
  budgetBand: z.enum([
    "under_5000",
    "5000_10000",
    "10000_20000",
    "20000_plus",
    "unsure",
  ]),
  message: z.string().max(5000).optional(),
  whatsappPreferred: z.boolean(),
  locale: z.enum(["en", "zh", "ko"]).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
  };

  console.info("[leviva inquiry]", JSON.stringify(payload));

  const line = `${JSON.stringify(payload)}\n`;
  const candidates = [
    path.join(process.cwd(), "data", "inquiries.jsonl"),
    path.join("/tmp", "leviva-inquiries.jsonl"),
  ];
  for (const file of candidates) {
    try {
      await mkdir(path.dirname(file), { recursive: true });
      await appendFile(file, line, "utf8");
      break;
    } catch {
      // try next path (e.g. read-only serverless filesystem)
    }
  }

  return NextResponse.json({ ok: true });
}
