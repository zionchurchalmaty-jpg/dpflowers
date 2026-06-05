import { MetadataRoute } from "next";
import { getPublishedContent } from "@/lib/firestore/client-content";

const baseUrl = "https://vtstroy.kz";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects =
    (await getPublishedContent("projects").catch(() => [])) || [];
  const articles = (await getPublishedContent("content").catch(() => [])) || [];

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
    { path: "/projects", priority: 0.9, freq: "weekly" as const },
    { path: "/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/seo-blog", priority: 0.8, freq: "weekly" as const },
  ];

  const staticUrls = staticPaths.map((route) =>
    generateUrl(route.path, new Date(), route.priority, route.freq),
  );

  const projectUrls = projects.map((project: any) => {
    const date = project.updatedAt ? new Date(project.updatedAt) : new Date();
    const path = `/projects/${project.slug || project.id}`;
    return generateUrl(path, date, 0.8, "weekly");
  });

  const articleUrls = articles.map((article: any) => {
    const date = article.updatedAt ? new Date(article.updatedAt) : new Date();
    const path = `/${article.slug || article.id}`;
    const priority = article.isSeo ? 0.9 : 0.7;

    return generateUrl(path, date, priority, "monthly");
  });

  return [...staticUrls, ...projectUrls, ...articleUrls];
}
