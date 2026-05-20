import { NextResponse } from "next/server";
import { getTours } from "@/lib/tours";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const destination = searchParams.get("destination") ?? undefined;

  const tours = await getTours({
    featured: featured === "true" ? true : featured === "false" ? false : undefined,
    destination,
  });

  return NextResponse.json(tours);
}
