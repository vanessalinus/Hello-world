"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phone = "255758996047";
  const message = encodeURIComponent(
    "Hello Leviva Travel! I'm interested in booking a safari tour. Could you help me plan my East Africa adventure?"
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden animate-slide-up">
          <div className="bg-[#25D366] px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LT</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Leviva Travel</div>
                  <div className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full inline-block" />
                    Typically replies in minutes
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <div className="text-sm text-gray-700">
                👋 Hello! Ready to plan your dream African safari? Chat with us on WhatsApp for
                instant assistance and personalized tour recommendations!
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-xl py-3 font-semibold text-sm transition-colors w-full"
            >
              <MessageCircle size={18} />
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 relative"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            1
          </span>
        )}
      </button>
    </div>
  );
}
