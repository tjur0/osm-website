import { pool } from "@/lib/db";
import { MetadataRoute } from "next";

const PAGE_SIZE = 40000;

export async function generateSitemaps() {
  const response = await pool.query("SELECT COUNT(*) as count FROM pois");
  const { count } = response.rows[0] as { count: number };

  const pages = Math.ceil(count / PAGE_SIZE);

  console.log("Total pages:", pages);

  return Array.from({ length: pages }, (_, i) => i).map((id) => ({
    id,
  }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  if (!process.env.BASE_URL) throw new Error("BASE_URL is not defined");

  const offset = id * PAGE_SIZE;

  console.log("Generating sitemap for page", id, "with offset", offset);

  const response = await pool.query(
    `
    SELECT country, state, city, street, type, id
    FROM pois
    WHERE country IS NOT NULL AND state IS NOT NULL AND city IS NOT NULL AND street IS NOT NULL
    LIMIT $1 OFFSET $2
  `,
    [PAGE_SIZE, offset]
  );

  const pois = response.rows as {
    country: string;
    state: string;
    city: string;
    street: string;
    type: string;
    id: number;
  }[];

  const urls = pois.map(({ country, state, city, street, type, id }) => ({
    url: `${process.env.BASE_URL}/poi/${encodeURIComponent(
      country
    )}/${encodeURIComponent(state)}/${encodeURIComponent(
      city
    )}/${encodeURIComponent(street)}/${encodeURIComponent(type)}/${id}`,
    lastModified: new Date().toISOString(),
  }));

  return urls;
}
