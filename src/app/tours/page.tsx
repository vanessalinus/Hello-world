import { Metadata } from "next";
import { tours } from "@/data/tours";
import TourCard from "@/components/TourCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safari Tours & Packages",
  description:
    "Explore our handcrafted safari tours across Tanzania, Zanzibar, Botswana, Kenya & Rwanda. From Serengeti migrations to Kilimanjaro treks — find your perfect African adventure.",
};

export default function ToursPage() {
  const destinations = [...new Set(tours.map((t) => t.destination))];
  const categories = [...new Set(tours.map((t) => t.category))];

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="heading-1 text-white mb-4">Our Safari Tours</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handcrafted East African adventures — from thrilling wildlife
            safaris to mountain treks and tropical beach retreats.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            <span className="px-5 py-2 bg-primary-600 text-white rounded-full text-sm font-medium cursor-pointer">
              All Tours
            </span>
            {destinations.map((dest) => (
              <span
                key={dest}
                className="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-primary-100 cursor-pointer transition-colors border border-gray-200"
              >
                {dest}
              </span>
            ))}
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-primary-100 cursor-pointer transition-colors border border-gray-200"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 sm:p-12 text-center card-shadow">
            <h3 className="heading-3 text-gray-900 mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We specialize in tailor-made East African adventures. Tell us
              your dream trip and we&apos;ll create a custom itinerary just for
              you — at no extra cost!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/booking" className="btn-primary">
                Request Custom Tour
              </Link>
              <a
                href={`https://wa.me/255758996047?text=${encodeURIComponent(
                  "Hi Leviva! I'd like to create a custom tour."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !border-green-600 !text-green-600 hover:!bg-green-600 hover:!text-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
