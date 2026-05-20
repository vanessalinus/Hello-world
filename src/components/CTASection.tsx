import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621414050946-1b936a78491d?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ready for Your African Adventure?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Let us craft your perfect East African journey. From thrilling
          safaris to tranquil beaches — your dream trip is just one message
          away.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/booking" className="btn-primary text-lg">
            Start Planning Your Trip
          </Link>
          <a
            href={`https://wa.me/255758996047?text=${encodeURIComponent(
              "Hello Leviva! I'd like to plan an East Africa trip."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-lg !border-green-400 !text-green-400 hover:!bg-green-500 hover:!text-white"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.47,14.38c-.29-.15-1.7-.84-1.97-.94s-.45-.15-.64.15-.74.94-.91,1.13-.33.22-.62.07a7.82,7.82,0,0,1-2.3-1.42,8.6,8.6,0,0,1-1.59-1.98c-.17-.29,0-.44.13-.59s.29-.33.44-.5a2,2,0,0,0,.29-.49.54.54,0,0,0,0-.5c-.07-.15-.64-1.54-.88-2.11s-.46-.48-.64-.49h-.54a1.05,1.05,0,0,0-.76.35,3.18,3.18,0,0,0-1,2.36,5.52,5.52,0,0,0,1.16,2.93,12.63,12.63,0,0,0,4.86,4.29,16.26,16.26,0,0,0,1.62.6,3.89,3.89,0,0,0,1.79.11,2.93,2.93,0,0,0,1.92-1.35,2.37,2.37,0,0,0,.17-1.35C17.94,14.6,17.76,14.53,17.47,14.38Z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4 text-white/80 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free consultation
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No booking fees
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Flexible cancellation
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            24/7 support
          </span>
        </div>
      </div>
    </section>
  );
}
