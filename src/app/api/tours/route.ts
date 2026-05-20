import { NextRequest, NextResponse } from "next/server";
import { tours } from "@/data/tours";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const destination = searchParams.get("destination");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  let filtered = [...tours];

  if (destination) {
    filtered = filtered.filter(
      (t) => t.destination.toLowerCase() === destination.toLowerCase()
    );
  }

  if (category) {
    filtered = filtered.filter(
      (t) => t.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featured === "true") {
    filtered = filtered.filter((t) => t.featured);
  }

  if (minPrice) {
    filtered = filtered.filter((t) => t.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((t) => t.price <= Number(maxPrice));
  }

  return NextResponse.json({
    tours: filtered,
    total: filtered.length,
  });
}
