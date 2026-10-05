import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The private tree and the transactional pages. Each one is also
      // noindex in its own metadata — belt and braces.
      disallow: ["/portal", "/portal/", "/login", "/cart", "/checkout"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
