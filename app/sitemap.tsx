// app/sitemap.ts
import type { MetadataRoute } from "next";

export const revalidate = 60 * 60 * 6;

async function getBlogs() {
  const res = await fetch("https://www.gatewayabroadeducations.com/api/v1/blog?all=true", {
    next: { revalidate: 60 * 60 * 6 },
  });
  const data = await res.json();
  return data?.data?.blog || [];
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.gatewayabroadeducations.com";
  const blogs = await getBlogs();

  const StaticURL = ['/about', '/spoken-english', '/gallary', '/course/TOEFL', '/course/IELTS', '/course/GRE', '/course/SAT', '/course/PTE', '/course/GMAT', '/blog', '/career', '/contact', '/study-abroad', '/study-in-uk', '/course/duolingo']

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = StaticURL.map((item: any) => ({
    url: `${baseUrl}${item.toLowerCase()}`,
    lastModified: new Date(),
  })
  )
  // Dynamic routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog-description/${blog.Slug.toLowerCase()}`,
    lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}
