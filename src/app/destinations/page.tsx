import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    id: "tanzania",
    name: "Tanzania",
    tagline: "The soul of African safari",
    description:
      "Home to the Serengeti Great Migration, Ngorongoro Crater, Tarangire elephant herds, and Mount Kilimanjaro. Tanzania offers the continent's most iconic wildlife experiences with world-class lodges and expert guides.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    highlights: ["Serengeti", "Ngorongoro", "Kilimanjaro", "Tarangire", "Lake Manyara"],
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    tagline: "Spice islands & turquoise waters",
    description:
      "Combine your mainland safari with Stone Town's UNESCO heritage, aromatic spice farms, dhow sailing, and powder-white beaches on the Indian Ocean. Perfect post-safari relaxation for international travelers.",
    image: "https://images.unsplash.com/photo-1548013146-7249f5a7868f?w=1200&q=80",
    highlights: ["Stone Town", "Mnemba Atoll", "Nungwi Beach", "Jozani Forest", "Spice Tours"],
  },
  {
    id: "botswana",
    name: "Botswana",
    tagline: "Exclusive wilderness luxury",
    description:
      "Low-volume, high-value tourism in the Okavango Delta, Chobe National Park, and Kalahari. Mokoro excursions, walking safaris, and fly-in camps define Botswana's premium safari model.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80",
    highlights: ["Okavango Delta", "Chobe", "Moremi", "Kalahari", "Makgadikgadi"],
  },
  {
    id: "kenya",
    name: "Kenya",
    tagline: "Classic Mara & beyond",
    description:
      "The Maasai Mara's river crossings, Amboseli's elephants with Kilimanjaro backdrop, and Nairobi as East Africa's travel hub. Ideal for multi-country itineraries with Tanzania.",
    image: "https://images.unsplash.com/photo-1523805009345-744b1f0f2f1f?w=1200&q=80",
    highlights: ["Maasai Mara", "Amboseli", "Lake Nakuru", "Samburu", "Nairobi"],
  },
  {
    id: "uganda",
    name: "Uganda",
    tagline: "Pearl of Africa — gorillas & more",
    description:
      "Mountain gorilla trekking in Bwindi, chimpanzee encounters in Kibale, and the source of the Nile. Uganda delivers intimate primate experiences unavailable elsewhere.",
    image: "https://images.unsplash.com/photo-1551632811-97410a6d0b66?w=1200&q=80",
    highlights: ["Bwindi Gorillas", "Kibale Chimps", "Queen Elizabeth", "Murchison Falls"],
  },
  {
    id: "rwanda",
    name: "Rwanda",
    tagline: "Land of a thousand hills",
    description:
      "Volcanoes National Park gorilla and golden monkey trekking, plus a moving Kigali cultural experience. Rwanda pairs perfectly with Uganda or Tanzania extensions.",
    image: "https://images.unsplash.com/photo-1535083787815-9ae6d282b1d4?w=1200&q=80",
    highlights: ["Volcanoes NP", "Kigali", "Nyungwe Forest", "Lake Kivu"],
  },
];

export const metadata = {
  title: "Destinations",
  description:
    "Explore Tanzania, Zanzibar, Botswana, Kenya, Uganda, and Rwanda with Leviva Travel & Tours.",
};

export default function DestinationsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-safari-950 sm:text-5xl">
          Our Destinations
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-safari-600">
          East Africa and Botswana — expertly curated for discerning travelers from China,
          the United States, Europe, South Korea, Australia, and New Zealand.
        </p>

        <div className="mt-16 space-y-24">
          {destinations.map((d, i) => (
            <section
              key={d.id}
              id={d.id}
              className={`scroll-mt-24 grid gap-10 lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={d.image} alt={d.name} fill className="object-cover" sizes="50vw" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm font-medium uppercase tracking-wider text-terracotta-600">
                  {d.tagline}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-safari-950">{d.name}</h2>
                <p className="mt-4 text-safari-700">{d.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-safari-100 px-3 py-1 text-sm text-safari-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/tours?destination=${d.name}`}
                  className="mt-6 inline-flex font-medium text-terracotta-600 hover:text-terracotta-500"
                >
                  View {d.name} tours →
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
