import { pool } from "@/lib/db";
import { MetadataRoute } from "next";

const PAGE_SIZE = 40000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.BASE_URL) throw new Error("BASE_URL is not defined");

  const response = await pool.query(
    "SELECT COUNT(*) as count FROM pois WHERE country IS NOT NULL AND state IS NOT NULL AND city IS NOT NULL AND street IS NOT NULL",
  );
  const { count } = response.rows[0] as { count: number };

  const pages = Math.ceil(count / PAGE_SIZE);

  const poiSitemapUrls = Array.from({ length: pages }, (_, i) => i).map(
    (id) => {
      return {
        url: `${process.env.BASE_URL}/poi/sitemap/${id}.xml`,
        lastModified: new Date().toISOString(),
      };
    },
  );

  return poiSitemapUrls;
}
