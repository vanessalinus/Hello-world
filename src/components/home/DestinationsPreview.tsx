import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Tanzania",
    desc: "Serengeti, Ngorongoro, Kilimanjaro",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    href: "/destinations#tanzania",
  },
  {
    name: "Zanzibar",
    desc: "Stone Town, spice tours, pristine beaches",
    image: "https://images.unsplash.com/photo-1548013146-7249f5a7868f?w=800&q=80",
    href: "/destinations#zanzibar",
  },
  {
    name: "Botswana",
    desc: "Okavango Delta, Chobe, luxury camps",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    href: "/destinations#botswana",
  },
  {
    name: "East Africa",
    desc: "Kenya, Uganda, Rwanda gorilla treks",
    image: "https://images.unsplash.com/photo-1551632811-97410a6d0b66?w=800&q=80",
    href: "/destinations#kenya",
  },
];

export function DestinationsPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-safari-950 sm:text-4xl">
              Signature Destinations
            </h2>
            <p className="mt-2 max-w-xl text-safari-600">
              From the Great Migration to Okavango mokoro rides — curated for discerning
              international travelers.
            </p>
          </div>
          <Link
            href="/destinations"
            className="font-medium text-terracotta-600 hover:text-terracotta-500"
          >
            View all destinations →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.name}
              href={d.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-safari-950/90 via-safari-950/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-display text-2xl font-bold text-white">{d.name}</h3>
                <p className="mt-1 text-sm text-safari-200">{d.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
