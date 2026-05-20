import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const base = () => process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

export default function robots(): MetadataRoute.Robots {
  const root = base();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${root}/sitemap.xml`,
    host: new URL(root).host,
  };
}
