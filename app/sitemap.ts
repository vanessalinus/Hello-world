import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = ["", "/destinations", "/tours", "/about", "/reviews", "/contact", "/book"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })
  );

  try {
    const [destinations, tours] = await Promise.all([
      prisma.destination.findMany({ select: { slug: true, createdAt: true } }),
      prisma.tour.findMany({ select: { slug: true, createdAt: true } })
    ]);

    const dRoutes = destinations.map((d) => ({
      url: `${base}/destinations/${d.slug}`,
      lastModified: d.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }));
    const tRoutes = tours.map((t) => ({
      url: `${base}/tours/${t.slug}`,
      lastModified: t.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }));
    return [...staticRoutes, ...dRoutes, ...tRoutes];
  } catch {
    return staticRoutes;
  }
}
