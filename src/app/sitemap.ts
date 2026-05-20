import { MetadataRoute } from "next";
import { getTours } from "@/lib/tours";
import { SITE } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getTours();
  const base = SITE.url;

  const staticPages = ["", "/tours", "/destinations", "/about", "/contact", "/book"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const tourPages = tours.map((tour) => ({
    url: `${base}/tours/${tour.slug}`,
    lastModified: tour.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...tourPages];
}
