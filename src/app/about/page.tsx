import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Leviva Travel & Tours — your trusted East African safari operator based in Tanzania. Licensed, experienced, and passionate about creating unforgettable African adventures.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="heading-1 text-white mb-4">About Leviva</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted partner for extraordinary East African adventures.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="heading-2 text-gray-900 mt-3 mb-6">
                Born in Tanzania, Built for the World
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Leviva Travel & Tours was founded with a single mission: to
                  share the incredible beauty and diversity of East Africa with
                  travelers from around the world. Based in Tanzania, we bring
                  deep local knowledge, genuine passion, and years of experience
                  to every safari, trek, and beach retreat we organize.
                </p>
                <p>
                  As a licensed Tanzanian tour operator and proud member of
                  TATO (Tanzania Association of Tour Operators), we operate to
                  the highest standards of safety, quality, and responsible
                  tourism. Our team includes expert Maasai guides, seasoned
                  mountain porters, and multilingual travel consultants who
                  ensure every detail of your trip is perfect.
                </p>
                <p>
                  From the sweeping plains of the Serengeti to the pristine
                  beaches of Zanzibar, from the summit of Kilimanjaro to the
                  waterways of the Okavango Delta — we craft journeys that
                  transform travelers into lifelong advocates for Africa.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80')",
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-primary-100 text-sm">Happy travelers worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="heading-2 text-gray-900 mt-3">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Experiences",
                description:
                  "We go beyond tourist attractions to create genuine connections with local cultures, communities, and landscapes. Every trip is designed to give you the real Africa.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                title: "Conservation First",
                description:
                  "We believe tourism should protect, not exploit. We partner with conservation projects, support anti-poaching efforts, and practice sustainable, low-impact tourism across all our destinations.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Community Impact",
                description:
                  "Every tour we run directly benefits local communities. We employ local guides, source from local businesses, and reinvest in community development projects across East Africa.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 card-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Travelers" },
              { number: "5", label: "Countries Covered" },
              { number: "15+", label: "Tour Packages" },
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl sm:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-gray-900 mb-4">
            Ready to Start Your African Journey?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Let our expert team craft the perfect East African adventure for
            you. Contact us today for a free, no-obligation consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-primary text-lg">
              Plan Your Trip
            </Link>
            <Link href="/contact" className="btn-outline text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
