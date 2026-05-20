import type { Metadata } from "next";
import ContactForm from "@/components/shared/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Leviva Travel & Tours",
  description:
    "Contact Leviva Travel & Tours for safari bookings, custom itineraries, and travel advice. Phone: +255758996047. Email: info@levivainvestments.co.tz",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    details: ["+255 758 996 047"],
    description: "Available 7 days a week, 7am–9pm EAT",
    action: { label: "Call Now", href: "tel:+255758996047" },
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@levivainvestments.co.tz"],
    description: "We reply within 2 hours during business hours",
    action: { label: "Send Email", href: "mailto:info@levivainvestments.co.tz" },
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Our Offices",
    details: ["Arusha, Tanzania", "Zanzibar Town, Zanzibar"],
    description: "Visits by appointment. Airport pickups available.",
    action: null,
    color: "bg-brand-50 text-brand-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon–Sat: 7:00 AM – 9:00 PM EAT", "Sunday: 8:00 AM – 6:00 PM EAT"],
    description: "East Africa Time (UTC+3). Emergency line available 24/7.",
    action: null,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gray-900 pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our expert team is ready to help plan your dream East Africa adventure.
            Contact us by phone, email, WhatsApp, or the form below.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href={`https://wa.me/255758996047?text=${encodeURIComponent("Hello Leviva Travel! I'd like to plan an East Africa safari.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#22c55e] transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp Chat
            </a>
            <a
              href="tel:+255758996047"
              className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              <Phone size={18} />
              +255 758 996 047
            </a>
          </div>
        </div>
      </div>

      {/* Contact info + form */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.details.map((d) => (
                    <p key={d} className="text-gray-700 font-medium text-sm">{d}</p>
                  ))}
                  <p className="text-gray-500 text-xs mt-2">{item.description}</p>
                  {item.action && (
                    <a
                      href={item.action.href}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium"
                    >
                      {item.action.label} →
                    </a>
                  )}
                </div>
              );
            })}

            {/* Language support */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-3">We Speak Your Language</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {["🇬🇧 English", "🇨🇳 中文", "🇰🇷 한국어", "🇩🇪 Deutsch", "🇫🇷 Français", "🇹🇿 Swahili"].map((lang) => (
                  <span key={lang} className="text-brand-100">{lang}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-6">
                Tell us about your dream safari and we'll send a personalized quote within 2 hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-gray-200 rounded-2xl h-72 flex items-center justify-center overflow-hidden relative">
          <div className="text-center text-gray-500">
            <MapPin size={40} className="mx-auto mb-3 text-brand-500" />
            <p className="font-semibold">Leviva Travel & Tours</p>
            <p className="text-sm">Arusha, Tanzania | Near Kilimanjaro International Airport</p>
            <a
              href="https://maps.google.com/?q=Arusha,Tanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block bg-brand-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
