import { FormEvent, useEffect, useState } from "react";
import "./App.css";

type SourceMarket =
  | "China"
  | "USA"
  | "Europe"
  | "South Korea"
  | "Australia"
  | "New Zealand";

type TourPackage = {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  priceFromUsd: number;
  highlights: string[];
  idealForMarkets: SourceMarket[];
};

type Testimonial = {
  id: string;
  guestName: string;
  sourceMarket: SourceMarket;
  quote: string;
  trip: string;
};

const sourceMarkets: SourceMarket[] = [
  "China",
  "USA",
  "Europe",
  "South Korea",
  "Australia",
  "New Zealand",
];

const destinationCards = [
  {
    name: "Tanzania",
    description: "Serengeti, Ngorongoro, and Kilimanjaro adventures with private guides.",
  },
  {
    name: "Zanzibar",
    description: "Premium beach escapes, Stone Town heritage, and romantic getaways.",
  },
  {
    name: "Botswana",
    description: "Luxury Delta safaris and Chobe riverfront wildlife experiences.",
  },
  {
    name: "Other East Africa",
    description: "Kenya, Rwanda, and tailored multi-country circuits for seamless travel.",
  },
];

const initialBookingForm = {
  packageId: "",
  fullName: "",
  email: "",
  phone: "",
  sourceMarket: "USA" as SourceMarket,
  travelers: 2,
  preferredStartDate: "",
  specialRequests: "",
};

