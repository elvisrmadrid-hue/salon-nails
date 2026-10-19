import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/links";

export default function robots(): MetadataRoute.Robots {
  return {
    // En modo demostración se pide a los buscadores que no indexen el sitio.
    rules: business.demoMode ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
