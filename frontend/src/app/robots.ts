import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (!process.env.BASE_URL) throw new Error("BASE_URL is not defined");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