const initialInquiryForm = {
  fullName: "",
  email: "",
  phone: "",
  sourceMarket: "USA" as SourceMarket,
  destinationInterest: "Tanzania",
  travelMonth: "",
  travelers: 2,
  budgetRange: "USD 3,000 - 5,000 per person",
  message: "",
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

function App() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [bookingForm, setBookingForm] = useState(initialBookingForm);
  const [inquiryForm, setInquiryForm] = useState(initialInquiryForm);
  const [bookingStatus, setBookingStatus] = useState("");
  const [inquiryStatus, setInquiryStatus] = useState("");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const [packagesRes, testimonialsRes] = await Promise.all([
          fetch(`${apiBaseUrl}/packages`),
          fetch(`${apiBaseUrl}/testimonials`),
        ]);

        if (!packagesRes.ok || !testimonialsRes.ok) {
          throw new Error("Failed to load website content.");
        }

        const packagesPayload = await packagesRes.json();
        const testimonialsPayload = await testimonialsRes.json();

        setPackages(packagesPayload.packages ?? []);
        setTestimonials(testimonialsPayload.testimonials ?? []);
      } catch (error) {
        console.error(error);
        setLoadError("Content is temporarily unavailable. Please refresh or contact our team.");
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBookingSubmitting(true);
    setBookingStatus("");

    try {
      const response = await fetch(`${apiBaseUrl}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message ?? "Booking could not be submitted.");
      }

      setBookingStatus(`Success: ${payload.message} Ref: ${payload.reference}`);
      setBookingForm(initialBookingForm);
    } catch (error) {
      setBookingStatus(error instanceof Error ? error.message : "Booking could not be submitted.");
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const handleInquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInquirySubmitting(true);
    setInquiryStatus("");

    try {
      const response = await fetch(`${apiBaseUrl}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryForm),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message ?? "Inquiry could not be submitted.");
      }

      setInquiryStatus(`Success: ${payload.message} Ref: ${payload.reference}`);
      setInquiryForm(initialInquiryForm);
    } catch (error) {
      setInquiryStatus(error instanceof Error ? error.message : "Inquiry could not be submitted.");
    } finally {
      setIsInquirySubmitting(false);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <p>Leviva Travel & Tours | Tanzania, Zanzibar, Botswana & East Africa</p>
        <p>
          Contact: <a href="mailto:info@levivainvestments.co.tz">info@levivainvestments.co.tz</a> |{" "}
          <a href="tel:+255758996047">+255758996047</a>
        </p>
      </header>

      <main>
        <section className="hero">
          <span className="badge">Trusted by travelers from China, USA, Europe, South Korea, Australia & New Zealand</span>
          <h1>Book unforgettable East Africa journeys with Leviva</h1>
          <p>
            High-conversion itineraries built for comfort, wildlife, and culture: from the Serengeti to Zanzibar beaches
            and Botswana’s delta luxury camps.
          </p>
          <div className="heroActions">
            <a href="#book-now" className="ctaPrimary">
              Reserve Your Trip
            </a>
            <a href="#packages" className="ctaSecondary">
              View Signature Packages
            </a>
          </div>
          <ul className="trustBar">
            <li>24/7 WhatsApp Support</li>
            <li>Fast Visa & Flight Guidance</li>
            <li>Secure Booking Confirmation</li>
          </ul>
        </section>

        <section className="section">
          <h2>Where we take your guests</h2>
          <div className="grid">
            {destinationCards.map((item) => (
              <article key={item.name} className="card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section marketSection">
          <h2>Source market strategy for higher bookings</h2>
          <div className="marketGrid">
            {sourceMarkets.map((market) => (
              <article key={market} className="marketCard">
                <h3>{market}</h3>
                <p>Localized trip planning, rapid response, and curated itineraries aligned with {market} traveler expectations.</p>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="section">
          <h2>Featured conversion-focused packages</h2>
          {isLoading && <p>Loading packages...</p>}
          {loadError && <p className="statusError">{loadError}</p>}
          <div className="grid">
            {packages.map((tourPackage) => (
              <article key={tourPackage.id} className="packageCard">
                <h3>{tourPackage.title}</h3>
                <p className="packageMeta">
                  {tourPackage.destination} | {tourPackage.durationDays} days
                </p>
                <p className="price">From USD {tourPackage.priceFromUsd.toLocaleString()}</p>
                <ul>
                  {tourPackage.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="ctaSecondary"
                  onClick={() =>
                    setBookingForm((current) => ({
                      ...current,
                      packageId: tourPackage.id,
                    }))
                  }
                >
                  Select this package
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section testimonials">
          <h2>What travelers say</h2>
          <div className="grid">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="card quoteCard">
                <p>"{testimonial.quote}"</p>
                <footer>
                  {testimonial.guestName} ({testimonial.sourceMarket}) - {testimonial.trip}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="book-now" className="section bookingSection">
          <div className="formCard">
            <h2>Reserve now (high intent booking form)</h2>
            <form onSubmit={handleBookingSubmit}>
              <label>
                Selected package
                <select
                  required
                  value={bookingForm.packageId}
                  onChange={(event) => setBookingForm({ ...bookingForm, packageId: event.target.value })}
                >
                  <option value="">Choose package</option>
                  {packages.map((tourPackage) => (
                    <option key={tourPackage.id} value={tourPackage.id}>
                      {tourPackage.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Full name
                <input
                  required
                  value={bookingForm.fullName}
                  onChange={(event) => setBookingForm({ ...bookingForm, fullName: event.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={bookingForm.email}
                  onChange={(event) => setBookingForm({ ...bookingForm, email: event.target.value })}
                />
              </label>
              <label>
                Phone / WhatsApp
                <input
                  required
                  value={bookingForm.phone}
                  onChange={(event) => setBookingForm({ ...bookingForm, phone: event.target.value })}
                />
              </label>
              <label>
                Source market
                <select
                  value={bookingForm.sourceMarket}
                  onChange={(event) =>
                    setBookingForm({ ...bookingForm, sourceMarket: event.target.value as SourceMarket })
                  }
                >
                  {sourceMarkets.map((market) => (
                    <option key={market} value={market}>
                      {market}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Travelers
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={bookingForm.travelers}
                  onChange={(event) => setBookingForm({ ...bookingForm, travelers: Number(event.target.value) })}
                />
              </label>
              <label>
                Preferred start date
                <input
                  required
                  type="date"
                  value={bookingForm.preferredStartDate}
                  onChange={(event) => setBookingForm({ ...bookingForm, preferredStartDate: event.target.value })}
                />
              </label>
              <label>
                Special requests
                <textarea
                  rows={3}
                  value={bookingForm.specialRequests}
                  onChange={(event) => setBookingForm({ ...bookingForm, specialRequests: event.target.value })}
                />
              </label>
              <button type="submit" className="ctaPrimary" disabled={isBookingSubmitting}>
                {isBookingSubmitting ? "Submitting..." : "Submit Booking Request"}
              </button>
            </form>
            {bookingStatus && <p className="statusMessage">{bookingStatus}</p>}
          </div>

          <div className="formCard">
            <h2>Need a custom itinerary first?</h2>
            <p>Share your dream trip details and get a fast personalized quote from Leviva.</p>
            <form onSubmit={handleInquirySubmit}>
              <label>
                Full name
                <input
                  required
                  value={inquiryForm.fullName}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, fullName: event.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={inquiryForm.email}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, email: event.target.value })}
                />
              </label>
              <label>
                Phone / WhatsApp
                <input
                  required
                  value={inquiryForm.phone}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, phone: event.target.value })}
                />
              </label>
              <label>
                Source market
                <select
                  value={inquiryForm.sourceMarket}
                  onChange={(event) =>
                    setInquiryForm({ ...inquiryForm, sourceMarket: event.target.value as SourceMarket })
                  }
                >
                  {sourceMarkets.map((market) => (
                    <option key={market} value={market}>
                      {market}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Destination interest
                <input
                  required
                  value={inquiryForm.destinationInterest}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, destinationInterest: event.target.value })}
                />
              </label>
              <label>
                Travel month
                <input
                  required
                  placeholder="e.g. August 2026"
                  value={inquiryForm.travelMonth}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, travelMonth: event.target.value })}
                />
              </label>
              <label>
                Travelers
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={inquiryForm.travelers}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, travelers: Number(event.target.value) })}
                />
              </label>
              <label>
                Budget range
                <input
                  required
                  value={inquiryForm.budgetRange}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, budgetRange: event.target.value })}
                />
              </label>
              <label>
                Message
                <textarea
                  required
                  rows={4}
                  value={inquiryForm.message}
                  onChange={(event) => setInquiryForm({ ...inquiryForm, message: event.target.value })}
                />
              </label>
              <button type="submit" className="ctaSecondary" disabled={isInquirySubmitting}>
                {isInquirySubmitting ? "Submitting..." : "Send Custom Inquiry"}
              </button>
            </form>
            {inquiryStatus && <p className="statusMessage">{inquiryStatus}</p>}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Leviva Travel & Tours | Email: <a href="mailto:info@levivainvestments.co.tz">info@levivainvestments.co.tz</a> |
          Call/WhatsApp: <a href="tel:+255758996047">+255758996047</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
