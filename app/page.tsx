import { BookingForm } from "@/components/BookingForm";
import { ContactForm } from "@/components/ContactForm";
import {
  destinationHighlights,
  siteConfig,
  sourceMarkets,
  trustSignals,
} from "@/lib/site";

const itineraryIdeas = [
  {
    name: "Serengeti Migration and Zanzibar",
    length: "9 to 12 days",
    bestFor: "Couples, families, first-time safari travelers",
    highlights: ["Arusha", "Tarangire", "Ngorongoro", "Serengeti", "Zanzibar"],
  },
  {
    name: "Luxury Tanzania and Botswana",
    length: "12 to 15 days",
    bestFor: "Premium safari travelers and honeymooners",
    highlights: ["Serengeti", "Okavango Delta", "Chobe", "Victoria Falls add-on"],
  },
  {
    name: "Zanzibar Culture and Beach",
    length: "5 to 8 days",
    bestFor: "Beach holidays, food lovers, post-safari rest",
    highlights: ["Stone Town", "Spice farms", "Nungwi", "Paje", "Private dhow cruise"],
  },
];

const conversionSteps = [
  "Tell us where you want to go and when.",
  "Receive a custom route, lodge level, and transparent quote.",
  "Confirm your trip with Leviva and travel with local support.",
];

const audienceBenefits = [
  {
    market: "China",
    copy: "Private itineraries, photo-rich safari routes, shopping and beach extensions, and support for agent-led group travel.",
  },
  {
    market: "USA and Europe",
    copy: "Reliable planning for bucket-list safaris, honeymoons, family travel, and multi-country East Africa trips.",
  },
  {
    market: "South Korea",
    copy: "Efficient safari programs, Zanzibar relaxation, and premium experiences suitable for couples, friends, and groups.",
  },
  {
    market: "Australia and New Zealand",
    copy: "Long-haul travel planning with seamless connections, extended safari stays, and beach recovery time.",
  },
];

