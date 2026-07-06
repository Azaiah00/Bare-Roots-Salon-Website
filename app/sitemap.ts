import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bareroots.salon";
  const sections = [
    "",
    "#artists",
    "#services",
    "#wellness",
    "#shop",
    "#academy",
    "#gallery",
    "#book",
  ];
  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly",
    priority: s === "" ? 1 : 0.7,
  }));
}
