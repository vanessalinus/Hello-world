import type { MetadataRoute } from "next";
import { DESTINATIONS, SITE } from "@/lib/site";

const base = () => process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/destinations", "/book", "/contact", "/privacy"];
  const dest = DESTINATIONS.map((d) => `/destinations/${d.slug}`);
  const lastModified = new Date();
  return [...paths, ...dest].map((p) => ({
    url: `${base()}${p}`,
    lastModified,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("/destinations/") ? 0.8 : 0.7,
  }));
}