const faqs = [
  {
    question: "How quickly does Leviva respond?",
    answer:
      "The website is built for direct lead capture by email or webhook. Once configured on hosting, inquiries go straight to Leviva for fast follow-up.",
  },
  {
    question: "Can travelers book Tanzania, Zanzibar, and Botswana together?",
    answer:
      "Yes. Leviva can build combined safari and beach itineraries, including fly-in or overland routes and optional Kenya, Rwanda, or Uganda extensions.",
  },
  {
    question: "Is the website ready for publishing?",
    answer:
      "Yes. It includes frontend pages, backend inquiry APIs, SEO metadata, deployment scripts, and environment variable instructions for production lead delivery.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  email: siteConfig.email,
  telephone: siteConfig.phoneRaw,
  url: siteConfig.baseUrl,
  areaServed: ["Tanzania", "Zanzibar", "Botswana", "East Africa"],
  knowsAbout: [
    "Tanzania safaris",
    "Zanzibar beach holidays",
    "Botswana safaris",
    "East Africa tours",
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Leviva Travel and Tours home">
          <span className="brand-mark">L</span>
          <span>
            <strong>Leviva</strong>
            <small>Travel and Tours</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#destinations">Destinations</a>
          <a href="#itineraries">Trips</a>
          <a href="#why-leviva">Why Leviva</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp us
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Tanzania-based safari and beach specialists</p>
          <h1>Custom Tanzania, Zanzibar, Botswana and East Africa tours built to convert dreams into booked trips.</h1>
          <p className="hero-copy">
            Leviva Travel and Tours helps international travelers plan private safaris,
            beach escapes, honeymoons, family holidays, group tours, and premium East Africa
            itineraries with fast local support.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#plan-trip">
              Get a free itinerary quote
            </a>
            <a className="secondary-button" href={`tel:${siteConfig.phoneRaw}`}>
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="market-strip" aria-label="Focused traveler source markets">
            {sourceMarkets.map((market) => (
              <span key={market}>{market}</span>
            ))}
          </div>
        </div>
        <div className="hero-panel" aria-label="Featured Leviva travel experiences">
          <div className="hero-card hero-card-large">
            <span>Featured</span>
            <h2>Serengeti safari plus Zanzibar beach</h2>
            <p>One quote, local planning, and smooth transfers from arrival to departure.</p>
          </div>
          <div className="hero-card-grid">
            <div className="mini-card">
              <strong>24h</strong>
              <span>Target lead response</span>
            </div>
            <div className="mini-card">
              <strong>4+</strong>
              <span>Core destination regions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Why travelers trust Leviva">
        {trustSignals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </section>

      <section className="section destinations" id="destinations">
        <div className="section-heading">
          <p className="eyebrow">Signature destinations</p>
          <h2>Sell the routes travelers already want, then make them personal.</h2>
          <p>
            The site highlights high-intent destinations while making it simple for
            visitors to request a tailored itinerary.
          </p>
        </div>
        <div className="destination-grid">
          {destinationHighlights.map((destination) => (
            <article className="destination-card" key={destination.title}>
              <span>{destination.tag}</span>
              <h3>{destination.title}</h3>
              <p>{destination.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="itineraries">
        <div>
          <p className="eyebrow">High-conversion trip ideas</p>
          <h2>Start with packages, close with custom planning.</h2>
          <p>
            Travelers can quickly see what Leviva sells, then submit a detailed request
            that gives the sales team enough information to quote accurately.
          </p>
        </div>
        <div className="itinerary-list">
          {itineraryIdeas.map((idea) => (
            <article className="itinerary-card" key={idea.name}>
              <div>
                <span>{idea.length}</span>
                <h3>{idea.name}</h3>
                <p>{idea.bestFor}</p>
              </div>
              <ul>
                {idea.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section audience-section">
        <div className="section-heading">
          <p className="eyebrow">Focused international source markets</p>
          <h2>Messaging designed for travelers from China, USA, Europe, South Korea, Australia, and New Zealand.</h2>
        </div>
        <div className="audience-grid">
          {audienceBenefits.map((item) => (
            <article key={item.market}>
              <h3>{item.market}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section conversion-section" id="why-leviva">
        <div className="conversion-card">
          <p className="eyebrow">Booking conversion system</p>
          <h2>Built to move visitors from interest to inquiry.</h2>
          <ul className="check-list">
            <li>Prominent WhatsApp, phone, email, and quote calls-to-action.</li>
            <li>SEO-ready destination content for high-intent safari and beach searches.</li>
            <li>Lead form captures budget, market, dates, travelers, destination interest, and trip style.</li>
            <li>Backend can send leads to Resend email and automation webhooks for CRM follow-up.</li>
          </ul>
        </div>
        <div className="steps-card">
          {conversionSteps.map((step, index) => (
            <div className="step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section form-section">
        <BookingForm />
        <aside className="quote-aside">
          <p className="eyebrow">What happens after you inquire?</p>
          <h2>Leviva receives the lead and can reply with a tailored quote.</h2>
          <p>
            Configure email or webhook delivery during hosting setup, then route inquiries
            to Leviva sales, a CRM, Google Sheets, Zapier, Make, or another booking workflow.
          </p>
          <div className="contact-card">
            <strong>Direct contact</strong>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phoneDisplay}</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <p className="eyebrow">Traveler questions</p>
          <h2>Reduce friction before the inquiry.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact Leviva</p>
          <h2>Ready to publish, host, and start capturing inquiries.</h2>
          <p>
            Use this form for general messages, partnership requests, agent inquiries,
            and quick travel questions.
          </p>
        </div>
        <ContactForm />
      </section>

      <footer className="site-footer">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>Tanzania, Zanzibar, Botswana and East Africa travel planning.</p>
        </div>
        <div>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phoneDisplay}</a>
        </div>
      </footer>
    </main>
  );
}
