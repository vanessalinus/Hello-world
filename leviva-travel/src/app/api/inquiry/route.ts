import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = {
      id: `INQ-${Date.now()}`,
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      createdAt: new Date().toISOString(),
    };

    console.log("New inquiry received:", JSON.stringify(inquiry, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: `Thank you ${name}! We've received your message and will respond within 2 hours.`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An error occurred processing your request" },
      { status: 500 }
    );
  }
}
