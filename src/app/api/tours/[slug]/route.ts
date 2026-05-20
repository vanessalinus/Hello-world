import { NextResponse } from "next/server";
import { getTourBySlug } from "@/lib/tours";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  return NextResponse.json(tour);
}
