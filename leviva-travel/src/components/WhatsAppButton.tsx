"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "255758996047";
  const message = encodeURIComponent(
    "Hello Leviva Travel! I'm interested in booking a tour. Could you share more details?"
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
