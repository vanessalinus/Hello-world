import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

const tours = [
  {
    slug: "serengeti-migration-safari",
    title: "The Great Serengeti Migration Safari",
    destination: "Tanzania",
    duration: "7 Days / 6 Nights",
    price: 3200,
    groupSize: "2-12 travelers",
    difficulty: "Easy",
    description: "Witness the awe-inspiring Great Migration in the Serengeti.",
    highlights: JSON.stringify(["Great Migration river crossings", "Big Five game drives"]),
    inclusions: JSON.stringify(["Airport transfers", "Safari guide", "Park fees"]),
    exclusions: JSON.stringify(["International flights", "Travel insurance"]),
    itinerary: JSON.stringify([{ day: "Day 1", title: "Arrival in Arusha", description: "Arrive and transfer to lodge." }]),
    imageUrl: "/images/tours/serengeti-migration.jpg",
    featured: true,
    rating: 4.9,
    reviewCount: 247,
    category: "Safari",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const tour of tours) {
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: tour,
      create: tour,
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
