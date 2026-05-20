import { NextRequest, NextResponse } from "next/server";
import { tours } from "@/data/tours";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") || "20");

  let filtered = tours;

  if (category && category !== "all") {
    filtered = filtered.filter((t) => t.category === category.toUpperCase());
  }

  if (featured === "true") {
    filtered = filtered.filter((t) => t.featured);
  }

  return NextResponse.json({
    tours: filtered.slice(0, limit),
    total: filtered.length,
  });
}
