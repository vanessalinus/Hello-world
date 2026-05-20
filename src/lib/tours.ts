import { prisma } from "@/lib/prisma";

export async function getTours(options?: { featured?: boolean; destination?: string }) {
  return prisma.tour.findMany({
    where: {
      ...(options?.featured !== undefined && { featured: options.featured }),
      ...(options?.destination && { destination: options.destination }),
    },
    orderBy: [{ featured: "desc" }, { priceFromUsd: "asc" }],
  });
}

export async function getTourBySlug(slug: string) {
  return prisma.tour.findUnique({ where: { slug } });
}

export function parseHighlights(highlights: string): string[] {
  try {
    return JSON.parse(highlights) as string[];
  } catch {
    return highlights.split(",").map((h) => h.trim());
  }
}
