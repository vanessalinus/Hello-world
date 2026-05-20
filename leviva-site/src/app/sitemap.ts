import type { MetadataRoute } from "next";

import { company, destinations } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationRoutes = destinations.map((destination) => ({
    url: `${company.siteUrl}/destinations/${destination.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: company.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${company.siteUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${company.siteUrl}/book`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...destinationRoutes,
  ];
}
