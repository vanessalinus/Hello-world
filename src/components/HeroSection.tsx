import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary-600/90 text-white text-sm font-semibold rounded-full mb-6 tracking-wide">
              TANZANIA &bull; ZANZIBAR &bull; BOTSWANA &bull; EAST AFRICA
            </span>
          </div>

          <h1 className="heading-1 text-white mb-6 fade-in-up-delay-1">
            Discover the{" "}
            <span className="text-primary-400">Soul of Africa</span>
            <br />
            with Leviva
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl fade-in-up-delay-2">
            Expert-crafted safaris, breathtaking mountain treks, and pristine
            beach retreats across East Africa&apos;s most spectacular
            destinations. Your adventure of a lifetime starts here.
          </p>

          <div className="flex flex-wrap gap-4 fade-in-up-delay-3">
            <Link href="/tours" className="btn-primary text-lg">
              Explore Tours
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link href="/booking" className="btn-secondary text-lg">
              Book Now
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap gap-8 text-white/90">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">500+</div>
              <div className="text-sm text-gray-300 mt-1">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">15+</div>
              <div className="text-sm text-gray-300 mt-1">Tour Packages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">5</div>
              <div className="text-sm text-gray-300 mt-1">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">4.9★</div>
              <div className="text-sm text-gray-300 mt-1">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-8 h-8 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
