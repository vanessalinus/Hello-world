import { Shield, Star, Users, Headphones, Award, Globe } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "100% Safe & Trusted",
    description:
      "Fully licensed and bonded tour operator. Flying Doctors emergency evacuation insurance included on all safaris. Your safety is our top priority.",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Star,
    title: "Expert Local Guides",
    description:
      "Our KPAP-certified guides average 10+ years of experience. Available in English, Swahili, Chinese (Mandarin), Korean, French, and German.",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: Users,
    title: "Small Group Excellence",
    description:
      "Maximum group sizes of 6-12 ensure personalized attention, exclusivity, and minimal environmental impact on the ecosystems we love.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support via WhatsApp, email, and phone. We're here before, during, and after your trip.",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description:
      "Recognized by TripAdvisor and SafariBookings with consistent 5-star ratings. Over 500 glowing reviews from happy travelers worldwide.",
    color: "text-brand-600 bg-brand-50",
  },
  {
    icon: Globe,
    title: "Tailored for Every Origin",
    description:
      "Specialists in serving travelers from China, USA, Europe, South Korea, Australia, and New Zealand with culturally sensitive, customized tours.",
    color: "text-teal-600 bg-teal-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Award size={14} />
            Why Travelers Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            The Leviva Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We don't just offer tours – we craft transformative journeys that connect you deeply
            with Africa's wildlife, landscapes, and cultures.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 ${reason.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-600 to-brand-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-display font-bold mb-4">
            Ready to Plan Your Dream African Safari?
          </h3>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
            Our expert team will craft a personalized itinerary perfectly matched to your
            budget, interests, and travel dates. Get a free, no-obligation quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              Book Now
            </a>
            <a
              href={`https://wa.me/255758996047?text=${encodeURIComponent("Hello! I'd like to plan my dream safari with Leviva Travel.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#22c55e] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
