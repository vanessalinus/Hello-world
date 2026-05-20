import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users, Heart, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Leviva Travel & Tours – East Africa Safari Experts",
  description:
    "Learn about Leviva Travel & Tours – Tanzania's premier safari company with 15+ years experience. Expert team, multilingual guides, and a passion for sustainable African travel.",
};

const team = [
  {
    name: "James Kimaro",
    role: "Founder & Lead Safari Guide",
    experience: "20 years",
    languages: "English, Swahili, Maasai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Born and raised in Arusha at the foot of Kilimanjaro, James has been guiding safaris since 2004. A certified KPAP guide and naturalist with encyclopedic knowledge of East African wildlife.",
  },
  {
    name: "Lucy Chen",
    role: "China & Asia Pacific Specialist",
    experience: "10 years",
    languages: "Mandarin, English, Swahili",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Lucy bridges East Africa and Asia with her unique background. Based in Arusha with family in Shanghai, she ensures our Chinese guests feel at home from the moment they land.",
  },
  {
    name: "Park Sunwoo",
    role: "Korea & Southeast Asia Specialist",
    experience: "8 years",
    languages: "Korean, English, Swahili",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Sunwoo relocated to Tanzania after falling in love with East Africa on a solo trip. He now helps fellow Koreans discover the same magic, with culturally sensitive, perfectly crafted itineraries.",
  },
  {
    name: "Sarah Mueller",
    role: "Europe Operations Manager",
    experience: "12 years",
    languages: "German, French, English, Swahili",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Originally from Munich, Sarah has been coordinating European guests' African adventures for over a decade. Her meticulous attention to detail ensures flawless operations.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Comprehensive safety protocols, Flying Doctors emergency cover, and certified first-aid trained guides on every tour.",
  },
  {
    icon: Heart,
    title: "Passionate Service",
    desc: "We genuinely love East Africa and it shows in every tour we craft. Your experience is our obsession.",
  },
  {
    icon: Globe,
    title: "Sustainable Tourism",
    desc: "We contribute to conservation, hire local guides, and follow Leave No Trace principles on all our tours.",
  },
  {
    icon: Award,
    title: "Expert Knowledge",
    desc: "KPAP-certified guides, naturalists, and specialists with decades of combined field experience.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
          alt="Leviva Travel Team in Africa"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-16 max-w-7xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-brand-500/80 text-white rounded-full px-4 py-2 text-sm font-medium mb-4 w-fit">
            <MapPin size={14} />
            Arusha, Tanzania
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
            About Leviva Travel
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Born in Tanzania. Driven by passion. Dedicated to giving you the safari of a lifetime.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Heart size={14} />
                Our Story
              </div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Born from a Love of Africa
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Leviva Travel & Tours was founded with a simple but powerful vision: to share the
                  extraordinary magic of East Africa with the world – authentically, safely, and
                  sustainably.
                </p>
                <p>
                  Based in Arusha, the gateway city to Tanzania's northern safari circuit, we are
                  perfectly positioned to deliver extraordinary experiences across Tanzania,
                  Zanzibar, Botswana, Rwanda, and beyond.
                </p>
                <p>
                  What sets us apart is our team – a diverse group of passionate East Africans and
                  international specialists who speak your language (literally and figuratively).
                  Whether you're from Beijing, New York, Seoul, Berlin, Sydney, or Auckland, we
                  understand your expectations and exceed them.
                </p>
                <p>
                  We are proud members of the Tanzania Association of Tour Operators (TATO) and
                  follow the Kilimanjaro Porters Assistance Project (KPAP) guidelines, ensuring
                  ethical treatment of all staff and a positive impact on local communities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80"
                    alt="Safari vehicle"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="bg-brand-600 rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-bold">500+</div>
                  <div className="text-brand-200 text-sm mt-1">Happy Travelers</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gray-900 rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-bold">4.9★</div>
                  <div className="text-gray-400 text-sm mt-1">Average Rating</div>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1549366021-9f761d040a94?w=600&q=80"
                    alt="Wildlife safari"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide every decision we make, every tour we craft, and every
              interaction with our guests and communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-brand-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our diverse, passionate team of experts brings together local knowledge,
              international experience, and multilingual capability to serve you perfectly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative h-72 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-brand-300 font-medium">
                      {member.languages}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-brand-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-xs text-gray-500 mb-2">{member.experience} experience</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Affiliations & Certifications</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
            {[
              "TATO Member",
              "KPAP Partner",
              "TripAdvisor Certificate of Excellence",
              "SafariBookings Verified",
              "IATA Accredited",
              "Tanzania Tourism Board Registered",
            ].map((cert) => (
              <div key={cert} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-medium">
                <Shield size={14} className="text-brand-500" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Ready to Explore East Africa?
          </h2>
          <p className="text-brand-100 text-lg mb-8">
            Let our expert team plan your perfect safari adventure.
            We respond within 2 hours, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Book Your Safari
            </Link>
            <Link
              href="/contact"
              className="bg-brand-500 hover:bg-brand-700 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
