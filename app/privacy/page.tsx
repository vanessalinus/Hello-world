import type { Metadata } from "next";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Leviva Travel and Tours booking inquiries.",
};

export default function PrivacyPage() {
  return (
    <main className="section-shell py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#146c43]">
          Privacy Policy
        </p>
        <h1 className="mt-4 text-4xl font-black text-[#0b3b25]">Leviva Travel and Tours</h1>
        <p className="mt-4 text-stone-600">Last updated: May 20, 2026</p>

        <div className="mt-8 space-y-6 text-stone-700">
          <section>
            <h2 className="text-xl font-black text-[#0b3b25]">Information we collect</h2>
            <p className="mt-2 leading-7">
              When you submit a booking inquiry, we collect the details you provide,
              including your name, email address, phone or WhatsApp number, country,
              destination interests, travel month, traveler count, budget range, and trip notes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0b3b25]">How we use information</h2>
            <p className="mt-2 leading-7">
              We use inquiry information to respond to your request, prepare travel proposals,
              coordinate safari and tour services, improve our website, and support customer
              communication before and during travel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0b3b25]">Sharing information</h2>
            <p className="mt-2 leading-7">
              We may share relevant trip details with trusted travel partners such as lodges,
              guides, transport providers, airlines, or destination suppliers when needed to
              prepare or operate your itinerary. We do not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0b3b25]">Contact</h2>
            <p className="mt-2 leading-7">
              To ask questions about your information, contact Leviva at{" "}
              <a className="font-bold text-[#146c43]" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>{" "}
              or{" "}
              <a className="font-bold text-[#146c43]" href={`tel:${contact.phone}`}>
                {contact.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
