import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Leviva Travel & Tours handles personal data submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="font-display text-4xl text-stone-900">Privacy overview</h1>
      <p className="mt-4 text-stone-600">
        This notice is written for guests from the European Union (GDPR), United
        Kingdom, Australia, New Zealand, the United States, South Korea, and
        China who interact with our public marketing site and trip enquiry forms.
      </p>
      <div className="prose prose-stone mt-10 max-w-none text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">What we collect</h2>
        <p>
          When you submit a trip enquiry, we collect the fields you provide —
          typically name, email address, phone or messenger ID, travel
          preferences, and optional free-text notes.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-stone-900">Why we use it</h2>
        <p>
          We use this information solely to prepare quotations, operate your
          itinerary if you proceed to booking, and — if you opt in — contact you
          on WhatsApp for faster coordination across time zones.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-stone-900">Legal basis</h2>
        <p>
          For EU/UK visitors, processing is based on your request for pre-contract
          measures (Article 6(1)(b) GDPR) and, where relevant, our legitimate
          interest in operating a small, high-touch travel business (Article
          6(1)(f) GDPR) balanced against your rights.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-stone-900">Retention</h2>
        <p>
          Enquiry records are kept for a maximum of twenty-four months unless a
          booking is confirmed — in which case financial and operational records
          follow Tanzanian accounting and tax requirements.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-stone-900">Sharing</h2>
        <p>
          We only share personal data with lodges, domestic airlines, park
          authorities, and insurers to the extent required to deliver a confirmed
          itinerary. We do not sell personal data and we do not run third-party
          advertising pixels on this reference build.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-stone-900">Your rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct,
          delete, or export your data, and to object to certain processing. Contact{" "}
          <a className="text-amber-800 hover:underline" href="mailto:info@levivainvestments.co.tz">
            info@levivainvestments.co.tz
          </a>{" "}
          to exercise these rights.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-stone-900">Hosting note</h2>
        <p>
          When you deploy this codebase, server logs and form storage depend on
          your provider’s configuration. Configure HTTPS, rotate access keys, and
          connect a transactional email provider (for example Resend, Postmark, or
          Amazon SES) before going live.
        </p>
      </div>
    </div>
  );
}
