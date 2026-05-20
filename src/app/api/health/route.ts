import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "Leviva Travel & Tours",
    timestamp: new Date().toISOString(),
  });
}
