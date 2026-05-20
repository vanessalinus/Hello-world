"use client";

export default function WhatsAppButton() {
  const phone = "255758996047";
  const message = encodeURIComponent(
    "Hello Leviva Travel! I'm interested in booking a tour to East Africa. Could you please share more details?"
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        className="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.47,14.38c-.29-.15-1.7-.84-1.97-.94s-.45-.15-.64.15-.74.94-.91,1.13-.33.22-.62.07a7.82,7.82,0,0,1-2.3-1.42,8.6,8.6,0,0,1-1.59-1.98c-.17-.29,0-.44.13-.59s.29-.33.44-.5a2,2,0,0,0,.29-.49.54.54,0,0,0,0-.5c-.07-.15-.64-1.54-.88-2.11s-.46-.48-.64-.49h-.54a1.05,1.05,0,0,0-.76.35,3.18,3.18,0,0,0-1,2.36,5.52,5.52,0,0,0,1.16,2.93,12.63,12.63,0,0,0,4.86,4.29,16.26,16.26,0,0,0,1.62.6,3.89,3.89,0,0,0,1.79.11,2.93,2.93,0,0,0,1.92-1.35,2.37,2.37,0,0,0,.17-1.35C17.94,14.6,17.76,14.53,17.47,14.38Zm-5.42,7.4a9.88,9.88,0,0,1-5.03-1.38l-.36-.21-3.74.98.99-3.64-.24-.37a9.88,9.88,0,0,1-1.51-5.26A9.94,9.94,0,0,1,12.05,2.17a9.88,9.88,0,0,1,7,2.9,9.83,9.83,0,0,1,2.9,7A9.94,9.94,0,0,1,12.05,21.78ZM20.52,3.48A11.78,11.78,0,0,0,12.05.13,11.92,11.92,0,0,0,1.82,17.88L0,24l6.3-1.65a11.89,11.89,0,0,0,5.68,1.45h0A11.93,11.93,0,0,0,24,11.86,11.82,11.82,0,0,0,20.52,3.48Z" />
      </svg>
      <span className="absolute right-full mr-3 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
}
