import { nile } from "@/lib/db";
import { MetadataRoute } from "next";

const PAGE_SIZE = 50000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.BASE_URL) throw new Error("BASE_URL is not defined");

  const response = await nile.db.query("SELECT COUNT(*) as count FROM pois");
  const { count } = response.rows[0] as { count: number };

  const pages = Math.ceil(count / PAGE_SIZE);

  const poiSitemapUrls = Array.from({ length: pages }, (_, i) => i).map(
    (id) => {
      return {
        url: `${process.env.BASE_URL}/poi/sitemap/${id}.xml`,
        lastModified: new Date().toISOString(),
      };
    }
  );

  return poiSitemapUrls;
}
