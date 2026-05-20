import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/lib/utils";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: `Contact Leviva Travel & Tours — ${SITE.email} · ${SITE.phone}`,
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello Leviva! I have a question about your safaris."
  )}`;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-safari-950 sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-safari-600">
          Our safari specialists are available 24/7 via WhatsApp and email. We respond to all
          inquiries within 24 hours.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-4 rounded-2xl border border-safari-200 bg-white p-5 transition hover:border-terracotta-300"
            >
              <Mail className="h-8 w-8 text-terracotta-500" />
              <div>
                <p className="text-sm text-safari-500">Email</p>
                <p className="font-semibold text-safari-950">{SITE.email}</p>
              </div>
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-safari-200 bg-white p-5 transition hover:border-terracotta-300"
            >
              <Phone className="h-8 w-8 text-terracotta-500" />
              <div>
                <p className="text-sm text-safari-500">Phone</p>
                <p className="font-semibold text-safari-950">{SITE.phone}</p>
              </div>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5 transition hover:bg-[#25D366]/10"
            >
              <MessageCircle className="h-8 w-8 text-[#25D366]" />
              <div>
                <p className="text-sm text-safari-500">WhatsApp (fastest)</p>
                <p className="font-semibold text-safari-950">Chat with us now</p>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border border-safari-200 bg-white p-5">
              <MapPin className="h-8 w-8 text-forest-700" />
              <div>
                <p className="text-sm text-safari-500">Offices</p>
                <p className="font-semibold text-safari-950">Arusha & Dar es Salaam, Tanzania</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-safari-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-safari-950">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
