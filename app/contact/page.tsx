import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Leviva Travel & Tours",
  description:
    "Reach Leviva Travel & Tours by email, WhatsApp or phone. Tanzania-based head office, support across China, USA, Europe, South Korea, Australia and New Zealand."
};

export default function ContactPage() {
  return (
    <div className="container grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <span className="section-eyebrow">Contact</span>
        <h1 className="section-heading">Speak to a destination expert</h1>
        <p className="mt-3 text-savanna-700">
          Our team is on the ground in Tanzania and online 24/7 to help you plan, book or modify
          your trip. Average WhatsApp reply: under 5 minutes during business hours.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5"
          >
            <Mail className="mt-1 h-5 w-5 text-acacia-700" />
            <div>
              <p className="font-display font-semibold">Email</p>
              <p className="text-sm text-savanna-700 break-all">{siteConfig.contact.email}</p>
            </div>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5"
          >
            <Phone className="mt-1 h-5 w-5 text-acacia-700" />
            <div>
              <p className="font-display font-semibold">Phone</p>
              <p className="text-sm text-savanna-700">{siteConfig.contact.phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card transition hover:-translate-y-0.5"
          >
            <MessageCircle className="mt-1 h-5 w-5 text-[#25D366]" />
            <div>
              <p className="font-display font-semibold">WhatsApp</p>
              <p className="text-sm text-savanna-700">+{siteConfig.contact.whatsapp}</p>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card">
            <MapPin className="mt-1 h-5 w-5 text-acacia-700" />
            <div>
              <p className="font-display font-semibold">Head office</p>
              <p className="text-sm text-savanna-700">{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-savanna-900 p-6 text-savanna-100">
          <p className="text-sm uppercase tracking-widest text-sunset-300">Office hours</p>
          <p className="mt-1">Monday–Saturday · 8 am – 8 pm EAT (UTC+3)</p>
          <p className="mt-1 text-savanna-300">After-hours emergencies handled 24/7 via WhatsApp.</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-display text-xl font-bold text-savanna-900">Send us a message</h2>
        <p className="mt-1 text-sm text-savanna-700">We'll respond within 12 hours.</p>
        <div className="mt-5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
