import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";
import { JOURNAL } from "@/lib/content";

/**
 * Real routes only. The private tree (/portal, /login) and the transactional
 * pages (/cart, /checkout) are deliberately absent — they are also noindex in
 * their own metadata and excluded in robots.ts. Three locks, because a
 * dashboard in a search result is the kind of mistake nobody notices for
 * months.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const core: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.95, freq: "monthly" },
    { path: "/book", priority: 0.95, freq: "weekly" },
    { path: "/recovery", priority: 0.9, freq: "monthly" },
    { path: "/work", priority: 0.85, freq: "weekly" },
    { path: "/house", priority: 0.8, freq: "monthly" },
    { path: "/shop", priority: 0.8, freq: "weekly" },
    { path: "/academy", priority: 0.75, freq: "monthly" },
    { path: "/visit", priority: 0.75, freq: "monthly" },
    { path: "/journal", priority: 0.7, freq: "weekly" },
    { path: "/wraps", priority: 0.6, freq: "monthly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/policies", priority: 0.4, freq: "yearly" },
  ];

  return [
    ...core.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...JOURNAL.map((p) => ({
      url: `${base}/journal/${p.slug}`,
      lastModified: new Date(`${p.date}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
