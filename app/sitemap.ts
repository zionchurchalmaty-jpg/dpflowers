import { MetadataRoute } from "next";
import { getPublishedContent } from "@/lib/firestore/client-content";

const baseUrl = "https://dpflowers.kz";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = (await getPublishedContent("products").catch(() => [])) || [];

  const generateUrl = (
    path: string,
    lastModified: Date,
    priority: number,
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never",
  ): MetadataRoute.Sitemap[number] => {
    return {
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    };
  };

  const staticPaths = [
    { path: "", priority: 1.0, freq: "daily" as const },
  ];

  const staticUrls = staticPaths.map((route) =>
    generateUrl(route.path, new Date(), route.priority, route.freq),
  );

  const productUrls = products.map((product: any) => {
    const date = product.updatedAt ? new Date(product.updatedAt) : new Date();
    const path = `/products/${product.slug || product.id}`;
    
    return generateUrl(path, date, 0.9, "weekly");
  });

  return [...staticUrls, ...productUrls];
}